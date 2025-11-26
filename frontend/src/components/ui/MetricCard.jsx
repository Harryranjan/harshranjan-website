import React from "react";

/**
 * MetricCard - Reusable metric display card
 *
 * @param {string} label - Metric label
 * @param {string|number} value - Metric value
 * @param {string} icon - Icon emoji or component
 * @param {string} trend - Trend indicator ('+12%', '-5%', etc.)
 * @param {string} color - Card color theme
 * @param {string} subtext - Additional context text
 * @param {string} size - 'small', 'medium', 'large'
 */
const MetricCard = ({
  label,
  value,
  icon,
  trend,
  color = "blue",
  subtext,
  size = "medium",
  onClick,
  className = "",
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    pink: "from-pink-500 to-pink-600",
  };

  const sizes = {
    small: {
      padding: "p-4",
      valueText: "text-2xl",
      labelText: "text-xs",
    },
    medium: {
      padding: "p-6",
      valueText: "text-4xl",
      labelText: "text-sm",
    },
    large: {
      padding: "p-8",
      valueText: "text-5xl",
      labelText: "text-base",
    },
  };

  const sizeConfig = sizes[size];

  return (
    <div
      onClick={onClick}
      className={`
        bg-gradient-to-br ${colorClasses[color]} text-white rounded-lg shadow-lg
        ${sizeConfig.padding}
        ${
          onClick
            ? "cursor-pointer hover:shadow-2xl transform hover:scale-105"
            : ""
        }
        transition-all
        ${className}
      `}
    >
      {/* Icon */}
      {icon && (
        <div className="text-3xl mb-2 opacity-90">
          {typeof icon === "string" ? icon : icon}
        </div>
      )}

      {/* Label */}
      <div className={`${sizeConfig.labelText} font-semibold mb-2 opacity-90`}>
        {label}
      </div>

      {/* Value */}
      <div className={`${sizeConfig.valueText} font-bold mb-2`}>{value}</div>

      {/* Trend or Subtext */}
      {(trend || subtext) && (
        <div className="text-xs mt-2 opacity-90">
          {trend && (
            <span className="font-semibold">
              {trend.startsWith("+") || trend.startsWith("-") ? (
                <span
                  className={
                    trend.startsWith("+") ? "text-green-200" : "text-red-200"
                  }
                >
                  {trend}
                </span>
              ) : (
                trend
              )}
            </span>
          )}
          {trend && subtext && " • "}
          {subtext && <span>{subtext}</span>}
        </div>
      )}
    </div>
  );
};

/**
 * MetricGrid - Grid layout for multiple metric cards
 */
export const MetricGrid = ({ children, columns = 3, className = "" }) => {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${columnClasses[columns]} gap-6 ${className}`}>
      {children}
    </div>
  );
};

export default MetricCard;
