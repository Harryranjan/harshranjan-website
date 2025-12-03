const { sequelize } = require("./config/database");
const BlogPost = require("./models/BlogPost");

// Simple HTML entity decoder for our specific case
function decodeHtmlEntities(text) {
  return text
    .replace(/&#x2F;/g, "/")
    .replace(/&#x5C;/g, "\\")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fixEncodedUrls() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected\n");

    const posts = await BlogPost.findAll();
    console.log(`📊 Found ${posts.length} blog posts\n`);

    let fixedCount = 0;

    for (const post of posts) {
      if (post.featured_image && post.featured_image.includes("&#x")) {
        const oldUrl = post.featured_image;
        // Decode HTML entities
        const decodedUrl = decodeHtmlEntities(oldUrl);

        console.log(`🔧 Fixing post ID ${post.id}: "${post.title}"`);
        console.log(`   Old: ${oldUrl}`);
        console.log(`   New: ${decodedUrl}`);

        post.featured_image = decodedUrl;
        await post.save();
        fixedCount++;
        console.log("   ✅ Fixed\n");
      }
    }

    if (fixedCount === 0) {
      console.log("✨ No encoded URLs found. All blog images are fine!");
    } else {
      console.log(`\n✅ Fixed ${fixedCount} blog post(s) with encoded URLs`);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

fixEncodedUrls();
