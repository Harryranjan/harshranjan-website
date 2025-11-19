import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = "",
      containerClassName = "",
      type = "text",
      required = false,
      ...props
    },
    ref
  ) => {
    const baseInputClasses =
      "w-full px-4 py-2.5 text-sm text-gray-900 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-colors";
    const errorClasses = error
      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
      : "border-gray-300 focus:border-blue-500 focus:ring-blue-200";
    const iconPaddingClasses = leftIcon ? "pl-10" : rightIcon ? "pr-10" : "";

    return (
      <div className={containerClassName}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={type}
            className={`${baseInputClasses} ${errorClasses} ${iconPaddingClasses} ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

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

Input.displayName = "Input";

export default Input;
