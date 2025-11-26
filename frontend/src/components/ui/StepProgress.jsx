import React from "react";

/**
 * StepProgress - Animated step-by-step progress indicator
 *
 * @param {Array} steps - Array of steps {title, description, icon, time}
 * @param {number} currentStep - Currently active step (0-based)
 * @param {boolean} showTime - Display time estimate per step
 * @param {string} orientation - 'vertical' or 'horizontal'
 * @param {string} color - Accent color
 */
const StepProgress = ({
  steps = [],
  currentStep = 0,
  showTime = true,
  orientation = "vertical",
  color = "blue",
  className = "",
}) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-600",
      text: "text-blue-600",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-600",
      text: "text-green-600",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-600",
      text: "text-purple-600",
    },
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-600",
      text: "text-orange-600",
    },
  };

  const colors = colorClasses[color];

  if (orientation === "horizontal") {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
                    isActive
                      ? `${colors.bg} ${colors.border} border-2 animate-pulse`
                      : isCompleted
                      ? "bg-green-100 border-2 border-green-600"
                      : "bg-gray-100 border-2 border-gray-300"
                  }`}
                >
                  {isCompleted ? "✓" : step.icon}
                </div>
                <div className="text-center mt-2 max-w-[100px]">
                  <div className="text-xs font-semibold text-gray-900 truncate">
                    {step.title}
                  </div>
                  {showTime && step.time && (
                    <div className={`text-xs ${colors.text} mt-1`}>
                      {step.time}
                    </div>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-all ${
                    isCompleted ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // Vertical orientation
  return (
    <div className={`space-y-4 ${className}`}>
      {steps.map((step, index) => {
        const isActive = currentStep === index;
        const isCompleted = currentStep > index;

        return (
          <div key={index}>
            <div
              className={`p-6 rounded-lg border-2 transition-all duration-500 ${
                isActive
                  ? `${colors.border} ${colors.bg} shadow-lg scale-105`
                  : isCompleted
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    isActive
                      ? `${colors.bg} animate-pulse`
                      : isCompleted
                      ? "bg-green-100"
                      : "bg-gray-100"
                  }`}
                >
                  {isCompleted ? "✓" : step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {index + 1}. {step.title}
                    </h3>
                    {showTime && step.time && (
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          isActive ? colors.bg : "bg-gray-100"
                        } ${isActive ? colors.text : "text-gray-600"}`}
                      >
                        {step.time}
                      </span>
                    )}
                  </div>
                  {step.description && (
                    <p className="text-gray-600">{step.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Arrow between steps */}
            {index < steps.length - 1 && (
              <div className="flex justify-center py-2">
                <div
                  className={`text-2xl transition-all duration-300 ${
                    isCompleted
                      ? `${colors.text} animate-bounce`
                      : "text-gray-300"
                  }`}
                >
                  ↓
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;
