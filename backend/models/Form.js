const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Form = sequelize.define(
  "Form",
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
    description: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.ENUM("contact", "newsletter", "lead", "custom"),
      defaultValue: "custom",
    },
    fields: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("fields");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("fields", JSON.stringify(value));
      },
    },
    settings: {
      type: DataTypes.TEXT("long"),
      get() {
        const rawValue = this.getDataValue("settings");
        return rawValue ? JSON.parse(rawValue) : {};
      },
      set(value) {
        this.setDataValue("settings", JSON.stringify(value));
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
    custom_code: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "draft"),
      defaultValue: "draft",
    },
    submit_button_text: {
      type: DataTypes.STRING,
      defaultValue: "Submit",
    },
    success_message: {
      type: DataTypes.TEXT,
      defaultValue: "Thank you for your submission!",
    },
    error_message: {
      type: DataTypes.TEXT,
      defaultValue: "Something went wrong. Please try again.",
    },
    submission_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    last_submission_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "forms",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Form;
