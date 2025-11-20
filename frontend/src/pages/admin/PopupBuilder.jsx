import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import Modal from "../../components/ui/Modal";
import {
  POPUP_TEMPLATES,
  POSITION_OPTIONS,
  SIZE_OPTIONS,
  ANIMATION_OPTIONS,
  TRIGGER_OPTIONS,
} from "../../components/admin/popups/PopupTemplates";

export default function PopupBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isCustomCode, setIsCustomCode] = useState(false);

  const [popupData, setPopupData] = useState({
    name: "",
    title: "",
    content: "",
    type: "notification",
    template: "",
    icon: "🔔",
    trigger_type: "immediate",
    trigger_value: "",
    display_rules: {
      pages: [],
      pageTargeting: "all",
      devices: ["desktop", "mobile", "tablet"],
      frequency: "always",
    },
    styling: {
      position: "bottom-right",
      size: "small",
      backgroundColor: "#3b82f6",
      textColor: "#ffffff",
      borderRadius: "8",
      shadow: true,
      animation: "slideIn",
      autoClose: false,
      autoCloseDelay: 5,
    },
    form_id: null,
    cta_text: "",
    cta_link: "",
    status: "draft",
  });

  const [saving, setSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const applyTemplate = (templateKey) => {
    const template = POPUP_TEMPLATES[templateKey];
    if (!template) return;

    setSelectedTemplate(templateKey);
    setIsCustomCode(template.isCustomCode || false);
    setPopupData({
      ...popupData,
      name: template.name,
      title: template.title,
      content: template.content,
      type: template.type,
      template: templateKey,
      icon: template.icon,
      styling: template.styling,
      cta_text: template.cta_text || "",
      cta_link: template.cta_link || "",
      trigger_type: template.trigger_type || "immediate",
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (isEditing) {
        await api.put(`/popups/${id}`, popupData);
        setShowSuccessModal(true);
        setTimeout(() => {
          navigate("/admin/forms?tab=popups");
        }, 2000);
      } else {
        await api.post("/popups", popupData);
        setShowSuccessModal(true);
        setTimeout(() => {
          navigate("/admin/forms?tab=popups");
        }, 2000);
      }
    } catch (error) {
      console.error("Error saving popup:", error);
      alert("Failed to save popup");
    } finally {
      setSaving(false);
    }
  };

  const getPositionPreview = () => {
    const positions = {
      top: "top-0 left-1/2 -translate-x-1/2",
      bottom: "bottom-0 left-1/2 -translate-x-1/2",
      "top-left": "top-4 left-4",
      "top-right": "top-4 right-4",
      "bottom-left": "bottom-4 left-4",
      "bottom-right": "bottom-4 right-4",
      center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      "top-center": "top-0 left-1/2 -translate-x-1/2",
      "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
    };
    return positions[popupData.styling.position] || positions["bottom-right"];
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/admin/forms")}
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2 mb-2"
          >
            ← Back to Forms
          </button>
          <h1 className="text-2xl font-bold">
            {isEditing ? "Edit Popup" : "Create New Popup"}
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Popup"}
        </button>
      </div>

      {/* Template Selection */}
      {!isEditing && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">
            📋 Choose a Template (Optional)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(POPUP_TEMPLATES).map(([key, template]) => (
              <button
                key={key}
                type="button"
                onClick={() => applyTemplate(key)}
                className={`p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                  selectedTemplate === key
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-300"
                }`}
              >
                <div className="text-3xl mb-2">{template.icon}</div>
                <div className="font-medium text-sm">{template.name}</div>
                <div className="text-xs text-gray-500 mt-1 capitalize">
                  {template.type.replace("_", " ")}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Popup Settings</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Popup Name *
              </label>
              <input
                type="text"
                value={popupData.name}
                onChange={(e) =>
                  setPopupData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                placeholder="Cookie Consent Banner"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Popup Type
              </label>
              <select
                value={popupData.type}
                onChange={(e) =>
                  setPopupData((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="banner">Banner</option>
                <option value="slide-in">Slide-in</option>
                <option value="corner">Corner Box</option>
                <option value="bar">Sticky Bar</option>
                <option value="full-screen">Full Screen</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <select
                value={popupData.styling.position}
                onChange={(e) =>
                  setPopupData((prev) => ({
                    ...prev,
                    styling: { ...prev.styling, position: e.target.value },
                  }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="top-center">Top Center</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="center">Center</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trigger
              </label>
              <select
                value={popupData.trigger_type}
                onChange={(e) =>
                  setPopupData((prev) => ({
                    ...prev,
                    trigger_type: e.target.value,
                  }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="immediate">Immediately</option>
                <option value="time">Time Delay</option>
                <option value="scroll">On Scroll</option>
                <option value="exit">Exit Intent</option>
                <option value="click">On Click</option>
              </select>
            </div>

            {(popupData.trigger_type === "time" ||
              popupData.trigger_type === "scroll") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {popupData.trigger_type === "time"
                    ? "Delay (seconds)"
                    : "Scroll (%)"}
                </label>
                <input
                  type="number"
                  value={popupData.trigger_value}
                  onChange={(e) =>
                    setPopupData((prev) => ({
                      ...prev,
                      trigger_value: e.target.value,
                    }))
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                  placeholder={popupData.trigger_type === "time" ? "5" : "50"}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={popupData.status}
                onChange={(e) =>
                  setPopupData((prev) => ({ ...prev, status: e.target.value }))
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

        {/* Content */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Content</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={popupData.title}
                onChange={(e) =>
                  setPopupData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                placeholder="🍪 We use cookies"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isCustomCode ? "Custom HTML/CSS/JS Code" : "Content"}
              </label>
              {isCustomCode ? (
                <textarea
                  value={popupData.content}
                  onChange={(e) =>
                    setPopupData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 font-mono text-sm"
                  rows={15}
                  placeholder="<!-- Your custom HTML/CSS/JS code here -->"
                />
              ) : (
                <textarea
                  value={popupData.content}
                  onChange={(e) =>
                    setPopupData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                  rows={3}
                  placeholder="We use cookies to improve your experience..."
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={popupData.cta_text}
                  onChange={(e) =>
                    setPopupData((prev) => ({
                      ...prev,
                      cta_text: e.target.value,
                    }))
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Accept"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Link (optional)
                </label>
                <input
                  type="text"
                  value={popupData.cta_link}
                  onChange={(e) =>
                    setPopupData((prev) => ({
                      ...prev,
                      cta_link: e.target.value,
                    }))
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                  placeholder="/privacy-policy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Styling */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Styling</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <select
                value={popupData.styling.size}
                onChange={(e) =>
                  setPopupData((prev) => ({
                    ...prev,
                    styling: { ...prev.styling, size: e.target.value },
                  }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="full">Full Width</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Animation
              </label>
              <select
                value={popupData.styling.animation}
                onChange={(e) =>
                  setPopupData((prev) => ({
                    ...prev,
                    styling: { ...prev.styling, animation: e.target.value },
                  }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="slideIn">Slide In</option>
                <option value="fadeIn">Fade In</option>
                <option value="bounce">Bounce</option>
                <option value="zoom">Zoom</option>
                <option value="slideDown">Slide Down</option>
                <option value="slideUp">Slide Up</option>
                <option value="none">None</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <input
                type="color"
                value={popupData.styling.backgroundColor}
                onChange={(e) =>
                  setPopupData((prev) => ({
                    ...prev,
                    styling: {
                      ...prev.styling,
                      backgroundColor: e.target.value,
                    },
                  }))
                }
                className="w-full h-12 border-2 border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <input
                type="color"
                value={popupData.styling.textColor}
                onChange={(e) =>
                  setPopupData((prev) => ({
                    ...prev,
                    styling: { ...prev.styling, textColor: e.target.value },
                  }))
                }
                className="w-full h-12 border-2 border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Radius (px)
              </label>
              <input
                type="number"
                value={popupData.styling.borderRadius}
                onChange={(e) =>
                  setPopupData((prev) => ({
                    ...prev,
                    styling: { ...prev.styling, borderRadius: e.target.value },
                  }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                placeholder="8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto Close (seconds, 0 = never)
              </label>
              <input
                type="number"
                value={popupData.styling.autoCloseDelay || 0}
                onChange={(e) =>
                  setPopupData((prev) => ({
                    ...prev,
                    styling: {
                      ...prev.styling,
                      autoClose: parseInt(e.target.value) > 0,
                      autoCloseDelay: parseInt(e.target.value),
                    },
                  }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                placeholder="0"
              />
            </div>

            <div className="col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={popupData.styling.shadow}
                  onChange={(e) =>
                    setPopupData((prev) => ({
                      ...prev,
                      styling: { ...prev.styling, shadow: e.target.checked },
                    }))
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Add Shadow</span>
              </label>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Preview</h3>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg h-96 bg-gray-50 overflow-hidden">
            <div
              className={`absolute ${getPositionPreview()} max-w-md shadow-xl rounded-lg p-4`}
              style={{
                backgroundColor: popupData.styling.backgroundColor,
                color: popupData.styling.textColor,
              }}
            >
              <button className="absolute top-2 right-2 opacity-70 hover:opacity-100">
                ✕
              </button>
              {popupData.title && (
                <h3 className="font-bold text-lg mb-2">{popupData.title}</h3>
              )}
              {popupData.content && !isCustomCode && (
                <p className="text-sm mb-4 opacity-90">{popupData.content}</p>
              )}
              {isCustomCode && (
                <div
                  className="text-xs mb-4 p-2 bg-gray-100 rounded border border-gray-300 font-mono"
                  dangerouslySetInnerHTML={{ __html: popupData.content }}
                />
              )}
              {popupData.cta_text && (
                <button className="px-4 py-2 bg-white text-gray-900 rounded font-medium text-sm hover:bg-gray-100">
                  {popupData.cta_text}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="success"
        title="Success!"
        message={
          isEditing
            ? "Popup updated successfully!"
            : "Popup created successfully! Redirecting to edit mode..."
        }
        autoClose={true}
        autoCloseDuration={2000}
      />
    </div>
  );
}
