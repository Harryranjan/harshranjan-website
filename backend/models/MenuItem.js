const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const MenuItem = sequelize.define(
  "MenuItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "custom",
    },
    target: {
      type: DataTypes.STRING(10),
      defaultValue: "_self",
    },
    icon: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    badge: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    css_class: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    visibility: {
      type: DataTypes.STRING(20),
      defaultValue: "both",
    },
    page_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mega_menu_settings: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const value = this.getDataValue("mega_menu_settings");
        return value ? JSON.parse(value) : {};
      },
      set(value) {
        this.setDataValue("mega_menu_settings", JSON.stringify(value));
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "menu_items",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Static methods
MenuItem.getByMenu = async function (menuId) {
  return await this.findAll({
    where: { menu_id: menuId, is_active: true },
    include: [
      {
        association: "page",
        attributes: ["id", "title", "slug"],
      },
      {
        association: "children",
        where: { is_active: true },
        required: false,
      },
    ],
    order: [["order", "ASC"]],
  });
};

MenuItem.getTopLevel = async function (menuId) {
  return await this.findAll({
    where: { menu_id: menuId, parent_id: null, is_active: true },
    include: [
      {
        association: "page",
        attributes: ["id", "title", "slug"],
      },
    ],
    order: [["order", "ASC"]],
  });
};

module.exports = MenuItem;
