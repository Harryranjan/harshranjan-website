const mysql = require("mysql2/promise");

async function fixHeroLayoutStats() {
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

  // Remove the empty stats row and fix the structure
  content = content.replace(
    `                    <!-- Stats Row - SMALLER -->
                    <div class="flex gap-4">
                        </div>

                <!-- Right Side - Quick Consultation Card - Takes 2 columns -->`,
    `                </div>

                <!-- Right Side - Quick Consultation Card - Takes 2 columns -->`
  );

  await connection.execute(
    "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
    [content, "home"]
  );

  console.log("✅ Fixed hero layout - removed empty stats row!");
  await connection.end();
}

fixHeroLayoutStats().catch(console.error);
