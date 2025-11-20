const express = require("express");
const router = express.Router();
const ctaBannerController = require("../controllers/ctaBanner.controller");
const { authMiddleware, adminOnly } = require("../middleware/auth.middleware");

// Public routes
router.get("/active", ctaBannerController.getActiveBanners);
router.get("/:id/embed", ctaBannerController.getBanner);
router.post("/:id/track-view", ctaBannerController.trackView);
router.post("/:id/track-click", ctaBannerController.trackClick);

// Admin routes (protected)
router.get("/", authMiddleware, adminOnly, ctaBannerController.getAllBanners);
router.get("/:id", authMiddleware, adminOnly, ctaBannerController.getBanner);
router.post("/", authMiddleware, adminOnly, ctaBannerController.createBanner);
router.put("/:id", authMiddleware, adminOnly, ctaBannerController.updateBanner);
router.delete(
  "/:id",
  authMiddleware,
  adminOnly,
  ctaBannerController.deleteBanner
);
router.post(
  "/:id/duplicate",
  authMiddleware,
  adminOnly,
  ctaBannerController.duplicateBanner
);

module.exports = router;
