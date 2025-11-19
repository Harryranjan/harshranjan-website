import { useState, useEffect, useRef } from "react";

/**
 * PreviewPanel Component (Generic version)
 * A reusable preview panel with device modes and custom templates
 * 
 * @param {string} content - HTML content to preview
 * @param {string} title - Title to display
 * @param {string} customCSS - Custom CSS to inject
 * @param {string} customJS - Custom JavaScript to inject
 * @param {Function} templateRenderer - Custom template function
 * @param {Array} devices - Custom device configurations
 * @param {boolean} showToolbar - Show preview toolbar (default: true)
 * @param {string} baseStyles - Base styles to apply
 */
export default function PreviewPanel({
  content = "",
  title = "",
  customCSS = "",
  customJS = "",
  templateRenderer,
  devices = null,
  showToolbar = true,
  baseStyles = "tailwind",
}) {
  const [previewMode, setPreviewMode] = useState("desktop");
  const iframeRef = useRef(null);

  const defaultDevices = {
    desktop: { width: "100%", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    tablet: { width: "768px", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
    mobile: { width: "375px", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" }
  };

  const previewModes = devices || defaultDevices;

  const getDefaultTemplate = () => {
    const styleLinks = baseStyles === "tailwind" 
      ? '<script src="https://cdn.tailwindcss.com"></script>'
      : '';

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        ${styleLinks}
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
          .preview-content h1 { font-size: 2rem; font-weight: bold; margin: 2rem 0 1rem; color: #111827; }
          .preview-content h2 { font-size: 1.75rem; font-weight: bold; margin: 1.75rem 0 0.875rem; color: #111827; }
          .preview-content h3 { font-size: 1.5rem; font-weight: bold; margin: 1.5rem 0 0.75rem; color: #111827; }
          .preview-content p { margin-bottom: 1rem; }
          .preview-content ul, .preview-content ol { margin-bottom: 1rem; padding-left: 2rem; }
          .preview-content li { margin-bottom: 0.5rem; }
          .preview-content a { color: #2563eb; text-decoration: underline; }
          .preview-content img { max-width: 100%; height: auto; border-radius: 0.375rem; margin: 1.5rem 0; }
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
          .preview-content pre code { background: transparent; padding: 0; color: inherit; }
          ${customCSS}
        </style>
      </head>
      <body>
        <div class="preview-container">
          ${title ? `<h1 class="preview-title">${title}</h1>` : ''}
          <div class="preview-content">
            ${content || '<p class="text-gray-400">Start typing to see preview...</p>'}
          </div>
        </div>
        ${customJS ? `<script>${customJS}</script>` : ''}
      </body>
      </html>
    `;
  };

  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    const previewHTML = templateRenderer
      ? templateRenderer({ content, title, customCSS, customJS })
      : getDefaultTemplate();

    iframeDoc.open();
    iframeDoc.write(previewHTML);
    iframeDoc.close();
  }, [content, title, customCSS, customJS]);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Preview Toolbar */}
      {showToolbar && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="font-semibold text-gray-900">Live Preview</span>
          </div>

          {/* Device Mode Buttons */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            {Object.entries(previewModes).map(([mode, { icon }]) => (
              <button
                key={mode}
                onClick={() => setPreviewMode(mode)}
                className={`px-3 py-1.5 rounded-md transition flex items-center gap-2 ${
                  previewMode === mode
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                title={mode.charAt(0).toUpperCase() + mode.slice(1)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                </svg>
                <span className="text-sm font-medium capitalize hidden sm:inline">
                  {mode}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview Frame Container */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4 flex items-start justify-center">
        <div
          className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            width: previewModes[previewMode].width,
            maxWidth: "100%",
            minHeight: "600px",
            height: "fit-content"
          }}
        >
          <iframe
            ref={iframeRef}
            title="Preview"
            className="w-full border-0"
            style={{ minHeight: "600px" }}
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      </div>

      {/* Preview Info */}
      {showToolbar && (
        <div className="bg-white border-t border-gray-200 px-4 py-2 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Preview updates automatically</span>
          </div>
          <div>
            <span className="font-medium">
              {previewMode === "desktop" ? "100%" : previewModes[previewMode].width}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
