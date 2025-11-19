import { FiX } from "react-icons/fi";
import Input from "../Input";
import Textarea from "../Textarea";
import Button from "../Button";

/**
 * Reusable Field Editor Panel - Slide-out panel for editing item properties
 *
 * @param {Boolean} isOpen - Whether panel is open
 * @param {Function} onClose - Callback to close panel
 * @param {Object} item - Current item being edited
 * @param {Function} onChange - Callback when item changes
 * @param {Array} fields - Array of field definitions
 * @param {String} title - Panel title
 */
export default function FieldEditorPanel({
  isOpen,
  onClose,
  item = null,
  onChange,
  onSave,
  fields = [],
  title = "Edit Properties",
  className = "",
}) {
  if (!isOpen || !item) return null;

  const handleFieldChange = (fieldName, value) => {
    onChange?.({
      ...item,
      [fieldName]: value,
    });
  };

  const renderField = (field) => {
    const value = item[field.name] || field.defaultValue || "";

    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "url":
        return (
          <Input
            key={field.name}
            type={field.type}
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            helperText={field.helperText}
          />
        );

      case "textarea":
        return (
          <Textarea
            key={field.name}
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            helperText={field.helperText}
            rows={field.rows || 3}
          />
        );

      case "select":
        return (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {field.helperText && (
              <p className="text-sm text-gray-500 mt-1.5">{field.helperText}</p>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div key={field.name} className="flex items-center">
            <input
              type="checkbox"
              id={field.name}
              checked={value}
              onChange={(e) => handleFieldChange(field.name, e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={field.name} className="ml-2 text-sm text-gray-700">
              {field.label}
            </label>
          </div>
        );

      case "options":
        return (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {(value || []).map((option, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...value];
                      newOptions[idx] = e.target.value;
                      handleFieldChange(field.name, newOptions);
                    }}
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    placeholder={`Option ${idx + 1}`}
                  />
                  <button
                    onClick={() => {
                      const newOptions = value.filter((_, i) => i !== idx);
                      handleFieldChange(field.name, newOptions);
                    }}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  handleFieldChange(field.name, [...(value || []), ""])
                }
                className="w-full px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 text-sm"
              >
                + Add Option
              </button>
            </div>
          </div>
        );

      case "divider":
        return <hr key={field.name} className="my-4" />;

      case "heading":
        return (
          <h3 key={field.name} className="text-lg font-semibold mt-4 mb-2">
            {field.label}
          </h3>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl border-l transform transition-transform duration-300 z-40 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h3 className="font-bold text-lg">{title}</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-lg transition"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-[calc(100vh-140px)] p-4 space-y-4">
        {fields.map((field) => renderField(field))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={onSave} className="flex-1">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
