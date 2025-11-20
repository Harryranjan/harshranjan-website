import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiArrowLeft, FiUpload, FiFile, FiImage } from "react-icons/fi";
import api from "../../utils/api";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Toast from "../../components/Toast";
import {
  ToggleWithDescription,
  FileUpload,
  ImageUpload,
} from "../../components/ui";

export default function DownloadForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    category: "ebook",
    thumbnail: "",
    file_url: "",
    file_type: "pdf",
    file_size: "",
    status: "draft",
    featured: false,
    requires_form: true,
    meta_title: "",
    meta_description: "",
    author: "",
    difficulty: "beginner",
    reading_time: "",
    tags: [],
  });

  useEffect(() => {
    if (isEdit) {
      loadDownload();
    }
  }, [id]);

  const loadDownload = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/downloads/${id}`);
      setFormData(data);
    } catch (error) {
      console.error("Error loading download:", error);
      setToast({ type: "error", message: "Failed to load download" });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Auto-generate slug from title
      if (field === "title" && !isEdit) {
        updated.slug = generateSlug(value);
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.slug || !formData.file_url) {
      setToast({
        type: "error",
        message: "Please fill in all required fields",
      });
      return;
    }

    try {
      setSaving(true);

      if (isEdit) {
        await api.put(`/downloads/${id}`, formData);
        setToast({
          type: "success",
          message: "Download updated successfully",
        });
      } else {
        await api.post("/downloads", formData);
        setToast({
          type: "success",
          message: "Download created successfully",
        });
      }

      setTimeout(() => {
        navigate("/admin/downloads");
      }, 1500);
    } catch (error) {
      console.error("Error saving download:", error);
      setToast({
        type: "error",
        message: error.response?.data?.message || "Failed to save download",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="ghost"
            icon={<FiArrowLeft />}
            onClick={() => navigate("/admin/downloads")}
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? "Edit Download" : "Add New Download"}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEdit
                ? "Update download information"
                : "Create a new downloadable resource"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>

            <div className="space-y-4">
              <Input
                label="Title"
                required
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g., Complete Guide to React Hooks"
              />

              <Input
                label="Slug"
                required
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                placeholder="complete-guide-to-react-hooks"
                hint="URL-friendly version of the title"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <textarea
                  value={formData.short_description}
                  onChange={(e) =>
                    handleChange("short_description", e.target.value)
                  }
                  rows={2}
                  className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  placeholder="Brief description for preview cards (max 500 characters)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  placeholder="Detailed description about the download content"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  >
                    <option value="ebook">E-book</option>
                    <option value="guide">Guide</option>
                    <option value="template">Template</option>
                    <option value="checklist">Checklist</option>
                    <option value="worksheet">Worksheet</option>
                    <option value="toolkit">Toolkit</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* File Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiFile /> File Information
            </h2>

            <div className="space-y-6">
              <FileUpload
                label="Upload File"
                required
                value={formData.file_url}
                onChange={(url) => handleChange("file_url", url)}
                onFileInfoChange={(info) => {
                  if (info.file_type) handleChange("file_type", info.file_type);
                  if (info.file_size) handleChange("file_size", info.file_size);
                }}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Type
                  </label>
                  <select
                    value={formData.file_type}
                    onChange={(e) => handleChange("file_type", e.target.value)}
                    className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  >
                    <option value="pdf">PDF</option>
                    <option value="docx">DOCX</option>
                    <option value="xlsx">XLSX</option>
                    <option value="zip">ZIP</option>
                    <option value="pptx">PPTX</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <Input
                  label="File Size"
                  value={formData.file_size}
                  onChange={(e) => handleChange("file_size", e.target.value)}
                  placeholder="e.g., 2.5 MB"
                />
              </div>

              <ImageUpload
                label="Thumbnail Image"
                value={formData.thumbnail}
                onChange={(url) => handleChange("thumbnail", url)}
              />
            </div>
          </div>

          {/* Metadata Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Additional Metadata
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Author"
                  value={formData.author}
                  onChange={(e) => handleChange("author", e.target.value)}
                  placeholder="John Doe"
                />

                <Input
                  label="Reading Time"
                  value={formData.reading_time}
                  onChange={(e) => handleChange("reading_time", e.target.value)}
                  placeholder="e.g., 15 min read"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => handleChange("difficulty", e.target.value)}
                  className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                >
                  <option value="beginner">🟢 Beginner</option>
                  <option value="intermediate">🟡 Intermediate</option>
                  <option value="advanced">🔴 Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={Array.isArray(formData.tags) ? formData.tags.join(", ") : formData.tags}
                  onChange={(e) => handleChange("tags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
                  className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  placeholder="SEO, Marketing, Analytics (comma separated)"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter tags separated by commas
                </p>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Settings
            </h2>

            <div className="space-y-4">
              <ToggleWithDescription
                checked={formData.featured}
                onChange={(e) => handleChange("featured", e.target.checked)}
                label="Featured Download"
                description="Show this download prominently on the downloads page"
                variant="highlighted"
              />

              <ToggleWithDescription
                checked={formData.requires_form}
                onChange={(e) =>
                  handleChange("requires_form", e.target.checked)
                }
                label="Require Lead Capture Form"
                description="Users must fill out a form before downloading"
                variant="highlighted"
              />
            </div>
          </div>

          {/* SEO Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO</h2>

            <div className="space-y-4">
              <Input
                label="Meta Title"
                value={formData.meta_title}
                onChange={(e) => handleChange("meta_title", e.target.value)}
                placeholder="Custom title for search engines"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.meta_description}
                  onChange={(e) =>
                    handleChange("meta_description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  placeholder="Description for search engine results"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/admin/downloads")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={<FiSave />}
              loading={saving}
            >
              {isEdit ? "Update Download" : "Create Download"}
            </Button>
          </div>
        </form>
      </div>

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
