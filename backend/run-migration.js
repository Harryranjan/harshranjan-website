const { sequelize } = require("./config/database");
const settingsMigration = require("./migrations/005-create-settings");
const downloadsMigration = require("./migrations/006-create-downloads");

(async () => {
  try {
    console.log("Running migrations...");

    // Run settings migration
    console.log("\n📝 Running settings migration...");
    await settingsMigration.up(
      sequelize.getQueryInterface(),
      require("sequelize")
    );
    console.log("✅ Settings migration completed");

    // Run downloads migration
    console.log("\n📥 Running downloads migration...");
    await downloadsMigration.up(
      sequelize.getQueryInterface(),
      require("sequelize")
    );
    console.log("✅ Downloads migration completed");

    console.log("\n🎉 All migrations completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
})();
