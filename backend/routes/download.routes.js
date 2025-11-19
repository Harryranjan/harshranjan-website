const express = require("express");
const router = express.Router();
const downloadController = require("../controllers/download.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

// Public routes
router.get("/public", downloadController.getPublicDownloads);
router.get("/public/:slug", downloadController.getDownloadBySlug);
router.get("/categories", downloadController.getCategories);

// Admin routes (protected)
router.get("/", authMiddleware, downloadController.getAllDownloads);
router.get("/stats", authMiddleware, downloadController.getDownloadStats);
router.post("/", authMiddleware, downloadController.createDownload);
router.get("/:id", authMiddleware, downloadController.getDownloadById);
router.put("/:id", authMiddleware, downloadController.updateDownload);
router.delete("/:id", authMiddleware, downloadController.deleteDownload);

module.exports = router;
