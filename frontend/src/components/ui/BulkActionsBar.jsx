/**
 * BulkActionsBar Component
 * A reusable bulk actions bar with multi-select dropdown
 *
 * @param {Array} selectedItems - Array of selected item IDs
 * @param {Function} onClearSelection - Callback to clear selection
 * @param {Array} actions - Array of action objects with {value, label}
 * @param {string} selectedAction - Currently selected action
 * @param {Function} onActionChange - Callback when action changes
 * @param {Function} onApply - Callback when apply button is clicked
 * @param {boolean} loading - Loading state for apply button
 * @param {string} itemLabel - Label for items (e.g., "pages", "posts", "users")
 */
export default function BulkActionsBar({
  selectedItems = [],
  onClearSelection,
  actions = [],
  selectedAction = "",
  onActionChange,
  onApply,
  loading = false,
  itemLabel = "items",
}) {
  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {selectedItems.length} {itemLabel} selected
          </div>
          <button
            onClick={onClearSelection}
            className="text-sm text-blue-700 hover:text-blue-900 font-medium transition"
          >
            Clear
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 flex-1">
          <select
            value={selectedAction}
            onChange={(e) => onActionChange(e.target.value)}
            className="border border-blue-300 rounded-lg px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Action...</option>
            {actions.map((action) => (
              <option key={action.value} value={action.value}>
                {action.label}
              </option>
            ))}
          </select>

          <button
            onClick={onApply}
            disabled={!selectedAction || loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium flex items-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {loading ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}
