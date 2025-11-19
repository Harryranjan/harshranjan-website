const Form = require("../models/Form");
const FormSubmission = require("../models/FormSubmission");
const { Op } = require("sequelize");

// Get all forms
exports.getAllForms = async (req, res) => {
  try {
    const { status, type, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (type) where.type = type;
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Form.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["updated_at", "DESC"]],
    });

    res.json({
      forms: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching forms:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch forms", error: error.message });
  }
};

// Get single form
exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch form", error: error.message });
  }
};

// Create form
exports.createForm = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      fields,
      settings,
      styling,
      status,
      submit_button_text,
      success_message,
      error_message,
    } = req.body;

    const form = await Form.create({
      name,
      description,
      type,
      fields: fields || [],
      settings: settings || {},
      styling: styling || {},
      status: status || "draft",
      submit_button_text: submit_button_text || "Submit",
      success_message: success_message || "Thank you for your submission!",
      error_message: error_message || "Something went wrong. Please try again.",
    });

    res.status(201).json(form);
  } catch (error) {
    console.error("Error creating form:", error);
    res
      .status(500)
      .json({ message: "Failed to create form", error: error.message });
  }
};

// Update form
exports.updateForm = async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    const {
      name,
      description,
      type,
      fields,
      settings,
      styling,
      status,
      submit_button_text,
      success_message,
      error_message,
    } = req.body;

    await form.update({
      name,
      description,
      type,
      fields,
      settings,
      styling,
      status,
      submit_button_text,
      success_message,
      error_message,
    });

    res.json(form);
  } catch (error) {
    console.error("Error updating form:", error);
    res
      .status(500)
      .json({ message: "Failed to update form", error: error.message });
  }
};

// Delete form
exports.deleteForm = async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    await form.destroy();
    res.json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    res
      .status(500)
      .json({ message: "Failed to delete form", error: error.message });
  }
};

// Duplicate form
exports.duplicateForm = async (req, res) => {
  try {
    const originalForm = await Form.findByPk(req.params.id);

    if (!originalForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    const duplicatedForm = await Form.create({
      name: `${originalForm.name} (Copy)`,
      description: originalForm.description,
      type: originalForm.type,
      fields: originalForm.fields,
      settings: originalForm.settings,
      styling: originalForm.styling,
      status: "draft",
      submit_button_text: originalForm.submit_button_text,
      success_message: originalForm.success_message,
      error_message: originalForm.error_message,
    });

    res.status(201).json(duplicatedForm);
  } catch (error) {
    console.error("Error duplicating form:", error);
    res
      .status(500)
      .json({ message: "Failed to duplicate form", error: error.message });
  }
};

// Get form statistics
exports.getFormStats = async (req, res) => {
  try {
    const totalForms = await Form.count();
    const activeForms = await Form.count({ where: { status: "active" } });
    const draftForms = await Form.count({ where: { status: "draft" } });
    const totalSubmissions = await FormSubmission.count();

    // Get recent submissions
    const recentSubmissions = await FormSubmission.count({
      where: {
        created_at: {
          [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      },
    });

    // Get top performing forms
    const topForms = await Form.findAll({
      order: [["submission_count", "DESC"]],
      limit: 5,
      attributes: ["id", "name", "submission_count", "status"],
    });

    res.json({
      totalForms,
      activeForms,
      draftForms,
      totalSubmissions,
      recentSubmissions,
      topForms,
    });
  } catch (error) {
    console.error("Error fetching form stats:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch statistics", error: error.message });
  }
};
