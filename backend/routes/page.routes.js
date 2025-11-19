const express = require("express");
const router = express.Router();
const pageController = require("../controllers/page.controller");
const { authMiddleware, adminOnly } = require("../middleware/auth.middleware");

// Public routes
router.get("/menu", pageController.getMenuPages);
router.get("/slug/:slug", pageController.getPageBySlug);

// Admin routes
router.get("/", authMiddleware, adminOnly, pageController.getAllPages);
router.get("/:id", authMiddleware, adminOnly, pageController.getPageById);
router.post("/", authMiddleware, adminOnly, pageController.createPage);
router.put("/:id", authMiddleware, adminOnly, pageController.updatePage);
router.delete("/:id", authMiddleware, adminOnly, pageController.deletePage);

module.exports = router;
