import PropTypes from "prop-types";

/**
 * PageHeader - Consistent page header with title, description, and actions
 * Provides standard layout for admin page headers
 *
 * @param {string} title - Page title
 * @param {string} description - Optional page description
 * @param {ReactNode} actions - Action buttons (right side)
 * @param {ReactNode} backButton - Optional back button (renders above header)
 * @param {ReactNode} tabs - Optional tab navigation
 * @param {ReactNode} breadcrumbs - Optional breadcrumb navigation
 * @param {string} className - Additional CSS classes
 */
export default function PageHeader({
  title,
  description,
  actions,
  backButton,
  tabs,
  breadcrumbs,
  className = "",
}) {
  return (
    <div className={className}>
      {/* Back Button */}
      {backButton && <div className="mb-4">{backButton}</div>}

      {/* Breadcrumbs */}
      {breadcrumbs && <div className="mb-4">{breadcrumbs}</div>}

      {/* Main Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Title & Description */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="text-gray-600 mt-2 max-w-3xl">{description}</p>
          )}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-3 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>

      {/* Tabs */}
      {tabs && <div className="mb-6">{tabs}</div>}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actions: PropTypes.node,
  backButton: PropTypes.node,
  tabs: PropTypes.node,
  breadcrumbs: PropTypes.node,
  className: PropTypes.string,
};
