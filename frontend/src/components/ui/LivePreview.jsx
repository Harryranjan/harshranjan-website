import { useState, useEffect, useRef } from "react";
import { blocksToHTML } from "../../utils/blocksToHTML";

export default function LivePreview({
  content,
  title,
  template = "default",
  onClose,
  showTitle = false,
  pageTitle = "",
}) {
  const [previewMode, setPreviewMode] = useState("desktop"); // desktop, tablet, mobile
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Convert blocks to HTML if needed
    const htmlContent = blocksToHTML(content);

    // Check if content is a complete HTML document (Custom Code mode)
    const isCustomHTML =
      typeof htmlContent === "string" &&
      (htmlContent.trim().startsWith("<!DOCTYPE") ||
        htmlContent.trim().startsWith("<html"));

    // If it's custom HTML, render it directly
    if (isCustomHTML) {
      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();
      return;
    }

    // Generate preview HTML with styling for Rich Text and Block Editor
    const previewHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            padding: 2rem;
            background: #f9fafb;
          }
          .preview-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 3rem;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .preview-title {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 2rem;
            color: #111827;
            line-height: 1.2;
          }
          .preview-content {
            font-size: 1.125rem;
            color: #374151;
          }
          .preview-content h1 {
            font-size: 2rem;
            font-weight: bold;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: #111827;
          }
          .preview-content h2 {
            font-size: 1.75rem;
            font-weight: bold;
            margin-top: 1.75rem;
            margin-bottom: 0.875rem;
            color: #111827;
          }
          .preview-content h3 {
            font-size: 1.5rem;
            font-weight: bold;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            color: #111827;
          }
          .preview-content h4 {
            font-size: 1.25rem;
            font-weight: bold;
            margin-top: 1.25rem;
            margin-bottom: 0.625rem;
            color: #111827;
          }
          .preview-content p {
            margin-bottom: 1rem;
          }
          .preview-content ul, .preview-content ol {
            margin-bottom: 1rem;
            padding-left: 2rem;
          }
          .preview-content li {
            margin-bottom: 0.5rem;
          }
          .preview-content a {
            color: #2563eb;
            text-decoration: underline;
          }
          .preview-content img {
            max-width: 100%;
            height: auto;
            border-radius: 0.375rem;
            margin: 1.5rem 0;
          }
          .preview-content blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: #6b7280;
          }
          .preview-content code {
            background: #f3f4f6;
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-family: monospace;
            font-size: 0.875em;
          }
          .preview-content pre {
            background: #1f2937;
            color: #f9fafb;
            padding: 1rem;
            border-radius: 0.375rem;
            overflow-x: auto;
            margin: 1rem 0;
          }
          .preview-content pre code {
            background: transparent;
            padding: 0;
            color: inherit;
          }
          .preview-content strong {
            font-weight: 600;
          }
          .preview-content em {
            font-style: italic;
          }
          .template-badge {
            display: inline-block;
            background: #dbeafe;
            color: #1e40af;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 1rem;
          }
        </style>
      </head>
      <body>
        <div class="preview-container">
          ${
            template !== "default"
              ? `<div class="template-badge">Template: ${template}</div>`
              : ""
          }
          <h1 class="preview-title">${title || "Untitled Page"}</h1>
          <div class="preview-content">
            ${
              htmlContent ||
              '<p class="text-gray-400">Start typing to see preview...</p>'
            }
          </div>
        </div>
      </body>
      </html>
    `;

    iframeDoc.open();
    iframeDoc.write(previewHTML);
    iframeDoc.close();
  }, [content, title, template]);

  const previewModes = {
    desktop: {
      width: "100%",
      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
    tablet: {
      width: "768px",
      icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    },
    mobile: {
      width: "375px",
      icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    },
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Compact Single-Row Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Title */}
        <div className="flex items-center gap-3 min-w-0">
          <svg
            className="w-5 h-5 text-blue-600 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-semibold text-gray-900 whitespace-nowrap">
              Live Preview
            </span>
            {showTitle && pageTitle && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 truncate">{pageTitle}</span>
              </>
            )}
          </div>
        </div>

        {/* Center: Device Mode Buttons */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {Object.entries(previewModes).map(([mode, { icon }]) => (
            <button
              key={mode}
              onClick={() => setPreviewMode(mode)}
              className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
                previewMode === mode
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title={mode.charAt(0).toUpperCase() + mode.slice(1)}
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
                  d={icon}
                />
              </svg>
              <span className="text-sm font-medium capitalize hidden sm:inline">
                {mode}
              </span>
            </button>
          ))}
        </div>

        {/* Right: Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
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
            <span className="font-medium hidden sm:inline">Close</span>
          </button>
        )}
      </div>

      {/* Preview Frame Container */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4 flex items-start justify-center">
        <div
          className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            width: previewModes[previewMode].width,
            maxWidth: "100%",
            minHeight: "600px",
            height: "fit-content",
          }}
        >
          <iframe
            ref={iframeRef}
            title="Page Preview"
            className="w-full border-0"
            style={{ minHeight: "600px" }}
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      </div>

      {/* Preview Info */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 text-xs text-gray-500 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Preview updates automatically as you type</span>
        </div>
        <div>
          <span className="font-medium">
            {previewMode === "desktop"
              ? "100%"
              : previewModes[previewMode].width}
          </span>
        </div>
      </div>
    </div>
  );
}
