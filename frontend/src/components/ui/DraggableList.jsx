import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

/**
 * DraggableList Component (Generic version)
 * A reusable drag-and-drop list component
 * 
 * @param {Array} items - Array of items to display
 * @param {Function} onReorder - Callback when items are reordered
 * @param {Function} renderItem - Custom render function for each item
 * @param {string} keyField - Field to use as unique key (default: 'id')
 * @param {boolean} showOrderNumbers - Show order numbers (default: true)
 * @param {string} emptyMessage - Message when no items
 */
export default function DraggableList({
  items = [],
  onReorder,
  renderItem,
  keyField = "id",
  showOrderNumbers = true,
  emptyMessage = "No items to display",
}) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    // Update order field if it exists
    const updatedItems = reorderedItems.map((item, index) => ({
      ...item,
      order: index + 1,
      menu_order: index + 1, // For backward compatibility
    }));

    onReorder(updatedItems);
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <svg
          className="w-12 h-12 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="draggable-list">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-2 transition-colors ${
              snapshot.isDraggingOver ? "bg-blue-50/30 rounded-lg p-2" : ""
            }`}
          >
            {items.map((item, index) => (
              <Draggable
                key={item[keyField]?.toString() || index.toString()}
                draggableId={item[keyField]?.toString() || index.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`bg-white border rounded-lg transition-all ${
                      snapshot.isDragging
                        ? "shadow-2xl border-blue-500 rotate-1 scale-105"
                        : "shadow-sm hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-4 p-4">
                      {/* Drag Handle */}
                      <div
                        {...provided.dragHandleProps}
                        className="flex-shrink-0 text-gray-400 cursor-grab active:cursor-grabbing hover:text-gray-600 transition"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8h16M4 16h16"
                          />
                        </svg>
                      </div>

                      {/* Order Number */}
                      {showOrderNumbers && (
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                      )}

                      {/* Custom Content */}
                      <div className="flex-1 min-w-0">
                        {renderItem ? renderItem(item, index) : (
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.title || item.name || item.label || `Item ${index + 1}`}
                            </p>
                            {item.description && (
                              <p className="text-xs text-gray-500 truncate">
                                {item.description}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
