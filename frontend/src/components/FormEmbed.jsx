import { useState, useEffect } from "react";
import api from "../utils/api";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import Button from "./Button";
import Input from "./Input";
import Textarea from "./Textarea";

export default function FormEmbed({ formId, className = "" }) {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchForm();
  }, [formId]);

  const fetchForm = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/forms/${formId}`);
      setForm(response.data);

      // Initialize form data with empty values
      const initialData = {};
      response.data.fields.forEach((field) => {
        if (field.type === "checkbox") {
          initialData[field.id] = [];
        } else {
          initialData[field.id] = "";
        }
      });
      setFormData(initialData);
    } catch (err) {
      console.error("Error fetching form:", err);
      setError("Failed to load form");
    } finally {
      setLoading(false);
    }
  };

  const validateField = (field, value) => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
    }

    if (field.type === "tel" && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        return "Please enter a valid phone number";
      }
    }

    if (field.type === "url" && value) {
      try {
        new URL(value);
      } catch {
        return "Please enter a valid URL";
      }
    }

    if (field.validation?.min && value && value.length < field.validation.min) {
      return `Minimum ${field.validation.min} characters required`;
    }

    if (field.validation?.max && value && value.length > field.validation.max) {
      return `Maximum ${field.validation.max} characters allowed`;
    }

    return null;
  };

  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));

    // Clear error for this field
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (fieldId, optionValue, checked) => {
    setFormData((prev) => {
      const currentValues = prev[fieldId] || [];
      if (checked) {
        return { ...prev, [fieldId]: [...currentValues, optionValue] };
      } else {
        return {
          ...prev,
          [fieldId]: currentValues.filter((v) => v !== optionValue),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    form.fields.forEach((field) => {
      if (
        field.type !== "heading" &&
        field.type !== "paragraph" &&
        field.type !== "divider" &&
        field.type !== "image"
      ) {
        const error = validateField(field, formData[field.id]);
        if (error) {
          newErrors[field.id] = error;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      await api.post(`/forms/${formId}/submit`, {
        data: formData,
      });
      setSubmitted(true);
      setFormData({});

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        const initialData = {};
        form.fields.forEach((field) => {
          if (field.type === "checkbox") {
            initialData[field.id] = [];
          } else {
            initialData[field.id] = "";
          }
        });
        setFormData(initialData);
      }, 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        form.error_message || "Failed to submit form. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field) => {
    const value = formData[field.id] || "";
    const error = errors[field.id];

    switch (field.type) {
      case "heading":
        return (
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {field.label}
          </h3>
        );

      case "paragraph":
        return <p className="text-gray-600 mb-4">{field.placeholder}</p>;

      case "divider":
        return <hr className="my-6 border-gray-200" />;

      case "image":
        return field.placeholder ? (
          <img
            src={field.placeholder}
            alt={field.label}
            className="w-full h-auto rounded-lg mb-4"
          />
        ) : null;

      case "textarea":
        return (
          <Textarea
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            error={error}
            rows={field.rows || 4}
          />
        );

      case "select":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.required}
              className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="">Select an option</option>
              {field.options?.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
          </div>
        );

      case "radio":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map((option, idx) => (
                <label key={idx} className="flex items-center">
                  <input
                    type="radio"
                    name={field.id}
                    value={option}
                    checked={value === option}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
          </div>
        );

      case "checkbox":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map((option, idx) => (
                <label key={idx} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value.includes(option)}
                    onChange={(e) =>
                      handleCheckboxChange(field.id, option, e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
          </div>
        );

      case "rating":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleChange(field.id, star)}
                  className={`text-3xl ${
                    value >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
          </div>
        );

      case "slider":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label} {value && `(${value})`}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="range"
              min={field.min || 0}
              max={field.max || 100}
              step={field.step || 1}
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
          </div>
        );

      case "file":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="file"
              accept={field.accept}
              onChange={(e) => handleChange(field.id, e.target.files[0])}
              className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
            {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
          </div>
        );

      case "color":
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="color"
              value={value || "#000000"}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
            />
            {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
          </div>
        );

      default:
        return (
          <Input
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            error={error}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className={`animate-pulse space-y-4 ${className}`}>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
    );
  }

  if (error && !form) {
    return (
      <div
        className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}
      >
        <div className="flex items-center gap-2 text-red-800">
          <FiAlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!form) return null;

  if (submitted) {
    return (
      <div
        className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}
      >
        <FiCheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          {form.success_message || "Thank you for your submission!"}
        </h3>
      </div>
    );
  }

  return (
    <div className={className}>
      {form.name && (
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{form.name}</h2>
      )}
      {form.description && (
        <p className="text-gray-600 mb-6">{form.description}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {form.fields.map((field) => (
          <div key={field.id}>{renderField(field)}</div>
        ))}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800">
              <FiAlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={submitting}
          disabled={submitting}
          icon={<FiSend />}
          className="w-full"
        >
          {form.submit_button_text || "Submit"}
        </Button>
      </form>
    </div>
  );
}
