import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiCopy, FiEye, FiEyeOff, FiCode, FiBarChart2 } from 'react-icons/fi';
import api from '../../utils/api';
import Modal from '../../components/Modal';

const CTABannerList = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [showShortcodeModal, setShowShortcodeModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await api.get('/cta-banners');
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching CTA banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/cta-banners/${bannerToDelete.id}`);
      setBanners(banners.filter(b => b.id !== bannerToDelete.id));
      setShowDeleteModal(false);
      setBannerToDelete(null);
    } catch (error) {
      console.error('Error deleting CTA banner:', error);
      alert('Failed to delete CTA banner');
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const response = await api.post(`/cta-banners/${id}/duplicate`);
      setBanners([response.data, ...banners]);
    } catch (error) {
      console.error('Error duplicating CTA banner:', error);
      alert('Failed to duplicate CTA banner');
    }
  };

  const handleStatusToggle = async (banner) => {
    try {
      const newStatus = banner.status === 'active' ? 'inactive' : 'active';
      const response = await api.put(`/cta-banners/${banner.id}`, {
        ...banner,
        status: newStatus
      });
      setBanners(banners.map(b => b.id === banner.id ? response.data : b));
    } catch (error) {
      console.error('Error updating banner status:', error);
      alert('Failed to update banner status');
    }
  };

  const getVariantIcon = (variant) => {
    const icons = {
      'sticky-top': '⬆️',
      'floating-button': '🎯',
      'slide-bottom': '⬇️',
      'smart-header': '🧠'
    };
    return icons[variant] || '📢';
  };

  const getVariantLabel = (variant) => {
    const labels = {
      'sticky-top': 'Sticky Top',
      'floating-button': 'Floating Button',
      'slide-bottom': 'Slide Bottom',
      'smart-header': 'Smart Header',
      'banner-strip': 'Banner Strip',
      'corner-popup': 'Corner Popup',
      'full-screen-takeover': 'Full Screen',
      'slide-in-left': 'Slide Left',
      'sticky-bottom': 'Sticky Bottom',
      'notification-bar': 'Notification'
    };
    return labels[variant] || variant;
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      draft: 'bg-yellow-100 text-yellow-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const copyShortcode = (id) => {
    const shortcode = `[cta_banner id="${id}"]`;
    navigator.clipboard.writeText(shortcode);
    setSelectedBanner(banners.find(b => b.id === id));
    setShowShortcodeModal(true);
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
          <p className="text-gray-600 mt-1">Create and manage call-to-action banners</p>
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No CTA Banners Yet</h3>
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
        <div className="grid gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-4xl">{getVariantIcon(banner.variant)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {banner.name}
                        </h3>
                        {getStatusBadge(banner.status)}
                        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                          {getVariantLabel(banner.variant)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        <strong>Title:</strong> {banner.title}
                      </p>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {banner.description}
                      </p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusToggle(banner)}
                      className={`p-2 rounded-lg transition-colors ${
                        banner.status === 'active'
                          ? 'bg-green-50 text-green-600 hover:bg-green-100'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                      title={banner.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      {banner.status === 'active' ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                    </button>
                    <button
                      onClick={() => copyShortcode(banner.id)}
                      className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                      title="Get Shortcode"
                    >
                      <FiCode size={18} />
                    </button>
                    <Link
                      to={`/admin/cta-banners/edit/${banner.id}`}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </Link>
                    <button
                      onClick={() => handleDuplicate(banner.id)}
                      className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Duplicate"
                    >
                      <FiCopy size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setBannerToDelete(banner);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <FiBarChart2 className="text-gray-400" />
                    <span className="text-gray-600">
                      <strong>{banner.view_count || 0}</strong> views
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">
                      <strong>{banner.click_count || 0}</strong> clicks
                    </span>
                  </div>
                  {banner.click_count > 0 && banner.view_count > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-600 font-semibold">
                        {((banner.click_count / banner.view_count) * 100).toFixed(1)}% CTR
                      </span>
                    </div>
                  )}
                  <div className="ml-auto text-xs text-gray-500">
                    Updated {new Date(banner.updated_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete CTA Banner
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{bannerToDelete?.name}"? This action cannot be undone.
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

      {/* Shortcode Modal */}
      {showShortcodeModal && selectedBanner && (
        <Modal onClose={() => setShowShortcodeModal(false)}>
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
