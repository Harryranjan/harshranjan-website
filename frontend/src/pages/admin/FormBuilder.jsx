import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import { AutoSaveIndicator } from "../../components/ui";

const FIELD_TYPES = [
  {
    type: "text",
    label: "Text Input",
    icon: "📝",
    description: "Single line text field",
  },
  {
    type: "email",
    label: "Email",
    icon: "📧",
    description: "Email address field",
  },
  {
    type: "tel",
    label: "Phone",
    icon: "📞",
    description: "Phone number field",
  },
  {
    type: "textarea",
    label: "Text Area",
    icon: "📄",
    description: "Multi-line text field",
  },
  {
    type: "number",
    label: "Number",
    icon: "🔢",
    description: "Numeric input field",
  },
  {
    type: "select",
    label: "Dropdown",
    icon: "📋",
    description: "Select from options",
  },
  {
    type: "radio",
    label: "Radio Buttons",
    icon: "🔘",
    description: "Choose one option",
  },
  {
    type: "checkbox",
    label: "Checkboxes",
    icon: "☑️",
    description: "Multiple selections",
  },
  {
    type: "date",
    label: "Date Picker",
    icon: "📅",
    description: "Date selection",
  },
  {
    type: "time",
    label: "Time Picker",
    icon: "🕐",
    description: "Time selection",
  },
  {
    type: "file",
    label: "File Upload",
    icon: "📎",
    description: "Upload files",
  },
  { type: "url", label: "URL", icon: "🔗", description: "Website URL field" },
  {
    type: "hidden",
    label: "Hidden Field",
    icon: "👁️",
    description: "Hidden value",
  },
  {
    type: "heading",
    label: "Heading",
    icon: "📰",
    description: "Section heading",
  },
  {
    type: "paragraph",
    label: "Paragraph",
    icon: "📃",
    description: "Text content",
  },
  {
    type: "divider",
    label: "Divider",
    icon: "➖",
    description: "Visual separator",
  },
];

export default function FormBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "custom",
    status: "draft",
    fields: [],
    settings: {
      showProgressBar: false,
      allowMultipleSubmissions: false,
      requireCaptcha: false,
      redirectUrl: "",
      emailNotifications: [],
      successAction: "message",
    },
    styling: {
      layout: "vertical",
      labelPosition: "top",
      fieldSpacing: "normal",
      buttonAlignment: "left",
    },
    submit_button_text: "Submit",
    success_message: "Thank you for your submission!",
    error_message: "Something went wrong. Please try again.",
  });

  const [selectedField, setSelectedField] = useState(null);
  const [draggedField, setDraggedField] = useState(null);
  const [saving, setSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState("saved");

  useEffect(() => {
    if (isEditing) {
      fetchForm();
    }
  }, [id]);

  const fetchForm = async () => {
    try {
      const response = await api.get(`/forms/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching form:", error);
      alert("Failed to load form");
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setAutoSaveStatus("saving");

      if (isEditing) {
        await api.put(`/forms/${id}`, formData);
      } else {
        const response = await api.post("/forms", formData);
        navigate(`/admin/forms/${response.data.id}/edit`, { replace: true });
      }

      setAutoSaveStatus("saved");
    } catch (error) {
      console.error("Error saving form:", error);
      setAutoSaveStatus("error");
      alert("Failed to save form");
    } finally {
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
      validation: {},
      options:
        fieldType.type === "select" ||
        fieldType.type === "radio" ||
        fieldType.type === "checkbox"
          ? [{ label: "Option 1", value: "option1" }]
          : [],
      defaultValue: "",
      ...([" heading", "paragraph", "divider"].includes(fieldType.type) && {
        content: "Your content here",
      }),
    };

    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));

    setSelectedField(newField);
  };

  const updateField = (fieldId, updates) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    }));
  };

  const deleteField = (fieldId) => {
    if (!confirm("Delete this field?")) return;

    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== fieldId),
    }));

    if (selectedField?.id === fieldId) {
      setSelectedField(null);
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

  const moveField = (fieldId, direction) => {
    const index = formData.fields.findIndex((f) => f.id === fieldId);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === formData.fields.length - 1)
    ) {
      return;
    }

    const newFields = [...formData.fields];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newFields[index], newFields[newIndex]] = [
      newFields[newIndex],
      newFields[index],
    ];

    setFormData((prev) => ({ ...prev, fields: newFields }));
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

  const handleDragEnd = () => {
    setDraggedField(null);
  };

  const renderFieldPreview = (field) => {
    const commonClasses =
      "w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent";

    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "url":
      case "number":
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            className={commonClasses}
            disabled
          />
        );
      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder}
            rows={4}
            required={field.required}
            className={commonClasses}
            disabled
          />
        );
      case "select":
        return (
          <select className={commonClasses} disabled>
            <option value="">Select an option</option>
            {field.options?.map((opt, idx) => (
              <option key={idx} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((opt, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  disabled
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((opt, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input type="checkbox" value={opt.value} disabled />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );
      case "date":
        return <input type="date" className={commonClasses} disabled />;
      case "time":
        return <input type="time" className={commonClasses} disabled />;
      case "file":
        return <input type="file" className={commonClasses} disabled />;
      case "heading":
        return (
          <h3 className="text-2xl font-bold">{field.content || "Heading"}</h3>
        );
      case "paragraph":
        return (
          <p className="text-gray-700">{field.content || "Paragraph text"}</p>
        );
      case "divider":
        return <hr className="border-t-2 border-gray-300 my-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin/forms")}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-2xl font-bold">
                  {isEditing ? "Edit Form" : "Create New Form"}
                </h1>
                <AutoSaveIndicator status={autoSaveStatus} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Form"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Field Types */}
        <div
          className="w-80 bg-white border-r p-6 overflow-y-auto"
          style={{ height: "calc(100vh - 73px)" }}
        >
          <h2 className="text-lg font-bold mb-4">Add Fields</h2>
          <div className="space-y-2">
            {FIELD_TYPES.map((fieldType) => (
              <button
                key={fieldType.type}
                onClick={() => addField(fieldType)}
                className="w-full flex items-start gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left group"
              >
                <span className="text-2xl">{fieldType.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 group-hover:text-blue-700">
                    {fieldType.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {fieldType.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center - Form Builder */}
        <div
          className="flex-1 p-6 overflow-y-auto"
          style={{ height: "calc(100vh - 73px)" }}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Form Settings */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <h2 className="text-xl font-bold">Form Settings</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Form Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                    placeholder="My Contact Form"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Form Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, type: e.target.value }))
                    }
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="custom">Custom</option>
                    <option value="contact">Contact Form</option>
                    <option value="newsletter">Newsletter</option>
                    <option value="lead">Lead Generation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                  rows={2}
                  placeholder="Optional description"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
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
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Form Fields</h2>

              {formData.fields.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-lg">No fields added yet</p>
                  <p className="text-sm">
                    Click on field types from the left sidebar to add them
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.fields.map((field, index) => (
                    <div
                      key={field.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, field)}
                      onDragOver={(e) => handleDragOver(e, field)}
                      onDragEnd={handleDragEnd}
                      onClick={() => setSelectedField(field)}
                      className={`p-4 border-2 rounded-lg cursor-move hover:border-blue-400 transition ${
                        selectedField?.id === field.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-gray-400 mt-1">⋮⋮</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-500">
                                {
                                  FIELD_TYPES.find(
                                    (ft) => ft.type === field.type
                                  )?.icon
                                }
                              </span>
                              <span className="font-medium">{field.label}</span>
                              {field.required && (
                                <span className="text-red-500 text-xs">*</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveField(field.id, "up");
                                }}
                                disabled={index === 0}
                                className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                              >
                                ↑
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveField(field.id, "down");
                                }}
                                disabled={index === formData.fields.length - 1}
                                className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                              >
                                ↓
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  duplicateField(field);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                                title="Duplicate"
                              >
                                📑
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteField(field.id);
                                }}
                                className="text-red-600 hover:text-red-800"
                                title="Delete"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>

                          {/* Field Preview */}
                          {renderFieldPreview(field)}

                          {field.description && (
                            <p className="text-sm text-gray-500 mt-2">
                              {field.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Field Settings */}
        <div
          className="w-96 bg-white border-l p-6 overflow-y-auto"
          style={{ height: "calc(100vh - 73px)" }}
        >
          {selectedField ? (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Field Settings</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label *
                </label>
                <input
                  type="text"
                  value={selectedField.label}
                  onChange={(e) =>
                    updateField(selectedField.id, { label: e.target.value })
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field Name *
                </label>
                <input
                  type="text"
                  value={selectedField.name}
                  onChange={(e) =>
                    updateField(selectedField.id, { name: e.target.value })
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              {!["heading", "paragraph", "divider"].includes(
                selectedField.type
              ) && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Placeholder
                    </label>
                    <input
                      type="text"
                      value={selectedField.placeholder}
                      onChange={(e) =>
                        updateField(selectedField.id, {
                          placeholder: e.target.value,
                        })
                      }
                      className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedField.required}
                        onChange={(e) =>
                          updateField(selectedField.id, {
                            required: e.target.checked,
                          })
                        }
                      />
                      <span className="text-sm font-medium">
                        Required Field
                      </span>
                    </label>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={selectedField.description}
                  onChange={(e) =>
                    updateField(selectedField.id, {
                      description: e.target.value,
                    })
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                  rows={3}
                />
              </div>

              {["heading", "paragraph"].includes(selectedField.type) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={selectedField.content}
                    onChange={(e) =>
                      updateField(selectedField.id, { content: e.target.value })
                    }
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                    rows={4}
                  />
                </div>
              )}

              {["select", "radio", "checkbox"].includes(selectedField.type) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Options
                  </label>
                  <div className="space-y-2">
                    {selectedField.options?.map((option, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={option.label}
                          onChange={(e) => {
                            const newOptions = [...selectedField.options];
                            newOptions[idx].label = e.target.value;
                            updateField(selectedField.id, {
                              options: newOptions,
                            });
                          }}
                          className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2 text-sm"
                          placeholder="Option label"
                        />
                        <button
                          onClick={() => {
                            const newOptions = selectedField.options.filter(
                              (_, i) => i !== idx
                            );
                            updateField(selectedField.id, {
                              options: newOptions,
                            });
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newOptions = [
                          ...selectedField.options,
                          {
                            label: `Option ${selectedField.options.length + 1}`,
                            value: `option${selectedField.options.length + 1}`,
                          },
                        ];
                        updateField(selectedField.id, { options: newOptions });
                      }}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600"
                    >
                      + Add Option
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-5xl mb-4">👈</div>
              <p>Select a field to edit its settings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
