import { useState, useEffect, useRef } from "react";

export default function MultiSelectWithSearch({
  label,
  value = [],
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
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    const selectedValue =
      typeof option === "string" ? option : option[valueKey];

    if (value.includes(selectedValue)) {
      // Remove if already selected
      onChange(value.filter((v) => v !== selectedValue));
    } else {
      // Add to selection
      onChange([...value, selectedValue]);
    }

    setSearchQuery("");
  };

  const handleRemove = (valueToRemove) => {
    onChange(value.filter((v) => v !== valueToRemove));
  };

  const handleInputKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      allowCustom &&
      searchQuery.trim() &&
      !value.includes(searchQuery.trim())
    ) {
      e.preventDefault();
      onChange([...value, searchQuery.trim()]);
      setSearchQuery("");
    }
  };

  const getDisplayValue = (val) => {
    const matchingOption = options.find((opt) => {
      const optValue = typeof opt === "string" ? opt : opt[valueKey];
      return optValue === val;
    });

    if (matchingOption) {
      return typeof matchingOption === "string"
        ? matchingOption
        : matchingOption[displayKey];
    }

    return val;
  };

  return (
    <div className="space-y-2" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Selected items display */}
        {value.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {value.map((val, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {getDisplayValue(val)}
                <button
                  type="button"
                  onClick={() => handleRemove(val)}
                  className="hover:bg-blue-200 rounded-full p-0.5 transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleInputKeyDown}
            placeholder={value.length > 0 ? "Add more..." : placeholder}
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
                const isSelected = value.includes(optionValue);

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
                    No matches found. Press Enter to add "{searchQuery}"
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
