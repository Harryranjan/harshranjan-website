const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function improveUIUX() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎨 Improving UI/UX...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // 1. Add smooth hover effects to all cards
    content = content.replace(
      /class="bg-white rounded-xl shadow-lg p-6/g,
      'class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'
    );

    content = content.replace(
      /class="bg-white rounded-xl shadow-md p-6/g,
      'class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
    );

    // 2. Enhance section headers with better styling
    content = content.replace(
      /<h2 class="text-3xl font-extrabold text-gray-900 mb-3">/g,
      '<h2 class="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">'
    );

    content = content.replace(
      /<h2 class="text-4xl font-extrabold text-gray-900 mb-4">/g,
      '<h2 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">'
    );

    // 3. Improve CTA button hover states
    content = content.replace(
      /hover:bg-blue-700 transition-colors/g,
      "hover:bg-blue-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
    );

    content = content.replace(
      /hover:bg-teal-700 transition-colors/g,
      "hover:bg-teal-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
    );

    // 4. Add subtle animations to stat cards
    content = content.replace(
      /class="text-center p-1.5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">/g,
      'class="text-center p-1.5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:scale-105 transition-transform duration-200">'
    );

    content = content.replace(
      /class="text-center p-1.5 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg">/g,
      'class="text-center p-1.5 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg hover:scale-105 transition-transform duration-200">'
    );

    content = content.replace(
      /class="text-center p-1.5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">/g,
      'class="text-center p-1.5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:scale-105 transition-transform duration-200">'
    );

    content = content.replace(
      /class="text-center p-1.5 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">/g,
      'class="text-center p-1.5 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:scale-105 transition-transform duration-200">'
    );

    // 5. Improve expertise cards hover effect
    content = content.replace(
      /class="flex items-center gap-1.5 p-1.5 bg-blue-50 rounded-lg">/g,
      'class="flex items-center gap-1.5 p-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">'
    );

    content = content.replace(
      /class="flex items-center gap-1.5 p-1.5 bg-teal-50 rounded-lg">/g,
      'class="flex items-center gap-1.5 p-1.5 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-200">'
    );

    content = content.replace(
      /class="flex items-center gap-1.5 p-1.5 bg-orange-50 rounded-lg">/g,
      'class="flex items-center gap-1.5 p-1.5 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">'
    );

    content = content.replace(
      /class="flex items-center gap-1.5 p-1.5 bg-purple-50 rounded-lg">/g,
      'class="flex items-center gap-1.5 p-1.5 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">'
    );

    // 6. Add border accent to main About card
    content = content.replace(
      'class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">',
      'class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border-t-4 border-blue-600">'
    );

    await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
      content,
      "home",
    ]);

    console.log("========================================");
    console.log("✅ UI/UX IMPROVED!");
    console.log("========================================\n");

    console.log("🎨 Enhancements:\n");
    console.log("Interactive Elements:");
    console.log("  ✓ Hover lift effect on all cards");
    console.log("  ✓ Shadow enhancement on hover");
    console.log("  ✓ Smooth scale animations on stats");
    console.log("  ✓ Color transitions on expertise cards");
    console.log("  ✓ Button scale + shadow on hover\n");

    console.log("Visual Improvements:");
    console.log("  ✓ Tighter letter spacing on headers");
    console.log("  ✓ Blue accent border on About card");
    console.log("  ✓ Consistent transition durations (200-300ms)\n");

    console.log("User Experience:");
    console.log("  ✓ Better feedback on interactive elements");
    console.log("  ✓ Smooth, professional animations");
    console.log("  ✓ Visual hierarchy maintained\n");

    console.log("========================================");
    console.log("Premium feel achieved! ✨");
    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

improveUIUX();
