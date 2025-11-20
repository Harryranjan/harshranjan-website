import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import { Spinner, Modal } from "../../components/ui";

export default function MenuForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const menuType = searchParams.get("type") || "builder";
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [availablePages, setAvailablePages] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [showTemplateGallery, setShowTemplateGallery] = useState(
    menuType === "template"
  );

  const [formData, setFormData] = useState({
    name: "",
    location: "header",
    description: "",
    is_active: true,
    settings: { type: menuType },
  });

  const [newItem, setNewItem] = useState({
    title: "",
    url: "",
    type: "custom",
    target: "_self",
    page_id: null,
  });

  useEffect(() => {
    fetchAvailablePages();
    if (isEditing) {
      fetchMenu();
    }
  }, [id]);

  const fetchAvailablePages = async () => {
    try {
      const response = await api.get("/menus/pages/available");
      setAvailablePages(response.data.pages);
    } catch (error) {
      console.error("Failed to fetch pages:", error);
    }
  };

  const fetchMenu = async () => {
    try {
      const response = await api.get(`/menus/${id}`);
      setFormData(response.data.menu);
      setMenuItems(response.data.menu.items || []);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
      alert("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddItem = async () => {
    if (!newItem.title) {
      alert("Please enter a title");
      return;
    }

    if (newItem.type === "page" && !newItem.page_id) {
      alert("Please select a page");
      return;
    }

    if (newItem.type === "custom" && !newItem.url) {
      alert("Please enter a URL");
      return;
    }

    try {
      const itemData = {
        ...newItem,
        menu_id: id,
        order: menuItems.length,
      };

      const response = await api.post("/menus/items", itemData);
      setMenuItems([...menuItems, response.data.item]);

      // Reset form
      setNewItem({
        title: "",
        url: "",
        type: "custom",
        target: "_self",
        page_id: null,
      });
    } catch (error) {
      console.error("Failed to add menu item:", error);
      alert("Failed to add menu item");
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;

    try {
      await api.delete(`/menus/items/${itemId}`);
      setMenuItems(menuItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Failed to delete menu item:", error);
      alert("Failed to delete menu item");
    }
  };

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (dropIndex) => {
    if (!draggedItem) return;

    const dragIndex = menuItems.findIndex((item) => item.id === draggedItem.id);
    if (dragIndex === dropIndex) return;

    const newItems = [...menuItems];
    newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    // Update order
    const updatedItems = newItems.map((item, index) => ({
      id: item.id,
      order: index,
      parent_id: item.parent_id,
    }));

    setMenuItems(newItems);
    setDraggedItem(null);

    // Save order to backend
    try {
      await api.post("/menus/items/reorder", { items: updatedItems });
    } catch (error) {
      console.error("Failed to update menu order:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEditing) {
        await api.put(`/menus/${id}`, formData);
        setModalMessage("Menu updated successfully!");
      } else {
        const response = await api.post("/menus", formData);
        setModalMessage("Menu created successfully!");
        // Redirect to edit mode after creation
        setTimeout(() => {
          navigate(`/admin/menus/${response.data.menu.id}`);
        }, 1500);
      }
      setShowModal(true);
    } catch (error) {
      console.error("Failed to save menu:", error);
      alert(error.response?.data?.message || "Failed to save menu");
    } finally {
      setSaving(false);
    }
  };

  const menuTemplates = [
    {
      id: "modern-header",
      name: "Modern Header",
      category: "header",
      preview: "Clean header with logo, navigation, and CTA button",
      code: `<header class="bg-white shadow-sm">
  <div class="container mx-auto px-4 py-4">
    <div class="flex items-center justify-between">
      <div class="text-2xl font-bold text-gray-900">Logo</div>
      <nav class="hidden md:flex space-x-6">
        <a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
        <a href="/about" class="text-gray-700 hover:text-blue-600">About</a>
        <a href="/services" class="text-gray-700 hover:text-blue-600">Services</a>
        <a href="/contact" class="text-gray-700 hover:text-blue-600">Contact</a>
      </nav>
      <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Get Started</button>
    </div>
  </div>
</header>`,
    },
    {
      id: "transparent-header",
      name: "Transparent Header",
      category: "header",
      preview: "Transparent header perfect for hero sections",
      code: `<header class="absolute top-0 w-full z-50 bg-transparent text-white">
  <div class="container mx-auto px-4 py-6">
    <div class="flex items-center justify-between">
      <div class="text-2xl font-bold">Logo</div>
      <nav class="flex space-x-8">
        <a href="/" class="hover:text-blue-400 transition">Home</a>
        <a href="/about" class="hover:text-blue-400 transition">About</a>
        <a href="/services" class="hover:text-blue-400 transition">Services</a>
        <a href="/contact" class="hover:text-blue-400 transition">Contact</a>
      </nav>
      <button class="border-2 border-white px-6 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition">Contact Us</button>
    </div>
  </div>
</header>`,
    },
    {
      id: "modern-footer",
      name: "Modern Footer",
      category: "footer",
      preview: "Multi-column footer with social icons",
      code: `<footer class="bg-gray-900 text-white py-12">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <h3 class="text-xl font-bold mb-4">Company</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-gray-400 hover:text-white">About Us</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white">Careers</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white">Blog</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">Products</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-gray-400 hover:text-white">Features</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white">Pricing</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">Resources</h3>
        <ul class="space-y-2">
          <li><a href="#" class="text-gray-400 hover:text-white">Documentation</a></li>
          <li><a href="#" class="text-gray-400 hover:text-white">Support</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">Follow Us</h3>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-400 hover:text-white">FB</a>
          <a href="#" class="text-gray-400 hover:text-white">TW</a>
          <a href="#" class="text-gray-400 hover:text-white">IN</a>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
      <p>&copy; 2025 Your Company. All rights reserved.</p>
    </div>
  </div>
</footer>`,
    },
    {
      id: "announcement-bar",
      name: "Announcement Bar",
      category: "topbar",
      preview: "Top announcement bar with call-to-action",
      code: `<div class="bg-blue-600 text-white py-2">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-center text-sm">
      <span>🎉 Special Offer: Get 50% off this week! </span>
      <a href="/offer" class="ml-4 underline font-semibold hover:text-blue-200">Learn More →</a>
    </div>
  </div>
</div>`,
    },
    {
      id: "modern-horizontal",
      name: "Horizontal Navigation",
      category: "navigation",
      preview: "Clean horizontal menu with dropdown support",
      code: `<nav class="bg-white shadow-md">
  <div class="container mx-auto px-4">
    <ul class="flex space-x-6 py-4">
      <li><a href="/" class="text-gray-700 hover:text-blue-600">Home</a></li>
      <li><a href="/about" class="text-gray-700 hover:text-blue-600">About</a></li>
      <li><a href="/services" class="text-gray-700 hover:text-blue-600">Services</a></li>
      <li><a href="/contact" class="text-gray-700 hover:text-blue-600">Contact</a></li>
    </ul>
  </div>
</nav>`,
    },
    {
      id: "sidebar-vertical",
      name: "Sidebar Navigation",
      category: "sidebar",
      preview: "Vertical sidebar menu perfect for dashboards",
      code: `<aside class="w-64 bg-gray-800 min-h-screen p-4">
  <ul class="space-y-2">
    <li><a href="#" class="block text-white hover:bg-gray-700 px-4 py-2 rounded">Dashboard</a></li>
    <li><a href="#" class="block text-white hover:bg-gray-700 px-4 py-2 rounded">Pages</a></li>
    <li><a href="#" class="block text-white hover:bg-gray-700 px-4 py-2 rounded">Settings</a></li>
  </ul>
</aside>`,
    },
    {
      id: "mega-menu",
      name: "Mega Menu",
      category: "mega-menu",
      preview: "Full-width mega menu with columns",
      code: `<nav class="bg-gray-900 text-white">
  <div class="container mx-auto px-4 py-4">
    <div class="flex space-x-8">
      <div class="group relative">
        <button class="hover:text-blue-400">Products</button>
        <div class="hidden group-hover:block absolute top-full left-0 bg-white text-gray-900 shadow-xl p-6 w-96">
          <div class="grid grid-cols-2 gap-4">
            <div><h4 class="font-bold mb-2">Category 1</h4><ul><li>Item 1</li><li>Item 2</li></ul></div>
            <div><h4 class="font-bold mb-2">Category 2</h4><ul><li>Item 3</li><li>Item 4</li></ul></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>`,
    },
    {
      id: "mobile-hamburger",
      name: "Mobile Hamburger Menu",
      category: "mobile-menu",
      preview: "Responsive mobile menu with hamburger icon",
      code: `<div class="md:hidden">
  <button id="menu-toggle" class="p-2 text-gray-700">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  </button>
  <div id="mobile-menu" class="hidden fixed inset-0 bg-white z-50 p-6">
    <button id="menu-close" class="absolute top-4 right-4 text-gray-700">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <nav class="mt-8 space-y-4">
      <a href="/" class="block text-xl text-gray-900 hover:text-blue-600">Home</a>
      <a href="/about" class="block text-xl text-gray-900 hover:text-blue-600">About</a>
      <a href="/services" class="block text-xl text-gray-900 hover:text-blue-600">Services</a>
      <a href="/contact" class="block text-xl text-gray-900 hover:text-blue-600">Contact</a>
    </nav>
  </div>
</div>
<script>
  document.getElementById('menu-toggle').onclick = () => {
    document.getElementById('mobile-menu').classList.remove('hidden');
  };
  document.getElementById('menu-close').onclick = () => {
    document.getElementById('mobile-menu').classList.add('hidden');
  };
</script>`,
    },
  ];

  const handleTemplateSelect = (template) => {
    setFormData({
      ...formData,
      settings: {
        ...formData.settings,
        type: "template",
        templateId: template.id,
        customCode: template.code,
      },
    });
    setShowTemplateGallery(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  // Template Gallery View
  if (showTemplateGallery) {
    return (
      <div>
        <Helmet>
          <title>Choose Template - Admin Dashboard</title>
        </Helmet>

        <div className="mb-6">
          <button
            onClick={() => navigate("/admin/menus")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Menus
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Choose a Menu Template
          </h1>
          <p className="text-gray-600 mt-1">
            Select a pre-designed template to customize
          </p>
        </div>

        <div className="space-y-8">
          {[
            "header",
            "footer",
            "navigation",
            "topbar",
            "sidebar",
            "mega-menu",
            "mobile-menu",
          ].map((category) => {
            const categoryTemplates = menuTemplates.filter(
              (t) => t.category === category
            );
            if (categoryTemplates.length === 0) return null;

            const categoryNames = {
              header: "Header Templates",
              footer: "Footer Templates",
              navigation: "Navigation Menus",
              topbar: "Announcement Bars",
              sidebar: "Sidebar Menus",
              "mega-menu": "Mega Menus",
              "mobile-menu": "Mobile Menus",
            };

            return (
              <div key={category}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {categoryNames[category]}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-500 transition cursor-pointer"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <div className="p-4">
                        <h4 className="text-base font-semibold text-gray-900 mb-2">
                          {template.name}
                        </h4>
                        <p className="text-xs text-gray-600 mb-3">
                          {template.preview}
                        </p>
                        <div className="bg-gray-100 rounded p-3 overflow-auto max-h-32">
                          <pre className="text-[10px] text-gray-700 leading-tight">
                            {template.code.substring(0, 150)}...
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate("/admin/menus")}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            ← Back to Menus
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>
          {isEditing ? "Edit Menu" : "Create Menu"} - Admin Dashboard
        </title>
      </Helmet>

      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/menus")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Menus
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {isEditing ? "Edit Menu" : "Create New Menu"}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditing
            ? "Update menu settings and manage menu items"
            : menuType === "custom"
            ? "Create a menu with custom code"
            : "Create a new navigation menu"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Menu Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Menu Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Menu Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Main Navigation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <optgroup label="Primary Sections">
                  <option value="header">Header</option>
                  <option value="footer">Footer</option>
                  <option value="navigation">Navigation</option>
                </optgroup>
                <optgroup label="Additional Sections">
                  <option value="topbar">Top Bar</option>
                  <option value="announcement-bar">Announcement Bar</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="mobile-menu">Mobile Menu</option>
                  <option value="mega-menu">Mega Menu</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="custom">Custom Location</option>
                </optgroup>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optional description for this menu"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Active (menu will be displayed on the website)
                </span>
              </label>
            </div>
          </div>

          {/* Only show buttons here if NOT using custom code */}
          {menuType !== "custom" && formData.settings?.type !== "template" && (
            <div className="mt-6 flex items-center gap-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : isEditing
                  ? "Update Menu"
                  : "Create Menu"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/menus")}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Custom Code Section - Show for custom and template types */}
        {(menuType === "custom" || formData.settings?.type === "template") && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Custom Menu Code
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Write your custom HTML, CSS, and JavaScript for the menu. You can
              use Tailwind CSS classes or write custom styles.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HTML/CSS/JavaScript Code
                </label>
                <textarea
                  value={formData.settings?.customCode || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      settings: {
                        ...formData.settings,
                        customCode: e.target.value,
                      },
                    })
                  }
                  rows={20}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 text-gray-100"
                  placeholder={`<nav class="bg-white shadow-md">
  <div class="container mx-auto px-4">
    <ul class="flex space-x-6 py-4">
      <li><a href="/" class="text-gray-700 hover:text-blue-600">Home</a></li>
      <li><a href="/about" class="text-gray-700 hover:text-blue-600">About</a></li>
      <li><a href="/services" class="text-gray-700 hover:text-blue-600">Services</a></li>
      <li><a href="/contact" class="text-gray-700 hover:text-blue-600">Contact</a></li>
    </ul>
  </div>
</nav>

<style>
  /* Add custom CSS here */
</style>

<script>
  // Add custom JavaScript here
</script>`}
                  spellCheck="false"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  💡 Tips:
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use Tailwind CSS classes for rapid styling</li>
                  <li>• Include &lt;style&gt; tags for custom CSS</li>
                  <li>• Add &lt;script&gt; tags for interactive features</li>
                  <li>• Test your menu responsiveness on different devices</li>
                </ul>
              </div>
            </div>

            {/* Action buttons for custom code section */}
            <div className="mt-6 flex items-center gap-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : isEditing
                  ? "Update Menu"
                  : "Create Menu"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/menus")}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Menu Items Section - Only show when editing and builder type */}
        {isEditing && menuType === "builder" && (
          <>
            {/* Add New Item */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Add Menu Item
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newItem.type}
                    onChange={(e) =>
                      setNewItem({ ...newItem, type: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="page">Page</option>
                    <option value="custom">Custom Link</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) =>
                      setNewItem({ ...newItem, title: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Menu Title"
                  />
                </div>

                {newItem.type === "page" ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Page
                    </label>
                    <select
                      value={newItem.page_id || ""}
                      onChange={(e) =>
                        setNewItem({ ...newItem, page_id: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a page</option>
                      {availablePages.map((page) => (
                        <option key={page.id} value={page.id}>
                          {page.title}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL
                    </label>
                    <input
                      type="text"
                      value={newItem.url}
                      onChange={(e) =>
                        setNewItem({ ...newItem, url: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>
                )}

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Items List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Menu Items ({menuItems.length})
              </h2>

              {menuItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No menu items yet. Add your first item above.
                </p>
              ) : (
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => handleDragStart(item)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index)}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-move bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8h16M4 16h16"
                          />
                        </svg>
                        <div>
                          <div className="font-medium text-gray-900">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.type === "page"
                              ? `Page: ${item.page?.title || "Unknown"}`
                              : `URL: ${item.url}`}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-700 p-2"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </form>

      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          if (!isEditing) {
            // Will redirect in handleSubmit
          }
        }}
        type="success"
        title="Success!"
        message={modalMessage}
        autoClose={true}
        autoCloseDuration={2000}
      />
    </div>
  );
}
