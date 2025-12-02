const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function checkPageAPI() {
  let connection;
  try {
    console.log("🔍 Checking ultra-modern homepage via API...");
    connection = await mysql.createConnection(dbConfig);

    // Get the page data
    const [rows] = await connection.execute(
      'SELECT * FROM pages WHERE slug = ? AND status = "published"',
      ["homepage-2025"]
    );

    if (rows.length === 0) {
      console.log("❌ Page not found or not published");
      return;
    }

    const page = rows[0];
    console.log("\n📄 PAGE INFO:");
    console.log(`Title: ${page.title}`);
    console.log(`Slug: ${page.slug}`);
    console.log(`Template: ${page.template}`);
    console.log(`Status: ${page.status}`);
    console.log(`Hide Title: ${page.hide_title}`);
    console.log(`Created: ${page.created_at}`);
    console.log(`Updated: ${page.updated_at}`);

    console.log("\n🌐 META DATA:");
    console.log(`Meta Title: ${page.meta_title}`);
    console.log(`Meta Description: ${page.meta_description}`);
    console.log(`Meta Keywords: ${page.meta_keywords}`);

    console.log("\n📝 CONTENT ANALYSIS:");
    const content = page.content;
    console.log(`Content Length: ${content.length} characters`);

    // Check for key elements
    const checks = [
      { name: "HTML DOCTYPE", pattern: /<!DOCTYPE html>/i },
      { name: "Three.js Library", pattern: /three\.min\.js/ },
      { name: "GSAP Library", pattern: /gsap\.min\.js/ },
      { name: "Tailwind CSS", pattern: /tailwindcss/ },
      { name: "Custom Cursor", pattern: /cursor/ },
      { name: "Glassmorphism", pattern: /backdrop-filter/ },
      { name: "Gradient Animations", pattern: /gradient-mesh/ },
      { name: "Interactive Cards", pattern: /interactive-card/ },
      { name: "JavaScript Scripts", pattern: /<script>.*<\/script>/s },
      { name: "CSS Animations", pattern: /@keyframes/ },
      { name: "Fluid Typography", pattern: /fluid-text/ },
      { name: "Magnetic Effects", pattern: /magnetic/ },
      { name: "Navigation Bar", pattern: /<nav/ },
      {
        name: "Hero Section",
        pattern: /DIGITAL.*EXPERIENCES.*BEYOND REALITY/s,
      },
      { name: "CTA Buttons", pattern: /Let's Create/ },
      { name: "Services Grid", pattern: /AI-Powered Web Apps/ },
      { name: "Footer", pattern: /<footer/ },
    ];

    console.log("\n✅ ELEMENT CHECK:");
    checks.forEach((check) => {
      const found = check.pattern.test(content);
      console.log(
        `${found ? "✅" : "❌"} ${check.name}: ${found ? "Found" : "Missing"}`
      );
    });

    // Check content structure
    console.log("\n🏗️ CONTENT STRUCTURE:");
    const headStart = content.indexOf("<head>");
    const headEnd = content.indexOf("</head>");
    const bodyStart = content.indexOf("<body>");
    const bodyEnd = content.indexOf("</body>");

    console.log(
      `Head Section: ${
        headStart !== -1 && headEnd !== -1 ? "Present" : "Missing"
      }`
    );
    console.log(
      `Body Section: ${
        bodyStart !== -1 && bodyEnd !== -1 ? "Present" : "Missing"
      }`
    );

    if (headStart !== -1 && headEnd !== -1) {
      const headContent = content.substring(headStart, headEnd + 7);
      console.log(`Head Length: ${headContent.length} characters`);
    }

    if (bodyStart !== -1 && bodyEnd !== -1) {
      const bodyContent = content.substring(bodyStart, bodyEnd + 7);
      console.log(`Body Length: ${bodyContent.length} characters`);
    }

    // Check for potential issues
    console.log("\n🔧 POTENTIAL ISSUES:");
    const issues = [];

    if (!content.includes("<!DOCTYPE html>")) {
      issues.push("Missing DOCTYPE declaration");
    }

    if (!content.includes("<html")) {
      issues.push("Missing HTML tag");
    }

    if (!content.includes('<meta charset="UTF-8">')) {
      issues.push("Missing charset declaration");
    }

    if (content.includes("undefined") || content.includes("null")) {
      issues.push("Contains undefined/null values");
    }

    if (content.length < 1000) {
      issues.push("Content seems too short");
    }

    if (issues.length === 0) {
      console.log("✅ No obvious issues detected");
    } else {
      issues.forEach((issue) => console.log(`⚠️ ${issue}`));
    }

    // Sample content preview
    console.log("\n👀 CONTENT PREVIEW (First 500 chars):");
    console.log("─".repeat(50));
    console.log(content.substring(0, 500));
    console.log("─".repeat(50));

    console.log("\n🔗 Access URL: http://localhost:3000/pages/homepage-2025");
  } catch (error) {
    console.error("❌ Error checking page:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkPageAPI();
