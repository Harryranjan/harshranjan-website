import { Link } from "react-router-dom";

export default function FeaturedPost({ post }) {
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return `http://localhost:5000${
      imagePath.startsWith("/") ? "" : "/"
    }${imagePath}`;
  };

  if (!post) return null;

  return (
    <div className="mb-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl overflow-hidden shadow-xl">
      <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
        {/* Featured Badge & Content */}
        <div className="flex flex-col justify-center space-y-6">
          {/* Featured Badge */}
          <div className="flex items-center gap-2">
            <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured Post
            </span>
          </div>

          {/* Categories */}
          {Array.isArray(post.category) && post.category.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.category.map((cat, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/80 backdrop-blur-sm text-blue-600 text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <Link to={`/blog/${post.slug}`}>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight hover:text-blue-600 transition-colors">
              {post.title}
            </h1>
          </Link>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-gray-600 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {/* Author & Meta */}
          <div className="flex items-center gap-6 pt-4">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {(post.author?.name || "Author").charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {post.author?.name || "Purna Virji"}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(
                    post.published_at || post.createdAt
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-10 w-px bg-gray-300"></div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {post.reading_time || 6} min
              </span>
              <span className="flex items-center gap-1">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {post.views || 0}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Read Full Article
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative lg:order-last">
            <Link to={`/blog/${post.slug}`} className="block group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src={getImageUrl(post.featured_image)}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  style={{ minHeight: "400px", maxHeight: "600px" }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Featured+Post";
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
