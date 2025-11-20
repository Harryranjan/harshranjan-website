import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiEye } from "react-icons/fi";
import api from "../../utils/api";
import CTABanner from "../../components/CTABanner";
import BackButton from "../../components/ui/BackButton";

const FormSelector = ({ value, onChange }) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await api.get("/forms");
      // Handle different response formats
      const formsData = response.data.forms || response.data || [];
      setForms(Array.isArray(formsData) ? formsData : []);
    } catch (error) {
      console.error("Error fetching forms:", error);
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading forms...</div>;
  }

  if (forms.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-sm text-yellow-800">
          No forms available.{" "}
          <a href="/admin/forms/new" className="underline font-semibold">
            Create a form first
          </a>
        </p>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Form
      </label>
      <select
        value={value || ""}
        onChange={(e) =>
          onChange(e.target.value ? parseInt(e.target.value) : null)
        }
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Select a form...</option>
        {forms.map((form) => (
          <option key={form.id} value={form.id}>
            {form.name}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500 mt-1">
        Form will open in a modal when button is clicked
      </p>
    </div>
  );
};

const CTABannerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [buttonAction, setButtonAction] = useState("none");
  const [formData, setFormData] = useState({
    name: "",
    title: "Schedule Your Free ROI Audit",
    description:
      "Discover exactly why top brands trust us with ₹300+ Crores in ad spends",
    variant: "sticky-top",
    button_text: "Get ROI Audit",
    button_url: "",
    form_id: null,
    phone_number: "+919176402555",
    show_phone: true,
    show_after_scroll: 100,
    dismissible: true,
    status: "draft",
    placement: ["all"],
    colors: {
      bgFrom: "#ef4444",
      bgTo: "#dc2626",
      buttonBg: "#ffffff",
      buttonText: "#dc2626",
      text: "#ffffff",
    },
    settings: {},
  });

  useEffect(() => {
    if (id) {
      fetchBanner();
    }
  }, [id]);

  useEffect(() => {
    // Set button action based on formData
    if (formData.form_id) {
      setButtonAction("form");
    } else if (formData.button_url) {
      setButtonAction("url");
    } else {
      setButtonAction("none");
    }
  }, [formData.form_id, formData.button_url]);

  const fetchBanner = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/cta-banners/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching banner:", error);
      alert("Failed to load banner");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a banner name");
      return;
    }

    try {
      setLoading(true);
      if (id) {
        await api.put(`/cta-banners/${id}`, formData);
      } else {
        await api.post("/cta-banners", formData);
      }
      navigate("/admin/cta-banners");
    } catch (error) {
      console.error("Error saving banner:", error);
      alert("Failed to save banner");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const variants = [
    {
      value: "sticky-top",
      label: "Sticky Top Banner",
      icon: "⬆️",
      description: "Fixed at top, always visible",
    },
    {
      value: "floating-button",
      label: "Floating Button",
      icon: "🎯",
      description: "Bottom right corner",
    },
    {
      value: "slide-bottom",
      label: "Slide-in Bottom",
      icon: "⬇️",
      description: "Slides up from bottom",
    },
    {
      value: "smart-header",
      label: "Smart Header",
      icon: "🧠",
      description: "Full size, shrinks on scroll",
    },
    {
      value: "banner-strip",
      label: "Banner Strip",
      icon: "📏",
      description: "Thin minimal strip at top",
    },
    {
      value: "corner-popup",
      label: "Corner Popup",
      icon: "💬",
      description: "Pops from bottom left",
    },
    {
      value: "full-screen-takeover",
      label: "Full Screen",
      icon: "🖥️",
      description: "Full screen overlay",
    },
    {
      value: "slide-in-left",
      label: "Slide In Left",
      icon: "◀️",
      description: "Slides from left side",
    },
    {
      value: "sticky-bottom",
      label: "Sticky Bottom",
      icon: "⬇️",
      description: "Fixed at bottom",
    },
    {
      value: "notification-bar",
      label: "Notification Bar",
      icon: "ℹ️",
      description: "Minimal notification",
    },
    {
      value: "slide-in-right",
      label: "Slide In Right",
      icon: "▶️",
      description: "Slides from right side",
    },
    {
      value: "expanding-bar",
      label: "Expanding Bar",
      icon: "📊",
      description: "Expands on interaction",
    },
    {
      value: "ribbon-corner",
      label: "Ribbon Corner",
      icon: "🎀",
      description: "Diagonal ribbon badge",
    },
    {
      value: "floating-card",
      label: "Floating Card",
      icon: "🃏",
      description: "Animated floating card",
    },
    {
      value: "side-tab",
      label: "Side Tab",
      icon: "📑",
      description: "Slide-out side panel",
    },
    {
      value: "bottom-drawer",
      label: "Bottom Drawer",
      icon: "📤",
      description: "Expandable bottom drawer",
    },
    {
      value: "vertical-left",
      label: "Vertical Left",
      icon: "⬅️",
      description: "Full-height left banner",
    },
    {
      value: "vertical-right",
      label: "Vertical Right",
      icon: "➡️",
      description: "Full-height right banner",
    },
  ];

  const colorPresets = [
    {
      name: "Red",
      value: "red",
      bgFrom: "#ef4444",
      bgTo: "#dc2626",
      btnBg: "#ffffff",
      btnText: "#dc2626",
      text: "#ffffff",
    },
    {
      name: "Blue",
      value: "blue",
      bgFrom: "#3b82f6",
      bgTo: "#2563eb",
      btnBg: "#ffffff",
      btnText: "#2563eb",
      text: "#ffffff",
    },
    {
      name: "Green",
      value: "green",
      bgFrom: "#10b981",
      bgTo: "#059669",
      btnBg: "#ffffff",
      btnText: "#059669",
      text: "#ffffff",
    },
    {
      name: "Purple",
      value: "purple",
      bgFrom: "#a855f7",
      bgTo: "#9333ea",
      btnBg: "#ffffff",
      btnText: "#9333ea",
      text: "#ffffff",
    },
    {
      name: "Orange",
      value: "orange",
      bgFrom: "#f97316",
      bgTo: "#ea580c",
      btnBg: "#ffffff",
      btnText: "#ea580c",
      text: "#ffffff",
    },
    {
      name: "Teal",
      value: "teal",
      bgFrom: "#14b8a6",
      bgTo: "#0d9488",
      btnBg: "#ffffff",
      btnText: "#0d9488",
      text: "#ffffff",
    },
    {
      name: "Pink Sunset",
      value: "pink-sunset",
      bgFrom: "#ec4899",
      bgTo: "#f97316",
      btnBg: "#ffffff",
      btnText: "#ec4899",
      text: "#ffffff",
    },
    {
      name: "Ocean Blue",
      value: "ocean",
      bgFrom: "#06b6d4",
      bgTo: "#3b82f6",
      btnBg: "#ffffff",
      btnText: "#0284c7",
      text: "#ffffff",
    },
    {
      name: "Violet Dream",
      value: "violet",
      bgFrom: "#8b5cf6",
      bgTo: "#ec4899",
      btnBg: "#ffffff",
      btnText: "#7c3aed",
      text: "#ffffff",
    },
    {
      name: "Forest Green",
      value: "forest",
      bgFrom: "#059669",
      bgTo: "#0891b2",
      btnBg: "#ffffff",
      btnText: "#047857",
      text: "#ffffff",
    },
    {
      name: "Fire Red",
      value: "fire",
      bgFrom: "#dc2626",
      bgTo: "#ea580c",
      btnBg: "#ffffff",
      btnText: "#dc2626",
      text: "#ffffff",
    },
    {
      name: "Royal Purple",
      value: "royal",
      bgFrom: "#6366f1",
      bgTo: "#8b5cf6",
      btnBg: "#ffffff",
      btnText: "#6366f1",
      text: "#ffffff",
    },
    {
      name: "Golden Hour",
      value: "golden",
      bgFrom: "#f59e0b",
      bgTo: "#ef4444",
      btnBg: "#ffffff",
      btnText: "#d97706",
      text: "#ffffff",
    },
    {
      name: "Midnight Blue",
      value: "midnight",
      bgFrom: "#1e40af",
      bgTo: "#6366f1",
      btnBg: "#ffffff",
      btnText: "#1e3a8a",
      text: "#ffffff",
    },
    {
      name: "Emerald Green",
      value: "emerald",
      bgFrom: "#10b981",
      bgTo: "#14b8a6",
      btnBg: "#ffffff",
      btnText: "#059669",
      text: "#ffffff",
    },
    {
      name: "Neon Lime",
      value: "neon",
      bgFrom: "#84cc16",
      bgTo: "#22c55e",
      btnBg: "#ffffff",
      btnText: "#65a30d",
      text: "#ffffff",
    },
  ];

  const placementOptions = [
    { value: "all", label: "All Pages" },
    { value: "homepage", label: "Homepage Only" },
    { value: "blog", label: "Blog Pages" },
    { value: "services", label: "Services Page" },
    { value: "about", label: "About Page" },
    { value: "contact", label: "Contact Page" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton to="/admin/cta-banners" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {id ? "Edit" : "Create"} CTA Banner
            </h1>
            <p className="text-gray-600">
              {id ? "Update your" : "Design a new"} call-to-action banner
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FiEye /> {showPreview ? "Hide" : "Show"} Preview
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g., Homepage ROI Audit CTA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Internal name for identification
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Schedule Your Free ROI Audit"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Discover exactly why top brands trust us..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Variant Selection */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Banner Variant (18 Styles)
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {variants.map((variant) => (
                <div
                  key={variant.value}
                  onClick={() => handleChange("variant", variant.value)}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.variant === variant.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="text-xl">{variant.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 leading-tight">
                        {variant.label}
                      </div>
                      <div className="text-xs text-gray-600 mt-0.5 line-clamp-1">
                        {variant.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Call-to-Action Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.button_text}
                  onChange={(e) => handleChange("button_text", e.target.value)}
                  placeholder="Get ROI Audit"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Action
                </label>
                <select
                  value={buttonAction}
                  onChange={(e) => {
                    const value = e.target.value;
                    setButtonAction(value);
                    if (value === "url") {
                      setFormData((prev) => ({
                        ...prev,
                        form_id: null,
                        button_url: "",
                      }));
                    } else if (value === "form") {
                      setFormData((prev) => ({
                        ...prev,
                        form_id: null,
                        button_url: "",
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        form_id: null,
                        button_url: "",
                      }));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="none">No Action (Default to /contact)</option>
                  <option value="form">Open Form in Modal ✨</option>
                  <option value="url">Navigate to URL</option>
                </select>
              </div>

              {/* Show URL input when URL option is selected */}
              {buttonAction === "url" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button URL
                  </label>
                  <input
                    type="url"
                    value={formData.button_url || ""}
                    onChange={(e) => handleChange("button_url", e.target.value)}
                    placeholder="/contact or https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Show Form Selector when form option is selected */}
              {buttonAction === "form" && (
                <FormSelector
                  value={formData.form_id}
                  onChange={(value) => handleChange("form_id", value)}
                />
              )}

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.show_phone}
                    onChange={(e) =>
                      handleChange("show_phone", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Show Phone Number
                  </span>
                </label>
              </div>

              {formData.show_phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) =>
                      handleChange("phone_number", e.target.value)
                    }
                    placeholder="+919176402555"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Display Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Display Settings
            </h2>

            <div className="space-y-4">
              {(formData.variant === "slide-bottom" ||
                formData.variant === "floating-button") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Show After Scroll (pixels)
                  </label>
                  <input
                    type="number"
                    value={formData.show_after_scroll}
                    onChange={(e) =>
                      handleChange(
                        "show_after_scroll",
                        parseInt(e.target.value)
                      )
                    }
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Banner appears after user scrolls this many pixels
                  </p>
                </div>
              )}

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dismissible}
                    onChange={(e) =>
                      handleChange("dismissible", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Allow users to dismiss
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Show On Pages
                </label>
                <div className="space-y-2">
                  {placementOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.placement.includes(option.value)}
                        onChange={(e) => {
                          if (option.value === "all") {
                            handleChange("placement", ["all"]);
                          } else {
                            const newPlacement = e.target.checked
                              ? [
                                  ...formData.placement.filter(
                                    (p) => p !== "all"
                                  ),
                                  option.value,
                                ]
                              : formData.placement.filter(
                                  (p) => p !== option.value
                                );
                            handleChange(
                              "placement",
                              newPlacement.length === 0 ? ["all"] : newPlacement
                            );
                          }
                        }}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Color Customization */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Color Scheme (16 Gradients)
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() =>
                    handleChange("colors", {
                      bgFrom: preset.bgFrom,
                      bgTo: preset.bgTo,
                      buttonBg: preset.btnBg,
                      buttonText: preset.btnText,
                      text: preset.text,
                    })
                  }
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.colors.bgFrom === preset.bgFrom &&
                    formData.colors.bgTo === preset.bgTo
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className="h-8 rounded mb-2 shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${preset.bgFrom}, ${preset.bgTo})`,
                    }}
                  ></div>
                  <div className="text-xs font-medium text-gray-700">
                    {preset.name}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Custom Colors (Advanced)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Gradient Start
                  </label>
                  <input
                    type="color"
                    value={formData.colors.bgFrom}
                    onChange={(e) =>
                      handleChange("colors", {
                        ...formData.colors,
                        bgFrom: e.target.value,
                      })
                    }
                    className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.colors.bgFrom}
                    onChange={(e) =>
                      handleChange("colors", {
                        ...formData.colors,
                        bgFrom: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-2 py-1 text-xs border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Gradient End
                  </label>
                  <input
                    type="color"
                    value={formData.colors.bgTo}
                    onChange={(e) =>
                      handleChange("colors", {
                        ...formData.colors,
                        bgTo: e.target.value,
                      })
                    }
                    className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.colors.bgTo}
                    onChange={(e) =>
                      handleChange("colors", {
                        ...formData.colors,
                        bgTo: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-2 py-1 text-xs border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Button Background
                  </label>
                  <input
                    type="color"
                    value={formData.colors.buttonBg}
                    onChange={(e) =>
                      handleChange("colors", {
                        ...formData.colors,
                        buttonBg: e.target.value,
                      })
                    }
                    className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.colors.buttonBg}
                    onChange={(e) =>
                      handleChange("colors", {
                        ...formData.colors,
                        buttonBg: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-2 py-1 text-xs border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="color"
                    value={formData.colors.buttonText}
                    onChange={(e) =>
                      handleChange("colors", {
                        ...formData.colors,
                        buttonText: e.target.value,
                      })
                    }
                    className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.colors.buttonText}
                    onChange={(e) =>
                      handleChange("colors", {
                        ...formData.colors,
                        buttonText: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-2 py-1 text-xs border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Banner Text Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.colors.text}
                    onChange={(e) =>
                      handleChange("colors", {
                        ...formData.colors,
                        text: e.target.value,
                      })
                    }
                    className="w-20 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.colors.text}
                    onChange={(e) =>
                      handleChange("colors", {
                        ...formData.colors,
                        text: e.target.value,
                      })
                    }
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Status</h2>

            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Active:</strong> Banner will show on selected pages
                <br />
                <strong>Inactive:</strong> Banner hidden but saved
                <br />
                <strong>Draft:</strong> Work in progress
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FiSave />
              {loading ? "Saving..." : id ? "Update Banner" : "Create Banner"}
            </button>
          </div>

          {/* Help */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">💡 Pro Tips</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Use sticky-top for maximum visibility</li>
              <li>• Floating button works great on mobile</li>
              <li>• Test different variants for best results</li>
              <li>• Keep CTA text short and action-oriented</li>
            </ul>
          </div>
        </div>
      </form>

      {/* Live Preview */}
      {showPreview && (
        <div className="fixed inset-x-0 bottom-0 z-50">
          <div className="bg-yellow-50 border-t-2 border-yellow-400 p-2 text-center text-sm font-medium text-yellow-800">
            👁️ Live Preview Mode - This is how your banner will look
          </div>
          <CTABanner
            variant={formData.variant}
            title={formData.title}
            description={formData.description}
            buttonText={formData.button_text}
            phoneNumber={formData.phone_number}
            showAfterScroll={0}
            dismissible={formData.dismissible}
            customColors={formData.colors}
            storageKey={`preview-${Date.now()}`}
          />
        </div>
      )}
    </div>
  );
};

export default CTABannerForm;
