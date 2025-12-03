const { sequelize } = require("./config/database");
const Menu = require("./models/Menu");

async function createComprehensiveFooter() {
  try {
    console.log("Connecting to database...");

    // Comprehensive footer configuration
    const footerData = {
      name: "Comprehensive Professional Footer 2025",
      location: "footer",
      description:
        "Professional footer with company info, services, resources, and social links",
      is_active: true,
      settings: {
        type: "footer-builder",
        layout: "4-column",
        columns: [
          {
            id: 1,
            title: "Harsh Ranjan Digital",
            content: "text",
            items: [
              { label: "About Us", url: "/about" },
              { label: "Our Story", url: "/about#story" },
              { label: "Team", url: "/about#team" },
              { label: "Careers", url: "/careers" },
              { label: "Contact", url: "/contact" },
              { label: "Blog", url: "/blog" },
            ],
          },
          {
            id: 2,
            title: "Services",
            content: "text",
            items: [
              { label: "UGC Content Creation", url: "/services/ugc" },
              { label: "Marketing Automation", url: "/services/automation" },
              { label: "Campaign Management", url: "/services/campaigns" },
              {
                label: "Social Media Marketing",
                url: "/services/social-media",
              },
              { label: "Content Strategy", url: "/services/strategy" },
              { label: "Analytics & Reporting", url: "/services/analytics" },
            ],
          },
          {
            id: 3,
            title: "Resources",
            content: "text",
            items: [
              { label: "Blog & Insights", url: "/blog" },
              { label: "Case Studies", url: "/case-studies" },
              { label: "Portfolio", url: "/portfolio" },
              { label: "Free Tools", url: "/tools" },
              { label: "Documentation", url: "/docs" },
              { label: "FAQ", url: "/faq" },
              { label: "Support Center", url: "/support" },
            ],
          },
          {
            id: 4,
            title: "Connect With Us",
            content: "social",
            items: [],
          },
        ],
        copyright: {
          enabled: true,
          text: "© 2025 Harsh Ranjan Digital. All rights reserved. | Empowering brands through innovative digital marketing solutions.",
        },
        socialIcons: {
          enabled: true,
          icons: [
            {
              name: "LinkedIn",
              url: "https://linkedin.com/in/harshranjan",
              icon: "LI",
            },
            {
              name: "Twitter",
              url: "https://twitter.com/harshranjan",
              icon: "TW",
            },
            {
              name: "Facebook",
              url: "https://facebook.com/harshranjan",
              icon: "FB",
            },
            {
              name: "Instagram",
              url: "https://instagram.com/harshranjan",
              icon: "IG",
            },
            {
              name: "YouTube",
              url: "https://youtube.com/@harshranjan",
              icon: "YT",
            },
            {
              name: "GitHub",
              url: "https://github.com/harryranjan",
              icon: "GH",
            },
          ],
        },
        newsletter: {
          enabled: true,
          title: "Subscribe to Our Newsletter",
          subtitle:
            "Get the latest insights, tips, and strategies delivered to your inbox",
          placeholder: "Enter your email address",
          buttonText: "Subscribe",
        },
        contactInfo: {
          enabled: true,
          email: "hello@harshranjan.com",
          phone: "+1 (555) 123-4567",
          address: "123 Digital Avenue, Innovation District",
        },
        styles: {
          backgroundColor: "#0F172A",
          textColor: "#FFFFFF",
          linkColor: "#9CA3AF",
          linkHoverColor: "#8B5CF6",
          borderColor: "#374151",
          accentColor: "#8B5CF6",
        },
        customCode: "",
      },
    };

    // Create the footer
    const footer = await Menu.create(footerData);

    console.log("\n✅ Comprehensive footer created successfully!");
    console.log(`Footer ID: ${footer.id}`);
    console.log(`Footer Name: ${footer.name}`);
    console.log(`Active: ${footer.is_active}`);
    console.log(`\nFooter Features:`);
    console.log(`- 4-column layout with brand colors`);
    console.log(`- Company info: Harsh Ranjan Digital (6 links)`);
    console.log(`- Services: 6 service offerings`);
    console.log(`- Resources: 7 helpful links`);
    console.log(
      `- Social Media: 6 platforms (LinkedIn, Twitter, Facebook, Instagram, YouTube, GitHub)`
    );
    console.log(`- Newsletter subscription section enabled`);
    console.log(`- Contact info: email and phone`);
    console.log(`- Professional copyright notice`);
    console.log(`- Navy background (#0F172A) with purple accent (#8B5CF6)`);
    console.log(`\nTo use this footer:`);
    console.log(`1. Go to Admin Panel > Menus/Footer`);
    console.log(`2. Find "Comprehensive Professional Footer 2025"`);
    console.log(`3. It's already set to active!`);
  } catch (error) {
    console.error("Error creating footer:", error);
    process.exit(1);
  }
}

createComprehensiveFooter();
