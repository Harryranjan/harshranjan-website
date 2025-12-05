const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function verifyPages() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const [pages] = await connection.execute(
      "SELECT id, title, slug, show_in_menu, is_homepage FROM pages ORDER BY menu_order, id"
    );

    console.log("\n📊 CURRENT PAGES IN DATABASE");
    console.log("═══════════════════════════════════════════════════════════");
    console.log(`Total Pages: ${pages.length}\n`);

    pages.forEach((page, index) => {
      const menu = page.show_in_menu ? "✓ Menu" : "  Hidden";
      const home = page.is_homepage ? "🏠 HOME" : "";
      console.log(`${index + 1}. ${menu} | ${page.title} ${home}`);
      console.log(`   Slug: /pages/${page.slug}`);
    });

    console.log(
      "═══════════════════════════════════════════════════════════\n"
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

verifyPages();
