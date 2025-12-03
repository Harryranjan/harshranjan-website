const { sequelize } = require("./config/database");
const BlogPost = require("./models/BlogPost");

const sampleBlogs = [
  {
    title: "10 Proven Strategies to Boost Your Social Media Engagement",
    slug: "10-proven-strategies-boost-social-media-engagement",
    excerpt:
      "Discover the top strategies that successful brands use to increase their social media engagement and build a loyal community.",
    author_id: 1,
    content: `<h2>Introduction</h2>
<p>In today's digital landscape, social media engagement is more crucial than ever. Whether you're a small business owner or a marketing professional, understanding how to connect with your audience can make or break your online presence.</p>

<h2>1. Create Value-Driven Content</h2>
<p>Focus on providing genuine value to your audience. Share tips, insights, and actionable advice that solves their problems.</p>

<h2>2. Use Interactive Content</h2>
<p>Polls, quizzes, and interactive stories generate significantly more engagement than static posts.</p>

<h2>3. Post Consistently</h2>
<p>Maintain a regular posting schedule to keep your audience engaged and coming back for more.</p>

<h2>Conclusion</h2>
<p>Implementing these strategies will help you build a stronger connection with your audience and drive meaningful engagement.</p>`,
    featured_image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
    category: JSON.stringify(["Digital Marketing"]),
    tags: JSON.stringify(["Social Media", "Engagement", "Marketing Strategy"]),
    reading_time: 8,
    is_published: true,
    published_at: new Date(),
    publish_status: "published",
    meta_title: "10 Proven Strategies to Boost Your Social Media Engagement",
    meta_description:
      "Learn the top strategies that successful brands use to increase social media engagement and build a loyal community.",
  },
  {
    title: "The Ultimate Guide to Content Marketing Automation",
    slug: "ultimate-guide-content-marketing-automation",
    excerpt:
      "Learn how to automate your content marketing workflow and save hours while maintaining quality and consistency.",
    author_id: 1,
    content: `<h2>Why Automation Matters</h2>
<p>Content marketing automation can transform your business by streamlining repetitive tasks and allowing you to focus on strategy and creativity.</p>

<h2>Key Automation Tools</h2>
<p>From scheduling posts to email campaigns, the right tools can multiply your marketing effectiveness.</p>

<h2>Best Practices</h2>
<p>Learn how to set up automation workflows that maintain the personal touch your audience expects.</p>

<h2>Getting Started</h2>
<p>Start small with one automation workflow and gradually expand as you see results.</p>`,
    featured_image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    category: JSON.stringify(["Automation"]),
    tags: JSON.stringify([
      "Marketing Automation",
      "Content Strategy",
      "Productivity",
    ]),
    reading_time: 12,
    is_published: true,
    published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    publish_status: "published",
    meta_title: "The Ultimate Guide to Content Marketing Automation",
    meta_description:
      "Discover how to automate your content marketing workflow while maintaining quality.",
  },
  {
    title: "How to Create UGC Campaigns That Convert",
    slug: "create-ugc-campaigns-that-convert",
    excerpt:
      "User-generated content is one of the most powerful marketing tools. Learn how to leverage it effectively for your brand.",
    author_id: 1,
    content: `<h2>The Power of UGC</h2>
<p>User-generated content builds trust, authenticity, and community around your brand. It's social proof at its finest.</p>

<h2>Setting Up Your Campaign</h2>
<p>Learn the essential elements of a successful UGC campaign, from choosing the right platform to setting clear guidelines.</p>

<h2>Encouraging Participation</h2>
<p>Discover proven tactics to motivate your audience to create and share content about your brand.</p>

<h2>Measuring Success</h2>
<p>Track the right metrics to understand your campaign's impact and ROI.</p>`,
    featured_image:
      "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&h=450&fit=crop",
    category: JSON.stringify(["UGC Content"]),
    tags: JSON.stringify([
      "User Generated Content",
      "Brand Marketing",
      "Community Building",
    ]),
    reading_time: 10,
    is_published: true,
    published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    publish_status: "published",
    meta_title: "How to Create UGC Campaigns That Convert",
    meta_description:
      "Learn how to leverage user-generated content to build trust and grow your brand.",
  },
  {
    title: "Campaign Analytics: Measuring What Matters",
    slug: "campaign-analytics-measuring-what-matters",
    excerpt:
      "Stop tracking vanity metrics. Learn which KPIs actually drive business growth and how to measure them effectively.",
    author_id: 1,
    content: `<h2>Beyond Vanity Metrics</h2>
<p>Likes and followers are nice, but they don't pay the bills. Focus on metrics that directly impact your bottom line.</p>

<h2>Essential KPIs to Track</h2>
<p>Conversion rate, customer acquisition cost, lifetime value, and engagement rate are just the beginning.</p>

<h2>Tools and Techniques</h2>
<p>Discover the best analytics tools and how to use them to gain actionable insights.</p>

<h2>Taking Action</h2>
<p>Learn how to turn data into decisions that improve your marketing performance.</p>`,
    featured_image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    category: JSON.stringify(["Campaigns"]),
    tags: JSON.stringify([
      "Analytics",
      "Marketing Metrics",
      "Data-Driven Marketing",
    ]),
    reading_time: 9,
    is_published: true,
    published_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    publish_status: "published",
    meta_title: "Campaign Analytics: Measuring What Matters",
    meta_description:
      "Learn which marketing KPIs actually drive business growth and how to track them.",
  },
  {
    title: "Building a Content Calendar That Works",
    slug: "building-content-calendar-that-works",
    excerpt:
      "A well-planned content calendar is the backbone of successful marketing. Here's how to create one that your team will actually use.",
    author_id: 1,
    content: `<h2>Why You Need a Content Calendar</h2>
<p>Consistent content publication builds audience trust and improves SEO. A content calendar makes consistency achievable.</p>

<h2>Planning Your Content Mix</h2>
<p>Balance promotional, educational, and entertaining content to keep your audience engaged.</p>

<h2>Collaboration and Workflow</h2>
<p>Set up a system that works for your entire team, from ideation to publication.</p>

<h2>Staying Flexible</h2>
<p>Build in room for timely content and trend-jacking opportunities.</p>`,
    featured_image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=450&fit=crop",
    category: JSON.stringify(["Digital Marketing"]),
    tags: JSON.stringify([
      "Content Planning",
      "Marketing Strategy",
      "Productivity",
    ]),
    reading_time: 7,
    is_published: true,
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    publish_status: "published",
    meta_title: "Building a Content Calendar That Works",
    meta_description:
      "Create a content calendar that helps you publish consistently and stay organized.",
  },
];

async function createSampleBlogs() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully\n");

    console.log("🗑️  Deleting existing sample blogs...");
    // Delete any existing blogs with these slugs to avoid duplicates
    const slugs = sampleBlogs.map((blog) => blog.slug);
    await BlogPost.destroy({
      where: {
        slug: slugs,
      },
    });

    console.log("📝 Creating 5 new sample blog posts...\n");

    for (const blog of sampleBlogs) {
      const created = await BlogPost.create(blog);
      console.log(`✅ Created: "${created.title}"`);
      console.log(`   - Category: ${JSON.parse(created.category)[0]}`);
      console.log(`   - Reading Time: ${created.reading_time} min`);
      console.log(`   - Published: ${created.is_published ? "Yes" : "No"}`);
      console.log("");
    }

    // Show summary
    const allPublished = await BlogPost.findAll({
      where: { is_published: true },
      order: [["published_at", "DESC"]],
    });

    console.log("\n📊 SUMMARY");
    console.log("═══════════════════════════════════════════════════════");
    console.log(`Total published blog posts: ${allPublished.length}`);
    console.log("\nLatest 4 posts (as shown on homepage):");
    allPublished.slice(0, 4).forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(
        `   Category: ${JSON.parse(post.category)[0]} | ${
          post.reading_time
        } min read`
      );
    });

    console.log(
      "\n✨ All done! Refresh your homepage to see the new blog posts."
    );
    console.log("🌐 Frontend: http://localhost:5173");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createSampleBlogs();
