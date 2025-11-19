"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create forms table
    await queryInterface.createTable("forms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      type: {
        type: Sequelize.ENUM("contact", "newsletter", "lead", "custom"),
        defaultValue: "custom",
      },
      fields: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
        comment: "JSON array of form fields configuration",
      },
      settings: {
        type: Sequelize.TEXT("long"),
        comment:
          "JSON object for form settings (notifications, redirects, etc.)",
      },
      styling: {
        type: Sequelize.TEXT,
        comment: "JSON object for custom styling",
      },
      status: {
        type: Sequelize.ENUM("active", "inactive", "draft"),
        defaultValue: "draft",
      },
      submit_button_text: {
        type: Sequelize.STRING,
        defaultValue: "Submit",
      },
      success_message: {
        type: Sequelize.TEXT,
        defaultValue: "Thank you for your submission!",
      },
      error_message: {
        type: Sequelize.TEXT,
        defaultValue: "Something went wrong. Please try again.",
      },
      submission_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      last_submission_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });

    // Create form_submissions table
    await queryInterface.createTable("form_submissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      form_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "forms",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      data: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
        comment: "JSON object of submitted form data",
      },
      user_agent: {
        type: Sequelize.STRING,
      },
      ip_address: {
        type: Sequelize.STRING(45),
      },
      referrer: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("new", "read", "archived", "spam"),
        defaultValue: "new",
      },
      notes: {
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });

    // Create modals table
    await queryInterface.createTable("modals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT("long"),
        comment: "HTML content or JSON blocks",
      },
      type: {
        type: Sequelize.ENUM("announcement", "offer", "newsletter", "custom"),
        defaultValue: "custom",
      },
      trigger_type: {
        type: Sequelize.ENUM("time", "scroll", "exit", "click", "manual"),
        defaultValue: "manual",
        comment: "How the modal is triggered",
      },
      trigger_value: {
        type: Sequelize.STRING,
        comment:
          "Time in seconds, scroll percentage, or selector for click trigger",
      },
      display_rules: {
        type: Sequelize.TEXT,
        comment: "JSON object for targeting rules (pages, devices, frequency)",
      },
      styling: {
        type: Sequelize.TEXT,
        comment: "JSON object for custom styling (size, position, colors)",
      },
      form_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "forms",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        comment: "Optional form to embed in modal",
      },
      cta_text: {
        type: Sequelize.STRING,
      },
      cta_link: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("active", "inactive", "draft"),
        defaultValue: "draft",
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      conversions: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });

    // Create popups table
    await queryInterface.createTable("popups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
      },
      message: {
        type: Sequelize.TEXT,
      },
      type: {
        type: Sequelize.ENUM(
          "banner",
          "slide-in",
          "full-screen",
          "corner",
          "bar"
        ),
        defaultValue: "banner",
      },
      position: {
        type: Sequelize.ENUM(
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
        type: Sequelize.ENUM("immediate", "time", "scroll", "exit", "click"),
        defaultValue: "immediate",
      },
      trigger_value: {
        type: Sequelize.STRING,
        comment: "Time in seconds, scroll percentage, or selector",
      },
      display_rules: {
        type: Sequelize.TEXT,
        comment:
          "JSON object for targeting (pages, devices, frequency, user behavior)",
      },
      styling: {
        type: Sequelize.TEXT,
        comment: "JSON object for colors, fonts, animations",
      },
      form_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "forms",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      cta_text: {
        type: Sequelize.STRING,
      },
      cta_link: {
        type: Sequelize.STRING,
      },
      close_button: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      auto_close: {
        type: Sequelize.INTEGER,
        comment: "Auto close after X seconds (0 = no auto close)",
      },
      status: {
        type: Sequelize.ENUM("active", "inactive", "draft", "scheduled"),
        defaultValue: "draft",
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      clicks: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      conversions: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });

    // Add indexes for better performance
    await queryInterface.addIndex("forms", ["status"]);
    await queryInterface.addIndex("form_submissions", ["form_id", "status"]);
    await queryInterface.addIndex("form_submissions", ["created_at"]);
    await queryInterface.addIndex("modals", ["status"]);
    await queryInterface.addIndex("popups", [
      "status",
      "start_date",
      "end_date",
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("popups");
    await queryInterface.dropTable("modals");
    await queryInterface.dropTable("form_submissions");
    await queryInterface.dropTable("forms");
  },
};
