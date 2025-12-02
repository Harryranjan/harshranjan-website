const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function debugPageIssue() {
  let connection;
  try {
    console.log("🔍 Debugging ultra-modern page issue...");
    connection = await mysql.createConnection(dbConfig);

    // Check table structure
    console.log("\n📋 PAGES TABLE STRUCTURE:");
    const [columns] = await connection.execute("DESCRIBE pages");
    columns.forEach((col) => {
      if (col.Field === "template") {
        console.log(
          `Template field: ${col.Type}, Null: ${col.Null}, Default: ${
            col.Default || "None"
          }`
        );
      }
    });

    // Check current page data
    console.log("\n📄 CURRENT PAGE DATA:");
    const [rows] = await connection.execute(
      "SELECT id, title, slug, template, status FROM pages WHERE slug = ?",
      ["homepage-2025"]
    );
    if (rows.length > 0) {
      console.log("ID:", rows[0].id);
      console.log("Title:", rows[0].title);
      console.log("Slug:", rows[0].slug);
      console.log("Template:", `"${rows[0].template}"`);
      console.log("Status:", rows[0].status);
    } else {
      console.log("❌ Page not found!");
      return;
    }

    // Try to update template with proper ENUM value
    console.log('\n🔧 Updating template to "custom"...');
    const [updateResult] = await connection.execute(
      "UPDATE pages SET template = ? WHERE slug = ?",
      ["custom", "homepage-2025"]
    );
    console.log("Affected rows:", updateResult.affectedRows);

    // Verify the update
    console.log("\n✅ VERIFICATION:");
    const [verifyRows] = await connection.execute(
      "SELECT template FROM pages WHERE slug = ?",
      ["homepage-2025"]
    );
    if (verifyRows.length > 0) {
      console.log("Template after update:", `"${verifyRows[0].template}"`);
    }

    // Also check if there are any enum constraints
    console.log("\n📋 CHECKING ENUM VALUES:");
    const [enumCheck] = await connection.execute(
      "SHOW COLUMNS FROM pages LIKE 'template'"
    );
    if (enumCheck.length > 0) {
      console.log("Template enum values:", enumCheck[0].Type);
    }

    console.log("\n🌐 ACCESS URLS:");
    console.log("Direct page access: /pages/homepage-2025");
    console.log("The page should now render as a full HTML document.");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

debugPageIssue();
