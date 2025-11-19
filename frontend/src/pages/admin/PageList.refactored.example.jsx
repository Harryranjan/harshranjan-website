// EXAMPLE: Refactored PageList.jsx using new reusable components
// This is a demonstration - not to replace the existing PageList.jsx

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import {
  FilterBar,
  BulkActionsBar,
  StatsCards,
  DataTable,
  Pagination,
  Spinner,
} from "../../components/ui";

export default function PageListRefactored() {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({
    status: "",
    template: "",
    search: "",
    parent: "",
    menu: "",
    sortBy: "created",
    sortOrder: "desc",
  });
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
  });
  const [selectedPages, setSelectedPages] = useState([]);
  const [bulkAction, setBulkAction] = useState("");

  useEffect(() => {
    fetchPages();
  }, [currentPage, filters]);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        ...(filters.status && { status: filters.status }),
        ...(filters.template && { template: filters.template }),
        ...(filters.search && { search: filters.search }),
      };
      const response = await api.get("/pages", { params });

      let fetchedPages = response.data.pages;

      // Apply client-side filters
      if (filters.parent === "root") {
        fetchedPages = fetchedPages.filter((p) => !p.parent_id);
      } else if (filters.parent === "child") {
        fetchedPages = fetchedPages.filter((p) => p.parent_id);
      }

      if (filters.menu === "visible") {
        fetchedPages = fetchedPages.filter((p) => p.show_in_menu);
      } else if (filters.menu === "hidden") {
        fetchedPages = fetchedPages.filter((p) => !p.show_in_menu);
      }

      // Apply client-side sorting
      fetchedPages.sort((a, b) => {
        let comparison = 0;

        switch (filters.sortBy) {
          case "title":
            comparison = a.title.localeCompare(b.title);
            break;
          case "views":
            comparison = (a.views || 0) - (b.views || 0);
            break;
          case "updated":
            comparison =
              new Date(a.updatedAt || a.updated_at) -
              new Date(b.updatedAt || b.updated_at);
            break;
          case "created":
          default:
            comparison =
              new Date(a.createdAt || a.created_at) -
              new Date(b.createdAt || b.created_at);
            break;
        }

        return filters.sortOrder === "asc" ? comparison : -comparison;
      });

      setPages(fetchedPages);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);

      const published = response.data.pages.filter(
        (p) => p.status === "published"
      ).length;
      const draft = response.data.pages.filter((p) => p.status === "draft").length;
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;

    try {
      await api.delete(`/pages/${id}`);
      fetchPages();
    } catch (error) {
      console.error("Failed to delete page:", error);
      alert("Failed to delete page");
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedPages.length === 0) return;

    const confirmMessage = `Are you sure you want to ${bulkAction} ${selectedPages.length} page(s)?`;
    if (bulkAction === "delete" && !window.confirm(confirmMessage)) return;

    try {
      if (bulkAction === "delete") {
        await Promise.all(
          selectedPages.map((id) => api.delete(`/pages/${id}`))
        );
      } else if (bulkAction === "publish" || bulkAction === "draft") {
        await Promise.all(
          selectedPages.map((id) =>
            api.put(`/pages/${id}`, { status: bulkAction === "publish" ? "published" : "draft" })
          )
        );
      } else if (bulkAction.startsWith("template-")) {
        const template = bulkAction.replace("template-", "");
        await Promise.all(
          selectedPages.map((id) => api.put(`/pages/${id}`, { template }))
        );
      }

      setSelectedPages([]);
      setBulkAction("");
      fetchPages();
    } catch (error) {
      console.error("Failed to perform bulk action:", error);
      alert("Failed to perform bulk action");
    }
  };

  // Filter Configuration
  const filterConfig = [
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "published", label: "Published" },
        { value: "draft", label: "Draft" },
      ],
      placeholder: "All Statuses",
    },
    {
      name: "template",
      label: "Template",
      type: "select",
      options: [
        { value: "default", label: "Default" },
        { value: "about", label: "About" },
        { value: "services", label: "Services" },
        { value: "contact", label: "Contact" },
        { value: "custom", label: "Custom" },
      ],
      placeholder: "All Templates",
    },
    {
      name: "parent",
      label: "Hierarchy",
      type: "select",
      options: [
        { value: "root", label: "Root Pages Only" },
        { value: "child", label: "Child Pages Only" },
      ],
      placeholder: "All Pages",
    },
    {
      name: "menu",
      label: "Menu Visibility",
      type: "select",
      options: [
        { value: "visible", label: "Visible in Menu" },
        { value: "hidden", label: "Hidden from Menu" },
      ],
      placeholder: "All Pages",
    },
    {
      name: "search",
      label: "Search",
      type: "search",
      placeholder: "Search by title, slug, or content...",
      span: 2,
      isSecondary: true,
    },
  ];

  const sortConfig = {
    defaultSort: "created",
    defaultOrder: "desc",
    options: [
      { value: "created", label: "Date Created" },
      { value: "updated", label: "Date Updated" },
      { value: "title", label: "Title" },
      { value: "views", label: "Views" },
    ],
  };

  // Stats Configuration
  const statsData = [
    {
      label: "Total Pages",
      value: stats.total,
      color: "blue",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      label: "Published",
      value: stats.published,
      color: "green",
      icon: "M5 13l4 4L19 7",
    },
    {
      label: "Drafts",
      value: stats.draft,
      color: "yellow",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  // Bulk Actions
  const bulkActions = [
    { value: "publish", label: "Publish" },
    { value: "draft", label: "Move to Draft" },
    { value: "template-default", label: "Set Template: Default" },
    { value: "template-about", label: "Set Template: About" },
    { value: "template-services", label: "Set Template: Services" },
    { value: "template-contact", label: "Set Template: Contact" },
    { value: "delete", label: "Delete" },
  ];

  // Table Columns
  const columns = [
    {
      key: "title",
      label: "Page",
      render: (page) => (
        <div>
          <Link
            to={`/admin/pages/${page.id}/edit`}
            className="text-blue-600 hover:text-blue-900 font-medium"
          >
            {page.title}
          </Link>
          <p className="text-xs text-gray-500">/{page.slug}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (page) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            page.status === "published"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {page.status}
        </span>
      ),
    },
    {
      key: "template",
      label: "Template",
      render: (page) => (
        <span className="text-sm text-gray-600 capitalize">{page.template}</span>
      ),
    },
    {
      key: "views",
      label: "Views",
      render: (page) => (
        <span className="text-sm text-gray-900">{page.views || 0}</span>
      ),
    },
  ];

  // Table Actions
  const tableActions = [
    {
      label: "View",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      ),
      onClick: (page) => window.open(`/pages/${page.slug}`, "_blank"),
      variant: "default",
      condition: (page) => page.slug,
    },
    {
      label: "Edit",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      onClick: (page) => navigate(`/admin/pages/${page.id}/edit`),
      variant: "primary",
    },
    {
      label: "Delete",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
      onClick: handleDelete,
      variant: "danger",
    },
  ];

  const handleSelectRow = (id) => {
    setSelectedPages((prev) =>
      prev.includes(id) ? prev.filter((pageId) => pageId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (ids) => {
    setSelectedPages(ids);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Pages - Admin Dashboard</title>
      </Helmet>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
        <div className="flex gap-3">
          <Link
            to="/admin/pages/ordering"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
            Reorder Menu
          </Link>
          <Link
            to="/admin/pages/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Page
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={statsData} columns={3} />

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        filterConfig={filterConfig}
        sortConfig={sortConfig}
        onClearFilters={() =>
          setFilters({
            status: "",
            template: "",
            search: "",
            parent: "",
            menu: "",
            sortBy: "created",
            sortOrder: "desc",
          })
        }
      />

      {/* Bulk Actions */}
      <BulkActionsBar
        selectedItems={selectedPages}
        onClearSelection={() => setSelectedPages([])}
        actions={bulkActions}
        selectedAction={bulkAction}
        onActionChange={setBulkAction}
        onApply={handleBulkAction}
        itemLabel="pages"
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={pages}
        selectable={true}
        selectedRows={selectedPages}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
        actions={tableActions}
        keyField="id"
        emptyMessage="No pages found. Create your first page to get started!"
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
        showCounter={true}
        itemLabel="pages"
      />
    </div>
  );
}
