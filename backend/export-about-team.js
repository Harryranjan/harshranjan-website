require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');

async function exportAboutTeam() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [rows] = await conn.query('SELECT * FROM pages WHERE slug = ?', ['about-team']);
    
    if (rows.length === 0) {
      console.log('Page not found');
      return;
    }

    const page = rows[0];
    
    // Save as SQL for production
    const sql = `
UPDATE pages SET
  title = ${mysql.escape(page.title)},
  content = ${mysql.escape(page.content)},
  excerpt = ${mysql.escape(page.excerpt)},
  meta_title = ${mysql.escape(page.meta_title)},
  meta_description = ${mysql.escape(page.meta_description)},
  meta_keywords = ${mysql.escape(page.meta_keywords)},
  custom_css = ${mysql.escape(page.custom_css)},
  custom_js = ${mysql.escape(page.custom_js)},
  template = ${mysql.escape(page.template)},
  hide_title = ${page.hide_title ? 1 : 0},
  status = ${mysql.escape(page.status)},
  updated_at = NOW()
WHERE slug = 'about-team';
`;

    fs.writeFileSync('about-team-production-update.sql', sql);
    console.log('✅ Exported to about-team-production-update.sql');
    console.log('📝 Page:', page.title);
    console.log('📏 Content size:', page.content.length, 'bytes');
    console.log('📅 Last updated:', page.updated_at);
    
    // Check for doctor images
    const doctorImgs = page.content.match(/\/images\/doctor\/[^"'\s]*/gi);
    console.log('\n🖼️  Doctor images found:');
    if (doctorImgs) {
      doctorImgs.forEach(img => console.log('  -', img));
    } else {
      console.log('  None');
    }

    await conn.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

exportAboutTeam();
