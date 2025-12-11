const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function cleanHomepage() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🧹 Cleaning Homepage...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // 1. Remove the Philosophy section after About (it's duplicate with the cards below)
    const philosophyCTA = content.indexOf("<!-- Minimal Why Choose CTA -->");
    const philosophyEnd = content.indexOf("</section>", philosophyCTA);
    if (philosophyCTA > -1 && philosophyEnd > -1) {
      const beforeCTA = content.substring(0, philosophyCTA);
      const afterCTA = content.substring(philosophyEnd + 10);
      content = beforeCTA + afterCTA;
      console.log("✓ Removed duplicate CTA after About section");
    }

    // 2. Remove "Meet Our Doctors" section (you only have Dr. Subodh in About)
    const doctorsSection = content.indexOf("<!-- Meet Our Doctors");
    if (doctorsSection > -1) {
      const doctorsSectionEnd = content.indexOf(
        "<!-- Conditions We Treat",
        doctorsSection
      );
      if (doctorsSectionEnd > -1) {
        const beforeDoctors = content.substring(0, doctorsSection);
        const afterDoctors = content.substring(doctorsSectionEnd);
        content = beforeDoctors + afterDoctors;
        console.log("✓ Removed duplicate 'Meet Our Doctors' section");
      }
    }

    // 3. Keep only ONE main CTA at the bottom (remove other duplicate CTAs if any)

    // 4. Ensure consistent spacing between sections (py-16 for main sections)
    content = content.replace(
      /class="relative py-20/g,
      'class="relative py-16'
    );
    content = content.replace(/class="py-20/g, 'class="py-16');
    console.log("✓ Standardized section spacing (py-16)");

    // 5. Update Stats section title for consistency
    content = content.replace("Our Impact in Numbers", "Our Track Record");
    console.log("✓ Updated section titles for consistency");

    await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
      content,
      "home",
    ]);

    console.log("\n========================================");
    console.log("✅ HOMEPAGE CLEANED!");
    console.log("========================================\n");

    console.log("🧹 Changes Made:\n");
    console.log("Structure:");
    console.log("  ✓ Hero Section (compact)");
    console.log("  ✓ About Dr. Subodh Kumar (with Success card)");
    console.log("  ✓ Treatment Philosophy (3 cards)");
    console.log("  ✓ What Sets Us Apart");
    console.log("  ✓ Conditions We Treat");
    console.log("  ✓ Quick Contact Bar");
    console.log("  ✓ Core Services (6 cards)");
    console.log("  ✓ Stats Section");
    console.log("  ✓ Testimonials");
    console.log("  ✓ Final CTA\n");

    console.log("Removed:");
    console.log("  ✗ Duplicate CTA after About");
    console.log("  ✗ Duplicate 'Meet Our Doctors' section");
    console.log("  ✗ Inconsistent spacing\n");

    console.log("========================================");
    console.log("Clean, organized homepage! 🎯");
    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

cleanHomepage();
