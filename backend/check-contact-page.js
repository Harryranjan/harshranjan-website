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
    const [pages] = await sequelize.query(`
      SELECT id, title, slug, template, content 
      FROM pages 
      WHERE slug = 'contact'
    `);

    if (pages.length > 0) {
      const p = pages[0];
      console.log("\n📄 Contact Page Details:\n");
      console.log("ID:", p.id);
      console.log("Title:", p.title);
      console.log("Template:", p.template || "(empty/null)");
      console.log("\nContent (first 200 chars):");
      console.log(p.content ? p.content.substring(0, 200) : "NULL");
      console.log(
        "\nIs Full HTML?",
        p.content && p.content.trim().toLowerCase().startsWith("<!doctype html")
          ? "✅ YES (iframe mode)"
          : "❌ NO"
      );
      console.log(
        "Has [form shortcode?",
        p.content && p.content.includes("[form") ? "✅ YES" : "❌ NO"
      );

      if (p.content && p.content.includes("[form")) {
        const matches = p.content.match(/\[form[^\]]+\]/g);
        console.log("\nFound shortcodes:");
        matches.forEach((m) => console.log("  -", m));
      }
    } else {
      console.log("❌ Contact page not found");
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    await sequelize.close();
    process.exit(1);
  }
})();
