import { useEffect, useState } from "react";

/**
 * AutoSaveIndicator Component
 * Shows auto-save status with countdown and last saved time
 * 
 * @param {boolean} enabled - Whether auto-save is enabled
 * @param {boolean} saving - Whether currently saving
 * @param {Date|string} lastSaved - Last saved timestamp
 * @param {number} interval - Auto-save interval in seconds (default: 30)
 * @param {string} variant - Visual variant: "inline" or "badge"
 */
export default function AutoSaveIndicator({
  enabled = false,
  saving = false,
  lastSaved = null,
  interval = 30,
  variant = "inline",
}) {
  const [countdown, setCountdown] = useState(interval);

  useEffect(() => {
    if (!enabled || saving) return;

    setCountdown(interval);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return interval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [enabled, saving, interval, lastSaved]);

  const formatLastSaved = () => {
    if (!lastSaved) return "";
    const date = new Date(lastSaved);
    const now = new Date();
    const diffSeconds = Math.floor((now - date) / 1000);

    if (diffSeconds < 60) return "just now";
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
    return date.toLocaleString();
  };

  if (!enabled) return null;

  const renderContent = () => {
    if (saving) {
      return (
        <>
          <svg
            className="animate-spin h-4 w-4 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-sm text-gray-600">Saving...</span>
        </>
      );
    }

    if (lastSaved) {
      return (
        <>
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm text-gray-600">
            Saved {formatLastSaved()}
          </span>
          <span className="text-xs text-gray-400">
            • Next save in {countdown}s
          </span>
        </>
      );
    }

    return (
      <>
        <svg
          className="w-4 h-4 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sm text-gray-600">
          Auto-save enabled • Saving in {countdown}s
        </span>
      </>
    );
  };

  if (variant === "badge") {
    return (
      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
        {renderContent()}
      </div>
    );
  }

  // Inline variant (default)
  return (
    <div className="flex items-center gap-2">
      {renderContent()}
    </div>
  );
}
