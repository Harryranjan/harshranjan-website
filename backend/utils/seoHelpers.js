/**
 * SEO Helper Functions
 * Generate Schema.org JSON-LD markup and meta tags
 */

/**
 * Generate Article Schema for Blog Posts
 */
exports.generateArticleSchema = (post, baseUrl) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.featured_image
      ? `${baseUrl}${post.featured_image}`
      : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: "Harsh Ranjan",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Harsh Ranjan - Digital Marketing Expert",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  };

  return JSON.stringify(schema);
};

/**
 * Generate WebPage Schema for Pages
 */
exports.generateWebPageSchema = (page, baseUrl) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.meta_description || page.excerpt,
    url: `${baseUrl}/${page.slug}`,
    dateModified: page.updated_at,
    author: {
      "@type": "Person",
      name: "Harsh Ranjan",
    },
  };

  return JSON.stringify(schema);
};

/**
 * Generate Person Schema for About/Profile
 */
exports.generatePersonSchema = (baseUrl) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Harsh Ranjan",
    jobTitle: "Digital Marketing Expert",
    description:
      "Digital Marketing Expert with 7+ years of experience in SEO, PPC, and Content Marketing",
    url: baseUrl,
    sameAs: [
      "https://www.linkedin.com/in/harshranjan",
      "https://twitter.com/harshranjan",
      // Add more social profiles
    ],
    knowsAbout: [
      "Digital Marketing",
      "SEO",
      "PPC",
      "Content Marketing",
      "Social Media Marketing",
    ],
  };

  return JSON.stringify(schema);
};

/**
 * Generate Organization Schema
 */
exports.generateOrganizationSchema = (baseUrl) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Harsh Ranjan - Digital Marketing Expert",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Professional Digital Marketing Services - SEO, PPC, Content Strategy",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@harshranjan.com",
    },
  };

  return JSON.stringify(schema);
};

/**
 * Generate BreadcrumbList Schema
 */
exports.generateBreadcrumbSchema = (breadcrumbs, baseUrl) => {
  const itemListElement = breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: `${baseUrl}${crumb.url}`,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return JSON.stringify(schema);
};

/**
 * Generate Open Graph Meta Tags
 */
exports.generateOpenGraphTags = (content, type = "website", baseUrl) => {
  return {
    "og:title": content.meta_title || content.title,
    "og:description": content.meta_description || content.excerpt,
    "og:type": type,
    "og:url": `${baseUrl}/${content.slug}`,
    "og:image": content.featured_image
      ? `${baseUrl}${content.featured_image}`
      : `${baseUrl}/default-og-image.jpg`,
    "og:site_name": "Harsh Ranjan - Digital Marketing Expert",
  };
};

/**
 * Generate Twitter Card Meta Tags
 */
exports.generateTwitterCardTags = (content, baseUrl) => {
  return {
    "twitter:card": "summary_large_image",
    "twitter:site": "@harshranjan",
    "twitter:creator": "@harshranjan",
    "twitter:title": content.meta_title || content.title,
    "twitter:description": content.meta_description || content.excerpt,
    "twitter:image": content.featured_image
      ? `${baseUrl}${content.featured_image}`
      : `${baseUrl}/default-twitter-image.jpg`,
  };
};

/**
 * Generate Complete SEO Meta Tags Object
 */
exports.generateSEOMetaTags = (content, type = "website") => {
  const baseUrl =
    process.env.FRONTEND_URL || "https://www.harshranjan.com";

  return {
    title: content.meta_title || content.title,
    description: content.meta_description || content.excerpt,
    keywords: content.meta_keywords || content.tags?.join(", "),
    canonical: `${baseUrl}/${content.slug}`,
    openGraph: this.generateOpenGraphTags(content, type, baseUrl),
    twitter: this.generateTwitterCardTags(content, baseUrl),
    schema:
      type === "article"
        ? this.generateArticleSchema(content, baseUrl)
        : this.generateWebPageSchema(content, baseUrl),
  };
};
