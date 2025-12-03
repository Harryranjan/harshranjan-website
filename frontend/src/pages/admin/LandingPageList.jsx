import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import { Spinner } from "../../components/ui";
import Toast from "../../components/Toast";

export default function LandingPageList() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: "",
    search: "",
  });
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    conversions: 0,
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchLandingPages();
  }, [filter]);

  const fetchLandingPages = async () => {
    try {
      setLoading(true);
      const params = {
        template: "custom", // Landing pages use custom template
        ...(filter.status && { status: filter.status }),
        ...(filter.search && { search: filter.search }),
      };
      const response = await api.get("/pages", { params });

      // Show all custom template pages as landing pages
      const landingPages = response.data.pages || [];

      // Debug: Check what data we're getting
      if (landingPages.length > 0) {
        console.log("First landing page data:", landingPages[0]);
        console.log("createdAt:", landingPages[0].createdAt);
        console.log("created_at:", landingPages[0].created_at);
      }

      setPages(landingPages);

      // Calculate stats
      const published = landingPages.filter(
        (p) => p.status === "published"
      ).length;
      const draft = landingPages.filter((p) => p.status === "draft").length;

      setStats({
        total: landingPages.length,
        published,
        draft,
        conversions: landingPages.reduce((acc, p) => acc + (p.views || 0), 0),
      });
    } catch (error) {
      console.error("Failed to fetch landing pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this landing page?"))
      return;

    try {
      await api.delete(`/pages/${id}`);
      fetchLandingPages();
      setToast({
        type: "success",
        message: "Landing page deleted successfully!",
      });
    } catch (error) {
      console.error("Failed to delete landing page:", error);
      setToast({ type: "error", message: "Failed to delete landing page" });
    }
  };

  const handleDuplicate = async (page) => {
    try {
      const duplicateData = {
        ...page,
        title: `${page.title} (Copy)`,
        slug: `${page.slug}-copy-${Date.now()}`,
        status: "draft",
      };
      delete duplicateData.id;
      delete duplicateData.created_at;
      delete duplicateData.updated_at;

      await api.post("/pages", duplicateData);
      fetchLandingPages();
      setToast({
        type: "success",
        message: "Landing page duplicated successfully!",
      });
    } catch (error) {
      console.error("Failed to duplicate landing page:", error);
      setToast({ type: "error", message: "Failed to duplicate landing page" });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      console.log("No date string provided");
      return "N/A";
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.log("Invalid date:", dateString);
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const templates = [
    {
      id: "hero-cta",
      name: "Hero + CTA",
      icon: "🎯",
      description: "Simple landing with hero section and call-to-action",
      color: "blue",
    },
    {
      id: "product-launch",
      name: "Product Launch",
      icon: "🚀",
      description: "Product features, testimonials, and pricing",
      color: "purple",
    },
    {
      id: "lead-magnet",
      name: "Lead Magnet",
      icon: "🧲",
      description: "Download offer with opt-in form",
      color: "green",
    },
    {
      id: "webinar",
      name: "Webinar Registration",
      icon: "🎓",
      description: "Event details with countdown and registration",
      color: "orange",
    },
    {
      id: "sales-page",
      name: "Sales Page",
      icon: "💰",
      description: "Long-form sales with testimonials and guarantees",
      color: "red",
    },
    {
      id: "coming-soon",
      name: "Coming Soon",
      icon: "⏰",
      description: "Pre-launch page with email signup",
      color: "indigo",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Landing Pages - Admin Dashboard</title>
      </Helmet>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl text-white">
                🚀
              </span>
              Landing Pages
            </h1>
            <p className="text-gray-600 mt-2">
              Create high-converting landing pages for your campaigns
            </p>
          </div>
          <Link
            to="/admin/landing-pages/create"
            style={{
              background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119))',
            }}
            className="text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all shadow-lg font-medium flex items-center gap-2 hover:opacity-90"
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
            Create Landing Page
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div style={{ background: 'linear-gradient(to bottom right, rgb(59, 130, 246), rgb(37, 99, 235))' }} className="rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Pages</p>
              <p className="text-3xl font-bold mt-1">{stats.total}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(to bottom right, rgb(34, 197, 94), rgb(22, 163, 74))' }} className="rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Published</p>
              <p className="text-3xl font-bold mt-1">{stats.published}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(to bottom right, rgb(234, 179, 8), rgb(249, 115, 22))' }} className="rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Drafts</p>
              <p className="text-3xl font-bold mt-1">{stats.draft}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(to bottom right, rgb(168, 85, 247), rgb(236, 72, 153))' }} className="rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Views</p>
              <p className="text-3xl font-bold mt-1">{stats.conversions}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            />
          </svg>
          Start with a Template
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => {
            // Map colors to Tailwind classes
            const colorClasses = {
              blue: {
                border: 'hover:border-blue-500',
                bg: 'bg-blue-100'
              },
              purple: {
                border: 'hover:border-purple-500',
                bg: 'bg-purple-100'
              },
              green: {
                border: 'hover:border-green-500',
                bg: 'bg-green-100'
              },
              orange: {
                border: 'hover:border-orange-500',
                bg: 'bg-orange-100'
              },
              red: {
                border: 'hover:border-red-500',
                bg: 'bg-red-100'
              },
              indigo: {
                border: 'hover:border-indigo-500',
                bg: 'bg-indigo-100'
              }
            };
            
            const colors = colorClasses[template.color] || colorClasses.blue;
            
            return (
              <Link
                key={template.id}
                to={`/admin/landing-pages/create?template=${template.id}`}
                className={`group bg-white rounded-xl border-2 border-gray-200 ${colors.border} p-6 transition-all hover:shadow-lg`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`text-4xl ${colors.bg} p-3 rounded-lg group-hover:scale-110 transition-transform`}
                  >
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {template.description}
                    </p>
                  </div>
                </div>
              <div className="mt-4 flex items-center text-sm font-medium text-purple-600 group-hover:text-purple-700">
                Use Template
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Landing Pages
            </label>
            <div className="relative">
              <input
                type="text"
                value={filter.search}
                onChange={(e) =>
                  setFilter({ ...filter, search: e.target.value })
                }
                placeholder="Search by title, slug..."
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Filter
            </label>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Landing Pages List */}
      {loading ? (
        <div className="text-center py-12">
          <Spinner size="md" />
        </div>
      ) : pages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Landing Pages Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first landing page to start converting visitors
          </p>
          <Link
            to="/admin/landing-pages/create"
            style={{
              background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(219, 39, 119))',
            }}
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all font-medium"
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
            Create Your First Landing Page
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pages.map((page) => (
            <div
              key={page.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition">
                      {page.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
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
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      /{page.slug}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      page.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {page.status}
                  </span>
                </div>
                {page.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {page.excerpt}
                  </p>
                )}
              </div>

              {/* Card Body - Stats */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {page.views || 0}
                    </div>
                    <div className="text-xs text-gray-500">Views</div>
                  </div>
                  <div className="text-center border-l border-r border-gray-200">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatDate(page.createdAt || page.created_at)}
                    </div>
                    <div className="text-xs text-gray-500">Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatDate(page.updatedAt || page.updated_at)}
                    </div>
                    <div className="text-xs text-gray-500">Updated</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <a
                    href={`/landing/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
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
                    Preview
                  </a>
                  <Link
                    to={`/admin/landing-pages/edit/${page.id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 transition text-sm font-medium"
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
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDuplicate(page)}
                    className="bg-blue-100 text-blue-700 px-3 py-2.5 rounded-lg hover:bg-blue-200 transition"
                    title="Duplicate"
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(page.id)}
                    className="bg-red-100 text-red-700 px-3 py-2.5 rounded-lg hover:bg-red-200 transition"
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
            </div>
          ))}
        </div>
      )}

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
