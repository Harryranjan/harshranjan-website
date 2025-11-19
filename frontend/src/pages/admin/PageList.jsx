import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import { Spinner } from "../../components/ui";

export default function PageList() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState({ status: "", template: "", search: "", parent: "", menu: "" });
  const [sortBy, setSortBy] = useState("created");
  const [sortOrder, setSortOrder] = useState("desc");
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
  });
  const [selectedPages, setSelectedPages] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    fetchPages();
  }, [currentPage, filter]);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        ...(filter.status && { status: filter.status }),
        ...(filter.template && { template: filter.template }),
        ...(filter.search && { search: filter.search }),
      };
      const response = await api.get("/pages", { params });
      
      let fetchedPages = response.data.pages;
      
      // Apply client-side filters
      if (filter.parent === "root") {
        fetchedPages = fetchedPages.filter(p => !p.parent_id);
      } else if (filter.parent === "child") {
        fetchedPages = fetchedPages.filter(p => p.parent_id);
      }
      
      if (filter.menu === "visible") {
        fetchedPages = fetchedPages.filter(p => p.show_in_menu);
      } else if (filter.menu === "hidden") {
        fetchedPages = fetchedPages.filter(p => !p.show_in_menu);
      }
      
      // Apply client-side sorting
      fetchedPages.sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
          case "title":
            comparison = a.title.localeCompare(b.title);
            break;
          case "views":
            comparison = (a.views || 0) - (b.views || 0);
            break;
          case "updated":
            comparison = new Date(a.updatedAt || a.updated_at) - new Date(b.updatedAt || b.updated_at);
            break;
          case "created":
          default:
            comparison = new Date(a.createdAt || a.created_at) - new Date(b.createdAt || b.created_at);
            break;
        }
        
        return sortOrder === "asc" ? comparison : -comparison;
      });
      
      setPages(fetchedPages);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);
      
      // Calculate stats
      const published = response.data.pages.filter(p => p.status === 'published').length;
      const draft = response.data.pages.filter(p => p.status === 'draft').length;
      setStats({
        total: response.data.totalCount,
        published,
        draft,
      });
    } catch (error) {
      console.error("Failed to fetch pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPublish = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await api.put(`/pages/${id}`, { status: newStatus });
      fetchPages();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update page status");
    }
  };

  const handleDuplicate = async (page) => {
    try {
      const duplicateData = {
        ...page,
        title: `${page.title} (Copy)`,
        slug: `${page.slug}-copy-${Date.now()}`,
        status: 'draft',
        is_homepage: false,
      };
      delete duplicateData.id;
      delete duplicateData.created_at;
      delete duplicateData.updated_at;
      
      await api.post("/pages", duplicateData);
      fetchPages();
      alert("Page duplicated successfully!");
    } catch (error) {
      console.error("Failed to duplicate page:", error);
      alert("Failed to duplicate page");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;

    try {
      await api.delete(`/pages/${id}`);
      fetchPages();
    } catch (error) {
      console.error("Failed to delete page:", error);
      alert(error.response?.data?.message || "Failed to delete page");
    }
  };

  const toggleSelectAll = () => {
    if (selectedPages.length === pages.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(pages.map(p => p.id));
    }
  };

  const toggleSelectPage = (id) => {
    if (selectedPages.includes(id)) {
      setSelectedPages(selectedPages.filter(pid => pid !== id));
    } else {
      setSelectedPages([...selectedPages, id]);
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedPages.length === 0) {
      alert("Please select pages and an action");
      return;
    }

    const confirmMsg = `Are you sure you want to ${bulkAction} ${selectedPages.length} page(s)?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      if (bulkAction === "delete") {
        await Promise.all(selectedPages.map(id => api.delete(`/pages/${id}`)));
      } else if (bulkAction === "publish") {
        await Promise.all(selectedPages.map(id => api.put(`/pages/${id}`, { status: "published" })));
      } else if (bulkAction === "draft") {
        await Promise.all(selectedPages.map(id => api.put(`/pages/${id}`, { status: "draft" })));
      } else if (bulkAction.startsWith("template-")) {
        const template = bulkAction.replace("template-", "");
        await Promise.all(selectedPages.map(id => api.put(`/pages/${id}`, { template })));
      }

      setSelectedPages([]);
      setBulkAction("");
      setShowBulkActions(false);
      fetchPages();
      alert(`Bulk action completed successfully!`);
    } catch (error) {
      console.error("Bulk action failed:", error);
      alert("Some bulk actions may have failed. Please refresh.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          styles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const getTemplateBadge = (template) => {
    const icons = {
      default: "📄",
      about: "👤",
      services: "🛠️",
      contact: "📧",
      custom: "⚙️",
    };
    return (
      <span className="inline-flex items-center gap-1 text-sm">
        <span>{icons[template] || "📄"}</span>
        <span className="capitalize">{template}</span>
      </span>
    );
  };

  return (
    <div>
      <Helmet>
        <title>Pages - Admin Dashboard</title>
      </Helmet>

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Pages</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage your website pages
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/admin/pages/ordering"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition text-center whitespace-nowrap shadow-md relative z-10 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
            <span>Menu Order</span>
          </Link>
          <Link
            to="/admin/pages/create"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-center whitespace-nowrap shadow-md relative z-10"
          >
            Create New Page
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Pages</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Published</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.published}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Drafts</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.draft}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="space-y-4">
          {/* Primary Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template
              </label>
              <select
                value={filter.template}
                onChange={(e) => setFilter({ ...filter, template: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">All Templates</option>
                <option value="default">Default</option>
                <option value="about">About</option>
                <option value="services">Services</option>
                <option value="contact">Contact</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hierarchy
              </label>
              <select
                value={filter.parent}
                onChange={(e) => setFilter({ ...filter, parent: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">All Pages</option>
                <option value="root">Root Pages Only</option>
                <option value="child">Child Pages Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Menu Visibility
              </label>
              <select
                value={filter.menu}
                onChange={(e) => setFilter({ ...filter, menu: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="">All Pages</option>
                <option value="visible">Visible in Menu</option>
                <option value="hidden">Hidden from Menu</option>
              </select>
            </div>
          </div>
          
          {/* Search and Sorting */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filter.search}
                  onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                  placeholder="Search by title, slug, or content..."
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm"
                />
                <svg
                  className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="created">Date Created</option>
                <option value="updated">Date Updated</option>
                <option value="title">Title</option>
                <option value="views">Views</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
          
          {/* Clear Button */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                setFilter({ status: "", template: "", search: "", parent: "", menu: "" });
                setSortBy("created");
                setSortOrder("desc");
                setCurrentPage(1);
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedPages.length > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {selectedPages.length} selected
              </div>
              <button
                onClick={() => setSelectedPages([])}
                className="text-sm text-blue-700 hover:text-blue-900 font-medium"
              >
                Clear
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="border border-blue-300 rounded-lg px-4 py-2 text-sm bg-white"
              >
                <option value="">Select Action...</option>
                <option value="publish">Publish</option>
                <option value="draft">Move to Draft</option>
                <option value="template-default">Set Template: Default</option>
                <option value="template-about">Set Template: About</option>
                <option value="template-services">Set Template: Services</option>
                <option value="template-contact">Set Template: Contact</option>
                <option value="delete">Delete</option>
              </select>
              
              <button
                onClick={handleBulkAction}
                disabled={!bulkAction}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pages Table */}
      {loading ? (
        <div className="text-center py-12">
          <Spinner size="md" />
        </div>
      ) : pages.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg">No pages found</p>
          <Link
            to="/admin/pages/create"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700"
          >
            Create your first page
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-3 md:px-6 py-4 text-left text-xs font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedPages.length === pages.length && pages.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="px-3 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Page Title
                    </div>
                  </th>
                  <th className="px-3 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Template
                    </div>
                  </th>
                  <th className="px-3 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Status
                    </div>
                  </th>
                  <th className="px-3 md:px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Menu
                  </th>
                  <th className="px-3 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Date
                    </div>
                  </th>
                  <th className="px-3 md:px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pages.map((page) => (
                  <tr
                    key={page.id}
                    className={`hover:bg-blue-50/30 transition-colors ${
                      selectedPages.includes(page.id) ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <td className="px-3 md:px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPages.includes(page.id)}
                        onChange={() => toggleSelectPage(page.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-3 md:px-6 py-4">
                      <div className="flex items-start gap-2">
                        {page.parent_id && (
                          <div className="flex-shrink-0 text-gray-400 mt-0.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        )}
                        <div className={page.parent_id ? 'ml-4' : ''}>
                          <div className="text-sm font-semibold text-gray-900 mb-1">
                            {page.title}
                            {page.is_homepage && (
                              <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                                Homepage
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            /{page.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap">
                      {getTemplateBadge(page.template)}
                    </td>
                    <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap">
                      {getStatusBadge(page.status)}
                    </td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-center whitespace-nowrap">
                      {page.show_in_menu ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(page.createdAt || page.created_at)}
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Preview */}
                        <a
                          href={page.slug ? `/pages/${page.slug}` : `#`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (!page.slug) {
                              e.preventDefault();
                              alert('This page does not have a slug yet');
                            }
                          }}
                          className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                          title="Preview"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </a>
                        
                        {/* Quick Publish/Unpublish */}
                        <button
                          onClick={() => handleQuickPublish(page.id, page.status)}
                          className={`inline-flex items-center justify-center p-2 rounded-lg transition ${
                            page.status === 'published'
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          }`}
                          title={page.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          {page.status === 'published' ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          )}
                        </button>

                        {/* Duplicate */}
                        <button
                          onClick={() => handleDuplicate(page)}
                          className="inline-flex items-center justify-center p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition"
                          title="Duplicate"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        
                        {/* Edit */}
                        <Link
                          to={`/admin/pages/edit/${page.id}`}
                          className="inline-flex items-center justify-center p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="inline-flex items-center justify-center p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Page Counter and Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * 10 + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(currentPage * 10, totalCount)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{totalCount}</span> pages
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}
