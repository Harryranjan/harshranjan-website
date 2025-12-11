const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function fixPageStructure() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log(
      "\n🔧 Converting Pain Therapy Pages to React-Compatible Format...\n"
    );

    // Get all Pain Therapy pages
    const [pages] = await connection.query(
      "SELECT id, title, slug, content, template FROM pages WHERE slug IN (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

    console.log(`Found ${pages.length} pages to process\n`);

    let updatedCount = 0;

    for (const page of pages) {
      let needsUpdate = false;
      let cleanContent = page.content;

      // Check if content has full HTML structure
      if (
        page.content.includes("<!DOCTYPE html>") ||
        page.content.includes("<html")
      ) {
        console.log(`🔍 Processing: ${page.title}`);
        console.log(`   Current template: ${page.template}`);

        // Extract content between <body> tags
        const bodyMatch = page.content.match(/<body[^>]*>([\s\S]*)<\/body>/i);

        if (bodyMatch) {
          cleanContent = bodyMatch[1].trim();
          needsUpdate = true;
          console.log(`   ✅ Extracted body content`);
        }
      }

      // Additional cleanup: remove standalone <script> tags for Tailwind CDN
      // (React app already has Tailwind configured)
      if (cleanContent.includes('<script src="https://cdn.tailwindcss.com">')) {
        cleanContent = cleanContent.replace(
          /<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/g,
          ""
        );
        needsUpdate = true;
        console.log(`   ✅ Removed Tailwind CDN script (using app's Tailwind)`);
      }

      // Update container classes for better responsive layout
      if (cleanContent.includes("container mx-auto px-6")) {
        cleanContent = cleanContent.replace(
          /class="container mx-auto px-6"/g,
          'class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"'
        );
        needsUpdate = true;
        console.log(`   ✅ Updated container classes for responsive layout`);
      }

      // Fix grid classes to include base mobile-first classes
      if (
        cleanContent.includes("grid md:grid-cols-2") &&
        !cleanContent.includes("grid grid-cols-1 md:grid-cols-2")
      ) {
        cleanContent = cleanContent.replace(
          /class="grid md:grid-cols-2/g,
          'class="grid grid-cols-1 md:grid-cols-2'
        );
        needsUpdate = true;
      }

      if (
        cleanContent.includes("grid md:grid-cols-3") &&
        !cleanContent.includes("grid grid-cols-1 md:grid-cols-3")
      ) {
        cleanContent = cleanContent.replace(
          /class="grid md:grid-cols-3/g,
          'class="grid grid-cols-1 md:grid-cols-3'
        );
        needsUpdate = true;
      }

      if (needsUpdate) {
        // Update the page: set content and template
        await connection.query(
          "UPDATE pages SET content = ?, template = ? WHERE id = ?",
          [cleanContent, "blank", page.id]
        );

        console.log(`   ✅ Updated database: template set to 'blank'`);
        console.log(`   📦 Content is now React-compatible\n`);
        updatedCount++;
      } else {
        console.log(`ℹ️  Skipped: ${page.title} (No changes needed)\n`);
      }
    }

    console.log(`\n========================================`);
    console.log(`✅ Conversion Complete!`);
    console.log(`========================================`);
    console.log(`Total pages updated: ${updatedCount}`);
    console.log(`Pages unchanged: ${pages.length - updatedCount}`);
    console.log(`\n📝 What Changed:`);
    console.log(`   ✓ Removed <!DOCTYPE>, <html>, <head>, <body> tags`);
    console.log(`   ✓ Extracted only content sections`);
    console.log(`   ✓ Set template to 'blank' (React-compatible)`);
    console.log(`   ✓ Removed redundant Tailwind CDN scripts`);
    console.log(`   ✓ Updated responsive container classes`);
    console.log(`\n✨ Pages will now:`);
    console.log(`   • Render properly within React app layout`);
    console.log(`   • Work with or without header/footer`);
    console.log(`   • Use app's existing Tailwind configuration`);
    console.log(`   • Maintain full responsive design`);
    console.log(`========================================\n`);
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

fixPageStructure();
