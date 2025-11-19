import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../utils/api";
import BlogCard from "../components/blog/BlogCard";
import BlogCardSkeleton from "../components/blog/BlogCardSkeleton";
import FeaturedPost from "../components/blog/FeaturedPost";

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `http://localhost:5000${url}`;
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const category = searchParams.get("category") || "";
    const tag = searchParams.get("tag") || "";
    const search = searchParams.get("search") || "";
    setCurrentPage(page);
    setSelectedCategory(category);
    setSelectedTag(tag);
    setSearchQuery(search);
    setSearchInput(search);

    // Only show featured post on first page with no filters
    if (page === 1 && !category && !tag && !search) {
      fetchFeaturedPost();
    } else {
      setFeaturedPost(null);
    }

    fetchPosts(page, category, tag, search);
    fetchCategories();
    fetchTags();
  }, [searchParams]);

  const fetchPosts = async (page = 1, category = "", tag = "", search = "") => {
    try {
      setLoading(true);
      const response = await api.get("/blog", {
        params: {
          page,
          limit: 9,
          published: true,
          ...(category && { category }),
          ...(tag && { tag }),
          ...(search && { search }),
        },
      });
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
      setTotalPosts(response.data.total);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/blog/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await api.get("/blog/tags/popular");
      setTags(response.data);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const fetchFeaturedPost = async () => {
    try {
      // Fetch the latest published post as featured
      const response = await api.get("/blog", {
        params: {
          page: 1,
          limit: 1,
          published: true,
        },
      });
      if (response.data.posts && response.data.posts.length > 0) {
        setFeaturedPost(response.data.posts[0]);
      }
    } catch (error) {
      console.error("Failed to fetch featured post:", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSearchParams({ category, page: 1 });
    setSelectedTag(""); // Clear tag when selecting category
  };

  const handleTagClick = (tag) => {
    setSearchParams({ tag, page: 1 });
    setSelectedCategory(""); // Clear category when selecting tag
  };

  // Debounced search handler
  useEffect(() => {
    if (searchInput === searchQuery) return; // Avoid triggering on initial load

    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      const params = { page: 1 };
      if (searchInput.trim()) params.search = searchInput.trim();
      if (selectedCategory) params.category = selectedCategory;
      if (selectedTag) params.tag = selectedTag;
      setSearchParams(params);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    const params = { page: 1 };
    if (selectedCategory) params.category = selectedCategory;
    if (selectedTag) params.tag = selectedTag;
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const params = { page };
    if (selectedCategory) params.category = selectedCategory;
    if (selectedTag) params.tag = selectedTag;
    if (searchQuery) params.search = searchQuery;
    setSearchParams(params);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Blog - Digital Marketing Insights & Tips</title>
        <meta
          name="description"
          content="Read the latest articles on digital marketing, SEO, social media, and business growth strategies."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Digital Marketing Insights
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Strategies, tips, and trends to grow your business
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchChange}
                  placeholder="Search articles..."
                  className="w-full px-6 py-4 pl-12 pr-12 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <svg
                  className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {isSearching && (
                  <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="animate-spin h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                )}
                {searchInput && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="text-center mt-3 text-blue-100">
                  Found {totalPosts} result{totalPosts !== 1 ? "s" : ""} for "
                  {searchQuery}"
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="space-y-6 sticky top-6">
              {/* Categories */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Categories</h3>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <button
                    onClick={() => handleCategoryClick("")}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-between group ${
                      !selectedCategory
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-[1.02]"
                        : "text-gray-700 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        className={`w-4 h-4 ${
                          !selectedCategory
                            ? "text-white"
                            : "text-gray-400 group-hover:text-blue-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                      All Articles
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        !selectedCategory
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {posts.length}
                    </span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.category}
                      onClick={() => handleCategoryClick(cat.category)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-between group ${
                        selectedCategory === cat.category
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-[1.02]"
                          : "text-gray-700 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <svg
                          className={`w-4 h-4 ${
                            selectedCategory === cat.category
                              ? "text-white"
                              : "text-gray-400 group-hover:text-blue-600"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        {cat.category}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          selectedCategory === cat.category
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Popular Tags
                  </h3>
                </div>
                {tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => handleTagClick(tag.name)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 hover:shadow-md ${
                          selectedTag === tag.name
                            ? "bg-gradient-to-r from-green-500 to-teal-600 text-white border-transparent"
                            : "text-gray-700 bg-white hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-600 hover:text-white border-gray-200 hover:border-transparent"
                        }`}
                      >
                        {tag.name}
                        {tag.usage_count > 0 && (
                          <span
                            className={`ml-1.5 text-xs ${
                              selectedTag === tag.name
                                ? "text-white/80"
                                : "text-gray-400"
                            }`}
                          >
                            ({tag.usage_count})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No tags available yet.
                  </p>
                )}
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <h3 className="text-lg font-bold">Newsletter</h3>
                  </div>
                  <p className="text-sm text-blue-100 mb-4">
                    Get the latest posts delivered right to your inbox.
                  </p>
                  <form className="space-y-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2.5 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button
                      type="submit"
                      className="w-full bg-white text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-gray-100 transition shadow-md"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Active Filters Chips */}
            {(selectedCategory || selectedTag || searchQuery) && (
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  Active Filters:
                </span>

                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Search: "{searchQuery}"
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}

                {selectedCategory && (
                  <button
                    onClick={() => {
                      const params = { page: 1 };
                      if (selectedTag) params.tag = selectedTag;
                      if (searchQuery) params.search = searchQuery;
                      setSearchParams(params);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    Category: {selectedCategory}
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}

                {selectedTag && (
                  <button
                    onClick={() => {
                      const params = { page: 1 };
                      if (selectedCategory) params.category = selectedCategory;
                      if (searchQuery) params.search = searchQuery;
                      setSearchParams(params);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                      />
                    </svg>
                    Tag: {selectedTag}
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}

                {(selectedCategory || selectedTag || searchQuery) && (
                  <button
                    onClick={() => setSearchParams({ page: 1 })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}

            {/* Featured Post - Only on first page with no filters */}
            {!loading &&
              featuredPost &&
              currentPage === 1 &&
              !selectedCategory &&
              !selectedTag &&
              !searchQuery && <FeaturedPost post={featuredPost} />}

            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No articles found
                </h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or filter.
                </p>
              </div>
            ) : (
              <>
                {/* Blog Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination Info & Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 space-y-4">
                    {/* Pagination Info */}
                    <div className="text-center text-sm text-gray-600">
                      Showing{" "}
                      <span className="font-semibold text-gray-900">
                        {(currentPage - 1) * 9 + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-semibold text-gray-900">
                        {Math.min(currentPage * 9, totalPosts)}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-900">
                        {totalPosts}
                      </span>{" "}
                      posts
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center">
                      <nav className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-4 py-2 rounded-lg ${
                              currentPage === i + 1
                                ? "bg-blue-600 text-white"
                                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
