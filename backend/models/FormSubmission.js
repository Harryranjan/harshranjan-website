const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const FormSubmission = sequelize.define(
  "FormSubmission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    form_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("data");
        return rawValue ? JSON.parse(rawValue) : {};
      },
      set(value) {
        this.setDataValue("data", JSON.stringify(value));
      },
    },
    user_agent: {
      type: DataTypes.STRING,
    },
    ip_address: {
      type: DataTypes.STRING(45),
    },
    referrer: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("new", "read", "archived", "spam"),
      defaultValue: "new",
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "form_submissions",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = FormSubmission;
