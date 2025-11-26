const express = require("express");
const router = express.Router();
const leadController = require("../controllers/lead.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

// Public route - Create lead from demo
router.post("/", leadController.createLead);

// Protected admin routes
router.get("/stats", authMiddleware, leadController.getLeadStats);
router.get("/", authMiddleware, leadController.getAllLeads);
router.get("/:id", authMiddleware, leadController.getLead);
router.put("/:id/status", authMiddleware, leadController.updateLeadStatus);
router.delete("/:id", authMiddleware, leadController.deleteLead);

module.exports = router;
