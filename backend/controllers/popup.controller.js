const Popup = require("../models/Popup");
const { Op } = require("sequelize");

// Get all popups
exports.getAllPopups = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const { count, rows } = await Popup.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["updated_at", "DESC"]],
    });

    res.json({
      popups: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching popups:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch popups", error: error.message });
  }
};

// Get single popup
exports.getPopupById = async (req, res) => {
  try {
    const popup = await Popup.findByPk(req.params.id);

    if (!popup) {
      return res.status(404).json({ message: "Popup not found" });
    }

    res.json(popup);
  } catch (error) {
    console.error("Error fetching popup:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch popup", error: error.message });
  }
};

// Get active popups (public endpoint)
exports.getActivePopups = async (req, res) => {
  try {
    const now = new Date();

    const popups = await Popup.findAll({
      where: {
        status: "active",
        [Op.or]: [{ start_date: null }, { start_date: { [Op.lte]: now } }],
        [Op.or]: [{ end_date: null }, { end_date: { [Op.gte]: now } }],
      },
      order: [["created_at", "DESC"]],
    });

    res.json(popups);
  } catch (error) {
    console.error("Error fetching active popups:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch active popups", error: error.message });
  }
};

// Create popup
exports.createPopup = async (req, res) => {
  try {
    const {
      name,
      title,
      message,
      type,
      position,
      trigger_type,
      trigger_value,
      display_rules,
      styling,
      form_id,
      cta_text,
      cta_link,
      close_button,
      auto_close,
      status,
      start_date,
      end_date,
    } = req.body;

    const popup = await Popup.create({
      name,
      title,
      message,
      type,
      position,
      trigger_type,
      trigger_value,
      display_rules: display_rules || {},
      styling: styling || {},
      form_id,
      cta_text,
      cta_link,
      close_button: close_button !== undefined ? close_button : true,
      auto_close: auto_close || 0,
      status: status || "draft",
      start_date,
      end_date,
    });

    res.status(201).json(popup);
  } catch (error) {
    console.error("Error creating popup:", error);
    res
      .status(500)
      .json({ message: "Failed to create popup", error: error.message });
  }
};

// Update popup
exports.updatePopup = async (req, res) => {
  try {
    const popup = await Popup.findByPk(req.params.id);

    if (!popup) {
      return res.status(404).json({ message: "Popup not found" });
    }

    const {
      name,
      title,
      message,
      type,
      position,
      trigger_type,
      trigger_value,
      display_rules,
      styling,
      form_id,
      cta_text,
      cta_link,
      close_button,
      auto_close,
      status,
      start_date,
      end_date,
    } = req.body;

    await popup.update({
      name,
      title,
      message,
      type,
      position,
      trigger_type,
      trigger_value,
      display_rules,
      styling,
      form_id,
      cta_text,
      cta_link,
      close_button,
      auto_close,
      status,
      start_date,
      end_date,
    });

    res.json(popup);
  } catch (error) {
    console.error("Error updating popup:", error);
    res
      .status(500)
      .json({ message: "Failed to update popup", error: error.message });
  }
};

// Delete popup
exports.deletePopup = async (req, res) => {
  try {
    const popup = await Popup.findByPk(req.params.id);

    if (!popup) {
      return res.status(404).json({ message: "Popup not found" });
    }

    await popup.destroy();
    res.json({ message: "Popup deleted successfully" });
  } catch (error) {
    console.error("Error deleting popup:", error);
    res
      .status(500)
      .json({ message: "Failed to delete popup", error: error.message });
  }
};

// Track popup view
exports.trackPopupView = async (req, res) => {
  try {
    const popup = await Popup.findByPk(req.params.id);

    if (!popup) {
      return res.status(404).json({ message: "Popup not found" });
    }

    await popup.update({ views: popup.views + 1 });
    res.json({ message: "View tracked" });
  } catch (error) {
    console.error("Error tracking view:", error);
    res
      .status(500)
      .json({ message: "Failed to track view", error: error.message });
  }
};

// Track popup click
exports.trackPopupClick = async (req, res) => {
  try {
    const popup = await Popup.findByPk(req.params.id);

    if (!popup) {
      return res.status(404).json({ message: "Popup not found" });
    }

    await popup.update({ clicks: popup.clicks + 1 });
    res.json({ message: "Click tracked" });
  } catch (error) {
    console.error("Error tracking click:", error);
    res
      .status(500)
      .json({ message: "Failed to track click", error: error.message });
  }
};

// Track popup conversion
exports.trackPopupConversion = async (req, res) => {
  try {
    const popup = await Popup.findByPk(req.params.id);

    if (!popup) {
      return res.status(404).json({ message: "Popup not found" });
    }

    await popup.update({ conversions: popup.conversions + 1 });
    res.json({ message: "Conversion tracked" });
  } catch (error) {
    console.error("Error tracking conversion:", error);
    res
      .status(500)
      .json({ message: "Failed to track conversion", error: error.message });
  }
};

// Get popup statistics
exports.getStats = async (req, res) => {
  try {
    const { Op } = require("sequelize");

    const totalPopups = await Popup.count();
    const activePopups = await Popup.count({ where: { status: "active" } });
    const draftPopups = await Popup.count({ where: { status: "draft" } });
    const inactivePopups = await Popup.count({ where: { status: "inactive" } });

    const totalViews = await Popup.sum("views") || 0;
    const totalClicks = await Popup.sum("clicks") || 0;
    const totalDismissals = await Popup.sum("dismissals") || 0;

    const clickRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : 0;

    res.json({
      totalPopups,
      activePopups,
      draftPopups,
      inactivePopups,
      totalViews,
      totalClicks,
      totalDismissals,
      clickRate: `${clickRate}%`,
    });
  } catch (error) {
    console.error("Error fetching popup stats:", error);
    res.status(500).json({ message: "Failed to fetch stats", error: error.message });
  }
};
