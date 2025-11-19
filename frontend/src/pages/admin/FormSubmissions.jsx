import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../utils/api";
import { DataTable, FilterBar } from "../../components/ui";

export default function FormSubmissions() {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
  });

  useEffect(() => {
    fetchForm();
    fetchSubmissions();
  }, [formId, filters, pagination.page]);

  const fetchForm = async () => {
    try {
      const response = await api.get(`/forms/${formId}`);
      setForm(response.data);
    } catch (error) {
      console.error("Error fetching form:", error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      });

      const response = await api.get(`/forms/${formId}/submissions?${params}`);
      setSubmissions(response.data.submissions);
      setPagination((prev) => ({ ...prev, ...response.data.pagination }));
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams(filters);
      const response = await api.get(
        `/forms/${formId}/submissions/export?${params}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `form-${formId}-submissions-${Date.now()}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting submissions:", error);
      alert("Failed to export submissions");
    }
  };

  const handleStatusUpdate = async (submissionId, newStatus) => {
    try {
      await api.put(`/forms/submissions/${submissionId}`, {
        status: newStatus,
      });
      fetchSubmissions();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (submissionId) => {
    if (!confirm("Delete this submission?")) return;

    try {
      await api.delete(`/forms/submissions/${submissionId}`);
      fetchSubmissions();
    } catch (error) {
      console.error("Error deleting submission:", error);
      alert("Failed to delete submission");
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (submission) => (
        <span className="text-gray-600">#{submission.id}</span>
      ),
    },
    {
      key: "data",
      label: "Submission Data",
      render: (submission) => (
        <div className="space-y-1">
          {Object.entries(submission.data)
            .slice(0, 2)
            .map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="font-medium text-gray-700">{key}:</span>{" "}
                <span className="text-gray-600">
                  {String(value).substring(0, 50)}
                </span>
              </div>
            ))}
          {Object.keys(submission.data).length > 2 && (
            <button
              onClick={() => setSelectedSubmission(submission)}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              View all fields →
            </button>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (submission) => (
        <select
          value={submission.status}
          onChange={(e) => handleStatusUpdate(submission.id, e.target.value)}
          className={`px-3 py-1 text-xs font-medium rounded-full border-0 focus:ring-2 ${
            submission.status === "new"
              ? "bg-blue-100 text-blue-800"
              : submission.status === "read"
              ? "bg-green-100 text-green-800"
              : submission.status === "archived"
              ? "bg-gray-100 text-gray-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="archived">Archived</option>
          <option value="spam">Spam</option>
        </select>
      ),
    },
    {
      key: "created_at",
      label: "Submitted",
      render: (submission) => (
        <div className="text-sm">
          <div>{new Date(submission.created_at).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">
            {new Date(submission.created_at).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (submission) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedSubmission(submission)}
            className="text-blue-600 hover:text-blue-800"
            title="View Details"
          >
            👁️
          </button>
          <button
            onClick={() => handleDelete(submission.id)}
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
      { value: "new", label: "New" },
      { value: "read", label: "Read" },
      { value: "archived", label: "Archived" },
      { value: "spam", label: "Spam" },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/admin/forms"
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2 mb-2"
          >
            ← Back to Forms
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {form?.name} - Submissions
          </h1>
          <p className="text-gray-600 mt-1">
            Total: {pagination.total} submissions
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition inline-flex items-center gap-2"
          >
            <span>📥</span>
            Export CSV
          </button>
          <Link
            to={`/admin/forms/${formId}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-2"
          >
            <span>✏️</span>
            Edit Form
          </Link>
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        filterOptions={filterOptions}
        showSearch={false}
        additionalFilters={
          <>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, startDate: e.target.value }))
              }
              className="px-4 py-2 border rounded-lg"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, endDate: e.target.value }))
              }
              className="px-4 py-2 border rounded-lg"
              placeholder="End Date"
            />
          </>
        }
      />

      {/* Submissions Table */}
      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={submissions}
          loading={loading}
          emptyMessage="No submissions yet. Share your form to start receiving responses!"
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
                    setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                  }
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
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

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Submission Details</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Submission Data */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Form Data</h3>
                <div className="space-y-3">
                  {Object.entries(selectedSubmission.data).map(
                    ([key, value]) => (
                      <div key={key} className="border-b pb-3">
                        <div className="text-sm font-medium text-gray-600 mb-1">
                          {key}
                        </div>
                        <div className="text-gray-900">
                          {Array.isArray(value)
                            ? value.join(", ")
                            : String(value)}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Metadata</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        selectedSubmission.status === "new"
                          ? "bg-blue-100 text-blue-800"
                          : selectedSubmission.status === "read"
                          ? "bg-green-100 text-green-800"
                          : selectedSubmission.status === "archived"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedSubmission.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Submitted:</span>{" "}
                    {new Date(selectedSubmission.created_at).toLocaleString()}
                  </div>
                  {selectedSubmission.ip_address && (
                    <div>
                      <span className="font-medium">IP Address:</span>{" "}
                      {selectedSubmission.ip_address}
                    </div>
                  )}
                  {selectedSubmission.referrer && (
                    <div>
                      <span className="font-medium">Referrer:</span>{" "}
                      {selectedSubmission.referrer}
                    </div>
                  )}
                  {selectedSubmission.user_agent && (
                    <div>
                      <span className="font-medium">User Agent:</span>{" "}
                      <span className="text-xs text-gray-600 break-all">
                        {selectedSubmission.user_agent}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Notes</h3>
                <textarea
                  value={selectedSubmission.notes || ""}
                  onChange={(e) => {
                    const updated = {
                      ...selectedSubmission,
                      notes: e.target.value,
                    };
                    setSelectedSubmission(updated);
                    // Auto-save notes
                    api.put(`/forms/submissions/${selectedSubmission.id}`, {
                      notes: e.target.value,
                    });
                  }}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
                  rows={4}
                  placeholder="Add notes about this submission..."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
