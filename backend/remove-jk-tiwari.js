const mysql = require('mysql2/promise');

async function removeJKTiwari() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'harsh_ranjan_website'
  });

  // Get current content
  const [rows] = await connection.execute(
    'SELECT content FROM pages WHERE slug = ?',
    ['about-team']
  );

  if (rows.length === 0) {
    console.log('❌ About team page not found');
    await connection.end();
    return;
  }

  let content = rows[0].content;
  
  // Find and remove the Dr. J.K. Tiwari section
  // It's between the Dr. Subodh Kumar section and any section after
  const jkTiwariStart = content.indexOf('<!-- Team Member 2: Dr. J.K. Tiwari -->');
  
  if (jkTiwariStart === -1) {
    // Try alternate pattern
    const altStart = content.indexOf('Dr. J.K. Tiwari');
    if (altStart === -1) {
      console.log('❌ Dr. J.K. Tiwari section not found');
      await connection.end();
      return;
    }
    
    // Find the containing div - look backwards for the start of this team member card
    let searchPos = altStart;
    while (searchPos > 0 && content.substring(searchPos - 200, searchPos).indexOf('<div class="bg-white rounded-2xl shadow-xl overflow-hidden') === -1) {
      searchPos -= 50;
    }
    
    // Find the card start
    const cardStart = content.lastIndexOf('<div class="bg-white rounded-2xl shadow-xl overflow-hidden', searchPos);
    
    // Find the card end - look for the closing </div> that matches
    let depth = 0;
    let cardEnd = cardStart;
    let inTag = false;
    
    for (let i = cardStart; i < content.length; i++) {
      if (content[i] === '<') inTag = true;
      if (inTag && content.substring(i, i + 4) === '<div') depth++;
      if (inTag && content.substring(i, i + 6) === '</div>') {
        depth--;
        if (depth === 0) {
          cardEnd = i + 6;
          break;
        }
      }
      if (content[i] === '>') inTag = false;
    }
    
    // Remove the section including surrounding whitespace
    content = content.substring(0, cardStart) + content.substring(cardEnd);
  } else {
    // Find the end of this section (next comment or end of team members section)
    let jkTiwariEnd = content.indexOf('<!-- Team Member 3', jkTiwariStart);
    if (jkTiwariEnd === -1) {
      jkTiwariEnd = content.indexOf('</div>\n</div>\n</section>', jkTiwariStart);
      if (jkTiwariEnd !== -1) jkTiwariEnd += 10; // Include the </div>
    }
    
    if (jkTiwariEnd === -1) {
      console.log('❌ Could not find end of Dr. J.K. Tiwari section');
      await connection.end();
      return;
    }
    
    // Remove the section
    content = content.substring(0, jkTiwariStart) + content.substring(jkTiwariEnd);
  }

  // Update the page
  await connection.execute(
    'UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?',
    [content, 'about-team']
  );

  console.log('✅ Removed Dr. J.K. Tiwari from the team page');
  await connection.end();
}

removeJKTiwari().catch(console.error);
