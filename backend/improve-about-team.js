const mysql = require('mysql2/promise');

async function improveAboutTeamPage() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'harsh_ranjan_website'
  });

  const improvedContent = `<!-- Page Header -->
<section class="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
    <div class="container mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/30">
            <i class="fas fa-users"></i>
            <span>Meet Our Team</span>
        </div>
        <h1 class="text-5xl font-bold mb-4">About Our Team</h1>
        <p class="text-xl text-blue-50 max-w-3xl mx-auto">Dedicated healthcare professionals committed to your wellness and recovery</p>
    </div>
</section>

<!-- Our Story -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div class="prose prose-lg">
                <p class="text-gray-600 mb-6 text-lg">Pain Therapy & Rehab Centre was established with a vision to provide comprehensive, holistic pain management and rehabilitation services to the community of Vadodara. With over <strong>7 years of excellence in healthcare</strong>, we have helped countless patients overcome chronic pain, recover from injuries, and regain their quality of life.</p>
                
                <p class="text-gray-600 mb-6 text-lg">Located in the heart of Ajwa Road at <strong>Amardeep Township Complex</strong>, our center combines traditional physiotherapy techniques with modern neurotherapy and alternative healing approaches to deliver personalized treatment plans for each patient.</p>
            </div>
        </div>
    </div>
</section>

<!-- Our Philosophy -->
<section class="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-800 mb-4">Our Philosophy & Approach</h2>
            <p class="text-xl text-gray-600">We believe in treating the whole person, not just the symptoms</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-heart text-blue-600 text-3xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4 text-center">Patient-Centered Care</h3>
                <p class="text-gray-600 text-center">Every treatment plan is customized to your unique condition, lifestyle, and recovery goals.</p>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-brain text-teal-600 text-3xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4 text-center">Holistic Approach</h3>
                <p class="text-gray-600 text-center">We combine manual therapy, neurotherapy, and alternative treatments for comprehensive healing.</p>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-chart-line text-green-600 text-3xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4 text-center">Evidence-Based Treatment</h3>
                <p class="text-gray-600 text-center">Our therapies are backed by scientific research and proven clinical results.</p>
            </div>
        </div>
    </div>
</section>

<!-- Meet Our Doctor -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-800 mb-4">Meet Our Expert</h2>
            <p class="text-xl text-gray-600">Highly qualified and experienced healthcare professional</p>
        </div>

        <!-- Dr. Subodh Kumar -->
        <div class="max-w-5xl mx-auto">
            <div class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <div class="md:flex">
                    <div class="md:w-1/3 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center p-12">
                        <div class="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl">
                            <i class="fas fa-user-md text-7xl text-blue-600"></i>
                        </div>
                    </div>
                    <div class="md:w-2/3 p-10">
                        <h3 class="text-3xl font-bold mb-2">Dr. Subodh Kumar</h3>
                        <p class="text-blue-600 font-semibold text-lg mb-6">BPT, MPT (Neurology), Certified Acupuncturist</p>
                        
                        <div class="space-y-4 text-gray-700">
                            <p>Dr. Subodh Kumar is a highly qualified physiotherapist with a Master's degree in Physiotherapy (Neurology) and additional certification in Acupuncture. With over 7 years of clinical experience, he specializes in treating complex neurological conditions and chronic pain disorders.</p>
                            
                            <h4 class="font-bold text-gray-800 mt-6 mb-3">Specializations:</h4>
                            <ul class="space-y-2 ml-6">
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-blue-600 mt-1"></i>
                                    <span>Advanced neurotherapy & nerve rehabilitation</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-blue-600 mt-1"></i>
                                    <span>Acupressure & Sujok Therapy for pain management</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-blue-600 mt-1"></i>
                                    <span>Neurotherapy for nerve-related conditions</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-blue-600 mt-1"></i>
                                    <span>Holistic treatment for chronic pain conditions</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="fas fa-check text-blue-600 mt-1"></i>
                                    <span>Paralysis and stroke rehabilitation</span>
                                </li>
                            </ul>
                            
                            <div class="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                                <p class="text-sm"><i class="fas fa-quote-left text-blue-400 mr-2"></i><em>"My approach is to treat the root cause, not just the symptoms. Every patient deserves personalized care and attention."</em></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Certifications -->
<section class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-800 mb-4">Certifications & Qualifications</h2>
            <p class="text-xl text-gray-600">Recognized expertise in pain management and rehabilitation</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-certificate text-3xl text-blue-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Chiropractic & Osteopathy Technique</h3>
                        <p class="text-sm text-gray-600">Advance Physiotherapy Academy, 2020</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-teal-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-certificate text-3xl text-teal-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Neurotherapy - First Class</h3>
                        <p class="text-sm text-gray-600">Dr. Lajpatrai Mehra's Academy, 2018-19</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-green-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-certificate text-3xl text-green-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Advanced Manipulation Therapy (CMT)</h3>
                        <p class="text-sm text-gray-600">Manual Therapy Academy, India, 2025</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-award text-3xl text-purple-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">COVID-19 Healthcare Hero Award</h3>
                        <p class="text-sm text-gray-600">UTV News24, 2020</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-orange-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-certificate text-3xl text-orange-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Bone Setting - Kalari Adankal Method</h3>
                        <p class="text-sm text-gray-600">Martial Kalari Marma Gurukulam, 2025</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-pink-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-certificate text-3xl text-pink-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Hypnotherapy Diploma (IPHM, UK)</h3>
                        <p class="text-sm text-gray-600">Past Life Regression Therapy, 2025</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-indigo-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-certificate text-3xl text-indigo-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Modern Physiotherapy in Spine Care</h3>
                        <p class="text-sm text-gray-600">Viroc & Isha Hospital, Vadodara, 2025</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                <div class="text-4xl font-bold text-blue-600 mb-2">15+</div>
                <div class="text-sm text-gray-600 font-medium">Years Experience</div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                <div class="text-4xl font-bold text-teal-600 mb-2">7+</div>
                <div class="text-sm text-gray-600 font-medium">Professional Certifications</div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                <div class="text-4xl font-bold text-green-600 mb-2">5000+</div>
                <div class="text-sm text-gray-600 font-medium">Patients Treated</div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                <div class="text-4xl font-bold text-purple-600 mb-2">98%</div>
                <div class="text-sm text-gray-600 font-medium">Success Rate</div>
            </div>
        </div>
    </div>
</section>

<!-- Why Choose Us -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-800 mb-4">Why Choose Pain Therapy & Rehab Centre?</h2>
            <p class="text-xl text-gray-600">Experience the difference of expert, compassionate care</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
                <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-user-md text-white text-2xl"></i>
                </div>
                <h4 class="font-bold text-lg mb-3">Expert Specialist</h4>
                <p class="text-gray-700">MPT Neurology qualified with 7+ years of clinical excellence</p>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-xl">
                <div class="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-star text-white text-2xl"></i>
                </div>
                <h4 class="font-bold text-lg mb-3">Top Rated</h4>
                <p class="text-gray-700">4.8/5 rating based on 30+ verified patient reviews</p>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
                <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-hands-helping text-white text-2xl"></i>
                </div>
                <h4 class="font-bold text-lg mb-3">Personalized Care</h4>
                <p class="text-gray-700">Customized treatment plans tailored to your specific needs</p>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl">
                <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-clinic-medical text-white text-2xl"></i>
                </div>
                <h4 class="font-bold text-lg mb-3">Modern Facility</h4>
                <p class="text-gray-700">State-of-the-art equipment in a comfortable environment</p>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl">
                <div class="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-heartbeat text-white text-2xl"></i>
                </div>
                <h4 class="font-bold text-lg mb-3">Holistic Approach</h4>
                <p class="text-gray-700">Combining multiple therapies for optimal healing results</p>
            </div>

            <div class="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-xl">
                <div class="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-map-marker-alt text-white text-2xl"></i>
                </div>
                <h4 class="font-bold text-lg mb-3">Prime Location</h4>
                <p class="text-gray-700">Conveniently located on Ajwa Road, Vadodara</p>
            </div>
        </div>
    </div>
</section>

<!-- CTA -->
<section class="py-20 bg-gradient-to-r from-blue-600 to-teal-500">
    <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold text-white mb-6">Ready to Experience Expert Care?</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Schedule your consultation with Dr. Subodh Kumar and take the first step towards a pain-free life</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/pages/contact" class="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                <i class="fas fa-calendar-check mr-2"></i>
                Book Appointment
            </a>
            <a href="tel:8160754633" class="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl border-2 border-white">
                <i class="fas fa-phone mr-2"></i>
                Call: 8160754633
            </a>
        </div>
    </div>
</section>`;

  await connection.execute(
    'UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?',
    [improvedContent, 'about-team']
  );

  console.log('✅ Improved About Team page with:');
  console.log('   - Removed duplicate sections');
  console.log('   - Fixed layout and structure');
  console.log('   - Enhanced visual hierarchy');
  console.log('   - Added better CTAs');
  console.log('   - Improved certifications display');
  console.log('   - Added comprehensive "Why Choose Us" section');

  await connection.end();
}

improveAboutTeamPage().catch(console.error);
