const { Page, BlogPost } = require("../models");
const { Op } = require("sequelize");

/**
 * Generate XML Sitemap
 * Creates sitemap.xml with all published pages and blog posts
 */
exports.generateSitemap = async (req, res) => {
  try {
    const baseUrl =
      process.env.FRONTEND_URL || "https://www.harshranjan.com";

    // Get all published pages
    const pages = await Page.findAll({
      where: {
        status: "published",
      },
      attributes: ["slug", "updated_at"],
      order: [["updated_at", "DESC"]],
    });

    // Get all published blog posts
    const blogPosts = await BlogPost.findAll({
      where: {
        is_published: true,
      },
      attributes: ["slug", "updated_at", "published_at"],
      order: [["published_at", "DESC"]],
    });

    // Build sitemap XML
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap +=
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add homepage
    sitemap += "  <url>\n";
    sitemap += `    <loc>${baseUrl}/</loc>\n`;
    sitemap += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    sitemap += "    <changefreq>daily</changefreq>\n";
    sitemap += "    <priority>1.0</priority>\n";
    sitemap += "  </url>\n";

    // Add pages
    pages.forEach((page) => {
      sitemap += "  <url>\n";
      sitemap += `    <loc>${baseUrl}/${page.slug}</loc>\n`;
      sitemap += `    <lastmod>${new Date(page.updated_at).toISOString()}</lastmod>\n`;
      sitemap += "    <changefreq>weekly</changefreq>\n";
      sitemap += "    <priority>0.8</priority>\n";
      sitemap += "  </url>\n";
    });

    // Add blog posts
    blogPosts.forEach((post) => {
      sitemap += "  <url>\n";
      sitemap += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      sitemap += `    <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>\n`;
      sitemap += "    <changefreq>monthly</changefreq>\n";
      sitemap += "    <priority>0.7</priority>\n";
      sitemap += "  </url>\n";
    });

    // Add blog list page
    sitemap += "  <url>\n";
    sitemap += `    <loc>${baseUrl}/blog</loc>\n`;
    sitemap += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    sitemap += "    <changefreq>daily</changefreq>\n";
    sitemap += "    <priority>0.9</priority>\n";
    sitemap += "  </url>\n";

    sitemap += "</urlset>";

    // Set headers and send response
    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
};

/**
 * Generate robots.txt
 */
exports.generateRobotsTxt = async (req, res) => {
  try {
    const baseUrl =
      process.env.FRONTEND_URL || "https://www.harshranjan.com";

    let robotsTxt = "# Robots.txt for Harsh Ranjan Website\n\n";
    robotsTxt += "User-agent: *\n";
    robotsTxt += "Allow: /\n";
    robotsTxt += "Disallow: /admin/\n";
    robotsTxt += "Disallow: /api/\n";
    robotsTxt += "Disallow: /uploads/\n\n";
    robotsTxt += `Sitemap: ${baseUrl}/sitemap.xml\n`;

    res.header("Content-Type", "text/plain");
    res.send(robotsTxt);
  } catch (error) {
    console.error("Error generating robots.txt:", error);
    res.status(500).send("Error generating robots.txt");
  }
};
