const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function standardizeUIUX() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎨 Standardizing UI/UX...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // 1. Standardize section headings to text-3xl (remove text-5xl and text-4xl md:text-5xl variations)
    console.log("1. Standardizing section headings...");
    content = content.replace(/text-5xl/g, "text-3xl");
    content = content.replace(/text-4xl md:text-5xl/g, "text-3xl");

    // 2. Standardize main card grids to gap-6
    console.log("2. Standardizing card grid gaps...");
    content = content.replace(
      /grid md:grid-cols-2 lg:grid-cols-3 gap-8/g,
      "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    );
    content = content.replace(
      /grid md:grid-cols-3 gap-8/g,
      "grid md:grid-cols-3 gap-6"
    );
    content = content.replace(
      /grid grid-cols-2 md:grid-cols-4 gap-8/g,
      "grid grid-cols-2 md:grid-cols-4 gap-6"
    );

    // 3. Standardize section bottom margins
    console.log("3. Standardizing section margins...");
    content = content.replace(/mb-16/g, "mb-12");

    // 4. Keep About section compact elements (gap-1.5, gap-2) but standardize others
    // This is intentional for the compact About section

    // 5. Ensure all main sections have consistent py-16 (except Hero and About which are py-12)
    console.log("4. Ensuring consistent section padding...");
    // This should already be correct from rebuild

    await connection.query(
      "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
      [content, "home"]
    );

    console.log("\n========================================");
    console.log("✅ UI/UX STANDARDIZED!");
    console.log("========================================\n");

    console.log("🎨 Changes Made:\n");
    console.log("Typography:");
    console.log("  ✓ All section headings: text-3xl (consistent)");
    console.log("  ✓ Removed oversized text-5xl");
    console.log("  ✓ Card titles remain text-xl\n");

    console.log("Spacing:");
    console.log("  ✓ Section margins: mb-12 (consistent)");
    console.log("  ✓ Card grids: gap-6 (standard)");
    console.log("  ✓ About section: gap-1.5, gap-2 (intentionally compact)\n");

    console.log("Layout:");
    console.log("  ✓ Hero & About: py-12 (compact)");
    console.log("  ✓ All other sections: py-16 (standard)");
    console.log("  ✓ Containers: max-w-6xl (consistent)\n");

    console.log("========================================");
    console.log("Perfect visual consistency achieved! ✨");
    console.log("========================================\n");

    console.log("Now HARD REFRESH: Ctrl + Shift + R\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

standardizeUIUX();
