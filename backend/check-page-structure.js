const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function checkPageStructure() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n📋 CHECKING PAGE STRUCTURE & TEMPLATES\n");
    console.log("========================================\n");

    const [pages] = await connection.query(
      "SELECT id, title, slug, template, LEFT(content, 200) as content_preview FROM pages ORDER BY menu_order"
    );

    pages.forEach((page, index) => {
      console.log(`${index + 1}. ${page.title}`);
      console.log(`   Slug: ${page.slug}`);
      console.log(`   Template: ${page.template}`);

      // Check for problematic patterns
      const hasDoctype = page.content_preview.includes("<!DOCTYPE");
      const hasHtmlTag = page.content_preview.includes("<html");
      const hasBodyTag = page.content_preview.includes("<body");
      const hasTailwindCDN = page.content_preview.includes("cdn.tailwindcss");

      if (hasDoctype || hasHtmlTag || hasBodyTag) {
        console.log(`   ⚠️  WARNING: Still has full HTML structure!`);
      } else {
        console.log(`   ✅ Clean content (no HTML document tags)`);
      }

      if (hasTailwindCDN) {
        console.log(`   ⚠️  WARNING: Has Tailwind CDN script`);
      }

      console.log(`   Preview: ${page.content_preview.substring(0, 80)}...`);
      console.log("");
    });

    console.log("========================================");

    // Summary
    const [fullHtmlPages] = await connection.query(
      "SELECT COUNT(*) as count FROM pages WHERE content LIKE '%<!DOCTYPE%' OR content LIKE '%<html%'"
    );

    const [blankTemplates] = await connection.query(
      "SELECT COUNT(*) as count FROM pages WHERE template = 'blank'"
    );

    console.log("\n📊 SUMMARY:");
    console.log(`Total Pages: ${pages.length}`);
    console.log(`Blank Template: ${blankTemplates[0].count}`);
    console.log(`Pages with Full HTML Structure: ${fullHtmlPages[0].count}`);

    if (fullHtmlPages[0].count === 0) {
      console.log("\n✅ ALL PAGES ARE PROPERLY FORMATTED!");
      console.log("   • No full HTML document structures");
      console.log("   • Ready for React rendering");
      console.log("   • Will work with site layout\n");
    } else {
      console.log("\n⚠️  SOME PAGES STILL HAVE FULL HTML STRUCTURE");
      console.log("   • These will render in iframe");
      console.log("   • May have layout issues\n");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

checkPageStructure();
