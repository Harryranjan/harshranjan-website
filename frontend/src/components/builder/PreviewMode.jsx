import { FiX, FiMonitor, FiTablet, FiSmartphone } from "react-icons/fi";
import { useState } from "react";
import Button from "../Button";

/**
 * Reusable Preview Mode - Live preview with device switching
 *
 * @param {Boolean} isOpen - Whether preview is open
 * @param {Function} onClose - Callback to close preview
 * @param {Function} renderContent - Function to render preview content
 * @param {String} title - Preview title
 */
export default function PreviewMode({
  isOpen,
  onClose,
  renderContent,
  title = "Preview",
  defaultDevice = "desktop",
}) {
  const [device, setDevice] = useState(defaultDevice);

  if (!isOpen) return null;

  const devices = [
    { key: "desktop", label: "Desktop", icon: <FiMonitor />, width: "100%" },
    { key: "tablet", label: "Tablet", icon: <FiTablet />, width: "768px" },
    { key: "mobile", label: "Mobile", icon: <FiSmartphone />, width: "375px" },
  ];

  const currentDevice = devices.find((d) => d.key === device);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">{title}</h2>

            {/* Device Switcher */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              {devices.map((d) => (
                <button
                  key={d.key}
                  onClick={() => setDevice(d.key)}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-2 transition ${
                    device === d.key
                      ? "bg-white shadow text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title={d.label}
                >
                  {d.icon}
                  <span className="text-sm font-medium">{d.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button variant="ghost" icon={<FiX />} onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-gray-100 overflow-auto p-8">
        <div
          className="mx-auto bg-white shadow-2xl transition-all duration-300"
          style={{
            width: currentDevice.width,
            minHeight:
              device === "mobile"
                ? "667px"
                : device === "tablet"
                ? "1024px"
                : "100%",
          }}
        >
          {/* Device Frame (optional decorative) */}
          <div className="h-full">
            {renderContent ? (
              renderContent()
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-400">
                No preview content available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-white border-t px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Viewing in <strong>{currentDevice.label}</strong> mode (
            {currentDevice.width})
          </span>
          <span className="text-gray-400">
            This is a preview. Actual rendering may vary.
          </span>
        </div>
      </div>
    </div>
  );
}
