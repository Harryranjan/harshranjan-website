const mysql = require("mysql2/promise");

async function verifyMenuSetup() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  try {
    console.log("\n========================================");
    console.log("   MENU SETUP VERIFICATION");
    console.log("========================================\n");

    // Check Menus table
    const [menus] = await connection.query("SELECT * FROM menus");
    console.log("📋 MENUS TABLE:");
    console.log("----------------");
    if (menus.length === 0) {
      console.log("❌ No menus found!");
    } else {
      menus.forEach((menu) => {
        console.log(`✅ Menu ID: ${menu.id}`);
        console.log(`   Name: ${menu.name}`);
        console.log(`   Location: ${menu.location}`);
        console.log(`   Created: ${menu.created_at}`);
        console.log("");
      });
    }

    // Check Menu Items
    const [items] = await connection.query(`
      SELECT 
        mi.id, 
        mi.menu_id, 
        mi.title, 
        mi.page_id, 
        mi.order,
        p.title as page_title,
        p.slug as page_slug
      FROM menu_items mi
      LEFT JOIN pages p ON mi.page_id = p.id
      ORDER BY mi.order
    `);

    console.log("\n🔗 MENU ITEMS:");
    console.log("----------------");
    if (items.length === 0) {
      console.log("❌ No menu items found!");
    } else {
      items.forEach((item) => {
        console.log(`${item.order}. ${item.title}`);
        console.log(`   Item ID: ${item.id} | Menu ID: ${item.menu_id}`);
        console.log(
          `   Page ID: ${item.page_id} | Page: ${item.page_title || "N/A"}`
        );
        console.log(`   Slug: ${item.page_slug || "N/A"}`);
        console.log("");
      });
    }

    // Check Pages
    const [pages] = await connection.query(`
      SELECT id, title, slug, show_in_menu, menu_order 
      FROM pages 
      ORDER BY menu_order
    `);

    console.log("\n📄 ALL PAGES:");
    console.log("----------------");
    pages.forEach((page) => {
      const menuIcon = page.show_in_menu ? "✅" : "❌";
      console.log(`${menuIcon} ${page.title}`);
      console.log(`   ID: ${page.id} | Slug: ${page.slug}`);
      console.log(
        `   Show in Menu: ${page.show_in_menu} | Menu Order: ${page.menu_order}`
      );
      console.log("");
    });

    console.log("\n========================================");
    console.log("   SUMMARY");
    console.log("========================================");
    console.log(`Total Menus: ${menus.length}`);
    console.log(`Total Menu Items: ${items.length}`);
    console.log(`Total Pages: ${pages.length}`);
    console.log(
      `Pages with show_in_menu=true: ${
        pages.filter((p) => p.show_in_menu).length
      }`
    );
    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await connection.end();
  }
}

verifyMenuSetup();
