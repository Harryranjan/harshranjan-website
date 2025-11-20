import PropTypes from "prop-types";
import Button from "./Button";
import {
  FiInbox,
  FiFileText,
  FiImage,
  FiUsers,
  FiFolder,
  FiAlertCircle,
} from "react-icons/fi";

/**
 * EmptyState - Reusable empty state component
 * Shows friendly message when no data is available
 *
 * @param {string} icon - Icon name (inbox, file, image, users, folder, alert)
 * @param {ReactNode} customIcon - Custom icon component (overrides icon)
 * @param {string} title - Main heading
 * @param {string} message - Description message
 * @param {string} actionText - Primary action button text
 * @param {function} onAction - Primary action button click handler
 * @param {string} actionVariant - Button variant (default: "primary")
 * @param {ReactNode} secondaryAction - Additional action button
 * @param {string} className - Additional CSS classes
 *
 * @deprecated Legacy props (description, action) still supported for backward compatibility
 */
export default function EmptyState({
  icon = "inbox",
  customIcon,
  title = "No items found",
  message,
  description, // Legacy prop
  actionText,
  onAction,
  action, // Legacy prop
  actionVariant = "primary",
  secondaryAction,
  className = "",
}) {
  const iconMap = {
    inbox: FiInbox,
    file: FiFileText,
    image: FiImage,
    users: FiUsers,
    folder: FiFolder,
    alert: FiAlertCircle,
  };

  const IconComponent = customIcon || iconMap[icon] || FiInbox;

  // Support legacy props
  const displayMessage = message || description;
  const displayAction = action;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center ${className}`}
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        {typeof IconComponent === "function" ? (
          <IconComponent className="w-16 h-16 text-gray-400" />
        ) : (
          IconComponent
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      {/* Message */}
      {displayMessage && (
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{displayMessage}</p>
      )}

      {/* Actions */}
      {(actionText || secondaryAction || displayAction) && (
        <div className="flex items-center justify-center gap-3">
          {actionText && onAction && (
            <Button variant={actionVariant} onClick={onAction}>
              {actionText}
            </Button>
          )}
          {secondaryAction}
          {displayAction && <div>{displayAction}</div>}
        </div>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.oneOf(["inbox", "file", "image", "users", "folder", "alert"]),
  customIcon: PropTypes.node,
  title: PropTypes.string,
  message: PropTypes.string,
  description: PropTypes.string, // Legacy
  actionText: PropTypes.string,
  onAction: PropTypes.func,
  action: PropTypes.node, // Legacy
  actionVariant: PropTypes.string,
  secondaryAction: PropTypes.node,
  className: PropTypes.string,
};
