const { sequelize } = require("../config/database");
const { BlogPost } = require("../models");

async function migrateCategoryToArray() {
  try {
    console.log("Starting migration: Converting category column to TEXT...");

    // Change column type from VARCHAR(100) to TEXT
    await sequelize.query(`
      ALTER TABLE blog_posts 
      MODIFY COLUMN category TEXT;
    `);

    console.log("✓ Column type changed to TEXT");

    // Get all posts
    const posts = await sequelize.query(
      'SELECT id, category FROM blog_posts WHERE category IS NOT NULL AND category != ""',
      { type: sequelize.QueryTypes.SELECT }
    );

    console.log(`Found ${posts.length} posts with categories to migrate`);

    // Convert each category string to JSON array
    for (const post of posts) {
      try {
        // Check if already JSON
        let categoryArray;
        try {
          categoryArray = JSON.parse(post.category);
          if (!Array.isArray(categoryArray)) {
            categoryArray = [post.category];
          }
        } catch {
          // Not JSON, convert string to array
          categoryArray = [post.category];
        }

        await sequelize.query(
          "UPDATE blog_posts SET category = ? WHERE id = ?",
          {
            replacements: [JSON.stringify(categoryArray), post.id],
            type: sequelize.QueryTypes.UPDATE,
          }
        );

        console.log(
          `✓ Migrated post ${post.id}: ${post.category} -> ${JSON.stringify(
            categoryArray
          )}`
        );
      } catch (error) {
        console.error(`✗ Error migrating post ${post.id}:`, error.message);
      }
    }

    console.log("\n✓ Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrateCategoryToArray();
