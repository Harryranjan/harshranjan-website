import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlockEditor = ({ value, onChange }) => {
  const [blocks, setBlocks] = useState(value || []);
  const [activeBlock, setActiveBlock] = useState(null);

  const blockTypes = [
    { type: "text", label: "Text", icon: "📝" },
    { type: "heading", label: "Heading", icon: "📌" },
    { type: "image", label: "Image", icon: "🖼️" },
    { type: "video", label: "Video", icon: "🎥" },
    { type: "code", label: "Code", icon: "💻" },
    { type: "quote", label: "Quote", icon: "💬" },
  ];

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: "",
      settings: {},
    };
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  const updateBlock = (id, updates) => {
    const newBlocks = blocks.map((block) =>
      block.id === id ? { ...block, ...updates } : block
    );
    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  const deleteBlock = (id) => {
    const newBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  const moveBlock = (index, direction) => {
    const newBlocks = [...blocks];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < blocks.length) {
      [newBlocks[index], newBlocks[newIndex]] = [
        newBlocks[newIndex],
        newBlocks[index],
      ];
      setBlocks(newBlocks);
      onChange(newBlocks);
    }
  };

  const renderBlock = (block, index) => {
    const isActive = activeBlock === block.id;

    return (
      <div
        key={block.id}
        className={`mb-4 border-2 rounded-lg transition-all ${
          isActive ? "border-blue-500 shadow-lg" : "border-gray-200"
        }`}
        onClick={() => setActiveBlock(block.id)}
      >
        {/* Block Header */}
        <div className="flex items-center justify-between bg-gray-50 px-4 py-2 border-b">
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {blockTypes.find((t) => t.type === block.type)?.icon}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {blockTypes.find((t) => t.type === block.type)?.label}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                moveBlock(index, "up");
              }}
              disabled={index === 0}
              className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
              title="Move up"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                moveBlock(index, "down");
              }}
              disabled={index === blocks.length - 1}
              className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
              title="Move down"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteBlock(block.id);
              }}
              className="p-1 hover:bg-red-100 text-red-600 rounded"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Block Content */}
        <div className="p-4">
          {block.type === "text" && (
            <ReactQuill
              value={block.content}
              onChange={(value) => updateBlock(block.id, { content: value })}
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                ],
              }}
            />
          )}

          {block.type === "heading" && (
            <div>
              <select
                value={block.settings.level || "h2"}
                onChange={(e) =>
                  updateBlock(block.id, {
                    settings: { ...block.settings, level: e.target.value },
                  })
                }
                className="mb-2 border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
              </select>
              <input
                type="text"
                value={block.content}
                onChange={(e) =>
                  updateBlock(block.id, { content: e.target.value })
                }
                placeholder="Enter heading text..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg font-semibold"
              />
            </div>
          )}

          {block.type === "image" && (
            <div>
              <input
                type="text"
                value={block.content}
                onChange={(e) =>
                  updateBlock(block.id, { content: e.target.value })
                }
                placeholder="Enter image URL..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2"
              />
              {block.content && (
                <img
                  src={block.content}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
              <input
                type="text"
                value={block.settings.alt || ""}
                onChange={(e) =>
                  updateBlock(block.id, {
                    settings: { ...block.settings, alt: e.target.value },
                  })
                }
                placeholder="Alt text..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 text-sm"
              />
            </div>
          )}

          {block.type === "video" && (
            <div>
              <input
                type="text"
                value={block.content}
                onChange={(e) =>
                  updateBlock(block.id, { content: e.target.value })
                }
                placeholder="Enter video URL (YouTube, Vimeo)..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              {block.content && (
                <div className="mt-2 aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Video Preview</span>
                </div>
              )}
            </div>
          )}

          {block.type === "code" && (
            <div>
              <select
                value={block.settings.language || "javascript"}
                onChange={(e) =>
                  updateBlock(block.id, {
                    settings: { ...block.settings, language: e.target.value },
                  })
                }
                className="mb-2 border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="sql">SQL</option>
              </select>
              <textarea
                value={block.content}
                onChange={(e) =>
                  updateBlock(block.id, { content: e.target.value })
                }
                placeholder="Enter code..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono text-sm"
                rows={6}
              />
            </div>
          )}

          {block.type === "quote" && (
            <div>
              <textarea
                value={block.content}
                onChange={(e) =>
                  updateBlock(block.id, { content: e.target.value })
                }
                placeholder="Enter quote..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 italic"
                rows={3}
              />
              <input
                type="text"
                value={block.settings.author || ""}
                onChange={(e) =>
                  updateBlock(block.id, {
                    settings: { ...block.settings, author: e.target.value },
                  })
                }
                placeholder="Author (optional)..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2 text-sm"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Existing Blocks */}
      <div className="mb-4">
        {blocks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No blocks yet. Add your first block below!</p>
          </div>
        ) : (
          blocks.map((block, index) => renderBlock(block, index))
        )}
      </div>

      {/* Add Block Menu */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
        <p className="text-sm font-medium text-gray-700 mb-3">Add Block:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {blockTypes.map((blockType) => (
            <button
              key={blockType.type}
              onClick={() => addBlock(blockType.type)}
              className="flex flex-col items-center gap-1 p-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-sm transition"
            >
              <span className="text-2xl">{blockType.icon}</span>
              <span className="text-xs font-medium text-gray-700">
                {blockType.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockEditor;
