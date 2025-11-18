const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    // Sync models (creates tables if they don't exist)
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: false }); // Set to true to auto-update tables
      console.log("✅ Database models synced");
    }
  } catch (error) {
    console.error("❌ Unable to connect to database:", error.message);
    throw error; // Throw instead of exit to allow server to continue
  }
};

module.exports = { sequelize, connectDB };
