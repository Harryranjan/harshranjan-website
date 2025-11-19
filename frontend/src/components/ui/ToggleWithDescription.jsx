import PropTypes from 'prop-types';

/**
 * ToggleWithDescription - Checkbox toggle with label and description
 * 
 * @param {boolean} checked - Checked state
 * @param {function} onChange - Change handler
 * @param {string} label - Main label text
 * @param {string} description - Optional description text
 * @param {boolean} disabled - Disabled state
 * @param {string} variant - Style variant (default, highlighted)
 * @param {string} className - Additional CSS classes
 */
export default function ToggleWithDescription({ 
  checked, 
  onChange, 
  label, 
  description,
  disabled = false,
  variant = 'default',
  className = '' 
}) {
  const wrapperStyles = {
    default: 'flex items-center gap-3',
    highlighted: 'flex items-center gap-3 p-4 bg-gray-50 rounded-lg'
  };

  return (
    <div className={`${wrapperStyles[variant]} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <div className="flex-1">
        <label className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
          {label}
        </label>
        {description && (
          <p className={`text-xs ${disabled ? 'text-gray-400' : 'text-gray-600'} mt-0.5`}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

ToggleWithDescription.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'highlighted']),
  className: PropTypes.string
};
