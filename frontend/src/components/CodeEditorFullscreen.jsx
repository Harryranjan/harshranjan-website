import { useState } from "react";
import { FiMaximize2, FiX } from "react-icons/fi";

/**
 * Reusable Code Editor with Fullscreen capability
 * Perfect for editing HTML, CSS, JavaScript, or any code
 *
 * Usage:
 * <CodeEditorFullscreen
 *   value={code}
 *   onChange={(newCode) => setCode(newCode)}
 *   placeholder="Enter your code here..."
 *   language="HTML"
 *   minHeight="450px"
 * />
 */
export default function CodeEditorFullscreen({
  value = "",
  onChange,
  placeholder = "<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>",
  language = "HTML/JSX",
  minHeight = "450px",
  showLineNumbers = false,
  readOnly = false,
  className = "",
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const characterCount = value.length;
  const lineCount = value.split("\n").length;

  return (
    <>
      {/* Regular Code Editor */}
      <div
        className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm font-semibold text-gray-700 ml-2">
              {language} Code
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                {characterCount} characters
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                {lineCount} lines
              </span>
            </div>
            {!readOnly && (
              <button
                onClick={() => setIsFullscreen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-all duration-200"
                title="Open Fullscreen Editor"
              >
                <FiMaximize2 size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Code Textarea */}
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            readOnly={readOnly}
            className="w-full px-6 py-5 focus:ring-2 focus:ring-blue-500 focus:ring-inset outline-none font-mono text-sm leading-relaxed resize-none bg-gray-900 text-gray-100"
            style={{
              minHeight: minHeight,
              tabSize: 2,
              MozTabSize: 2,
              lineHeight: "1.6",
              fontFamily: "'Fira Code', 'Courier New', monospace",
            }}
            placeholder={placeholder}
          />
          {value.length === 0 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div className="text-6xl mb-4">🖥️</div>
              <p className="text-gray-400 text-sm">
                Start typing your {language} code here
              </p>
            </div>
          )}
        </div>

        {/* Code Tips */}
        <div className="px-5 py-3 bg-blue-50 border-t border-blue-100">
          <div className="flex items-start gap-3">
            <span className="text-blue-600 mt-0.5">💡</span>
            <div className="flex-1">
              <p className="text-xs text-blue-900 font-medium mb-1">
                Quick Tips:
              </p>
              <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                <li>
                  Use the fullscreen button for a distraction-free coding
                  experience
                </li>
                <li>Press ESC to exit fullscreen mode</li>
                <li>Code is automatically saved when you exit fullscreen</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Code Editor Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-gray-900 z-[100] flex flex-col animate-fadeIn">
          {/* Fullscreen Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-white font-semibold">
                {language} Code Editor - Fullscreen Mode
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="px-3 py-1.5 bg-blue-900 text-blue-300 rounded-lg font-medium">
                  {characterCount} characters
                </span>
                <span className="px-3 py-1.5 bg-purple-900 text-purple-300 rounded-lg font-medium">
                  {lineCount} lines
                </span>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded-lg transition-all flex items-center gap-2"
                title="Exit Fullscreen (ESC)"
              >
                <FiX size={18} />
                <span className="text-sm">Exit Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Fullscreen Code Area */}
          <div className="flex-1 relative">
            <textarea
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              readOnly={readOnly}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsFullscreen(false);
                }
              }}
              className="w-full h-full px-8 py-6 bg-gray-900 text-gray-100 font-mono text-base leading-relaxed resize-none outline-none border-0"
              placeholder={placeholder}
              style={{
                tabSize: 2,
                MozTabSize: 2,
                lineHeight: "1.7",
                fontFamily: "'Fira Code', 'Courier New', monospace",
              }}
              autoFocus
            />
            {value.length === 0 && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <div className="text-8xl mb-6 opacity-20">💻</div>
                <p className="text-gray-500 text-lg">
                  Start typing your {language} code here
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Press ESC to exit fullscreen
                </p>
              </div>
            )}
          </div>

          {/* Fullscreen Footer Hint */}
          <div className="px-6 py-3 bg-gray-800 border-t border-gray-700 flex items-center justify-between text-sm text-gray-400">
            <span>
              💡 Tip: Press{" "}
              <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">ESC</kbd>{" "}
              to exit fullscreen
            </span>
            <span>Changes are saved automatically</span>
          </div>
        </div>
      )}
    </>
  );
}
