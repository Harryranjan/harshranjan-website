const mysql = require("mysql2/promise");

async function checkContent() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  const [rows] = await conn.execute(
    "SELECT content FROM pages WHERE slug = ? LIMIT 1",
    ["neuro-paralysis-rehab"]
  );

  if (rows[0]) {
    const content = rows[0].content;
    console.log("First 3000 characters of content:");
    console.log(content.substring(0, 3000));

    // Check for white color styles
    const whiteColorMatches = content.match(
      /color:\s*(white|#fff|#ffffff|rgb\(255,\s*255,\s*255\))/gi
    );
    if (whiteColorMatches) {
      console.log("\n\n⚠️ Found WHITE COLOR styles:");
      console.log(whiteColorMatches);
    }
  }

  await conn.end();
}

checkContent().catch(console.error);
