import React from "react";

/**
 * QuickReplyButtons - Reusable button group for quick selections
 *
 * @param {Array} options - Array of options {label, value, icon}
 * @param {function} onSelect - Callback when option is selected
 * @param {string} variant - 'primary', 'secondary', 'outline'
 * @param {string} size - 'small', 'medium', 'large'
 * @param {boolean} multiSelect - Allow multiple selections (default: false)
 * @param {Array} selected - Currently selected values (for multiSelect)
 */
const QuickReplyButtons = ({
  options = [],
  onSelect,
  variant = "outline",
  size = "medium",
  multiSelect = false,
  selected = [],
  className = "",
}) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 border-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-300",
    outline: "bg-white text-blue-600 hover:bg-blue-50 border-blue-600",
    gradient:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg border-transparent",
  };

  const sizes = {
    small: "px-3 py-1.5 text-xs",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const selectedStyle = "bg-blue-600 text-white border-blue-600 shadow-md";

  const handleClick = (option) => {
    if (multiSelect) {
      const isSelected = selected.includes(option.value);
      const newSelected = isSelected
        ? selected.filter((v) => v !== option.value)
        : [...selected, option.value];
      onSelect(newSelected);
    } else {
      onSelect(option.value);
    }
  };

  const isSelected = (value) => multiSelect && selected.includes(value);

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleClick(option)}
          className={`
            border-2 rounded-lg font-semibold transition-all transform hover:scale-105
            ${isSelected(option.value) ? selectedStyle : variants[variant]}
            ${sizes[size]}
            flex items-center gap-2
          `}
        >
          {option.icon && <span>{option.icon}</span>}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickReplyButtons;
