const { sequelize, Category, Tag } = require("../models");

async function syncDatabase() {
  try {
    console.log("Starting database sync...");

    // Sync Category table
    await Category.sync({ alter: true });
    console.log("✓ Category table synced");

    // Sync Tag table
    await Tag.sync({ alter: true });
    console.log("✓ Tag table synced");

    console.log("Database sync completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error syncing database:", error);
    process.exit(1);
  }
}

syncDatabase();
