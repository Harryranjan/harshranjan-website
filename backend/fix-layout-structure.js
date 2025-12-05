const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function fixLayout() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🔧 Fixing Layout & Structure...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // 1. Fix Hero section padding: py-10 lg:py-14 → py-12
    content = content.replace(
      'class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">',
      'class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">'
    );
    console.log("✓ Fixed Hero padding: py-10 lg:py-14 → py-12");

    // 2. Fix About section padding: py-20 → py-12
    content = content.replace(
      '<!-- Enhanced About Section - Dr. Subodh Kumar -->\n<section class="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">',
      '<!-- Ultra Compact About Section - Dr. Subodh Kumar -->\n<section class="relative py-12 bg-gradient-to-b from-white to-gray-50 overflow-hidden">'
    );
    console.log("✓ Fixed About padding: py-20 → py-12");
    console.log("✓ Updated section comment to 'Ultra Compact'");

    // 3. Fix any remaining py-20 in other sections to py-16
    content = content.replace(
      /class="relative py-20 /g,
      'class="relative py-16 '
    );
    content = content.replace(/class="py-20 /g, 'class="py-16 ');
    console.log("✓ Standardized other sections: py-20 → py-16");

    await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
      content,
      "home",
    ]);

    console.log("\n========================================");
    console.log("✅ LAYOUT FIXED!");
    console.log("========================================\n");

    console.log("🔧 Corrections:\n");
    console.log("Hero Section:");
    console.log("  ✓ Padding: py-12 (compact, viewport-fitting)");
    console.log("\nAbout Section:");
    console.log("  ✓ Padding: py-12 (ultra compact)");
    console.log("  ✓ Comment: 'Ultra Compact About Section'");
    console.log("  ✓ Image: 240px height");
    console.log("  ✓ Fonts: text-xl (name), text-xs (content)");
    console.log("\nOther Sections:");
    console.log("  ✓ Padding: py-16 (standard)\n");

    console.log("========================================");
    console.log("Compact layout restored! 🎯");
    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

fixLayout();
