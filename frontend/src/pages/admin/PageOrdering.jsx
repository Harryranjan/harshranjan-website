import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../../utils/api";
import { Spinner, DraggablePageList, Modal } from "../../components/ui";

export default function PageOrdering() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      // Fetch all pages that should be shown in menu
      const response = await api.get("/pages", {
        params: { limit: 100 },
      });
      
      // Filter to show only menu pages and sort by menu_order
      const menuPages = response.data.pages
        .filter(p => p.show_in_menu)
        .sort((a, b) => a.menu_order - b.menu_order);
      
      setPages(menuPages);
    } catch (error) {
      console.error("Failed to fetch pages:", error);
      setModalMessage("Failed to load pages. Please try again.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = (reorderedPages) => {
    setPages(reorderedPages);
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Update menu_order for all pages
      await Promise.all(
        pages.map((page, index) =>
          api.put(`/pages/${page.id}`, { menu_order: index + 1 })
        )
      );

      setHasChanges(false);
      setModalMessage("Menu order saved successfully!");
      setShowModal(true);
      fetchPages(); // Refresh to confirm changes
    } catch (error) {
      console.error("Failed to save order:", error);
      setModalMessage("Failed to save menu order. Please try again.");
      setShowModal(true);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all changes?")) {
      fetchPages();
      setHasChanges(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Menu Ordering - Admin Dashboard</title>
      </Helmet>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Link
            to="/admin/pages"
            className="text-gray-600 hover:text-gray-900 transition"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Menu Ordering
          </h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base ml-8">
          Drag and drop pages to reorder the menu. Only pages marked as "Show in Menu" are displayed here.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">
              How to use drag & drop:
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Click and hold the drag handle (☰) to grab a page</li>
              <li>• Drag the page up or down to change its position</li>
              <li>• Release to drop the page in its new location</li>
              <li>• Click "Save Order" to apply your changes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {hasChanges && (
        <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-sm font-medium text-yellow-800">
              You have unsaved changes
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              disabled={saving}
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Spinner size="sm" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Save Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Pages List */}
      {loading ? (
        <div className="text-center py-12">
          <Spinner size="md" />
        </div>
      ) : pages.length === 0 ? (
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-gray-500 text-lg mb-2">No menu pages found</p>
          <p className="text-gray-400 text-sm mb-4">
            Pages must be marked as "Show in Menu" to appear here
          </p>
          <Link
            to="/admin/pages"
            className="inline-block text-blue-600 hover:text-blue-700 font-medium"
          >
            Go to Pages List
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <DraggablePageList pages={pages} onReorder={handleReorder} />
        </div>
      )}

      {/* Stats Footer */}
      {pages.length > 0 && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm text-gray-600 text-center">
          Showing {pages.length} page{pages.length !== 1 ? "s" : ""} in menu
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalMessage.includes("success") ? "Success" : "Error"}
        message={modalMessage}
        autoClose={modalMessage.includes("success")}
      />
    </div>
  );
}
