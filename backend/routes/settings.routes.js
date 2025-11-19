const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settings.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

// All routes require authentication
router.use(authMiddleware);

// Get settings by category
router.get("/category/:category", settingsController.getSettingsByCategory);

// Get single setting
router.get("/:key", settingsController.getSetting);

// Update multiple settings
router.put("/", settingsController.updateSettings);

// Update single setting
router.put("/:key", settingsController.updateSetting);

// Email specific routes
router.get("/email/status", settingsController.getEmailStatus);
router.post("/email/test", settingsController.testEmail);

module.exports = router;
