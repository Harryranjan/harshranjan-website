export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) {
  const baseClasses = "inline-flex items-center font-medium rounded-full";

  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-cyan-100 text-cyan-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800",

    // Status variants
    draft: "bg-gray-100 text-gray-800",
    published: "bg-green-100 text-green-800",
    archived: "bg-yellow-100 text-yellow-800",
    active: "bg-green-100 text-green-800",
    inactive: "bg-red-100 text-red-800",
  };

  const sizeClasses = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-3.5 py-1.5 text-sm",
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
