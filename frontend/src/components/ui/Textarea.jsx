import React from 'react';

export default function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  rows = 4,
  maxLength,
  helperText,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && '*'}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`w-full border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-gray-500 text-sm mt-1">{helperText}</p>
      )}
      {maxLength && value && (
        <p className="text-gray-500 text-sm mt-1">
          {value.length}/{maxLength} characters
        </p>
      )}
    </div>
  );
}
