const express = require("express");
const router = express.Router();
const downloadLeadController = require("../controllers/downloadLead.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

// Public route - submit lead to get download
router.post("/submit", downloadLeadController.submitLead);

// Admin routes (protected)
router.get("/", authMiddleware, downloadLeadController.getAllLeads);
router.get("/stats", authMiddleware, downloadLeadController.getLeadStats);
router.get("/export", authMiddleware, downloadLeadController.exportLeads);
router.get(
  "/download/:downloadId",
  authMiddleware,
  downloadLeadController.getLeadsByDownload
);
router.patch(
  "/:id/downloaded",
  authMiddleware,
  downloadLeadController.markAsDownloaded
);

module.exports = router;
