const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function updateDoctorImage() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🖼️  Updating Doctor Image Path...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // Replace the image path in About section
    content = content.replace(
      "/images/transform_any_image_with_ai_for_free.png",
      "/images/transform_any_image_with_ai_for_free_t53lvoea0zh2ahgjvshw.png"
    );

    // Update the database
    await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
      content,
      "home",
    ]);

    console.log("✅ Doctor image updated successfully!");
    console.log(
      "   - New path: /images/transform_any_image_with_ai_for_free_t53lvoea0zh2ahgjvshw.png"
    );
  } catch (error) {
    console.error("❌ Error updating image:", error.message);
  } finally {
    await connection.end();
  }
}

updateDoctorImage();
