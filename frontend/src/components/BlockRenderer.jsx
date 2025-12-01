/**
 * BlockRenderer - Renders block-based content on the frontend
 * Converts blocks created in BlockEditor to displayable HTML
 */

export default function BlockRenderer({ blocks }) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  const renderBlock = (block) => {
    switch (block.type) {
      case "heading":
        const HeadingTag = block.settings?.level || "h2";
        return (
          <HeadingTag
            key={block.id}
            className="font-bold text-gray-900 mb-4"
            style={{
              fontSize:
                block.settings?.level === "h1"
                  ? "2.5rem"
                  : block.settings?.level === "h2"
                  ? "2rem"
                  : block.settings?.level === "h3"
                  ? "1.75rem"
                  : "1.5rem",
              textAlign: block.settings?.alignment || "left",
            }}
          >
            {block.content}
          </HeadingTag>
        );

      case "text":
        return (
          <div
            key={block.id}
            className="prose prose-lg max-w-none mb-6"
            style={{ textAlign: block.settings?.alignment || "left" }}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );

      case "image":
        return (
          <div
            key={block.id}
            className="mb-6"
            style={{ textAlign: block.settings?.alignment || "center" }}
          >
            <img
              src={block.content}
              alt={block.settings?.alt || ""}
              className={`max-w-full h-auto rounded-lg ${
                block.settings?.alignment === "center" ? "mx-auto" : ""
              }`}
              style={{
                maxWidth: block.settings?.width || "100%",
              }}
            />
            {block.settings?.caption && (
              <p className="text-sm text-gray-600 mt-2 italic">
                {block.settings.caption}
              </p>
            )}
          </div>
        );

      case "video":
        return (
          <div
            key={block.id}
            className="mb-6"
            style={{ textAlign: block.settings?.alignment || "center" }}
          >
            <div
              className="relative w-full mx-auto"
              style={{
                maxWidth: block.settings?.width || "100%",
                paddingBottom: "56.25%", // 16:9 aspect ratio
              }}
            >
              <iframe
                src={block.content}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {block.settings?.caption && (
              <p className="text-sm text-gray-600 mt-2 italic">
                {block.settings.caption}
              </p>
            )}
          </div>
        );

      case "code":
        return (
          <div key={block.id} className="mb-6">
            <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm font-mono">{block.content}</code>
            </pre>
            {block.settings?.language && (
              <p className="text-xs text-gray-500 mt-1">
                Language: {block.settings.language}
              </p>
            )}
          </div>
        );

      case "quote":
        return (
          <blockquote
            key={block.id}
            className="border-l-4 border-blue-500 pl-4 py-2 mb-6 italic text-gray-700 bg-gray-50 rounded"
          >
            <p className="mb-2">{block.content}</p>
            {block.settings?.author && (
              <footer className="text-sm text-gray-600 not-italic">
                — {block.settings.author}
              </footer>
            )}
          </blockquote>
        );

      case "html":
        return (
          <div
            key={block.id}
            className="mb-6"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );

      default:
        return (
          <div
            key={block.id}
            className="mb-6"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );
    }
  };

  return (
    <div className="block-content">
      {blocks.map((block) => renderBlock(block))}
    </div>
  );
}
