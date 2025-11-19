const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

// Import models
const BlogPost = require("./BlogPost");
const User = require("./User");
const Category = require("./Category")(sequelize, DataTypes);
const Tag = require("./Tag")(sequelize, DataTypes);
const Download = require("./Download");
const DownloadLead = require("./DownloadLead");

// Define associations
Download.hasMany(DownloadLead, {
  foreignKey: "download_id",
  as: "leads",
});

DownloadLead.belongsTo(Download, {
  foreignKey: "download_id",
  as: "download",
});

// Export all models
module.exports = {
  sequelize,
  BlogPost,
  User,
  Category,
  Tag,
  Download,
  DownloadLead,
};
