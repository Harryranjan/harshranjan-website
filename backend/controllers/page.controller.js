const Page = require("../models/Page");
const { Op } = require("sequelize");
const { processShortcodes } = require("../utils/shortcodeProcessor");

// Get all pages (with filtering and pagination)
exports.getAllPages = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      template,
      search,
      show_in_menu,
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    if (status) where.status = status;
    if (template) where.template = template;
    if (show_in_menu !== undefined)
      where.show_in_menu = show_in_menu === "true";
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { slug: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows: pages } = await Page.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [
        ["menu_order", "ASC"],
        ["created_at", "DESC"],
      ],
      raw: false, // Ensure we get model instances
    });

    // Transform to include both snake_case and camelCase for compatibility
    const transformedPages = pages.map((page) => {
      const pageData = page.toJSON();

      // Parse content if it's a JSON string (from block editor)
      let content = pageData.content;
      try {
        if (content && typeof content === "string" && content.startsWith("[")) {
          content = JSON.parse(content);
        }
      } catch (e) {
        // Keep as string if parsing fails
      }

      // Ensure timestamps are included in both formats
      const created = pageData.created_at || pageData.createdAt;
      const updated = pageData.updated_at || pageData.updatedAt;

      return {
        ...pageData,
        content,
        created_at: created,
        updated_at: updated,
        createdAt: created,
        updatedAt: updated,
      };
    });

    res.json({
      pages: transformedPages,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      totalCount: count,
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ message: "Failed to fetch pages" });
  }
};

// Get single page by ID
exports.getPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await Page.findByPk(id);

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    const pageData = page.toJSON();

    // Parse content if it's a JSON string (from block editor)
    let content = pageData.content;
    try {
      if (content && typeof content === "string" && content.startsWith("[")) {
        content = JSON.parse(content);
      }
    } catch (e) {
      // Keep as string if parsing fails
    }

    // Ensure timestamps are included in both formats
    const created = pageData.created_at || pageData.createdAt;
    const updated = pageData.updated_at || pageData.updatedAt;

    res.json({
      page: {
        ...pageData,
        content,
        created_at: created,
        updated_at: updated,
        createdAt: created,
        updatedAt: updated,
      },
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    res.status(500).json({ message: "Failed to fetch page" });
  }
};

// Get page by slug (for public viewing)
exports.getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ where: { slug, status: "published" } });

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    // Increment views
    await page.increment("views");

    // Process shortcodes in content for full HTML pages
    const pageData = page.toJSON();
    if (pageData.content && typeof pageData.content === "string") {
      // Check if it's full HTML (starts with <!DOCTYPE or <html)
      const isFullHTML = /^\s*<!DOCTYPE|^\s*<html/i.test(pageData.content);
      if (isFullHTML) {
        pageData.content = processShortcodes(pageData.content);
      }
    }

    // Generate SEO metadata
    const seoHelpers = require("../utils/seoHelpers");
    const seoMetadata = seoHelpers.generateSEOMetaTags(page, "website");

    res.json({
      page: pageData,
      seo: seoMetadata,
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    res.status(500).json({ message: "Failed to fetch page" });
  }
};

// Create new page
exports.createPage = async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      excerpt,
      featured_image,
      template,
      status,
      is_homepage,
      show_in_menu,
      hide_title,
      menu_order,
      parent_id,
      meta_title,
      meta_description,
      meta_keywords,
      custom_css,
      custom_js,
      head_scripts,
      body_scripts,
    } = req.body;

    // Check if slug already exists
    const existingPage = await Page.findOne({ where: { slug } });
    if (existingPage) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    // If setting as homepage, unset other homepages
    if (is_homepage) {
      await Page.update(
        { is_homepage: false },
        { where: { is_homepage: true } }
      );
    }

    // Serialize content if it's an array (from block editor)
    let processedContent = content;
    if (Array.isArray(content)) {
      processedContent = JSON.stringify(content);
    }

    const page = await Page.create({
      title,
      slug,
      content: processedContent,
      excerpt,
      featured_image,
      template: template || "default",
      status: status || "draft",
      is_homepage: is_homepage || false,
      show_in_menu: show_in_menu !== undefined ? show_in_menu : true,
      hide_title: hide_title === true,
      menu_order: menu_order || 0,
      parent_id: parent_id || null,
      meta_title,
      meta_description,
      meta_keywords,
      author_id: req.user.id,
      custom_css,
      custom_js,
      head_scripts,
      body_scripts,
    });

    res.status(201).json({ message: "Page created successfully", page });
  } catch (error) {
    console.error("Error creating page:", error);
    res.status(500).json({ message: "Failed to create page" });
  }
};

// Update page
exports.updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      content,
      excerpt,
      featured_image,
      template,
      status,
      is_homepage,
      show_in_menu,
      hide_title,
      menu_order,
      parent_id,
      meta_title,
      meta_description,
      meta_keywords,
      custom_css,
      custom_js,
      head_scripts,
      body_scripts,
    } = req.body;

    const page = await Page.findByPk(id);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    // Check if slug is being changed and if it already exists
    if (slug && slug !== page.slug) {
      const existingPage = await Page.findOne({ where: { slug } });
      if (existingPage) {
        return res.status(400).json({ message: "Slug already exists" });
      }
    }

    // If setting as homepage, unset other homepages
    if (is_homepage && !page.is_homepage) {
      await Page.update(
        { is_homepage: false },
        { where: { is_homepage: true } }
      );
    }

    // Serialize content if it's an array (from block editor)
    let processedContent = content;
    if (Array.isArray(content)) {
      processedContent = JSON.stringify(content);
    }

    await page.update({
      title,
      slug,
      content: processedContent,
      excerpt,
      featured_image,
      template,
      status,
      is_homepage,
      show_in_menu,
      hide_title: hide_title === true,
      menu_order,
      parent_id,
      meta_title,
      meta_description,
      meta_keywords,
      custom_css,
      custom_js,
      head_scripts,
      body_scripts,
    });

    res.json({ message: "Page updated successfully", page });
  } catch (error) {
    console.error("Error updating page:", error);
    res.status(500).json({ message: "Failed to update page" });
  }
};

// Delete page
exports.deletePage = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await Page.findByPk(id);

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    // Check if page has children
    const childPages = await Page.count({ where: { parent_id: id } });
    if (childPages > 0) {
      return res.status(400).json({
        message:
          "Cannot delete page with child pages. Delete or reassign child pages first.",
      });
    }

    await page.destroy();
    res.json({ message: "Page deleted successfully" });
  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({ message: "Failed to delete page" });
  }
};

// Get menu pages (for navigation)
exports.getMenuPages = async (req, res) => {
  try {
    const pages = await Page.findAll({
      where: {
        show_in_menu: true,
        status: "published",
      },
      attributes: ["id", "title", "slug", "parent_id", "menu_order"],
      order: [
        ["menu_order", "ASC"],
        ["title", "ASC"],
      ],
    });

    res.json({ pages });
  } catch (error) {
    console.error("Error fetching menu pages:", error);
    res.status(500).json({ message: "Failed to fetch menu pages" });
  }
};
