const MenuItem = require("../models/MenuItem");
const Page = require("../models/Page");

// Get all menu items for a menu
exports.getMenuItems = async (req, res) => {
  try {
    const { menuId } = req.params;
    const items = await MenuItem.getByMenu(menuId);

    res.json({ items });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Failed to fetch menu items" });
  }
};

// Create menu item
exports.createMenuItem = async (req, res) => {
  try {
    const {
      menu_id,
      parent_id,
      title,
      url,
      type,
      target,
      icon,
      badge,
      description,
      image,
      css_class,
      order,
      visibility,
      page_id,
      mega_menu_settings,
      is_active,
    } = req.body;

    const item = await MenuItem.create({
      menu_id,
      parent_id: parent_id || null,
      title,
      url,
      type: type || "custom",
      target: target || "_self",
      icon,
      badge,
      description,
      image,
      css_class,
      order: order || 0,
      visibility: visibility || "both",
      page_id: page_id || null,
      mega_menu_settings: mega_menu_settings || {},
      is_active: is_active !== undefined ? is_active : true,
    });

    res.status(201).json({ message: "Menu item created successfully", item });
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ message: "Failed to create menu item" });
  }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      parent_id,
      title,
      url,
      type,
      target,
      icon,
      badge,
      description,
      image,
      css_class,
      order,
      visibility,
      page_id,
      mega_menu_settings,
      is_active,
    } = req.body;

    const item = await MenuItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    await item.update({
      parent_id,
      title,
      url,
      type,
      target,
      icon,
      badge,
      description,
      image,
      css_class,
      order,
      visibility,
      page_id,
      mega_menu_settings,
      is_active,
    });

    res.json({ message: "Menu item updated successfully", item });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: "Failed to update menu item" });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Delete children items too (cascade should handle this)
    await MenuItem.destroy({ where: { parent_id: id } });
    await item.destroy();

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Failed to delete menu item" });
  }
};

// Bulk update menu items order
exports.updateMenuItemsOrder = async (req, res) => {
  try {
    const { items } = req.body; // Array of { id, order, parent_id }

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Items must be an array" });
    }

    // Update all items in a transaction
    await Promise.all(
      items.map((item) =>
        MenuItem.update(
          { order: item.order, parent_id: item.parent_id || null },
          { where: { id: item.id } }
        )
      )
    );

    res.json({ message: "Menu items order updated successfully" });
  } catch (error) {
    console.error("Error updating menu items order:", error);
    res.status(500).json({ message: "Failed to update menu items order" });
  }
};

module.exports = exports;
