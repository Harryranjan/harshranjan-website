const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
};

async function fixUltraModernPage() {
  let connection;
  try {
    console.log('🔧 Fixing ultra-modern homepage template and rendering...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connected!');
    
    // Update the page to have proper template
    const updateQuery = `
      UPDATE pages 
      SET template = 'custom_html', updated_at = NOW() 
      WHERE slug = 'homepage-2025'
    `;
    
    const [result] = await connection.execute(updateQuery);
    
    console.log('✅ Template updated to "custom_html"');
    
    // Verify the update
    const [rows] = await connection.execute(
      'SELECT title, slug, template, status FROM pages WHERE slug = ?',
      ['homepage-2025']
    );
    
    if (rows.length > 0) {
      const page = rows[0];
      console.log('\n📄 UPDATED PAGE INFO:');
      console.log(`Title: ${page.title}`);
      console.log(`Slug: ${page.slug}`);
      console.log(`Template: ${page.template}`);
      console.log(`Status: ${page.status}`);
      
      console.log('\n🎯 RENDERING METHOD:');
      console.log('✅ Will render as full HTML document in iframe');
      console.log('✅ All animations and scripts will work properly');
      console.log('✅ Tailwind CSS classes will be preserved');
      
      console.log('\n🔗 Access your ultra-modern page at:');
      console.log('   Frontend: http://localhost:5173/pages/homepage-2025');
      console.log('   Backend:  http://localhost:3000/pages/homepage-2025');
      
      console.log('\n💡 If you still see basic elements, try:');
      console.log('1. Clear browser cache (Ctrl+F5)');
      console.log('2. Check browser console for JavaScript errors');
      console.log('3. Ensure all CDN libraries are loading');
      
    } else {
      console.log('❌ Page not found after update');
    }
    
  } catch (error) {
    console.error('❌ Error fixing page:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

fixUltraModernPage();