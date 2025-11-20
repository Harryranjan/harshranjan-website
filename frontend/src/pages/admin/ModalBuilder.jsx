import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  PageHeader,
  BackButton,
  FormSection,
  FormActions,
  Input,
  Textarea,
  Button,
  Modal,
  Spinner,
  ColorPicker,
  RichTextEditor,
  SelectWithSearch,
} from "../../components/ui";
import api from "../../utils/api";
import Toast from "../../components/Toast";
import FormEmbed from "../../components/FormEmbed";
import { parseShortcodes } from "../../utils/shortcodeParser";

export default function ModalBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [toast, setToast] = useState(null);
  const [forms, setForms] = useState([]);
  const [formsLoading, setFormsLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [pagesLoading, setPagesLoading] = useState(true);

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
      orientation: "vertical",
      backgroundColor: "#ffffff",
      textColor: "#000000",
      overlay: true,
      overlayColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: "8",
      animation: "fade",
    },
    form_id: null,
    cta_text: "",
    cta_link: "",
    status: "draft",
  });

  useEffect(() => {
    loadForms();
    loadPages();
    if (isEditing) {
      loadModal();
    }
  }, [id]);

  const loadForms = async () => {
    try {
      setFormsLoading(true);
      const { data } = await api.get("/forms?limit=100");
      console.log("📋 Forms API Response:", data);
      console.log("📋 Forms array:", data.forms);
      console.log("📋 Forms count:", data.forms?.length || 0);
      setForms(data.forms || data || []);
    } catch (error) {
      console.error("❌ Error loading forms:", error);
      console.error("❌ Error response:", error.response?.data);
      setToast({
        type: "error",
        message: "Failed to load forms. Check console for details.",
      });
    } finally {
      setFormsLoading(false);
    }
  };

  const loadPages = async () => {
    try {
      setPagesLoading(true);
      const { data } = await api.get("/pages?limit=100");
      console.log("📄 Pages API Response:", data);
      setPages(data.pages || data || []);
    } catch (error) {
      console.error("❌ Error loading pages:", error);
      setPages([]);
    } finally {
      setPagesLoading(false);
    }
  };

  const loadModal = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/modals/${id}`);
      setModalData(data);
    } catch (error) {
      console.error("Error loading modal:", error);
      setToast({
        type: "error",
        message: "Failed to load modal",
      });
      navigate("/admin/forms");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setModalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setModalData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!modalData.name.trim()) {
      setToast({
        type: "error",
        message: "Modal name is required",
      });
      return;
    }

    try {
      setSaving(true);
      if (isEditing) {
        await api.put(`/modals/${id}`, modalData);
        setShowSuccessModal(true);
        setToast({
          type: "success",
          message: "Modal updated successfully!",
        });
      } else {
        const response = await api.post("/modals", modalData);
        setShowSuccessModal(true);
        setToast({
          type: "success",
          message: "Modal created successfully!",
        });
        // Navigate to edit mode after successful creation
        setTimeout(() => {
          navigate(`/admin/forms/modals/${response.data.id}/edit`, {
            replace: true,
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Error saving modal:", error);
      setToast({
        type: "error",
        message: error.response?.data?.message || "Failed to save modal",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>
          {isEditing ? "Edit Modal" : "Create Modal"} - Admin Dashboard
        </title>
      </Helmet>

      <PageHeader
        title={isEditing ? "Edit Modal" : "Create Modal"}
        description="Create engaging modals for announcements, offers, and lead generation"
        backButton={<BackButton to="/admin/forms" label="Back to Forms" />}
        actions={
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            Preview
          </Button>
        }
      />

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Settings */}
        <FormSection
          title="Basic Settings"
          description="Configure the modal name and type"
          required
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Modal Name"
              name="name"
              value={modalData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Newsletter Signup Modal"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modal Type
              </label>
              <select
                value={modalData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="custom">Custom</option>
                <option value="announcement">Announcement</option>
                <option value="offer">Special Offer</option>
                <option value="newsletter">Newsletter</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={modalData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </FormSection>

        {/* Trigger Settings */}
        <FormSection
          title="Trigger Settings"
          description="Define when and how the modal should appear"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trigger Type
              </label>
              <select
                value={modalData.trigger_type}
                onChange={(e) => handleChange("trigger_type", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="manual">Manual</option>
                <option value="time">Time Delay</option>
                <option value="scroll">Scroll Percentage</option>
                <option value="exit">Exit Intent</option>
                <option value="click">On Click</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {modalData.trigger_type === "manual" &&
                  "Trigger manually via code"}
                {modalData.trigger_type === "time" &&
                  "Show after specified seconds"}
                {modalData.trigger_type === "scroll" &&
                  "Show after scrolling percentage"}
                {modalData.trigger_type === "exit" &&
                  "Show when user attempts to leave"}
                {modalData.trigger_type === "click" &&
                  "Show when element is clicked"}
              </p>
            </div>

            {modalData.trigger_type !== "manual" &&
              modalData.trigger_type !== "exit" && (
                <Input
                  label="Trigger Value"
                  name="trigger_value"
                  value={modalData.trigger_value}
                  onChange={(e) =>
                    handleChange("trigger_value", e.target.value)
                  }
                  placeholder={
                    modalData.trigger_type === "time"
                      ? "Seconds (e.g., 5)"
                      : modalData.trigger_type === "scroll"
                      ? "Percentage (e.g., 50)"
                      : "CSS Selector (e.g., .btn-primary)"
                  }
                />
              )}
          </div>
        </FormSection>

        {/* Content */}
        <FormSection
          title="Content"
          description="Add your modal content and call-to-action"
        >
          <Input
            label="Modal Title"
            name="title"
            value={modalData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Get 20% Off Your First Order!"
          />

          <RichTextEditor
            label="Content"
            value={modalData.content}
            onChange={(value) => handleChange("content", value)}
            placeholder="Enter your modal message here..."
            helperText="💡 Tip: Use [form id=&quot;123&quot;] shortcodes to embed forms anywhere in your content"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Button Text"
              name="cta_text"
              value={modalData.cta_text}
              onChange={(e) => handleChange("cta_text", e.target.value)}
              placeholder="Get Started"
            />

            <Input
              label="Button Link"
              name="cta_link"
              value={modalData.cta_link}
              onChange={(e) => handleChange("cta_link", e.target.value)}
              placeholder="/products or #"
            />
          </div>

          {/* Form Integration */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Embed Form {formsLoading ? (
                  <span className="text-xs text-gray-400 font-normal">(Loading...)</span>
                ) : forms.length > 0 ? (
                  <span className="text-xs text-green-600 font-normal">({forms.length} available)</span>
                ) : null}
              </label>
              <select
                value={modalData.form_id || ""}
                onChange={(e) => {
                  const formId = e.target.value || null;
                  console.log("📝 Form selected:", formId);
                  handleChange("form_id", formId);
                  // Auto-insert shortcode into content if form is selected
                  if (formId && !modalData.content.includes(`[form id="${formId}"]`)) {
                    const updatedContent = modalData.content 
                      ? `${modalData.content}<p><br></p><p>[form id="${formId}"]</p>`
                      : `<p>[form id="${formId}"]</p>`;
                    handleChange("content", updatedContent);
                  }
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={formsLoading || forms.length === 0}
              >
                <option value="">
                  {formsLoading ? "Loading forms..." : 
                   forms.length === 0 ? "No forms available - Create a form first" : 
                   "No Form"}
                </option>
                {forms.map((form) => (
                  <option key={form.id} value={form.id}>
                    {form.name} (ID: {form.id})
                  </option>
                ))}
              </select>
              {!formsLoading && forms.length === 0 ? (
                <div className="mt-2 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-amber-800">No forms found</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Create a form in the Forms section before embedding it in modals.
                    </p>
                  </div>
                </div>
              ) : !formsLoading && (
                <p className="text-xs text-gray-500 mt-1">
                  Select a form to capture leads directly in the modal
                </p>
              )}
            </div>

            {/* Shortcode Helper */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">
                    💡 Use Shortcodes for Flexibility
                  </h4>
                  <p className="text-xs text-blue-700 mb-2">
                    You can embed forms directly in your content using shortcodes. This gives you full control over placement and styling.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white rounded border border-blue-200 p-2">
                      <p className="text-xs font-medium text-gray-700 mb-1">Form Shortcode:</p>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-blue-600 font-mono">
                        [form id="123"]
                      </code>
                    </div>
                    {forms.length > 0 && (
                      <div className="bg-white rounded border border-blue-200 p-2">
                        <p className="text-xs font-medium text-gray-700 mb-1">Available Forms:</p>
                        <div className="space-y-1">
                          {forms.slice(0, 3).map((form) => (
                            <div key={form.id} className="flex items-center justify-between text-xs">
                              <span className="text-gray-600">{form.name}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const shortcode = `[form id="${form.id}"]`;
                                  const updatedContent = modalData.content 
                                    ? `${modalData.content}<p><br></p><p>${shortcode}</p>`
                                    : `<p>${shortcode}</p>`;
                                  handleChange("content", updatedContent);
                                  setToast({
                                    type: "success",
                                    message: "Form shortcode added to content!",
                                  });
                                }}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Insert [form id="{form.id}"]
                              </button>
                            </div>
                          ))}
                          {forms.length > 3 && (
                            <p className="text-xs text-gray-500 italic">
                              +{forms.length - 3} more forms available
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FormSection>

        {/* Styling */}
        <FormSection
          title="Styling"
          description="Customize the modal appearance"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modal Size
              </label>
              <select
                value={modalData.styling.size}
                onChange={(e) =>
                  handleNestedChange("styling", "size", e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="xs">Extra Small (320px)</option>
                <option value="small">Small (400px)</option>
                <option value="medium">Medium (600px)</option>
                <option value="large">Large (800px)</option>
                <option value="xl">Extra Large (1000px)</option>
                <option value="full">Full Width (90%)</option>
                <option value="fullscreen">Full Screen</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <select
                value={modalData.styling.position}
                onChange={(e) =>
                  handleNestedChange("styling", "position", e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <optgroup label="Center Positions">
                  <option value="center">Center</option>
                  <option value="center-top">Center Top</option>
                  <option value="center-bottom">Center Bottom</option>
                </optgroup>
                <optgroup label="Corner Positions">
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                </optgroup>
                <optgroup label="Side Positions">
                  <option value="left">Left Side</option>
                  <option value="right">Right Side</option>
                  <option value="top">Top Bar</option>
                  <option value="bottom">Bottom Bar</option>
                </optgroup>
                <option value="custom">Custom (Pixel Perfect)</option>
              </select>
            </div>

            {/* Custom Pixel Position Controls */}
            {modalData.styling.position === "custom" && (
              <div className="md:col-span-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  🎯 Pixel-Perfect Positioning
                  <span className="text-xs font-normal text-gray-600">(Responsive)</span>
                </h4>
                
                {/* Desktop/Default Values */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">💻 Desktop (Default)</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Top (px)
                      </label>
                      <input
                        type="number"
                        value={modalData.styling.customPosition?.top || ""}
                        onChange={(e) =>
                          handleNestedChange("styling", "customPosition", {
                            ...modalData.styling.customPosition,
                            top: e.target.value,
                          })
                        }
                        placeholder="auto"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Right (px)
                      </label>
                      <input
                        type="number"
                        value={modalData.styling.customPosition?.right || ""}
                        onChange={(e) =>
                          handleNestedChange("styling", "customPosition", {
                            ...modalData.styling.customPosition,
                            right: e.target.value,
                          })
                        }
                        placeholder="auto"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Bottom (px)
                      </label>
                      <input
                        type="number"
                        value={modalData.styling.customPosition?.bottom || ""}
                        onChange={(e) =>
                          handleNestedChange("styling", "customPosition", {
                            ...modalData.styling.customPosition,
                            bottom: e.target.value,
                          })
                        }
                        placeholder="auto"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Left (px)
                      </label>
                      <input
                        type="number"
                        value={modalData.styling.customPosition?.left || ""}
                        onChange={(e) =>
                          handleNestedChange("styling", "customPosition", {
                            ...modalData.styling.customPosition,
                            left: e.target.value,
                          })
                        }
                        placeholder="auto"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Tablet Override Values */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">📱 Tablet (768px - 1024px) - Optional Override</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <input
                        type="number"
                        value={modalData.styling.customPosition?.topTablet || ""}
                        onChange={(e) =>
                          handleNestedChange("styling", "customPosition", {
                            ...modalData.styling.customPosition,
                            topTablet: e.target.value,
                          })
                        }
                        placeholder="auto"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={modalData.styling.customPosition?.rightTablet || ""}
                        onChange={(e) =>
                          handleNestedChange("styling", "customPosition", {
                            ...modalData.styling.customPosition,
                            rightTablet: e.target.value,
                          })
                        }
                        placeholder="auto"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={modalData.styling.customPosition?.bottomTablet || ""}
                        onChange={(e) =>
                          handleNestedChange("styling", "customPosition", {
                            ...modalData.styling.customPosition,
                            bottomTablet: e.target.value,
                          })
                        }
                        placeholder="auto"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={modalData.styling.customPosition?.leftTablet || ""}
                        onChange={(e) =>
                          handleNestedChange("styling", "customPosition", {
                            ...modalData.styling.customPosition,
                            leftTablet: e.target.value,
                          })
                        }
                        placeholder="auto"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Override Values */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-700 mb-2">📱 Mobile (&lt;768px) - Optional Override</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <input
                        type="number"
                        value={modalData.styling.customPosition?.topMobile || ""}
                        onChange={(e) =>
                          handleNestedChange("styling", "customPosition", {
                            ...modalData.styling.customPosition,
                            topMobile: e.target.value,
                          })
                        }
                        placeholder="auto"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={modalData.styling.customPosition?.rightMobile || ""}
                        onChange={(e) =>
                          handleNestedChange("styling", "customPosition", {
                            ...modalData.styling.customPosition,
                            rightMobile: e.target.value,
                          })
                        }
                        placeholder="auto"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={modalData.styling.customPosition?.bottomMobile || ""}
                        onChange={(e) =>
                          handleNestedChange("styling", "customPosition", {
                            ...modalData.styling.customPosition,
                            bottomMobile: e.target.value,
                          })
                        }
                        placeholder="auto"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={modalData.styling.customPosition?.leftMobile || ""}
                        onChange={(e) =>
                          handleNestedChange("styling", "customPosition", {
                            ...modalData.styling.customPosition,
                            leftMobile: e.target.value,
                          })
                        }
                        placeholder="auto"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 mt-2">
                  💡 <strong>Tip:</strong> Desktop values are required. Tablet/Mobile values are optional overrides. 
                  If not set, desktop values will be used. Example: Desktop Top=100, Mobile Top=20 (closer to top on mobile).
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orientation
              </label>
              <select
                value={modalData.styling.orientation}
                onChange={(e) =>
                  handleNestedChange("styling", "orientation", e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Layout direction for content
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Animation
              </label>
              <select
                value={modalData.styling.animation}
                onChange={(e) =>
                  handleNestedChange("styling", "animation", e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="fade">Fade In</option>
                <option value="slide-up">Slide Up</option>
                <option value="slide-down">Slide Down</option>
                <option value="slide-left">Slide Left</option>
                <option value="slide-right">Slide Right</option>
                <option value="zoom">Zoom In</option>
                <option value="bounce">Bounce</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Radius (px)
              </label>
              <input
                type="number"
                value={modalData.styling.borderRadius}
                onChange={(e) =>
                  handleNestedChange("styling", "borderRadius", e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                max="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorPicker
              label="Background Color"
              value={modalData.styling.backgroundColor}
              onChange={(color) =>
                handleNestedChange("styling", "backgroundColor", color)
              }
            />

            <ColorPicker
              label="Text Color"
              value={modalData.styling.textColor}
              onChange={(color) =>
                handleNestedChange("styling", "textColor", color)
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="overlay"
              checked={modalData.styling.overlay}
              onChange={(e) =>
                handleNestedChange("styling", "overlay", e.target.checked)
              }
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="overlay" className="text-sm text-gray-700">
              Show overlay background
            </label>
          </div>
        </FormSection>

        {/* Display Rules */}
        <FormSection
          title="Display Rules"
          description="Control when and where the modal appears"
        >
          {/* Page Targeting */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Show on Pages
            </label>
            
            <div className="flex items-center gap-2 mb-3">
              <input
                type="radio"
                id="pages-all"
                name="pageTargeting"
                checked={!modalData.display_rules.pageTargeting || modalData.display_rules.pageTargeting === "all"}
                onChange={() => {
                  handleNestedChange("display_rules", "pageTargeting", "all");
                  handleNestedChange("display_rules", "pages", []);
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="pages-all" className="text-sm text-gray-700">
                All Pages (Show everywhere)
              </label>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <input
                type="radio"
                id="pages-specific"
                name="pageTargeting"
                checked={modalData.display_rules.pageTargeting === "specific"}
                onChange={() => handleNestedChange("display_rules", "pageTargeting", "specific")}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="pages-specific" className="text-sm text-gray-700">
                Specific Pages Only
              </label>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <input
                type="radio"
                id="pages-exclude"
                name="pageTargeting"
                checked={modalData.display_rules.pageTargeting === "exclude"}
                onChange={() => handleNestedChange("display_rules", "pageTargeting", "exclude")}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="pages-exclude" className="text-sm text-gray-700">
                All Pages Except (Exclude specific pages)
              </label>
            </div>

            {/* Page Selection */}
            {modalData.display_rules.pageTargeting && modalData.display_rules.pageTargeting !== "all" && (
              <div className="ml-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {modalData.display_rules.pageTargeting === "specific" 
                    ? "Select pages to show modal:" 
                    : "Select pages to hide modal:"}
                </label>
                
                <div className="space-y-2 mb-3">
                  {pagesLoading ? (
                    <div className="text-sm text-gray-500 py-2">Loading pages...</div>
                  ) : (
                    <>
                      {/* Home Page */}
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={(modalData.display_rules.pages || []).includes("/")}
                          onChange={(e) => {
                            const pagesList = e.target.checked
                              ? [...(modalData.display_rules.pages || []), "/"]
                              : (modalData.display_rules.pages || []).filter((p) => p !== "/");
                            handleNestedChange("display_rules", "pages", pagesList);
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">🏠 Home Page</span>
                      </label>

                      {/* Dynamic Pages from Database */}
                      {pages.map((page) => (
                        <label key={page.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={(modalData.display_rules.pages || []).includes(`/${page.slug}`)}
                            onChange={(e) => {
                              const pageUrl = `/${page.slug}`;
                              const pagesList = e.target.checked
                                ? [...(modalData.display_rules.pages || []), pageUrl]
                                : (modalData.display_rules.pages || []).filter((p) => p !== pageUrl);
                              handleNestedChange("display_rules", "pages", pagesList);
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            📄 {page.title}
                            <span className="text-xs text-gray-500 ml-1">/{page.slug}</span>
                          </span>
                        </label>
                      ))}

                      {/* Static System Pages */}
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={(modalData.display_rules.pages || []).includes("/blog")}
                          onChange={(e) => {
                            const pagesList = e.target.checked
                              ? [...(modalData.display_rules.pages || []), "/blog"]
                              : (modalData.display_rules.pages || []).filter((p) => p !== "/blog");
                            handleNestedChange("display_rules", "pages", pagesList);
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">📝 Blog List</span>
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={(modalData.display_rules.pages || []).includes("/blog/*")}
                          onChange={(e) => {
                            const pagesList = e.target.checked
                              ? [...(modalData.display_rules.pages || []), "/blog/*"]
                              : (modalData.display_rules.pages || []).filter((p) => p !== "/blog/*");
                            handleNestedChange("display_rules", "pages", pagesList);
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">📰 All Blog Posts (wildcard)</span>
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={(modalData.display_rules.pages || []).includes("/downloads")}
                          onChange={(e) => {
                            const pagesList = e.target.checked
                              ? [...(modalData.display_rules.pages || []), "/downloads"]
                              : (modalData.display_rules.pages || []).filter((p) => p !== "/downloads");
                            handleNestedChange("display_rules", "pages", pagesList);
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">📥 Downloads</span>
                      </label>
                    </>
                  )}
                </div>

                {/* Custom URL Input */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Add Custom URL Pattern
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="/custom-page or /path/*"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                          const customUrl = e.target.value.trim();
                          if (!modalData.display_rules.pages.includes(customUrl)) {
                            handleNestedChange("display_rules", "pages", [
                              ...(modalData.display_rules.pages || []),
                              customUrl,
                            ]);
                          }
                          e.target.value = "";
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        const customUrl = input.value.trim();
                        if (customUrl && !modalData.display_rules.pages.includes(customUrl)) {
                          handleNestedChange("display_rules", "pages", [
                            ...(modalData.display_rules.pages || []),
                            customUrl,
                          ]);
                          input.value = "";
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                    >
                      Add
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use * for wildcards (e.g., /blog/* for all blog posts)
                  </p>
                </div>

                {/* Selected Pages Display */}
                {modalData.display_rules.pages && modalData.display_rules.pages.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Selected:</p>
                    <div className="flex flex-wrap gap-2">
                      {modalData.display_rules.pages.map((page) => (
                        <span
                          key={page}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {page}
                          <button
                            type="button"
                            onClick={() => {
                              handleNestedChange(
                                "display_rules",
                                "pages",
                                modalData.display_rules.pages.filter((p) => p !== page)
                              );
                            }}
                            className="hover:text-blue-900"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Show on Devices
            </label>
            <div className="flex flex-wrap gap-4">
              {["desktop", "tablet", "mobile"].map((device) => (
                <label key={device} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={modalData.display_rules.devices.includes(device)}
                    onChange={(e) => {
                      const devices = e.target.checked
                        ? [...modalData.display_rules.devices, device]
                        : modalData.display_rules.devices.filter(
                            (d) => d !== device
                          );
                      handleNestedChange("display_rules", "devices", devices);
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {device}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Frequency
            </label>
            <select
              value={modalData.display_rules.frequency}
              onChange={(e) =>
                handleNestedChange("display_rules", "frequency", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="always">Every Visit</option>
              <option value="once">Once Per Session</option>
              <option value="once_per_day">Once Per Day</option>
              <option value="once_per_week">Once Per Week</option>
            </select>
          </div>
        </FormSection>

        {/* Action Buttons */}
        <FormActions
          onCancel={() => navigate("/admin/forms")}
          submitText={isEditing ? "Update Modal" : "Create Modal"}
          loading={saving}
        />
      </form>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
        }}
        type="success"
        title="Success!"
        message={
          isEditing
            ? "Modal updated successfully!"
            : "Modal created successfully! Redirecting to edit mode..."
        }
        autoClose={true}
        autoCloseDuration={2000}
      />

      {/* Preview Modal - Live Preview with Position Support */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex flex-col bg-gray-900">
          {/* Preview Header */}
          <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Live Preview
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Position: <span className="font-medium">{modalData.styling.position}</span> | 
                Size: <span className="font-medium">{modalData.styling.size}</span> | 
                Orientation: <span className="font-medium">{modalData.styling.orientation}</span> | 
                Animation: <span className="font-medium">{modalData.styling.animation}</span>
              </p>
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition"
            >
              Close Preview
            </button>
          </div>

          {/* Preview Area - Simulates Frontend */}
          <div className={`flex-1 ${
            modalData.styling.position === "custom" ? "" : "flex"
          } ${
            modalData.styling.position === "custom" ? "" :
            // Position logic for preset positions
            modalData.styling.position === "center" ? "items-center justify-center" :
            modalData.styling.position === "center-top" ? "items-start justify-center pt-20" :
            modalData.styling.position === "center-bottom" ? "items-end justify-center pb-20" :
            modalData.styling.position === "top-left" ? "items-start justify-start p-6" :
            modalData.styling.position === "top-right" ? "items-start justify-end p-6" :
            modalData.styling.position === "bottom-left" ? "items-end justify-start p-6" :
            modalData.styling.position === "bottom-right" ? "items-end justify-end p-6" :
            modalData.styling.position === "left" ? "items-center justify-start" :
            modalData.styling.position === "right" ? "items-center justify-end" :
            modalData.styling.position === "top" ? "items-start justify-center" :
            modalData.styling.position === "bottom" ? "items-end justify-center" :
            "items-center justify-center"
          } overflow-auto`}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              position: 'relative'
            }}
          >
            {/* Overlay background */}
            {modalData.styling.overlay && (
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: modalData.styling.overlayColor || "rgba(0, 0, 0, 0.5)",
                }}
              />
            )}

            {/* Actual Modal - Live Preview */}
            <div className={`${
              modalData.styling.position === "custom" ? "fixed" : "relative"
            } z-10 ${
              modalData.styling.position === "custom" ? "" :
              // Full width/height positions
              modalData.styling.position === "top" || modalData.styling.position === "bottom" ? "w-full" :
              modalData.styling.position === "left" || modalData.styling.position === "right" ? "h-full flex items-center" :
              "p-4"
            }`}
            style={
              modalData.styling.position === "custom" && modalData.styling.customPosition
                ? {
                    top: modalData.styling.customPosition.top ? `${modalData.styling.customPosition.top}px` : 'auto',
                    right: modalData.styling.customPosition.right ? `${modalData.styling.customPosition.right}px` : 'auto',
                    bottom: modalData.styling.customPosition.bottom ? `${modalData.styling.customPosition.bottom}px` : 'auto',
                    left: modalData.styling.customPosition.left ? `${modalData.styling.customPosition.left}px` : 'auto',
                  }
                : {}
            }>
              <div
                className={`relative shadow-2xl transition-all ${
                  modalData.styling.orientation === "horizontal" ? "flex flex-row items-center gap-6" : ""
                }`}
                style={{
                  maxWidth:
                    modalData.styling.size === "xs" ? "320px" :
                    modalData.styling.size === "small" ? "400px" :
                    modalData.styling.size === "medium" ? "600px" :
                    modalData.styling.size === "large" ? "800px" :
                    modalData.styling.size === "xl" ? "1000px" :
                    modalData.styling.size === "fullscreen" ? "100%" :
                    modalData.styling.size === "full" ? "90%" : "600px",
                  width: modalData.styling.size === "fullscreen" ? "100%" :
                         (modalData.styling.position === "left" || modalData.styling.position === "right") ? "400px" :
                         "100%",
                  height: modalData.styling.size === "fullscreen" ? "100%" :
                          (modalData.styling.position === "left" || modalData.styling.position === "right") ? "auto" :
                          (modalData.styling.position === "top" || modalData.styling.position === "bottom") ? "auto" : "auto",
                  maxHeight: modalData.styling.size === "fullscreen" ? "100%" : "90vh",
                  backgroundColor: modalData.styling.backgroundColor,
                  color: modalData.styling.textColor,
                  borderRadius: modalData.styling.size === "fullscreen" ? "0" : `${modalData.styling.borderRadius}px`,
                  padding: "2rem",
                  overflow: "auto",
                  animation: 
                    modalData.styling.animation === "fade" ? "fadeIn 0.3s ease-in-out" :
                    modalData.styling.animation === "slide-up" ? "slideUp 0.3s ease-out" :
                    modalData.styling.animation === "slide-down" ? "slideDown 0.3s ease-out" :
                    modalData.styling.animation === "slide-left" ? "slideLeft 0.3s ease-out" :
                    modalData.styling.animation === "slide-right" ? "slideRight 0.3s ease-out" :
                    modalData.styling.animation === "zoom" ? "zoomIn 0.3s ease-out" :
                    modalData.styling.animation === "bounce" ? "bounce 0.5s ease-out" :
                    "fadeIn 0.3s ease-in-out",
                }}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition z-10"
                  style={{
                    color: modalData.styling.textColor,
                    opacity: 0.6,
                  }}
                >
                  ✕
                </button>

                {/* Modal Content */}
                <div className={`pr-8 ${modalData.styling.orientation === "horizontal" ? "flex-1" : ""}`}>
                    {modalData.title ? (
                      <h2 className="text-2xl font-bold mb-4">
                        {modalData.title}
                      </h2>
                    ) : (
                      <p className="text-sm opacity-50 mb-4">
                        Add a title in the form...
                      </p>
                    )}

                    {modalData.content ? (() => {
                      const { parsedContent, components } = parseShortcodes(modalData.content);
                      
                      // If no shortcodes, render normally
                      if (components.length === 0) {
                        return (
                          <div
                            className="mb-6"
                            style={{
                              color: modalData.styling.textColor,
                            }}
                            dangerouslySetInnerHTML={{ __html: modalData.content }}
                          />
                        );
                      }

                      // Split content by shortcode placeholders
                      const contentParts = parsedContent.split(/(__FORM_\d+_\d+__)/g);
                      
                      return (
                        <div className="mb-6" style={{ color: modalData.styling.textColor }}>
                          {contentParts.map((part, index) => {
                            // Check if this part is a placeholder
                            const component = components.find(c => c.placeholder === part);
                            
                            if (component && component.type === "form") {
                              const form = forms.find(f => f.id === parseInt(component.id));
                              return (
                                <div key={index} className="my-5 relative group">
                                  {/* Preview Badge - Floats above form with animation */}
                                  <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 z-20 transition-all group-hover:scale-105">
                                    <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 text-[10px] font-bold tracking-wide animate-pulse">
                                      <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping absolute"></div>
                                        <div className="w-1.5 h-1.5 bg-white rounded-full relative"></div>
                                      </div>
                                      <span className="uppercase">Live Preview</span>
                                      {form && (
                                        <>
                                          <span className="opacity-70">•</span>
                                          <span className="font-semibold">{form.name}</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Form Container with enhanced effects */}
                                  <div 
                                    className="relative rounded-lg border-2 overflow-hidden transition-all duration-300 group-hover:shadow-xl"
                                    style={{
                                      borderColor: 'rgba(59, 130, 246, 0.4)',
                                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                                    }}
                                  >
                                    {/* Animated gradient border effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    
                                    {/* Corner indicators - both sides */}
                                    <div className="absolute top-0 right-0 w-10 h-10 overflow-hidden pointer-events-none">
                                      <div className="absolute top-0 right-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-15 transform rotate-45 translate-x-7 -translate-y-7 group-hover:opacity-25 transition-opacity"></div>
                                    </div>
                                    <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden pointer-events-none">
                                      <div className="absolute top-0 left-0 w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-500 opacity-15 transform -rotate-45 -translate-x-7 -translate-y-7 group-hover:opacity-25 transition-opacity"></div>
                                    </div>
                                    
                                    {/* Form content */}
                                    <div className="relative z-10 bg-white">
                                      <FormEmbed 
                                        formId={parseInt(component.id)}
                                        onSuccess={() => {
                                          setToast({
                                            type: "success",
                                            message: "✓ Form preview submitted successfully! (Preview mode - data not saved)",
                                          });
                                        }}
                                      />
                                    </div>
                                    
                                    {/* Enhanced bottom info bar with icon and better styling */}
                                    <div className="relative z-10 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-t border-blue-200 px-3 py-2">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-blue-800">
                                          <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                          </div>
                                          <div>
                                            <p className="text-[10px] font-bold leading-tight">Interactive Preview</p>
                                            <p className="text-[9px] text-blue-600 leading-tight">Test mode - not saved</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-full border border-blue-200 shadow-sm">
                                          <svg className="w-2.5 h-2.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                          </svg>
                                          <span className="text-[10px] font-bold text-blue-700">ID: {component.id}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            
                            // Regular HTML content
                            if (part && !part.startsWith('__FORM_')) {
                              return (
                                <div 
                                  key={index}
                                  dangerouslySetInnerHTML={{ __html: part }}
                                />
                              );
                            }
                            
                            return null;
                          })}
                        </div>
                      );
                    })() : (
                      <p className="text-sm opacity-50 mb-6">
                        Add content in the form...
                      </p>
                    )}

                    {modalData.cta_text && (
                      <button
                        className="w-full py-3 px-6 rounded-lg font-medium transition shadow-lg"
                        style={{
                          backgroundColor: modalData.styling.textColor,
                          color: modalData.styling.backgroundColor,
                        }}
                      >
                        {modalData.cta_text}
                      </button>
                    )}

                  {!modalData.cta_text && (
                    <p className="text-sm opacity-50">
                      Add a CTA button text...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
