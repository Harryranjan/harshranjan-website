const { sequelize } = require("../config/database");

async function addDownloadMetadata() {
  console.log("Adding metadata fields to downloads table...");

  try {
    await sequelize.query(`
      ALTER TABLE downloads
      ADD COLUMN IF NOT EXISTS author VARCHAR(255) DEFAULT NULL,
      ADD COLUMN IF NOT EXISTS difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
      ADD COLUMN IF NOT EXISTS reading_time VARCHAR(50) DEFAULT NULL,
      ADD COLUMN IF NOT EXISTS tags TEXT DEFAULT NULL;
    `);

    console.log("✓ Successfully added metadata fields to downloads table");
  } catch (error) {
    console.error("Error adding metadata fields:", error);
    throw error;
  }
}

// Run migration
addDownloadMetadata()
  .then(() => {
    console.log("\n✓ Migration completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n✗ Migration failed:", error);
    process.exit(1);
  });
