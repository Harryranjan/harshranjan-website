import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../utils/api";

export default function BlogSidebar({ currentPost, getImageUrl }) {
  const [popularPosts, setPopularPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchSidebarData();
  }, []);

  const fetchSidebarData = async () => {
    try {
      // Fetch popular posts
      const postsResponse = await api.get("/blog", {
        params: {
          published: true,
          limit: 5,
          page: 1,
        },
      });
      setPopularPosts(
        postsResponse.data.posts
          .filter((p) => p.id !== currentPost?.id)
          .slice(0, 4)
      );

      // Fetch categories
      const categoriesResponse = await api.get("/blog/categories");
      setCategories(categoriesResponse.data.categories.slice(0, 6));

      // Fetch tags
      const tagsResponse = await api.get("/blog/tags/popular");
      setTags(tagsResponse.data.slice(0, 10));
    } catch (error) {
      console.error("Failed to fetch sidebar data:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <aside className="space-y-8">
      {/* Author Info Card */}
      {currentPost?.author && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {currentPost.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{currentPost.author}</h3>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Digital marketing expert sharing insights on SEO, social media, and
            business growth.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-600 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-600 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {/* Newsletter Card */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
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
          <h3 className="font-bold text-lg">Newsletter</h3>
        </div>
        <p className="text-sm text-blue-100 mb-4">
          Get the latest posts delivered right to your inbox.
        </p>
        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2.5 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold py-2.5 rounded-lg hover:bg-gray-100 transition shadow-md"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-orange-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10a5.002 5.002 0 007.001 7.001c1 2 2.656 2.657 2.656 2.657a8 8 0 01-1 .999z" />
            </svg>
            Popular Posts
          </h3>
          <div className="space-y-4">
            {popularPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group flex gap-3 hover:bg-gray-50 rounded-lg p-2 -m-2 transition"
              >
                {post.featured_image && (
                  <img
                    src={getImageUrl(post.featured_image)}
                    alt={post.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition line-clamp-2 mb-1">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{formatDate(post.created_at)}</span>
                    <span>•</span>
                    <span>{post.reading_time} min</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-500"
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
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/blog?category=${category}`}
                className="flex items-center justify-between py-2 px-3 hover:bg-blue-50 rounded-lg transition group"
              >
                <span className="text-sm text-gray-700 group-hover:text-blue-600 font-medium">
                  {typeof category === "string"
                    ? category
                    : category.category || category.name || ""}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
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
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/blog?tag=${tag.name}`}
                className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 rounded-full text-xs font-medium transition"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
