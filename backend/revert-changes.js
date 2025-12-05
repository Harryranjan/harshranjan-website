const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function revertChanges() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n↩️  Reverting Last Two Changes...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // Revert UI/UX changes - remove all the hover effects we added

    // 1. Revert card hover effects
    content = content.replace(
      /class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1/g,
      'class="bg-white rounded-xl shadow-lg p-6'
    );

    content = content.replace(
      /class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1/g,
      'class="bg-white rounded-xl shadow-md p-6'
    );

    // 2. Revert header tracking-tight
    content = content.replace(/ tracking-tight/g, "");

    // 3. Revert CTA button hover effects
    content = content.replace(
      /hover:bg-blue-700 hover:shadow-lg transition-all duration-300 hover:scale-105/g,
      "hover:bg-blue-700 transition-colors"
    );

    content = content.replace(
      /hover:bg-teal-700 hover:shadow-lg transition-all duration-300 hover:scale-105/g,
      "hover:bg-teal-700 transition-colors"
    );

    // 4. Revert stat card animations
    content = content.replace(
      /class="text-center p-1.5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:scale-105 transition-transform duration-200">/g,
      'class="text-center p-1.5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">'
    );

    content = content.replace(
      /class="text-center p-1.5 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg hover:scale-105 transition-transform duration-200">/g,
      'class="text-center p-1.5 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg">'
    );

    content = content.replace(
      /class="text-center p-1.5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:scale-105 transition-transform duration-200">/g,
      'class="text-center p-1.5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">'
    );

    content = content.replace(
      /class="text-center p-1.5 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:scale-105 transition-transform duration-200">/g,
      'class="text-center p-1.5 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">'
    );

    // 5. Revert expertise cards hover
    content = content.replace(
      /class="flex items-center gap-1.5 p-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">/g,
      'class="flex items-center gap-1.5 p-1.5 bg-blue-50 rounded-lg">'
    );

    content = content.replace(
      /class="flex items-center gap-1.5 p-1.5 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-200">/g,
      'class="flex items-center gap-1.5 p-1.5 bg-teal-50 rounded-lg">'
    );

    content = content.replace(
      /class="flex items-center gap-1.5 p-1.5 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">/g,
      'class="flex items-center gap-1.5 p-1.5 bg-orange-50 rounded-lg">'
    );

    content = content.replace(
      /class="flex items-center gap-1.5 p-1.5 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">/g,
      'class="flex items-center gap-1.5 p-1.5 bg-purple-50 rounded-lg">'
    );

    // 6. Revert About card border
    content = content.replace(
      'class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border-t-4 border-blue-600">',
      'class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">'
    );

    // Revert cleanup changes - restore spacing to py-20
    content = content.replace(
      /class="relative py-16/g,
      'class="relative py-20'
    );
    content = content.replace(/class="py-16/g, 'class="py-20');

    // Revert title changes
    content = content.replace("Our Track Record", "Our Impact in Numbers");

    await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
      content,
      "home",
    ]);

    console.log("========================================");
    console.log("✅ CHANGES REVERTED!");
    console.log("========================================\n");

    console.log("↩️  Reverted:\n");
    console.log("  ✓ Removed all hover effects");
    console.log("  ✓ Removed card animations");
    console.log("  ✓ Removed button scale effects");
    console.log("  ✓ Removed border accent");
    console.log("  ✓ Restored original spacing (py-20)");
    console.log("  ✓ Restored original titles\n");

    console.log("Note: The sections removed in cleanup");
    console.log("(CTA and Doctors) stay removed.\n");

    console.log("========================================");
    console.log("Back to previous state! 🔄");
    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

revertChanges();
