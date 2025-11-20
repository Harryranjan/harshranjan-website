const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Menu = sequelize.define(
  "Menu",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    settings: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const value = this.getDataValue("settings");
        return value ? JSON.parse(value) : {};
      },
      set(value) {
        this.setDataValue("settings", JSON.stringify(value));
      },
    },
  },
  {
    tableName: "menus",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Static methods
Menu.getByLocation = async function (location) {
  return await this.findOne({
    where: { location, is_active: true },
    include: [
      {
        association: "items",
        where: { is_active: true },
        required: false,
      },
    ],
    order: [["updated_at", "DESC"]], // Get the most recently updated active menu
  });
};

Menu.getActiveMenus = async function () {
  return await this.findAll({
    where: { is_active: true },
    order: [["created_at", "DESC"]],
  });
};

module.exports = Menu;
