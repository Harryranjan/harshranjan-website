const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Page = sequelize.define(
  "Page",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    featured_image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    template: {
      type: DataTypes.ENUM("default", "about", "services", "contact", "custom"),
      defaultValue: "default",
    },
    status: {
      type: DataTypes.ENUM("published", "draft"),
      defaultValue: "draft",
    },
    is_homepage: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    show_in_menu: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    menu_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "pages",
        key: "id",
      },
    },
    meta_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    meta_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    meta_keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    custom_css: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    custom_js: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    head_scripts: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    body_scripts: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
  },
  {
    tableName: "pages",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Page;
