const Menu = require("../models/Menu");
const MenuItem = require("../models/MenuItem");
const Page = require("../models/Page");
const { Op } = require("sequelize");

// Get all menus
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({
      include: [
        {
          model: MenuItem,
          as: "items",
          where: { is_active: true },
          required: false,
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json({ menus });
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ message: "Failed to fetch menus" });
  }
};

// Get single menu by ID
exports.getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id, {
      include: [
        {
          model: MenuItem,
          as: "items",
          include: [
            {
              model: Page,
              as: "page",
              attributes: ["id", "title", "slug"],
            },
            {
              model: MenuItem,
              as: "children",
              include: [
                {
                  model: Page,
                  as: "page",
                  attributes: ["id", "title", "slug"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.json({ menu });
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ message: "Failed to fetch menu" });
  }
};

// Get menu by location (public endpoint)
exports.getMenuByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const menu = await Menu.getByLocation(location);

    if (!menu) {
      return res.json({ menu: null, items: [] });
    }

    // Get menu items with nested structure
    const items = await MenuItem.findAll({
      where: { menu_id: menu.id, is_active: true },
      include: [
        {
          model: Page,
          as: "page",
          attributes: ["id", "title", "slug"],
        },
      ],
      order: [["order", "ASC"]],
    });

    // Build nested structure
    const buildTree = (items, parentId = null) => {
      return items
        .filter((item) => item.parent_id === parentId)
        .map((item) => ({
          ...item.toJSON(),
          children: buildTree(items, item.id),
        }));
    };

    const nestedItems = buildTree(items);

    res.json({ menu, items: nestedItems });
  } catch (error) {
    console.error("Error fetching menu by location:", error);
    res.status(500).json({ message: "Failed to fetch menu" });
  }
};

// Create new menu
exports.createMenu = async (req, res) => {
  try {
    const { name, location, description, is_active, settings } = req.body;

    const menu = await Menu.create({
      name,
      location,
      description,
      is_active: is_active !== undefined ? is_active : true,
      settings: settings || {},
    });

    res.status(201).json({ message: "Menu created successfully", menu });
  } catch (error) {
    console.error("Error creating menu:", error);
    res.status(500).json({ message: "Failed to create menu" });
  }
};

// Update menu
exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, description, is_active, settings } = req.body;

    const menu = await Menu.findByPk(id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    await menu.update({
      name,
      location,
      description,
      is_active,
      settings: settings || menu.settings,
    });

    res.json({ message: "Menu updated successfully", menu });
  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({ message: "Failed to update menu" });
  }
};

// Delete menu
exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findByPk(id);

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    // Delete all menu items first (cascade should handle this, but being explicit)
    await MenuItem.destroy({ where: { menu_id: id } });
    await menu.destroy();

    res.json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ message: "Failed to delete menu" });
  }
};

// Get available pages for menu
exports.getAvailablePages = async (req, res) => {
  try {
    const pages = await Page.findAll({
      where: { status: "published" },
      attributes: ["id", "title", "slug", "show_in_menu"],
      order: [["title", "ASC"]],
    });

    res.json({ pages });
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ message: "Failed to fetch pages" });
  }
};

module.exports = exports;
