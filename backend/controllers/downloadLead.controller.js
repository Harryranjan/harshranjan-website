const Download = require("../models/Download");
const DownloadLead = require("../models/DownloadLead");
const emailService = require("../services/emailService");

// Submit lead and get download link
exports.submitLead = async (req, res) => {
  try {
    const { download_id, name, email, phone, company } = req.body;

    // Validate required fields
    if (!download_id || !name || !email) {
      return res.status(400).json({
        message: "Download ID, name, and email are required",
      });
    }

    // Check if download exists and is published
    const download = await Download.findOne({
      where: {
        id: download_id,
        status: "published",
      },
    });

    if (!download) {
      return res.status(404).json({ message: "Download not found" });
    }

    // Get IP and User Agent
    const ip_address = req.ip || req.connection.remoteAddress;
    const user_agent = req.get("user-agent");

    // Create lead
    const lead = await DownloadLead.create({
      download_id,
      name,
      email,
      phone,
      company,
      ip_address,
      user_agent,
      downloaded: false,
    });

    // Increment download count
    await download.incrementDownloadCount();

    // Send download link via email
    try {
      await emailService.sendDownloadLink(email, name, download);
    } catch (emailError) {
      console.error("Error sending download email:", emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      message: "Thank you! Check your email for the download link.",
      download_url: download.file_url,
      lead_id: lead.id,
    });
  } catch (error) {
    console.error("Error submitting lead:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((e) => e.message),
      });
    }
    res.status(500).json({
      message: "Error submitting lead",
      error: error.message,
    });
  }
};

// Get leads for a download (admin)
exports.getLeadsByDownload = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await DownloadLead.getByDownload(
      req.params.downloadId,
      parseInt(limit),
      parseInt(offset)
    );

    res.json({
      leads: rows,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({
      message: "Error fetching leads",
      error: error.message,
    });
  }
};

// Get all leads (admin)
exports.getAllLeads = async (req, res) => {
  try {
    const { page = 1, limit = 50, download_id, search } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    if (download_id) where.download_id = download_id;
    if (search) {
      const { Op } = require("sequelize");
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { company: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows } = await DownloadLead.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Download,
          as: "download",
          attributes: ["id", "title", "slug", "category"],
        },
      ],
    });

    res.json({
      leads: rows,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({
      message: "Error fetching leads",
      error: error.message,
    });
  }
};

// Mark lead as downloaded
exports.markAsDownloaded = async (req, res) => {
  try {
    const lead = await DownloadLead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await lead.markAsDownloaded();
    res.json({
      message: "Lead marked as downloaded",
      lead,
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({
      message: "Error updating lead",
      error: error.message,
    });
  }
};

// Get lead statistics
exports.getLeadStats = async (req, res) => {
  try {
    const { download_id } = req.query;
    const stats = await DownloadLead.getStats(download_id || null);
    res.json(stats);
  } catch (error) {
    console.error("Error fetching lead stats:", error);
    res.status(500).json({
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};

// Export leads to CSV
exports.exportLeads = async (req, res) => {
  try {
    const { download_id } = req.query;
    const where = download_id ? { download_id } : {};

    const leads = await DownloadLead.findAll({
      where,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Download,
          as: "download",
          attributes: ["title", "category"],
        },
      ],
    });

    // Convert to CSV
    const csvHeader =
      "Name,Email,Phone,Company,Download,Category,Date,Downloaded\n";
    const csvRows = leads
      .map((lead) => {
        return [
          lead.name,
          lead.email,
          lead.phone || "",
          lead.company || "",
          lead.download?.title || "",
          lead.download?.category || "",
          new Date(lead.created_at).toISOString(),
          lead.downloaded ? "Yes" : "No",
        ]
          .map((field) => `"${field}"`)
          .join(",");
      })
      .join("\n");

    const csv = csvHeader + csvRows;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=download-leads.csv"
    );
    res.send(csv);
  } catch (error) {
    console.error("Error exporting leads:", error);
    res.status(500).json({
      message: "Error exporting leads",
      error: error.message,
    });
  }
};

module.exports = {
  submitLead: exports.submitLead,
  getLeadsByDownload: exports.getLeadsByDownload,
  getAllLeads: exports.getAllLeads,
  markAsDownloaded: exports.markAsDownloaded,
  getLeadStats: exports.getLeadStats,
  exportLeads: exports.exportLeads,
};
