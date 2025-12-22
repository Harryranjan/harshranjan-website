const mysql = require('mysql2/promise');

async function checkPhilosophySection() {
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
  
  // Find the philosophy section
  const philosophyStart = content.indexOf('Our Philosophy & Approach');
  const philosophySection = content.substring(philosophyStart, philosophyStart + 2000);
  
  console.log('=== Philosophy Section ===');
  console.log(philosophySection);
  
  // Count the cards
  const cardMatches = philosophySection.match(/<div class="bg-white p-8 rounded-xl shadow-lg">/g);
  console.log('\n=== Cards found:', cardMatches ? cardMatches.length : 0);
  
  await connection.end();
}

checkPhilosophySection().catch(console.error);
