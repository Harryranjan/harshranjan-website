import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiEdit,
  FiEye,
  FiTrash2,
  FiCode,
  FiActivity,
  FiCopy,
} from "react-icons/fi";
import api from "../../utils/api";
import { DataTable, FilterBar, StatsCards } from "../../components/ui";
import FormCreationModal from "../../components/FormCreationModal";
import EmbedCodeModal from "../../components/EmbedCodeModal";

export default function FormList() {
  const [forms, setForms] = useState([]);
  const [modals, setModals] = useState([]);
  const [popups, setPopups] = useState([]);
  const [stats, setStats] = useState(null);
  const [modalStats, setModalStats] = useState(null);
  const [popupStats, setPopupStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalsLoading, setModalsLoading] = useState(false);
  const [popupsLoading, setPopupsLoading] = useState(false);
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    search: "",
  });
  const [modalFilters, setModalFilters] = useState({
    status: "",
    type: "",
    search: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  });
  const [modalPagination, setModalPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  });
  const [popupFilters, setPopupFilters] = useState({
    status: "",
    type: "",
    search: "",
  });
  const [popupPagination, setPopupPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  });
  const [activeTab, setActiveTab] = useState("forms");

  useEffect(() => {
    if (activeTab === "forms") {
      fetchForms();
      fetchStats();
    } else if (activeTab === "modals") {
      fetchModals();
      fetchModalStats();
    } else if (activeTab === "popups") {
      fetchPopups();
      fetchPopupStats();
    }
  }, [activeTab, filters, pagination.page, modalFilters, modalPagination.page, popupFilters, popupPagination.page]);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      });

      const response = await api.get(`/forms?${params}`);
      setForms(response.data.forms);
      setPagination((prev) => ({ ...prev, ...response.data.pagination }));
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get("/forms/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchModals = async () => {
    try {
      setModalsLoading(true);
      console.log("📋 Fetching modals...");
      const params = new URLSearchParams({
        ...modalFilters,
        page: modalPagination.page,
        limit: modalPagination.limit,
      });

      const response = await api.get(`/modals?${params}`);
      console.log("📋 Modals response:", response.data);
      setModals(response.data.modals);
      setModalPagination((prev) => ({ ...prev, ...response.data.pagination }));
    } catch (error) {
      console.error("❌ Error fetching modals:", error);
    } finally {
      setModalsLoading(false);
    }
  };

  const fetchModalStats = async () => {
    try {
      const response = await api.get("/modals");
      const data = response.data;
      
      const total = data.pagination.total;
      const active = data.modals.filter((m) => m.status === "active").length;
      const totalViews = data.modals.reduce((sum, m) => sum + (m.views || 0), 0);
      const totalConversions = data.modals.reduce((sum, m) => sum + (m.conversions || 0), 0);
      
      setModalStats({
        total,
        active,
        totalViews,
        totalConversions,
      });
    } catch (error) {
      console.error("❌ Error fetching modal stats:", error);
    }
  };

  const fetchPopups = async () => {
    try {
      setPopupsLoading(true);
      console.log("💬 Fetching popups...");
      const params = new URLSearchParams({
        ...popupFilters,
        page: popupPagination.page,
        limit: popupPagination.limit,
      });

      const response = await api.get(`/popups?${params}`);
      console.log("💬 Popups response:", response.data);
      setPopups(response.data.popups || []);
      setPopupPagination((prev) => ({ 
        ...prev, 
        total: response.data.pagination?.total || 0,
        pages: response.data.pagination?.pages || 1,
      }));
    } catch (error) {
      console.error("❌ Error fetching popups:", error);
      console.error("❌ Error details:", error.response?.data);
    } finally {
      setPopupsLoading(false);
    }
  };

  const fetchPopupStats = async () => {
    try {
      console.log("💬 Fetching popup stats...");
      const response = await api.get("/popups/stats");
      console.log("💬 Popup stats response:", response.data);
      setPopupStats(response.data);
    } catch (error) {
      console.error("❌ Error fetching popup stats:", error);
      console.error("❌ Error details:", error.response?.data);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this form?")) return;

    try {
      await api.delete(`/forms/${id}`);
      fetchForms();
      fetchStats();
    } catch (error) {
      console.error("Error deleting form:", error);
      alert("Failed to delete form");
    }
  };

  const handleDuplicate = async (id) => {
    try {
      await api.post(`/forms/${id}/duplicate`);
      fetchForms();
      fetchStats();
    } catch (error) {
      console.error("Error duplicating form:", error);
      alert("Failed to duplicate form");
    }
  };

  const handleDeleteModal = async (id) => {
    if (!confirm("Are you sure you want to delete this modal?")) return;

    try {
      await api.delete(`/modals/${id}`);
      fetchModals();
      fetchModalStats();
    } catch (error) {
      console.error("Error deleting modal:", error);
      alert("Failed to delete modal");
    }
  };

  const handleDuplicateModal = async (id) => {
    try {
      const modal = modals.find((m) => m.id === id);
      if (!modal) return;

      const duplicatedModal = {
        ...modal,
        name: `${modal.name} (Copy)`,
        status: "draft",
      };
      delete duplicatedModal.id;
      delete duplicatedModal.created_at;
      delete duplicatedModal.updated_at;

      await api.post("/modals", duplicatedModal);
      fetchModals();
      fetchModalStats();
    } catch (error) {
      console.error("Error duplicating modal:", error);
      alert("Failed to duplicate modal");
    }
  };

  const handleDeletePopup = async (id) => {
    if (!confirm("Are you sure you want to delete this popup?")) return;

    try {
      await api.delete(`/popups/${id}`);
      fetchPopups();
      fetchPopupStats();
    } catch (error) {
      console.error("Error deleting popup:", error);
      alert("Failed to delete popup");
    }
  };

  const handleDuplicatePopup = async (id) => {
    try {
      const popup = popups.find((p) => p.id === id);
      if (!popup) return;

      const duplicatedPopup = {
        ...popup,
        name: `${popup.name} (Copy)`,
        status: "draft",
      };
      delete duplicatedPopup.id;
      delete duplicatedPopup.created_at;
      delete duplicatedPopup.updated_at;

      await api.post("/popups", duplicatedPopup);
      fetchPopups();
      fetchPopupStats();
    } catch (error) {
      console.error("Error duplicating popup:", error);
      alert("Failed to duplicate popup");
    }
  };

  const statsData = stats
    ? [
        {
          label: "Total Forms",
          value: stats.totalForms,
          customIcon: <span className="text-2xl">📋</span>,
          color: "blue",
          subtext: "All forms created",
        },
        {
          label: "Active Forms",
          value: stats.activeForms,
          customIcon: <span className="text-2xl">✅</span>,
          color: "green",
          subtext: "Currently published",
        },
        {
          label: "Total Submissions",
          value: stats.totalSubmissions.toLocaleString(),
          customIcon: <span className="text-2xl">📨</span>,
          color: "purple",
          subtext: "All-time submissions",
        },
        {
          label: "Recent Submissions",
          value: stats.recentSubmissions,
          customIcon: <span className="text-2xl">📊</span>,
          color: "indigo",
          subtext: "This week",
        },
      ]
    : [];

  const columns = [
    {
      key: "name",
      label: "Form Name",
      render: (form) => (
        <div>
          <Link
            to={`/admin/forms/${form.id}/edit`}
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            {form.name}
          </Link>
          {form.description && (
            <p className="text-sm text-gray-500 mt-1">{form.description}</p>
          )}
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (form) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            form.type === "contact"
              ? "bg-blue-100 text-blue-800"
              : form.type === "newsletter"
              ? "bg-purple-100 text-purple-800"
              : form.type === "lead"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {form.type}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (form) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            form.status === "active"
              ? "bg-green-100 text-green-800"
              : form.status === "inactive"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {form.status}
        </span>
      ),
    },
    {
      key: "submission_count",
      label: "Submissions",
      render: (form) => (
        <div className="text-center">
          <div className="text-lg font-semibold">{form.submission_count}</div>
          {form.last_submission_at && (
            <div className="text-xs text-gray-500">
              Last: {new Date(form.last_submission_at).toLocaleDateString()}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "updated_at",
      label: "Last Updated",
      render: (form) => (
        <span className="text-sm text-gray-500">
          {new Date(form.updated_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (form) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedForm(form);
              setShowEmbedModal(true);
            }}
            className="text-purple-600 hover:text-purple-800"
            title="Get Embed Code"
          >
            🔗
          </button>
          <Link
            to={`/admin/forms/${form.id}/submissions`}
            className="text-blue-600 hover:text-blue-800"
            title="View Submissions"
          >
            📨
          </Link>
          <Link
            to={`/admin/forms/${form.id}/edit`}
            className="text-indigo-600 hover:text-indigo-800"
            title="Edit"
          >
            ✏️
          </Link>
          <button
            onClick={() => handleDuplicate(form.id)}
            className="text-green-600 hover:text-green-800"
            title="Duplicate"
          >
            📑
          </button>
          <button
            onClick={() => handleDelete(form.id)}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      ),
    },
  ];

  const filterOptions = {
    status: [
      { value: "", label: "All Status" },
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "draft", label: "Draft" },
    ],
    type: [
      { value: "", label: "All Types" },
      { value: "contact", label: "Contact" },
      { value: "newsletter", label: "Newsletter" },
      { value: "lead", label: "Lead Generation" },
      { value: "custom", label: "Custom" },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Forms, Modals & Popups
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your forms, modal windows, and popup notifications
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCreationModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-2"
          >
            <span>📋</span>
            New Form
          </button>
          <Link
            to="/admin/forms/modals/new"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition inline-flex items-center gap-2"
          >
            <span>🪟</span>
            New Modal
          </Link>
          <Link
            to="/admin/forms/popups/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition inline-flex items-center gap-2"
          >
            <span>💬</span>
            New Popup
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("forms")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "forms"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            📋 Forms
          </button>
          <button
            onClick={() => setActiveTab("modals")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "modals"
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            🪟 Modals
          </button>
          <button
            onClick={() => setActiveTab("popups")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "popups"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            💬 Popups
          </button>
        </nav>
      </div>

      {/* Forms Tab Content */}
      {activeTab === "forms" && (
        <>
          {/* Statistics */}
          {stats && <StatsCards stats={statsData} columns={4} />}

          {/* Filters */}
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            filterOptions={filterOptions}
            searchPlaceholder="Search forms..."
          />

          {/* Forms Table */}
          <div className="bg-white rounded-lg shadow">
            <DataTable
              columns={columns}
              data={forms}
              loading={loading}
              emptyMessage="No forms found. Create your first form to get started!"
            />

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="px-6 py-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(pagination.page - 1) * pagination.limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        pagination.page * pagination.limit,
                        pagination.total
                      )}
                    </span>{" "}
                    of <span className="font-medium">{pagination.total}</span>{" "}
                    results
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setPagination((prev) => ({
                          ...prev,
                          page: prev.page - 1,
                        }))
                      }
                      disabled={pagination.page === 1}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setPagination((prev) => ({
                          ...prev,
                          page: prev.page + 1,
                        }))
                      }
                      disabled={pagination.page === pagination.pages}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modals Tab */}
      {activeTab === "modals" && (
        <>
          {/* Modal Stats */}
          {modalStats && (
            <StatsCards
              stats={[
                {
                  label: "Total Modals",
                  value: modalStats.total,
                  customIcon: <span className="text-2xl">🪟</span>,
                  color: "purple",
                  subtext: "All modals created",
                },
                {
                  label: "Active Modals",
                  value: modalStats.active,
                  customIcon: <span className="text-2xl">✅</span>,
                  color: "green",
                  subtext: "Currently published",
                },
                {
                  label: "Total Views",
                  value: modalStats.totalViews.toLocaleString(),
                  customIcon: <span className="text-2xl">👁️</span>,
                  color: "blue",
                  subtext: "Modal impressions",
                },
                {
                  label: "Conversions",
                  value: modalStats.totalConversions.toLocaleString(),
                  customIcon: <span className="text-2xl">🎯</span>,
                  color: "indigo",
                  subtext: `${modalStats.totalViews > 0 ? ((modalStats.totalConversions / modalStats.totalViews) * 100).toFixed(1) : 0}% conversion rate`,
                },
              ]}
              columns={4}
            />
          )}

          {/* Filter Bar */}
          <FilterBar
            filters={[
              {
                type: "search",
                placeholder: "Search modals...",
                value: modalFilters.search,
                onChange: (value) =>
                  setModalFilters({ ...modalFilters, search: value }),
              },
              {
                type: "select",
                label: "Status",
                value: modalFilters.status,
                onChange: (value) =>
                  setModalFilters({ ...modalFilters, status: value }),
                options: [
                  { label: "All Statuses", value: "" },
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                  { label: "Draft", value: "draft" },
                ],
              },
              {
                type: "select",
                label: "Type",
                value: modalFilters.type,
                onChange: (value) =>
                  setModalFilters({ ...modalFilters, type: value }),
                options: [
                  { label: "All Types", value: "" },
                  { label: "Announcement", value: "announcement" },
                  { label: "Offer", value: "offer" },
                  { label: "Newsletter", value: "newsletter" },
                  { label: "Custom", value: "custom" },
                ],
              },
            ]}
            onReset={() =>
              setModalFilters({ status: "", type: "", search: "" })
            }
          />

          {/* Modals Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {modalsLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : modals.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🪟</div>
                <h3 className="text-xl font-semibold mb-2">No modals found</h3>
                <p className="text-gray-600 mb-4">
                  {modalFilters.search || modalFilters.status || modalFilters.type
                    ? "Try adjusting your filters"
                    : "Create your first modal to engage visitors"}
                </p>
                <Link
                  to="/admin/forms/modals/new"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
                >
                  + Create Modal
                </Link>
              </div>
            ) : (
              <DataTable
                columns={[
                  {
                    key: "name",
                    label: "Modal Name",
                    render: (modal) => (
                      <div>
                        <Link
                          to={`/admin/forms/modals/${modal.id}/edit`}
                          className="font-medium text-purple-600 hover:text-purple-800"
                        >
                          {modal.name}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                          {modal.trigger_type === "manual" && "Manual Trigger"}
                          {modal.trigger_type === "time" &&
                            `${modal.trigger_value}s delay`}
                          {modal.trigger_type === "scroll" &&
                            `${modal.trigger_value}% scroll`}
                          {modal.trigger_type === "exit" && "Exit Intent"}
                          {modal.trigger_type === "click" && "On Click"}
                        </p>
                      </div>
                    ),
                  },
                  {
                    key: "type",
                    label: "Type",
                    render: (modal) => (
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          modal.type === "announcement"
                            ? "bg-blue-100 text-blue-800"
                            : modal.type === "offer"
                            ? "bg-green-100 text-green-800"
                            : modal.type === "newsletter"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {modal.type}
                      </span>
                    ),
                  },
                  {
                    key: "status",
                    label: "Status",
                    render: (modal) => (
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          modal.status === "active"
                            ? "bg-green-100 text-green-800"
                            : modal.status === "inactive"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {modal.status}
                      </span>
                    ),
                  },
                  {
                    key: "performance",
                    label: "Performance",
                    render: (modal) => (
                      <div className="text-sm">
                        <div className="text-gray-600">
                          👁️ {(modal.views || 0).toLocaleString()} views
                        </div>
                        <div className="text-green-600 mt-1">
                          🎯 {modal.conversions || 0} conversions
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "updated_at",
                    label: "Last Updated",
                    render: (modal) => (
                      <span className="text-sm text-gray-500">
                        {new Date(modal.updated_at).toLocaleDateString()}
                      </span>
                    ),
                  },
                ]}
                data={modals}
                actions={[
                  {
                    label: "Edit",
                    icon: <FiEdit className="w-4 h-4" />,
                    onClick: (modal) =>
                      (window.location.href = `/admin/forms/modals/${modal.id}/edit`),
                    variant: "primary",
                  },
                  {
                    label: "Embed",
                    icon: <FiCode className="w-4 h-4" />,
                    onClick: (modal) => {
                      setSelectedForm(modal);
                      setShowEmbedModal(true);
                    },
                    variant: "default",
                  },
                  {
                    label: "Duplicate",
                    icon: <FiCopy className="w-4 h-4" />,
                    onClick: (modal) => handleDuplicateModal(modal.id),
                    variant: "default",
                  },
                  {
                    label: "Delete",
                    icon: <FiTrash2 className="w-4 h-4" />,
                    onClick: (modal) => handleDeleteModal(modal.id),
                    variant: "danger",
                  },
                ]}
                pagination={{
                  currentPage: modalPagination.page,
                  totalPages: Math.ceil(
                    modalPagination.total / modalPagination.limit
                  ),
                  onPageChange: (page) =>
                    setModalPagination({ ...modalPagination, page }),
                }}
              />
            )}
          </div>
        </>
      )}

      {/* Popups Tab */}
      {activeTab === "popups" && (
        <>
          {/* Popup Stats */}
          {popupStats && (
            <StatsCards
              stats={[
                {
                  label: "Total Popups",
                  value: popupStats.totalPopups || 0,
                  customIcon: <span className="text-2xl">💬</span>,
                  color: "indigo",
                  subtext: "All popups created",
                },
                {
                  label: "Active Popups",
                  value: popupStats.activePopups || 0,
                  customIcon: <span className="text-2xl">✅</span>,
                  color: "green",
                  subtext: "Currently published",
                },
                {
                  label: "Total Views",
                  value: (popupStats.totalViews || 0).toLocaleString(),
                  customIcon: <span className="text-2xl">👁️</span>,
                  color: "blue",
                  subtext: "Popup impressions",
                },
                {
                  label: "Click Rate",
                  value: popupStats.clickRate || "0%",
                  customIcon: <span className="text-2xl">📊</span>,
                  color: "purple",
                  subtext: `${popupStats.totalClicks || 0} total clicks`,
                },
              ]}
              columns={4}
            />
          )}

          {/* Filter Bar */}
          <FilterBar
            filters={popupFilters}
            onFilterChange={setPopupFilters}
            filterOptions={[
              {
                key: "status",
                label: "Status",
                options: [
                  { value: "", label: "All Status" },
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                  { value: "draft", label: "Draft" },
                ],
              },
              {
                key: "type",
                label: "Type",
                options: [
                  { value: "", label: "All Types" },
                  { value: "notification", label: "Notification" },
                  { value: "chat", label: "Chat Widget" },
                  { value: "cookie_consent", label: "Cookie Consent" },
                  { value: "promo", label: "Promotional" },
                  { value: "social_proof", label: "Social Proof" },
                  { value: "newsletter", label: "Newsletter" },
                  { value: "custom", label: "Custom" },
                ],
              },
            ]}
            searchPlaceholder="Search popups..."
          />

          {/* Popups Table */}
          <div className="bg-white rounded-lg shadow">
            {popupsLoading ? (
              <div className="p-8 text-center">
                <div className="text-gray-500">Loading popups...</div>
              </div>
            ) : popups.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold mb-2">No Popups Yet</h3>
                <p className="text-gray-600 mb-4">
                  Create your first popup with pre-built templates
                </p>
                <Link
                  to="/admin/forms/popups/new"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  <span>+</span>
                  Create Your First Popup
                </Link>
              </div>
            ) : (
              <DataTable
                columns={[
                  {
                    key: "name",
                    label: "Popup Name",
                    render: (popup) => (
                      <div>
                        <div className="flex items-center gap-2">
                          {popup.icon && <span>{popup.icon}</span>}
                          <Link
                            to={`/admin/forms/popups/${popup.id}/edit`}
                            className="font-medium text-indigo-600 hover:text-indigo-800"
                          >
                            {popup.name}
                          </Link>
                        </div>
                        {popup.title && (
                          <p className="text-sm text-gray-500 mt-1">
                            {popup.title}
                          </p>
                        )}
                      </div>
                    ),
                  },
                  {
                    key: "type",
                    label: "Type",
                    render: (popup) => (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 capitalize">
                        {(popup.type || "notification").replace("_", " ")}
                      </span>
                    ),
                  },
                  {
                    key: "position",
                    label: "Position",
                    render: (popup) => {
                      const styling = typeof popup.styling === "string"
                        ? JSON.parse(popup.styling)
                        : popup.styling || {};
                      return (
                        <span className="text-sm text-gray-600 capitalize">
                          {styling.position || "bottom-right"}
                        </span>
                      );
                    },
                  },
                  {
                    key: "status",
                    label: "Status",
                    render: (popup) => (
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          popup.status === "active"
                            ? "bg-green-100 text-green-800"
                            : popup.status === "inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {popup.status}
                      </span>
                    ),
                  },
                  {
                    key: "stats",
                    label: "Performance",
                    render: (popup) => (
                      <div className="text-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600">
                            👁️ {(popup.views || 0).toLocaleString()}
                          </span>
                          <span className="text-gray-600">
                            🖱️ {(popup.clicks || 0).toLocaleString()}
                          </span>
                          <span className="text-gray-600">
                            ✕ {(popup.dismissals || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "updated_at",
                    label: "Last Updated",
                    render: (popup) => (
                      <span className="text-sm text-gray-500">
                        {new Date(popup.updated_at).toLocaleDateString()}
                      </span>
                    ),
                  },
                ]}
                data={popups}
                actions={[
                  {
                    label: "Edit",
                    icon: <FiEdit className="w-4 h-4" />,
                    onClick: (popup) =>
                      (window.location.href = `/admin/forms/popups/${popup.id}/edit`),
                    variant: "primary",
                  },
                  {
                    label: "Preview",
                    icon: <FiEye className="w-4 h-4" />,
                    onClick: (popup) => {
                      window.open(`/?popup_preview=${popup.id}`, "_blank");
                    },
                    variant: "default",
                  },
                  {
                    label: "Duplicate",
                    icon: <FiCopy className="w-4 h-4" />,
                    onClick: (popup) => handleDuplicatePopup(popup.id),
                    variant: "default",
                  },
                  {
                    label: "Delete",
                    icon: <FiTrash2 className="w-4 h-4" />,
                    onClick: (popup) => handleDeletePopup(popup.id),
                    variant: "danger",
                  },
                ]}
                pagination={{
                  currentPage: popupPagination.page,
                  totalPages: Math.ceil(
                    popupPagination.total / popupPagination.limit
                  ),
                  onPageChange: (page) =>
                    setPopupPagination({ ...popupPagination, page }),
                }}
              />
            )}
          </div>
        </>
      )}

      {/* Form Creation Modal */}
      <FormCreationModal
        isOpen={showCreationModal}
        onClose={() => setShowCreationModal(false)}
      />

      {/* Embed Code Modal */}
      {selectedForm && (
        <EmbedCodeModal
          isOpen={showEmbedModal}
          onClose={() => {
            setShowEmbedModal(false);
            setSelectedForm(null);
          }}
          type="form"
          id={selectedForm.id}
          name={selectedForm.name}
        />
      )}
    </div>
  );
}
