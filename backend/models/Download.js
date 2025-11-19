const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Download = sequelize.define(
  "Download",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Title is required" },
        len: {
          args: [3, 255],
          msg: "Title must be between 3 and 255 characters",
        },
      },
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Slug is required" },
        is: {
          args: /^[a-z0-9-]+$/,
          msg: "Slug must contain only lowercase letters, numbers, and hyphens",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    short_description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "general",
    },
    thumbnail: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    file_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: { msg: "File URL is required" },
      },
    },
    file_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    file_size: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    download_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("published", "draft", "archived"),
      defaultValue: "draft",
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    meta_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    meta_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    requires_form: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "downloads",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Instance methods
Download.prototype.incrementDownloadCount = async function () {
  this.download_count += 1;
  await this.save();
  return this.download_count;
};

// Class methods
Download.getCategories = async function () {
  const downloads = await this.findAll({
    attributes: ["category"],
    group: ["category"],
    raw: true,
  });
  return downloads.map((d) => d.category);
};

Download.getFeatured = async function (limit = 6) {
  return await this.findAll({
    where: {
      status: "published",
      featured: true,
    },
    order: [["created_at", "DESC"]],
    limit,
  });
};

Download.getByCategory = async function (category, limit = 12) {
  return await this.findAll({
    where: {
      status: "published",
      category,
    },
    order: [["created_at", "DESC"]],
    limit,
  });
};

Download.search = async function (query) {
  const { Op } = require("sequelize");
  return await this.findAll({
    where: {
      status: "published",
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } },
        { short_description: { [Op.like]: `%${query}%` } },
      ],
    },
    order: [["created_at", "DESC"]],
  });
};

module.exports = Download;
