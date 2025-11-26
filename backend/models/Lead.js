const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Lead = sequelize.define(
  "Lead",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "demo",
      comment:
        "Where the lead came from (chatbot_demo, roi_calculator, voice_agent, etc.)",
    },
    status: {
      type: DataTypes.ENUM(
        "new",
        "contacted",
        "qualified",
        "converted",
        "lost"
      ),
      defaultValue: "new",
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
      comment:
        "Additional data from demos (ROI calculations, conversation data, etc.)",
    },
    lastInteraction: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "leads",
    timestamps: true,
    indexes: [
      {
        fields: ["email"],
        unique: true,
      },
      {
        fields: ["status"],
      },
      {
        fields: ["source"],
      },
      {
        fields: ["createdAt"],
      },
    ],
  }
);

module.exports = Lead;
