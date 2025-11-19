import PropTypes from "prop-types";
import { FiInfo } from "react-icons/fi";

/**
 * InfoBox - Display informational message with icon
 *
 * @param {string} message - Info message to display
 * @param {ReactNode} icon - Optional custom icon (default: FiInfo)
 * @param {string} variant - Color variant (blue, green, yellow, red)
 * @param {string} className - Additional CSS classes
 */
export default function InfoBox({
  message,
  icon,
  variant = "blue",
  className = "",
}) {
  const variantStyles = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    green: "bg-green-50 border-green-200 text-green-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
    red: "bg-red-50 border-red-200 text-red-800",
    gray: "bg-gray-50 border-gray-200 text-gray-800",
  };

  const iconStyles = {
    blue: "text-blue-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
    red: "text-red-600",
    gray: "text-gray-600",
  };

  return (
    <div
      className={`p-3 border rounded-lg ${variantStyles[variant]} ${className}`}
    >
      <div className="flex gap-2">
        <div className={`flex-shrink-0 mt-0.5 ${iconStyles[variant]}`}>
          {icon || <FiInfo className="w-5 h-5" />}
        </div>
        <p className="text-xs flex-1">{message}</p>
      </div>
    </div>
  );
}

InfoBox.propTypes = {
  message: PropTypes.string.isRequired,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(["blue", "green", "yellow", "red", "gray"]),
  className: PropTypes.string,
};
