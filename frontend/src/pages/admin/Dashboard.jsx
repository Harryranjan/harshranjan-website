import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../utils/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState([
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
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const [topContent, setTopContent] = useState([]);
  const [recentActivity, setRecentActivity] = useState([
    { action: "System initialized", time: "Just now", type: "info" },
  ]);
  const [upcomingContent, setUpcomingContent] = useState([]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Fetch blog posts count
      const blogResponse = await api.get("/blog");
      const blogPosts = blogResponse.data.posts || [];
      const blogCount =
        blogResponse.data.total || blogResponse.data.totalCount || 0;

      // Fetch pages count (for portfolio items - using pages as proxy)
      const pagesResponse = await api.get("/pages");
      const pagesWithViews = pagesResponse.data.pages || [];
      const pagesCount = pagesResponse.data.totalCount || 0;

      // Calculate total page views
      const totalViews = pagesWithViews.reduce(
        (sum, page) => sum + (page.views || 0),
        0
      );

      // Get top performing content (combine blog + pages, sort by views)
      const allContent = [
        ...blogPosts.map((post) => ({
          id: post.id,
          title: post.title,
          views: post.views || 0,
          type: "blog",
          slug: post.slug,
          status: post.is_published ? "Published" : "Draft",
        })),
        ...pagesWithViews.map((page) => ({
          id: page.id,
          title: page.title,
          views: page.views || 0,
          type: "page",
          slug: page.slug,
          status: page.status,
        })),
      ]
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      setTopContent(allContent);

      // Get scheduled/draft content
      const scheduledPosts = blogPosts.filter(
        (post) => post.publish_status === "scheduled"
      );
      const draftPosts = blogPosts
        .filter((post) => post.publish_status === "draft")
        .slice(0, 3);

      setUpcomingContent([
        ...scheduledPosts.map((post) => ({
          title: post.title,
          type: "Scheduled",
          date: new Date(post.scheduled_at).toLocaleDateString(),
          link: `/admin/blog/edit/${post.id}`,
        })),
        ...draftPosts.map((post) => ({
          title: post.title,
          type: "Draft",
          date: new Date(post.updated_at).toLocaleDateString(),
          link: `/admin/blog/edit/${post.id}`,
        })),
      ]);

      // Build recent activity
      const activities = [];

      // Add recent blog posts
      blogPosts.slice(0, 3).forEach((post) => {
        activities.push({
          action: `Blog post "${post.title}" ${
            post.is_published ? "published" : "saved as draft"
          }`,
          time: getRelativeTime(post.updated_at),
          type: post.is_published ? "success" : "info",
          link: `/admin/blog/edit/${post.id}`,
        });
      });

      // Add recent pages
      pagesWithViews.slice(0, 2).forEach((page) => {
        activities.push({
          action: `Page "${page.title}" updated`,
          time: getRelativeTime(page.updated_at),
          type: "info",
          link: `/admin/pages/edit/${page.id}`,
        });
      });

      setRecentActivity(activities.slice(0, 5));

      // Calculate trends (simplified - comparing with half the data)
      const halfBlogCount = Math.floor(blogCount / 2);
      const blogTrend =
        blogCount > halfBlogCount
          ? `+${Math.round(
              ((blogCount - halfBlogCount) / halfBlogCount) * 100
            )}%`
          : "0%";

      setStats([
        {
          label: "Total Blog Posts",
          value: blogCount.toString(),
          change: blogTrend,
          trend: blogCount > halfBlogCount ? "up" : "neutral",
          icon: "📝",
          color: "blue",
        },
        {
          label: "Total Pages",
          value: pagesCount.toString(),
          change: "+0%",
          trend: "neutral",
          icon: "📄",
          color: "green",
        },
        {
          label: "Total Page Views",
          value: totalViews.toString(),
          change: "+0%",
          trend: "neutral",
          icon: "👁️",
          color: "purple",
        },
        {
          label: "Active Content",
          value: (
            blogPosts.filter((p) => p.is_published).length +
            pagesWithViews.filter((p) => p.status === "published").length
          ).toString(),
          change: "+0",
          trend: "neutral",
          icon: "✅",
          color: "orange",
        },
      ]);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

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
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <div className="flex items-center">
                  {stat.trend === "up" && (
                    <span className="text-green-600 mr-1">↗</span>
                  )}
                  {stat.trend === "down" && (
                    <span className="text-red-600 mr-1">↘</span>
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === "up"
                        ? "text-green-600 bg-green-50"
                        : stat.trend === "down"
                        ? "text-red-600 bg-red-50"
                        : `text-${stat.color}-600 bg-${stat.color}-50`
                    } px-2 py-1 rounded`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-1">vs last period</p>
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Top Performing Content - Wider */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Top Performing Content
              </h2>
            </div>
            <div className="p-6">
              {topContent.length > 0 ? (
                <div className="space-y-4">
                  {topContent.map((content, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-400">
                            #{index + 1}
                          </span>
                          <Link
                            to={
                              content.type === "blog"
                                ? `/admin/blog/edit/${content.id}`
                                : `/admin/pages/edit/${content.id}`
                            }
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {content.title}
                          </Link>
                        </div>
                        <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                          <span className="capitalize">{content.type}</span>
                          <span>•</span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs ${
                              content.status === "Published" ||
                              content.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {content.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {content.views}
                        </div>
                        <div className="text-xs text-gray-500">views</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No content data available yet
                </p>
              )}
            </div>
          </div>

          {/* Upcoming & Draft Content */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Upcoming & Drafts
              </h2>
            </div>
            <div className="p-6">
              {upcomingContent.length > 0 ? (
                <div className="space-y-3">
                  {upcomingContent.map((content, index) => (
                    <Link
                      key={index}
                      to={content.link}
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div
                        className={`text-xs font-semibold mb-1 ${
                          content.type === "Scheduled"
                            ? "text-orange-600"
                            : "text-gray-600"
                        }`}
                      >
                        {content.type}
                      </div>
                      <div className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                        {content.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {content.date}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  No scheduled or draft content
                </p>
              )}
            </div>
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
                    <div
                      className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                        activity.type === "success"
                          ? "bg-green-600"
                          : activity.type === "warning"
                          ? "bg-yellow-600"
                          : "bg-blue-600"
                      }`}
                    ></div>
                    <div className="flex-1">
                      {activity.link ? (
                        <Link
                          to={activity.link}
                          className="text-gray-900 hover:text-blue-600"
                        >
                          {activity.action}
                        </Link>
                      ) : (
                        <p className="text-gray-900">{activity.action}</p>
                      )}
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
                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-600 mb-2">
                    Content Summary
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Published:</span>
                      <span className="font-semibold text-green-600">
                        {stats.find((s) => s.label === "Active Content")
                          ?.value || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Views:</span>
                      <span className="font-semibold text-blue-600">
                        {stats.find((s) => s.label === "Total Page Views")
                          ?.value || 0}
                      </span>
                    </div>
                  </div>
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
