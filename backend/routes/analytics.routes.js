const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

// All analytics routes require authentication
router.use(authMiddleware);

// Get conversion statistics
router.get("/conversions", analyticsController.getConversionStats);

// Get SEO statistics
router.get("/seo", analyticsController.getSEOStats);

// Get traffic trends
router.get("/traffic-trends", analyticsController.getTrafficTrends);

module.exports = router;
