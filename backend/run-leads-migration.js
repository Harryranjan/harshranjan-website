const { sequelize } = require("./config/database");

async function migrateLead() {
  try {
    console.log("Starting leads table migration...");

    // Create leads table (email field limited to 191 chars for utf8mb4 unique index)
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NULL,
        email VARCHAR(191) NOT NULL UNIQUE,
        phone VARCHAR(255) NULL,
        company VARCHAR(255) NULL,
        source VARCHAR(255) NOT NULL DEFAULT 'demo',
        status ENUM('new', 'contacted', 'qualified', 'converted', 'lost') DEFAULT 'new',
        metadata TEXT NULL,
        lastInteraction DATETIME DEFAULT CURRENT_TIMESTAMP,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✅ Created leads table");

    // Add indexes
    await sequelize
      .query(
        `
      CREATE INDEX IF NOT EXISTS leads_status_index ON leads(status);
    `
      )
      .catch(() => console.log("Index leads_status_index already exists"));

    await sequelize
      .query(
        `
      CREATE INDEX IF NOT EXISTS leads_source_index ON leads(source);
    `
      )
      .catch(() => console.log("Index leads_source_index already exists"));

    await sequelize
      .query(
        `
      CREATE INDEX IF NOT EXISTS leads_created_at_index ON leads(createdAt);
    `
      )
      .catch(() => console.log("Index leads_created_at_index already exists"));

    console.log("✅ Added all indexes");

    console.log("✅ Leads migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrateLead();
