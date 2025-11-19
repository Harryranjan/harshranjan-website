import { useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiX } from "react-icons/fi";

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <FiCheckCircle className="text-green-500" size={24} />,
    error: <FiXCircle className="text-red-500" size={24} />,
    warning: <FiAlertCircle className="text-yellow-500" size={24} />,
    info: <FiAlertCircle className="text-blue-500" size={24} />,
  };

  const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200",
    info: "bg-blue-50 border-blue-200",
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-slide-in">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${bgColors[type]} min-w-[300px] max-w-md`}
      >
        {icons[type]}
        <p className="flex-1 text-sm font-medium text-gray-900">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <FiX size={18} />
        </button>
      </div>
    </div>
  );
}
