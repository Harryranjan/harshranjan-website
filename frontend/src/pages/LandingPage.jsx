import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../utils/api";

// Component to render landing page sections
const LandingPageRenderer = ({ sections, globalStyles }) => {
  if (!sections || sections.length === 0) {
    return <div>No content available</div>;
  }

  return (
    <>
      {sections.map((section) => {
        const sectionStyles = {
          backgroundColor:
            section.styles?.backgroundColor ||
            globalStyles?.backgroundColor ||
            "#ffffff",
          color:
            section.styles?.textColor || globalStyles?.textColor || "#000000",
          padding: section.styles?.padding || "80px 20px",
          textAlign: section.styles?.alignment || "center",
        };

        return (
          <section key={section.id} style={sectionStyles}>
            <div
              style={{
                maxWidth: globalStyles?.containerWidth || "1200px",
                margin: "0 auto",
              }}
            >
              {section.type === "hero" && (
                <div>
                  <h1
                    style={{
                      fontSize: "3rem",
                      fontWeight: "bold",
                      marginBottom: "1rem",
                    }}
                  >
                    {section.content?.heading || ""}
                  </h1>
                  <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
                    {section.content?.subheading || ""}
                  </p>
                  {section.content?.ctaText && (
                    <a
                      href={section.content?.ctaLink || "#"}
                      style={{
                        display: "inline-block",
                        padding: "1rem 2rem",
                        backgroundColor:
                          globalStyles?.primaryColor || "#0ea5e9",
                        color: "#ffffff",
                        textDecoration: "none",
                        borderRadius: "0.5rem",
                        fontWeight: "600",
                      }}
                    >
                      {section.content?.ctaText}
                    </a>
                  )}
                </div>
              )}

              {section.type === "features" && (
                <div>
                  <h2
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      marginBottom: "3rem",
                    }}
                  >
                    {section.content?.title || "Features"}
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        section.variant === "grid-3col"
                          ? "repeat(auto-fit, minmax(300px, 1fr))"
                          : "1fr",
                      gap: "2rem",
                    }}
                  >
                    {section.content?.features?.map((feature, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "2rem",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                          {feature.icon}
                        </div>
                        <h3
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {feature.title}
                        </h3>
                        <p>{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default function LandingPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/pages/slug/${slug}`);
      const pageData = response.data.page;

      // Parse content if it's a JSON string
      if (typeof pageData.content === "string") {
        try {
          pageData.content = JSON.parse(pageData.content);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }

      setPage(pageData);
    } catch (err) {
      console.error("Failed to fetch landing page:", err);
      setError("Landing page not found");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600">{error || "Page not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{page.meta_title || page.title}</title>
        <meta
          name="description"
          content={page.meta_description || page.excerpt}
        />
        {page.meta_keywords && (
          <meta name="keywords" content={page.meta_keywords} />
        )}
        {page.head_scripts && (
          <script type="text/javascript">{page.head_scripts}</script>
        )}
        {page.custom_css && <style>{page.custom_css}</style>}
      </Helmet>

      <div className="landing-page">
        {/* Render page content */}
        {Array.isArray(page.content?.sections) ? (
          <LandingPageRenderer
            sections={page.content.sections}
            globalStyles={page.content.globalStyles}
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: typeof page.content === "string" ? page.content : "",
            }}
          />
        )}
      </div>

      {page.body_scripts && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: page.body_scripts }}
        />
      )}

      {page.custom_js && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: page.custom_js }}
        />
      )}
    </>
  );
}
