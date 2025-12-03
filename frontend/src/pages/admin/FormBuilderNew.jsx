import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import {
  FiSettings,
  FiSave,
  FiEye,
  FiTrash2,
  FiCopy,
  FiMove,
  FiX,
  FiCheck,
  FiPlus,
  FiCode,
  FiMaximize2,
} from "react-icons/fi";
import Toast from "../../components/Toast";
import FormPreviewModal from "../../components/FormPreviewModal";
import CodeEditorFullscreen from "../../components/CodeEditorFullscreen";

const FIELD_TYPES = [
  // Basic Fields
  {
    type: "text",
    label: "Text",
    icon: "📝",
    description: "Single line text",
    category: "basic",
  },
  {
    type: "email",
    label: "Email",
    icon: "📧",
    description: "Email address",
    category: "basic",
  },
  {
    type: "tel",
    label: "Phone",
    icon: "📞",
    description: "Phone number",
    category: "basic",
  },
  {
    type: "textarea",
    label: "Text Area",
    icon: "📄",
    description: "Multi-line text",
    category: "basic",
  },
  {
    type: "number",
    label: "Number",
    icon: "🔢",
    description: "Numeric input",
    category: "basic",
  },

  // Choice Fields
  {
    type: "select",
    label: "Dropdown",
    icon: "▼",
    description: "Select option",
    category: "choice",
  },
  {
    type: "radio",
    label: "Radio",
    icon: "◉",
    description: "Single choice",
    category: "choice",
  },
  {
    type: "checkbox",
    label: "Checkbox",
    icon: "☑",
    description: "Multiple choice",
    category: "choice",
  },
  {
    type: "rating",
    label: "Rating",
    icon: "⭐",
    description: "Star rating",
    category: "choice",
  },
  {
    type: "yesno",
    label: "Yes/No",
    icon: "✓✗",
    description: "Boolean choice",
    category: "choice",
  },

  // Date & Time
  {
    type: "date",
    label: "Date",
    icon: "📅",
    description: "Date picker",
    category: "datetime",
  },
  {
    type: "time",
    label: "Time",
    icon: "🕐",
    description: "Time picker",
    category: "datetime",
  },
  {
    type: "datetime",
    label: "Date & Time",
    icon: "📆",
    description: "Date and time",
    category: "datetime",
  },

  // Advanced
  {
    type: "file",
    label: "File Upload",
    icon: "📎",
    description: "Upload files",
    category: "advanced",
  },
  {
    type: "url",
    label: "Website URL",
    icon: "🔗",
    description: "Web address",
    category: "advanced",
  },
  {
    type: "color",
    label: "Color Picker",
    icon: "🎨",
    description: "Choose color",
    category: "advanced",
  },
  {
    type: "slider",
    label: "Slider",
    icon: "━━●━━",
    description: "Range slider",
    category: "advanced",
  },
  {
    type: "signature",
    label: "Signature",
    icon: "✍️",
    description: "Draw signature",
    category: "advanced",
  },

  // Content
  {
    type: "heading",
    label: "Heading",
    icon: "📰",
    description: "Section title",
    category: "content",
  },
  {
    type: "paragraph",
    label: "Paragraph",
    icon: "📃",
    description: "Text content",
    category: "content",
  },
  {
    type: "divider",
    label: "Divider",
    icon: "➖",
    description: "Visual separator",
    category: "content",
  },
  {
    type: "image",
    label: "Image",
    icon: "🖼️",
    description: "Display image",
    category: "content",
  },
];

export default function FormBuilderNew() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = window.location;
  const isEditing = !!id;

  console.log("🔧 FormBuilderNew component loaded");

  // Get template data from navigation state
  const templateData = history.state?.templateData;
  const customCode = history.state?.customCode;

  const [formData, setFormData] = useState(
    templateData || {
      name: "",
      description: "",
      type: "custom",
      status: "draft",
      fields: [],
      submit_button_text: "Submit",
      success_message: "Thank you for your submission!",
      error_message: "Something went wrong. Please try again.",
    }
  );

  const [editingField, setEditingField] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draggedField, setDraggedField] = useState(null);
  const [toast, setToast] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showCustomCodeEditor, setShowCustomCodeEditor] = useState(false);
  const [isEditorFullscreen, setIsEditorFullscreen] = useState(false);

  // Initialize customCodeContent from formData when it changes
  const [customCodeContent, setCustomCodeContent] = useState(customCode || formData.custom_code || "");

  // Sync customCodeContent with formData.custom_code when formData changes
  useEffect(() => {
    if (formData.custom_code) {
      setCustomCodeContent(formData.custom_code);
    }
  }, [formData.custom_code]);

  useEffect(() => {
    if (isEditing) {
      fetchForm();
    }
  }, [id]);

  const fetchForm = async () => {
    try {
      const response = await api.get(`/forms/${id}`);
      setFormData(response.data);
      // Check if it's a custom code form
      if (response.data.custom_code) {
        setCustomCodeContent(response.data.custom_code);
        setShowCustomCodeEditor(true);
      }
    } catch (error) {
      console.error("Error fetching form:", error);
    }
  };

  const handleSave = async () => {
    if (!formData.name) {
      setToast({ message: "Please enter a form name", type: "warning" });
      return;
    }

    console.log("Saving form data:", formData);
    console.log("custom_code in formData:", formData.custom_code);
    console.log("formData.type:", formData.type);

    try {
      setSaving(true);
      if (isEditing) {
        console.log("Updating form with ID:", id);
        const response = await api.put(`/forms/${id}`, formData);
        console.log("Form updated successfully:", response.data);
        console.log("Returned custom_code:", response.data.custom_code);
        // Use window.location for guaranteed redirect
        window.location.href = "/admin/forms?tab=forms";
      } else {
        console.log("Creating new form...");
        const response = await api.post("/forms", formData);
        console.log("Form created successfully:", response.data);
        // Use window.location for guaranteed redirect
        window.location.href = "/admin/forms?tab=forms";
      }
    } catch (error) {
      console.error("Error saving form - Full error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      setToast({ 
        message: error.response?.data?.message || "Failed to save form", 
        type: "error" 
      });
      setSaving(false);
    }
  };

  const addField = (fieldType) => {
    const newField = {
      id: Date.now().toString(),
      type: fieldType.type,
      label: fieldType.label,
      name: `field_${Date.now()}`,
      placeholder: "",
      required: false,
      description: "",
      options: ["select", "radio", "checkbox"].includes(fieldType.type)
        ? [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
          ]
        : [],
      content: ["heading", "paragraph", "image"].includes(fieldType.type)
        ? "Your content here"
        : "",
      max:
        fieldType.type === "rating"
          ? 5
          : fieldType.type === "slider"
          ? 100
          : undefined,
      min: ["slider", "rating"].includes(fieldType.type)
        ? fieldType.type === "rating"
          ? 1
          : 0
        : undefined,
      step: fieldType.type === "slider" ? 1 : undefined,
    };

    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));

    setEditingField(newField);
  };

  const updateField = (fieldId, updates) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    }));
    if (editingField?.id === fieldId) {
      setEditingField((prev) => ({ ...prev, ...updates }));
    }
  };

  const deleteField = (fieldId) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== fieldId),
    }));
    if (editingField?.id === fieldId) {
      setEditingField(null);
    }
  };

  const duplicateField = (field) => {
    const duplicated = {
      ...field,
      id: Date.now().toString(),
      name: `${field.name}_copy`,
    };
    const index = formData.fields.findIndex((f) => f.id === field.id);
    setFormData((prev) => ({
      ...prev,
      fields: [
        ...prev.fields.slice(0, index + 1),
        duplicated,
        ...prev.fields.slice(index + 1),
      ],
    }));
  };

  const handleDragStart = (e, field) => {
    setDraggedField(field);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, targetField) => {
    e.preventDefault();
    if (!draggedField || draggedField.id === targetField.id) return;

    const draggedIndex = formData.fields.findIndex(
      (f) => f.id === draggedField.id
    );
    const targetIndex = formData.fields.findIndex(
      (f) => f.id === targetField.id
    );

    const newFields = [...formData.fields];
    newFields.splice(draggedIndex, 1);
    newFields.splice(targetIndex, 0, draggedField);

    setFormData((prev) => ({ ...prev, fields: newFields }));
  };

  const renderFieldPreview = (field) => {
    const inputClasses =
      "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent";

    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "number":
      case "url":
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            className={inputClasses}
            disabled
          />
        );

      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder}
            rows={3}
            className={inputClasses}
            disabled
          />
        );

      case "select":
        return (
          <select className={inputClasses} disabled>
            <option>Select...</option>
            {field.options?.map((opt, idx) => (
              <option key={idx}>{opt.label}</option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((opt, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input type="radio" name={field.name} disabled />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((opt, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input type="checkbox" disabled />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case "yesno":
        return (
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name={field.name} disabled />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name={field.name} disabled />
              <span>No</span>
            </label>
          </div>
        );

      case "rating":
        return (
          <div className="flex gap-1">
            {[...Array(field.max || 5)].map((_, i) => (
              <span key={i} className="text-2xl text-gray-300">
                ⭐
              </span>
            ))}
          </div>
        );

      case "date":
        return <input type="date" className={inputClasses} disabled />;

      case "time":
        return <input type="time" className={inputClasses} disabled />;

      case "datetime":
        return (
          <input type="datetime-local" className={inputClasses} disabled />
        );

      case "file":
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <div className="text-gray-400 text-sm">
              📎 Click to upload or drag and drop
            </div>
          </div>
        );

      case "color":
        return (
          <div className="flex items-center gap-3">
            <input
              type="color"
              className="h-10 w-20 rounded border border-gray-300"
              disabled
            />
            <span className="text-sm text-gray-500">#3b82f6</span>
          </div>
        );

      case "slider":
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={field.min || 0}
              max={field.max || 100}
              className="w-full"
              disabled
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{field.min || 0}</span>
              <span>{field.max || 100}</span>
            </div>
          </div>
        );

      case "signature":
        return (
          <div className="border-2 border-gray-300 rounded-lg p-4 h-32 bg-gray-50 flex items-center justify-center">
            <span className="text-gray-400 text-sm">
              ✍️ Draw your signature here
            </span>
          </div>
        );

      case "heading":
        return (
          <h3 className="text-xl font-bold text-gray-900">
            {field.content || "Heading"}
          </h3>
        );

      case "paragraph":
        return (
          <p className="text-gray-600 leading-relaxed">
            {field.content || "Paragraph text goes here..."}
          </p>
        );

      case "divider":
        return <hr className="border-t-2 border-gray-200" />;

      case "image":
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
            <div className="text-4xl mb-2">🖼️</div>
            <div className="text-sm text-gray-500">
              {field.content || "Image URL"}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/forms?tab=forms")}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="text-lg font-semibold border-none outline-none focus:ring-0"
            placeholder="Untitled Form"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <FiEye size={18} />
            Preview
          </button>
          {formData.type === "custom" && (
            <button
              onClick={() => {
                // Sync customCodeContent with latest formData before opening
                setCustomCodeContent(formData.custom_code || "");
                setShowCustomCodeEditor(true);
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <FiCode size={18} />
              Edit Code
            </button>
          )}
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <FiSettings size={18} />
            Settings
          </button>
          <button
            onClick={() => {
              console.log("🔘 Save button clicked!");
              handleSave();
            }}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            <FiSave size={18} />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Fields Palette */}
        <div className="w-72 bg-white border-r overflow-y-auto">
          <div className="p-4">
            {/* Basic Fields */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Basic Fields
              </h3>
              <div className="space-y-1.5">
                {FIELD_TYPES.filter((f) => f.category === "basic").map(
                  (fieldType) => (
                    <button
                      key={fieldType.type}
                      onClick={() => addField(fieldType)}
                      className="w-full flex items-center gap-2.5 p-2.5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all text-left group"
                    >
                      <span className="text-lg">{fieldType.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm group-hover:text-blue-600">
                          {fieldType.label}
                        </div>
                      </div>
                      <FiPlus
                        className="text-gray-400 group-hover:text-blue-600"
                        size={14}
                      />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Choice Fields */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Choice Fields
              </h3>
              <div className="space-y-1.5">
                {FIELD_TYPES.filter((f) => f.category === "choice").map(
                  (fieldType) => (
                    <button
                      key={fieldType.type}
                      onClick={() => addField(fieldType)}
                      className="w-full flex items-center gap-2.5 p-2.5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all text-left group"
                    >
                      <span className="text-lg">{fieldType.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm group-hover:text-blue-600">
                          {fieldType.label}
                        </div>
                      </div>
                      <FiPlus
                        className="text-gray-400 group-hover:text-blue-600"
                        size={14}
                      />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Date & Time */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Date & Time
              </h3>
              <div className="space-y-1.5">
                {FIELD_TYPES.filter((f) => f.category === "datetime").map(
                  (fieldType) => (
                    <button
                      key={fieldType.type}
                      onClick={() => addField(fieldType)}
                      className="w-full flex items-center gap-2.5 p-2.5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all text-left group"
                    >
                      <span className="text-lg">{fieldType.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm group-hover:text-blue-600">
                          {fieldType.label}
                        </div>
                      </div>
                      <FiPlus
                        className="text-gray-400 group-hover:text-blue-600"
                        size={14}
                      />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Advanced Fields */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Advanced
              </h3>
              <div className="space-y-1.5">
                {FIELD_TYPES.filter((f) => f.category === "advanced").map(
                  (fieldType) => (
                    <button
                      key={fieldType.type}
                      onClick={() => addField(fieldType)}
                      className="w-full flex items-center gap-2.5 p-2.5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all text-left group"
                    >
                      <span className="text-lg">{fieldType.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm group-hover:text-blue-600">
                          {fieldType.label}
                        </div>
                      </div>
                      <FiPlus
                        className="text-gray-400 group-hover:text-blue-600"
                        size={14}
                      />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Content Elements */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Content
              </h3>
              <div className="space-y-1.5">
                {FIELD_TYPES.filter((f) => f.category === "content").map(
                  (fieldType) => (
                    <button
                      key={fieldType.type}
                      onClick={() => addField(fieldType)}
                      className="w-full flex items-center gap-2.5 p-2.5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all text-left group"
                    >
                      <span className="text-lg">{fieldType.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm group-hover:text-blue-600">
                          {fieldType.label}
                        </div>
                      </div>
                      <FiPlus
                        className="text-gray-400 group-hover:text-blue-600"
                        size={14}
                      />
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Center - Form Canvas */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-8">
            {/* Form Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="text-2xl font-bold w-full border-none outline-none focus:ring-0 mb-2"
                placeholder="Form Title"
              />
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full text-gray-600 border-none outline-none focus:ring-0 resize-none"
                placeholder="Form description (optional)"
                rows={2}
              />
            </div>

            {/* Form Fields */}
            {formData.fields.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-12 text-center">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Start building your form
                </h3>
                <p className="text-gray-500">
                  Click on field types from the left to add them to your form
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.fields.map((field, index) => (
                  <div
                    key={field.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, field)}
                    onDragOver={(e) => handleDragOver(e, field)}
                    onDragEnd={() => setDraggedField(null)}
                    className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
                      editingField?.id === field.id
                        ? "border-blue-500 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-3">
                        <FiMove
                          className="text-gray-400 mt-2 cursor-move flex-shrink-0"
                          size={20}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-3">
                            <label className="text-sm font-medium text-gray-900">
                              {field.label}
                              {field.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                          </div>
                          {renderFieldPreview(field)}
                          {field.description && (
                            <p className="text-xs text-gray-500 mt-2">
                              {field.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => setEditingField(field)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
                            title="Edit"
                          >
                            <FiSettings size={16} />
                          </button>
                          <button
                            onClick={() => duplicateField(field)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition"
                            title="Duplicate"
                          >
                            <FiCopy size={16} />
                          </button>
                          <button
                            onClick={() => deleteField(field.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                            title="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button Preview */}
            {formData.fields.length > 0 && (
              <div className="mt-6">
                <button
                  disabled
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg cursor-not-allowed opacity-75"
                >
                  {formData.submit_button_text}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Field Editor Slide-out */}
      {editingField && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl border-l z-50 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Field Settings</h3>
            <button
              onClick={() => setEditingField(null)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Label
              </label>
              <input
                type="text"
                value={editingField.label}
                onChange={(e) =>
                  updateField(editingField.id, { label: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Field Name
              </label>
              <input
                type="text"
                value={editingField.name}
                onChange={(e) =>
                  updateField(editingField.id, { name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Used for form submission data
              </p>
            </div>

            {/* Content field for heading, paragraph, image */}
            {["heading", "paragraph", "image"].includes(editingField.type) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {editingField.type === "image" ? "Image URL" : "Content"}
                </label>
                <textarea
                  value={editingField.content || ""}
                  onChange={(e) =>
                    updateField(editingField.id, { content: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={editingField.type === "paragraph" ? 4 : 2}
                  placeholder={
                    editingField.type === "image"
                      ? "https://example.com/image.jpg"
                      : "Enter content..."
                  }
                />
              </div>
            )}

            {![
              "select",
              "radio",
              "checkbox",
              "yesno",
              "rating",
              "heading",
              "paragraph",
              "divider",
              "image",
              "signature",
              "slider",
            ].includes(editingField.type) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Placeholder
                </label>
                <input
                  type="text"
                  value={editingField.placeholder || ""}
                  onChange={(e) =>
                    updateField(editingField.id, {
                      placeholder: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {!["heading", "paragraph", "divider", "image"].includes(
              editingField.type
            ) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  value={editingField.description || ""}
                  onChange={(e) =>
                    updateField(editingField.id, {
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="Help text for this field"
                />
              </div>
            )}

            {!["heading", "paragraph", "divider", "image"].includes(
              editingField.type
            ) && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="required"
                  checked={editingField.required}
                  onChange={(e) =>
                    updateField(editingField.id, { required: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="required"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Required field
                </label>
              </div>
            )}

            {/* Rating configuration */}
            {editingField.type === "rating" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Number of Stars
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={editingField.max || 5}
                  onChange={(e) =>
                    updateField(editingField.id, {
                      max: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Slider configuration */}
            {editingField.type === "slider" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Min Value
                    </label>
                    <input
                      type="number"
                      value={editingField.min || 0}
                      onChange={(e) =>
                        updateField(editingField.id, {
                          min: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Max Value
                    </label>
                    <input
                      type="number"
                      value={editingField.max || 100}
                      onChange={(e) =>
                        updateField(editingField.id, {
                          max: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Step
                  </label>
                  <input
                    type="number"
                    value={editingField.step || 1}
                    onChange={(e) =>
                      updateField(editingField.id, {
                        step: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {["select", "radio", "checkbox"].includes(editingField.type) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options
                </label>
                <div className="space-y-2">
                  {editingField.options?.map((option, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={option.label}
                        onChange={(e) => {
                          const newOptions = [...editingField.options];
                          newOptions[idx] = {
                            ...option,
                            label: e.target.value,
                            value: e.target.value
                              .toLowerCase()
                              .replace(/\s+/g, "_"),
                          };
                          updateField(editingField.id, { options: newOptions });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Option ${idx + 1}`}
                      />
                      <button
                        onClick={() => {
                          const newOptions = editingField.options.filter(
                            (_, i) => i !== idx
                          );
                          updateField(editingField.id, { options: newOptions });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newOptions = [
                        ...editingField.options,
                        {
                          label: `Option ${editingField.options.length + 1}`,
                          value: `option${editingField.options.length + 1}`,
                        },
                      ];
                      updateField(editingField.id, { options: newOptions });
                    }}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 transition"
                  >
                    + Add Option
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <button
              onClick={() => setEditingField(null)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FiCheck size={18} />
              Done
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-bold">Form Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Form Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="custom">Custom Form</option>
                  <option value="contact">Contact Form</option>
                  <option value="newsletter">Newsletter Signup</option>
                  <option value="lead">Lead Generation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Submit Button Text
                </label>
                <input
                  type="text"
                  value={formData.submit_button_text}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      submit_button_text: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Success Message
                </label>
                <textarea
                  value={formData.success_message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      success_message: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Error Message
                </label>
                <textarea
                  value={formData.error_message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      error_message: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>

              {/* Email Notifications Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  📧 Email Notifications
                </h3>

                <div className="space-y-4">
                  {/* Admin Notification */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={formData.settings?.notifications?.admin || false}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          settings: {
                            ...prev.settings,
                            notifications: {
                              ...prev.settings?.notifications,
                              admin: e.target.checked,
                            },
                          },
                        }))
                      }
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Send Admin Notification
                      </label>
                      <p className="text-xs text-gray-600">
                        Get notified when someone submits this form
                      </p>
                    </div>
                  </div>

                  {/* User Confirmation */}
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={formData.settings?.notifications?.user || false}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          settings: {
                            ...prev.settings,
                            notifications: {
                              ...prev.settings?.notifications,
                              user: e.target.checked,
                            },
                          },
                        }))
                      }
                      className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Send User Confirmation
                      </label>
                      <p className="text-xs text-gray-600 mb-2">
                        Send confirmation email to form submitter (requires
                        email field)
                      </p>
                      {formData.settings?.notifications?.user && (
                        <textarea
                          value={
                            formData.settings?.notifications?.userMessage || ""
                          }
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                notifications: {
                                  ...prev.settings?.notifications,
                                  userMessage: e.target.value,
                                },
                              },
                            }))
                          }
                          placeholder="Custom message for confirmation email (optional)"
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                          rows={2}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  💡 Configure email settings in backend .env file (Gmail, Zoho,
                  Hostinger, GoDaddy supported)
                </p>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowSettings(false)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Preview Modal */}
      <FormPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        formData={formData}
        type="form"
      />

      {/* Custom Code Editor Modal */}
      {showCustomCodeEditor && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className={`bg-white rounded-2xl shadow-2xl w-full flex flex-col overflow-hidden transition-all duration-300 ${
            isEditorFullscreen ? 'max-w-full h-full m-0 rounded-none' : 'max-w-6xl max-h-[95vh]'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                  <FiCode className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Custom Code Editor</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Write or paste your HTML form code
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditorFullscreen(!isEditorFullscreen)}
                  className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  title={isEditorFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  <FiMaximize2 size={20} />
                </button>
                <button
                  onClick={() => {
                    setShowCustomCodeEditor(false);
                    setIsEditorFullscreen(false);
                  }}
                  className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  title="Close Editor"
                >
                  <FiX size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-8 space-y-6 bg-gray-50">
              {/* Form Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Form Name */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Form Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="e.g., Contact Form"
                  />
                </div>

                {/* Form Description */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="text-lg">💬</span>
                    Description <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Brief description"
                  />
                </div>
              </div>

              {/* Code Editor - Using Reusable Component */}
              <CodeEditorFullscreen
                value={customCodeContent}
                onChange={setCustomCodeContent}
                language="HTML/JSX"
                minHeight={isEditorFullscreen ? 'calc(100vh-400px)' : '450px'}
                placeholder="<!DOCTYPE html>&#10;<html lang='en'>&#10;<head>&#10;  <meta charset='UTF-8'>&#10;  <title>My Form</title>&#10;</head>&#10;<body>&#10;  <form>&#10;    <input type='text' name='name' placeholder='Your Name' required />&#10;    <input type='email' name='email' placeholder='Your Email' required />&#10;    <button type='submit'>Submit</button>&#10;  </form>&#10;</body>&#10;</html>"
              />
            </div>

            {/* Footer */}
            <div className="px-8 py-5 border-t bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Ready to save</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCustomCodeEditor(false)}
                  className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log("Apply Changes clicked");
                    console.log("customCodeContent:", customCodeContent);
                    setFormData((prev) => {
                      const updated = {
                        ...prev,
                        custom_code: customCodeContent,
                        type: "custom",
                      };
                      console.log("Updated formData:", updated);
                      return updated;
                    });
                    setShowCustomCodeEditor(false);
                    setToast({ message: "✨ Custom code applied successfully!", type: "success" });
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg shadow-blue-500/30 flex items-center gap-2"
                >
                  <span>Apply Changes</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
