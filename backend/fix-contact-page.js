require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

(async () => {
  try {
    console.log('\n🔧 Converting Contact page to Blank template...\n');
    
    // Get current content
    const [pages] = await sequelize.query(`
      SELECT id, content 
      FROM pages 
      WHERE slug = 'contact'
    `);
    
    if (pages.length === 0) {
      console.log('❌ Contact page not found');
      process.exit(1);
    }
    
    const page = pages[0];
    let content = page.content;
    
    // Check if it's full HTML
    if (content.trim().toLowerCase().startsWith('<!doctype html')) {
      console.log('⚠️  Page is currently Full HTML (iframe mode)');
      console.log('   Shortcodes will NOT work in this mode\n');
      
      // Extract body content
      const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      if (bodyMatch) {
        const bodyContent = bodyMatch[1];
        
        console.log('✅ Extracted body content');
        console.log('📝 New content preview:');
        console.log(bodyContent.substring(0, 300) + '...\n');
        
        // Update the page
        await sequelize.query(`
          UPDATE pages 
          SET content = ?, template = 'blank'
          WHERE id = ?
        `, {
          replacements: [bodyContent, page.id]
        });
        
        console.log('✅ Page converted successfully!');
        console.log('   Template: blank');
        console.log('   Shortcodes will now work!\n');
        console.log('🌐 Test at: http://localhost:5173/pages/contact');
      } else {
        console.log('❌ Could not extract body content');
      }
    } else {
      console.log('✅ Page is already in correct format');
      console.log('   Just setting template to "blank"...\n');
      
      await sequelize.query(`
        UPDATE pages 
        SET template = 'blank'
        WHERE id = ?
      `, {
        replacements: [page.id]
      });
      
      console.log('✅ Template updated!');
    }
    
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await sequelize.close();
    process.exit(1);
  }
})();
