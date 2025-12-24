require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');

async function exportAndUploadHomepage() {
  console.log('🔄 Starting homepage sync to production...\n');

  try {
    // Step 1: Connect to local database
    console.log('📦 Step 1: Exporting from local database...');
    const localConn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    // Get homepage data
    const [rows] = await localConn.query(
      'SELECT * FROM pages WHERE slug = ?',
      ['home']
    );

    if (rows.length === 0) {
      console.error('❌ Homepage not found in local database!');
      process.exit(1);
    }

    const homepage = rows[0];
    console.log(`✅ Found homepage: "${homepage.title}"`);
    console.log(`   Content size: ${homepage.content.length} bytes`);
    
    await localConn.end();

    // Step 2: Generate SQL for production (only essential columns)
    console.log('\n📝 Step 2: Generating SQL...');
    
    const sql = `
-- Homepage Update for Production
-- Generated: ${new Date().toISOString()}

UPDATE pages SET
  title = ${mysql.escape(homepage.title)},
  content = ${mysql.escape(homepage.content)},
  excerpt = ${mysql.escape(homepage.excerpt)},
  meta_title = ${mysql.escape(homepage.meta_title)},
  meta_description = ${mysql.escape(homepage.meta_description)},
  meta_keywords = ${mysql.escape(homepage.meta_keywords)},
  custom_css = ${mysql.escape(homepage.custom_css)},
  custom_js = ${mysql.escape(homepage.custom_js)},
  template = ${mysql.escape(homepage.template)},
  hide_title = ${homepage.hide_title ? 1 : 0},
  status = ${mysql.escape(homepage.status)},
  updated_at = NOW()
WHERE slug = 'home';
`;

    const filename = 'homepage-production-update.sql';
    fs.writeFileSync(filename, sql);
    console.log(`✅ SQL saved to: ${filename}`);

    // Step 3: Instructions for upload
    console.log('\n📤 Step 3: Upload to production server');
    console.log('Run these commands:\n');
    console.log(`scp ${filename} root@72.61.241.90:/tmp/`);
    console.log(`ssh root@72.61.241.90`);
    console.log(`mysql -u drsubodh_user -p'Dr@Subodh2025!' drsubodh_website < /tmp/${filename}`);
    console.log(`rm /tmp/${filename}`);
    console.log(`exit`);
    
    console.log('\n✅ Export complete!');
    console.log('📋 Next: Run the upload commands above');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

exportAndUploadHomepage();
