const express = require("express");
const router = express.Router();
const ctaBannerController = require("../controllers/ctaBanner.controller");
const { authenticateToken, isAdmin } = require("../middleware/auth.middleware");

// Public routes
router.get("/active", ctaBannerController.getActiveBanners);
router.get("/:id/embed", ctaBannerController.getBanner);
router.post("/:id/track-view", ctaBannerController.trackView);
router.post("/:id/track-click", ctaBannerController.trackClick);

// Admin routes (protected)
router.get("/", authenticateToken, isAdmin, ctaBannerController.getAllBanners);
router.get("/:id", authenticateToken, isAdmin, ctaBannerController.getBanner);
router.post("/", authenticateToken, isAdmin, ctaBannerController.createBanner);
router.put("/:id", authenticateToken, isAdmin, ctaBannerController.updateBanner);
router.delete("/:id", authenticateToken, isAdmin, ctaBannerController.deleteBanner);
router.post("/:id/duplicate", authenticateToken, isAdmin, ctaBannerController.duplicateBanner);

module.exports = router;
