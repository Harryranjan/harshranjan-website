import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    content: true,
    design: true,
    marketing: true,
    configuration: true,
  });

  const menuSections = [
    {
      id: "overview",
      title: "Overview",
      items: [{ name: "Dashboard", path: "/admin/dashboard", icon: "📊" }],
    },
    {
      id: "content",
      title: "Content Management",
      items: [
        { name: "Pages", path: "/admin/pages", icon: "📄" },
        { name: "Blog Posts", path: "/admin/blog", icon: "📝" },
        { name: "Categories", path: "/admin/categories", icon: "🏷️" },
        { name: "Tags", path: "/admin/tags", icon: "🔖" },
        { name: "Landing Pages", path: "/admin/landing-pages", icon: "🚀" },
      ],
    },
    {
      id: "design",
      title: "Design & Layout",
      items: [
        {
          name: "Header Builder",
          path: "/admin/header-builder/new",
          icon: "🔝",
        },
        {
          name: "Footer Builder",
          path: "/admin/footer-builder/new",
          icon: "🔻",
        },
        { name: "Menus", path: "/admin/menus", icon: "☰" },
        { name: "Media Library", path: "/admin/media", icon: "🖼️" },
      ],
    },
    {
      id: "marketing",
      title: "Marketing & Engagement",
      items: [
        { name: "Forms & Popups", path: "/admin/forms", icon: "📋" },
        { name: "CTA Banners", path: "/admin/cta-banners", icon: "📢" },
        { name: "Downloads", path: "/admin/downloads", icon: "📥" },
        { name: "Contact Messages", path: "/admin/messages", icon: "✉️" },
      ],
    },
    {
      id: "showcase",
      title: "Portfolio & Social Proof",
      items: [
        { name: "Portfolio", path: "/admin/portfolio", icon: "💼" },
        { name: "Testimonials", path: "/admin/testimonials", icon: "⭐" },
      ],
    },
    {
      id: "configuration",
      title: "Configuration",
      items: [
        { name: "SEO Settings", path: "/admin/seo", icon: "🔍" },
        { name: "Email & SMTP", path: "/admin/email-settings", icon: "📧" },
        { name: "Settings", path: "/admin/settings", icon: "⚙️" },
      ],
    },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-all"
                aria-label="Toggle Sidebar"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  HR
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Admin Panel
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/"
                target="_blank"
                className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all"
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span className="text-sm font-medium">View Site</span>
              </Link>
              <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || "Admin"}
                  </span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:from-red-700 hover:to-red-800 transition-all shadow-sm hover:shadow"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`w-72 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-16 z-40 transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-4rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {menuSections.map((section) => (
              <div key={section.id} className="space-y-2">
                {section.title && (
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors group"
                  >
                    <span>{section.title}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedSections[section.id] ? "rotate-180" : ""
                      }`}
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
                )}
                <div
                  className={`space-y-1 overflow-hidden transition-all duration-200 ${
                    expandedSections[section.id]
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {section.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group relative ${
                        isActive(item.path)
                          ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 font-medium shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {isActive(item.path) && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-600 rounded-r-full" />
                      )}
                      <span
                        className={`text-xl transition-transform duration-200 ${
                          isActive(item.path)
                            ? "scale-110"
                            : "group-hover:scale-110"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="text-sm flex-1">{item.name}</span>
                      {isActive(item.path) && (
                        <svg
                          className="w-4 h-4 text-primary-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Sidebar Footer */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="px-4 py-3 bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg">
                <p className="text-xs font-medium text-gray-700 mb-1">
                  Need Help?
                </p>
                <p className="text-xs text-gray-600">
                  Check out our documentation
                </p>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-4 sm:p-6 lg:p-8 w-full overflow-x-hidden bg-gray-50">
          <div className="max-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
