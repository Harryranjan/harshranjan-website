const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function enhanceParagraph() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n📝 Enhancing About Paragraph...\n");

    const oldParagraph =
      "Dr. Subodh Kumar is a highly qualified pain management specialist with over 7 years of clinical experience in treating chronic pain, neurological disorders, and post-operative rehabilitation. His approach combines traditional acupuncture with modern medicine to deliver comprehensive, patient-centered care.";

    const newParagraph =
      "Dr. Subodh Kumar is a highly qualified pain management specialist with over 7 years of clinical experience in treating chronic pain, neurological disorders, and post-operative rehabilitation. His approach combines traditional acupuncture with modern physiotherapy techniques to deliver comprehensive, patient-centered care. Specializing in non-invasive pain relief methods, Dr. Kumar has successfully treated hundreds of patients suffering from back pain, arthritis, sports injuries, and nerve-related conditions. His holistic treatment philosophy focuses on identifying root causes rather than just managing symptoms, ensuring long-term relief and improved quality of life. With advanced training in traditional Chinese medicine and modern rehabilitation protocols, he provides personalized treatment plans tailored to each patient's unique needs and recovery goals.";

    const [result] = await connection.query(
      "UPDATE pages SET content = REPLACE(content, ?, ?) WHERE slug = ?",
      [oldParagraph, newParagraph, "home"]
    );

    console.log("========================================");
    console.log("✅ PARAGRAPH ENHANCED!");
    console.log("========================================\n");

    console.log("📝 Content Added:\n");
    console.log("  ✓ Non-invasive pain relief specialization");
    console.log(
      "  ✓ Specific conditions: back pain, arthritis, sports injuries"
    );
    console.log("  ✓ Holistic philosophy (root causes vs symptoms)");
    console.log("  ✓ Advanced training in Chinese medicine");
    console.log("  ✓ Modern rehabilitation protocols");
    console.log("  ✓ Personalized treatment plans\n");

    console.log("Length:");
    console.log("  • Before: 2 sentences (~55 words)");
    console.log("  • After: 5 sentences (~130 words)\n");

    console.log("========================================");
    console.log(`Rows updated: ${result.affectedRows} 🎯`);
    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

enhanceParagraph();
