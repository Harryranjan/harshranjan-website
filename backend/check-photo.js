const mysql = require('mysql2/promise');

async function checkPhotoPath() {
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

  const content = rows[0].content;
  const imgMatch = content.match(/src="([^"]*subodh[^"]*)"/i);
  
  console.log('Photo path in database:', imgMatch ? imgMatch[1] : 'NOT FOUND');
  
  // Also check if the image tag exists
  if (content.includes('dr-subodh-kumar.png')) {
    console.log('✅ Photo path is correct: /images/dr-subodh-kumar.png');
  } else if (content.includes('Dr.SubodhKumarPicture.png')) {
    console.log('❌ Old path still present');
  } else {
    console.log('⚠️ No photo path found');
  }
  
  await connection.end();
}

checkPhotoPath().catch(console.error);
