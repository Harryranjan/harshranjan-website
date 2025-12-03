import React from "react";

/**
 * StatDisplay Component
 * Reusable component for displaying statistics/metrics
 * Used in: Hero stats, Floating cards, Testimonials
 */
const StatDisplay = ({
  value,
  label,
  icon,
  valueColor = "gradient",
  labelColor = "gray",
  size = "medium",
  orientation = "vertical",
  className = "",
}) => {
  const sizeClasses = {
    small: { value: "text-xl", label: "text-xs" },
    medium: { value: "text-2xl", label: "text-sm" },
    large: { value: "text-3xl", label: "text-base" },
    xlarge: { value: "text-4xl", label: "text-lg" },
  };

  const valueColorClass =
    valueColor === "gradient"
      ? "gradient-text"
      : valueColor === "purple"
      ? "text-purple"
      : valueColor === "cyan"
      ? "text-cyan"
      : valueColor === "coral"
      ? "text-coral"
      : valueColor === "navy"
      ? "text-navy"
      : valueColor === "white"
      ? "text-white"
      : "text-navy";

  const labelColorClass =
    labelColor === "gray"
      ? "text-gray-400"
      : labelColor === "white"
      ? "text-gray-300"
      : "text-gray-500";

  if (orientation === "horizontal") {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {icon && (
          <div className="w-12 h-12 bg-gradient-cta rounded-lg flex items-center justify-center">
            <i className={`${icon} text-white`}></i>
          </div>
        )}
        <div>
          <div className={`${labelColorClass} ${sizeClasses[size].label}`}>
            {label}
          </div>
          <div
            className={`${valueColorClass} ${sizeClasses[size].value} font-bold`}
          >
            {value}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {icon && (
        <div className="w-12 h-12 bg-gradient-cta rounded-lg flex items-center justify-center mb-2">
          <i className={`${icon} text-white`}></i>
        </div>
      )}
      <div
        className={`${valueColorClass} ${sizeClasses[size].value} font-bold`}
      >
        {value}
      </div>
      <div className={`${labelColorClass} ${sizeClasses[size].label}`}>
        {label}
      </div>
    </div>
  );
};

export default StatDisplay;
