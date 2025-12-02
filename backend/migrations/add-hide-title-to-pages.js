/**
 * Migration: Add hide_title column to pages table
 * Created: 2025-12-01
 *
 * This migration adds a boolean column 'hide_title' to control
 * whether the page title is displayed on the frontend.
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("pages", "hide_title", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      after: "show_in_menu", // Add after show_in_menu column
    });

    console.log("✅ Successfully added hide_title column to pages table");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("pages", "hide_title");
    console.log("✅ Successfully removed hide_title column from pages table");
  },
};
