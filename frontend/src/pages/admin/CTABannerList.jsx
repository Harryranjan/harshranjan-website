import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiEye,
  FiEyeOff,
  FiCode,
  FiBarChart2,
  FiCheckCircle,
  FiMonitor,
} from "react-icons/fi";
import api from "../../utils/api";
import Modal from "../../components/Modal";
import CTABanner from "../../components/CTABanner";

const CTABannerList = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [showShortcodeModal, setShowShortcodeModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await api.get("/cta-banners");
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching CTA banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/cta-banners/${bannerToDelete.id}`);
      setBanners(banners.filter((b) => b.id !== bannerToDelete.id));
      setShowDeleteModal(false);
      setBannerToDelete(null);
    } catch (error) {
      console.error("Error deleting CTA banner:", error);
      alert("Failed to delete CTA banner");
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const response = await api.post(`/cta-banners/${id}/duplicate`);
      setBanners([response.data, ...banners]);
    } catch (error) {
      console.error("Error duplicating CTA banner:", error);
      alert("Failed to duplicate CTA banner");
    }
  };

  const handleStatusToggle = async (banner) => {
    try {
      const newStatus = banner.status === "active" ? "inactive" : "active";
      const response = await api.put(`/cta-banners/${banner.id}`, {
        ...banner,
        status: newStatus,
      });
      setBanners(banners.map((b) => (b.id === banner.id ? response.data : b)));
    } catch (error) {
      console.error("Error updating banner status:", error);
      alert("Failed to update banner status");
    }
  };

  const getVariantIcon = (variant) => {
    const icons = {
      "sticky-top": "⬆️",
      "floating-button": "🎯",
      "slide-bottom": "⬇️",
      "smart-header": "🧠",
    };
    return icons[variant] || "📢";
  };

  const getVariantLabel = (variant) => {
    const labels = {
      "sticky-top": "Sticky Top",
      "floating-button": "Floating Button",
      "slide-bottom": "Slide Bottom",
      "smart-header": "Smart Header",
      "banner-strip": "Banner Strip",
      "corner-popup": "Corner Popup",
      "full-screen-takeover": "Full Screen",
      "slide-in-left": "Slide Left",
      "sticky-bottom": "Sticky Bottom",
      "notification-bar": "Notification",
    };
    return labels[variant] || variant;
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      draft: "bg-yellow-100 text-yellow-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const copyShortcode = (id) => {
    const shortcode = `[cta_banner id="${id}"]`;
    navigator.clipboard.writeText(shortcode);
    setCopiedId(id);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const openShortcodeModal = (id) => {
    setSelectedBanner(banners.find((b) => b.id === id));
    setShowShortcodeModal(true);
  };

  const openPreview = (id) => {
    const banner = banners.find((b) => b.id === id);
    console.log("Opening preview for banner:", banner);
    setSelectedBanner(banner);
    setShowPreviewModal(true);
    console.log("Preview modal should be open:", true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CTA Banners</h1>
          <p className="text-gray-600 mt-1">
            Create and manage call-to-action banners
          </p>
        </div>
        <Link
          to="/admin/cta-banners/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FiPlus /> Create Banner
        </Link>
      </div>

      {/* Banners List */}
      {banners.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">📢</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No CTA Banners Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first CTA banner to capture leads and drive conversions
          </p>
          <Link
            to="/admin/cta-banners/create"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus /> Create Your First Banner
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 flex flex-col"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl flex-shrink-0">
                    {getVariantIcon(banner.variant)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 truncate mb-1.5">
                      {banner.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      {getStatusBadge(banner.status)}
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium">
                        {getVariantLabel(banner.variant)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 line-clamp-1">
                    <strong className="text-gray-900">Title:</strong> {banner.title}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {banner.description}
                  </p>
                </div>
              </div>

              {/* Stats Section */}
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {banner.view_count || 0}
                    </div>
                    <div className="text-xs text-gray-500">Views</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {banner.click_count || 0}
                    </div>
                    <div className="text-xs text-gray-500">Clicks</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">
                      {banner.click_count > 0 && banner.view_count > 0
                        ? `${((banner.click_count / banner.view_count) * 100).toFixed(1)}%`
                        : "0%"}
                    </div>
                    <div className="text-xs text-gray-500">CTR</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 mt-auto">
                <div className="grid grid-cols-6 gap-2">
                  <button
                    onClick={() => handleStatusToggle(banner)}
                    className={`p-2.5 rounded-lg transition-all flex items-center justify-center ${
                      banner.status === "active"
                        ? "bg-green-50 text-green-600 hover:bg-green-100"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                    title={banner.status === "active" ? "Deactivate" : "Activate"}
                  >
                    {banner.status === "active" ? (
                      <FiEye size={16} />
                    ) : (
                      <FiEyeOff size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => openPreview(banner.id)}
                    className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all flex items-center justify-center"
                    title="Preview Banner"
                  >
                    <FiMonitor size={16} />
                  </button>
                  <button
                    onClick={() => copyShortcode(banner.id)}
                    className={`p-2.5 rounded-lg transition-all flex items-center justify-center ${
                      copiedId === banner.id
                        ? "bg-green-500 text-white"
                        : "bg-purple-50 text-purple-600 hover:bg-purple-100"
                    }`}
                    title={copiedId === banner.id ? "Copied!" : "Copy Shortcode"}
                  >
                    {copiedId === banner.id ? (
                      <FiCheckCircle size={16} />
                    ) : (
                      <FiCode size={16} />
                    )}
                  </button>
                  <Link
                    to={`/admin/cta-banners/edit/${banner.id}`}
                    className="p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all flex items-center justify-center"
                    title="Edit"
                  >
                    <FiEdit2 size={16} />
                  </Link>
                  <button
                    onClick={() => handleDuplicate(banner.id)}
                    className="p-2.5 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center"
                    title="Duplicate"
                  >
                    <FiCopy size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setBannerToDelete(banner);
                      setShowDeleteModal(true);
                    }}
                    className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all flex items-center justify-center"
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
                <div className="text-xs text-gray-400 text-center mt-3">
                  Updated {new Date(banner.updated_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} size="md">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete CTA Banner
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{bannerToDelete?.name}"? This
              action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Banner
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedBanner && (
        <Modal isOpen={showPreviewModal} onClose={() => setShowPreviewModal(false)} size="xl">
          <div className="p-6 max-w-5xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Preview: {selectedBanner.name}
            </h3>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-yellow-800">
                👁️ This is a live preview of your CTA banner. Scroll within the preview area to see scroll-based animations.
              </p>
            </div>

            {/* Preview Area with scrollable content */}
            <div className="relative bg-gray-100 rounded-lg overflow-y-auto border-2 border-gray-300" style={{ height: "500px" }}>
              {/* Spacer content to enable scrolling */}
              <div style={{ height: "200px" }} className="bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
                <p className="text-gray-400 text-sm">Scroll down to see scroll-triggered banners</p>
              </div>
              
              <div className="relative bg-white" style={{ minHeight: "800px", paddingTop: "100px" }}>
                <CTABanner
                  variant={selectedBanner.variant}
                  title={selectedBanner.title}
                  description={selectedBanner.description}
                  buttonText={selectedBanner.button_text}
                  phoneNumber={selectedBanner.show_phone ? selectedBanner.phone_number : null}
                  showAfterScroll={50}
                  dismissible={false}
                  customColors={selectedBanner.colors ? {
                    bgFrom: selectedBanner.colors.bgFrom || "#ef4444",
                    bgTo: selectedBanner.colors.bgTo || "#dc2626",
                    buttonBg: selectedBanner.colors.buttonBg || "#ffffff",
                    buttonText: selectedBanner.colors.buttonText || "#dc2626",
                    text: selectedBanner.colors.text || "#ffffff",
                  } : null}
                  storageKey={`preview-${selectedBanner.id}-${Date.now()}`}
                  onButtonClick={() => alert("Button clicked! In live mode, this would trigger the configured action.")}
                />
                
                {/* Dummy content */}
                <div className="p-8 space-y-4">
                  <h4 className="text-xl font-bold text-gray-800">Sample Page Content</h4>
                  <p className="text-gray-600">This is sample content to demonstrate how the CTA banner appears on your page.</p>
                  <p className="text-gray-600">The banner position and behavior will match what visitors see on the actual website.</p>
                  <div className="h-40 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  openShortcodeModal(selectedBanner.id);
                  setShowPreviewModal(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <FiCode size={16} /> Get Shortcode
              </button>
              <Link
                to={`/admin/cta-banners/edit/${selectedBanner.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FiEdit2 size={16} /> Edit Banner
              </Link>
            </div>
          </div>
        </Modal>
      )}

      {/* Shortcode Modal */}
      {showShortcodeModal && selectedBanner && (
        <Modal isOpen={showShortcodeModal} onClose={() => setShowShortcodeModal(false)} size="lg">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              CTA Banner Shortcode
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shortcode (Copy & Paste)
                </label>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm">
                  [cta_banner id="{selectedBanner.id}"]
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ✓ Shortcode copied to clipboard!
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  React Component Usage
                </label>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm overflow-x-auto">
                  {`<CTABannerEmbed id="${selectedBanner.id}" />`}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2 text-sm">
                  📝 How to Use:
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Add the shortcode to any page content</li>
                  <li>• The banner will automatically render on the page</li>
                  <li>• Make sure the banner status is "Active"</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowShortcodeModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CTABannerList;
