const { sequelize } = require("./config/database");
const migration = require("./migrations/005-create-settings");

(async () => {
  try {
    console.log("Running migration...");
    await migration.up(sequelize.getQueryInterface(), require("sequelize"));
    console.log("✅ Migration completed successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
})();
