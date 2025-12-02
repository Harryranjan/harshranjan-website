import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import { Spinner, Modal, LivePreview, ImageUpload } from "../../components/ui";

// Utility to decode HTML entities
const decodeHTMLEntities = (text) => {
  if (!text) return text;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

export default function HeaderBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [editorMode, setEditorMode] = useState("visual"); // visual or code

  const [formData, setFormData] = useState({
    name: "",
    location: "header",
    description: "",
    is_active: true,
    settings: {
      type: "header-builder",
      layout: "centered", // centered, full-width, split
      sticky: true,
      transparent: false,
      logo: {
        type: "text", // text, image
        text: "Logo",
        image: "",
        position: "left", // left, center
        width: "150px",
      },
      navigation: {
        enabled: true,
        position: "center", // left, center, right
        items: [],
      },
      cta: {
        enabled: true,
        text: "Get Started",
        url: "/contact",
        style: "primary", // primary, secondary, outline
      },
      topBar: {
        enabled: false,
        text: "",
        backgroundColor: "#3B82F6",
        textColor: "#FFFFFF",
      },
      search: {
        enabled: false,
        placeholder: "Search...",
      },
      socialIcons: {
        enabled: false,
        icons: [],
      },
      styles: {
        backgroundColor: "#FFFFFF",
        textColor: "#1F2937",
        hoverColor: "#3B82F6",
        height: "80px",
        shadow: true,
      },
      customCode: "",
    },
  });

  useEffect(() => {
    if (isEditing) {
      fetchHeader();
    }
  }, [id]);

  const fetchHeader = async () => {
    try {
      const response = await api.get(`/menus/${id}`);
      const menuData = response.data.menu;
      
      // Decode HTML entities in customCode if present
      if (menuData.settings && menuData.settings.customCode) {
        menuData.settings.customCode = decodeHTMLEntities(menuData.settings.customCode);
      }
      
      // Ensure all required settings exist
      if (!menuData.settings) {
        menuData.settings = {};
      }
      
      // Merge with default settings to ensure all properties exist
      menuData.settings = {
        type: menuData.settings.type || "header-builder",
        layout: menuData.settings.layout || "centered",
        sticky: menuData.settings.sticky !== undefined ? menuData.settings.sticky : true,
        transparent: menuData.settings.transparent || false,
        logo: menuData.settings.logo || {
          type: "text",
          text: "Logo",
          image: "",
          position: "left",
          width: "150px",
        },
        navigation: menuData.settings.navigation || {
          enabled: true,
          position: "center",
          items: [],
        },
        cta: menuData.settings.cta || {
          enabled: true,
          text: "Get Started",
          url: "/contact",
          style: "primary",
        },
        topBar: menuData.settings.topBar || {
          enabled: false,
          text: "",
          backgroundColor: "#3B82F6",
          textColor: "#FFFFFF",
        },
        search: menuData.settings.search || {
          enabled: false,
          placeholder: "Search...",
        },
        socialIcons: menuData.settings.socialIcons || {
          enabled: false,
          icons: [],
        },
        styles: menuData.settings.styles || {
          backgroundColor: "#FFFFFF",
          textColor: "#1F2937",
          hoverColor: "#3B82F6",
          height: "80px",
          shadow: true,
        },
        customCode: menuData.settings.customCode || "",
      };
      
      setFormData(menuData);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch header:", error);
      setError(error.response?.data?.message || error.message || "Failed to load header");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSettingChange = (path, value) => {
    setFormData((prev) => {
      const newSettings = { ...prev.settings };
      const keys = path.split(".");
      let current = newSettings;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;

      return { ...prev, settings: newSettings };
    });
  };

  const addNavigationItem = () => {
    const newItem = {
      id: Date.now(),
      label: "New Item",
      url: "/",
      dropdown: [],
    };
    handleSettingChange("navigation.items", [
      ...formData.settings.navigation.items,
      newItem,
    ]);
  };

  const removeNavigationItem = (itemId) => {
    handleSettingChange(
      "navigation.items",
      formData.settings.navigation.items.filter((item) => item.id !== itemId)
    );
  };

  const updateNavigationItem = (itemId, field, value) => {
    handleSettingChange(
      "navigation.items",
      formData.settings.navigation.items.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  const generateHeaderCode = () => {
    const { settings } = formData;
    const { logo, navigation, cta, topBar, styles } = settings;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Header Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Generated Header Code -->
  ${
    topBar.enabled
      ? `<div style="background-color: ${topBar.backgroundColor}; color: ${topBar.textColor}; padding: 8px 0; text-align: center; font-size: 14px;">
    ${topBar.text}
  </div>`
      : ""
  }

  <header style="background-color: ${styles.backgroundColor}; color: ${
      styles.textColor
    }; height: ${styles.height}; ${
      styles.shadow ? "box-shadow: 0 2px 4px rgba(0,0,0,0.1);" : ""
    } ${settings.sticky ? "position: sticky; top: 0; z-index: 1000;" : ""}">
    <div class="container mx-auto px-4 h-full">
      <div class="flex items-center justify-between h-full">
        <!-- Logo -->
        <div class="logo">
          ${
            logo.type === "text"
              ? `<span style="font-size: 24px; font-weight: bold;">${logo.text}</span>`
              : `<img src="${logo.image}" alt="Logo" style="width: ${logo.width}; height: auto;" />`
          }
        </div>

        <!-- Navigation -->
        ${
          navigation.enabled
            ? `<nav class="hidden md:flex space-x-8">
          ${navigation.items
            .map(
              (item) =>
                `<a href="${item.url}" style="color: ${styles.textColor}; text-decoration: none;" onmouseover="this.style.color='${styles.hoverColor}'" onmouseout="this.style.color='${styles.textColor}'">${item.label}</a>`
            )
            .join("\n          ")}
        </nav>`
            : ""
        }

        <!-- CTA Button -->
        ${
          cta.enabled
            ? `<a href="${cta.url}" style="background-color: #3B82F6; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">${cta.text}</a>`
            : ""
        }
      </div>
    </div>
  </header>
</body>
</html>`;
  };

  const handleSubmit = async () => {
    setSaving(true);

    try {
      const dataToSave = {
        ...formData,
      };

      if (isEditing) {
        await api.put(`/menus/${id}`, dataToSave);
        setModalMessage("Header updated successfully!");
      } else {
        const response = await api.post("/menus", dataToSave);
        setModalMessage("Header created successfully!");
        setTimeout(() => {
          navigate(`/admin/header-builder/${response.data.menu.id}`);
        }, 1500);
      }
      setShowModal(true);
    } catch (error) {
      console.error("Failed to save header:", error);
      alert(error.response?.data?.message || "Failed to save header");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-bold text-lg mb-2">Error Loading Header</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => navigate("/admin/menus")}
            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back to Menus
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>
          {isEditing ? "Edit Header" : "Create Header"} - Admin Dashboard
        </title>
      </Helmet>

      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/menus")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Menus
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {isEditing ? "Edit Header" : "Create Header"}
        </h1>
        <p className="text-gray-600 mt-1">
          Build a professional header with visual controls
        </p>
      </div>

      {/* Live Preview Modal */}
      {showLivePreview && (
        <div className="fixed inset-0 z-50 bg-white">
          <LivePreview
            content={(() => {
              const code = formData.settings.customCode || generateHeaderCode();
              // If code is already a complete HTML document, use it as-is
              if (
                code.trim().startsWith("<!DOCTYPE") ||
                code.trim().startsWith("<html")
              ) {
                return code;
              }
              // Otherwise, wrap it in a complete HTML document
              return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Header Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
${code}
</body>
</html>`;
            })()}
            title={formData.name}
            onClose={() => setShowLivePreview(false)}
            showTitle={true}
            pageTitle={formData.name || "Header Preview"}
          />
        </div>
      )}

      {/* Top Action Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setEditorMode("visual")}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition ${
                editorMode === "visual"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                />
              </svg>
              Visual Builder
            </button>
            <button
              type="button"
              onClick={() => setEditorMode("code")}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition ${
                editorMode === "code"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              Custom Code
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowLivePreview(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Live Preview
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {saving
                ? "Saving..."
                : isEditing
                ? "Update Header"
                : "Create Header"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Basic Settings - Compact Row */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Header Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Main Header"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 pb-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Active
                </span>
              </label>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 pb-2">
                <input
                  type="checkbox"
                  checked={formData.settings.sticky}
                  onChange={(e) =>
                    handleSettingChange("sticky", e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Sticky
                </span>
              </label>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 pb-2">
                <input
                  type="checkbox"
                  checked={formData.settings.transparent}
                  onChange={(e) =>
                    handleSettingChange("transparent", e.target.checked)
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Transparent
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Custom Code Editor */}
        {editorMode === "code" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Custom Header Code
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Write your custom HTML, CSS, and JavaScript
                </p>
              </div>
            </div>
            <textarea
              value={formData.settings.customCode || ""}
              onChange={(e) =>
                handleSettingChange("customCode", e.target.value)
              }
              rows={24}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 text-gray-100"
              placeholder={`<header class="bg-white shadow-md">
  <div class="container mx-auto px-4 py-4">
    <div class="flex items-center justify-between">
      <div class="text-2xl font-bold">Logo</div>
      <nav class="flex space-x-6">
        <a href="/" class="hover:text-blue-600">Home</a>
        <a href="/about" class="hover:text-blue-600">About</a>
      </nav>
    </div>
  </div>
</header>`}
              spellCheck="false"
            />
          </div>
        )}

        {/* Visual Builder Settings */}
        {editorMode === "visual" && (
          <>
            {/* Logo Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Logo Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo Type
                  </label>
                  <select
                    value={formData.settings.logo.type}
                    onChange={(e) =>
                      handleSettingChange("logo.type", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="text">Text Logo</option>
                    <option value="image">Image Logo</option>
                  </select>
                </div>

                {formData.settings.logo.type === "text" ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Logo Text
                    </label>
                    <input
                      type="text"
                      value={formData.settings.logo.text}
                      onChange={(e) =>
                        handleSettingChange("logo.text", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Brand"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo Image
                    </label>
                    <ImageUpload
                      currentImage={formData.settings.logo.image}
                      onImageChange={(url) =>
                        handleSettingChange("logo.image", url)
                      }
                      onImageRemove={() =>
                        handleSettingChange("logo.image", "")
                      }
                      label="Upload Logo"
                      acceptedFormats=".png, .jpg, .jpeg, .svg, .webp"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Navigation Menu
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Configure header navigation links
                  </p>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.settings.navigation.enabled}
                    onChange={(e) =>
                      handleSettingChange(
                        "navigation.enabled",
                        e.target.checked
                      )
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-sm text-gray-600">Enable</span>
                </label>
              </div>

              {formData.settings.navigation.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.settings.navigation.items.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) =>
                            updateNavigationItem(
                              item.id,
                              "label",
                              e.target.value
                            )
                          }
                          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                          placeholder="Label"
                        />
                        <button
                          type="button"
                          onClick={() => removeNavigationItem(item.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) =>
                          updateNavigationItem(item.id, "url", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="URL"
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addNavigationItem}
                    className="md:col-span-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Menu Item
                  </button>
                </div>
              )}
            </div>

            {/* CTA & Appearance Settings - Combined */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                CTA Button & Appearance
              </h2>

              <div className="space-y-6">
                {/* CTA Section */}
                <div className="pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Call-to-Action Button
                    </h3>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.settings.cta.enabled}
                        onChange={(e) =>
                          handleSettingChange("cta.enabled", e.target.checked)
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-sm text-gray-600">Enable</span>
                    </label>
                  </div>

                  {formData.settings.cta.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={formData.settings.cta.text}
                          onChange={(e) =>
                            handleSettingChange("cta.text", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                          placeholder="Get Started"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Button URL
                        </label>
                        <input
                          type="text"
                          value={formData.settings.cta.url}
                          onChange={(e) =>
                            handleSettingChange("cta.url", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                          placeholder="/contact"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Style Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Color Scheme
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Background
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={formData.settings.styles.backgroundColor}
                          onChange={(e) =>
                            handleSettingChange(
                              "styles.backgroundColor",
                              e.target.value
                            )
                          }
                          className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.settings.styles.backgroundColor}
                          onChange={(e) =>
                            handleSettingChange(
                              "styles.backgroundColor",
                              e.target.value
                            )
                          }
                          className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs font-mono uppercase"
                          placeholder="#FFFFFF"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Text
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={formData.settings.styles.textColor}
                          onChange={(e) =>
                            handleSettingChange(
                              "styles.textColor",
                              e.target.value
                            )
                          }
                          className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.settings.styles.textColor}
                          onChange={(e) =>
                            handleSettingChange(
                              "styles.textColor",
                              e.target.value
                            )
                          }
                          className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs font-mono uppercase"
                          placeholder="#1F2937"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Hover
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={formData.settings.styles.hoverColor}
                          onChange={(e) =>
                            handleSettingChange(
                              "styles.hoverColor",
                              e.target.value
                            )
                          }
                          className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.settings.styles.hoverColor}
                          onChange={(e) =>
                            handleSettingChange(
                              "styles.hoverColor",
                              e.target.value
                            )
                          }
                          className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs font-mono uppercase"
                          placeholder="#3B82F6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type="success"
        title="Success!"
        message={modalMessage}
        autoClose={true}
        autoCloseDuration={2000}
      />
    </div>
  );
}
