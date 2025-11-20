import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiEye } from 'react-icons/fi';
import api from '../../utils/api';
import CTABanner from '../../components/CTABanner';
import BackButton from '../../components/ui/BackButton';

const CTABannerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: 'Schedule Your Free ROI Audit',
    description: 'Discover exactly why top brands trust us with ₹300+ Crores in ad spends',
    variant: 'sticky-top',
    button_text: 'Get ROI Audit',
    button_url: '',
    phone_number: '+919176402555',
    show_phone: true,
    show_after_scroll: 100,
    dismissible: true,
    status: 'draft',
    placement: ['all'],
    colors: {
      background: 'from-red-500 to-red-600',
      buttonBg: 'white',
      buttonText: 'red-600',
      text: 'white'
    },
    settings: {}
  });

  useEffect(() => {
    if (id) {
      fetchBanner();
    }
  }, [id]);

  const fetchBanner = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/cta-banners/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching banner:', error);
      alert('Failed to load banner');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter a banner name');
      return;
    }

    try {
      setLoading(true);
      if (id) {
        await api.put(`/cta-banners/${id}`, formData);
      } else {
        await api.post('/cta-banners', formData);
      }
      navigate('/admin/cta-banners');
    } catch (error) {
      console.error('Error saving banner:', error);
      alert('Failed to save banner');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const variants = [
    { value: 'sticky-top', label: 'Sticky Top Banner', icon: '⬆️', description: 'Fixed at top, always visible' },
    { value: 'floating-button', label: 'Floating Button', icon: '🎯', description: 'Bottom right corner' },
    { value: 'slide-bottom', label: 'Slide-in Bottom', icon: '⬇️', description: 'Slides up from bottom' },
    { value: 'smart-header', label: 'Smart Header', icon: '🧠', description: 'Full size, shrinks on scroll' }
  ];

  const colorPresets = [
    { name: 'Red (Default)', bg: 'from-red-500 to-red-600', btn: 'white', btnText: 'red-600' },
    { name: 'Blue', bg: 'from-blue-500 to-blue-600', btn: 'white', btnText: 'blue-600' },
    { name: 'Green', bg: 'from-green-500 to-green-600', btn: 'white', btnText: 'green-600' },
    { name: 'Purple', bg: 'from-purple-500 to-purple-600', btn: 'white', btnText: 'purple-600' },
    { name: 'Orange', bg: 'from-orange-500 to-orange-600', btn: 'white', btnText: 'orange-600' }
  ];

  const placementOptions = [
    { value: 'all', label: 'All Pages' },
    { value: 'homepage', label: 'Homepage Only' },
    { value: 'blog', label: 'Blog Pages' },
    { value: 'services', label: 'Services Page' },
    { value: 'about', label: 'About Page' },
    { value: 'contact', label: 'Contact Page' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton to="/admin/cta-banners" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {id ? 'Edit' : 'Create'} CTA Banner
            </h1>
            <p className="text-gray-600">
              {id ? 'Update your' : 'Design a new'} call-to-action banner
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FiEye /> {showPreview ? 'Hide' : 'Show'} Preview
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g., Homepage ROI Audit CTA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Internal name for identification</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
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
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Discover exactly why top brands trust us..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Variant Selection */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Banner Variant</h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {variants.map((variant) => (
                <div
                  key={variant.value}
                  onClick={() => handleChange('variant', variant.value)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.variant === variant.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{variant.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{variant.label}</div>
                      <div className="text-xs text-gray-600 mt-1">{variant.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Call-to-Action Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.button_text}
                  onChange={(e) => handleChange('button_text', e.target.value)}
                  placeholder="Get ROI Audit"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.button_url}
                  onChange={(e) => handleChange('button_url', e.target.value)}
                  placeholder="/contact or https://example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to use default action</p>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.show_phone}
                    onChange={(e) => handleChange('show_phone', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Show Phone Number</span>
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
                    onChange={(e) => handleChange('phone_number', e.target.value)}
                    placeholder="+919176402555"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Display Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Display Settings</h2>
            
            <div className="space-y-4">
              {(formData.variant === 'slide-bottom' || formData.variant === 'floating-button') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Show After Scroll (pixels)
                  </label>
                  <input
                    type="number"
                    value={formData.show_after_scroll}
                    onChange={(e) => handleChange('show_after_scroll', parseInt(e.target.value))}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Banner appears after user scrolls this many pixels</p>
                </div>
              )}

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dismissible}
                    onChange={(e) => handleChange('dismissible', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Allow users to dismiss</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Show On Pages
                </label>
                <div className="space-y-2">
                  {placementOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.placement.includes(option.value)}
                        onChange={(e) => {
                          if (option.value === 'all') {
                            handleChange('placement', ['all']);
                          } else {
                            const newPlacement = e.target.checked
                              ? [...formData.placement.filter(p => p !== 'all'), option.value]
                              : formData.placement.filter(p => p !== option.value);
                            handleChange('placement', newPlacement.length === 0 ? ['all'] : newPlacement);
                          }
                        }}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Color Customization */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Color Scheme</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleChange('colors', {
                    background: preset.bg,
                    buttonBg: preset.btn,
                    buttonText: preset.btnText,
                    text: 'white'
                  })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.colors.background === preset.bg
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`h-8 rounded bg-gradient-to-r ${preset.bg} mb-2`}></div>
                  <div className="text-xs font-medium text-gray-700">{preset.name}</div>
                </button>
              ))}
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
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Active:</strong> Banner will show on selected pages<br />
                <strong>Inactive:</strong> Banner hidden but saved<br />
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
              {loading ? 'Saving...' : id ? 'Update Banner' : 'Create Banner'}
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
            {...formData}
            variant={formData.variant}
            title={formData.title}
            description={formData.description}
            buttonText={formData.button_text}
            phoneNumber={formData.phone_number}
            showAfterScroll={0}
            storageKey={`preview-${Date.now()}`}
          />
        </div>
      )}
    </div>
  );
};

export default CTABannerForm;
