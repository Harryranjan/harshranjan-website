const CTABanner = require("../models/CTABanner");

// Get all CTA banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await CTABanner.findAll({
      order: [["created_at", "DESC"]],
    });
    res.json(banners);
  } catch (error) {
    console.error("Error fetching CTA banners:", error);
    res.status(500).json({ message: "Failed to fetch CTA banners" });
  }
};

// Get single CTA banner
exports.getBanner = async (req, res) => {
  try {
    const banner = await CTABanner.findByPk(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "CTA banner not found" });
    }
    res.json(banner);
  } catch (error) {
    console.error("Error fetching CTA banner:", error);
    res.status(500).json({ message: "Failed to fetch CTA banner" });
  }
};

// Get active banners (for frontend display)
exports.getActiveBanners = async (req, res) => {
  try {
    const { page } = req.query;
    const banners = await CTABanner.findAll({
      where: { status: "active" },
      order: [["created_at", "DESC"]],
    });

    // Filter by placement if page is specified
    let filteredBanners = banners;
    if (page) {
      filteredBanners = banners.filter((banner) => {
        const placement = banner.placement || ["all"];
        return placement.includes("all") || placement.includes(page);
      });
    }

    res.json(filteredBanners);
  } catch (error) {
    console.error("Error fetching active CTA banners:", error);
    res.status(500).json({ message: "Failed to fetch active CTA banners" });
  }
};

// Create CTA banner
exports.createBanner = async (req, res) => {
  try {
    const banner = await CTABanner.create(req.body);
    res.status(201).json(banner);
  } catch (error) {
    console.error("Error creating CTA banner:", error);
    res.status(500).json({ message: "Failed to create CTA banner" });
  }
};

// Update CTA banner
exports.updateBanner = async (req, res) => {
  try {
    const banner = await CTABanner.findByPk(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "CTA banner not found" });
    }

    await banner.update(req.body);
    res.json(banner);
  } catch (error) {
    console.error("Error updating CTA banner:", error);
    res.status(500).json({ message: "Failed to update CTA banner" });
  }
};

// Delete CTA banner
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await CTABanner.findByPk(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "CTA banner not found" });
    }

    await banner.destroy();
    res.json({ message: "CTA banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting CTA banner:", error);
    res.status(500).json({ message: "Failed to delete CTA banner" });
  }
};

// Duplicate CTA banner
exports.duplicateBanner = async (req, res) => {
  try {
    const banner = await CTABanner.findByPk(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "CTA banner not found" });
    }

    const duplicateData = banner.toJSON();
    delete duplicateData.id;
    delete duplicateData.created_at;
    delete duplicateData.updated_at;
    duplicateData.name = `${duplicateData.name} (Copy)`;
    duplicateData.status = "draft";
    duplicateData.click_count = 0;
    duplicateData.view_count = 0;

    const newBanner = await CTABanner.create(duplicateData);
    res.status(201).json(newBanner);
  } catch (error) {
    console.error("Error duplicating CTA banner:", error);
    res.status(500).json({ message: "Failed to duplicate CTA banner" });
  }
};

// Track banner view
exports.trackView = async (req, res) => {
  try {
    const banner = await CTABanner.findByPk(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "CTA banner not found" });
    }

    await banner.increment("view_count");
    res.json({ message: "View tracked" });
  } catch (error) {
    console.error("Error tracking view:", error);
    res.status(500).json({ message: "Failed to track view" });
  }
};

// Track banner click
exports.trackClick = async (req, res) => {
  try {
    const banner = await CTABanner.findByPk(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "CTA banner not found" });
    }

    await banner.increment("click_count");
    res.json({ message: "Click tracked" });
  } catch (error) {
    console.error("Error tracking click:", error);
    res.status(500).json({ message: "Failed to track click" });
  }
};
