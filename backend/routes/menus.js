const express = require("express");
const router = express.Router();
const db = require("../config/database");

// Get active header menu with items
router.get("/header", async (req, res) => {
  try {
    // Get active header menu
    const [menus] = await db.query(
      "SELECT * FROM menus WHERE location = 'header' AND is_active = 1 LIMIT 1"
    );

    if (menus.length === 0) {
      return res.json([]);
    }

    const menu = menus[0];

    // Get menu items for this menu
    const [items] = await db.query(
      `SELECT * FROM menu_items 
       WHERE menu_id = ? AND is_active = 1 AND parent_id IS NULL 
       ORDER BY \`order\` ASC`,
      [menu.id]
    );

    // Build menu structure with submenus
    const menuItems = await Promise.all(
      items.map(async (item) => {
        const menuItem = {
          label: item.title,
          path: item.url || "#",
        };

        // Get submenu items
        const [subItems] = await db.query(
          `SELECT * FROM menu_items 
           WHERE menu_id = ? AND parent_id = ? AND is_active = 1 
           ORDER BY \`order\` ASC`,
          [menu.id, item.id]
        );

        if (subItems.length > 0) {
          menuItem.submenu = subItems.map((sub) => ({
            label: sub.title,
            path: sub.url,
          }));
        }

        return menuItem;
      })
    );

    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching header menu:", error);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

// Get active footer menu with items
router.get("/footer", async (req, res) => {
  try {
    // Get active footer menu
    const [menus] = await db.query(
      "SELECT * FROM menus WHERE location = 'footer' AND is_active = 1 LIMIT 1"
    );

    if (menus.length === 0) {
      return res.json({});
    }

    const menu = menus[0];

    // Get footer settings from settings table
    const [settings] = await db.query(
      "SELECT `key`, value FROM settings WHERE category = 'footer' OR category = 'general'"
    );

    const footerSettings = {};
    settings.forEach((setting) => {
      footerSettings[setting.key] = setting.value;
    });

    // Get menu items for footer (organized by sections)
    const [items] = await db.query(
      `SELECT * FROM menu_items 
       WHERE menu_id = ? AND is_active = 1 AND parent_id IS NULL 
       ORDER BY \`order\` ASC`,
      [menu.id]
    );

    // Build footer structure
    const footerSections = await Promise.all(
      items.map(async (item) => {
        const [subItems] = await db.query(
          `SELECT * FROM menu_items 
           WHERE menu_id = ? AND parent_id = ? AND is_active = 1 
           ORDER BY \`order\` ASC`,
          [menu.id, item.id]
        );

        return {
          title: item.title,
          items: subItems.map((sub) => ({
            label: sub.title,
            path: sub.url,
            icon: sub.icon,
          })),
        };
      })
    );

    res.json({
      sections: footerSections,
      settings: footerSettings,
    });
  } catch (error) {
    console.error("Error fetching footer menu:", error);
    res.status(500).json({ error: "Failed to fetch footer" });
  }
});

// Get all menus (for admin)
router.get("/", async (req, res) => {
  try {
    const [menus] = await db.query(
      "SELECT * FROM menus ORDER BY location, id DESC"
    );
    res.json(menus);
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ error: "Failed to fetch menus" });
  }
});

// Toggle menu active status
router.patch("/:id/toggle", async (req, res) => {
  try {
    const { id } = req.params;

    // Get current menu
    const [menus] = await db.query("SELECT * FROM menus WHERE id = ?", [id]);
    if (menus.length === 0) {
      return res.status(404).json({ error: "Menu not found" });
    }

    const menu = menus[0];
    const newStatus = menu.is_active === 1 ? 0 : 1;

    // If activating this menu, deactivate other menus in same location
    if (newStatus === 1) {
      await db.query(
        "UPDATE menus SET is_active = 0 WHERE location = ? AND id != ?",
        [menu.location, id]
      );
    }

    // Update this menu
    await db.query("UPDATE menus SET is_active = ? WHERE id = ?", [
      newStatus,
      id,
    ]);

    res.json({ success: true, is_active: newStatus });
  } catch (error) {
    console.error("Error toggling menu:", error);
    res.status(500).json({ error: "Failed to toggle menu" });
  }
});

module.exports = router;
