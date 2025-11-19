import { useState } from "react";
import PropTypes from "prop-types";
import { FiEye, FiEyeOff } from "react-icons/fi";

/**
 * PasswordInput - Input field with show/hide password toggle
 *
 * @param {string} label - Input label
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {string} hint - Optional hint text below input
 * @param {boolean} required - Required field
 * @param {string} error - Error message
 * @param {string} className - Additional CSS classes
 */
export default function PasswordInput({
  label,
  value,
  onChange,
  placeholder = "••••••••••••",
  hint,
  required = false,
  error,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-2.5 pr-12 text-sm text-gray-900 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 ${
            error ? "border-red-300" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          tabIndex={-1}
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>
      {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

PasswordInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
};
