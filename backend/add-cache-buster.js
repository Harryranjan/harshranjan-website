const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function addCacheBuster() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🔄 Adding Cache Buster...\n");

    const [rows] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = rows[0].content;

    // Add a timestamp comment at the very top to bust cache
    const timestamp = new Date().toISOString();
    const cacheBuster = `<!-- Updated: ${timestamp} -->\n`;

    content = cacheBuster + content;

    await connection.query(
      "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
      [content, "home"]
    );

    console.log("========================================");
    console.log("✅ CACHE BUSTER ADDED!");
    console.log("========================================\n");

    console.log("Actions to take:\n");
    console.log("1. Hard refresh in browser:");
    console.log("   • Windows: Ctrl + Shift + R or Ctrl + F5");
    console.log(
      "   • Or: Open DevTools (F12) → Network tab → Disable cache checkbox"
    );
    console.log("\n2. If still not working:");
    console.log("   • Clear browser cache completely");
    console.log("   • Try incognito/private mode\n");

    console.log("Database updated with timestamp:", timestamp);
    console.log("\n========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

addCacheBuster();
