const {
  Page,
  BlogPost,
  FormSubmission,
  DownloadLead,
  CTABanner,
  Form,
} = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../config/database");

// Get conversion tracking data
exports.getConversionStats = async (req, res) => {
  try {
    const { period = "30" } = req.query; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Form submissions stats
    const totalFormSubmissions = await FormSubmission.count({
      where: {
        created_at: {
          [Op.gte]: startDate,
        },
      },
    });

    const formSubmissionsByForm = await FormSubmission.findAll({
      attributes: [
        "form_id",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      where: {
        created_at: {
          [Op.gte]: startDate,
        },
      },
      group: ["form_id"],
      include: [
        {
          model: Form,
          attributes: ["id", "name", "title"],
        },
      ],
    });

    // Download conversions
    const downloadLeadStats = await DownloadLead.getStats();
    const recentDownloadLeads = await DownloadLead.findAll({
      where: {
        created_at: {
          [Op.gte]: startDate,
        },
      },
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
        [
          sequelize.fn(
            "COUNT",
            sequelize.literal('CASE WHEN downloaded = 1 THEN 1 END')
          ),
          "downloaded_count",
        ],
      ],
    });

    // CTA Banner stats
    const ctaBanners = await CTABanner.findAll({
      attributes: ["id", "name", "click_count", "view_count"],
    });

    const ctaStats = ctaBanners.map((banner) => ({
      id: banner.id,
      name: banner.name,
      clicks: banner.click_count,
      views: banner.view_count,
      ctr:
        banner.view_count > 0
          ? ((banner.click_count / banner.view_count) * 100).toFixed(2)
          : 0,
    }));

    // Landing page performance
    const landingPages = await Page.findAll({
      where: {
        template: "custom",
        status: "published",
      },
      attributes: ["id", "title", "slug", "views"],
      order: [["views", "DESC"]],
      limit: 10,
    });

    // Calculate conversion rates
    const formConversionRate =
      totalFormSubmissions > 0
        ? (
            (totalFormSubmissions /
              landingPages.reduce((sum, p) => sum + (p.views || 0), 0)) *
            100
          ).toFixed(2)
        : 0;

    const downloadConversionRate =
      recentDownloadLeads[0]?.dataValues.count > 0
        ? (
            (recentDownloadLeads[0].dataValues.downloaded_count /
              recentDownloadLeads[0].dataValues.count) *
            100
          ).toFixed(2)
        : 0;

    res.json({
      success: true,
      data: {
        forms: {
          total_submissions: totalFormSubmissions,
          conversion_rate: formConversionRate + "%",
          by_form: formSubmissionsByForm,
        },
        downloads: {
          total_leads: downloadLeadStats.total_leads,
          total_downloaded: downloadLeadStats.total_downloaded,
          conversion_rate: downloadLeadStats.conversion_rate + "%",
        },
        cta_banners: {
          total_clicks: ctaBanners.reduce((sum, b) => sum + b.click_count, 0),
          total_views: ctaBanners.reduce((sum, b) => sum + b.view_count, 0),
          banners: ctaStats,
        },
        landing_pages: landingPages.map((page) => ({
          id: page.id,
          title: page.title,
          slug: page.slug,
          views: page.views,
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching conversion stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch conversion statistics",
      error: error.message,
    });
  }
};

// Get SEO performance data
exports.getSEOStats = async (req, res) => {
  try {
    const { period = "30" } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Get all published content with views
    const blogPosts = await BlogPost.findAll({
      where: {
        is_published: true,
      },
      attributes: ["id", "title", "slug", "views", "meta_keywords", "updated_at"],
      order: [["views", "DESC"]],
    });

    const pages = await Page.findAll({
      where: {
        status: "published",
      },
      attributes: ["id", "title", "slug", "views", "meta_keywords", "updated_at"],
      order: [["views", "DESC"]],
    });

    // Calculate total organic traffic (views)
    const totalViews = [
      ...blogPosts.map((p) => p.views || 0),
      ...pages.map((p) => p.views || 0),
    ].reduce((sum, v) => sum + v, 0);

    // Top performing pages
    const topContent = [...blogPosts, ...pages]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 10)
      .map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        views: item.views || 0,
        type: item.is_published !== undefined ? "blog" : "page",
        keywords: item.meta_keywords,
      }));

    // Extract keywords from top content
    const keywordMap = {};
    topContent.forEach((item) => {
      if (item.keywords) {
        const keywords = item.keywords.split(",").map((k) => k.trim());
        keywords.forEach((keyword) => {
          if (keyword) {
            keywordMap[keyword] = (keywordMap[keyword] || 0) + item.views;
          }
        });
      }
    });

    const topKeywords = Object.entries(keywordMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([keyword, views]) => ({
        keyword,
        views,
        estimated_position: Math.floor(Math.random() * 10) + 1, // Placeholder
      }));

    // Calculate average CTR (simplified)
    const avgCTR = topContent.length > 0 
      ? ((totalViews / (topContent.length * 1000)) * 100).toFixed(2)
      : 0;

    res.json({
      success: true,
      data: {
        overview: {
          total_organic_traffic: totalViews,
          total_indexed_pages: blogPosts.length + pages.length,
          avg_click_through_rate: avgCTR + "%",
          period_days: period,
        },
        top_keywords: topKeywords,
        top_performing_content: topContent,
        recent_updates: [...blogPosts, ...pages]
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 5)
          .map((item) => ({
            title: item.title,
            slug: item.slug,
            updated: item.updated_at,
            type: item.is_published !== undefined ? "blog" : "page",
          })),
      },
    });
  } catch (error) {
    console.error("Error fetching SEO stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch SEO statistics",
      error: error.message,
    });
  }
};

// Get traffic trends over time
exports.getTrafficTrends = async (req, res) => {
  try {
    const { period = "30" } = req.query;
    
    // For now, return mock data structure
    // In production, you'd track daily views in a separate analytics table
    const days = parseInt(period);
    const trends = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      trends.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 500) + 100, // Mock data
        sessions: Math.floor(Math.random() * 300) + 50,
        bounce_rate: (Math.random() * 30 + 40).toFixed(2),
      });
    }

    res.json({
      success: true,
      data: {
        trends,
        summary: {
          total_views: trends.reduce((sum, t) => sum + t.views, 0),
          total_sessions: trends.reduce((sum, t) => sum + t.sessions, 0),
          avg_bounce_rate: (
            trends.reduce((sum, t) => sum + parseFloat(t.bounce_rate), 0) /
            trends.length
          ).toFixed(2),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching traffic trends:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch traffic trends",
      error: error.message,
    });
  }
};
