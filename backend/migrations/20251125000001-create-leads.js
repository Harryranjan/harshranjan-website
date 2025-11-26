"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("leads", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "demo",
      },
      status: {
        type: Sequelize.ENUM(
          "new",
          "contacted",
          "qualified",
          "converted",
          "lost"
        ),
        defaultValue: "new",
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {},
      },
      lastInteraction: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Add indexes
    await queryInterface.addIndex("leads", ["email"], {
      unique: true,
      name: "leads_email_unique",
    });

    await queryInterface.addIndex("leads", ["status"], {
      name: "leads_status_index",
    });

    await queryInterface.addIndex("leads", ["source"], {
      name: "leads_source_index",
    });

    await queryInterface.addIndex("leads", ["createdAt"], {
      name: "leads_created_at_index",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("leads");
  },
};
