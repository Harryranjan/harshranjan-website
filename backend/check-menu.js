const mysql = require("mysql2/promise");
require("dotenv").config();

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    });

    console.log("=== MENU ITEMS FOR MENU ID 25 ===\n");

    const [items] = await conn.query(
      "SELECT id, parent_id, title, url, `order` as menu_order FROM menu_items WHERE menu_id = 25 ORDER BY `order`"
    );

    console.log(`Total items: ${items.length}\n`);

    items.forEach((item) => {
      const parentText = item.parent_id
        ? `(child of ${item.parent_id})`
        : "(top-level)";
      console.log(`[${item.menu_order}] ${item.title} ${parentText}`);
      console.log(`    URL: ${item.url || "N/A"}`);
      console.log("");
    });

    await conn.end();
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
