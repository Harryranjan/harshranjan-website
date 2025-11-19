const Download = require("../models/Download");
const DownloadLead = require("../models/DownloadLead");

// Get all downloads (admin)
exports.getAllDownloads = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      category,
      search,
      sort = "created_at",
      order = "DESC",
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    if (status) where.status = status;
    if (category) where.category = category;
    if (search) {
      const { Op } = require("sequelize");
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Download.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort, order]],
      include: [
        {
          model: DownloadLead,
          as: "leads",
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            require("sequelize").fn(
              "COUNT",
              require("sequelize").col("leads.id")
            ),
            "leads_count",
          ],
        ],
      },
      group: ["Download.id"],
      subQuery: false,
    });

    res.json({
      downloads: rows,
      total: count.length || 0,
      page: parseInt(page),
      totalPages: Math.ceil((count.length || 0) / limit),
    });
  } catch (error) {
    console.error("Error fetching downloads:", error);
    res.status(500).json({
      message: "Error fetching downloads",
      error: error.message,
    });
  }
};

// Get public downloads (published only)
exports.getPublicDownloads = async (req, res) => {
  try {
    const { category, featured, limit = 12 } = req.query;
    const where = { status: "published" };

    if (category) where.category = category;
    if (featured === "true") where.featured = true;

    const downloads = await Download.findAll({
      where,
      order: [["created_at", "DESC"]],
      limit: parseInt(limit),
      attributes: {
        exclude: ["author_id", "meta_title", "meta_description"],
      },
    });

    res.json(downloads);
  } catch (error) {
    console.error("Error fetching public downloads:", error);
    res.status(500).json({
      message: "Error fetching downloads",
      error: error.message,
    });
  }
};

// Get single download by ID (admin)
exports.getDownloadById = async (req, res) => {
  try {
    const download = await Download.findByPk(req.params.id, {
      include: [
        {
          model: DownloadLead,
          as: "leads",
          limit: 10,
          order: [["created_at", "DESC"]],
        },
      ],
    });

    if (!download) {
      return res.status(404).json({ message: "Download not found" });
    }

    res.json(download);
  } catch (error) {
    console.error("Error fetching download:", error);
    res.status(500).json({
      message: "Error fetching download",
      error: error.message,
    });
  }
};

// Get single download by slug (public)
exports.getDownloadBySlug = async (req, res) => {
  try {
    const download = await Download.findOne({
      where: {
        slug: req.params.slug,
        status: "published",
      },
      attributes: {
        exclude: ["author_id"],
      },
    });

    if (!download) {
      return res.status(404).json({ message: "Download not found" });
    }

    res.json(download);
  } catch (error) {
    console.error("Error fetching download:", error);
    res.status(500).json({
      message: "Error fetching download",
      error: error.message,
    });
  }
};

// Create download
exports.createDownload = async (req, res) => {
  try {
    const downloadData = {
      ...req.body,
      author_id: req.user?.id || null,
    };

    const download = await Download.create(downloadData);
    res.status(201).json({
      message: "Download created successfully",
      download,
    });
  } catch (error) {
    console.error("Error creating download:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((e) => e.message),
      });
    }
    res.status(500).json({
      message: "Error creating download",
      error: error.message,
    });
  }
};

// Update download
exports.updateDownload = async (req, res) => {
  try {
    const download = await Download.findByPk(req.params.id);

    if (!download) {
      return res.status(404).json({ message: "Download not found" });
    }

    await download.update(req.body);
    res.json({
      message: "Download updated successfully",
      download,
    });
  } catch (error) {
    console.error("Error updating download:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((e) => e.message),
      });
    }
    res.status(500).json({
      message: "Error updating download",
      error: error.message,
    });
  }
};

// Delete download
exports.deleteDownload = async (req, res) => {
  try {
    const download = await Download.findByPk(req.params.id);

    if (!download) {
      return res.status(404).json({ message: "Download not found" });
    }

    await download.destroy();
    res.json({ message: "Download deleted successfully" });
  } catch (error) {
    console.error("Error deleting download:", error);
    res.status(500).json({
      message: "Error deleting download",
      error: error.message,
    });
  }
};

// Get download categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Download.getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

// Get download statistics
exports.getDownloadStats = async (req, res) => {
  try {
    const totalDownloads = await Download.count();
    const publishedDownloads = await Download.count({
      where: { status: "published" },
    });
    const totalLeads = await DownloadLead.count();
    const categories = await Download.getCategories();

    res.json({
      total_downloads: totalDownloads,
      published: publishedDownloads,
      draft: totalDownloads - publishedDownloads,
      total_leads: totalLeads,
      categories: categories.length,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getAllDownloads: exports.getAllDownloads,
  getPublicDownloads: exports.getPublicDownloads,
  getDownloadById: exports.getDownloadById,
  getDownloadBySlug: exports.getDownloadBySlug,
  createDownload: exports.createDownload,
  updateDownload: exports.updateDownload,
  deleteDownload: exports.deleteDownload,
  getCategories: exports.getCategories,
  getDownloadStats: exports.getDownloadStats,
};
