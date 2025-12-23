const mysql = require("mysql2/promise");
const fs = require("fs");

async function exportTeamPage() {
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

  fs.writeFileSync("team-page-current.html", rows[0].content);
  console.log("✅ Exported current team page to team-page-current.html");

  // Show positions of both doctors
  const content = rows[0].content;
  const subodhPos = content.indexOf("Dr. Subodh Kumar");
  const jkPos = content.indexOf("Dr. J.K. Tiwari");

  console.log("\nDoctor positions:");
  console.log("Dr. Subodh Kumar at:", subodhPos);
  console.log("Dr. J.K. Tiwari at:", jkPos);

  // Show context around J.K. Tiwari
  if (jkPos !== -1) {
    console.log("\n=== Context around Dr. J.K. Tiwari ===");
    console.log(content.substring(jkPos - 300, jkPos + 500));
  }

  await connection.end();
}

exportTeamPage().catch(console.error);
