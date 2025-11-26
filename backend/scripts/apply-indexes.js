const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function applyIndexes() {
  let connection;

  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "127.0.0.1",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "harsh_ranjan_website",
      port: process.env.DB_PORT || 3306,
      multipleStatements: true,
    });

    console.log("✅ Connected to database");

    // Read SQL file
    const sqlPath = path.join(
      __dirname,
      "..",
      "migrations",
      "add-database-indexes.sql"
    );
    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    console.log("📄 Executing SQL file...");

    // Execute SQL
    await connection.query(sqlContent);

    console.log("✅ Database indexes applied successfully!");

    // Show performance check queries
    console.log("\n📊 Running performance checks...");

    const [slugIndexes] = await connection.query(
      "SHOW INDEX FROM blog_posts WHERE Key_name = 'idx_blog_posts_slug'"
    );
    console.log(`✓ blog_posts slug index: ${slugIndexes.length} found`);

    const [publishedIndexes] = await connection.query(
      "SHOW INDEX FROM blog_posts WHERE Key_name LIKE 'idx_blog_posts_published%'"
    );
    console.log(
      `✓ blog_posts published indexes: ${publishedIndexes.length} found`
    );

    const [formIndexes] = await connection.query(
      "SHOW INDEX FROM form_submissions WHERE Key_name LIKE 'idx_form_submissions%'"
    );
    console.log(
      `✓ form_submissions indexes: ${formIndexes.length} found`
    );

    console.log("\n✅ All indexes applied successfully!");
  } catch (error) {
    console.error("❌ Error applying indexes:", error.message);
    if (error.sql) {
      console.error("Failed SQL:", error.sql.substring(0, 200));
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

applyIndexes();
