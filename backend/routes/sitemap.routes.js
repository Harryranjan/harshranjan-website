const express = require("express");
const router = express.Router();
const sitemapController = require("../controllers/sitemap.controller");

// Generate XML sitemap
router.get("/sitemap.xml", sitemapController.generateSitemap);

// Generate robots.txt
router.get("/robots.txt", sitemapController.generateRobotsTxt);

module.exports = router;
