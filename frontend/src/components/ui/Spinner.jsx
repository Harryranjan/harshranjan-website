export default function Spinner({ size = "md", color = "blue" }) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const colors = {
    blue: "border-blue-600",
    white: "border-white",
    gray: "border-gray-600",
    green: "border-green-600",
  };

  return (
    <div
      className={`animate-spin rounded-full border-b-2 ${sizes[size]} ${colors[color]}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
