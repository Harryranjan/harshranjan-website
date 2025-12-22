const mysql = require('mysql2/promise');

async function removeJKTiwariCorrectly() {
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
  
  // Find Dr. J.K. Tiwari section more precisely
  const jkTiwariPos = content.indexOf('Dr. J.K. Tiwari');
  
  if (jkTiwariPos === -1) {
    console.log('❌ Dr. J.K. Tiwari not found');
    await connection.end();
    return;
  }
  
  console.log('Found Dr. J.K. Tiwari at position:', jkTiwariPos);
  
  // Look backwards to find the start of this team member card
  // Find the <div class="bg-white rounded-2xl shadow-xl overflow-hidden"> or similar card container
  let cardStart = content.lastIndexOf('<div class="bg-white rounded-2xl shadow-xl overflow-hidden', jkTiwariPos);
  
  if (cardStart === -1) {
    // Try alternate card pattern
    cardStart = content.lastIndexOf('<div class="bg-white', jkTiwariPos);
  }
  
  console.log('Card starts at position:', cardStart);
  console.log('Card preview:', content.substring(cardStart, cardStart + 200));
  
  // Find the matching closing div
  let depth = 0;
  let pos = cardStart;
  let cardEnd = -1;
  
  while (pos < content.length) {
    if (content.substring(pos, pos + 4) === '<div') {
      depth++;
    }
    if (content.substring(pos, pos + 6) === '</div>') {
      depth--;
      if (depth === 0) {
        cardEnd = pos + 6;
        break;
      }
    }
    pos++;
  }
  
  console.log('Card ends at position:', cardEnd);
  
  if (cardEnd === -1) {
    console.log('❌ Could not find card end');
    await connection.end();
    return;
  }
  
  // Extract the section to be removed (for verification)
  const removedSection = content.substring(cardStart, cardEnd);
  console.log('\n=== SECTION TO BE REMOVED ===');
  console.log('Length:', removedSection.length);
  console.log('Contains "J.K. Tiwari":', removedSection.includes('J.K. Tiwari'));
  console.log('Contains "Subodh Kumar":', removedSection.includes('Subodh Kumar'));
  
  if (removedSection.includes('Subodh Kumar')) {
    console.log('⚠️ WARNING: This section contains Dr. Subodh Kumar! Not removing.');
    await connection.end();
    return;
  }
  
  // Remove the section
  const newContent = content.substring(0, cardStart) + content.substring(cardEnd);
  
  // Update database
  await connection.execute(
    'UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?',
    [newContent, 'about-team']
  );
  
  console.log('\n✅ Successfully removed Dr. J.K. Tiwari from team page');
  console.log('New content length:', newContent.length);
  console.log('Dr. J.K. Tiwari still present:', newContent.includes('Dr. J.K. Tiwari'));
  console.log('Dr. Subodh Kumar still present:', newContent.includes('Dr. Subodh Kumar'));
  
  await connection.end();
}

removeJKTiwariCorrectly().catch(console.error);
