import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";

const ConversionDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [conversionData, setConversionData] = useState(null);
  const [period, setPeriod] = useState("30");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConversionData();
  }, [period]);

  const fetchConversionData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/analytics/conversions?period=${period}`);
      if (response.data.success) {
        setConversionData(response.data.data);
      } else {
        setError("Failed to load conversion data");
      }
    } catch (error) {
      console.error("Failed to fetch conversion data:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load conversion data"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading conversion analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
          <button
            onClick={fetchConversionData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!conversionData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">No conversion data available</div>
      </div>
    );
  }

  const getConversionColor = (rate) => {
    const numRate = parseFloat(rate);
    if (numRate >= 5) return "text-green-600";
    if (numRate >= 2) return "text-blue-600";
    return "text-orange-600";
  };

  return (
    <>
      <Helmet>
        <title>Conversion Dashboard - Admin Panel</title>
      </Helmet>

      <div>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Conversion Tracking
            </h1>
            <p className="text-gray-600">
              Monitor form submissions, downloads, and CTA performance
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

        {conversionData && (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">📝</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {conversionData.forms.conversion_rate}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {conversionData.forms.total_submissions}
                </div>
                <div className="text-sm text-gray-600">Form Submissions</div>
                <div className="text-xs text-gray-500 mt-2">
                  Conversion Rate
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">📥</span>
                  <span className="text-2xl font-bold text-green-600">
                    {conversionData.downloads.conversion_rate}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {conversionData.downloads.total_downloaded}
                </div>
                <div className="text-sm text-gray-600">
                  Download Conversions
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {conversionData.downloads.total_leads} leads
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">🎯</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {conversionData.cta_banners.total_views > 0
                      ? (
                          (conversionData.cta_banners.total_clicks /
                            conversionData.cta_banners.total_views) *
                          100
                        ).toFixed(2) + "%"
                      : "0%"}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {conversionData.cta_banners.total_clicks}
                </div>
                <div className="text-sm text-gray-600">CTA Clicks</div>
                <div className="text-xs text-gray-500 mt-2">
                  {conversionData.cta_banners.total_views} views
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">🚀</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {conversionData.landing_pages.length}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {conversionData.landing_pages.reduce(
                    (sum, p) => sum + p.views,
                    0
                  )}
                </div>
                <div className="text-sm text-gray-600">Landing Page Views</div>
                <div className="text-xs text-gray-500 mt-2">Active pages</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Form Performance */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">
                    Form Submission Rates
                  </h2>
                </div>
                <div className="p-6">
                  {conversionData.forms.by_form.length > 0 ? (
                    <div className="space-y-4">
                      {conversionData.forms.by_form.map((form, index) => (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-gray-900">
                              {form.Form?.title ||
                                form.Form?.name ||
                                "Untitled Form"}
                            </div>
                            <div className="text-2xl font-bold text-blue-600">
                              {form.count}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Submissions</span>
                            <Link
                              to={`/admin/forms/${form.form_id}/submissions`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View Details →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No form submissions in this period
                    </p>
                  )}
                </div>
              </div>

              {/* CTA Banner Performance */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">
                    CTA Click Rates
                  </h2>
                </div>
                <div className="p-6">
                  {conversionData.cta_banners.banners.length > 0 ? (
                    <div className="space-y-4">
                      {conversionData.cta_banners.banners
                        .sort((a, b) => parseFloat(b.ctr) - parseFloat(a.ctr))
                        .map((banner, index) => (
                          <div
                            key={index}
                            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium text-gray-900">
                                {banner.name}
                              </div>
                              <div
                                className={`text-xl font-bold ${getConversionColor(
                                  banner.ctr
                                )}`}
                              >
                                {banner.ctr}%
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>{banner.clicks} clicks</span>
                              <span>{banner.views} views</span>
                            </div>
                            <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-blue-600 h-full"
                                style={{ width: `${banner.ctr}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No CTA banner data available
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Landing Page Performance */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  Landing Page Performance
                </h2>
              </div>
              <div className="p-6">
                {conversionData.landing_pages.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            #
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Page Title
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Slug
                          </th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                            Views
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {conversionData.landing_pages.map((page, index) => (
                          <tr
                            key={index}
                            className="border-b hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-3 px-4 text-gray-500">
                              #{index + 1}
                            </td>
                            <td className="py-3 px-4 font-medium text-gray-900">
                              {page.title}
                            </td>
                            <td className="py-3 px-4 text-gray-600 text-sm">
                              /{page.slug}
                            </td>
                            <td className="py-3 px-4 text-right font-semibold text-blue-600">
                              {page.views}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Link
                                to={`/admin/pages/edit/${page.id}`}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                Edit
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No landing pages found
                  </p>
                )}
              </div>
            </div>

            {/* Download Stats */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  Download Conversion Summary
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {conversionData.downloads.total_leads}
                    </div>
                    <div className="text-sm text-gray-600">Total Leads</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {conversionData.downloads.total_downloaded}
                    </div>
                    <div className="text-sm text-gray-600">
                      Downloads Completed
                    </div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {conversionData.downloads.conversion_rate}
                    </div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ConversionDashboard;
