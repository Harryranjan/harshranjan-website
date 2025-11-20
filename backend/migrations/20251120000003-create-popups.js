"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("popups", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM(
          "notification",
          "chat",
          "cookie_consent",
          "promo",
          "social_proof",
          "newsletter",
          "custom"
        ),
        defaultValue: "notification",
      },
      template: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Pre-built template name",
      },
      trigger_type: {
        type: Sequelize.ENUM(
          "manual",
          "time",
          "scroll",
          "exit",
          "click",
          "immediate"
        ),
        defaultValue: "immediate",
      },
      trigger_value: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      display_rules: {
        type: Sequelize.TEXT,
        defaultValue: JSON.stringify({
          pages: [],
          pageTargeting: "all",
          devices: ["desktop", "mobile", "tablet"],
          frequency: "always",
        }),
      },
      styling: {
        type: Sequelize.TEXT,
        defaultValue: JSON.stringify({
          position: "bottom-right",
          size: "small",
          backgroundColor: "#ffffff",
          textColor: "#000000",
          borderRadius: "8",
          shadow: true,
          animation: "slideIn",
          autoClose: false,
          autoCloseDelay: 5,
        }),
      },
      form_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "forms",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      cta_text: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cta_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Icon name or emoji",
      },
      status: {
        type: Sequelize.ENUM("draft", "active", "inactive"),
        defaultValue: "draft",
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      clicks: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      dismissals: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add indexes
    await queryInterface.addIndex("popups", ["status"]);
    await queryInterface.addIndex("popups", ["type"]);
    await queryInterface.addIndex("popups", ["template"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("popups");
  },
};
