const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function updateTemplateEnum() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🔧 Updating Template Options...\n");

    // Add 'blank' and 'custom_html' to template enum
    await connection.query(`
      ALTER TABLE pages 
      MODIFY COLUMN template ENUM('default','about','services','contact','custom','blank','custom_html') 
      DEFAULT 'default'
    `);
    console.log("✅ Added 'blank' and 'custom_html' to template options");

    // Update all Pain Therapy pages to 'custom' template
    // (custom template means it renders the content as-is without extra wrapper)
    const [result] = await connection.query(`
      UPDATE pages 
      SET template = 'custom' 
      WHERE slug IN (
        'home', 'about-team', 'spine-back-pain-therapy', 
        'joint-pain-arthritis-treatment', 'neuro-paralysis-rehab',
        'post-operative-rehabilitation', 'manual-therapy-spinal-manipulation',
        'cupping-acupressure-therapy', 'conditions-we-treat',
        'testimonials', 'faq', 'contact', 'gallery'
      )
    `);

    console.log(
      `✅ Updated ${result.affectedRows} pages to 'custom' template\n`
    );

    // Verify
    const [pages] = await connection.query(`
      SELECT id, title, template 
      FROM pages 
      ORDER BY menu_order
    `);

    console.log("📋 Current Page Templates:");
    console.log("========================\n");
    pages.forEach((page, index) => {
      console.log(`${index + 1}. ${page.title}`);
      console.log(`   Template: ${page.template}\n`);
    });

    console.log("========================================");
    console.log("✅ Template Update Complete!");
    console.log("========================================");
    console.log("\n💡 What this means:");
    console.log("   • 'custom' template = content renders as-is");
    console.log("   • No extra wrappers or containers");
    console.log("   • Works with React app layout");
    console.log("   • Proper responsive behavior\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await connection.end();
  }
}

updateTemplateEnum();
