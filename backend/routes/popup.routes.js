const express = require("express");
const router = express.Router();
const popupController = require("../controllers/popup.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

// Popup routes (protected)
router.get("/", authMiddleware, popupController.getAllPopups);
router.get("/active", popupController.getActivePopups); // Public endpoint
router.get("/:id", authMiddleware, popupController.getPopupById);
router.post("/", authMiddleware, popupController.createPopup);
router.put("/:id", authMiddleware, popupController.updatePopup);
router.delete("/:id", authMiddleware, popupController.deletePopup);

// Tracking routes (public)
router.post("/:id/view", popupController.trackPopupView);
router.post("/:id/click", popupController.trackPopupClick);
router.post("/:id/conversion", popupController.trackPopupConversion);

module.exports = router;
