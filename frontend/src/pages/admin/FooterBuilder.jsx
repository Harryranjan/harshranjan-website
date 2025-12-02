import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import { Spinner, Modal, LivePreview } from "../../components/ui";

// Utility to decode HTML entities
const decodeHTMLEntities = (text) => {
  if (!text) return text;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

export default function FooterBuilder() {
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
    location: "footer",
    description: "",
    is_active: true,
    settings: {
      type: "footer-builder",
      layout: "4-column", // 1-column, 2-column, 3-column, 4-column
      columns: [
        {
          id: 1,
          title: "Company",
          content: "text",
          items: [
            { label: "About Us", url: "/about" },
            { label: "Careers", url: "/careers" },
            { label: "Blog", url: "/blog" },
          ],
        },
        {
          id: 2,
          title: "Products",
          content: "text",
          items: [
            { label: "Features", url: "/features" },
            { label: "Pricing", url: "/pricing" },
          ],
        },
        {
          id: 3,
          title: "Resources",
          content: "text",
          items: [
            { label: "Documentation", url: "/docs" },
            { label: "Support", url: "/support" },
          ],
        },
        {
          id: 4,
          title: "Follow Us",
          content: "social",
          items: [],
        },
      ],
      copyright: {
        enabled: true,
        text: "© 2025 Your Company. All rights reserved.",
      },
      socialIcons: {
        enabled: true,
        icons: [
          { name: "Facebook", url: "#", icon: "FB" },
          { name: "Twitter", url: "#", icon: "TW" },
          { name: "Instagram", url: "#", icon: "IG" },
        ],
      },
      newsletter: {
        enabled: false,
        title: "Subscribe to our newsletter",
        placeholder: "Enter your email",
      },
      styles: {
        backgroundColor: "#1F2937",
        textColor: "#FFFFFF",
        linkColor: "#9CA3AF",
        linkHoverColor: "#FFFFFF",
        borderColor: "#374151",
      },
      customCode: "",
    },
  });

  useEffect(() => {
    if (isEditing) {
      fetchFooter();
    }
  }, [id]);

  const fetchFooter = async () => {
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
      
      // Merge with default settings
      menuData.settings = {
        type: menuData.settings.type || "footer-builder",
        layout: menuData.settings.layout || "4-column",
        columns: menuData.settings.columns || [
          {
            title: "Company",
            items: [
              { label: "About", url: "/about" },
              { label: "Services", url: "/services" },
              { label: "Contact", url: "/contact" },
            ],
          },
          {
            title: "Resources",
            items: [
              { label: "Blog", url: "/blog" },
              { label: "FAQ", url: "/faq" },
            ],
          },
        ],
        copyright: menuData.settings.copyright || {
          enabled: true,
          text: "© 2025 Your Company. All rights reserved.",
        },
        socialIcons: menuData.settings.socialIcons || {
          enabled: false,
          icons: [],
        },
        newsletter: menuData.settings.newsletter || {
          enabled: false,
          title: "Subscribe to our newsletter",
          placeholder: "Enter your email",
        },
        styles: menuData.settings.styles || {
          backgroundColor: "#1F2937",
          textColor: "#FFFFFF",
          linkColor: "#9CA3AF",
          linkHoverColor: "#FFFFFF",
          borderColor: "#374151",
        },
        customCode: menuData.settings.customCode || "",
      };
      
      setFormData(menuData);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch footer:", error);
      setError(error.response?.data?.message || error.message || "Failed to load footer");
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

  const addColumn = () => {
    const newColumn = {
      id: Date.now(),
      title: "New Section",
      content: "text",
      items: [],
    };
    handleSettingChange("columns", [...formData.settings.columns, newColumn]);
  };

  const removeColumn = (columnId) => {
    handleSettingChange(
      "columns",
      formData.settings.columns.filter((col) => col.id !== columnId)
    );
  };

  const updateColumn = (columnId, field, value) => {
    handleSettingChange(
      "columns",
      formData.settings.columns.map((col) =>
        col.id === columnId ? { ...col, [field]: value } : col
      )
    );
  };

  const addColumnItem = (columnId) => {
    const newItem = { label: "New Link", url: "/" };
    handleSettingChange(
      "columns",
      formData.settings.columns.map((col) =>
        col.id === columnId ? { ...col, items: [...col.items, newItem] } : col
      )
    );
  };

  const removeColumnItem = (columnId, itemIndex) => {
    handleSettingChange(
      "columns",
      formData.settings.columns.map((col) =>
        col.id === columnId
          ? { ...col, items: col.items.filter((_, i) => i !== itemIndex) }
          : col
      )
    );
  };

  const updateColumnItem = (columnId, itemIndex, field, value) => {
    handleSettingChange(
      "columns",
      formData.settings.columns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              items: col.items.map((item, i) =>
                i === itemIndex ? { ...item, [field]: value } : item
              ),
            }
          : col
      )
    );
  };

  const generateFooterCode = () => {
    const { settings } = formData;
    const { columns, copyright, socialIcons, styles } = settings;

    const columnClass =
      columns.length === 1
        ? "grid-cols-1"
        : columns.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : columns.length === 3
        ? "grid-cols-1 md:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Footer Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Generated Footer Code -->
  <footer style="background-color: ${styles.backgroundColor}; color: ${
      styles.textColor
    }; padding: 48px 0 24px;">
    <div class="container mx-auto px-4">
      <div class="grid ${columnClass} gap-8 mb-8">
        ${columns
          .map(
            (column) => `
        <div>
          <h3 style="color: ${
            styles.textColor
          }; font-size: 20px; font-weight: 600; margin-bottom: 16px;">
            ${column.title}
          </h3>
          ${
            column.content === "social"
              ? `<div style="display: flex; gap: 16px;">
            ${socialIcons.icons
              .map(
                (icon) =>
                  `<a href="${icon.url}" style="color: ${styles.linkColor}; text-decoration: none;">${icon.icon}</a>`
              )
              .join("\n            ")}
          </div>`
              : `<ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
            ${column.items
              .map(
                (item) =>
                  `<li><a href="${item.url}" style="color: ${styles.linkColor}; text-decoration: none;" onmouseover="this.style.color='${styles.linkHoverColor}'" onmouseout="this.style.color='${styles.linkColor}'">${item.label}</a></li>`
              )
              .join("\n            ")}
          </ul>`
          }
        </div>`
          )
          .join("\n")}
      </div>
      
      ${
        copyright.enabled
          ? `<div style="border-top: 1px solid ${styles.borderColor}; padding-top: 24px; text-align: center; color: ${styles.linkColor}; font-size: 14px;">
        <p>${copyright.text}</p>
      </div>`
          : ""
      }
    </div>
  </footer>
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
        setModalMessage("Footer updated successfully!");
      } else {
        const response = await api.post("/menus", dataToSave);
        setModalMessage("Footer created successfully!");
        setTimeout(() => {
          navigate(`/admin/footer-builder/${response.data.menu.id}`);
        }, 1500);
      }
      setShowModal(true);
    } catch (error) {
      console.error("Failed to save footer:", error);
      alert(error.response?.data?.message || "Failed to save footer");
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
          <h3 className="text-red-800 font-bold text-lg mb-2">Error Loading Footer</h3>
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
          {isEditing ? "Edit Footer" : "Create Footer"} - Admin Dashboard
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
          {isEditing ? "Edit Footer" : "Create Footer"}
        </h1>
        <p className="text-gray-600 mt-1">
          Build a professional footer with visual controls
        </p>
      </div>

      {/* Live Preview Modal */}
      {showLivePreview && (
        <div className="fixed inset-0 z-50 bg-white">
          <LivePreview
            content={(() => {
              const code = formData.settings.customCode || generateFooterCode();
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
  <title>Footer Preview</title>
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
            pageTitle={formData.name || "Footer Preview"}
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
                ? "Update Footer"
                : "Create Footer"}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Footer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Main Footer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Layout
              </label>
              <select
                value={formData.settings.layout}
                onChange={(e) => handleSettingChange("layout", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="1-column">1 Column</option>
                <option value="2-column">2 Columns</option>
                <option value="3-column">3 Columns</option>
                <option value="4-column">4 Columns</option>
              </select>
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
                  Active (display on website)
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
                  Custom Footer Code
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
              placeholder={`<footer class="bg-gray-900 text-white py-12">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-4 gap-8">
      <div>
        <h3 class="font-bold mb-4">Company</h3>
        <ul>
          <li><a href="/about">About Us</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>`}
              spellCheck="false"
            />
          </div>
        )}

        {/* Visual Builder Settings */}
        {editorMode === "visual" && (
          <>
            {/* Footer Columns */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Footer Columns
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Configure your footer sections and links
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addColumn}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
                  Add Column
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.settings.columns.map((column, colIndex) => (
                  <div
                    key={column.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="text"
                        value={column.title}
                        onChange={(e) =>
                          updateColumn(column.id, "title", e.target.value)
                        }
                        className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm font-medium"
                        placeholder="Column Title"
                      />
                      <button
                        type="button"
                        onClick={() => removeColumn(column.id)}
                        className="text-red-600 hover:text-red-700 ml-2 p-1"
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

                    <select
                      value={column.content}
                      onChange={(e) =>
                        updateColumn(column.id, "content", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs mb-2"
                    >
                      <option value="text">Links</option>
                      <option value="social">Social Icons</option>
                    </select>

                    {column.content === "text" && (
                      <div className="space-y-2">
                        {column.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={item.label}
                              onChange={(e) =>
                                updateColumnItem(
                                  column.id,
                                  itemIndex,
                                  "label",
                                  e.target.value
                                )
                              }
                              className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs"
                              placeholder="Label"
                            />
                            <input
                              type="text"
                              value={item.url}
                              onChange={(e) =>
                                updateColumnItem(
                                  column.id,
                                  itemIndex,
                                  "url",
                                  e.target.value
                                )
                              }
                              className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs"
                              placeholder="URL"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeColumnItem(column.id, itemIndex)
                              }
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <svg
                                className="w-3 h-3"
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
                        ))}
                        <button
                          type="button"
                          onClick={() => addColumnItem(column.id)}
                          className="w-full px-2 py-1 border border-dashed border-gray-300 rounded text-xs text-gray-600 hover:border-blue-500 hover:text-blue-600"
                        >
                          + Add Link
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Appearance Settings - Combined */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Appearance Settings
              </h2>

              <div className="space-y-6">
                {/* Copyright Section */}
                <div className="pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Copyright Text
                    </h3>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.settings.copyright.enabled}
                        onChange={(e) =>
                          handleSettingChange(
                            "copyright.enabled",
                            e.target.checked
                          )
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-sm text-gray-600">Enable</span>
                    </label>
                  </div>

                  {formData.settings.copyright.enabled && (
                    <input
                      type="text"
                      value={formData.settings.copyright.text}
                      onChange={(e) =>
                        handleSettingChange("copyright.text", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      placeholder="© 2025 Your Company. All rights reserved."
                    />
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
                          placeholder="#000000"
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
                          placeholder="#FFFFFF"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Links
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={formData.settings.styles.linkColor}
                          onChange={(e) =>
                            handleSettingChange(
                              "styles.linkColor",
                              e.target.value
                            )
                          }
                          className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.settings.styles.linkColor}
                          onChange={(e) =>
                            handleSettingChange(
                              "styles.linkColor",
                              e.target.value
                            )
                          }
                          className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs font-mono uppercase"
                          placeholder="#9CA3AF"
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
