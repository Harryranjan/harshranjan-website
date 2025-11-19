const { Tag } = require("../models");

(async () => {
  try {
    const tags = await Tag.findAll();
    console.log("Total tags:", tags.length);
    console.log("Tags:", JSON.stringify(tags, null, 2));

    const popularTags = await Tag.findAll({
      where: {
        usage_count: { [require("sequelize").Op.gt]: 0 },
      },
      order: [["usage_count", "DESC"]],
      limit: 10,
    });
    console.log("\nPopular tags (usage_count > 0):", popularTags.length);
    console.log("Popular:", JSON.stringify(popularTags, null, 2));

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
})();
