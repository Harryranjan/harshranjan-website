import { useState } from "react";
import { FiCopy, FiCheck, FiCode, FiLink } from "react-icons/fi";
import Modal from "./Modal";
import Button from "./Button";
import { generateShortcode } from "../utils/shortcodeParser";

export default function EmbedCodeModal({
  isOpen,
  onClose,
  type = "form",
  id,
  name,
}) {
  const [copied, setCopied] = useState(null);
  const [selectedTab, setSelectedTab] = useState("react");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Generate embed codes
  const embedCodes = {
    react: {
      title: "React Component",
      description: "Use this in your React components",
      code: `import { FormEmbed } from '../components';

<FormEmbed formId={${id}} />`,
    },
    shortcode: {
      title: "Shortcode",
      description: "Use this in content/CMS fields",
      code: generateShortcode(type, id),
    },
    javascript: {
      title: "JavaScript Widget",
      description: "Embed in any HTML page",
      code: `<!-- Add this where you want the form to appear -->
<div id="form-container-${id}"></div>

<!-- Add this before closing </body> tag -->
<script src="${API_URL}/api/embed/forms/${id}/widget.js"></script>`,
    },
    iframe: {
      title: "iframe Embed",
      description: "Maximum compatibility and isolation",
      code: `<iframe 
  src="${API_URL}/api/embed/forms/${id}/embed" 
  width="100%" 
  height="600" 
  frameborder="0"
  title="${name}"
></iframe>`,
    },
    directLink: {
      title: "Direct Link",
      description: "Share this URL directly",
      code: `${API_URL}/api/embed/forms/${id}/embed`,
    },
  };

  const copyToClipboard = (code, key) => {
    navigator.clipboard.writeText(code);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const tabs = [
    { key: "react", label: "React", icon: <FiCode /> },
    { key: "shortcode", label: "Shortcode", icon: <FiLink /> },
    { key: "javascript", label: "JavaScript", icon: <FiCode /> },
    { key: "iframe", label: "iframe", icon: <FiCode /> },
    { key: "directLink", label: "Link", icon: <FiLink /> },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Embed Code - ${name}`}
      size="lg"
    >
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                selectedTab === tab.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {embedCodes[selectedTab].title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {embedCodes[selectedTab].description}
            </p>
          </div>

          {/* Code Block */}
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{embedCodes[selectedTab].code}</code>
            </pre>
            <button
              onClick={() =>
                copyToClipboard(embedCodes[selectedTab].code, selectedTab)
              }
              className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
            >
              {copied === selectedTab ? (
                <FiCheck className="w-5 h-5 text-green-400" />
              ) : (
                <FiCopy className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Additional Info */}
          {selectedTab === "react" && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> Make sure FormEmbed component is imported
                from your components folder.
              </p>
            </div>
          )}

          {selectedTab === "shortcode" && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Usage:</strong> Use ContentRenderer component to parse
                shortcodes:
              </p>
              <pre className="mt-2 bg-white p-2 rounded text-xs overflow-x-auto">
                <code>{`import { ContentRenderer } from '../components';

<ContentRenderer content={yourContent} />`}</code>
              </pre>
            </div>
          )}

          {selectedTab === "javascript" && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> This works on any website. The form will
                automatically initialize when the page loads.
              </p>
            </div>
          )}

          {selectedTab === "iframe" && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> iframe provides complete isolation from
                the parent page. Adjust width and height as needed.
              </p>
            </div>
          )}

          {selectedTab === "directLink" && (
            <div className="mt-4 space-y-3">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  Share this link directly or open it in a new window.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={() =>
                  window.open(embedCodes.directLink.code, "_blank")
                }
                className="w-full"
              >
                Open in New Tab
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          icon={copied === "all" ? <FiCheck /> : <FiCopy />}
          onClick={() => {
            const allCodes = Object.entries(embedCodes)
              .map(([key, { title, code }]) => `// ${title}\n${code}`)
              .join("\n\n---\n\n");
            copyToClipboard(allCodes, "all");
          }}
        >
          {copied === "all" ? "Copied!" : "Copy All"}
        </Button>
      </div>
    </Modal>
  );
}
