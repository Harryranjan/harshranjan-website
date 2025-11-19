const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const blogController = require("../controllers/blog.controller");
const categoryController = require("../controllers/category.controller");
const { authMiddleware, adminOnly } = require("../middleware/auth.middleware");

// Tag controller
const tagController = require("../controllers/tag.controller");

// Public routes - specific routes MUST come before dynamic routes (/:id)
router.get("/", blogController.getAllPosts);
router.get("/categories", blogController.getCategories);
router.get("/tags", tagController.getAllTags);
router.get("/tags/popular", tagController.getPopularTags);
router.get("/slug/:slug", blogController.getPostBySlug);
router.get("/:id/related", blogController.getRelatedPosts);
router.get("/:id", blogController.getPost);

// Category management routes (Admin only)
router.get(
  "/admin/categories",
  [authMiddleware, adminOnly],
  categoryController.getAllCategories
);
router.get(
  "/admin/categories/:id",
  [authMiddleware, adminOnly],
  categoryController.getCategoryById
);
router.post(
  "/admin/categories",
  [authMiddleware, adminOnly],
  categoryController.createCategory
);
router.put(
  "/admin/categories/:id",
  [authMiddleware, adminOnly],
  categoryController.updateCategory
);
router.delete(
  "/admin/categories/:id",
  [authMiddleware, adminOnly],
  categoryController.deleteCategory
);

// Tag management routes (Admin only)
router.get(
  "/admin/tags",
  [authMiddleware, adminOnly],
  tagController.getAllTags
);
router.get(
  "/admin/tags/:id",
  [authMiddleware, adminOnly],
  tagController.getTagById
);
router.post(
  "/admin/tags",
  [authMiddleware, adminOnly],
  tagController.createTag
);
router.put(
  "/admin/tags/:id",
  [authMiddleware, adminOnly],
  tagController.updateTag
);
router.delete(
  "/admin/tags/:id",
  [authMiddleware, adminOnly],
  tagController.deleteTag
);
router.post(
  "/admin/tags/sync",
  [authMiddleware, adminOnly],
  tagController.syncTagCounts
);

// Protected routes (Admin only)
router.post(
  "/",
  [authMiddleware, adminOnly],
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
  ],
  blogController.createPost
);

router.put("/:id", [authMiddleware, adminOnly], blogController.updatePost);

router.delete("/:id", [authMiddleware, adminOnly], blogController.deletePost);

module.exports = router;
