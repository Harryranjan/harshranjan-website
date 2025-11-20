const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu.controller");
const menuItemController = require("../controllers/menuItem.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

// Public routes
router.get("/location/:location", menuController.getMenuByLocation);

// Protected routes (admin only)
router.get("/", authMiddleware, menuController.getAllMenus);
router.get("/:id", authMiddleware, menuController.getMenuById);
router.post("/", authMiddleware, menuController.createMenu);
router.put("/:id", authMiddleware, menuController.updateMenu);
router.delete("/:id", authMiddleware, menuController.deleteMenu);

// Menu items routes
router.get("/:menuId/items", authMiddleware, menuItemController.getMenuItems);
router.post("/items", authMiddleware, menuItemController.createMenuItem);
router.put("/items/:id", authMiddleware, menuItemController.updateMenuItem);
router.delete("/items/:id", authMiddleware, menuItemController.deleteMenuItem);
router.post(
  "/items/reorder",
  authMiddleware,
  menuItemController.updateMenuItemsOrder
);

// Get available pages for menu
router.get(
  "/pages/available",
  authMiddleware,
  menuController.getAvailablePages
);

module.exports = router;
