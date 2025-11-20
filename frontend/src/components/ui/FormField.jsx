import PropTypes from "prop-types";

/**
 * FormField - Wrapper component for consistent form field layout
 * Handles label, error, helper text, and spacing automatically
 *
 * @param {string} label - Field label
 * @param {boolean} required - Shows required asterisk
 * @param {string} error - Error message
 * @param {string} helperText - Helper text below field
 * @param {ReactNode} children - Form input element
 * @param {string} htmlFor - Label's htmlFor attribute
 * @param {string} className - Additional CSS classes
 */
export default function FormField({
  label,
  required = false,
  error,
  helperText,
  children,
  htmlFor,
  className = "",
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <div>{children}</div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
};
