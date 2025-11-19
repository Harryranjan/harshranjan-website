import { useState, useEffect, useRef } from "react";

export default function SelectWithSearch({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select or type to search...",
  error,
  helperText,
  allowCustom = false,
  displayKey = "label",
  valueKey = "value",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) => {
        const displayValue =
          typeof option === "string" ? option : option[displayKey];
        return displayValue.toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [searchQuery, options, displayKey]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    const selectedValue =
      typeof option === "string" ? option : option[valueKey];
    onChange(selectedValue);
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    setIsOpen(true);

    if (allowCustom) {
      onChange(newValue);
    }
  };

  const getDisplayValue = () => {
    if (!value) return "";

    const matchingOption = options.find((opt) => {
      const optValue = typeof opt === "string" ? opt : opt[valueKey];
      return optValue === value;
    });

    if (matchingOption) {
      return typeof matchingOption === "string"
        ? matchingOption
        : matchingOption[displayKey];
    }

    return value;
  };

  return (
    <div className="space-y-2" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={isOpen ? searchQuery : getDisplayValue()}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition"
          >
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const displayValue =
                  typeof option === "string" ? option : option[displayKey];
                const optionValue =
                  typeof option === "string" ? option : option[valueKey];
                const isSelected = optionValue === value;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition flex items-center justify-between ${
                      isSelected ? "bg-blue-100 text-blue-700" : "text-gray-700"
                    }`}
                  >
                    <span>{displayValue}</span>
                    {isSelected && (
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {allowCustom ? (
                  <span>
                    No matches found. Press Enter to use "{searchQuery}"
                  </span>
                ) : (
                  <span>No options found</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
