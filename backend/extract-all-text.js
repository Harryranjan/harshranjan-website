const mysql = require("mysql2/promise");

async function extractAllText() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  try {
    const [pages] = await connection.execute(
      'SELECT slug, title, content FROM pages WHERE status = "published" AND template = "custom" LIMIT 10'
    );

    console.log("\n=== EXTRACTING ALL UNIQUE ENGLISH TEXT ===\n");

    const allText = new Set();

    pages.forEach((page) => {
      const htmlContent = page.content || "";

      // Extract all text between HTML tags
      const text = htmlContent
        .replace(/<script[^>]*>.*?<\/script>/gi, "")
        .replace(/<style[^>]*>.*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, "\n")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/\d+/g, "") // Remove numbers
        .replace(/[^\w\s\-'&,.:;()]/g, " ")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 2 && /[a-zA-Z]/.test(line));

      text.forEach((t) => allText.add(t));
    });

    // Sort by length (longest first)
    const sortedText = Array.from(allText)
      .filter((t) => t.split(" ").length >= 2) // Only phrases with 2+ words
      .sort((a, b) => b.length - a.length)
      .slice(0, 200); // Top 200

    console.log("Found", sortedText.length, "unique phrases:\n");
    sortedText.forEach((text, i) => {
      console.log(`${i + 1}. "${text}"`);
    });
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await connection.end();
  }
}

extractAllText();
