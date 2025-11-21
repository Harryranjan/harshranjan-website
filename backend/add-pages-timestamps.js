const { sequelize } = require("./config/database");

async function addPagesTimestamps() {
  try {
    console.log("Adding timestamps to pages table...");

    // Add created_at column if it doesn't exist
    await sequelize.query(`
      ALTER TABLE pages 
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP 
      DEFAULT CURRENT_TIMESTAMP 
      AFTER body_scripts
    `);
    console.log("✓ Added created_at column");

    // Add updated_at column if it doesn't exist
    await sequelize.query(`
      ALTER TABLE pages 
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP 
      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
      AFTER created_at
    `);
    console.log("✓ Added updated_at column");

    // Update existing rows with null timestamps
    await sequelize.query(`
      UPDATE pages 
      SET created_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      WHERE created_at IS NULL OR updated_at IS NULL
    `);
    console.log("✓ Updated existing pages with timestamps");

    console.log("✅ Pages table timestamps added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to add timestamps:", error.message);
    process.exit(1);
  }
}

addPagesTimestamps();
