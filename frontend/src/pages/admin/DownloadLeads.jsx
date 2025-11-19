import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiDownload,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCalendar,
  FiCheck,
  FiExternalLink,
} from "react-icons/fi";
import api from "../../utils/api";
import Button from "../../components/ui/Button";
import { DataTable, FilterBar } from "../../components/ui";
import Toast from "../../components/Toast";

export default function DownloadLeads() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [download, setDownload] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [stats, setStats] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 50,
  });

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    loadDownload();
    loadLeads();
    loadStats();
  }, [id, filters]);

  const loadDownload = async () => {
    try {
      const { data } = await api.get(`/downloads/${id}`);
      setDownload(data);
    } catch (error) {
      console.error("Error loading download:", error);
      setToast({ type: "error", message: "Failed to load download" });
    }
  };

  const loadLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("download_id", id);
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const { data } = await api.get(`/download-leads?${params}`);
      setLeads(data.leads);
      setPagination({
        total: data.total,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Error loading leads:", error);
      setToast({ type: "error", message: "Failed to load leads" });
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const { data } = await api.get(`/download-leads/stats?download_id=${id}`);
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get(
        `/download-leads/export?download_id=${id}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `leads-${download?.slug || id}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setToast({ type: "success", message: "Leads exported successfully" });
    } catch (error) {
      console.error("Error exporting leads:", error);
      setToast({ type: "error", message: "Failed to export leads" });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
      key: "name",
      label: "Name",
      render: (lead) => (
        <div>
          <p className="font-medium text-gray-900">{lead.name}</p>
          {lead.company && (
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <FiBriefcase size={12} />
              {lead.company}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (lead) => (
        <a
          href={`mailto:${lead.email}`}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <FiMail size={14} />
          {lead.email}
        </a>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (lead) =>
        lead.phone ? (
          <a
            href={`tel:${lead.phone}`}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <FiPhone size={14} />
            {lead.phone}
          </a>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      key: "date",
      label: "Date",
      render: (lead) => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiCalendar size={14} />
          {formatDate(lead.created_at)}
        </div>
      ),
    },
    {
      key: "downloaded",
      label: "Downloaded",
      render: (lead) =>
        lead.downloaded ? (
          <span className="flex items-center gap-1 text-green-600">
            <FiCheck size={16} />
            Yes
          </span>
        ) : (
          <span className="text-gray-400">No</span>
        ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            icon={<FiArrowLeft />}
            onClick={() => navigate("/admin/downloads")}
            className="mb-4"
          />

          {download && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  {download.thumbnail && (
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={download.thumbnail}
                        alt={download.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {download.title}
                    </h1>
                    <p className="text-gray-600 mt-1">
                      {download.short_description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1 text-gray-600">
                        <FiDownload />
                        {download.download_count} downloads
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{download.category}</span>
                      <span className="text-gray-400">•</span>
                      <a
                        href={download.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                      >
                        View File <FiExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
                <Link to={`/admin/downloads/edit/${download.id}`}>
                  <Button variant="secondary" size="sm">
                    Edit Download
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-1">Total Leads</div>
              <div className="text-3xl font-bold text-gray-900">
                {stats.total_leads}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-1">Downloaded</div>
              <div className="text-3xl font-bold text-green-600">
                {stats.total_downloaded}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-1">Conversion Rate</div>
              <div className="text-3xl font-bold text-blue-600">
                {stats.conversion_rate}%
              </div>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Leads ({pagination.total})
          </h2>
          <Button
            variant="secondary"
            icon={<FiDownload />}
            onClick={handleExport}
          >
            Export to CSV
          </Button>
        </div>

        {/* Filters */}
        <FilterBar
          searchValue={filters.search}
          onSearchChange={(value) => handleFilterChange("search", value)}
          searchPlaceholder="Search by name, email, or company..."
          onReset={() =>
            setFilters({
              search: "",
              page: 1,
              limit: 50,
            })
          }
        />

        {/* Leads Table */}
        <DataTable
          columns={columns}
          data={leads}
          loading={loading}
          pagination={{
            currentPage: filters.page,
            totalPages: pagination.totalPages,
            onPageChange: handlePageChange,
          }}
          emptyMessage="No leads yet for this download."
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
    </div>
  );
}
