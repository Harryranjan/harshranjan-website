import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { DataTable, FilterBar, StatsCards } from "../../components/ui";
import FormCreationModal from "../../components/FormCreationModal";
import EmbedCodeModal from "../../components/EmbedCodeModal";

export default function FormList() {
  const [forms, setForms] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    search: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  });
  const [activeTab, setActiveTab] = useState("forms");

  useEffect(() => {
    fetchForms();
    fetchStats();
  }, [filters, pagination.page]);

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

  const statsData = stats
    ? [
        {
          title: "Total Forms",
          value: stats.totalForms,
          icon: "📋",
          color: "blue",
        },
        {
          title: "Active Forms",
          value: stats.activeForms,
          icon: "✅",
          color: "green",
        },
        {
          title: "Total Submissions",
          value: stats.totalSubmissions,
          icon: "📨",
          color: "purple",
        },
        {
          title: "This Week",
          value: stats.recentSubmissions,
          icon: "📊",
          color: "indigo",
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

      {/* Statistics */}
      {stats && <StatsCards stats={statsData} />}

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
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-6xl mb-4">🪟</div>
          <h3 className="text-xl font-semibold mb-2">
            Modal Builder Coming Soon
          </h3>
          <p className="text-gray-600 mb-4">
            Create beautiful modal popups with custom triggers and targeting
            rules
          </p>
          <Link
            to="/admin/forms/modals/new"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            <span>+</span>
            Create Your First Modal
          </Link>
        </div>
      )}

      {/* Popups Tab */}
      {activeTab === "popups" && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2">
            Popup Builder Coming Soon
          </h3>
          <p className="text-gray-600 mb-4">
            Design eye-catching popups with advanced targeting and animations
          </p>
          <Link
            to="/admin/forms/popups/new"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            <span>+</span>
            Create Your First Popup
          </Link>
        </div>
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
