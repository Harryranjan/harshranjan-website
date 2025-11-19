import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiDownload,
  FiEye,
  FiUsers,
  FiFileText,
  FiFilter,
} from "react-icons/fi";
import api from "../../utils/api";
import Button from "../../components/ui/Button";
import {
  DataTable,
  FilterBar,
  StatsCards,
  StatusBadge,
} from "../../components/ui";
import Toast from "../../components/Toast";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function DownloadList() {
  const navigate = useNavigate();
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  // Filters
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
    page: 1,
    limit: 10,
  });

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    loadDownloads();
    loadStats();
  }, [filters]);

  const loadDownloads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const { data } = await api.get(`/downloads?${params}`);
      setDownloads(data.downloads);
      setPagination({
        total: data.total,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Error loading downloads:", error);
      setToast({ type: "error", message: "Failed to load downloads" });
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const { data } = await api.get("/downloads/stats");
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/downloads/${id}`);
      setToast({ type: "success", message: "Download deleted successfully" });
      loadDownloads();
      loadStats();
      setConfirmDialog(null);
    } catch (error) {
      console.error("Error deleting download:", error);
      setToast({ type: "error", message: "Failed to delete download" });
    }
  };

  const confirmDelete = (download) => {
    setConfirmDialog({
      title: "Delete Download",
      message: `Are you sure you want to delete "${download.title}"? This will also delete all associated leads.`,
      onConfirm: () => handleDelete(download.id),
      onCancel: () => setConfirmDialog(null),
    });
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const columns = [
    {
      key: "thumbnail",
      label: "Thumbnail",
      render: (download) => (
        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
          {download.thumbnail ? (
            <img
              src={download.thumbnail}
              alt={download.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FiFileText className="text-gray-400 text-2xl" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "title",
      label: "Title",
      render: (download) => (
        <div>
          <p className="font-medium text-gray-900">{download.title}</p>
          <p className="text-xs text-gray-500">{download.category}</p>
        </div>
      ),
    },
    {
      key: "file_info",
      label: "File Info",
      render: (download) => (
        <div className="text-sm">
          <p className="text-gray-700">
            {download.file_type?.toUpperCase() || "N/A"}
          </p>
          <p className="text-gray-500">{download.file_size || "Unknown"}</p>
        </div>
      ),
    },
    {
      key: "download_count",
      label: "Downloads",
      render: (download) => (
        <div className="flex items-center gap-2">
          <FiDownload className="text-blue-600" />
          <span className="font-semibold text-gray-900">
            {download.download_count || 0}
          </span>
        </div>
      ),
    },
    {
      key: "leads_count",
      label: "Leads",
      render: (download) => (
        <div className="flex items-center gap-2">
          <FiUsers className="text-green-600" />
          <span className="font-semibold text-gray-900">
            {download.leads_count || 0}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (download) => <StatusBadge status={download.status} />,
    },
    {
      key: "actions",
      label: "Actions",
      render: (download) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<FiEye />}
            onClick={() => navigate(`/admin/downloads/${download.id}/leads`)}
            title="View Leads"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={<FiEdit />}
            onClick={() => navigate(`/admin/downloads/edit/${download.id}`)}
            title="Edit"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={<FiTrash2 />}
            onClick={() => confirmDelete(download)}
            className="text-red-600 hover:text-red-700"
            title="Delete"
          />
        </div>
      ),
    },
  ];

  const statsCards = stats
    ? [
        {
          title: "Total Downloads",
          value: stats.total_downloads,
          icon: FiFileText,
          color: "blue",
        },
        {
          title: "Published",
          value: stats.published,
          icon: FiEye,
          color: "green",
        },
        {
          title: "Total Leads",
          value: stats.total_leads,
          icon: FiUsers,
          color: "purple",
        },
        {
          title: "Categories",
          value: stats.categories,
          icon: FiFilter,
          color: "orange",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Downloads</h1>
            <p className="text-gray-600 mt-1">
              Manage e-books, guides, and digital downloads
            </p>
          </div>
          <Link to="/admin/downloads/new">
            <Button icon={<FiPlus />} variant="primary" size="lg">
              Add Download
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        {stats && <StatsCards cards={statsCards} />}

        {/* Filters */}
        <FilterBar
          searchValue={filters.search}
          onSearchChange={(value) => handleFilterChange("search", value)}
          filters={[
            {
              type: "select",
              label: "Status",
              value: filters.status,
              onChange: (value) => handleFilterChange("status", value),
              options: [
                { value: "", label: "All Status" },
                { value: "published", label: "Published" },
                { value: "draft", label: "Draft" },
                { value: "archived", label: "Archived" },
              ],
            },
            {
              type: "select",
              label: "Category",
              value: filters.category,
              onChange: (value) => handleFilterChange("category", value),
              options: [
                { value: "", label: "All Categories" },
                { value: "ebook", label: "E-books" },
                { value: "guide", label: "Guides" },
                { value: "template", label: "Templates" },
                { value: "checklist", label: "Checklists" },
                { value: "other", label: "Other" },
              ],
            },
          ]}
          onReset={() =>
            setFilters({
              search: "",
              status: "",
              category: "",
              page: 1,
              limit: 10,
            })
          }
        />

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={downloads}
          loading={loading}
          pagination={{
            currentPage: filters.page,
            totalPages: pagination.totalPages,
            onPageChange: handlePageChange,
          }}
          emptyMessage="No downloads found. Create your first download!"
        />
      </div>

      {/* Toast */}
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
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}
    </div>
  );
}
