require('dotenv').config();
const mysql = require('mysql2/promise');

async function updateAboutTeamImage() {
  console.log('🖼️  Updating About Team page image...\n');

  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    // Get current content
    const [rows] = await conn.query('SELECT id, title, content FROM pages WHERE slug = ?', ['about-team']);
    
    if (rows.length === 0) {
      console.log('❌ About-team page not found');
      return;
    }

    let content = rows[0].content;
    console.log('📝 Page:', rows[0].title);
    console.log('📝 Current content length:', content.length);

    // Replace the doctor image URL
    const oldUrl = 'https://drsubodh.harshranjan.in/images/transform_any_image_with_ai_for_free_t53lvoea0zh2ahgjvshw.png';
    const newUrl = '/images/doctor/Dr.SubodhTeamPhoto.jpg';
    
    if (content.includes(oldUrl)) {
      content = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
      console.log('✅ Replaced old image URL with new one');
    } else {
      console.log('⚠️  Old URL not found, looking for any doctor/transform image...');
      // Try broader pattern
      const pattern = /https?:\/\/[^"'\s]*(?:transform_any_image|doctor)[^"'\s]*/gi;
      const matches = content.match(pattern);
      if (matches) {
        console.log('Found:', matches[0]);
        content = content.replace(pattern, newUrl);
        console.log('✅ Replaced with new image');
      }
    }

    // Update database
    await conn.query(
      'UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?',
      [content, 'about-team']
    );

    console.log('✅ Database updated successfully');
    await conn.end();

    console.log('\n📋 Changes ready. Next: commit, push, and pull on server');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateAboutTeamImage();
