/**
 * StatsCards Component
 * Reusable statistics cards with icons, counts, and trend indicators
 *
 * @param {Array} stats - Array of stat objects with:
 *   - label: string - Card label
 *   - value: string|number - Primary value to display
 *   - icon: string - SVG path data or predefined icon name
 *   - color: string - Color theme (blue, green, yellow, red, purple, indigo, gray)
 *   - subtext: string (optional) - Additional text below value
 *   - trend: object (optional) - { value: number, isPositive: boolean, label: string }
 *   - loading: boolean (optional) - Show loading state
 *   - onClick: function (optional) - Click handler
 *   - customIcon: ReactNode (optional) - Custom icon component
 * @param {number} columns - Number of columns (2, 3, or 4)
 * @param {boolean} loading - Global loading state for all cards
 */
export default function StatsCards({
  stats = [],
  columns = 3,
  loading = false,
}) {
  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        hover: "hover:bg-blue-50",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-600",
        hover: "hover:bg-green-50",
      },
      yellow: {
        bg: "bg-yellow-100",
        text: "text-yellow-600",
        hover: "hover:bg-yellow-50",
      },
      red: {
        bg: "bg-red-100",
        text: "text-red-600",
        hover: "hover:bg-red-50",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        hover: "hover:bg-purple-50",
      },
      indigo: {
        bg: "bg-indigo-100",
        text: "text-indigo-600",
        hover: "hover:bg-indigo-50",
      },
      gray: {
        bg: "bg-gray-100",
        text: "text-gray-600",
        hover: "hover:bg-gray-50",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  const gridColsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  const renderTrendIndicator = (trend) => {
    if (!trend) return null;

    const trendColor = trend.isPositive ? "text-green-600" : "text-red-600";
    const trendBg = trend.isPositive ? "bg-green-50" : "bg-red-50";
    const trendIcon = trend.isPositive ? (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    );

    return (
      <div
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${trendBg} ${trendColor} text-xs font-medium mt-2`}
      >
        {trendIcon}
        <span>{trend.value}%</span>
        {trend.label && <span className="text-gray-600">{trend.label}</span>}
      </div>
    );
  };

  const renderLoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
          <div className="h-8 bg-gray-300 rounded w-20"></div>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div
      className={`grid grid-cols-1 ${
        gridColsClass[columns] || gridColsClass[3]
      } gap-6 mb-6`}
    >
      {loading
        ? Array.from({ length: columns }).map((_, index) => (
            <div key={index}>{renderLoadingSkeleton()}</div>
          ))
        : stats.map((stat, index) => {
            const colors = getColorClasses(stat.color);
            const isClickable = !!stat.onClick;
            const isLoading = stat.loading;

            if (isLoading) {
              return <div key={index}>{renderLoadingSkeleton()}</div>;
            }

            return (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-sm p-6 transition-all duration-200 ${
                  isClickable
                    ? `cursor-pointer ${colors.hover} hover:shadow-md`
                    : ""
                }`}
                onClick={stat.onClick}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={
                  isClickable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          stat.onClick();
                        }
                      }
                    : undefined
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                    {stat.subtext && (
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.subtext}
                      </p>
                    )}
                    {renderTrendIndicator(stat.trend)}
                  </div>
                  <div
                    className={`${colors.bg} p-3 rounded-full flex-shrink-0`}
                  >
                    {stat.customIcon ? (
                      stat.customIcon
                    ) : (
                      <svg
                        className={`w-6 h-6 ${colors.text}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={stat.icon}
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
}
