import { useState, useEffect } from "react";
import { FiDownload, FiFile, FiFilter, FiSearch, FiStar } from "react-icons/fi";
import api from "../utils/api";
import Toast from "../components/Toast";
import DownloadModal from "../components/DownloadModal";

export default function DownloadsLibrary() {
  const [downloads, setDownloads] = useState([]);
  const [filteredDownloads, setFilteredDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDownload, setSelectedDownload] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  const [filters, setFilters] = useState({
    category: "all",
    search: "",
    showMobileFilter: false,
  });

  const categories = [
    { value: "all", label: "All Downloads" },
    { value: "ebook", label: "E-books" },
    { value: "guide", label: "Guides" },
    { value: "template", label: "Templates" },
    { value: "checklist", label: "Checklists" },
    { value: "worksheet", label: "Worksheets" },
    { value: "toolkit", label: "Toolkits" },
  ];

  useEffect(() => {
    loadDownloads();
  }, []);

  useEffect(() => {
    filterDownloads();
  }, [downloads, filters]);

  const loadDownloads = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/downloads/public?limit=100");
      setDownloads(data);
    } catch (error) {
      console.error("Error loading downloads:", error);
      setToast({ type: "error", message: "Failed to load downloads" });
    } finally {
      setLoading(false);
    }
  };

  const filterDownloads = () => {
    let filtered = [...downloads];

    // Category filter
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((d) => d.category === filters.category);
    }

    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(query) ||
          d.short_description?.toLowerCase().includes(query) ||
          d.description?.toLowerCase().includes(query)
      );
    }

    setFilteredDownloads(filtered);
  };

  const handleDownloadClick = (download) => {
    if (download.requires_form) {
      setSelectedDownload(download);
      setShowModal(true);
    } else {
      // Direct download
      window.open(download.file_url, "_blank");
    }
  };

  const handleLeadSubmit = (success) => {
    setShowModal(false);
    if (success) {
      setToast({
        type: "success",
        message: "Check your email for the download link!",
      });
    }
  };

  const featuredDownloads = downloads.filter((d) => d.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Free Resources</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Download free e-books, guides, templates, and more to help you grow
            your skills and business.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                placeholder="Search downloads..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  showMobileFilter: !prev.showMobileFilter,
                }))
              }
              className="md:hidden flex items-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiFilter className="text-gray-600" size={20} />
              <span className="font-medium text-gray-700">Filters</span>
            </button>
          </div>

          {/* Category Pills/Tabs - Hidden on mobile unless filter is open */}
          <div
            className={`${
              filters.showMobileFilter ? "block" : "hidden md:block"
            }`}
          >
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      category: cat.value,
                      showMobileFilter: false,
                    }))
                  }
                  className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                    filters.category === cat.value
                      ? "bg-blue-600 text-white shadow-md transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Downloads */}
        {featuredDownloads.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <FiStar className="text-yellow-500" size={28} />
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Downloads
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDownloads.map((download) => (
                <DownloadCard
                  key={download.id}
                  download={download}
                  onClick={() => handleDownloadClick(download)}
                  featured
                />
              ))}
            </div>
          </div>
        )}

        {/* All Downloads Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            All Downloads
          </h2>
          <p className="text-gray-600">
            Showing {filteredDownloads.filter((d) => !d.featured).length}{" "}
            download
            {filteredDownloads.filter((d) => !d.featured).length !== 1
              ? "s"
              : ""}
          </p>
        </div>

        {/* Downloads Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredDownloads.length === 0 ? (
          <div className="text-center py-20">
            <FiFile className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No downloads found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDownloads
              .filter((d) => !d.featured)
              .map((download) => (
                <DownloadCard
                  key={download.id}
                  download={download}
                  onClick={() => handleDownloadClick(download)}
                />
              ))}
          </div>
        )}
      </div>

      {/* Download Modal */}
      {showModal && selectedDownload && (
        <DownloadModal
          download={selectedDownload}
          onClose={() => setShowModal(false)}
          onSuccess={handleLeadSubmit}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

// Download Card Component
function DownloadCard({ download, onClick, featured = false }) {
  const getCategoryColor = (category) => {
    const colors = {
      ebook: "bg-blue-100 text-blue-700",
      guide: "bg-green-100 text-green-700",
      template: "bg-purple-100 text-purple-700",
      checklist: "bg-yellow-100 text-yellow-700",
      worksheet: "bg-pink-100 text-pink-700",
      toolkit: "bg-indigo-100 text-indigo-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      beginner: {
        color: "bg-green-100 text-green-700",
        icon: "🟢",
        label: "Beginner",
      },
      intermediate: {
        color: "bg-yellow-100 text-yellow-700",
        icon: "🟡",
        label: "Intermediate",
      },
      advanced: {
        color: "bg-red-100 text-red-700",
        icon: "🔴",
        label: "Advanced",
      },
    };
    return badges[difficulty] || badges.beginner;
  };

  return (
    <div
      className={`group bg-white rounded-xl shadow-sm border-2 hover:border-blue-500 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full ${
        featured ? "border-yellow-300" : "border-gray-200"
      }`}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative h-52 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden flex-shrink-0">
        {download.thumbnail ? (
          <img
            src={download.thumbnail}
            alt={download.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FiFile className="text-gray-300" size={64} />
          </div>
        )}

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <FiStar size={12} />
            Featured
          </div>
        )}

        {/* Badges Container */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          {/* Category Badge */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
              download.category
            )}`}
          >
            {download.category}
          </span>

          {/* Difficulty Badge */}
          {download.difficulty && (
            <span
              className={`relative px-3 py-1 rounded-full text-xs font-semibold ${
                getDifficultyBadge(download.difficulty).color
              } group/difficulty`}
              title={getDifficultyBadge(download.difficulty).label}
            >
              {getDifficultyBadge(download.difficulty).icon}
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover/difficulty:opacity-100 transition-opacity pointer-events-none">
                {getDifficultyBadge(download.difficulty).label}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {download.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {download.short_description || download.description}
        </p>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
          {download.author && (
            <div className="flex items-center gap-1">
              <span className="font-medium">👤</span>
              <span>{download.author}</span>
            </div>
          )}
          {download.reading_time && (
            <div className="flex items-center gap-1">
              <span className="font-medium">⏱️</span>
              <span>{download.reading_time}</span>
            </div>
          )}
          {download.file_type && (
            <div className="flex items-center gap-1">
              <span className="uppercase font-semibold">
                {download.file_type}
              </span>
              {download.file_size && <span>• {download.file_size}</span>}
            </div>
          )}
        </div>

        {/* Tags */}
        {download.tags && download.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {download.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Download Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors group-hover:scale-105 transform duration-200">
          <FiDownload />
          Download Now
        </button>

        {/* Download Count */}
        <div className="mt-3 text-center text-xs text-gray-500">
          {download.download_count > 0 && (
            <span>{download.download_count.toLocaleString()} downloads</span>
          )}
        </div>
      </div>
    </div>
  );
}
