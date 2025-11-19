import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import {
  Input,
  Textarea,
  Button,
  Card,
  ImageUpload,
  RichTextEditor,
  Modal,
  TagInput,
  MultiSelectWithSearch,
  Spinner,
} from "../../components/ui";

export default function BlogForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    category: [],
    tags: [],
    is_published: false,
    publish_status: "draft",
    scheduled_at: "",
    meta_title: "",
    meta_description: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    fetchCategories();
    if (isEditMode) {
      fetchPost();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/blog/admin/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/blog/${id}`);
      const post = response.data.post; // Backend returns { success: true, post }
      setFormData({
        title: post.title || "",
        slug: post.slug || "",
        excerpt: post.excerpt || "",
        content: post.content || "",
        featured_image: post.featured_image || "",
        category: Array.isArray(post.category)
          ? post.category
          : post.category
          ? [post.category]
          : [],
        tags: Array.isArray(post.tags) ? post.tags : [],
        is_published: post.is_published || false,
        publish_status: post.publish_status || "draft",
        scheduled_at: post.scheduled_at
          ? new Date(post.scheduled_at).toISOString().slice(0, 16)
          : "",
        meta_title: post.meta_title || "",
        meta_description: post.meta_description || "",
      });
    } catch (error) {
      console.error("Failed to fetch post:", error);
      alert("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    // Auto-generate slug from title if slug is empty or hasn't been manually edited
    if (name === "title" && !formData.slug) {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData({
        ...formData,
        [name]: newValue,
        slug: autoSlug,
      });
    } else {
      setFormData({
        ...formData,
        [name]: newValue,
      });
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageChange = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      featured_image: imageUrl,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const payload = {
        ...formData,
        // tags and category are already arrays, no need to transform
      };

      if (isEditMode) {
        await api.put(`/blog/${id}`, payload);
        setModalMessage("Blog post updated successfully!");
      } else {
        await api.post("/blog", payload);
        setModalMessage("Blog post created successfully!");
      }

      setShowModal(true);

      // Navigate after modal closes
      setTimeout(() => {
        navigate("/admin/blog");
      }, 2000);
    } catch (error) {
      console.error("Failed to save post:", error);
      if (error.response?.data?.errors) {
        const apiErrors = {};
        error.response.data.errors.forEach((err) => {
          apiErrors[err.param] = err.msg;
        });
        setErrors(apiErrors);
      } else {
        alert("Failed to save post");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="text-center py-12">
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>
          {isEditMode ? "Edit Blog Post" : "Create Blog Post"} - Admin Dashboard
        </title>
      </Helmet>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditMode ? "Edit Blog Post" : "Create New Post"}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditMode ? "Update your blog post" : "Create a new blog post"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Content Card */}
        <Card title="Content">
          <div className="space-y-4">
            {/* Title */}
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              error={errors.title}
              required
            />

            {/* URL Slug */}
            <div>
              <Input
                label="URL Slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="url-slug-for-post"
                error={errors.slug}
              />
              <p className="mt-1 text-sm text-gray-500">
                URL:{" "}
                <span className="font-mono text-blue-600">
                  https://yoursite.com/blog/{formData.slug || "url-slug"}
                </span>
              </p>
            </div>

            {/* Excerpt */}
            <Textarea
              label="Excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              placeholder="Brief summary of the post"
            />

            {/* Content */}
            <RichTextEditor
              label="Content"
              value={formData.content}
              onChange={(value) => {
                setFormData({ ...formData, content: value });
                if (errors.content) {
                  setErrors({ ...errors, content: "" });
                }
              }}
              placeholder="Write your post content here..."
              error={errors.content}
              helperText="Use the toolbar above to format your content with headings, lists, links, images, and more."
              required
            />
          </div>
        </Card>

        {/* Media & Categorization */}
        <Card title="Media & Categorization">
          <div className="space-y-4">
            {/* Featured Image */}
            <ImageUpload
              value={formData.featured_image}
              onChange={handleImageChange}
              label="Featured Image"
            />

            {/* Categories */}
            <MultiSelectWithSearch
              label="Categories"
              value={formData.category}
              onChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              options={categories}
              displayKey="name"
              valueKey="name"
              placeholder="Select categories..."
              allowCustom={true}
              helperText="Select multiple categories or press Enter to add custom ones"
            />

            {/* Tags */}
            <TagInput
              value={formData.tags}
              onChange={(tags) => setFormData({ ...formData, tags })}
              helperText="Type and press Enter to add tags. Start typing to see suggestions."
            />
          </div>
        </Card>

        {/* SEO Settings */}
        <Card title="SEO Settings">
          <div className="space-y-4">
            {/* Meta Title */}
            <Input
              label="Meta Title"
              name="meta_title"
              value={formData.meta_title}
              onChange={handleChange}
              maxLength={60}
              placeholder="Leave empty to use post title"
            />

            {/* Meta Description */}
            <Textarea
              label="Meta Description"
              name="meta_description"
              value={formData.meta_description}
              onChange={handleChange}
              rows={3}
              maxLength={160}
              placeholder="Leave empty to use excerpt"
            />
          </div>
        </Card>

        {/* Publishing Options */}
        <Card title="Publishing">
          <div className="space-y-4">
            {/* Publish Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publish Status
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="publish_status"
                    value="draft"
                    checked={formData.publish_status === "draft"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Save as Draft
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="publish_status"
                    value="published"
                    checked={formData.publish_status === "published"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Publish Immediately
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="publish_status"
                    value="scheduled"
                    checked={formData.publish_status === "scheduled"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Schedule for Later
                  </span>
                </label>
              </div>
            </div>

            {/* Schedule Date/Time */}
            {formData.publish_status === "scheduled" && (
              <Input
                label="Schedule Date & Time"
                type="datetime-local"
                name="scheduled_at"
                value={formData.scheduled_at}
                onChange={handleChange}
                required
              />
            )}

            <p className="text-gray-500 text-sm">
              {formData.publish_status === "draft" &&
                "This post will be saved as a draft and not visible to the public."}
              {formData.publish_status === "published" &&
                "This post will be published immediately and visible to the public."}
              {formData.publish_status === "scheduled" &&
                "This post will be automatically published at the scheduled date and time."}
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/blog")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            {isEditMode ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>

      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          navigate("/admin/blog");
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
