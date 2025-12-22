const mysql = require('mysql2/promise');

async function addStatsToHero() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'harsh_ranjan_website'
  });

  const [rows] = await connection.execute('SELECT content FROM pages WHERE slug = ?', ['home']);
  let content = rows[0].content;

  // Add the stats cards after the appointment card but before closing the right column
  const statsCards = `
                    <!-- Quick Stats Cards -->
                    <div class="grid grid-cols-2 gap-4 mt-5">
                        <div class="bg-white/95 backdrop-blur-lg rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all border border-white/20">
                            <div class="text-3xl font-bold text-blue-600 mb-1">500+</div>
                            <div class="text-xs text-gray-600 font-medium">Patients Treated</div>
                        </div>
                        <div class="bg-white/95 backdrop-blur-lg rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all border border-white/20">
                            <div class="text-3xl font-bold text-yellow-500 mb-1 flex items-center justify-center gap-1">
                                4.8 <i class="fas fa-star text-xl"></i>
                            </div>
                            <div class="text-xs text-gray-600 font-medium">Patient Rating</div>
                        </div>
                    </div>`;

  // Find and replace - add stats after the appointment card closes
  content = content.replace(
    `                            </a>
                        </div>
                    </div>
                </div>`,
    `                            </a>
                        </div>
                    </div>
${statsCards}
                </div>`
  );

  await connection.execute('UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?', [content, 'home']);

  console.log('✅ Added 500+ Patients and 4.8★ Rating stats cards to hero section!');
  await connection.end();
}

addStatsToHero().catch(console.error);
