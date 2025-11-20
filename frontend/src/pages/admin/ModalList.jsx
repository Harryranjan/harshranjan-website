import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiCopy,
  FiCode,
  FiActivity,
} from "react-icons/fi";
import api from "../../utils/api";
import {
  PageHeader,
  BackButton,
  DataTable,
  FilterBar,
  StatsCards,
  StatusBadge,
  EmptyState,
  Button,
} from "../../components/ui";
import Toast from "../../components/Toast";
import ConfirmDialog from "../../components/ConfirmDialog";
import EmbedCodeModal from "../../components/EmbedCodeModal";

export default function ModalList() {
  const navigate = useNavigate();
  const [modals, setModals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    type: "",
    page: 1,
    limit: 20,
  });

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    totalViews: 0,
    totalConversions: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    loadModals();
  }, [filters]);

  const loadModals = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      console.log("📋 Fetching modals from API...");
      const { data } = await api.get(`/modals?${params}`);
      console.log("📋 API Response:", data);
      console.log("📋 Modals array:", data.modals);
      console.log("📋 Modals count:", data.modals?.length);
      
      setModals(data.modals);
      setPagination(data.pagination);

      // Calculate stats
      const total = data.pagination.total;
      const active = data.modals.filter((m) => m.status === "active").length;
      const totalViews = data.modals.reduce((sum, m) => sum + m.views, 0);
      const totalConversions = data.modals.reduce(
        (sum, m) => sum + m.conversions,
        0
      );
      const conversionRate =
        totalViews > 0 ? ((totalConversions / totalViews) * 100).toFixed(1) : 0;

      setStats({
        total,
        active,
        totalViews,
        totalConversions,
        conversionRate,
      });
    } catch (error) {
      console.error("Error loading modals:", error);
      setToast({
        type: "error",
        message: "Failed to load modals",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (modal) => {
    setConfirmDialog({
      title: "Delete Modal",
      message: `Are you sure you want to delete "${modal.name}"? This action cannot be undone.`,
      confirmText: "Delete",
      confirmVariant: "danger",
      onConfirm: async () => {
        try {
          await api.delete(`/modals/${modal.id}`);
          setToast({
            type: "success",
            message: "Modal deleted successfully",
          });
          loadModals();
        } catch (error) {
          setToast({
            type: "error",
            message: "Failed to delete modal",
          });
        }
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null),
    });
  };

  const handleStatusToggle = async (modal) => {
    try {
      const newStatus = modal.status === "active" ? "inactive" : "active";
      await api.put(`/modals/${modal.id}`, { ...modal, status: newStatus });
      setToast({
        type: "success",
        message: `Modal ${newStatus === "active" ? "activated" : "deactivated"}`,
      });
      loadModals();
    } catch (error) {
      setToast({
        type: "error",
        message: "Failed to update modal status",
      });
    }
  };

  const handleShowEmbed = (modal) => {
    setSelectedModal(modal);
    setShowEmbedModal(true);
  };

  const statsData = [
    {
      title: "Total Modals",
      value: stats.total,
      icon: "🎯",
      color: "blue",
    },
    {
      title: "Active",
      value: stats.active,
      icon: "✅",
      color: "green",
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: "👁️",
      color: "purple",
    },
    {
      title: "Conversions",
      value: `${stats.totalConversions} (${stats.conversionRate}%)`,
      icon: "🎉",
      color: "indigo",
    },
  ];

  const filterOptions = [
    {
      type: "search",
      placeholder: "Search modals...",
      value: filters.search,
      onChange: (value) => setFilters({ ...filters, search: value, page: 1 }),
    },
    {
      type: "select",
      label: "Status",
      value: filters.status,
      onChange: (value) => setFilters({ ...filters, status: value, page: 1 }),
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
      value: filters.type,
      onChange: (value) => setFilters({ ...filters, type: value, page: 1 }),
      options: [
        { label: "All Types", value: "" },
        { label: "Announcement", value: "announcement" },
        { label: "Offer", value: "offer" },
        { label: "Newsletter", value: "newsletter" },
        { label: "Custom", value: "custom" },
      ],
    },
  ];

  const columns = [
    {
      key: "name",
      label: "Modal Name",
      render: (modal) => (
        <div>
          <Link
            to={`/admin/forms/modals/${modal.id}/edit`}
            className="font-medium text-blue-600 hover:text-blue-800"
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
      render: (modal) => <StatusBadge status={modal.status} />,
    },
    {
      key: "performance",
      label: "Performance",
      render: (modal) => (
        <div className="text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <FiEye className="w-4 h-4" />
            <span>{modal.views.toLocaleString()} views</span>
          </div>
          <div className="flex items-center gap-2 text-green-600 mt-1">
            <FiActivity className="w-4 h-4" />
            <span>
              {modal.conversions} conversions (
              {modal.views > 0
                ? ((modal.conversions / modal.views) * 100).toFixed(1)
                : 0}
              %)
            </span>
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
  ];

  const actions = [
    {
      label: "Edit",
      icon: FiEdit,
      onClick: (modal) => navigate(`/admin/forms/modals/${modal.id}/edit`),
      variant: "primary",
    },
    {
      label: (modal) => (modal.status === "active" ? "Deactivate" : "Activate"),
      icon: FiActivity,
      onClick: handleStatusToggle,
      variant: "outline",
    },
    {
      label: "Embed Code",
      icon: FiCode,
      onClick: handleShowEmbed,
      variant: "outline",
    },
    {
      label: "Delete",
      icon: FiTrash2,
      onClick: handleDelete,
      variant: "danger",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Modals"
        description="Create and manage modals for announcements, offers, and lead generation"
        backButton={<BackButton to="/admin/forms" label="Back to Forms" />}
        actions={
          <Button
            variant="primary"
            onClick={() => navigate("/admin/forms/modals/new")}
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Create Modal
          </Button>
        }
      />

      {/* Stats */}
      {stats.total > 0 && <StatsCards stats={statsData} />}

      {/* Filters */}
      <FilterBar
        filters={filterOptions}
        onReset={() =>
          setFilters({
            search: "",
            status: "",
            type: "",
            page: 1,
            limit: 20,
          })
        }
      />

      {/* Modals Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : modals.length === 0 ? (
        <EmptyState
          icon="inbox"
          title="No modals found"
          message={
            filters.search || filters.status || filters.type
              ? "Try adjusting your filters"
              : "Create your first modal to engage visitors and capture leads"
          }
          actionText="Create Modal"
          onAction={() => navigate("/admin/forms/modals/new")}
        />
      ) : (
        <DataTable
          columns={columns}
          data={modals}
          actions={actions}
          pagination={{
            currentPage: pagination.page,
            totalPages: pagination.pages,
            onPageChange: (page) => setFilters({ ...filters, page }),
          }}
        />
      )}

      {/* Toast Notifications */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Confirm Dialog */}
      {confirmDialog && (
        <ConfirmDialog
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          confirmVariant={confirmDialog.confirmVariant}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}

      {/* Embed Code Modal */}
      {showEmbedModal && selectedModal && (
        <EmbedCodeModal
          isOpen={showEmbedModal}
          onClose={() => {
            setShowEmbedModal(false);
            setSelectedModal(null);
          }}
          type="modal"
          id={selectedModal.id}
          name={selectedModal.name}
        />
      )}
    </div>
  );
}
