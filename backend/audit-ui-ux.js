const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function auditUIUX() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎨 UI/UX Audit Report\n");

    const [rows] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    const content = rows[0].content;

    console.log("========================================");
    console.log("CURRENT STATE");
    console.log("========================================\n");

    // Check containers
    const containers = content.match(/max-w-\w+/g) || [];
    const uniqueContainers = [...new Set(containers)];
    console.log("Container Widths:");
    uniqueContainers.forEach((c) => {
      const count = containers.filter((x) => x === c).length;
      console.log(
        `  ${c}: ${count} times ${
          c === "max-w-6xl"
            ? "✓"
            : c === "max-w-4xl" || c === "max-w-2xl"
            ? "(centered content)"
            : "⚠️"
        }`
      );
    });

    // Check headings
    const headings = content.match(/text-\d+xl/g) || [];
    const uniqueHeadings = [...new Set(headings)];
    console.log("\nHeading Sizes:");
    uniqueHeadings.forEach((h) => {
      const count = headings.filter((x) => x === h).length;
      console.log(`  ${h}: ${count} times`);
    });

    // Check gaps
    const gaps = content.match(/gap-\d+/g) || [];
    const uniqueGaps = [...new Set(gaps)].sort();
    console.log("\nCard/Grid Gaps:");
    uniqueGaps.forEach((g) => {
      const count = gaps.filter((x) => x === g).length;
      console.log(`  ${g}: ${count} times`);
    });

    // Check rounded corners
    const roundedClasses = content.match(/rounded-\w+/g) || [];
    const uniqueRounded = [...new Set(roundedClasses)];
    console.log("\nBorder Radius:");
    console.log(
      `  Variants: ${uniqueRounded.length} different (${uniqueRounded.join(
        ", "
      )})`
    );

    console.log("\n========================================");
    console.log("CONSISTENCY ISSUES");
    console.log("========================================\n");

    let issues = [];

    if (uniqueContainers.length > 3) {
      issues.push(
        "❌ Too many container widths - should use max-w-6xl for sections, max-w-2xl/4xl for centered content only"
      );
    }

    if (uniqueHeadings.length > 4) {
      issues.push("❌ Too many heading sizes - creates visual chaos");
    }

    if (uniqueGaps.length > 5) {
      issues.push("❌ Too many gap values - inconsistent spacing");
    }

    if (content.includes("text-5xl")) {
      issues.push("⚠️  text-5xl found - too large for consistency");
    }

    if (issues.length === 0) {
      console.log("✅ No major issues found!");
    } else {
      issues.forEach((issue) => console.log(issue));
    }

    console.log("\n========================================");
    console.log("RECOMMENDATIONS");
    console.log("========================================\n");

    console.log("Standardize:");
    console.log("  1. Section headings → text-3xl");
    console.log("  2. Card titles → text-xl");
    console.log("  3. Body text → text-sm or text-base");
    console.log("  4. Main containers → max-w-6xl");
    console.log("  5. Card grids → gap-6");
    console.log(
      "  6. Border radius → rounded-xl for cards, rounded-lg for buttons\n"
    );

    console.log("Should I standardize these for perfect consistency?");
    console.log(
      "This will make the entire page feel unified and professional.\n"
    );

    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

auditUIUX();
