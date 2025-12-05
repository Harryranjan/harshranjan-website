const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function setupMenu() {
  let connection;
  try {
    console.log("🔌 Connecting to database...");
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database connected successfully!\n");

    // Step 1: Create or update Header Menu
    console.log("📋 Step 1: Creating/Updating Header Menu...");
    const [menuResult] = await connection.execute(`
      INSERT INTO menus (name, location, description, is_active, created_at, updated_at)
      VALUES ('Main Header Menu', 'header', 'Main navigation menu for Pain Therapy & Rehab Centre', 1, NOW(), NOW())
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        description = VALUES(description),
        is_active = VALUES(is_active),
        updated_at = NOW()
    `);

    // Get the menu ID
    const [menus] = await connection.execute(`
      SELECT id FROM menus WHERE location = 'header' ORDER BY updated_at DESC LIMIT 1
    `);
    const menuId = menus[0].id;
    console.log(`✅ Header Menu ID: ${menuId}\n`);

    // Step 2: Clear existing menu items for this menu
    console.log("🗑️  Step 2: Clearing old menu items...");
    await connection.execute("DELETE FROM menu_items WHERE menu_id = ?", [
      menuId,
    ]);
    console.log("✅ Old menu items cleared\n");

    // Step 3: Get all pages with show_in_menu = true
    console.log("📄 Step 3: Fetching pages...");
    const [pages] = await connection.execute(`
      SELECT id, title, slug, menu_order 
      FROM pages 
      WHERE show_in_menu = 1 
      ORDER BY menu_order, id
    `);
    console.log(`✅ Found ${pages.length} pages to add to menu\n`);

    // Step 4: Create menu items for each page
    console.log("➕ Step 4: Creating menu items...\n");

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const order = i + 1;

      await connection.execute(
        `
        INSERT INTO menu_items 
        (menu_id, title, url, type, target, \`order\`, visibility, page_id, is_active, created_at, updated_at)
        VALUES (?, ?, ?, 'page', '_self', ?, 'both', ?, 1, NOW(), NOW())
      `,
        [menuId, page.title, `/pages/${page.slug}`, order, page.id]
      );

      console.log(`   ${order}. ✅ ${page.title} → /pages/${page.slug}`);
    }

    console.log("\n🎉 Menu setup complete!\n");

    // Step 5: Verify the menu
    console.log("📊 Verification - Current Menu Structure:");
    console.log("════════════════════════════════════════════════════════════");

    const [menuItems] = await connection.execute(
      `
      SELECT 
        mi.id, 
        mi.title, 
        mi.url, 
        mi.order, 
        mi.is_active,
        p.title as page_title
      FROM menu_items mi
      LEFT JOIN pages p ON mi.page_id = p.id
      WHERE mi.menu_id = ?
      ORDER BY mi.order
    `,
      [menuId]
    );

    console.log(`\nMenu: Main Header Menu (ID: ${menuId})`);
    console.log(`Location: header\n`);

    menuItems.forEach((item) => {
      const status = item.is_active ? "✓" : "✗";
      console.log(`${status} ${item.order}. ${item.title}`);
      console.log(`   URL: ${item.url}`);
      console.log(`   Page: ${item.page_title || "N/A"}\n`);
    });

    console.log("════════════════════════════════════════════════════════════");
    console.log("\n✅ SUCCESS! Your menu is now ready in the Admin dashboard!");
    console.log("\n📌 Next Steps:");
    console.log("   1. Go to Admin Dashboard → Menu Management");
    console.log("   2. You'll see 'Main Header Menu' with all pages");
    console.log("   3. You can reorder, edit, or customize menu items there\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("🔌 Database connection closed");
    }
    process.exit(0);
  }
}

setupMenu();
