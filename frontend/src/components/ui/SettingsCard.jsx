import PropTypes from "prop-types";

/**
 * SettingsCard - Reusable card container for settings sections
 *
 * @param {string} title - Card title
 * @param {string} subtitle - Optional subtitle/description
 * @param {ReactNode} children - Card content
 * @param {ReactNode} footer - Optional footer content
 * @param {string} className - Additional CSS classes
 */
export default function SettingsCard({
  title,
  subtitle,
  children,
  footer,
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="p-6 border-b">
          {title && (
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          )}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Content */}
      {children && <div className="p-6">{children}</div>}

      {/* Footer */}
      {footer && <div className="p-6 border-t bg-gray-50">{footer}</div>}
    </div>
  );
}

SettingsCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
};
