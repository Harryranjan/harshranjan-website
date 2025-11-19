import Modal from "./Modal";
import Button from "./Button";
import {
  FiAlertTriangle,
  FiInfo,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger", // danger, warning, info, success
  loading = false,
}) {
  const variants = {
    danger: {
      icon: FiAlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      confirmVariant: "danger",
    },
    warning: {
      icon: FiAlertCircle,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      confirmVariant: "warning",
    },
    info: {
      icon: FiInfo,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      confirmVariant: "primary",
    },
    success: {
      icon: FiCheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      confirmVariant: "success",
    },
  };

  const config = variants[variant];
  const Icon = config.icon;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      closeOnOverlayClick={!loading}
      showCloseButton={false}
    >
      <div className="text-center">
        {/* Icon */}
        <div
          className={`mx-auto flex items-center justify-center w-12 h-12 rounded-full ${config.iconBg} mb-4`}
        >
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={config.confirmVariant}
            onClick={handleConfirm}
            loading={loading}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
