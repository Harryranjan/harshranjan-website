import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import { Spinner } from "../../components/ui";
import Toast from "../../components/Toast";

export default function LandingPageBuilder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const template = searchParams.get("template");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    status: "draft",
    template: "custom",
    meta_title: "",
    meta_description: "",
    meta_keywords: "landing",
    custom_css: "",
    custom_js: "",
    head_scripts: "",
    body_scripts: "",
  });

  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (id) {
      fetchLandingPage();
    } else if (template) {
      loadTemplate(template);
    }
  }, [id, template]);

  const fetchLandingPage = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/pages/${id}`);
      setFormData(response.data);
      // Parse sections from content if stored as JSON
      try {
        const parsedSections = JSON.parse(response.data.content || "[]");
        if (Array.isArray(parsedSections)) {
          setSections(parsedSections);
        }
      } catch {
        // If content is not JSON, treat as HTML
        setSections([
          {
            id: Date.now(),
            type: "html",
            content: response.data.content,
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch landing page:", error);
      setToast({ type: "error", message: "Failed to load landing page" });
    } finally {
      setLoading(false);
    }
  };

  const loadTemplate = (templateId) => {
    const templates = {
      "hero-cta": {
        title: "Hero + CTA Landing Page",
        slug: "hero-cta-landing",
        excerpt: "Simple and effective landing page with hero and CTA",
        sections: [
          {
            id: 1,
            type: "hero",
            heading: "Transform Your Business Today",
            subheading: "Join thousands of successful businesses",
            ctaText: "Get Started Free",
            ctaLink: "#signup",
            backgroundImage: "",
          },
          {
            id: 2,
            type: "features",
            title: "Why Choose Us",
            features: [
              {
                icon: "⚡",
                title: "Fast & Reliable",
                description: "Lightning-fast performance",
              },
              {
                icon: "🔒",
                title: "Secure",
                description: "Bank-level security",
              },
              {
                icon: "💰",
                title: "Affordable",
                description: "Best value for money",
              },
            ],
          },
          {
            id: 3,
            type: "cta",
            title: "Ready to Get Started?",
            description: "Join thousands of satisfied customers today",
            buttonText: "Start Your Free Trial",
            buttonLink: "#signup",
          },
        ],
      },
      "product-launch": {
        title: "New Product Launch",
        slug: "product-launch",
        excerpt: "Launch your product with impact",
        sections: [
          {
            id: 1,
            type: "hero",
            heading: "Introducing Our Latest Innovation",
            subheading: "The future is here",
            ctaText: "Pre-Order Now",
            ctaLink: "#preorder",
          },
          {
            id: 2,
            type: "features",
            title: "Amazing Features",
            features: [
              { icon: "🚀", title: "Feature 1", description: "Description" },
              { icon: "⭐", title: "Feature 2", description: "Description" },
              { icon: "💎", title: "Feature 3", description: "Description" },
            ],
          },
          {
            id: 3,
            type: "testimonials",
            title: "What People Say",
            testimonials: [
              {
                quote: "This product changed my life!",
                author: "John Doe",
                role: "CEO",
              },
            ],
          },
          {
            id: 4,
            type: "pricing",
            title: "Choose Your Plan",
            plans: [
              {
                name: "Basic",
                price: "$29",
                features: ["Feature 1", "Feature 2"],
              },
              {
                name: "Pro",
                price: "$99",
                features: ["Feature 1", "Feature 2", "Feature 3"],
              },
            ],
          },
        ],
      },
      "lead-magnet": {
        title: "Free Download",
        slug: "free-download",
        excerpt: "Get your free resource",
        sections: [
          {
            id: 1,
            type: "hero",
            heading: "Download Your Free Guide",
            subheading: "Learn the secrets to success",
            ctaText: "Get Instant Access",
            ctaLink: "#download",
          },
          {
            id: 2,
            type: "form",
            title: "Enter Your Details",
            formId: null,
          },
        ],
      },
    };

    const templateData = templates[templateId];
    if (templateData) {
      setFormData({
        ...formData,
        title: templateData.title,
        slug: templateData.slug,
        excerpt: templateData.excerpt,
      });
      setSections(templateData.sections);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Store sections as JSON in content field
      const dataToSave = {
        ...formData,
        content: JSON.stringify(sections),
      };

      if (id) {
        await api.put(`/pages/${id}`, dataToSave);
        setToast({
          type: "success",
          message: "Landing page updated successfully!",
        });
      } else {
        const response = await api.post("/pages", dataToSave);
        setToast({
          type: "success",
          message: "Landing page created successfully!",
        });
        setTimeout(() => navigate("/admin/landing-pages"), 1500);
      }
    } catch (error) {
      console.error("Failed to save landing page:", error);
      setToast({
        type: "error",
        message: error.response?.data?.message || "Failed to save landing page",
      });
    } finally {
      setSaving(false);
    }
  };

  const addSection = (type) => {
    const newSection = {
      id: Date.now(),
      type,
      ...getDefaultSectionData(type),
    };
    setSections([...sections, newSection]);
    setSelectedSection(newSection.id);
  };

  const getDefaultSectionData = (type) => {
    const defaults = {
      hero: {
        heading: "Your Heading Here",
        subheading: "Your subheading here",
        ctaText: "Get Started",
        ctaLink: "#",
        backgroundImage: "",
      },
      features: {
        title: "Features",
        features: [
          { icon: "⚡", title: "Feature 1", description: "Description" },
        ],
      },
      testimonials: {
        title: "Testimonials",
        testimonials: [
          { quote: "Great product!", author: "Customer", role: "User" },
        ],
      },
      cta: {
        title: "Call to Action",
        description: "Description",
        buttonText: "Click Here",
        buttonLink: "#",
      },
      form: {
        title: "Contact Form",
        formId: null,
      },
      html: {
        content: "<div>Your HTML content here</div>",
      },
    };
    return defaults[type] || {};
  };

  const updateSection = (sectionId, updates) => {
    setSections(
      sections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s))
    );
  };

  const deleteSection = (sectionId) => {
    if (window.confirm("Delete this section?")) {
      setSections(sections.filter((s) => s.id !== sectionId));
      setSelectedSection(null);
    }
  };

  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < sections.length) {
      [newSections[index], newSections[newIndex]] = [
        newSections[newIndex],
        newSections[index],
      ];
      setSections(newSections);
    }
  };

  const sectionTypes = [
    { type: "hero", icon: "🎯", label: "Hero Section" },
    { type: "features", icon: "⭐", label: "Features Grid" },
    { type: "testimonials", icon: "💬", label: "Testimonials" },
    { type: "cta", icon: "📢", label: "Call to Action" },
    { type: "form", icon: "📋", label: "Form Section" },
    { type: "pricing", icon: "💰", label: "Pricing Table" },
    { type: "html", icon: "📝", label: "Custom HTML" },
  ];

  if (loading) {
    return (
      <div className="text-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{id ? "Edit" : "Create"} Landing Page - Admin Dashboard</title>
      </Helmet>

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/landing-pages")}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-8 h-8"
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
            </button>
            {id ? "Edit" : "Create"} Landing Page
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/admin/landing-pages")}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <Spinner size="sm" />
                Saving...
              </>
            ) : (
              <>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save Landing Page
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Settings */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Page Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Page Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          {/* Add Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Add Sections</h3>
            <div className="space-y-2">
              {sectionTypes.map((sectionType) => (
                <button
                  key={sectionType.type}
                  onClick={() => addSection(sectionType.type)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition text-left group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {sectionType.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                    {sectionType.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Sections */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Page Sections ({sections.length})
            </h3>

            {sections.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-3">📦</div>
                <p className="text-gray-600">
                  No sections yet. Add sections from the left sidebar.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-300 transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {sectionTypes.find((t) => t.type === section.type)
                            ?.icon || "📄"}
                        </span>
                        <h4 className="font-semibold text-gray-900 capitalize">
                          {section.type} Section
                        </h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveSection(index, "up")}
                          disabled={index === 0}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                          title="Move Up"
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
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => moveSection(index, "down")}
                          disabled={index === sections.length - 1}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                          title="Move Down"
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
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteSection(section.id)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded ml-2"
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

                    {/* Section Content Editor */}
                    <div className="bg-gray-50 rounded p-4 text-sm space-y-3">
                      {section.type === "hero" && (
                        <>
                          <input
                            type="text"
                            placeholder="Heading"
                            value={section.heading || ""}
                            onChange={(e) =>
                              updateSection(section.id, {
                                heading: e.target.value,
                              })
                            }
                            className="w-full border rounded px-3 py-2"
                          />
                          <input
                            type="text"
                            placeholder="Subheading"
                            value={section.subheading || ""}
                            onChange={(e) =>
                              updateSection(section.id, {
                                subheading: e.target.value,
                              })
                            }
                            className="w-full border rounded px-3 py-2"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="CTA Text"
                              value={section.ctaText || ""}
                              onChange={(e) =>
                                updateSection(section.id, {
                                  ctaText: e.target.value,
                                })
                              }
                              className="border rounded px-3 py-2"
                            />
                            <input
                              type="text"
                              placeholder="CTA Link"
                              value={section.ctaLink || ""}
                              onChange={(e) =>
                                updateSection(section.id, {
                                  ctaLink: e.target.value,
                                })
                              }
                              className="border rounded px-3 py-2"
                            />
                          </div>
                        </>
                      )}

                      {section.type === "cta" && (
                        <>
                          <input
                            type="text"
                            placeholder="Title"
                            value={section.title || ""}
                            onChange={(e) =>
                              updateSection(section.id, {
                                title: e.target.value,
                              })
                            }
                            className="w-full border rounded px-3 py-2"
                          />
                          <textarea
                            placeholder="Description"
                            value={section.description || ""}
                            onChange={(e) =>
                              updateSection(section.id, {
                                description: e.target.value,
                              })
                            }
                            rows={2}
                            className="w-full border rounded px-3 py-2"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Button Text"
                              value={section.buttonText || ""}
                              onChange={(e) =>
                                updateSection(section.id, {
                                  buttonText: e.target.value,
                                })
                              }
                              className="border rounded px-3 py-2"
                            />
                            <input
                              type="text"
                              placeholder="Button Link"
                              value={section.buttonLink || ""}
                              onChange={(e) =>
                                updateSection(section.id, {
                                  buttonLink: e.target.value,
                                })
                              }
                              className="border rounded px-3 py-2"
                            />
                          </div>
                        </>
                      )}

                      {section.type === "html" && (
                        <textarea
                          placeholder="Custom HTML"
                          value={section.content || ""}
                          onChange={(e) =>
                            updateSection(section.id, {
                              content: e.target.value,
                            })
                          }
                          rows={4}
                          className="w-full border rounded px-3 py-2 font-mono text-xs"
                        />
                      )}

                      {/* Add more section types as needed */}
                      {!["hero", "cta", "html"].includes(section.type) && (
                        <div className="text-gray-500 italic">
                          Advanced editing for {section.type} sections coming
                          soon...
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
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
