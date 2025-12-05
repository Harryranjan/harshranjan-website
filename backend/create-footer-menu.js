const mysql = require("mysql2/promise");
require("dotenv").config();

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    });

    console.log("Creating new footer menu...\n");

    // Create the footer menu
    const [menuResult] = await conn.query(
      `INSERT INTO menus (name, location, description, is_active, created_at, updated_at) 
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [
        "Pain Therapy Footer Menu",
        "footer",
        "Main footer navigation for Pain Therapy Centre",
        1,
      ]
    );

    const menuId = menuResult.insertId;
    console.log(`✓ Footer menu created with ID: ${menuId}\n`);

    // Create footer menu items
    const footerItems = [
      // Pain Therapy Centre section
      {
        parent_id: null,
        title: "Pain Therapy Centre",
        url: "#",
        type: "custom",
        order: 1,
      },
      {
        parent_id: "PARENT_1",
        title: "About Us",
        url: "/pages/home",
        type: "page",
        order: 1,
      },
      {
        parent_id: "PARENT_1",
        title: "Our Story",
        url: "/pages/about-team",
        type: "page",
        order: 2,
      },
      {
        parent_id: "PARENT_1",
        title: "Team",
        url: "/pages/about-team",
        type: "page",
        order: 3,
      },
      {
        parent_id: "PARENT_1",
        title: "Careers",
        url: "/pages/gallery",
        type: "page",
        order: 4,
      },
      {
        parent_id: "PARENT_1",
        title: "Contact",
        url: "/pages/contact",
        type: "page",
        order: 5,
      },
      {
        parent_id: "PARENT_1",
        title: "Blog",
        url: "/pages/testimonials",
        type: "page",
        order: 6,
      },

      // Services section
      {
        parent_id: null,
        title: "Services",
        url: "#",
        type: "custom",
        order: 2,
      },
      {
        parent_id: "PARENT_2",
        title: "Spine & Back Pain",
        url: "/pages/spine-back-pain-therapy",
        type: "page",
        order: 1,
      },
      {
        parent_id: "PARENT_2",
        title: "Joint Pain & Arthritis",
        url: "/pages/joint-pain-arthritis-treatment",
        type: "page",
        order: 2,
      },
      {
        parent_id: "PARENT_2",
        title: "Neuro Rehabilitation",
        url: "/pages/neuro-paralysis-rehab",
        type: "page",
        order: 3,
      },
      {
        parent_id: "PARENT_2",
        title: "Post-Operative Rehab",
        url: "/pages/post-operative-rehabilitation",
        type: "page",
        order: 4,
      },
      {
        parent_id: "PARENT_2",
        title: "Manual Therapy",
        url: "/pages/manual-therapy-spinal-manipulation",
        type: "page",
        order: 5,
      },
      {
        parent_id: "PARENT_2",
        title: "Cupping & Acupressure",
        url: "/pages/cupping-acupressure-therapy",
        type: "page",
        order: 6,
      },

      // Resources section
      {
        parent_id: null,
        title: "Resources",
        url: "#",
        type: "custom",
        order: 3,
      },
      {
        parent_id: "PARENT_3",
        title: "Blog & Insights",
        url: "/pages/testimonials",
        type: "page",
        order: 1,
      },
      {
        parent_id: "PARENT_3",
        title: "Case Studies",
        url: "/pages/conditions-we-treat",
        type: "page",
        order: 2,
      },
      {
        parent_id: "PARENT_3",
        title: "Portfolio",
        url: "/pages/gallery",
        type: "page",
        order: 3,
      },
      {
        parent_id: "PARENT_3",
        title: "Free Tools",
        url: "/pages/home",
        type: "page",
        order: 4,
      },
      {
        parent_id: "PARENT_3",
        title: "Documentation",
        url: "/pages/faq",
        type: "page",
        order: 5,
      },
      {
        parent_id: "PARENT_3",
        title: "FAQ",
        url: "/pages/faq",
        type: "page",
        order: 6,
      },
      {
        parent_id: "PARENT_3",
        title: "Support Center",
        url: "/pages/contact",
        type: "page",
        order: 7,
      },
    ];

    const parentIds = {};
    let insertCount = 0;

    for (const item of footerItems) {
      let parentId = item.parent_id;

      // Handle parent references
      if (typeof parentId === "string" && parentId.startsWith("PARENT_")) {
        parentId = parentIds[parentId];
      }

      const [itemResult] = await conn.query(
        `INSERT INTO menu_items (menu_id, parent_id, title, url, type, target, \`order\`, is_active, visibility, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          menuId,
          parentId,
          item.title,
          item.url,
          item.type,
          "_self",
          item.order,
          1,
          "both",
        ]
      );

      insertCount++;

      // Store parent IDs for children to reference
      if (item.parent_id === null) {
        const parentKey = `PARENT_${item.order}`;
        parentIds[parentKey] = itemResult.insertId;
        console.log(
          `✓ Created section: ${item.title} (ID: ${itemResult.insertId})`
        );
      }
    }

    console.log(`\n✓ Created ${insertCount} menu items successfully!`);
    console.log(`\n=== Footer Menu Summary ===`);
    console.log(`Menu ID: ${menuId}`);
    console.log(`Menu Name: Pain Therapy Footer Menu`);
    console.log(`Location: footer`);
    console.log(`Status: Active`);
    console.log(`Total Items: ${insertCount}`);
    console.log(`\nYou can now manage this footer in the admin dashboard!`);

    await conn.end();
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
})();
