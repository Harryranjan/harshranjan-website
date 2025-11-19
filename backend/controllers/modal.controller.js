const Modal = require("../models/Modal");
const { Op } = require("sequelize");

// Get all modals
exports.getAllModals = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const { count, rows } = await Modal.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["updated_at", "DESC"]],
    });

    res.json({
      modals: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching modals:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch modals", error: error.message });
  }
};

// Get single modal
exports.getModalById = async (req, res) => {
  try {
    const modal = await Modal.findByPk(req.params.id);

    if (!modal) {
      return res.status(404).json({ message: "Modal not found" });
    }

    res.json(modal);
  } catch (error) {
    console.error("Error fetching modal:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch modal", error: error.message });
  }
};

// Get active modals (public endpoint)
exports.getActiveModals = async (req, res) => {
  try {
    const modals = await Modal.findAll({
      where: { status: "active" },
      order: [["created_at", "DESC"]],
    });

    res.json(modals);
  } catch (error) {
    console.error("Error fetching active modals:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch active modals", error: error.message });
  }
};

// Create modal
exports.createModal = async (req, res) => {
  try {
    const {
      name,
      title,
      content,
      type,
      trigger_type,
      trigger_value,
      display_rules,
      styling,
      form_id,
      cta_text,
      cta_link,
      status,
    } = req.body;

    const modal = await Modal.create({
      name,
      title,
      content,
      type,
      trigger_type,
      trigger_value,
      display_rules: display_rules || {},
      styling: styling || {},
      form_id,
      cta_text,
      cta_link,
      status: status || "draft",
    });

    res.status(201).json(modal);
  } catch (error) {
    console.error("Error creating modal:", error);
    res
      .status(500)
      .json({ message: "Failed to create modal", error: error.message });
  }
};

// Update modal
exports.updateModal = async (req, res) => {
  try {
    const modal = await Modal.findByPk(req.params.id);

    if (!modal) {
      return res.status(404).json({ message: "Modal not found" });
    }

    const {
      name,
      title,
      content,
      type,
      trigger_type,
      trigger_value,
      display_rules,
      styling,
      form_id,
      cta_text,
      cta_link,
      status,
    } = req.body;

    await modal.update({
      name,
      title,
      content,
      type,
      trigger_type,
      trigger_value,
      display_rules,
      styling,
      form_id,
      cta_text,
      cta_link,
      status,
    });

    res.json(modal);
  } catch (error) {
    console.error("Error updating modal:", error);
    res
      .status(500)
      .json({ message: "Failed to update modal", error: error.message });
  }
};

// Delete modal
exports.deleteModal = async (req, res) => {
  try {
    const modal = await Modal.findByPk(req.params.id);

    if (!modal) {
      return res.status(404).json({ message: "Modal not found" });
    }

    await modal.destroy();
    res.json({ message: "Modal deleted successfully" });
  } catch (error) {
    console.error("Error deleting modal:", error);
    res
      .status(500)
      .json({ message: "Failed to delete modal", error: error.message });
  }
};

// Track modal view
exports.trackModalView = async (req, res) => {
  try {
    const modal = await Modal.findByPk(req.params.id);

    if (!modal) {
      return res.status(404).json({ message: "Modal not found" });
    }

    await modal.update({ views: modal.views + 1 });
    res.json({ message: "View tracked" });
  } catch (error) {
    console.error("Error tracking view:", error);
    res
      .status(500)
      .json({ message: "Failed to track view", error: error.message });
  }
};

// Track modal conversion
exports.trackModalConversion = async (req, res) => {
  try {
    const modal = await Modal.findByPk(req.params.id);

    if (!modal) {
      return res.status(404).json({ message: "Modal not found" });
    }

    await modal.update({ conversions: modal.conversions + 1 });
    res.json({ message: "Conversion tracked" });
  } catch (error) {
    console.error("Error tracking conversion:", error);
    res
      .status(500)
      .json({ message: "Failed to track conversion", error: error.message });
  }
};
