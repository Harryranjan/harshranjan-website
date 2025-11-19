import { useState } from "react";
import {
  FiX,
  FiMail,
  FiUser,
  FiPhone,
  FiBriefcase,
  FiDownload,
} from "react-icons/fi";
import api from "../utils/api";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function DownloadModal({ download, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const { data } = await api.post("/download-leads/submit", {
        download_id: download.id,
        ...formData,
      });

      // Open download in new tab
      if (data.download_url) {
        window.open(data.download_url, "_blank");
      }

      onSuccess(true);
    } catch (error) {
      console.error("Error submitting lead:", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "Failed to submit. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <FiX size={24} />
          </button>

          <div className="pr-10">
            <h2 className="text-2xl font-bold mb-2">Get Your Free Download</h2>
            <p className="text-blue-100">
              Fill in your details below and we'll send the download link to
              your email instantly.
            </p>
          </div>
        </div>

        {/* Download Info */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex gap-4">
            {download.thumbnail && (
              <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                <img
                  src={download.thumbnail}
                  alt={download.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {download.title}
              </h3>
              <p className="text-sm text-gray-600">
                {download.short_description}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                {download.file_type && (
                  <span className="uppercase font-semibold">
                    {download.file_type}
                  </span>
                )}
                {download.file_size && (
                  <>
                    <span>•</span>
                    <span>{download.file_size}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Full Name"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="John Doe"
            icon={<FiUser />}
            error={errors.name}
          />

          <Input
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
            icon={<FiMail />}
            error={errors.email}
            hint="We'll send the download link here"
          />

          <Input
            label="Phone Number (Optional)"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            icon={<FiPhone />}
          />

          <Input
            label="Company (Optional)"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Your Company Name"
            icon={<FiBriefcase />}
          />

          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>📧 Instant Delivery:</strong> You'll receive the download
              link in your email within seconds. Check your spam folder if you
              don't see it.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              icon={<FiDownload />}
              className="flex-1"
            >
              Get Download Link
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By downloading, you agree to receive updates from us. You can
            unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
}
