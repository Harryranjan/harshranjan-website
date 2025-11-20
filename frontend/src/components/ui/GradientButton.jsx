import React from "react";

/**
 * GradientButton - A beautiful gradient button component
 * 
 * @param {string} type - Button type (button, submit, reset)
 * @param {boolean} disabled - Whether the button is disabled
 * @param {boolean} loading - Whether to show loading state
 * @param {ReactNode} icon - Icon to display alongside text
 * @param {ReactNode} children - Button text/content
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 * @param {string} size - Button size (sm, md, lg)
 * @param {string} variant - Color variant (blue-purple, green, red, orange)
 */
export default function GradientButton({
  type = "button",
  disabled = false,
  loading = false,
  icon,
  children,
  onClick,
  className = "",
  size = "md",
  variant = "blue-purple",
}) {
  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-5",
    lg: "py-4 px-6 text-lg",
  };

  const variantClasses = {
    "blue-purple": "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
    green: "from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
    red: "from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700",
    orange: "from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700",
    indigo: "from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        w-full bg-gradient-to-r ${variantClasses[variant]}
        text-white font-semibold ${sizeClasses[size]}
        rounded-lg flex items-center justify-center gap-2
        transition-all transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        shadow-md hover:shadow-lg
        ${className}
      `}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
