import { forwardRef } from "react";

const Textarea = forwardRef(
  (
    {
      label,
      error,
      helperText,
      className = "",
      containerClassName = "",
      required = false,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "w-full px-4 py-2.5 text-sm text-gray-900 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-vertical";
    const errorClasses = error
      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
      : "border-gray-300 focus:border-blue-500 focus:ring-blue-200";

    return (
      <div className={containerClassName}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          rows={rows}
          className={`${baseClasses} ${errorClasses} ${className}`}
          {...props}
        />

        {/* Helper Text or Error */}
        {(helperText || error) && (
          <p
            className={`text-sm mt-1.5 ${
              error ? "text-red-600" : "text-gray-500"
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
