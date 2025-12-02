const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function checkDatabase() {
  let connection;
  try {
    console.log("🔍 Checking database directly...\n");
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database connected!\n");

    // Check all pages
    const [pages] = await connection.execute(
      "SELECT id, title, slug, template, status, LENGTH(content) as content_length FROM pages ORDER BY id DESC LIMIT 10"
    );

    console.log("📊 Recent Pages in Database:");
    console.log("=".repeat(80));
    pages.forEach((page) => {
      console.log(`ID: ${page.id}`);
      console.log(`Title: ${page.title}`);
      console.log(`Slug: ${page.slug}`);
      console.log(`Template: ${page.template}`);
      console.log(`Status: ${page.status}`);
      console.log(`Content Length: ${page.content_length} characters`);
      console.log("-".repeat(80));
    });

    // Check specific page content
    console.log("\n\n🔍 Checking starvy-animated-clone content...\n");
    const [result] = await connection.execute(
      "SELECT id, title, slug, template, status, SUBSTRING(content, 1, 500) as content_preview, LENGTH(content) as content_length FROM pages WHERE slug = ?",
      ["starvy-animated-clone"]
    );

    if (result.length > 0) {
      const page = result[0];
      console.log("✅ Page found!");
      console.log(`ID: ${page.id}`);
      console.log(`Title: ${page.title}`);
      console.log(`Template: ${page.template}`);
      console.log(`Status: ${page.status}`);
      console.log(`Content Length: ${page.content_length} characters`);
      console.log("\n📝 Content Preview:");
      console.log(page.content_preview);
      console.log("...\n");

      // Check for key elements
      const [fullContent] = await connection.execute(
        "SELECT content FROM pages WHERE slug = ?",
        ["starvy-animated-clone"]
      );

      if (fullContent[0]) {
        const content = fullContent[0].content;
        console.log("🔍 Content Analysis:");
        console.log(
          "  Has DOCTYPE:",
          content.includes("<!DOCTYPE html>") ? "✅" : "❌"
        );
        console.log("  Has GSAP:", content.includes("gsap") ? "✅" : "❌");
        console.log("  Has Lenis:", content.includes("lenis") ? "✅" : "❌");
        console.log(
          "  Has Tailwind:",
          content.includes("tailwindcss") ? "✅" : "❌"
        );
        console.log("  Has Styles:", content.includes("<style>") ? "✅" : "❌");
        console.log(
          "  Has Animations:",
          content.includes("animation") ? "✅" : "❌"
        );
      }
    } else {
      console.log("❌ Page not found in database!");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkDatabase();
