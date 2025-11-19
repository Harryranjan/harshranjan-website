const { BlogPost } = require("../models");

(async () => {
  try {
    const posts = await BlogPost.findAll({
      attributes: ["id", "title", "tags"],
    });

    console.log("Total posts:", posts.length);
    posts.forEach((post) => {
      console.log(`\nPost ${post.id}: ${post.title}`);
      console.log("Tags:", post.tags);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
})();
