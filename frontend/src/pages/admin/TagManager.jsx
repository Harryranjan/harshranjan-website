import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import {
  Input,
  Button,
  Card,
  Modal,
  EmptyState,
  LoadingGrid,
  FormModal,
  ColorPicker,
} from "../../components/ui";

export default function TagManager() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#10B981",
  });
  const [modal, setModal] = useState({ show: false, type: "", message: "" });

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await api.get("/blog/admin/tags");
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
      showModal("error", "Failed to load tags");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTag) {
        await api.put(`/blog/admin/tags/${editingTag.id}`, formData);
        showModal("success", "Tag updated successfully");
      } else {
        await api.post("/blog/admin/tags", formData);
        showModal("success", "Tag created successfully");
      }

      fetchTags();
      handleCloseModal();
    } catch (error) {
      showModal("error", error.response?.data?.message || "Failed to save tag");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tag?")) {
      return;
    }

    try {
      await api.delete(`/blog/admin/tags/${id}`);
      showModal("success", "Tag deleted successfully");
      fetchTags();
    } catch (error) {
      showModal(
        "error",
        error.response?.data?.message || "Failed to delete tag"
      );
    }
  };

  const handleSync = async () => {
    try {
      await api.post("/blog/admin/tags/sync");
      showModal("success", "Tag usage counts synchronized successfully");
      fetchTags();
    } catch (error) {
      showModal("error", "Failed to sync tag counts");
    }
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
    setFormData({
      name: tag.name,
      slug: tag.slug,
      description: tag.description || "",
      color: tag.color || "#10B981",
    });
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingTag(null);
    setFormData({ name: "", slug: "", description: "", color: "#10B981" });
  };

  const showModal = (type, message) => {
    setModal({ show: true, type, message });
    setTimeout(() => setModal({ show: false, type: "", message: "" }), 3000);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (value) => {
    setFormData({
      ...formData,
      name: value,
      slug: generateSlug(value),
    });
  };

  return (
    <>
      <Helmet>
        <title>Tag Manager - Admin Dashboard</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tag Manager</h1>
              <p className="mt-2 text-gray-600">
                Manage blog tags and monitor usage
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleSync}
                variant="secondary"
                className="flex items-center gap-2"
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Sync Counts
              </Button>
              <Button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Tag
              </Button>
            </div>
          </div>

          {/* Tags Grid */}
          {loading ? (
            <LoadingGrid columns={4} count={8} />
          ) : tags.length === 0 ? (
            <Card>
              <EmptyState
                icon={
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                }
                title="No tags"
                description="Get started by creating a new tag."
              />
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tags.map((tag) => (
                <Card
                  key={tag.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                        style={{ backgroundColor: tag.color || "#10B981" }}
                      >
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                          />
                        </svg>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(tag)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(tag.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {tag.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">/{tag.slug}</p>

                    {tag.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                        {tag.description}
                      </p>
                    )}

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Usage</span>
                        <span className="text-lg font-bold text-green-600">
                          {tag.usage_count || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <FormModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        title={editingTag ? "Edit Tag" : "Add Tag"}
        onSubmit={handleSubmit}
        submitText={editingTag ? "Update" : "Create"}
      >
        <Input
          label="Tag Name"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g., Social Media"
          required
        />

        <Input
          label="Slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="social-media"
          helperText="URL-friendly version of the name"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Brief description of this tag"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <ColorPicker
          label="Color"
          value={formData.color}
          onChange={(color) => setFormData({ ...formData, color })}
        />
      </FormModal>

      {/* Success/Error Modal */}
      {modal.show && (
        <Modal
          type={modal.type}
          message={modal.message}
          onClose={() => setModal({ show: false, type: "", message: "" })}
        />
      )}
    </>
  );
}
