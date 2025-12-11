import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { blocksToHTML, isFullHTMLDocument } from "../utils/blocksToHTML";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorPage from "../components/common/ErrorPage";
import PageSEO from "../components/common/PageSEO";
import ContentRenderer from "../components/ContentRenderer";
import { parseShortcodes } from "../utils/shortcodeParser";

export default function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load Tailwind CDN dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/pages/slug/${slug}`);

      console.log("🔍 API Response:", response.data);

      // Backend returns { page, seo } structure
      const pageData = response.data.page || response.data;

      console.log("📄 Page Data:", {
        title: pageData.title,
        slug: pageData.slug,
        status: pageData.status,
        template: pageData.template,
        contentLength: pageData.content?.length,
        contentType: typeof pageData.content,
        hasContent: !!pageData.content,
        first100Chars: pageData.content?.substring(0, 100),
      });

      // Check if page is published
      if (pageData.status !== "published") {
        setError("This page is not available");
        return;
      }

      // Check if content is a complete HTML document
      const isFullHTML = isFullHTMLDocument(pageData.content);
      console.log("🔍 Is Full HTML:", isFullHTML);

      if (isFullHTML) {
        // It's a full HTML document - override template to blank
        pageData.template = "custom-html";
        pageData.isFullHTML = true;
        console.log("✅ Set as full HTML page");
      }

      console.log("📦 Final Page Data:", {
        isFullHTML: pageData.isFullHTML,
        template: pageData.template,
        contentLength: pageData.content?.length,
      });

      setPage(pageData);
    } catch (err) {
      console.error("Failed to fetch page:", err);
      if (err.response?.status === 404) {
        setError("Page not found");
      } else if (err.response?.status === 500 || !err.response) {
        setError("Server error - Please make sure the database is connected");
      } else {
        setError("Unable to load page");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading page..." />;
  }

  if (error || !page) {
    return <ErrorPage message={error || "Page not found"} />;
  }

  return (
    <>
      <PageSEO
        title={page.title}
        metaTitle={page.meta_title}
        description={page.excerpt}
        metaDescription={page.meta_description}
        keywords={page.meta_keywords}
        canonicalUrl={page.canonical_url}
        customCSS={page.custom_css}
        includePreviewStyles={true}
      />

      {/* Page Content */}
      {page.isFullHTML ? (
        // Full HTML document - render in iframe
        // Note: Shortcodes won't work in full HTML/iframe mode
        // To use shortcodes, use the Blank template instead
        <div>
          {parseShortcodes(page.content).components.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Shortcodes detected but not rendered:</strong> This
                    page uses full HTML mode. Shortcodes don't work in
                    iframe-rendered pages. To use shortcodes like [form id="4"],
                    please change the page template to "Blank" in the page
                    settings.
                  </p>
                </div>
              </div>
            </div>
          )}
          <iframe
            srcDoc={page.content}
            style={{
              width: "100%",
              minHeight: "100vh",
              border: "none",
              display: "block",
            }}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
            title={page.title}
          />
        </div>
      ) : (
        <div
          className="dynamic-page min-h-screen"
          style={{ background: "#f9fafb", padding: "2rem" }}
        >
          {/* Render based on template */}
          {page.template === "blank" ? (
            // Blank template - just render the content
            <div
              className="page-content-wrapper"
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                background: "white",
                padding: "3rem",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <ContentRenderer
                content={
                  Array.isArray(page.content)
                    ? blocksToHTML(page.content)
                    : page.content
                }
                className="page-content-wrapper"
              />
            </div>
          ) : (
            // Default template with container
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                background: "white",
                padding: "3rem",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {/* Page Header - Only show if hide_title is false */}
              {page.title && !page.hide_title && (
                <header style={{ marginBottom: "2rem" }}>
                  <h1
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      marginBottom: "1rem",
                      color: "#111827",
                      lineHeight: "1.2",
                    }}
                  >
                    {page.title}
                  </h1>
                  {page.excerpt && (
                    <p style={{ fontSize: "1.125rem", color: "#6b7280" }}>
                      {page.excerpt}
                    </p>
                  )}
                </header>
              )}

              {/* Page Content - Render with all Tailwind classes preserved */}
              <ContentRenderer
                content={
                  Array.isArray(page.content)
                    ? blocksToHTML(page.content)
                    : page.content
                }
                className="preview-content"
                style={{ fontSize: "1.125rem", color: "#374151" }}
              />
            </div>
          )}
        </div>
      )}

      {/* Custom JavaScript */}
      {!page.isFullHTML && page.custom_js && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: page.custom_js }}
        />
      )}
    </>
  );
}
