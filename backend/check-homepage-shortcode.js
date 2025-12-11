require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

(async () => {
  try {
    console.log("🔍 Checking homepage for shortcodes...\n");

    // Check for homepage
    const [pages] = await sequelize.query(`
      SELECT id, title, slug, content, status 
      FROM pages 
      WHERE slug = 'homepage' OR is_homepage = 1 
      LIMIT 1
    `);

    if (pages.length === 0) {
      console.log("❌ No homepage found in database");
      console.log('\n💡 Tip: The route "/" is using static Home.jsx component');
      console.log(
        "   To use dynamic pages with shortcodes, access via /pages/homepage"
      );
      await sequelize.close();
      process.exit(0);
    }

    const page = pages[0];
    console.log("✅ Homepage found:");
    console.log("   ID:", page.id);
    console.log("   Title:", page.title);
    console.log("   Slug:", page.slug);
    console.log("   Status:", page.status);
    console.log("\n📄 Content (first 500 characters):");
    console.log(page.content ? page.content.substring(0, 500) + "..." : "NULL");

    // Check for shortcodes
    const hasFormShortcode = page.content && page.content.includes("[form");
    const hasModalShortcode = page.content && page.content.includes("[modal");
    const hasPopupShortcode = page.content && page.content.includes("[popup");
    const hasCTAShortcode =
      page.content && page.content.includes("[cta_banner");

    console.log("\n🔍 Shortcode Detection:");
    console.log(
      "   [form] shortcode:",
      hasFormShortcode ? "✅ FOUND" : "❌ Not found"
    );
    console.log(
      "   [modal] shortcode:",
      hasModalShortcode ? "✅ FOUND" : "❌ Not found"
    );
    console.log(
      "   [popup] shortcode:",
      hasPopupShortcode ? "✅ FOUND" : "❌ Not found"
    );
    console.log(
      "   [cta_banner] shortcode:",
      hasCTAShortcode ? "✅ FOUND" : "❌ Not found"
    );

    if (hasFormShortcode) {
      const formMatches = page.content.match(/\[form\s+id=["'](\d+)["']\]/g);
      console.log("\n📝 Form shortcodes found:");
      formMatches.forEach((match) => console.log("   -", match));
    }

    console.log("\n🌐 Access URLs:");
    console.log("   Frontend: http://localhost:5173/pages/" + page.slug);
    console.log("   API: http://localhost:3000/api/pages/slug/" + page.slug);

    await sequelize.close();
  } catch (error) {
    console.error("❌ Error:", error.message);
    await sequelize.close();
  }

  process.exit(0);
})();
