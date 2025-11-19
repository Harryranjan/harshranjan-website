import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

export default function ModalBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [modalData, setModalData] = useState({
    name: "",
    title: "",
    content: "",
    type: "custom",
    trigger_type: "manual",
    trigger_value: "",
    display_rules: {
      pages: [],
      devices: ["desktop", "mobile", "tablet"],
      frequency: "always",
    },
    styling: {
      size: "medium",
      position: "center",
      backgroundColor: "#ffffff",
      overlay: true,
    },
    form_id: null,
    cta_text: "",
    cta_link: "",
    status: "draft",
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      if (isEditing) {
        await api.put(`/modals/${id}`, modalData);
      } else {
        const response = await api.post("/modals", modalData);
        navigate(`/admin/forms/modals/${response.data.id}/edit`, {
          replace: true,
        });
      }
      alert("Modal saved successfully!");
    } catch (error) {
      console.error("Error saving modal:", error);
      alert("Failed to save modal");
    } finally {
      setSaving(false);
    }
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
            {isEditing ? "Edit Modal" : "Create New Modal"}
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Modal"}
        </button>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Modal Settings</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modal Name *
              </label>
              <input
                type="text"
                value={modalData.name}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                placeholder="Newsletter Signup Modal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modal Type
              </label>
              <select
                value={modalData.type}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="custom">Custom</option>
                <option value="announcement">Announcement</option>
                <option value="offer">Special Offer</option>
                <option value="newsletter">Newsletter</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trigger Type
              </label>
              <select
                value={modalData.trigger_type}
                onChange={(e) =>
                  setModalData((prev) => ({
                    ...prev,
                    trigger_type: e.target.value,
                  }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="manual">Manual</option>
                <option value="time">Time Delay</option>
                <option value="scroll">Scroll Percentage</option>
                <option value="exit">Exit Intent</option>
                <option value="click">On Click</option>
              </select>
            </div>

            {modalData.trigger_type !== "manual" &&
              modalData.trigger_type !== "exit" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trigger Value
                  </label>
                  <input
                    type="text"
                    value={modalData.trigger_value}
                    onChange={(e) =>
                      setModalData((prev) => ({
                        ...prev,
                        trigger_value: e.target.value,
                      }))
                    }
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                    placeholder={
                      modalData.trigger_type === "time"
                        ? "Seconds (e.g., 5)"
                        : modalData.trigger_type === "scroll"
                        ? "Percentage (e.g., 50)"
                        : "CSS Selector"
                    }
                  />
                </div>
              )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={modalData.status}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, status: e.target.value }))
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
                value={modalData.title}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                placeholder="Get 20% Off Your First Order!"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message/Content
              </label>
              <textarea
                value={modalData.content}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, content: e.target.value }))
                }
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                rows={6}
                placeholder="Enter your modal content here..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={modalData.cta_text}
                  onChange={(e) =>
                    setModalData((prev) => ({
                      ...prev,
                      cta_text: e.target.value,
                    }))
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Get Started"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  value={modalData.cta_link}
                  onChange={(e) =>
                    setModalData((prev) => ({
                      ...prev,
                      cta_link: e.target.value,
                    }))
                  }
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
                  placeholder="/products"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Preview</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
              {modalData.title && (
                <h3 className="text-2xl font-bold mb-4">{modalData.title}</h3>
              )}
              {modalData.content && (
                <p className="text-gray-700 mb-6">{modalData.content}</p>
              )}
              {modalData.cta_text && (
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
                  {modalData.cta_text}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
