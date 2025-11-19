import { FiSearch } from "react-icons/fi";
import { useState } from "react";

/**
 * Reusable Field Type Panel - Shows available field types with drag support
 *
 * @param {Array} fieldTypes - Array of field type objects
 * @param {Function} onFieldDragStart - Callback when dragging starts
 * @param {String} title - Panel title
 */
export default function FieldTypePanel({
  fieldTypes = [],
  onFieldDragStart,
  title = "Field Types",
  showSearch = true,
  className = "",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories
  const categories = ["all", ...new Set(fieldTypes.map((f) => f.category))];

  // Filter fields
  const filteredFields = fieldTypes.filter((field) => {
    const matchesSearch =
      field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || field.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group by category
  const groupedFields = {};
  filteredFields.forEach((field) => {
    if (!groupedFields[field.category]) {
      groupedFields[field.category] = [];
    }
    groupedFields[field.category].push(field);
  });

  return (
    <div className={`flex flex-col h-full bg-gray-50 border-r ${className}`}>
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <h2 className="font-bold text-lg mb-3">{title}</h2>

        {/* Search */}
        {showSearch && (
          <div className="relative mb-3">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Category Filter */}
        <div className="flex gap-1 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Field Types */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(groupedFields).map(([category, fields]) => (
          <div key={category}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              {category}
            </h3>
            <div className="space-y-2">
              {fields.map((field) => (
                <div
                  key={field.type}
                  draggable
                  onDragStart={(e) => onFieldDragStart(e, field)}
                  className="bg-white p-3 rounded-lg border hover:border-blue-500 hover:shadow-md cursor-move transition group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{field.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{field.label}</div>
                      {field.description && (
                        <div className="text-xs text-gray-500 mt-1">
                          {field.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredFields.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p className="text-sm">No fields found</p>
            <p className="text-xs mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
