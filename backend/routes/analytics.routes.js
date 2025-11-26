const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { cacheStrategies } = require("../middleware/cache");

// All analytics routes require authentication
router.use(authMiddleware);

// Get conversion statistics - cached for 15 minutes
router.get(
  "/conversions",
  cacheStrategies.analytics,
  analyticsController.getConversionStats
);

// Get SEO statistics - cached for 15 minutes
router.get("/seo", cacheStrategies.analytics, analyticsController.getSEOStats);

// Get traffic trends - cached for 15 minutes
router.get(
  "/traffic-trends",
  cacheStrategies.analytics,
  analyticsController.getTrafficTrends
);

module.exports = router;
