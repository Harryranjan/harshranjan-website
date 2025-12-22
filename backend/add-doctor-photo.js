const mysql = require('mysql2/promise');

async function addDoctorPhoto() {
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
  
  // Replace the icon placeholder with the actual doctor photo
  const oldPhotoSection = `                    <div class="md:w-1/3 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center p-12">
                        <div class="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl">
                            <i class="fas fa-user-md text-7xl text-blue-600"></i>
                        </div>
                    </div>`;
  
  const newPhotoSection = `                    <div class="md:w-1/3 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center p-12">
                        <div class="w-48 h-48 bg-white rounded-full overflow-hidden shadow-2xl border-4 border-white">
                            <img src="/Dr. Subodh/Dr.SubodhKumarPicture.png" alt="Dr. Subodh Kumar" class="w-full h-full object-cover">
                        </div>
                    </div>`;
  
  content = content.replace(oldPhotoSection, newPhotoSection);
  
  // Update database
  await connection.execute(
    'UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?',
    [content, 'about-team']
  );

  console.log('✅ Updated about-team page with Dr. Subodh Kumar\'s photo!');
  
  await connection.end();
}

addDoctorPhoto().catch(console.error);
