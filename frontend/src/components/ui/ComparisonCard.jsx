import React from "react";

/**
 * ComparisonCard - Side-by-side comparison component
 *
 * @param {Object} before - Before state {title, value, icon, details}
 * @param {Object} after - After state {title, value, icon, details}
 * @param {string} metric - What's being compared (e.g., "Time", "Cost")
 * @param {boolean} showDetails - Show detailed breakdown
 * @param {string} color - Color theme
 */
const ComparisonCard = ({
  before,
  after,
  metric = "Comparison",
  showDetails = true,
  color = "default",
  className = "",
}) => {
  return (
    <div
      className={`bg-gradient-to-r from-red-50 to-green-50 rounded-lg p-6 ${className}`}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
        {metric}
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Before State */}
        <div className="text-center p-6 bg-white rounded-lg border-2 border-red-200">
          <div className="text-4xl mb-2">{before.icon || "👤"}</div>
          <h4 className="font-bold text-gray-900 mb-2">
            {before.title || "Before"}
          </h4>
          <div className="text-3xl font-bold text-red-600 mb-1">
            {before.value}
          </div>
          {before.subtitle && (
            <div className="text-lg font-semibold text-red-600">
              {before.subtitle}
            </div>
          )}
          {showDetails && before.details && (
            <ul className="text-sm text-gray-600 mt-4 space-y-1 text-left">
              {before.details.map((detail, index) => (
                <li key={index}>• {detail}</li>
              ))}
            </ul>
          )}
        </div>

        {/* After State */}
        <div className="text-center p-6 bg-white rounded-lg border-2 border-green-200">
          <div className="text-4xl mb-2">{after.icon || "🤖"}</div>
          <h4 className="font-bold text-gray-900 mb-2">
            {after.title || "After"}
          </h4>
          <div className="text-3xl font-bold text-green-600 mb-1">
            {after.value}
          </div>
          {after.subtitle && (
            <div className="text-lg font-semibold text-green-600">
              {after.subtitle}
            </div>
          )}
          {showDetails && after.details && (
            <ul className="text-sm text-gray-600 mt-4 space-y-1 text-left">
              {after.details.map((detail, index) => (
                <li key={index}>✓ {detail}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * SavingsDisplay - Shows calculated savings
 */
export const SavingsDisplay = ({
  savings,
  period = "month",
  additionalInfo,
  className = "",
}) => {
  return (
    <div
      className={`mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center ${className}`}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        💰 Potential Savings
      </h3>
      {additionalInfo && <p className="text-gray-700 mb-4">{additionalInfo}</p>}
      <div className="text-4xl font-bold text-green-600 mb-2">
        ${typeof savings === "number" ? savings.toLocaleString() : savings}/
        {period}
      </div>
      {additionalInfo && additionalInfo.hours && (
        <p className="text-lg text-gray-700">
          Plus <span className="font-bold">{additionalInfo.hours} hours</span>{" "}
          freed up
        </p>
      )}
    </div>
  );
};

export default ComparisonCard;
