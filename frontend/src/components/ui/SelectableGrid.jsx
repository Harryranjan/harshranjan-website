import React, { useState } from "react";

/**
 * SelectableGrid - Grid of selectable cards/items
 *
 * @param {Array} items - Array of items {id, name, icon, description, value}
 * @param {Array} selected - Currently selected item IDs
 * @param {function} onSelectionChange - Callback when selection changes
 * @param {boolean} multiSelect - Allow multiple selections (default: false)
 * @param {number} columns - Number of columns (2, 3, 4)
 * @param {string} variant - 'card', 'compact', 'detailed'
 */
const SelectableGrid = ({
  items = [],
  selected = [],
  onSelectionChange,
  multiSelect = false,
  columns = 4,
  variant = "card",
  className = "",
}) => {
  const columnClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  };

  const toggleSelection = (itemId) => {
    if (multiSelect) {
      const newSelected = selected.includes(itemId)
        ? selected.filter((id) => id !== itemId)
        : [...selected, itemId];
      onSelectionChange(newSelected);
    } else {
      onSelectionChange(selected.includes(itemId) ? [] : [itemId]);
    }
  };

  const isSelected = (itemId) => selected.includes(itemId);

  if (variant === "compact") {
    return (
      <div className={`grid ${columnClasses[columns]} gap-3 ${className}`}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleSelection(item.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              isSelected(item.id)
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="text-xs font-semibold text-gray-900 mb-1">
              {item.name}
            </div>
            {item.value && (
              <div className="text-xs text-gray-600">{item.value}</div>
            )}
          </button>
        ))}
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div
        className={`grid ${
          columnClasses[Math.min(columns, 2)]
        } gap-4 ${className}`}
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleSelection(item.id)}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              isSelected(item.id)
                ? "border-blue-600 bg-blue-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">{item.icon}</div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description}
                  </p>
                )}
                {item.value && (
                  <div className="text-sm font-semibold text-blue-600">
                    {item.value}
                  </div>
                )}
              </div>
              {isSelected(item.id) && (
                <div className="text-blue-600 text-2xl flex-shrink-0">✓</div>
              )}
            </div>
          </button>
        ))}
      </div>
    );
  }

  // Default 'card' variant
  return (
    <div className={`grid ${columnClasses[columns]} gap-4 ${className}`}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => toggleSelection(item.id)}
          className={`p-6 rounded-lg border-2 transition-all ${
            isSelected(item.id)
              ? "border-blue-600 bg-blue-50 shadow-lg"
              : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">{item.icon}</div>
            <h4 className="font-bold text-gray-900 mb-2">{item.name}</h4>
            {item.description && (
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            )}
            {item.value && (
              <div className="text-sm font-semibold text-blue-600 mt-2">
                {item.value}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default SelectableGrid;
