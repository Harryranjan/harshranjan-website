const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Modal = sequelize.define(
  "Modal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT("long"),
    },
    type: {
      type: DataTypes.ENUM("announcement", "offer", "newsletter", "custom"),
      defaultValue: "custom",
    },
    trigger_type: {
      type: DataTypes.ENUM("time", "scroll", "exit", "click", "manual"),
      defaultValue: "manual",
    },
    trigger_value: {
      type: DataTypes.STRING,
    },
    display_rules: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue("display_rules");
        return rawValue ? JSON.parse(rawValue) : {};
      },
      set(value) {
        this.setDataValue("display_rules", JSON.stringify(value));
      },
    },
    styling: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue("styling");
        return rawValue ? JSON.parse(rawValue) : {};
      },
      set(value) {
        this.setDataValue("styling", JSON.stringify(value));
      },
    },
    form_id: {
      type: DataTypes.INTEGER,
    },
    cta_text: {
      type: DataTypes.STRING,
    },
    cta_link: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "draft"),
      defaultValue: "draft",
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    conversions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "modals",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Modal;
