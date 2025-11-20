const { sequelize } = require("./config/database");

async function updatePopupsTable() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");

    // Rename message to content
    await sequelize.query(
      "ALTER TABLE popups CHANGE COLUMN message content TEXT"
    );
    console.log("✅ Renamed message to content");

    // Add template column
    try {
      await sequelize.query(
        "ALTER TABLE popups ADD COLUMN template VARCHAR(255) AFTER type"
      );
      console.log("✅ Added template column");
    } catch (error) {
      console.log("⚠️  Template column already exists");
    }

    // Add icon column
    try {
      await sequelize.query(
        "ALTER TABLE popups ADD COLUMN icon VARCHAR(255) AFTER template"
      );
      console.log("✅ Added icon column");
    } catch (error) {
      console.log("⚠️  Icon column already exists");
    }

    // Rename conversions to dismissals
    await sequelize.query(
      "ALTER TABLE popups CHANGE COLUMN conversions dismissals INT(11) DEFAULT 0"
    );
    console.log("✅ Renamed conversions to dismissals");

    // Update type ENUM
    await sequelize.query(
      'ALTER TABLE popups MODIFY COLUMN type ENUM("notification", "chat", "cookie_consent", "promo", "social_proof", "newsletter", "custom") DEFAULT "notification"'
    );
    console.log("✅ Updated type ENUM");

    // Update trigger_type ENUM
    await sequelize.query(
      'ALTER TABLE popups MODIFY COLUMN trigger_type ENUM("manual", "time", "scroll", "exit", "click", "immediate") DEFAULT "immediate"'
    );
    console.log("✅ Updated trigger_type ENUM");

    // Drop old columns
    try {
      await sequelize.query("ALTER TABLE popups DROP COLUMN position");
      console.log("✅ Dropped position column");
    } catch (error) {
      console.log("⚠️  Position column already dropped");
    }

    try {
      await sequelize.query("ALTER TABLE popups DROP COLUMN close_button");
      console.log("✅ Dropped close_button column");
    } catch (error) {
      console.log("⚠️  close_button column already dropped");
    }

    try {
      await sequelize.query("ALTER TABLE popups DROP COLUMN auto_close");
      console.log("✅ Dropped auto_close column");
    } catch (error) {
      console.log("⚠️  auto_close column already dropped");
    }

    try {
      await sequelize.query("ALTER TABLE popups DROP COLUMN start_date");
      console.log("✅ Dropped start_date column");
    } catch (error) {
      console.log("⚠️  start_date column already dropped");
    }

    try {
      await sequelize.query("ALTER TABLE popups DROP COLUMN end_date");
      console.log("✅ Dropped end_date column");
    } catch (error) {
      console.log("⚠️  end_date column already dropped");
    }

    console.log("\n✅ Popups table updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating popups table:", error.message);
    process.exit(1);
  }
}

updatePopupsTable();
