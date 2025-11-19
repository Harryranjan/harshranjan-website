import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

export default function PopupBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [popupData, setPopupData] = useState({
    name: "",
    title: "",
    message: "",
    type: "banner",
    position: "bottom-right",
    trigger_type: "immediate",
    trigger_value: "",
    display_rules: {
      pages: [],
      devices: ["desktop", "mobile", "tablet"],
      frequency: "once",
      scrollPercentage: 0,
    },
    styling: {
      backgroundColor: "#1e40af",
      textColor: "#ffffff",
      borderRadius: "8px",
      animation: "slide-in",
    },
    form_id: null,
    cta_text: "",
    cta_link: "",
    close_button: true,
    auto_close: 0,
    status: "draft",
    start_date: "",
    end_date: "",
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      if (isEditing) {
        await api.put(`/popups/${id}`, popupData);
      } else {
        const response = await api.post("/popups", popupData);
        navigate(`/admin/forms/popups/${response.data.id}/edit`, {
          replace: true,
        });
      }
      alert("Popup saved successfully!");
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
    };
    return positions[popupData.position] || positions["bottom-right"];
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
                value={popupData.position}
                onChange={(e) =>
                  setPopupData((prev) => ({
                    ...prev,
                    position: e.target.value,
                  }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
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
                Auto Close After (seconds, 0 = never)
              </label>
              <input
                type="number"
                value={popupData.auto_close}
                onChange={(e) =>
                  setPopupData((prev) => ({
                    ...prev,
                    auto_close: parseInt(e.target.value),
                  }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                placeholder="0"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={popupData.close_button}
                  onChange={(e) =>
                    setPopupData((prev) => ({
                      ...prev,
                      close_button: e.target.checked,
                    }))
                  }
                />
                <span className="text-sm font-medium">Show Close Button</span>
              </label>
            </div>

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
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>

          {popupData.status === "scheduled" && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  value={popupData.start_date}
                  onChange={(e) =>
                    setPopupData((prev) => ({
                      ...prev,
                      start_date: e.target.value,
                    }))
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  value={popupData.end_date}
                  onChange={(e) =>
                    setPopupData((prev) => ({
                      ...prev,
                      end_date: e.target.value,
                    }))
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
            </div>
          )}
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
                Message
              </label>
              <textarea
                value={popupData.message}
                onChange={(e) =>
                  setPopupData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                rows={3}
                placeholder="We use cookies to improve your experience..."
              />
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
              {popupData.close_button && (
                <button className="absolute top-2 right-2 opacity-70 hover:opacity-100">
                  ✕
                </button>
              )}
              {popupData.title && (
                <h3 className="font-bold text-lg mb-2">{popupData.title}</h3>
              )}
              {popupData.message && (
                <p className="text-sm mb-4 opacity-90">{popupData.message}</p>
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
    </div>
  );
}
