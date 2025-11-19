const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const DownloadLead = sequelize.define(
  "DownloadLead",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    download_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Download ID is required" },
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name is required" },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Email is required" },
        isEmail: { msg: "Must be a valid email address" },
      },
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    downloaded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "download_leads",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

// Instance methods
DownloadLead.prototype.markAsDownloaded = async function () {
  this.downloaded = true;
  await this.save();
  return this;
};

// Class methods
DownloadLead.getByDownload = async function (
  downloadId,
  limit = 100,
  offset = 0
) {
  return await this.findAndCountAll({
    where: { download_id: downloadId },
    order: [["created_at", "DESC"]],
    limit,
    offset,
  });
};

DownloadLead.getStats = async function (downloadId = null) {
  const whereClause = downloadId ? { download_id: downloadId } : {};

  const total = await this.count({ where: whereClause });
  const downloaded = await this.count({
    where: {
      ...whereClause,
      downloaded: true,
    },
  });

  return {
    total_leads: total,
    total_downloaded: downloaded,
    conversion_rate: total > 0 ? ((downloaded / total) * 100).toFixed(2) : 0,
  };
};

DownloadLead.getRecentLeads = async function (limit = 10) {
  return await this.findAll({
    order: [["created_at", "DESC"]],
    limit,
    include: [
      {
        model: require("./Download"),
        attributes: ["id", "title", "slug"],
      },
    ],
  });
};

module.exports = DownloadLead;
