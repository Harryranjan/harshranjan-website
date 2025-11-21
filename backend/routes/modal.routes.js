const express = require("express");
const router = express.Router();
const modalController = require("../controllers/modal.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

// Modal routes (protected)
router.get("/", authMiddleware, modalController.getAllModals);
router.get("/active", modalController.getActiveModals); // Public endpoint
router.get("/:id", modalController.getModalById); // Public endpoint - needed for modal display
router.post("/", authMiddleware, modalController.createModal);
router.put("/:id", authMiddleware, modalController.updateModal);
router.delete("/:id", authMiddleware, modalController.deleteModal);

// Tracking routes (public)
router.post("/:id/view", modalController.trackModalView);
router.post("/:id/conversion", modalController.trackModalConversion);

module.exports = router;
