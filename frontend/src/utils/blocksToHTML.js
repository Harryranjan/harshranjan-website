/**
 * Convert Block Editor blocks to HTML
 * This utility is used by both DynamicPage and LivePreview to ensure consistent rendering
 */
export const blocksToHTML = (blocks) => {
  if (!Array.isArray(blocks)) return blocks; // Already HTML string

  return blocks
    .map((block) => {
      switch (block.type) {
        case "text":
          return block.content;

        case "heading":
          const level = block.settings?.level || "h2";
          return `<${level}>${block.content}</${level}>`;

        case "image":
          const alt = block.settings?.alt || "";
          return `<img src="${block.content}" alt="${alt}" />`;

        case "video":
          // Simple video embed (YouTube, Vimeo)
          if (
            block.content.includes("youtube.com") ||
            block.content.includes("youtu.be")
          ) {
            const videoId = block.content.match(
              /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
            )?.[1];
            return videoId
              ? `<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.youtube.com/embed/${videoId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe></div>`
              : `<p class="text-gray-500">Invalid YouTube URL</p>`;
          }
          if (block.content.includes("vimeo.com")) {
            const videoId = block.content.match(/vimeo\.com\/(\d+)/)?.[1];
            return videoId
              ? `<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://player.vimeo.com/video/${videoId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe></div>`
              : `<p class="text-gray-500">Invalid Vimeo URL</p>`;
          }
          return `<video src="${block.content}" controls style="width: 100%; max-width: 100%;"></video>`;

        case "code":
          const language = block.settings?.language || "javascript";
          return `<pre><code class="language-${language}">${block.content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</code></pre>`;

        case "quote":
          const author = block.settings?.author || "";
          return `<blockquote>${block.content}${
            author ? `<footer>— ${author}</footer>` : ""
          }</blockquote>`;

        case "html":
          return block.content; // Raw HTML

        default:
          return "";
      }
    })
    .join("\n");
};

/**
 * Check if content is a full HTML document
 */
export const isFullHTMLDocument = (content) => {
  if (typeof content !== "string") return false;
  const trimmed = content.trim();
  return trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html");
};
