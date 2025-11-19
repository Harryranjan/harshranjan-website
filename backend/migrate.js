const { sequelize } = require("./config/database");

async function migrate() {
  try {
    console.log("Starting migration...");

    // Add scheduled_at column
    await sequelize.query(`
      ALTER TABLE blog_posts 
      ADD COLUMN IF NOT EXISTS scheduled_at DATETIME NULL
      AFTER published_at
    `);
    console.log("✅ Added scheduled_at column");

    // Add publish_status column
    await sequelize.query(`
      ALTER TABLE blog_posts 
      ADD COLUMN IF NOT EXISTS publish_status ENUM('draft', 'scheduled', 'published') 
      DEFAULT 'draft'
      AFTER scheduled_at
    `);
    console.log("✅ Added publish_status column");

    // Update existing records to have proper publish_status
    await sequelize.query(`
      UPDATE blog_posts 
      SET publish_status = CASE 
        WHEN is_published = 1 THEN 'published'
        ELSE 'draft'
      END
      WHERE publish_status IS NULL OR publish_status = ''
    `);
    console.log("✅ Updated existing records with publish_status");

    console.log("✅ Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrate();
