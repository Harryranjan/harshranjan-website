const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

// Pages to KEEP (Pain Therapy & Rehab Centre pages)
const pagesToKeep = [
  "home",
  "about-team",
  "spine-back-pain-therapy",
  "joint-pain-arthritis-treatment",
  "neuro-paralysis-rehab",
  "post-operative-rehabilitation",
  "manual-therapy-spinal-manipulation",
  "cupping-acupressure-therapy",
  "conditions-we-treat",
  "testimonials",
  "faq",
  "contact",
  "gallery",
];

async function cleanupOldPages() {
  let connection;
  try {
    console.log("🔌 Connecting to database...");
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database connected successfully!\n");

    // First, get all current pages
    const [allPages] = await connection.execute(
      "SELECT id, title, slug FROM pages ORDER BY id"
    );

    console.log("📄 Current pages in database:");
    console.log("================================");
    allPages.forEach((page) => {
      const keep = pagesToKeep.includes(page.slug) ? "✅ KEEP" : "❌ DELETE";
      console.log(`${keep} - ${page.title} (${page.slug})`);
    });
    console.log("================================\n");

    // Get pages to delete
    const pagesToDelete = allPages.filter(
      (page) => !pagesToKeep.includes(page.slug)
    );

    if (pagesToDelete.length === 0) {
      console.log("✅ No pages to delete. All pages are Pain Therapy pages!");
      return;
    }

    console.log(
      `\n🗑️  Preparing to delete ${pagesToDelete.length} old pages...\n`
    );

    // Delete old pages
    for (const page of pagesToDelete) {
      await connection.execute("DELETE FROM pages WHERE id = ?", [page.id]);
      console.log(`❌ Deleted: ${page.title} (${page.slug})`);
    }

    console.log(`\n✅ Successfully deleted ${pagesToDelete.length} old pages!`);
    console.log(
      `✅ Kept ${pagesToKeep.length} Pain Therapy & Rehab Centre pages.\n`
    );

    // Show remaining pages
    const [remainingPages] = await connection.execute(
      "SELECT id, title, slug, show_in_menu FROM pages ORDER BY menu_order, id"
    );

    console.log("📄 Remaining pages:");
    console.log("================================");
    remainingPages.forEach((page) => {
      const inMenu = page.show_in_menu ? "📌 In Menu" : "   Hidden";
      console.log(`${inMenu} - ${page.title}`);
    });
    console.log("================================\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log("🔌 Database connection closed");
    }
    process.exit(0);
  }
}

cleanupOldPages();
