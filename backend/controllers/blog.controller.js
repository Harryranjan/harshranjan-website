const BlogPost = require("../models/BlogPost");
const { Tag } = require("../models");
const { validationResult } = require("express-validator");
const { sequelize } = require("../config/database");

// Helper function to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
};

// Helper function to ensure tags exist and update usage counts
const syncPostTags = async (tags) => {
  if (!tags || !Array.isArray(tags)) return;

  for (const tagName of tags) {
    const slug = generateSlug(tagName);

    // Find or create tag
    let tag = await Tag.findOne({ where: { slug } });
    if (!tag) {
      tag = await Tag.create({
        name: tagName,
        slug,
        color: "#10B981",
        usage_count: 0,
      });
    }

    // Update usage count
    const posts = await BlogPost.findAll({
      where: {
        tags: {
          [require("sequelize").Op.like]: `%"${tagName}"%`,
        },
      },
    });

    tag.usage_count = posts.length;
    await tag.save();
  }
};

// Helper function to calculate reading time
const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
exports.getAllPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      published,
      search,
    } = req.query;
    const offset = (page - 1) * limit;
    const { Op } = require("sequelize");

    const where = {};

    // Search functionality - search in title, excerpt, and content
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { excerpt: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ];
    }

    if (category) {
      where.category = {
        [Op.like]: `%"${category}"%`,
      };
    }
    if (published !== undefined) where.is_published = published === "true";
    if (tag) {
      where.tags = {
        [Op.like]: `%"${tag}"%`,
      };
    }

    const { count, rows } = await BlogPost.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["created_at", "DESC"]],
    });

    res.json({
      success: true,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      posts: rows,
    });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get single blog post
// @route   GET /api/blog/:id
// @access  Public
exports.getPost = async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Increment views
    await post.increment("views");

    res.json({ success: true, post });
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get blog post by slug
// @route   GET /api/blog/slug/:slug
// @access  Public
exports.getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      where: { slug: req.params.slug },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Increment views
    await post.increment("views");

    res.json({ success: true, post });
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get related blog posts
// @route   GET /api/blog/:id/related
// @access  Public
exports.getRelatedPosts = async (req, res) => {
  try {
    const { Op } = require("sequelize");
    const currentPost = await BlogPost.findByPk(req.params.id);

    if (!currentPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const limit = parseInt(req.query.limit) || 3;
    const category = currentPost.category;
    const tags = currentPost.tags;

    // Build query to find posts with matching category or tags
    const whereConditions = {
      id: { [Op.ne]: currentPost.id }, // Exclude current post
      is_published: true,
    };

    // Create array to store OR conditions
    const orConditions = [];

    // Add category condition if exists
    if (category && Array.isArray(category) && category.length > 0) {
      category.forEach((cat) => {
        orConditions.push({
          category: { [Op.like]: `%"${cat}"%` },
        });
      });
    }

    // Add tag conditions if exist
    if (tags && Array.isArray(tags) && tags.length > 0) {
      tags.forEach((tag) => {
        orConditions.push({
          tags: { [Op.like]: `%"${tag}"%` },
        });
      });
    }

    // Only add OR condition if we have matches to search for
    if (orConditions.length > 0) {
      whereConditions[Op.or] = orConditions;
    }

    const relatedPosts = await BlogPost.findAll({
      where: whereConditions,
      limit: limit,
      order: [
        ["views", "DESC"], // Prioritize popular posts
        ["created_at", "DESC"],
      ],
    });

    res.json({
      success: true,
      posts: relatedPosts,
    });
  } catch (error) {
    console.error("Get related posts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create blog post
// @route   POST /api/blog
// @access  Private (Admin)
exports.createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      excerpt,
      content,
      category,
      tags,
      meta_title,
      meta_description,
      is_published,
      publish_status,
      scheduled_at,
    } = req.body;

    // Generate slug from title
    let slug = generateSlug(title);

    // Check if slug exists, make it unique
    let slugExists = await BlogPost.findOne({ where: { slug } });
    let counter = 1;
    while (slugExists) {
      slug = `${generateSlug(title)}-${counter}`;
      slugExists = await BlogPost.findOne({ where: { slug } });
      counter++;
    }

    // Calculate reading time
    const reading_time = calculateReadingTime(content);

    // Determine publishing details based on status
    let publishData = {
      is_published: false,
      published_at: null,
      publish_status: publish_status || "draft",
      scheduled_at: null,
    };

    if (publish_status === "published") {
      publishData.is_published = true;
      publishData.published_at = new Date();
    } else if (publish_status === "scheduled" && scheduled_at) {
      publishData.scheduled_at = new Date(scheduled_at);
      publishData.is_published = false;
      publishData.published_at = null;
    }

    const post = await BlogPost.create({
      title,
      slug,
      excerpt,
      content,
      category,
      tags: tags || [],
      reading_time,
      author_id: req.user.id,
      meta_title: meta_title || title,
      meta_description: meta_description || excerpt,
      ...publishData,
    });

    // Sync tags - auto-create tags and update usage counts
    if (tags && Array.isArray(tags)) {
      await syncPostTags(tags);
    }

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private (Admin)
exports.updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const {
      title,
      excerpt,
      content,
      category,
      tags,
      meta_title,
      meta_description,
      is_published,
      publish_status,
      scheduled_at,
      featured_image,
    } = req.body;

    // Update slug if title changed
    if (title && title !== post.title) {
      post.slug = generateSlug(title);
    }

    // Update reading time if content changed
    if (content && content !== post.content) {
      post.reading_time = calculateReadingTime(content);
    }

    // Handle publish status changes
    if (publish_status) {
      post.publish_status = publish_status;

      if (publish_status === "published") {
        post.is_published = true;
        if (!post.published_at) {
          post.published_at = new Date();
        }
        post.scheduled_at = null;
      } else if (publish_status === "scheduled") {
        // Update scheduled_at if provided, or keep existing
        if (scheduled_at) {
          post.scheduled_at = new Date(scheduled_at);
        }
        post.is_published = false;
        post.published_at = null;
      } else if (publish_status === "draft") {
        post.is_published = false;
        post.published_at = null;
        post.scheduled_at = null;
      }
    } else if (scheduled_at && post.publish_status === "scheduled") {
      // Allow updating scheduled_at even if publish_status doesn't change
      post.scheduled_at = new Date(scheduled_at);
    }

    post.title = title || post.title;
    post.excerpt = excerpt || post.excerpt;
    post.content = content || post.content;
    post.featured_image =
      featured_image !== undefined ? featured_image : post.featured_image;
    post.category = category || post.category;
    post.tags = tags || post.tags;
    post.meta_title = meta_title || post.meta_title;
    post.meta_description = meta_description || post.meta_description;

    await post.save();

    // Sync tags - auto-create tags and update usage counts
    if (tags && Array.isArray(tags)) {
      await syncPostTags(tags);
    }

    res.json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private (Admin)
exports.deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.destroy();

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get blog categories
// @route   GET /api/blog/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    // Get all posts with categories
    const posts = await BlogPost.findAll({
      attributes: ["category"],
      where: {
        category: {
          [require("sequelize").Op.ne]: null,
        },
      },
    });

    // Extract and count unique categories
    const categoryCount = {};
    posts.forEach((post) => {
      if (Array.isArray(post.category)) {
        post.category.forEach((cat) => {
          categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        });
      }
    });

    // Format as array of strings (most popular first)
    const categories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);

    res.json({ success: true, categories });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
