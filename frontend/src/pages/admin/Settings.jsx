import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import { Spinner } from "../../components/ui";
import Toast from "../../components/Toast";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [toast, setToast] = useState(null);

  const [settings, setSettings] = useState({
    // General Settings
    site_name: "",
    site_tagline: "",
    site_logo: "",
    site_favicon: "",
    admin_email: "",
    timezone: "UTC",
    date_format: "YYYY-MM-DD",
    time_format: "HH:mm",

    // Contact Information
    contact_email: "",
    contact_phone: "",
    contact_address: "",
    contact_city: "",
    contact_state: "",
    contact_zip: "",
    contact_country: "",

    // Social Media
    facebook_url: "",
    twitter_url: "",
    instagram_url: "",
    linkedin_url: "",
    youtube_url: "",
    github_url: "",

    // SEO Defaults
    default_meta_description: "",
    default_meta_keywords: "",
    google_analytics_id: "",
    google_site_verification: "",
    facebook_pixel_id: "",

    // Features
    enable_comments: false,
    enable_newsletter: false,
    enable_downloads: true,
    maintenance_mode: false,

    // Privacy & Legal
    privacy_policy_url: "",
    terms_of_service_url: "",
    cookie_policy_url: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/settings/category/general");

      // Map the settings from the API response
      const settingsData = {};
      Object.keys(response.data).forEach((key) => {
        settingsData[key] = response.data[key];
      });

      setSettings((prev) => ({ ...prev, ...settingsData }));
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Convert settings object to array format for API
      const settingsArray = Object.keys(settings).map((key) => ({
        key,
        value: settings[key],
        category: "general",
      }));

      await api.put("/settings", { settings: settingsArray });

      setToast({
        type: "success",
        message: "Settings saved successfully!",
      });
    } catch (error) {
      console.error("Failed to save settings:", error);
      setToast({
        type: "error",
        message: "Failed to save settings",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>General Settings - Admin Panel</title>
      </Helmet>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">
              Manage your website settings and configuration
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: "general", label: "General", icon: "⚙️" },
              { id: "contact", label: "Contact", icon: "📧" },
              { id: "social", label: "Social Media", icon: "🌐" },
              { id: "seo", label: "SEO & Analytics", icon: "📊" },
              { id: "features", label: "Features", icon: "🎯" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name *
                  </label>
                  <input
                    type="text"
                    value={settings.site_name}
                    onChange={(e) => handleChange("site_name", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="My Awesome Website"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Tagline
                  </label>
                  <input
                    type="text"
                    value={settings.site_tagline}
                    onChange={(e) =>
                      handleChange("site_tagline", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="Your site's motto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Logo URL
                  </label>
                  <input
                    type="url"
                    value={settings.site_logo}
                    onChange={(e) => handleChange("site_logo", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="/uploads/logo.png"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon URL
                  </label>
                  <input
                    type="url"
                    value={settings.site_favicon}
                    onChange={(e) =>
                      handleChange("site_favicon", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="/uploads/favicon.ico"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Email *
                  </label>
                  <input
                    type="email"
                    value={settings.admin_email}
                    onChange={(e) =>
                      handleChange("admin_email", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="admin@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleChange("timezone", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="Europe/London">London</option>
                    <option value="Asia/Kolkata">India</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) =>
                      handleChange("contact_email", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="contact@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={settings.contact_phone}
                    onChange={(e) =>
                      handleChange("contact_phone", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={settings.contact_address}
                    onChange={(e) =>
                      handleChange("contact_address", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="123 Business Street"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={settings.contact_city}
                    onChange={(e) =>
                      handleChange("contact_city", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Province
                  </label>
                  <input
                    type="text"
                    value={settings.contact_state}
                    onChange={(e) =>
                      handleChange("contact_state", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    value={settings.contact_zip}
                    onChange={(e) =>
                      handleChange("contact_zip", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={settings.contact_country}
                    onChange={(e) =>
                      handleChange("contact_country", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={settings.facebook_url}
                    onChange={(e) =>
                      handleChange("facebook_url", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter/X URL
                  </label>
                  <input
                    type="url"
                    value={settings.twitter_url}
                    onChange={(e) =>
                      handleChange("twitter_url", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={settings.instagram_url}
                    onChange={(e) =>
                      handleChange("instagram_url", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={settings.linkedin_url}
                    onChange={(e) =>
                      handleChange("linkedin_url", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={settings.youtube_url}
                    onChange={(e) =>
                      handleChange("youtube_url", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="https://youtube.com/c/yourchannel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={settings.github_url}
                    onChange={(e) => handleChange("github_url", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SEO & Analytics Tab */}
          {activeTab === "seo" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Meta Description
                  </label>
                  <textarea
                    value={settings.default_meta_description}
                    onChange={(e) =>
                      handleChange("default_meta_description", e.target.value)
                    }
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="A brief description of your website"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Meta Keywords
                  </label>
                  <input
                    type="text"
                    value={settings.default_meta_keywords}
                    onChange={(e) =>
                      handleChange("default_meta_keywords", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={settings.google_analytics_id}
                    onChange={(e) =>
                      handleChange("google_analytics_id", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Site Verification
                  </label>
                  <input
                    type="text"
                    value={settings.google_site_verification}
                    onChange={(e) =>
                      handleChange("google_site_verification", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="Verification code from Google Search Console"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook Pixel ID
                  </label>
                  <input
                    type="text"
                    value={settings.facebook_pixel_id}
                    onChange={(e) =>
                      handleChange("facebook_pixel_id", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="Facebook Pixel tracking ID"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === "features" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Comments</h3>
                    <p className="text-sm text-gray-600">
                      Allow visitors to comment on blog posts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enable_comments}
                      onChange={(e) =>
                        handleChange("enable_comments", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Newsletter</h3>
                    <p className="text-sm text-gray-600">
                      Enable newsletter subscription forms
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enable_newsletter}
                      onChange={(e) =>
                        handleChange("enable_newsletter", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Downloads</h3>
                    <p className="text-sm text-gray-600">
                      Allow file downloads and lead magnets
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enable_downloads}
                      onChange={(e) =>
                        handleChange("enable_downloads", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <h3 className="font-medium text-red-900">
                      Maintenance Mode
                    </h3>
                    <p className="text-sm text-red-600">
                      Display maintenance page to visitors (admins can still
                      access)
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.maintenance_mode}
                      onChange={(e) =>
                        handleChange("maintenance_mode", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium text-gray-900 mb-4">
                  Privacy & Legal Pages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Privacy Policy URL
                    </label>
                    <input
                      type="url"
                      value={settings.privacy_policy_url}
                      onChange={(e) =>
                        handleChange("privacy_policy_url", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      placeholder="/privacy-policy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Terms of Service URL
                    </label>
                    <input
                      type="url"
                      value={settings.terms_of_service_url}
                      onChange={(e) =>
                        handleChange("terms_of_service_url", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      placeholder="/terms-of-service"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cookie Policy URL
                    </label>
                    <input
                      type="url"
                      value={settings.cookie_policy_url}
                      onChange={(e) =>
                        handleChange("cookie_policy_url", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      placeholder="/cookie-policy"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
