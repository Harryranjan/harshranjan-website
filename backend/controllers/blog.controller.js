const BlogPost = require("../models/BlogPost");
const { validationResult } = require("express-validator");

// Helper function to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
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
    const { page = 1, limit = 10, category, published } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (category) where.category = category;
    if (published !== undefined) where.is_published = published === "true";

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

// @desc    Create blog post
// @route   POST /api/blog
// @access  Private (Admin)
exports.createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, excerpt, content, category, tags, meta_title, meta_description, is_published } = req.body;

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
      is_published: is_published || false,
      published_at: is_published ? new Date() : null,
    });

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

    const { title, excerpt, content, category, tags, meta_title, meta_description, is_published } = req.body;

    // Update slug if title changed
    if (title && title !== post.title) {
      post.slug = generateSlug(title);
    }

    // Update reading time if content changed
    if (content && content !== post.content) {
      post.reading_time = calculateReadingTime(content);
    }

    // Update published_at if publishing for the first time
    if (is_published && !post.is_published) {
      post.published_at = new Date();
    }

    post.title = title || post.title;
    post.excerpt = excerpt || post.excerpt;
    post.content = content || post.content;
    post.category = category || post.category;
    post.tags = tags || post.tags;
    post.meta_title = meta_title || post.meta_title;
    post.meta_description = meta_description || post.meta_description;
    post.is_published = is_published !== undefined ? is_published : post.is_published;

    await post.save();

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
    const categories = await BlogPost.findAll({
      attributes: [
        "category",
        [sequelize.fn("COUNT", sequelize.col("category")), "count"],
      ],
      where: {
        category: {
          [sequelize.Op.ne]: null,
        },
      },
      group: ["category"],
    });

    res.json({ success: true, categories });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
