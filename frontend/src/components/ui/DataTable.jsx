import { Link } from "react-router-dom";

/**
 * DataTable Component
 * A reusable data table with checkboxes, badges, and action buttons
 * 
 * @param {Array} columns - Column configuration [{key, label, render?, sortable?, width?}]
 * @param {Array} data - Array of data objects
 * @param {boolean} selectable - Enable row selection
 * @param {Array} selectedRows - Array of selected row IDs
 * @param {Function} onSelectRow - Callback when row is selected
 * @param {Function} onSelectAll - Callback when select all is clicked
 * @param {Array} actions - Array of action buttons [{label, icon, onClick, variant?, condition?}]
 * @param {Function} renderRow - Custom row renderer (optional)
 * @param {string} emptyMessage - Message when no data
 * @param {boolean} loading - Loading state
 * @param {string} keyField - Field to use as unique key (default: 'id')
 */
export default function DataTable({
  columns = [],
  data = [],
  selectable = false,
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  actions = [],
  renderRow,
  emptyMessage = "No data available",
  loading = false,
  keyField = "id",
}) {
  const isAllSelected = data.length > 0 && selectedRows.length === data.length;
  const isSomeSelected = selectedRows.length > 0 && !isAllSelected;

  const handleSelectAll = () => {
    if (onSelectAll) {
      onSelectAll(isAllSelected ? [] : data.map((item) => item[keyField]));
    }
  };

  const handleSelectRow = (id) => {
    if (onSelectRow) {
      onSelectRow(id);
    }
  };

  const getActionVariant = (variant) => {
    const variants = {
      primary: "text-blue-600 hover:text-blue-900",
      success: "text-green-600 hover:text-green-900",
      danger: "text-red-600 hover:text-red-900",
      warning: "text-yellow-600 hover:text-yellow-900",
      default: "text-gray-600 hover:text-gray-900",
    };
    return variants[variant] || variants.default;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-12 text-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-600 mx-auto"
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
          <p className="text-gray-500 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isSomeSelected;
                    }}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.width || ""
                  }`}
                >
                  {column.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)
                  }
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-12 h-12 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const itemKey = item[keyField];
                const isSelected = selectedRows.includes(itemKey);

                return (
                  <tr
                    key={itemKey}
                    className={`hover:bg-gray-50 transition ${
                      isSelected ? "bg-blue-50" : ""
                    }`}
                  >
                    {selectable && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(itemKey)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                    )}
                    {renderRow ? (
                      renderRow(item, columns)
                    ) : (
                      columns.map((column) => (
                        <td
                          key={`${itemKey}-${column.key}`}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          {column.render ? column.render(item) : item[column.key]}
                        </td>
                      ))
                    )}
                    {actions.length > 0 && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-3">
                          {actions.map((action, idx) => {
                            // Check if action should be displayed
                            if (action.condition && !action.condition(item)) {
                              return null;
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => action.onClick(item)}
                                className={`transition ${getActionVariant(action.variant)}`}
                                title={action.label}
                              >
                                {action.icon || action.label}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
