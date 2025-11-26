const Lead = require("../models/Lead");
const { sendEmail } = require("../config/emailConfig");

// Create lead from demo interaction
exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, company, source, metadata } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if lead already exists
    const existingLead = await Lead.findOne({ where: { email } });
    if (existingLead) {
      // Update existing lead with new source/metadata
      await existingLead.update({
        source: source || existingLead.source,
        metadata: { ...existingLead.metadata, ...metadata },
        lastInteraction: new Date(),
      });

      return res.status(200).json({
        message: "Lead updated successfully",
        lead: existingLead,
      });
    }

    // Create new lead
    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      source: source || "demo",
      status: "new",
      metadata: metadata || {},
      lastInteraction: new Date(),
    });

    // Send notification email to admin
    if (process.env.ADMIN_EMAIL) {
      try {
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `New Lead from ${source || "Demo"}`,
          html: `
            <h2>New Lead Captured</h2>
            <p><strong>Source:</strong> ${source || "Demo"}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${name ? `<p><strong>Name:</strong> ${name}</p>` : ""}
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
            ${
              metadata
                ? `<p><strong>Additional Data:</strong> ${JSON.stringify(
                    metadata,
                    null,
                    2
                  )}</p>`
                : ""
            }
          `,
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
      }
    }

    res.status(201).json({
      message: "Lead captured successfully",
      lead,
    });
  } catch (error) {
    console.error("Create lead error:", error);
    res
      .status(500)
      .json({ message: "Failed to capture lead", error: error.message });
  }
};

// Get all leads (admin only)
exports.getAllLeads = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      source,
      sortBy = "createdAt",
      order = "DESC",
    } = req.query;

    const where = {};
    if (status) where.status = status;
    if (source) where.source = source;

    const offset = (page - 1) * limit;

    const { count, rows: leads } = await Lead.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [[sortBy, order]],
    });

    res.json({
      leads,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("Get leads error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch leads", error: error.message });
  }
};

// Get single lead
exports.getLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    console.error("Get lead error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch lead", error: error.message });
  }
};

// Update lead status
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await lead.update({
      status,
      metadata: {
        ...lead.metadata,
        statusHistory: [
          ...(lead.metadata?.statusHistory || []),
          {
            status,
            notes,
            timestamp: new Date(),
          },
        ],
      },
    });

    res.json({ message: "Lead updated successfully", lead });
  } catch (error) {
    console.error("Update lead error:", error);
    res
      .status(500)
      .json({ message: "Failed to update lead", error: error.message });
  }
};

// Delete lead
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await lead.destroy();
    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Delete lead error:", error);
    res
      .status(500)
      .json({ message: "Failed to delete lead", error: error.message });
  }
};

// Get lead statistics
exports.getLeadStats = async (req, res) => {
  try {
    const { Sequelize } = require("sequelize");

    const totalLeads = await Lead.count();
    const newLeads = await Lead.count({ where: { status: "new" } });
    const qualifiedLeads = await Lead.count({ where: { status: "qualified" } });
    const convertedLeads = await Lead.count({ where: { status: "converted" } });

    // Leads by source
    const leadsBySource = await Lead.findAll({
      attributes: [
        "source",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["source"],
    });

    // Leads by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentLeads = await Lead.count({
      where: {
        createdAt: {
          [Sequelize.Op.gte]: thirtyDaysAgo,
        },
      },
    });

    res.json({
      total: totalLeads,
      new: newLeads,
      qualified: qualifiedLeads,
      converted: convertedLeads,
      bySource: leadsBySource,
      last30Days: recentLeads,
    });
  } catch (error) {
    console.error("Get lead stats error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch statistics", error: error.message });
  }
};
