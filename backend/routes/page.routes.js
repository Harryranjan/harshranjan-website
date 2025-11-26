const express = require("express");
const router = express.Router();
const pageController = require("../controllers/page.controller");
const { authMiddleware, adminOnly } = require("../middleware/auth.middleware");
const {
  cacheStrategies,
  invalidateCache,
  invalidationPatterns,
} = require("../middleware/cache");

// Public routes - cached
router.get("/menu", cacheStrategies.page, pageController.getMenuPages);
router.get("/slug/:slug", cacheStrategies.page, pageController.getPageBySlug);

// Admin routes - invalidate cache on modifications
router.get("/", authMiddleware, adminOnly, pageController.getAllPages);
router.get("/:id", authMiddleware, adminOnly, pageController.getPageById);
router.post(
  "/",
  authMiddleware,
  adminOnly,
  invalidateCache(...invalidationPatterns.page),
  pageController.createPage
);
router.put(
  "/:id",
  authMiddleware,
  adminOnly,
  invalidateCache(...invalidationPatterns.page),
  pageController.updatePage
);
router.delete(
  "/:id",
  authMiddleware,
  adminOnly,
  invalidateCache(...invalidationPatterns.page),
  pageController.deletePage
);

module.exports = router;
