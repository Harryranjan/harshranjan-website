import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";

const SEODashboard = () => {
  const [loading, setLoading] = useState(true);
  const [seoData, setSeOData] = useState(null);
  const [trafficTrends, setTrafficTrends] = useState([]);
  const [period, setPeriod] = useState("30");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSEOData();
    fetchTrafficTrends();
  }, [period]);

  const fetchSEOData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/analytics/seo?period=${period}`);
      if (response.data.success) {
        setSeOData(response.data.data);
      } else {
        setError('Failed to load SEO data');
      }
    } catch (error) {
      console.error("Failed to fetch SEO data:", error);
      setError(error.response?.data?.message || error.message || 'Failed to load SEO data');
    } finally {
      setLoading(false);
    }
  };

  const fetchTrafficTrends = async () => {
    try {
      const response = await api.get(
        `/analytics/traffic-trends?period=${period}`
      );
      if (response.data.success) {
        setTrafficTrends(response.data.data.trends);
      }
    } catch (error) {
      console.error("Failed to fetch traffic trends:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading SEO analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
          <button
            onClick={fetchSEOData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!seoData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">No SEO data available</div>
      </div>
    );
  }

  const getPositionColor = (position) => {
    if (position <= 3) return "text-green-600 bg-green-50";
    if (position <= 10) return "text-blue-600 bg-blue-50";
    if (position <= 20) return "text-yellow-600 bg-yellow-50";
    return "text-gray-600 bg-gray-50";
  };

  return (
    <>
      <Helmet>
        <title>SEO Dashboard - Admin Panel</title>
      </Helmet>

      <div>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              SEO Dashboard
            </h1>
            <p className="text-gray-600">
              Track your organic search performance and rankings
            </p>
          </div>
          <div className="flex space-x-2">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>

        {seoData && (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                <div className="text-sm text-gray-600 mb-2">
                  Total Organic Traffic
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {seoData.overview.total_organic_traffic.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Last {period} days
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                <div className="text-sm text-gray-600 mb-2">Indexed Pages</div>
                <div className="text-3xl font-bold text-gray-900">
                  {seoData.overview.total_indexed_pages}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Published content
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                <div className="text-sm text-gray-600 mb-2">
                  Avg Click-Through Rate
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {seoData.overview.avg_click_through_rate}
                </div>
                <div className="text-xs text-gray-500 mt-2">Organic CTR</div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
                <div className="text-sm text-gray-600 mb-2">Top Keywords</div>
                <div className="text-3xl font-bold text-gray-900">
                  {seoData.top_keywords.length}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Ranking keywords
                </div>
              </div>
            </div>

            {/* Traffic Trends Chart */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  Organic Traffic Trends
                </h2>
              </div>
              <div className="p-6">
                <div className="h-64 flex items-end space-x-1">
                  {trafficTrends.map((trend, index) => {
                    const maxViews = Math.max(
                      ...trafficTrends.map((t) => t.views)
                    );
                    const height = (trend.views / maxViews) * 100;
                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center group"
                      >
                        <div
                          className="w-full bg-blue-500 hover:bg-blue-600 transition-colors rounded-t relative"
                          style={{ height: `${height}%` }}
                          title={`${trend.date}: ${trend.views} views`}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {trend.views} views
                          </div>
                        </div>
                        {index % Math.floor(trafficTrends.length / 7) === 0 && (
                          <div className="text-xs text-gray-500 mt-2 rotate-45 origin-left">
                            {new Date(trend.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Top Keywords */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">
                    Top Ranking Keywords
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {seoData.top_keywords.slice(0, 10).map((keyword, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <span className="text-lg font-bold text-gray-400">
                            #{index + 1}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {keyword.keyword}
                            </div>
                            <div className="text-sm text-gray-500">
                              {keyword.views} views
                            </div>
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getPositionColor(
                            keyword.position
                          )}`}
                        >
                          #{keyword.position}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Performing Content */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">
                    Top Performing Content
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {seoData.top_performing_content
                      .slice(0, 10)
                      .map((content, index) => (
                        <Link
                          key={index}
                          to={
                            content.type === "blog"
                              ? `/admin/blog/edit/${content.id}`
                              : `/admin/pages/edit/${content.id}`
                          }
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-gray-400">
                                #{index + 1}
                              </span>
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-1">
                                {content.title}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500 mt-1 ml-8">
                              <span className="capitalize">{content.type}</span>
                              {content.keywords && (
                                <span className="ml-2 text-xs">
                                  •{" "}
                                  {content.keywords
                                    .split(",")
                                    .slice(0, 2)
                                    .join(", ")}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">
                              {content.views}
                            </div>
                            <div className="text-xs text-gray-500">views</div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  Recently Updated Content
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {seoData.recent_updates.map((item, index) => (
                    <Link
                      key={index}
                      to={
                        item.type === "blog"
                          ? `/admin/blog/edit/${item.id}`
                          : `/admin/pages/edit/${item.id}`
                      }
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="capitalize">{item.type}</span> • /
                          {item.slug}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(item.updated).toLocaleDateString()}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SEODashboard;
