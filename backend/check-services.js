const mysql = require('mysql2/promise');

async function checkServicePages() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'harsh_ranjan_website'
  });

  const [rows] = await connection.execute(
    'SELECT slug, title, status FROM pages WHERE slug LIKE "%service%" OR slug LIKE "%treatment%" OR title LIKE "%service%" OR title LIKE "%treatment%"'
  );

  console.log('Service/Treatment pages found:');
  rows.forEach(r => console.log(`  - ${r.slug} | ${r.title} | ${r.status}`));
  
  if (rows.length === 0) {
    console.log('  (No services pages found - need to create one)');
  }

  await connection.end();
}

checkServicePages().catch(console.error);
