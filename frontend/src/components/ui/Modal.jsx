import React, { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  type = "success", // 'success', 'error', 'warning', 'info'
  autoClose = true,
  autoCloseDuration = 2000,
}) {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDuration, onClose]);

  if (!isOpen) return null;

  const typeStyles = {
    success: {
      icon: "✓",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      titleColor: "text-green-800",
      messageColor: "text-green-700",
    },
    error: {
      icon: "✕",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      titleColor: "text-red-800",
      messageColor: "text-red-700",
    },
    warning: {
      icon: "⚠",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      titleColor: "text-yellow-800",
      messageColor: "text-yellow-700",
    },
    info: {
      icon: "ℹ",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      titleColor: "text-blue-800",
      messageColor: "text-blue-700",
    },
  };

  const style = typeStyles[type] || typeStyles.success;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 animate-modal-slide-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`${style.bgColor} px-6 py-8 rounded-2xl`}>
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div
                className={`${style.iconBg} rounded-full p-3 w-16 h-16 flex items-center justify-center`}
              >
                <span className={`${style.iconColor} text-3xl font-bold`}>
                  {style.icon}
                </span>
              </div>
            </div>

            {/* Title */}
            {title && (
              <h3
                className={`text-xl font-semibold text-center mb-2 ${style.titleColor}`}
              >
                {title}
              </h3>
            )}

            {/* Message */}
            {message && (
              <p className={`text-center ${style.messageColor} mb-6`}>
                {message}
              </p>
            )}

            {/* Close Button */}
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className={`px-6 py-2.5 ${style.iconColor} ${
                  style.iconBg
                } hover:opacity-80 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  type === "success"
                    ? "focus:ring-green-500"
                    : type === "error"
                    ? "focus:ring-red-500"
                    : type === "warning"
                    ? "focus:ring-yellow-500"
                    : "focus:ring-blue-500"
                }`}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
