"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable("pages");

    // Add created_at if it doesn't exist
    if (!tableInfo.created_at) {
      await queryInterface.addColumn("pages", "created_at", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      });
      console.log("✓ Added created_at column to pages table");
    }

    // Add updated_at if it doesn't exist
    if (!tableInfo.updated_at) {
      await queryInterface.addColumn("pages", "updated_at", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      });
      console.log("✓ Added updated_at column to pages table");
    }

    // Update existing rows to have proper timestamps if they were null
    await queryInterface.sequelize.query(`
      UPDATE pages 
      SET created_at = CURRENT_TIMESTAMP 
      WHERE created_at IS NULL;
    `);

    console.log("✓ Pages table timestamps migration completed");
  },

  down: async (queryInterface, Sequelize) => {
    // Optionally remove the columns (not recommended in production)
    // await queryInterface.removeColumn("pages", "created_at");
    // await queryInterface.removeColumn("pages", "updated_at");
    console.log("Skipping down migration - timestamps should be kept");
  },
};
