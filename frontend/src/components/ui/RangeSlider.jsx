import React from "react";

/**
 * RangeSlider - Reusable slider input with live value display
 *
 * @param {string} label - Label text above slider
 * @param {number} value - Current value
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} step - Step increment (default: 1)
 * @param {function} onChange - Callback when value changes
 * @param {string} prefix - Prefix for value display (e.g., '$')
 * @param {string} suffix - Suffix for value display (e.g., 'h', '%')
 * @param {string} color - Accent color (blue, green, purple, orange)
 * @param {boolean} showMinMax - Show min/max labels (default: true)
 */
const RangeSlider = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  prefix = "",
  suffix = "",
  color = "blue",
  showMinMax = true,
  className = "",
}) => {
  const colorClasses = {
    blue: "accent-blue-600",
    green: "accent-green-600",
    purple: "accent-purple-600",
    orange: "accent-orange-600",
    red: "accent-red-600",
  };

  const textColorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
    red: "text-red-600",
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {label}
        </label>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${colorClasses[color]}`}
      />
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        {showMinMax && (
          <span>
            {prefix}
            {min}
            {suffix}
          </span>
        )}
        <span className={`font-bold text-2xl ${textColorClasses[color]}`}>
          {prefix}
          {value}
          {suffix}
        </span>
        {showMinMax && (
          <span>
            {prefix}
            {max}
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default RangeSlider;
