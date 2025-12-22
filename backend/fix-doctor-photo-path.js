const mysql = require('mysql2/promise');

async function fixDoctorPhotoPath() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'harsh_ranjan_website'
  });

  const [rows] = await connection.execute(
    'SELECT content FROM pages WHERE slug = ?',
    ['about-team']
  );

  let content = rows[0].content;
  
  // Fix the photo path to use the images folder
  content = content.replace(
    '/Dr. Subodh/Dr.SubodhKumarPicture.png',
    '/images/dr-subodh-kumar.png'
  );
  
  // Update database
  await connection.execute(
    'UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?',
    [content, 'about-team']
  );

  console.log('✅ Fixed Dr. Subodh Kumar photo path to /images/dr-subodh-kumar.png');
  
  await connection.end();
}

fixDoctorPhotoPath().catch(console.error);
