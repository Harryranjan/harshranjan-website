const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function updatePageLayouts() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🔧 Updating Pain Therapy Pages Layout Structure...\n");

    // Get all Pain Therapy pages
    const [pages] = await connection.query(
      "SELECT id, title, slug, content FROM pages WHERE slug IN (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        "home",
        "about-team",
        "spine-back-pain-therapy",
        "joint-pain-arthritis-treatment",
        "neuro-paralysis-rehab",
        "post-operative-rehabilitation",
        "manual-therapy-spinal-manipulation",
        "cupping-acupressure-therapy",
        "conditions-we-treat",
        "testimonials",
        "faq",
        "contact",
        "gallery",
      ]
    );

    console.log(`Found ${pages.length} pages to update\n`);

    let updatedCount = 0;

    for (const page of pages) {
      // Check if content has full HTML structure
      if (
        page.content.includes("<!DOCTYPE html>") ||
        page.content.includes("<html")
      ) {
        // Extract content between <body> tags
        const bodyMatch = page.content.match(/<body[^>]*>([\s\S]*)<\/body>/i);

        if (bodyMatch) {
          let cleanContent = bodyMatch[1].trim();

          // Update all container classes to use proper responsive widths
          // Replace: container mx-auto px-6 -> max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
          cleanContent = cleanContent.replace(
            /class="container mx-auto px-6"/g,
            'class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"'
          );

          // Ensure all sections have proper responsive containers
          cleanContent = cleanContent.replace(
            /class="container mx-auto px-4"/g,
            'class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"'
          );

          // Add responsive grid updates for mobile
          cleanContent = cleanContent.replace(
            /class="grid md:grid-cols-2/g,
            'class="grid grid-cols-1 md:grid-cols-2'
          );

          cleanContent = cleanContent.replace(
            /class="grid md:grid-cols-3/g,
            'class="grid grid-cols-1 md:grid-cols-3'
          );

          cleanContent = cleanContent.replace(
            /class="grid md:grid-cols-4/g,
            'class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
          );

          // Update the page content
          await connection.query(
            "UPDATE pages SET content = ?, template = ? WHERE id = ?",
            [cleanContent, "blank", page.id]
          );

          console.log(`✅ Updated: ${page.title}`);
          console.log(`   Slug: ${page.slug}`);
          console.log(`   Template changed to: blank`);
          console.log(`   Content structure cleaned\n`);
          updatedCount++;
        } else {
          console.log(
            `⚠️  Skipped: ${page.title} (Could not extract body content)\n`
          );
        }
      } else {
        console.log(`ℹ️  Skipped: ${page.title} (Already clean format)\n`);
      }
    }

    console.log(`\n========================================`);
    console.log(`✅ Layout Update Complete!`);
    console.log(`========================================`);
    console.log(`Total pages updated: ${updatedCount}`);
    console.log(`Pages skipped: ${pages.length - updatedCount}`);
    console.log(`\n📝 Changes Made:`);
    console.log(`   - Removed full HTML document structure`);
    console.log(`   - Extracted only body content`);
    console.log(`   - Updated template to 'blank'`);
    console.log(`   - Applied responsive container classes`);
    console.log(`   - Added proper mobile breakpoints`);
    console.log(
      `\n✨ Pages will now work correctly with or without header/footer!`
    );
    console.log(`========================================\n`);
  } catch (error) {
    console.error("❌ Error updating layouts:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

updatePageLayouts();
