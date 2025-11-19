/**
 * StatsCards Component
 * Reusable statistics cards with icons and counts
 * 
 * @param {Array} stats - Array of stat objects with {label, value, icon, color}
 * @param {number} columns - Number of columns (2, 3, or 4)
 */
export default function StatsCards({ stats = [], columns = 3 }) {
  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-600",
      },
      yellow: {
        bg: "bg-yellow-100",
        text: "text-yellow-600",
      },
      red: {
        bg: "bg-red-100",
        text: "text-red-600",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-600",
      },
      indigo: {
        bg: "bg-indigo-100",
        text: "text-indigo-600",
      },
      gray: {
        bg: "bg-gray-100",
        text: "text-gray-600",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  const gridColsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid grid-cols-1 ${gridColsClass[columns] || gridColsClass[3]} gap-6 mb-6`}>
      {stats.map((stat, index) => {
        const colors = getColorClasses(stat.color);
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                {stat.subtext && (
                  <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
                )}
              </div>
              <div className={`${colors.bg} p-3 rounded-full`}>
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
