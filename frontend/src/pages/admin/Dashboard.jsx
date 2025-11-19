import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = [
    {
      label: "Total Blog Posts",
      value: "0",
      change: "+0%",
      icon: "📝",
      color: "blue",
    },
    {
      label: "Portfolio Items",
      value: "0",
      change: "+0%",
      icon: "💼",
      color: "green",
    },
    {
      label: "Page Views (Month)",
      value: "0",
      change: "+0%",
      icon: "👁️",
      color: "purple",
    },
    {
      label: "Contact Messages",
      value: "0",
      change: "+0",
      icon: "✉️",
      color: "orange",
    },
  ];

  const recentActivity = [
    { action: "System initialized", time: "Just now", type: "info" },
  ];

  const quickActions = [
    {
      title: "Create New Blog Post",
      icon: "📝",
      path: "/admin/blog/new",
      color: "blue",
    },
    {
      title: "Add Portfolio Item",
      icon: "💼",
      path: "/admin/portfolio/new",
      color: "green",
    },
    {
      title: "Upload Media",
      icon: "🖼️",
      path: "/admin/media",
      color: "purple",
    },
    {
      title: "Create Landing Page",
      icon: "🚀",
      path: "/admin/landing-pages/new",
      color: "orange",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Admin Panel</title>
      </Helmet>

      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your website.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <span
                  className={`text-sm font-medium text-${stat.color}-600 bg-${stat.color}-50 px-2 py-1 rounded`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl mb-3 block">{action.icon}</span>
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">System Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Database</span>
                  <span className="flex items-center text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Backend API</span>
                  <span className="flex items-center text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Running
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Storage</span>
                  <span className="flex items-center text-green-600">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
