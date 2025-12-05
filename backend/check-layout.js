const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function checkLayout() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🔍 Checking Layout & Fonts...\n");

    const [rows] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    const content = rows[0].content;

    console.log("========================================");
    console.log("CURRENT STATE");
    console.log("========================================\n");

    // Check Hero section
    console.log("Hero Section:");
    if (content.includes("py-10 lg:py-14")) {
      console.log("  ✗ Padding: py-10 lg:py-14 (WRONG - should be py-12)");
    } else if (content.includes("py-12")) {
      console.log("  ✓ Padding: py-12 (CORRECT - compact)");
    }

    // Check About section
    console.log("\nAbout Section:");
    if (content.includes("<!-- Enhanced About Section")) {
      if (content.includes("py-20")) {
        console.log("  ✗ Padding: py-20 (WRONG - should be py-12)");
      } else if (content.includes("py-12")) {
        console.log("  ✓ Padding: py-12 (CORRECT - compact)");
      }
    } else if (content.includes("<!-- Ultra Compact About Section")) {
      console.log("  ✓ Using: Ultra Compact About Section");
    }

    // Check image height
    const imgMatch = content.match(/min-h-\[(\d+)px\]/);
    if (imgMatch) {
      const height = imgMatch[1];
      console.log(
        `  Image height: ${height}px ${
          height === "240" ? "(CORRECT)" : "(SHOULD BE 240px)"
        }`
      );
    }

    // Check font sizes in About
    console.log("\nAbout Section Fonts:");
    if (content.includes("text-xl font-extrabold text-gray-900")) {
      console.log("  ✓ Doctor name: text-xl (CORRECT - compact)");
    } else if (content.includes("text-2xl font-extrabold text-gray-900")) {
      console.log("  ✗ Doctor name: text-2xl (WRONG - should be text-xl)");
    }

    if (content.includes("text-xs text-gray-600 leading-relaxed")) {
      console.log("  ✓ Paragraph: text-xs (CORRECT - compact)");
    } else if (content.includes("text-sm text-gray-600")) {
      console.log("  ✗ Paragraph: text-sm (WRONG - should be text-xs)");
    }

    // Check section title
    console.log("\nSection Comment:");
    if (content.includes("<!-- Ultra Compact About Section")) {
      console.log("  ✓ Ultra Compact About Section");
    } else if (content.includes("<!-- Enhanced About Section")) {
      console.log("  ✗ Enhanced About Section (OLD VERSION)");
    }

    console.log("\n========================================");
    console.log("DIAGNOSIS");
    console.log("========================================\n");

    const hasWrongVersion =
      content.includes("<!-- Enhanced About Section") ||
      content.includes("py-20") ||
      !content.includes("min-h-[240px]");

    if (hasWrongVersion) {
      console.log("❌ PROBLEM FOUND!");
      console.log("\nThe revert script brought back OLD versions:");
      console.log(
        "  • About section using 'Enhanced' instead of 'Ultra Compact'"
      );
      console.log("  • Wrong padding values");
      console.log("  • Wrong font sizes\n");
      console.log("Need to restore the CORRECT compact version!");
    } else {
      console.log("✅ Layout looks correct!");
    }

    console.log("\n========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

checkLayout();
