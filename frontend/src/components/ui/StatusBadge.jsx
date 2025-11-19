import PropTypes from 'prop-types';

/**
 * StatusBadge - Display status as badge or alert box
 * 
 * @param {string} status - Status text or preset (published, draft, active, inactive, etc.)
 * @param {string} variant - Color variant (success, warning, error, info, default)
 * @param {string} type - Display type (badge, alert)
 * @param {ReactNode} icon - Optional icon (for alert type)
 * @param {string} title - Title for alert type
 * @param {string} subtitle - Subtitle for alert type
 * @param {string} className - Additional CSS classes
 */
export default function StatusBadge({ 
  status, 
  variant, 
  type = 'badge',
  icon,
  title,
  subtitle,
  className = '' 
}) {
  // Preset status configurations
  const statusConfig = {
    published: { label: "Published", variant: "success" },
    scheduled: { label: "Scheduled", variant: "info" },
    draft: { label: "Draft", variant: "warning" },
    active: { label: "Active", variant: "success" },
    inactive: { label: "Inactive", variant: "error" },
    pending: { label: "Pending", variant: "warning" },
  };

  // Use preset or custom
  const config = statusConfig[status] || { 
    label: title || status, 
    variant: variant || "default" 
  };
  const finalVariant = variant || config.variant;

  // Badge styles
  const badgeVariants = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
    error: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800",
  };

  // Alert styles
  const alertBgStyles = {
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
    default: 'bg-gray-50 border-gray-200'
  };

  const alertIconStyles = {
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-blue-600',
    default: 'text-gray-600'
  };

  const alertTitleStyles = {
    success: 'text-green-900',
    warning: 'text-yellow-900',
    error: 'text-red-900',
    info: 'text-blue-900',
    default: 'text-gray-900'
  };

  const alertSubtitleStyles = {
    success: 'text-green-700',
    warning: 'text-yellow-700',
    error: 'text-red-700',
    info: 'text-blue-700',
    default: 'text-gray-700'
  };

  // Render as badge (compact pill)
  if (type === 'badge') {
    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          badgeVariants[finalVariant]
        } ${className}`}
      >
        {config.label}
      </span>
    );
  }

  // Render as alert box (for status cards)
  return (
    <div className={`p-4 rounded-lg border-2 ${alertBgStyles[finalVariant]} ${className}`}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className={`w-6 h-6 flex-shrink-0 ${alertIconStyles[finalVariant]}`}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <p className={`font-semibold ${alertTitleStyles[finalVariant]}`}>
            {title || config.label}
          </p>
          {subtitle && (
            <p className={`text-sm ${alertSubtitleStyles[finalVariant]} mt-0.5`}>{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'default']),
  type: PropTypes.oneOf(['badge', 'alert']),
  icon: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string
};
