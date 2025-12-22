const mysql = require("mysql2/promise");

async function centerAlignServicePages() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  const servicePages = [
    "spine-back-pain-therapy",
    "joint-pain-arthritis-treatment",
    "neuro-paralysis-rehab",
    "post-operative-rehabilitation",
    "manual-therapy-spinal-manipulation",
    "cupping-acupressure-therapy",
  ];

  for (const slug of servicePages) {
    const [rows] = await connection.execute(
      "SELECT content FROM pages WHERE slug = ?",
      [slug]
    );

    if (rows.length > 0) {
      let content = rows[0].content;

      // Find and replace hero section - change from left-aligned to center-aligned
      // Pattern 1: Look for hero sections with left alignment
      content = content.replace(
        /(<section[^>]*class="[^"]*)(bg-gradient-to-r[^"]*"[^>]*>[\s\S]*?<div[^>]*class="[^"]*container[^"]*"[^>]*>)/gi,
        (match, p1, p2) => {
          // Add text-center to the container div
          const updated = p2.replace(/class="([^"]*)"/i, (m, classes) => {
            if (!classes.includes("text-center")) {
              return `class="${classes} text-center"`;
            }
            return m;
          });
          return p1 + updated;
        }
      );

      // Pattern 2: Remove any text-left classes
      content = content.replace(/text-left/g, "text-center");

      // Pattern 3: Update breadcrumb to center
      content = content.replace(
        /(<div[^>]*class="[^"]*breadcrumb[^"]*"[^>]*>)/gi,
        (match) => {
          if (!match.includes("text-center")) {
            return match.replace(/class="([^"]*)"/, 'class="$1 text-center"');
          }
          return match;
        }
      );

      // Pattern 4: Center align headings in hero sections
      content = content.replace(
        /(<h1[^>]*class="[^"]*)(text-\d+xl[^"]*"[^>]*>)/gi,
        (match, p1, p2) => {
          if (!p1.includes("text-center")) {
            return p1.replace(/class="([^"]*)"/, 'class="$1 text-center"') + p2;
          }
          return match;
        }
      );

      await connection.execute(
        "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
        [content, slug]
      );

      console.log(`✅ Updated: ${slug}`);
    }
  }

  console.log("\n✅ All service pages updated to center alignment!");
  await connection.end();
}

centerAlignServicePages().catch(console.error);
