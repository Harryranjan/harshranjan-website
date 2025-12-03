require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

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
    console.log('\n🔍 Testing Shortcode System via Database\n');
    console.log('=' .repeat(60));
    
    // Test 1: Check if form 4 exists
    const [forms] = await sequelize.query(`
      SELECT id, name, type, status, fields 
      FROM forms 
      WHERE id = 4
    `);
    
    if (forms.length === 0) {
      console.log('❌ Form ID 4 NOT FOUND');
      console.log('\n💡 Create a form first in Admin → Forms');
    } else {
      const form = forms[0];
      console.log('✅ Form ID 4 EXISTS:');
      console.log('   Name:', form.name);
      console.log('   Type:', form.type);
      console.log('   Status:', form.status);
      console.log('   Fields:', form.fields ? 'Configured' : 'Not configured');
    }
    
    console.log('\n' + '='.repeat(60));
    
    // Test 2: Find pages with form shortcode
    console.log('\n📄 Pages with [form] shortcodes:\n');
    const [pages] = await sequelize.query(`
      SELECT id, title, slug, template, status
      FROM pages 
      WHERE content LIKE '%[form%'
    `);
    
    if (pages.length === 0) {
      console.log('   No pages found with form shortcodes');
    } else {
      pages.forEach(page => {
        console.log(`   - ${page.title} (/${page.slug})`);
        console.log(`     Template: ${page.template}, Status: ${page.status}`);
        console.log(`     URL: http://localhost:5173/pages/${page.slug}`);
      });
    }
    
    console.log('\n' + '='.repeat(60));
    
    // Test 3: Find blog posts with shortcodes
    console.log('\n📝 Blog Posts with [form] shortcodes:\n');
    const [posts] = await sequelize.query(`
      SELECT id, title, slug, is_published
      FROM blog_posts 
      WHERE content LIKE '%[form%'
    `);
    
    if (posts.length === 0) {
      console.log('   No blog posts found with form shortcodes');
    } else {
      posts.forEach(post => {
        console.log(`   - ${post.title}`);
        console.log(`     Published: ${post.is_published ? 'Yes' : 'No'}`);
        console.log(`     URL: http://localhost:5173/blog/${post.slug}`);
      });
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('\n✅ API Endpoints to test:');
    console.log('   GET http://localhost:5000/api/forms/4');
    console.log('   GET http://localhost:5000/api/pages/slug/homepage');
    console.log('\n💡 Shortcode Usage:');
    console.log('   - Use [form id="4"] in Blank/Default template pages');
    console.log('   - Works in blog posts automatically');
    console.log('   - Does NOT work in full HTML pages (iframe)');
    console.log('\n');
    
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await sequelize.close();
    process.exit(1);
  }
})();
