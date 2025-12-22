const mysql = require('mysql2/promise');

async function restoreHeroLayout() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'harsh_ranjan_website'
  });

  const [rows] = await connection.execute('SELECT content FROM pages WHERE slug = ?', ['home']);
  let content = rows[0].content;

  // Find where the left content ends (after the CTA buttons)
  const leftContentEnd = content.indexOf('</div>\n                </div>\n\n            </div>\n        </div>');
  
  if (leftContentEnd === -1) {
    console.log('❌ Could not find the end of left content section');
    await connection.end();
    return;
  }

  // Insert the right side appointment card and stats
  const rightSideContent = `

                <!-- Right Side - Appointment Card & Stats -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Appointment Card -->
                    <div class="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                        <!-- Header -->
                        <div class="bg-gradient-to-r from-teal-500 to-blue-500 p-4 flex items-center gap-3">
                            <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                                <i class="fas fa-clinic-medical text-2xl text-teal-600"></i>
                            </div>
                            <div>
                                <h3 class="text-white font-bold text-lg">Pain Therapy Centre</h3>
                                <p class="text-white/80 text-xs">Vadodara's Trusted Rehab</p>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="p-5 space-y-4">
                            <div>
                                <div class="flex items-center gap-2 mb-3">
                                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <i class="fas fa-calendar-check text-blue-600"></i>
                                    </div>
                                    <h4 class="font-bold text-gray-900">Quick Consultation</h4>
                                </div>
                                <p class="text-gray-600 text-sm">Schedule your visit today</p>
                            </div>

                            <!-- Contact Info -->
                            <div class="space-y-3">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-phone text-blue-600 text-sm"></i>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500">Call Now</p>
                                        <p class="font-bold text-gray-900">8160754633</p>
                                    </div>
                                </div>

                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-map-marker-alt text-teal-600 text-sm"></i>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500">Location</p>
                                        <p class="font-semibold text-gray-900 text-sm">Ajwa Road, Vadodara</p>
                                    </div>
                                </div>

                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-clock text-orange-600 text-sm"></i>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500">Hours</p>
                                        <p class="font-semibold text-gray-900 text-sm">Tue - Sun: 10 AM - 1 PM</p>
                                    </div>
                                </div>
                            </div>

                            <!-- CTA Button -->
                            <a href="/pages/contact" class="block w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-xl font-bold text-center hover:from-blue-700 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl">
                                Book Appointment →
                            </a>
                        </div>
                    </div>

                    <!-- Quick Stats -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-white/90 backdrop-blur-lg rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all">
                            <div class="text-3xl font-bold text-blue-600 mb-1">500+</div>
                            <div class="text-xs text-gray-600 font-medium">Patients Treated</div>
                        </div>
                        <div class="bg-white/90 backdrop-blur-lg rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all">
                            <div class="text-3xl font-bold text-yellow-500 mb-1 flex items-center justify-center gap-1">
                                4.8 <i class="fas fa-star text-lg"></i>
                            </div>
                            <div class="text-xs text-gray-600 font-medium">Patient Rating</div>
                        </div>
                    </div>
                </div>`;

  // Insert the right side content before the closing divs
  const insertPosition = leftContentEnd;
  content = content.slice(0, insertPosition) + rightSideContent + content.slice(insertPosition);

  await connection.execute('UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?', [content, 'home']);

  console.log('✅ Restored hero layout with appointment card on right side and stats!');
  await connection.end();
}

restoreHeroLayout().catch(console.error);
