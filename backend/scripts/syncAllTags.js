const { Tag, BlogPost } = require("../models");

const syncAllTags = async () => {
  try {
    // Get all posts
    const posts = await BlogPost.findAll({
      attributes: ["tags"],
    });

    // Collect all unique tag names from posts
    const allTagNames = new Set();
    posts.forEach((post) => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach((tag) => allTagNames.add(tag));
      }
    });

    console.log("Unique tags in posts:", Array.from(allTagNames));

    // For each unique tag name, create or update tag with usage count
    for (const tagName of allTagNames) {
      const slug = tagName
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .trim();

      // Count how many posts use this tag
      const postsWithTag = await BlogPost.findAll({
        where: {
          tags: {
            [require("sequelize").Op.like]: `%"${tagName}"%`,
          },
        },
      });

      const usageCount = postsWithTag.length;

      // Find or create tag
      let tag = await Tag.findOne({ where: { slug } });
      if (!tag) {
        tag = await Tag.create({
          name: tagName,
          slug,
          color: "#10B981",
          usage_count: usageCount,
        });
        console.log(`Created tag: ${tagName} (usage: ${usageCount})`);
      } else {
        tag.usage_count = usageCount;
        tag.name = tagName; // Update name in case it changed
        await tag.save();
        console.log(`Updated tag: ${tagName} (usage: ${usageCount})`);
      }
    }

    // Also update existing tags that might have 0 usage
    const allTags = await Tag.findAll();
    for (const tag of allTags) {
      const postsWithTag = await BlogPost.findAll({
        where: {
          tags: {
            [require("sequelize").Op.like]: `%"${tag.name}"%`,
          },
        },
      });

      tag.usage_count = postsWithTag.length;
      await tag.save();
      console.log(`Verified tag: ${tag.name} (usage: ${tag.usage_count})`);
    }

    console.log("\n✅ Tag sync completed!");

    // Show popular tags
    const popularTags = await Tag.findAll({
      where: {
        usage_count: { [require("sequelize").Op.gt]: 0 },
      },
      order: [["usage_count", "DESC"]],
      limit: 10,
    });

    console.log("\nPopular tags:");
    popularTags.forEach((tag) => {
      console.log(`  - ${tag.name}: ${tag.usage_count} posts`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

syncAllTags();
