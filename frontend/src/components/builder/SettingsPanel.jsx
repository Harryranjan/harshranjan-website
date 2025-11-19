import Modal from "../Modal";
import Input from "../Input";
import Textarea from "../Textarea";
import Button from "../Button";

/**
 * Reusable Settings Panel - Modal for builder-level settings
 *
 * @param {Boolean} isOpen - Whether panel is open
 * @param {Function} onClose - Callback to close panel
 * @param {Object} settings - Current settings object
 * @param {Function} onChange - Callback when settings change
 * @param {Function} onSave - Callback to save settings
 * @param {Array} fields - Array of field definitions
 * @param {String} title - Panel title
 */
export default function SettingsPanel({
  isOpen,
  onClose,
  settings = {},
  onChange,
  onSave,
  fields = [],
  title = "Settings",
  tabs = [],
}) {
  const [activeTab, setActiveTab] = React.useState(tabs[0]?.key || "general");

  const handleFieldChange = (fieldName, value) => {
    onChange?.({
      ...settings,
      [fieldName]: value,
    });
  };

  const handleSave = () => {
    onSave?.(settings);
    onClose();
  };

  const renderField = (field) => {
    const value = settings[field.name] || field.defaultValue || "";

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
          <div key={field.name} className="flex items-start">
            <input
              type="checkbox"
              id={field.name}
              checked={value}
              onChange={(e) => handleFieldChange(field.name, e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
            />
            <div className="ml-3">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              {field.helperText && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {field.helperText}
                </p>
              )}
            </div>
          </div>
        );

      case "radio":
        return (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`${field.name}-${option.value}`}
                    name={field.name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.value)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`${field.name}-${option.value}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {field.helperText && (
              <p className="text-sm text-gray-500 mt-1.5">{field.helperText}</p>
            )}
          </div>
        );

      case "color":
        return (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value || "#000000"}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={value || "#000000"}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="#000000"
              />
            </div>
            {field.helperText && (
              <p className="text-sm text-gray-500 mt-1.5">{field.helperText}</p>
            )}
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

  const currentFields =
    tabs.length > 0 ? fields.filter((f) => f.tab === activeTab) : fields;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      }
    >
      {/* Tabs */}
      {tabs.length > 0 && (
        <div className="flex gap-1 border-b mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
                activeTab === tab.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Fields */}
      <div className="space-y-4">
        {currentFields.map((field) => renderField(field))}
      </div>
    </Modal>
  );
}
