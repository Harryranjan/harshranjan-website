import PropTypes from "prop-types";

/**
 * FormSection - Enhanced card container specifically for form sections
 * A specialized version of SettingsCard optimized for form layouts
 *
 * @param {string} title - Section title
 * @param {string} description - Optional section description
 * @param {ReactNode} children - Form fields content
 * @param {boolean} required - Shows required indicator on title
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} headerActions - Optional action buttons in header
 */
export default function FormSection({
  title,
  description,
  children,
  required = false,
  className = "",
  headerActions,
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      {/* Header */}
      {(title || description || headerActions) && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  {title}
                  {required && <span className="text-red-500 text-sm">*</span>}
                </h3>
              )}
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
            {headerActions && (
              <div className="ml-4 flex-shrink-0">{headerActions}</div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

FormSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  headerActions: PropTypes.node,
};
