const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Popup = sequelize.define(
  "Popup",
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
    message: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.ENUM(
        "banner",
        "slide-in",
        "full-screen",
        "corner",
        "bar"
      ),
      defaultValue: "banner",
    },
    position: {
      type: DataTypes.ENUM(
        "top",
        "bottom",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
        "center"
      ),
      defaultValue: "bottom-right",
    },
    trigger_type: {
      type: DataTypes.ENUM("immediate", "time", "scroll", "exit", "click"),
      defaultValue: "immediate",
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
    close_button: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    auto_close: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "draft", "scheduled"),
      defaultValue: "draft",
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    conversions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "popups",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Popup;
