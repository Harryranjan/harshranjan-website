import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { blocksToHTML, isFullHTMLDocument } from "../utils/blocksToHTML";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorPage from "../components/common/ErrorPage";
import PageSEO from "../components/common/PageSEO";

export default function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load Tailwind CDN dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
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
      
      // Backend returns { page, seo } structure
      const pageData = response.data.page || response.data;
      
      // Check if page is published
      if (pageData.status !== 'published') {
        setError("This page is not available");
        return;
      }

      // Check if content is a complete HTML document
      if (isFullHTMLDocument(pageData.content)) {
        // It's a full HTML document - override template to blank
        pageData.template = 'custom-html';
        pageData.isFullHTML = true;
      }
      
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
        // Full HTML document - render in iframe for isolation
        <iframe
          srcDoc={page.content}
          style={{
            width: '100%',
            minHeight: '100vh',
            border: 'none',
            display: 'block'
          }}
          title={page.title}
        />
      ) : (
      <div className="dynamic-page min-h-screen" style={{ background: '#f9fafb', padding: '2rem' }}>
        {/* Render based on template */}
        {page.template === 'blank' ? (
          // Blank template - just render the content
          <div 
            className="page-content-wrapper"
            style={{ 
              maxWidth: '1200px', 
              margin: '0 auto', 
              background: 'white', 
              padding: '3rem', 
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            dangerouslySetInnerHTML={{ __html: Array.isArray(page.content) ? blocksToHTML(page.content) : page.content }}
          />
        ) : (
          // Default template with container
          <div 
            style={{ 
              maxWidth: '1200px', 
              margin: '0 auto', 
              background: 'white', 
              padding: '3rem', 
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            {/* Page Header - Only show if hide_title is false */}
            {page.title && !page.hide_title && (
              <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 'bold', 
                  marginBottom: '1rem', 
                  color: '#111827',
                  lineHeight: '1.2'
                }}>
                  {page.title}
                </h1>
                {page.excerpt && (
                  <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>{page.excerpt}</p>
                )}
              </header>
            )}

            {/* Page Content - Render with all Tailwind classes preserved */}
            <div 
              className="preview-content"
              style={{ fontSize: '1.125rem', color: '#374151' }}
              dangerouslySetInnerHTML={{ __html: Array.isArray(page.content) ? blocksToHTML(page.content) : page.content }}
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
