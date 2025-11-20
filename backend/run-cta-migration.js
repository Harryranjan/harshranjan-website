const { sequelize } = require("./config/database");
const ctaBannerFormIdMigration = require("./migrations/009-add-form-id-to-cta-banners");

(async () => {
  try {
    console.log("Running CTA Banner form_id migration...");

    await ctaBannerFormIdMigration.up(
      sequelize.getQueryInterface(),
      require("sequelize")
    );

    console.log("✅ CTA Banner form_id migration completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
})();
