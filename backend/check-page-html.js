const mysql = require("mysql2/promise");

async function checkPageHTML() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  try {
    const [pages] = await connection.execute(
      'SELECT slug, title, content FROM pages WHERE status = "published" AND template = "custom" LIMIT 5'
    );

    console.log("\n=== DATABASE PAGE CONTENT ===\n");

    pages.forEach((page) => {
      console.log(`\n📄 Page: ${page.title} (${page.slug})`);
      console.log("─".repeat(80));

      const htmlContent = page.content || "No content";

      // Extract all text content (remove HTML tags but keep structure)
      const textOnly = htmlContent
        .replace(/<script[^>]*>.*?<\/script>/gi, "")
        .replace(/<style[^>]*>.*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, "\n")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, " ")
        .trim();

      console.log("\n📝 Full Text Content:");
      console.log(textOnly);
      console.log("\n" + "=".repeat(80) + "\n");
    });
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await connection.end();
  }
}

checkPageHTML();
