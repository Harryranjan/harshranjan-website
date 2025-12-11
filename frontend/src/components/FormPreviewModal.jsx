import { useState, useEffect } from "react";
import {
  FiX,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiMaximize2,
} from "react-icons/fi";

export default function FormPreviewModal({
  isOpen,
  onClose,
  formData,
  type = "form",
}) {
  const [device, setDevice] = useState("desktop"); // desktop, tablet, mobile
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getDeviceWidth = () => {
    switch (device) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "max-w-[1200px]";
    }
  };

  const getDeviceHeight = () => {
    switch (device) {
      case "mobile":
        return "667px"; // iPhone height
      case "tablet":
        return "1024px"; // iPad height
      default:
        return "800px";
    }
  };

  const renderField = (field) => {
    const inputClasses =
      "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-2";

    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "number":
      case "url":
        return (
          <div key={field.id} className="mb-4">
            <label className={labelClasses}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.description && (
              <p className="text-sm text-gray-500 mb-2">{field.description}</p>
            )}
            <input
              type={field.type}
              placeholder={field.placeholder}
              className={inputClasses}
              disabled
            />
          </div>
        );

      case "textarea":
        return (
          <div key={field.id} className="mb-4">
            <label className={labelClasses}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.description && (
              <p className="text-sm text-gray-500 mb-2">{field.description}</p>
            )}
            <textarea
              placeholder={field.placeholder}
              rows={field.rows || 4}
              className={inputClasses}
              disabled
            />
          </div>
        );

      case "select":
        return (
          <div key={field.id} className="mb-4">
            <label className={labelClasses}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.description && (
              <p className="text-sm text-gray-500 mb-2">{field.description}</p>
            )}
            <select className={inputClasses} disabled>
              <option>{field.placeholder || "Select an option"}</option>
              {field.options?.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "radio":
        return (
          <div key={field.id} className="mb-4">
            <label className={labelClasses}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.description && (
              <p className="text-sm text-gray-500 mb-2">{field.description}</p>
            )}
            <div className="space-y-2">
              {field.options?.map((opt, idx) => (
                <label key={idx} className="flex items-center">
                  <input
                    type="radio"
                    name={field.name}
                    value={opt.value}
                    className="mr-2"
                    disabled
                  />
                  <span className="text-sm text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div key={field.id} className="mb-4">
            <label className={labelClasses}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.description && (
              <p className="text-sm text-gray-500 mb-2">{field.description}</p>
            )}
            <div className="space-y-2">
              {field.options?.map((opt, idx) => (
                <label key={idx} className="flex items-center">
                  <input
                    type="checkbox"
                    value={opt.value}
                    className="mr-2"
                    disabled
                  />
                  <span className="text-sm text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case "file":
        return (
          <div key={field.id} className="mb-4">
            <label className={labelClasses}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.description && (
              <p className="text-sm text-gray-500 mb-2">{field.description}</p>
            )}
            <input type="file" className={inputClasses} disabled />
          </div>
        );

      case "heading":
        return (
          <div key={field.id} className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">{field.content}</h3>
          </div>
        );

      case "paragraph":
        return (
          <div key={field.id} className="mb-4">
            <p className="text-gray-700">{field.content}</p>
          </div>
        );

      case "divider":
        return <hr key={field.id} className="my-6 border-gray-300" />;

      case "rating":
        return (
          <div key={field.id} className="mb-4">
            <label className={labelClasses}>
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.description && (
              <p className="text-sm text-gray-500 mb-2">{field.description}</p>
            )}
            <div className="flex gap-2">
              {[...Array(field.max || 5)].map((_, idx) => (
                <span
                  key={idx}
                  className="text-2xl text-gray-300 cursor-not-allowed"
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPreview = () => {
    console.log("🔍 Preview formData:", formData);
    console.log("🔍 Preview type:", type);
    console.log("🔍 formData.type:", formData.type);
    console.log("🔍 formData.custom_code exists:", !!formData.custom_code);
    console.log(
      "🔍 formData.custom_code length:",
      formData.custom_code?.length
    );
    console.log("🔍 First 100 chars:", formData.custom_code?.substring(0, 100));

    // Decode HTML entities if needed
    const decodeHtmlEntities = (text) => {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = text;
      return textarea.value;
    };

    // Handle custom code forms
    if (formData.type === "custom" && formData.custom_code) {
      const decodedCode = decodeHtmlEntities(formData.custom_code);
      console.log("🔍 Decoded first 100 chars:", decodedCode.substring(0, 100));
      return (
        <div className="w-full h-full">
          {/* Custom HTML Preview with Device Frame */}
          <div
            className="relative w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden border-8 border-gray-800"
            style={{
              boxShadow:
                device === "mobile"
                  ? "0 0 0 14px #1f2937, 0 0 0 16px #374151, 0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  : device === "tablet"
                  ? "0 0 0 12px #1f2937, 0 0 0 14px #374151, 0 20px 40px -12px rgba(0, 0, 0, 0.4)"
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <iframe
              srcDoc={decodedCode}
              className="w-full h-full border-0 bg-white"
              style={{
                minHeight: getDeviceHeight(),
                height: "100%",
                display: "block",
              }}
              sandbox="allow-scripts allow-same-origin allow-forms"
              title="Custom Form Preview"
            />
          </div>
        </div>
      );
    }

    if (type === "modal") {
      return (
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
          {formData.name && (
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {formData.name}
            </h2>
          )}
          {formData.description && (
            <p className="text-gray-600 mb-6">{formData.description}</p>
          )}
          <div className="space-y-4">
            {formData.fields?.map((field) => renderField(field))}
          </div>
          <div className="mt-6 flex gap-3">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
              disabled
            >
              {formData.submitText || "Submit"}
            </button>
            <button
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium"
              disabled
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }

    if (type === "popup") {
      return (
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto relative">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
          {formData.name && (
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {formData.name}
            </h3>
          )}
          {formData.content && (
            <div
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            />
          )}
          <div className="space-y-3">
            {formData.fields?.map((field) => renderField(field))}
          </div>
          {formData.buttonText && (
            <button
              className="mt-4 w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
              disabled
            >
              {formData.buttonText}
            </button>
          )}
        </div>
      );
    }

    // Default form preview
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
        {formData.name && (
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {formData.name}
          </h2>
        )}
        {formData.description && (
          <p className="text-gray-600 mb-6">{formData.description}</p>
        )}
        <form className="space-y-4">
          {formData.fields?.map((field) => renderField(field))}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              disabled
            >
              {formData.submitText || "Submit"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full flex flex-col overflow-hidden transition-all duration-300 ${
          isPreviewFullscreen
            ? "max-w-full h-full m-0 rounded-none"
            : "max-w-7xl max-h-[95vh]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b bg-gradient-to-r from-gray-50 to-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-3xl">👁️</span>
              Live Preview
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {formData.type === "custom"
                ? "Custom HTML Form"
                : `${type.charAt(0).toUpperCase() + type.slice(1)} Preview`}
              {formData.name && (
                <span className="font-medium"> - {formData.name}</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Device Selector */}
            <div className="flex gap-1 bg-gray-100 p-1.5 rounded-xl shadow-inner">
              <button
                onClick={() => setDevice("desktop")}
                className={`px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  device === "desktop"
                    ? "bg-white shadow-md text-blue-600 scale-105"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                title="Desktop View"
              >
                <FiMonitor size={18} />
                <span className="text-sm font-medium hidden md:inline">
                  Desktop
                </span>
              </button>
              <button
                onClick={() => setDevice("tablet")}
                className={`px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  device === "tablet"
                    ? "bg-white shadow-md text-blue-600 scale-105"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                title="Tablet View"
              >
                <FiTablet size={18} />
                <span className="text-sm font-medium hidden md:inline">
                  Tablet
                </span>
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  device === "mobile"
                    ? "bg-white shadow-md text-blue-600 scale-105"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                title="Mobile View"
              >
                <FiSmartphone size={18} />
                <span className="text-sm font-medium hidden md:inline">
                  Mobile
                </span>
              </button>
            </div>

            {/* Fullscreen and Close Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
                className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title={
                  isPreviewFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                }
              >
                <FiMaximize2 size={20} />
              </button>
              <button
                onClick={() => {
                  onClose();
                  setIsPreviewFullscreen(false);
                }}
                className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title="Close Preview"
              >
                <FiX size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-8">
          <div
            className={`transition-all duration-500 ease-in-out ${getDeviceWidth()} mx-auto`}
            style={{
              transform: device === "mobile" ? "scale(0.95)" : "scale(1)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {renderPreview()}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div
              className={`w-2 h-2 rounded-full ${
                device === "desktop"
                  ? "bg-blue-500"
                  : device === "tablet"
                  ? "bg-purple-500"
                  : "bg-green-500"
              } animate-pulse`}
            ></div>
            <span className="font-medium">
              {device === "desktop"
                ? "1200px"
                : device === "tablet"
                ? "768px"
                : "375px"}{" "}
              viewport
            </span>
          </div>
          <p className="text-xs text-gray-500 italic">
            This is a preview only. Actual appearance may vary based on your
            website's styling.
          </p>
        </div>
      </div>
    </div>
  );
}
