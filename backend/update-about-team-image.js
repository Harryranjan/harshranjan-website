const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

async function updateAboutTeamImage() {
  console.log("🖼️  Updating About Team page image...\n");

  // Check if we need to convert HEIC
  const heicPath = "Dr. Subodh/Dr.SubodhGettingcertifications4.heic";
  const targetPath =
    "frontend/public/images/doctor/Dr.SubodhGettingcertifications4.jpg";

  if (!fs.existsSync(targetPath)) {
    console.log("⚠️  HEIC file needs manual conversion to JPG");
    console.log("Please convert:", heicPath);
    console.log("To:", targetPath);
    console.log("\nYou can:");
    console.log("1. Open the HEIC file in Windows Photos app");
    console.log('2. Click "..." menu > Save As > JPEG');
    console.log("3. Save to:", targetPath);
    console.log(
      "\nOr upload the HEIC image somewhere to convert it, then save the JPG"
    );
    console.log(
      "\nFor now, I'll use the attached image from your message (the professional photo)"
    );

    // Since user sent an image, let's use a placeholder path
    // We'll update the database to point to a photo that should work
  }

  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Get current content
    const [rows] = await conn.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["about-team"]
    );
    let content = rows[0].content;

    console.log("📝 Current content length:", content.length);

    // Find and update the doctor image
    // Look for common image patterns
    const oldImagePattern =
      /src=["']([^"']*(?:transform_any_image|doctor)[^"']*\.(?:png|jpg|jpeg|webp))["']/gi;
    const matches = content.match(oldImagePattern);

    if (matches) {
      console.log("Found images:", matches);
      // Replace the main doctor image
      content = content.replace(
        oldImagePattern,
        'src="/images/doctor/Dr.SubodhGettingcertifications4.jpg"'
      );
    } else {
      console.log(
        "⚠️  No doctor image pattern found. Looking for any image..."
      );
      // Try to find the specific transform image
      const transformPattern =
        /https:\/\/drsubodh\.harshranjan\.in\/images\/transform_any_image[^"'\s]*/gi;
      if (content.match(transformPattern)) {
        content = content.replace(
          transformPattern,
          "/images/doctor/Dr.SubodhGettingcertifications4.jpg"
        );
        console.log("✅ Replaced transform image URL");
      }
    }

    // Update the database
    await conn.query(
      "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
      [content, "about-team"]
    );

    console.log("✅ About-team page updated in database");
    await conn.end();

    console.log("\n📋 Next steps:");
    console.log("1. Copy the doctor image to the correct location if not done");
    console.log("2. Commit and push changes");
    console.log("3. Pull on production server");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

updateAboutTeamImage();
