import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import { Spinner, Modal } from "../../components/ui";

export default function MenuList() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showCreationModal, setShowCreationModal] = useState(false);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await api.get("/menus");
      setMenus(response.data.menus);
    } catch (error) {
      console.error("Failed to fetch menus:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this menu?")) return;

    try {
      setDeletingId(id);
      await api.delete(`/menus/${id}`);
      setMenus(menus.filter((menu) => menu.id !== id));
    } catch (error) {
      console.error("Failed to delete menu:", error);
      alert("Failed to delete menu");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleActive = async (menu) => {
    try {
      await api.put(`/menus/${menu.id}`, {
        ...menu,
        is_active: !menu.is_active,
      });
      setMenus(
        menus.map((m) =>
          m.id === menu.id ? { ...m, is_active: !m.is_active } : m
        )
      );
    } catch (error) {
      console.error("Failed to update menu:", error);
      alert("Failed to update menu");
    }
  };

  const locations = {
    header: "Header",
    footer: "Footer",
    topbar: "Top Bar",
    "announcement-bar": "Announcement Bar",
    sidebar: "Sidebar",
    "mobile-menu": "Mobile Menu",
    "mega-menu": "Mega Menu",
    navigation: "Navigation",
    custom: "Custom",
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Menus & Site Sections - Admin Dashboard</title>
      </Helmet>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Menus & Site Sections
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage navigation menus, headers, footers, and site sections
          </p>
        </div>
        <button
          onClick={() => setShowCreationModal(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
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
          Create Menu
        </button>
      </div>

      {menus.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No menus yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first menu to get started
          </p>
          <button
            onClick={() => setShowCreationModal(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {menu.name}
                    </h3>
                    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                      {locations[menu.location] || menu.location}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleActive(menu)}
                    className={`flex-shrink-0 ml-2 relative inline-flex h-5 w-9 items-center rounded-full transition ${
                      menu.is_active ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                        menu.is_active ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>
                    {menu.settings?.type === "header-builder" ||
                    menu.settings?.type === "footer-builder"
                      ? menu.settings?.customCode
                        ? "Custom Code"
                        : "Visual Builder"
                      : `${menu.items?.length || 0} item${
                          menu.items?.length !== 1 ? "s" : ""
                        }`}
                  </span>
                  <span className="flex items-center gap-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        menu.is_active ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                    {menu.is_active ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Date and Time */}
                <div className="text-xs text-gray-500 mb-3 space-y-1">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
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
                    <span>
                      Created:{" "}
                      {new Date(menu.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(menu.created_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
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
                    <span>
                      Updated:{" "}
                      {new Date(menu.updated_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(menu.updated_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (menu.settings?.type === "header-builder") {
                        navigate(`/admin/header-builder/${menu.id}`);
                      } else if (menu.settings?.type === "footer-builder") {
                        navigate(`/admin/footer-builder/${menu.id}`);
                      } else {
                        navigate(`/admin/menus/${menu.id}`);
                      }
                    }}
                    className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-xs font-medium"
                  >
                    {menu.settings?.type === "header-builder"
                      ? "Edit Header"
                      : menu.settings?.type === "footer-builder"
                      ? "Edit Footer"
                      : "Edit Menu"}
                  </button>
                  <button
                    onClick={() => handleDelete(menu.id)}
                    disabled={deletingId === menu.id}
                    className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition disabled:opacity-50"
                  >
                    {deletingId === menu.id ? (
                      <Spinner size="sm" />
                    ) : (
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
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Creation Modal */}
      {showCreationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Create New Section
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Choose what you want to create
              </p>
            </div>

            <div className="p-5 space-y-6">
              {/* Advanced Builders */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Visual Builders (Recommended)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Header Builder */}
                  <div
                    onClick={() => {
                      setShowCreationModal(false);
                      navigate("/admin/header-builder/new");
                    }}
                    className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-100 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
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
                          d="M4 5h16M4 5a2 2 0 012-2h12a2 2 0 012 2v0a2 2 0 01-2 2H6a2 2 0 01-2-2v0z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-base font-semibold text-gray-900 mb-1">
                      Header Builder
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      Build professional headers with logo, navigation, and CTA
                      buttons
                    </p>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      <li>✓ Visual editor</li>
                      <li>✓ Sticky header option</li>
                      <li>✓ Live preview</li>
                    </ul>
                  </div>

                  {/* Footer Builder */}
                  <div
                    onClick={() => {
                      setShowCreationModal(false);
                      navigate("/admin/footer-builder/new");
                    }}
                    className="border-2 border-purple-200 bg-purple-50 rounded-lg p-4 hover:border-purple-500 hover:bg-purple-100 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
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
                          d="M4 19h16M4 19a2 2 0 01-2-2v0a2 2 0 012-2h12a2 2 0 012 2v0a2 2 0 01-2 2H4z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-base font-semibold text-gray-900 mb-1">
                      Footer Builder
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      Create multi-column footers with links, social icons, and
                      copyright
                    </p>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      <li>✓ Multi-column layouts</li>
                      <li>✓ Social icons</li>
                      <li>✓ Live preview</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Menu Creation Options */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Menu Creation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Custom Code Option */}
                  <div
                    onClick={() => {
                      setShowCreationModal(false);
                      navigate("/admin/menus/new?type=custom");
                    }}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-500 hover:bg-purple-50 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition">
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
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Custom Code
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      Write your own HTML, CSS, and JavaScript code for complete
                      control
                    </p>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      <li>✓ Full customization</li>
                      <li>✓ Custom HTML/CSS/JS</li>
                      <li>✓ Advanced styling</li>
                    </ul>
                  </div>

                  {/* Templates Option */}
                  <div
                    onClick={() => {
                      setShowCreationModal(false);
                      navigate("/admin/menus/new?type=template");
                    }}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-500 hover:bg-green-50 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition">
                      <svg
                        className="w-6 h-6 text-green-600"
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
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Templates
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      Choose from professionally designed menu templates
                    </p>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      <li>✓ Pre-built designs</li>
                      <li>✓ Easy customization</li>
                      <li>✓ Professional layouts</li>
                    </ul>
                  </div>

                  {/* Build Your Own Option */}
                  <div
                    onClick={() => {
                      setShowCreationModal(false);
                      navigate("/admin/menus/new?type=builder");
                    }}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer group"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition">
                      <svg
                        className="w-6 h-6 text-blue-600"
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
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      Build Your Own
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      Use our drag-and-drop menu builder to create custom menus
                    </p>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      <li>✓ Drag & drop interface</li>
                      <li>✓ Nested menu items</li>
                      <li>✓ Page integration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t flex justify-end">
              <button
                onClick={() => setShowCreationModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
