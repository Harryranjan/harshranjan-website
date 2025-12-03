const { sequelize } = require("./config/database");
const BlogPost = require("./models/BlogPost");

async function checkBlogPosts() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    const allPosts = await BlogPost.findAll();
    console.log(`\n📊 Total blog posts in database: ${allPosts.length}`);

    const publishedPosts = await BlogPost.findAll({
      where: { is_published: true },
    });
    console.log(`📊 Published blog posts: ${publishedPosts.length}`);

    if (publishedPosts.length > 0) {
      console.log("\n📝 Published Posts:\n");
      publishedPosts.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`);
        console.log(`   - ID: ${post.id}`);
        console.log(`   - Slug: ${post.slug}`);
        console.log(`   - Featured Image: ${post.featured_image || "NONE"}`);
        console.log(`   - Category: ${JSON.stringify(post.category)}`);
        console.log(`   - Published: ${post.is_published}`);
        console.log(`   - Published At: ${post.published_at}`);
        console.log("");
      });
    } else {
      console.log("\n⚠️  NO PUBLISHED BLOG POSTS FOUND!\n");
      console.log("💡 To fix this, you need to:");
      console.log("   1. Go to http://localhost:5173/admin/blog");
      console.log("   2. Create new blog posts or publish existing drafts");
      console.log("   3. Make sure to:");
      console.log("      - Set a title and content");
      console.log("      - Add a featured image URL");
      console.log("      - Select a category");
      console.log('      - Click "Publish" button\n');

      if (allPosts.length > 0) {
        console.log(
          `📋 You have ${allPosts.length} draft post(s) that can be published:\n`
        );
        allPosts.forEach((post, index) => {
          console.log(
            `${index + 1}. ${post.title} (ID: ${post.id}) - Status: ${
              post.publish_status || "draft"
            }`
          );
        });
      }
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

checkBlogPosts();
