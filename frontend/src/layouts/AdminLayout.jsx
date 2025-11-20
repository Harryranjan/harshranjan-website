import { Link, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Pages", path: "/admin/pages", icon: "📄" },
    { name: "Blog Posts", path: "/admin/blog", icon: "📝" },
    { name: "Categories", path: "/admin/categories", icon: "🏷️" },
    { name: "Tags", path: "/admin/tags", icon: "🔖" },
    { name: "Forms & Popups", path: "/admin/forms", icon: "📋" },
    { name: "Downloads", path: "/admin/downloads", icon: "📥" },
    { name: "Menus", path: "/admin/menus", icon: "☰" },
    { name: "Header Builder", path: "/admin/header-builder/new", icon: "🔝" },
    { name: "Footer Builder", path: "/admin/footer-builder/new", icon: "🔻" },
    { name: "Portfolio", path: "/admin/portfolio", icon: "💼" },
    { name: "Testimonials", path: "/admin/testimonials", icon: "⭐" },
    { name: "Media Library", path: "/admin/media", icon: "🖼️" },
    { name: "SEO Settings", path: "/admin/seo", icon: "🔍" },
    { name: "Landing Pages", path: "/admin/landing-pages", icon: "🚀" },
    { name: "Contact Messages", path: "/admin/messages", icon: "✉️" },
    { name: "Email & SMTP", path: "/admin/email-settings", icon: "📧" },
    { name: "Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-900 p-2"
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
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/"
                target="_blank"
                className="hidden sm:block text-gray-600 hover:text-gray-900"
              >
                View Site →
              </Link>
              <div className="flex items-center space-x-2">
                <span className="hidden md:inline text-sm text-gray-600">
                  {user?.email}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`w-64 bg-white border-r min-h-screen fixed left-0 top-16 z-40 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 w-full overflow-x-hidden">
          <div className="max-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
