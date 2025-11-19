const cron = require("node-cron");
const { Op } = require("sequelize");
const BlogPost = require("../models/BlogPost");

// Run every minute to check for posts that should be published
const schedulePostPublisher = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      // Find all scheduled posts where scheduled_at is now or in the past
      const postsToPublish = await BlogPost.findAll({
        where: {
          publish_status: "scheduled",
          scheduled_at: {
            [Op.lte]: now,
          },
          is_published: false,
        },
      });

      if (postsToPublish.length > 0) {
        console.log(
          `📅 Publishing ${postsToPublish.length} scheduled post(s)...`
        );

        for (const post of postsToPublish) {
          await post.update({
            is_published: true,
            published_at: new Date(),
            publish_status: "published",
          });
          console.log(`✅ Published: "${post.title}"`);
        }
      }
    } catch (error) {
      console.error("Scheduler error:", error);
    }
  });

  console.log("📅 Post scheduler started - checking every minute");
};

module.exports = { schedulePostPublisher };
