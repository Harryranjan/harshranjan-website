const mysql = require("mysql2/promise");

async function checkTeamPage() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  const [rows] = await connection.execute(
    "SELECT content FROM pages WHERE slug = ?",
    ["about-team"]
  );

  if (rows.length === 0) {
    console.log("❌ Page not found");
    await connection.end();
    return;
  }

  const content = rows[0].content;

  console.log("=== TEAM PAGE CONTENT ===");
  console.log("Total length:", content.length);
  console.log("\n=== Checking for doctors ===");
  console.log("Dr. Subodh Kumar found:", content.includes("Dr. Subodh Kumar"));
  console.log("Dr. J.K. Tiwari found:", content.includes("Dr. J.K. Tiwari"));

  // Show what's actually there
  const headingMatches = content.match(/<h2[^>]*>Dr\.[^<]+<\/h2>/g);
  if (headingMatches) {
    console.log("\n=== Doctor headings found ===");
    headingMatches.forEach((match, i) => {
      console.log(`${i + 1}. ${match}`);
    });
  }

  await connection.end();
}

checkTeamPage().catch(console.error);
