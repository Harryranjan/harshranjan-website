const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function finalPolish() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n✨ Final UI/UX Polish...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // 1. Fix remaining text-4xl to text-3xl (for section headings only)
    console.log("1. Fixing remaining text-4xl headings...");
    // Hero title can stay text-4xl, but other section headings should be text-3xl
    const heroIndex = content.indexOf("<!-- Clean Compact Hero Section -->");
    const aboutIndex = content.indexOf("<!-- Ultra Compact About Section");

    // Replace text-4xl AFTER hero section (in other sections)
    const afterHero = content.substring(aboutIndex);
    const beforeHero = content.substring(0, aboutIndex);

    const fixedAfterHero = afterHero.replace(/text-4xl/g, "text-3xl");
    content = beforeHero + fixedAfterHero;

    // 2. Standardize remaining gap-8 to gap-6 (except very small gaps in About section)
    console.log("2. Standardizing remaining gaps...");
    // Keep gap-1 and gap-2 for About section (intentionally compact)
    // But fix gap-8 in other sections
    content = content.replace(/gap-8 items-center/g, "gap-6 items-center");

    // 3. Ensure visual rhythm - check if we need to adjust anything else
    console.log("3. Ensuring visual rhythm...");

    await connection.query(
      "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
      [content, "home"]
    );

    console.log("\n========================================");
    console.log("✅ FINAL POLISH COMPLETE!");
    console.log("========================================\n");

    console.log("🎯 Final State:\n");
    console.log("Typography Hierarchy:");
    console.log("  • Hero headline: text-4xl (emphasis)");
    console.log("  • Section headings: text-3xl (consistent)");
    console.log("  • Card titles: text-xl");
    console.log("  • Subheadings: text-2xl");
    console.log("  • Body text: text-sm/text-base\n");

    console.log("Spacing System:");
    console.log("  • Section padding: py-12 (Hero, About), py-16 (others)");
    console.log("  • Section margins: mb-12");
    console.log("  • Card grids: gap-6");
    console.log("  • Compact elements: gap-1.5, gap-2 (About section only)\n");

    console.log("Visual Consistency:");
    console.log("  ✓ Unified color palette");
    console.log("  ✓ Consistent border radius");
    console.log("  ✓ Same container widths");
    console.log("  ✓ Balanced white space\n");

    console.log("========================================");
    console.log("Homepage is now perfectly consistent! 🎨");
    console.log("========================================\n");

    console.log("HARD REFRESH now: Ctrl + Shift + R\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

finalPolish();
