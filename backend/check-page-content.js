const mysql = require('mysql2/promise');

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'harsh_ranjan_website'
    });

    const [rows] = await conn.execute(
      'SELECT slug, title, content FROM pages WHERE slug = ? LIMIT 1',
      ['html-page']
    );

    if (rows.length > 0) {
      const page = rows[0];
      console.log('Slug:', page.slug);
      console.log('Title:', page.title);
      console.log('\nContent type:', typeof page.content);
      
      if (typeof page.content === 'string') {
        if (page.content.startsWith('[')) {
          console.log('\n✅ Content is JSON blocks array');
          const blocks = JSON.parse(page.content);
          console.log('Number of blocks:', blocks.length);
          console.log('\nFirst 3 blocks:');
          blocks.slice(0, 3).forEach((block, i) => {
            console.log(`\nBlock ${i + 1}:`);
            console.log('  Type:', block.type);
            console.log('  Content preview:', block.content?.substring(0, 200));
          });
        } else {
          console.log('\n✅ Content is HTML string');
          console.log('First 800 chars:', page.content.substring(0, 800));
        }
      }
    } else {
      console.log('No page found');
    }

    await conn.end();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
