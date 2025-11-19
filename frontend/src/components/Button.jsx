import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      icon,
      iconPosition = "left",
      className = "",
      type = "button",
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      success:
        "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      warning:
        "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
      outline:
        "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
      link: "text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline focus:ring-blue-500",
    };

    const sizeClasses = {
      xs: "px-2.5 py-1.5 text-xs",
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-5 py-3 text-base",
      xl: "px-6 py-3.5 text-lg",
    };

    const iconSizeClasses = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-4 h-4",
      lg: "w-5 h-5",
      xl: "w-6 h-6",
    };

    const iconSpacingClasses = {
      left: icon ? "mr-2" : "",
      right: icon ? "ml-2" : "",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {loading && iconPosition === "left" && (
          <svg
            className={`animate-spin ${iconSizeClasses[size]} ${iconSpacingClasses.left}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {icon && !loading && iconPosition === "left" && (
          <span
            className={`${iconSizeClasses[size]} ${iconSpacingClasses.left}`}
          >
            {icon}
          </span>
        )}
        {children}
        {icon && !loading && iconPosition === "right" && (
          <span
            className={`${iconSizeClasses[size]} ${iconSpacingClasses.right}`}
          >
            {icon}
          </span>
        )}
        {loading && iconPosition === "right" && (
          <svg
            className={`animate-spin ${iconSizeClasses[size]} ${iconSpacingClasses.right}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
