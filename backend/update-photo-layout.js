const mysql = require('mysql2/promise');

async function updateDoctorPhotoLayout() {
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
  
  // Replace the circular photo section with a larger rectangular professional layout
  const oldPhotoSection = `                    <div class="md:w-1/3 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center p-12">
                        <div class="w-48 h-48 bg-white rounded-full overflow-hidden shadow-2xl border-4 border-white">
                            <img src="/images/dr-subodh-kumar.png" alt="Dr. Subodh Kumar" class="w-full h-full object-cover">
                        </div>
                    </div>`;
  
  const newPhotoSection = `                    <div class="md:w-2/5 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center p-8">
                        <div class="w-full max-w-sm">
                            <img src="/images/dr-subodh-kumar.png" alt="Dr. Subodh Kumar" class="w-full h-auto rounded-2xl shadow-2xl border-4 border-white object-cover">
                        </div>
                    </div>`;
  
  content = content.replace(oldPhotoSection, newPhotoSection);
  
  // Also adjust the text section width to match
  content = content.replace(
    '<div class="md:w-2/3 p-10">',
    '<div class="md:w-3/5 p-10">'
  );
  
  // Update database
  await connection.execute(
    'UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?',
    [content, 'about-team']
  );

  console.log('✅ Updated doctor photo to professional rectangular layout');
  console.log('   - Changed from small circle to larger rectangle');
  console.log('   - Adjusted column widths for better balance');
  console.log('   - Maintained professional styling');
  
  await connection.end();
}

updateDoctorPhotoLayout().catch(console.error);
