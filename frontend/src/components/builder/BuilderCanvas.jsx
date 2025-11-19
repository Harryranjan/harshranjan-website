import { FiMove, FiTrash2, FiCopy, FiEdit2 } from "react-icons/fi";

/**
 * Reusable Builder Canvas - Drag-drop area with reordering
 *
 * @param {Array} items - Array of items to render
 * @param {Function} onDragOver - Callback for drag over
 * @param {Function} onDrop - Callback for drop
 * @param {Function} onItemClick - Callback when item is clicked
 * @param {Function} onItemDelete - Callback to delete item
 * @param {Function} onItemDuplicate - Callback to duplicate item
 * @param {Function} onItemDragStart - Callback when dragging item starts
 * @param {Function} renderItem - Function to render each item
 * @param {String} emptyMessage - Message when no items
 */
export default function BuilderCanvas({
  items = [],
  onDragOver,
  onDrop,
  onItemClick,
  onItemDelete,
  onItemDuplicate,
  onItemDragStart,
  renderItem,
  emptyMessage = "Drag and drop items here to get started",
  emptyIcon = "📝",
  className = "",
}) {
  return (
    <div
      className={`flex-1 p-6 overflow-y-auto bg-gray-50 ${className}`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="max-w-3xl mx-auto">
        {items.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="text-6xl mb-4">{emptyIcon}</div>
            <p className="text-gray-600 text-lg font-medium mb-2">
              {emptyMessage}
            </p>
            <p className="text-gray-500 text-sm">
              Select items from the left panel and drag them here
            </p>
          </div>
        ) : (
          /* Items List */
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => onItemDragStart?.(e, index)}
                className="bg-white rounded-lg border hover:border-blue-500 transition group"
              >
                {/* Item Header/Controls */}
                <div className="flex items-center justify-between p-3 border-b bg-gray-50">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 hover:bg-gray-200 rounded cursor-move"
                      title="Drag to reorder"
                    >
                      <FiMove className="w-4 h-4 text-gray-400" />
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                      {item.label || item.name || `Item ${index + 1}`}
                    </span>
                    {item.required && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                        Required
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => onItemClick?.(item, index)}
                      className="p-1 hover:bg-blue-100 rounded text-blue-600"
                      title="Edit"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onItemDuplicate?.(item, index)}
                      className="p-1 hover:bg-green-100 rounded text-green-600"
                      title="Duplicate"
                    >
                      <FiCopy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onItemDelete?.(index)}
                      className="p-1 hover:bg-red-100 rounded text-red-600"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Item Content */}
                <div className="p-4">
                  {renderItem ? (
                    renderItem(item, index)
                  ) : (
                    <div className="text-gray-600">
                      {item.description || item.content || "No content"}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
