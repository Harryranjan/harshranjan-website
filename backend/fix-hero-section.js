const mysql = require("mysql2/promise");

async function fixHeroSection() {
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

  // Fix the missing closing div tag in the Background Pattern section
  content = content.replace(
    `<!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>


        <!-- Animated Medical Icons -->`,
    `<!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <!-- Animated Medical Icons -->`
  );

  await connection.execute(
    "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
    [content, "home"]
  );

  console.log("✅ Fixed hero section - closed the Background Pattern div tag!");
  await connection.end();
}

fixHeroSection().catch(console.error);
