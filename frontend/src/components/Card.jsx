export default function Card({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  className = "",
  padding = true,
  hover = false,
  ...props
}) {
  const baseClasses = "bg-white rounded-lg border border-gray-200 shadow-sm";
  const hoverClasses = hover
    ? "hover:shadow-md transition-shadow duration-200"
    : "";
  const paddingClasses = padding ? "p-6" : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {/* Header */}
      {(title || subtitle || headerAction) && (
        <div
          className={`${
            padding ? "px-6 pt-6 pb-4" : "p-6"
          } border-b border-gray-200`}
        >
          <div className="flex items-start justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
            {headerAction && <div className="ml-4">{headerAction}</div>}
          </div>
        </div>
      )}

      {/* Content */}
      <div className={paddingClasses}>{children}</div>

      {/* Footer */}
      {footer && (
        <div
          className={`${
            padding ? "px-6 pb-6 pt-4" : "p-6"
          } border-t border-gray-200 bg-gray-50 rounded-b-lg`}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
