import { Helmet } from "react-helmet-async";

const PageSEO = ({ 
  title, 
  metaTitle,
  description, 
  metaDescription,
  keywords, 
  canonicalUrl,
  customCSS,
  includePreviewStyles = false
}) => {
  const previewStyles = `
    .preview-content h1 {
      font-size: 2rem;
      font-weight: bold;
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: #111827;
    }
    .preview-content h2 {
      font-size: 1.75rem;
      font-weight: bold;
      margin-top: 1.75rem;
      margin-bottom: 0.875rem;
      color: #111827;
    }
    .preview-content h3 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      color: #111827;
    }
    .preview-content h4 {
      font-size: 1.25rem;
      font-weight: bold;
      margin-top: 1.25rem;
      margin-bottom: 0.625rem;
      color: #111827;
    }
    .preview-content p {
      margin-bottom: 1rem;
    }
    .preview-content ul, .preview-content ol {
      margin-bottom: 1rem;
      padding-left: 2rem;
    }
    .preview-content li {
      margin-bottom: 0.5rem;
    }
    .preview-content a {
      color: #2563eb;
      text-decoration: underline;
    }
    .preview-content img {
      max-width: 100%;
      height: auto;
      border-radius: 0.375rem;
      margin: 1.5rem 0;
    }
    .preview-content blockquote {
      border-left: 4px solid #e5e7eb;
      padding-left: 1rem;
      margin: 1.5rem 0;
      font-style: italic;
      color: #6b7280;
    }
    .preview-content code {
      background: #f3f4f6;
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      font-family: monospace;
      font-size: 0.875em;
    }
    .preview-content pre {
      background: #1f2937;
      color: #f9fafb;
      padding: 1rem;
      border-radius: 0.375rem;
      overflow-x: auto;
      margin: 1rem 0;
    }
    .preview-content pre code {
      background: transparent;
      padding: 0;
      color: inherit;
    }
    .preview-content strong {
      font-weight: 600;
    }
    .preview-content em {
      font-style: italic;
    }
  `;

  return (
    <Helmet>
      <title>{metaTitle || title}</title>
      <meta
        name="description"
        content={metaDescription || description || ''}
      />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {includePreviewStyles && <style>{previewStyles}</style>}
      {customCSS && <style>{customCSS}</style>}
    </Helmet>
  );
};

export default PageSEO;
