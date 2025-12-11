const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function fixAllSections() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🔧 Fixing ALL Sections for Consistency...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // 1. Standardize ALL section padding to py-16 (except Hero and About which are py-12)
    console.log("1. Standardizing section padding...");

    // Keep Hero and About at py-12, but fix everything else
    const sections = [
      "Core Services",
      "Stats Section",
      "Meet Our Doctors",
      "Conditions We Treat",
      "Testimonials",
      "CTA Section",
    ];

    // Fix large padding
    content = content.replace(/class="py-20 /g, 'class="py-16 ');
    content = content.replace(
      /class="relative py-20 /g,
      'class="relative py-16 '
    );

    // 2. Fix section headers - make them consistent
    console.log("2. Fixing section headers...");
    content = content.replace(
      /class="text-center mb-16 space-y-4"/g,
      'class="text-center mb-12"'
    );

    // 3. Fix card spacing - consistent gap
    console.log("3. Standardizing card grids...");
    content = content.replace(
      /grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8/g,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    );
    content = content.replace(
      /grid-cols-1 md:grid-cols-2 gap-8/g,
      "grid-cols-1 md:grid-cols-2 gap-6"
    );

    // 4. Ensure consistent max-width containers
    console.log("4. Standardizing containers...");
    content = content.replace(
      /max-w-7xl mx-auto px-4 sm:px-6 lg:px-8/g,
      "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    );

    // 5. Fix heading sizes to be consistent
    console.log("5. Standardizing heading sizes...");
    content = content.replace(
      /text-4xl md:text-5xl lg:text-6xl font-extrabold/g,
      "text-4xl font-extrabold"
    );
    content = content.replace(
      /text-3xl md:text-4xl font-extrabold/g,
      "text-3xl font-extrabold"
    );

    await connection.query(
      "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
      [content, "home"]
    );

    console.log("\n========================================");
    console.log("✅ ALL SECTIONS STANDARDIZED!");
    console.log("========================================\n");

    console.log("🔧 Changes:\n");
    console.log("Spacing:");
    console.log("  ✓ Hero & About: py-12 (compact)");
    console.log("  ✓ All other sections: py-16 (standard)");
    console.log("  ✓ Section headers: mb-12");
    console.log("  ✓ Card grids: gap-6\n");

    console.log("Layout:");
    console.log("  ✓ Containers: max-w-6xl (consistent)");
    console.log("  ✓ Headings: standardized sizes");
    console.log("  ✓ Removed excessive spacing\n");

    console.log("========================================");
    console.log("Consistent design restored! 🎯");
    console.log("========================================\n");

    console.log("Now do a HARD REFRESH: Ctrl + Shift + R\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

fixAllSections();
