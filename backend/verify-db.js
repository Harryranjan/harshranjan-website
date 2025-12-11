const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function verifyDatabase() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🔍 Verifying Database Content...\n");

    const [rows] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    const content = rows[0].content;

    console.log("========================================");
    console.log("ACTUAL DATABASE STATE");
    console.log("========================================\n");

    // Check Hero
    console.log("1. HERO SECTION:");
    if (content.includes('py-12">')) {
      console.log("   ✓ py-12 found");
    } else if (content.includes("py-10 lg:py-14")) {
      console.log("   ✗ Still has py-10 lg:py-14");
    }

    // Check About comment
    console.log("\n2. ABOUT SECTION COMMENT:");
    if (content.includes("<!-- Ultra Compact About Section")) {
      console.log("   ✓ Ultra Compact About Section");
    } else if (content.includes("<!-- Enhanced About Section")) {
      console.log("   ✗ Still says Enhanced About Section");
    }

    // Check About padding
    console.log("\n3. ABOUT SECTION PADDING:");
    const aboutIdx = content.indexOf("About Section");
    const afterComment = content.substring(aboutIdx, aboutIdx + 200);
    const pyMatch = afterComment.match(/py-(\d+)/);
    if (pyMatch) {
      console.log(`   Current: py-${pyMatch[1]}`);
      console.log(
        `   ${pyMatch[1] === "12" ? "✓ Correct" : "✗ Should be py-12"}`
      );
    }

    // Extract snippet
    console.log("\n4. ACTUAL CODE SNIPPET:");
    const snippetStart = content.indexOf("About Section");
    console.log(content.substring(snippetStart, snippetStart + 300));

    console.log("\n========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

verifyDatabase();
