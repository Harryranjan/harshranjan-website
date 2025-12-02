/**
 * Run the hide_title migration
 * This script adds the hide_title column to the pages table
 */

const { sequelize } = require("./config/database");

async function runMigration() {
  try {
    console.log(
      "🔄 Starting migration: Add hide_title column to pages table..."
    );

    // Check if column already exists
    const [results] = await sequelize.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'pages' AND COLUMN_NAME = 'hide_title'
    `);

    if (results.length > 0) {
      console.log("ℹ️  Column hide_title already exists. Skipping migration.");
      process.exit(0);
    }

    // Add the column
    await sequelize.query(`
      ALTER TABLE pages 
      ADD COLUMN hide_title BOOLEAN NOT NULL DEFAULT 0 
      AFTER show_in_menu
    `);

    console.log("✅ Successfully added hide_title column to pages table");

    // Verify the column was added
    const [verify] = await sequelize.query(`
      SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'pages' AND COLUMN_NAME = 'hide_title'
    `);

    console.log("📋 Column details:", verify[0]);
    console.log("✨ Migration completed successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  }
}

runMigration();
