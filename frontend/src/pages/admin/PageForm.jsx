import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../../utils/api";
import {
  Spinner,
  ImageUpload,
  Modal,
  BlockEditor,
  LivePreview,
  TrackingScriptsSection,
} from "../../components/ui";
import CodeEditorFullscreen from "../../components/CodeEditorFullscreen";

export default function PageForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [editorMode, setEditorMode] = useState("rich"); // "rich", "block", or "code"
  const [showPreview, setShowPreview] = useState(false);
  const autoSaveTimeoutRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image: "",
    template: "default",
    status: "draft",
    is_homepage: false,
    show_in_menu: true,
    hide_title: false,
    menu_order: 0,
    parent_id: null,
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    custom_css: "",
    custom_js: "",
    head_scripts: "",
    body_scripts: "",
  });

  const [allPages, setAllPages] = useState([]);
  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    fetchAllPages();
    if (isEditing) {
      fetchPage();
    }
  }, [id]);

  // Auto-save effect
  useEffect(() => {
    if (!isEditing || !formData.title) return; // Only auto-save when editing existing pages

    // Clear previous timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Set new timeout for auto-save (30 seconds after last change)
    autoSaveTimeoutRef.current = setTimeout(() => {
      handleAutoSave();
    }, 30000); // 30 seconds

    // Cleanup on unmount
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [formData]);

  const fetchAllPages = async () => {
    try {
      const response = await api.get("/pages", { params: { limit: 100 } });
      setAllPages(response.data.pages);
    } catch (error) {
      console.error("Failed to fetch pages:", error);
    }
  };

  const fetchPage = async () => {
    try {
      const response = await api.get(`/pages/${id}`);
      const pageData = response.data.page;

      // Detect editor mode based on content type
      if (Array.isArray(pageData.content)) {
        setEditorMode("block");
      } else if (
        typeof pageData.content === "string" &&
        pageData.content.trim().startsWith("<!DOCTYPE")
      ) {
        // If content starts with DOCTYPE, it's custom code
        setEditorMode("code");
      } else {
        setEditorMode("rich");
        // Ensure content is a string for ReactQuill
        if (!pageData.content) {
          pageData.content = "";
        }
      }

      // Ensure hide_title has a default value if not present
      if (pageData.hide_title === undefined || pageData.hide_title === null) {
        pageData.hide_title = false;
      }

      setFormData(pageData);
      console.log("Loaded page data:", pageData); // Debug log
    } catch (error) {
      console.error("Failed to fetch page:", error);
      alert("Failed to load page");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If user edits the slug field, mark slug as manually edited.
    if (name === "slug") {
      if (value === "") {
        setSlugEdited(false);
      } else {
        setSlugEdited(true);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Auto-generate slug from title while creating a new page,
    // but only if the slug hasn't been manually edited yet.
    if (name === "title" && !isEditing && !slugEdited) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleEditorModeChange = (mode) => {
    setEditorMode(mode);

    // Convert content format when switching modes
    if (mode === "block" && typeof formData.content === "string") {
      // Converting from rich text/code to blocks: start with empty blocks
      setFormData((prev) => ({ ...prev, content: [] }));
    } else if (
      (mode === "rich" || mode === "code") &&
      Array.isArray(formData.content)
    ) {
      // Converting from blocks to rich text/code: start with empty string
      setFormData((prev) => ({ ...prev, content: "" }));
    }
  };

  const handleAutoSave = async () => {
    if (!isEditing || saving || autoSaving) return;

    try {
      setAutoSaving(true);
      await api.put(`/pages/${id}`, formData);
      setLastSaved(new Date());
    } catch (error) {
      console.error("Auto-save failed:", error);
    } finally {
      setAutoSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      console.log("Submitting formData:", formData); // Debug log
      if (isEditing) {
        await api.put(`/pages/${id}`, formData);
        setModalMessage("Page updated successfully!");
      } else {
        await api.post("/pages", formData);
        setModalMessage("Page created successfully!");
      }
      setShowModal(true);
    } catch (error) {
      console.error("Failed to save page:", error);
      alert(error.response?.data?.message || "Failed to save page");
    } finally {
      setSaving(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>
          {isEditing ? "Edit Page" : "Create Page"} - Admin Dashboard
        </title>
      </Helmet>

      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/pages")}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Pages
      </button>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {isEditing ? "Edit Page" : "Create New Page"}
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            {isEditing
              ? "Update page information"
              : "Add a new page to your website"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Preview Toggle Button */}
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              showPreview
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span className="font-medium">
              {showPreview ? "Hide Preview" : "Show Preview"}
            </span>
          </button>

          {/* Auto-save indicator */}
          {isEditing && (
            <div className="flex items-center gap-2 text-sm">
              {autoSaving ? (
                <div className="flex items-center gap-2 text-blue-600">
                  <Spinner size="sm" />
                  <span>Saving...</span>
                </div>
              ) : lastSaved ? (
                <div className="flex items-center gap-2 text-green-600">
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
                  <span>Saved {new Date(lastSaved).toLocaleTimeString()}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-500">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Auto-save enabled</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Form Section */}
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Page Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter page title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="page-url-slug"
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL-friendly version of the page name
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the page"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditorModeChange("rich")}
                      className={`px-3 py-1 text-sm rounded-lg transition ${
                        editorMode === "rich"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Rich Text
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditorModeChange("block")}
                      className={`px-3 py-1 text-sm rounded-lg transition ${
                        editorMode === "block"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Block Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEditorModeChange("code")}
                      className={`px-3 py-1 text-sm rounded-lg transition ${
                        editorMode === "code"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Custom Code
                    </button>
                  </div>
                </div>

                {editorMode === "rich" ? (
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={
                        typeof formData.content === "string"
                          ? formData.content
                          : ""
                      }
                      onChange={handleContentChange}
                      modules={quillModules}
                      className="bg-white"
                      style={{ minHeight: "300px" }}
                    />
                  </div>
                ) : editorMode === "block" ? (
                  <BlockEditor
                    value={
                      Array.isArray(formData.content) ? formData.content : []
                    }
                    onChange={(blocks) => {
                      setFormData((prev) => ({ ...prev, content: blocks }));
                    }}
                  />
                ) : (
                  <CodeEditorFullscreen
                    value={
                      typeof formData.content === "string"
                        ? formData.content
                        : ""
                    }
                    onChange={(value) => handleContentChange(value)}
                    language="HTML/CSS/JS"
                    minHeight="600px"
                    placeholder={`<!DOCTYPE html>\\n<html lang="en">\\n<head>\\n  <meta charset="UTF-8">\\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\\n  <title>Your Custom Page</title>\\n  <script src="https://cdn.tailwindcss.com"></script>\\n</head>\\n<body>\\n  <!-- Your custom HTML here -->\\n  <div class="container mx-auto p-8">\\n    <h1 class="text-4xl font-bold">Hello World!</h1>\\n  </div>\\n</body>\\n</html>`}
                  />
                )}
              </div>

              <div>
                <ImageUpload
                  label="Featured Image"
                  name="featured_image"
                  value={formData.featured_image}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured_image: value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Page Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Page Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template
                </label>
                <select
                  name="template"
                  value={formData.template}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="default">Default</option>
                  <option value="about">About</option>
                  <option value="services">Services</option>
                  <option value="contact">Contact</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent Page
                </label>
                <select
                  name="parent_id"
                  value={formData.parent_id || ""}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">None (Top Level)</option>
                  {allPages
                    .filter((p) => p.id !== parseInt(id))
                    .map((page) => (
                      <option key={page.id} value={page.id}>
                        {page.title}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menu Order
                </label>
                <input
                  type="number"
                  name="menu_order"
                  value={formData.menu_order}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Display Options
              </p>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="show_in_menu"
                  checked={formData.show_in_menu}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Show in navigation menu
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="hide_title"
                  checked={formData.hide_title}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Hide page title on frontend
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_homepage"
                  checked={formData.is_homepage}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Set as homepage</span>
              </label>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              SEO Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="SEO title for search engines"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                </label>
                <textarea
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="SEO description for search engines"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  name="meta_keywords"
                  value={formData.meta_keywords}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Advanced Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom CSS
                </label>
                <textarea
                  name="custom_css"
                  value={formData.custom_css}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="/* Custom CSS for this page */"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom JavaScript
                </label>
                <textarea
                  name="custom_js"
                  value={formData.custom_js}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="// Custom JavaScript for this page"
                />
              </div>
            </div>
          </div>

          {/* Tracking & Analytics Scripts */}
          <TrackingScriptsSection
            headScripts={formData.head_scripts}
            bodyScripts={formData.body_scripts}
            onHeadScriptsChange={(value) =>
              setFormData((prev) => ({ ...prev, head_scripts: value }))
            }
            onBodyScriptsChange={(value) =>
              setFormData((prev) => ({ ...prev, body_scripts: value }))
            }
          />

          {/* Form Actions */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/pages")}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : isEditing ? "Update Page" : "Create Page"}
            </button>
          </div>
        </form>
      </div>

      {/* Full-Screen Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="w-full h-full bg-white flex flex-col">
            {/* Modal Content with Integrated Header */}
            <div className="flex-1 overflow-hidden">
              <LivePreview
                content={formData.content}
                title={formData.title}
                template={formData.template}
                onClose={() => setShowPreview(false)}
                showTitle={true}
                pageTitle={formData.title || "Untitled Page"}
              />
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          navigate("/admin/pages");
        }}
        type="success"
        title="Success!"
        message={modalMessage}
        autoClose={true}
        autoCloseDuration={2000}
      />
    </div>
  );
}
