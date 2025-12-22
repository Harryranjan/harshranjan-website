const mysql = require('mysql2/promise');

async function improveConditionsPage() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'harsh_ranjan_website'
  });

  const improvedContent = `<!-- Hero Section -->
<section class="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
    <div class="container mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/30">
            <i class="fas fa-heartbeat"></i>
            <span>Comprehensive Treatment Solutions</span>
        </div>
        <h1 class="text-5xl font-bold mb-4">Conditions We Treat</h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">Expert care for a wide range of pain, mobility, and neurological conditions with proven results</p>
    </div>
</section>

<!-- Quick Stats -->
<section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center p-6 bg-blue-50 rounded-xl">
                <div class="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div class="text-sm text-gray-600 font-medium">Conditions Treated</div>
            </div>
            <div class="text-center p-6 bg-teal-50 rounded-xl">
                <div class="text-4xl font-bold text-teal-600 mb-2">7+</div>
                <div class="text-sm text-gray-600 font-medium">Therapy Types</div>
            </div>
            <div class="text-center p-6 bg-green-50 rounded-xl">
                <div class="text-4xl font-bold text-green-600 mb-2">95%</div>
                <div class="text-sm text-gray-600 font-medium">Success Rate</div>
            </div>
            <div class="text-center p-6 bg-purple-50 rounded-xl">
                <div class="text-4xl font-bold text-purple-600 mb-2">500+</div>
                <div class="text-sm text-gray-600 font-medium">Patients Helped</div>
            </div>
        </div>
    </div>
</section>

<!-- Main Content -->
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Spine & Back Conditions -->
        <div class="mb-16">
            <div class="flex items-center gap-4 mb-8">
                <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <i class="fas fa-spine text-3xl text-blue-600"></i>
                </div>
                <div>
                    <h2 class="text-3xl font-bold text-gray-900">Spine & Back Conditions</h2>
                    <p class="text-gray-600">Specialized treatment for chronic and acute back problems</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-blue-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Low Back Pain</h3>
                            <p class="text-sm text-gray-600 mb-3">Acute or chronic lumbar pain affecting daily activities</p>
                            <span class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Most Common</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-blue-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Sciatica</h3>
                            <p class="text-sm text-gray-600 mb-3">Nerve pain radiating from lower back to leg</p>
                            <span class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">High Success Rate</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-blue-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Neck Pain</h3>
                            <p class="text-sm text-gray-600">Cervical pain and stiffness from poor posture or injury</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-blue-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Cervical Spondylosis</h3>
                            <p class="text-sm text-gray-600">Age-related neck disc degeneration</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-blue-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Herniated Disc</h3>
                            <p class="text-sm text-gray-600">Slipped disc causing nerve compression</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-blue-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Spondylolisthesis</h3>
                            <p class="text-sm text-gray-600">Vertebra slipping out of position</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Joint & Arthritis Conditions -->
        <div class="mb-16">
            <div class="flex items-center gap-4 mb-8">
                <div class="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center">
                    <i class="fas fa-joint text-3xl text-teal-600"></i>
                </div>
                <div>
                    <h2 class="text-3xl font-bold text-gray-900">Joint & Arthritis Conditions</h2>
                    <p class="text-gray-600">Restore mobility and reduce joint inflammation</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-teal-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-teal-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Knee Pain</h3>
                            <p class="text-sm text-gray-600">Osteoarthritis and ligament injuries</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-teal-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-teal-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Shoulder Pain</h3>
                            <p class="text-sm text-gray-600">Frozen shoulder and rotator cuff issues</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-teal-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-teal-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Rheumatoid Arthritis</h3>
                            <p class="text-sm text-gray-600">Autoimmune joint inflammation</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-teal-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-teal-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Hip Pain</h3>
                            <p class="text-sm text-gray-600">Bursitis and hip joint disorders</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-teal-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-teal-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Ankle & Foot Pain</h3>
                            <p class="text-sm text-gray-600">Plantar fasciitis and sprains</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-teal-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-teal-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Wrist & Hand Pain</h3>
                            <p class="text-sm text-gray-600">Carpal tunnel and tendonitis</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Neurological Conditions -->
        <div class="mb-16">
            <div class="flex items-center gap-4 mb-8">
                <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <i class="fas fa-brain text-3xl text-purple-600"></i>
                </div>
                <div>
                    <h2 class="text-3xl font-bold text-gray-900">Neurological Conditions</h2>
                    <p class="text-gray-600">Specialized rehabilitation for nerve disorders</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-purple-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Stroke Recovery</h3>
                            <p class="text-sm text-gray-600">Post-stroke rehabilitation therapy</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-purple-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Paralysis</h3>
                            <p class="text-sm text-gray-600">Hemiplegia and paraplegia treatment</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-purple-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Neuropathy</h3>
                            <p class="text-sm text-gray-600">Peripheral nerve damage and numbness</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-purple-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Parkinson's Disease</h3>
                            <p class="text-sm text-gray-600">Movement disorder rehabilitation</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-purple-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Bell's Palsy</h3>
                            <p class="text-sm text-gray-600">Facial paralysis recovery</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-purple-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Multiple Sclerosis</h3>
                            <p class="text-sm text-gray-600">Chronic neurological care</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sports Injuries -->
        <div class="mb-16">
            <div class="flex items-center gap-4 mb-8">
                <div class="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <i class="fas fa-running text-3xl text-orange-600"></i>
                </div>
                <div>
                    <h2 class="text-3xl font-bold text-gray-900">Sports Injuries</h2>
                    <p class="text-gray-600">Get back to your game with expert rehabilitation</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-orange-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-orange-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Ligament Tears</h3>
                            <p class="text-sm text-gray-600">ACL, MCL, and other ligament injuries</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-orange-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-orange-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Muscle Strains</h3>
                            <p class="text-sm text-gray-600">Hamstring and calf injuries</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-orange-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-orange-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Tennis Elbow</h3>
                            <p class="text-sm text-gray-600">Lateral epicondylitis treatment</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Post-Surgery Rehabilitation -->
        <div class="mb-16">
            <div class="flex items-center gap-4 mb-8">
                <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                    <i class="fas fa-procedures text-3xl text-green-600"></i>
                </div>
                <div>
                    <h2 class="text-3xl font-bold text-gray-900">Post-Surgery Rehabilitation</h2>
                    <p class="text-gray-600">Accelerate recovery after surgical procedures</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-green-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-green-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Knee Replacement</h3>
                            <p class="text-sm text-gray-600">Total and partial knee replacement recovery</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-green-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-green-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Hip Replacement</h3>
                            <p class="text-sm text-gray-600">Post-operative hip surgery rehab</p>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-green-500">
                    <div class="flex items-start gap-4">
                        <i class="fas fa-check-circle text-2xl text-green-500 mt-1"></i>
                        <div>
                            <h3 class="font-bold text-lg mb-2">Spinal Surgery</h3>
                            <p class="text-sm text-gray-600">Back surgery rehabilitation</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>

<!-- Treatment Approach -->
<section class="py-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold mb-4">Our Treatment Approach</h2>
            <p class="text-xl text-blue-100">Evidence-based therapy tailored to your condition</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center">
                <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-clipboard-check text-4xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-2">1. Assessment</h3>
                <p class="text-sm text-blue-100">Comprehensive evaluation of your condition</p>
            </div>
            <div class="text-center">
                <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-tasks text-4xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-2">2. Custom Plan</h3>
                <p class="text-sm text-blue-100">Personalized treatment strategy</p>
            </div>
            <div class="text-center">
                <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-hands-helping text-4xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-2">3. Treatment</h3>
                <p class="text-sm text-blue-100">Evidence-based therapy sessions</p>
            </div>
            <div class="text-center">
                <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-chart-line text-4xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-2">4. Progress</h3>
                <p class="text-sm text-blue-100">Regular monitoring and adjustments</p>
            </div>
        </div>
    </div>
</section>

<!-- Don't See Your Condition -->
<section class="py-16 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-12 border border-blue-100">
            <i class="fas fa-question-circle text-5xl text-blue-600 mb-6"></i>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Don't See Your Condition Listed?</h2>
            <p class="text-lg text-gray-600 mb-8">We treat many more conditions! Contact us to discuss how we can help with your specific needs.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/pages/contact" class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
                    <i class="fas fa-calendar-check mr-2"></i>
                    Book Consultation
                </a>
                <a href="tel:8160754633" class="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl border-2 border-blue-600">
                    <i class="fas fa-phone mr-2"></i>
                    Call: 8160754633
                </a>
            </div>
        </div>
    </div>
</section>`;

  await connection.execute(
    'UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?',
    [improvedContent, 'conditions-we-treat']
  );

  console.log('✅ Improved Conditions We Treat page with better UI/UX!');
  await connection.end();
}

improveConditionsPage().catch(console.error);
