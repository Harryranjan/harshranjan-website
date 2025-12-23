const mysql = require("mysql2/promise");

async function removeStickyContactBar() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  const [rows] = await connection.execute(
    "SELECT content FROM pages WHERE slug = ?",
    ["home"]
  );

  let content = rows[0].content;

  // Remove the sticky positioning from the Quick Contact Bar
  content = content.replace(
    'class="bg-gradient-to-r from-blue-600 to-teal-500 py-4 sticky top-0 z-40"',
    'class="bg-gradient-to-r from-blue-600 to-teal-500 py-4"'
  );

  // Update database
  await connection.execute(
    "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
    [content, "home"]
  );

  console.log("✅ Removed sticky positioning from Quick Contact Bar");
  console.log("   The contact bar will now scroll normally with the page");

  await connection.end();
}

removeStickyContactBar().catch(console.error);
