import { useState } from "react";

/**
 * FilterBar Component
 * A reusable filter bar with multiple filter types, search, and sorting
 *
 * @param {Object} filters - Current filter values
 * @param {Function} onFilterChange - Callback when filters change
 * @param {Array} filterConfig - Configuration for filter fields
 * @param {Object} sortConfig - Configuration for sorting
 * @param {Function} onClearFilters - Callback to clear all filters
 * @param {string} searchPlaceholder - Placeholder text for search input
 */
export default function FilterBar({
  filters = {},
  onFilterChange,
  filterConfig = [],
  sortConfig = null,
  onClearFilters,
  searchPlaceholder = "Search...",
}) {
  const handleFilterChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const renderFilterField = (config) => {
    const { name, label, type, options, placeholder, span = 1 } = config;

    switch (type) {
      case "select":
        return (
          <div
            key={name}
            className={`${span > 1 ? `lg:col-span-${span}` : ""}`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <select
              value={filters[name] || ""}
              onChange={(e) => handleFilterChange(name, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{placeholder || `All ${label}`}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "search":
        return (
          <div
            key={name}
            className={`${span > 1 ? `lg:col-span-${span}` : ""}`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters[name] || ""}
                onChange={(e) => handleFilterChange(name, e.target.value)}
                placeholder={placeholder || searchPlaceholder}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        );

      case "text":
        return (
          <div
            key={name}
            className={`${span > 1 ? `lg:col-span-${span}` : ""}`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type="text"
              value={filters[name] || ""}
              onChange={(e) => handleFilterChange(name, e.target.value)}
              placeholder={placeholder}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );

      case "date":
        return (
          <div
            key={name}
            className={`${span > 1 ? `lg:col-span-${span}` : ""}`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type="date"
              value={filters[name] || ""}
              onChange={(e) => handleFilterChange(name, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="space-y-4">
        {/* Primary Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filterConfig
            .filter((config) => !config.isSecondary)
            .map((config) => renderFilterField(config))}
        </div>

        {/* Secondary Filters (Search & Sorting) */}
        {(filterConfig.some((config) => config.isSecondary) || sortConfig) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterConfig
              .filter((config) => config.isSecondary)
              .map((config) => renderFilterField(config))}

            {/* Sort By */}
            {sortConfig && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy || sortConfig.defaultSort || ""}
                    onChange={(e) =>
                      handleFilterChange("sortBy", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {sortConfig.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <select
                    value={
                      filters.sortOrder || sortConfig.defaultOrder || "desc"
                    }
                    onChange={(e) =>
                      handleFilterChange("sortOrder", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </>
            )}
          </div>
        )}

        {/* Clear Button */}
        {onClearFilters && (
          <div className="flex justify-end">
            <button
              onClick={onClearFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition flex items-center gap-2"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
