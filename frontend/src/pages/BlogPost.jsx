import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../utils/api";
import RelatedPosts from "../components/blog/RelatedPosts";
import ReadingProgressBar from "../components/blog/ReadingProgressBar";
import TableOfContents from "../components/blog/TableOfContents";
import BlogSidebar from "../components/blog/BlogSidebar";
import Spinner from "../components/ui/Spinner";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (url) => {
    if (!url) return "";
    // If it's already a full URL (http/https or unsplash), use it directly
    if (url.startsWith("http")) return url;
    // For relative paths (/uploads/...), they'll be proxied by Vite automatically
    // Just return the path as-is and Vite proxy will handle it
    return url;
  };

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/blog/slug/${slug}`);
      const postData = response.data.post || response.data;
      setPost(postData);

      // Fetch related posts using new endpoint (matches by category and tags)
      if (postData.id) {
        try {
          const relatedResponse = await api.get(
            `/blog/${postData.id}/related`,
            {
              params: { limit: 3 },
            }
          );
          setRelatedPosts(relatedResponse.data.posts || []);
        } catch (relatedError) {
          console.error("Failed to fetch related posts:", relatedError);
          setRelatedPosts([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch post:", error);
      navigate("/blog");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shareOnTwitter = () => {
    const url = window.location.href;
    const text = post.title;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      <Helmet>
        <title>{post.meta_title || post.title}</title>
        <meta
          name="description"
          content={post.meta_description || post.excerpt || ""}
        />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ""} />
        {post.featured_image && (
          <meta property="og:image" content={post.featured_image} />
        )}
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Hero Image */}
      {post.featured_image && (
        <div className="relative h-96 bg-gray-900">
          <img
            src={getImageUrl(post.featured_image)}
            alt={post.title}
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              e.target.parentElement.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article - Takes 8 columns on large screens */}
          <article className="lg:col-span-8">
            {/* Breadcrumb */}
            <nav className="mb-6 lg:mb-8 text-sm overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
              <div className="flex items-center gap-2">
                <Link
                  to="/"
                  className="text-gray-500 hover:text-blue-600 transition flex items-center gap-1"
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Home</span>
                </Link>
                <svg
                  className="w-4 h-4 text-gray-400"
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
                <Link
                  to="/blog"
                  className="text-gray-500 hover:text-blue-600 transition"
                >
                  Blog
                </Link>
                {post.category &&
                  Array.isArray(post.category) &&
                  post.category.length > 0 && (
                    <>
                      <svg
                        className="w-4 h-4 text-gray-400"
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
                      <Link
                        to={`/blog?category=${post.category[0]}`}
                        className="text-gray-500 hover:text-blue-600 transition"
                      >
                        {post.category[0]}
                      </Link>
                    </>
                  )}
              </div>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
              {/* Category Badge */}
              {post.category &&
                Array.isArray(post.category) &&
                post.category.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.category.map((cat, index) => (
                      <Link
                        key={index}
                        to={`/blog?category=${cat}`}
                        className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 transition"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold">
                    {post.author?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <span className="font-medium">{post.author || "Admin"}</span>
                </div>
                <span className="hidden sm:inline text-gray-400">•</span>
                <time
                  dateTime={post.published_at || post.createdAt}
                  className="text-gray-600"
                >
                  {formatDate(post.published_at || post.createdAt)}
                </time>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{post.reading_time} min read</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span>{post.views || 0} views</span>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 lg:p-12">
              {/* Excerpt */}
              {post.excerpt && (
                <div className="text-lg sm:text-xl text-gray-700 mb-8 pb-8 border-b border-gray-200 italic leading-relaxed">
                  {post.excerpt}
                </div>
              )}

              {/* Content */}
              <div
                className="prose prose-sm sm:prose-base lg:prose-lg max-w-none blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
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
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Link
                        key={index}
                        to={`/blog?tag=${tag}`}
                        className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-full transition"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Buttons */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share this article
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={shareOnTwitter}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all hover:shadow-md"
                    aria-label="Share on Twitter"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    <span className="font-medium">Twitter</span>
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-md"
                    aria-label="Share on LinkedIn"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="font-medium">LinkedIn</span>
                  </button>
                  <button
                    onClick={shareOnFacebook}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-all hover:shadow-md"
                    aria-label="Share on Facebook"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="font-medium">Facebook</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} getImageUrl={getImageUrl} />

            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to all articles
              </Link>
            </div>
          </article>

          {/* Right Sidebar - Takes 4 columns on large screens, hidden on mobile */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents - Desktop Only */}
              <div className="hidden xl:block">
                <TableOfContents content={post.content} />
              </div>

              {/* Sidebar Widgets */}
              <BlogSidebar currentPost={post} getImageUrl={getImageUrl} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile TOC Floating Button */}
      <div className="xl:hidden">
        <TableOfContents content={post.content} />
      </div>
    </div>
  );
}
