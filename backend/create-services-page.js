const mysql = require("mysql2/promise");

async function createServicesPage() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  const servicesContent = `<!-- Hero Section -->
<section class="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
    <div class="container mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/30">
            <i class="fas fa-heartbeat"></i>
            <span>Comprehensive Care</span>
        </div>
        <h1 class="text-5xl font-bold mb-4">Our Services</h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">Expert pain management and rehabilitation services tailored to your needs</p>
    </div>
</section>

<!-- Quick Stats -->
<section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center p-6 bg-blue-50 rounded-xl">
                <div class="text-4xl font-bold text-blue-600 mb-2">10+</div>
                <div class="text-sm text-gray-600 font-medium">Treatment Types</div>
            </div>
            <div class="text-center p-6 bg-teal-50 rounded-xl">
                <div class="text-4xl font-bold text-teal-600 mb-2">7+</div>
                <div class="text-sm text-gray-600 font-medium">Therapy Methods</div>
            </div>
            <div class="text-center p-6 bg-green-50 rounded-xl">
                <div class="text-4xl font-bold text-green-600 mb-2">500+</div>
                <div class="text-sm text-gray-600 font-medium">Patients Treated</div>
            </div>
            <div class="text-center p-6 bg-purple-50 rounded-xl">
                <div class="text-4xl font-bold text-purple-600 mb-2">98%</div>
                <div class="text-sm text-gray-600 font-medium">Success Rate</div>
            </div>
        </div>
    </div>
</section>

<!-- Main Services Grid -->
<section class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Specialized Treatment Services</h2>
            <p class="text-xl text-gray-600">Evidence-based therapies for comprehensive healing</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <!-- Service 1: Physiotherapy -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                    <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                        <i class="fas fa-walking text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold">Physiotherapy</h3>
                </div>
                <div class="p-6">
                    <p class="text-gray-600 mb-4">Manual therapy and exercise-based treatment for pain relief and mobility restoration.</p>
                    <ul class="space-y-2 mb-6">
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-blue-600 mt-1"></i>
                            <span>Manual therapy techniques</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-blue-600 mt-1"></i>
                            <span>Exercise prescription</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-blue-600 mt-1"></i>
                            <span>Posture correction</span>
                        </li>
                    </ul>
                    <a href="/pages/contact" class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>

            <!-- Service 2: Neurotherapy -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                <div class="bg-gradient-to-br from-teal-500 to-teal-600 p-6 text-white">
                    <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                        <i class="fas fa-brain text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold">Neurotherapy</h3>
                </div>
                <div class="p-6">
                    <p class="text-gray-600 mb-4">Advanced nerve rehabilitation for neurological conditions and nerve-related pain.</p>
                    <ul class="space-y-2 mb-6">
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-teal-600 mt-1"></i>
                            <span>Nerve stimulation therapy</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-teal-600 mt-1"></i>
                            <span>Neuropathy treatment</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-teal-600 mt-1"></i>
                            <span>Nerve pain management</span>
                        </li>
                    </ul>
                    <a href="/pages/neuro-paralysis-rehab" class="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>

            <!-- Service 3: Acupressure & Sujok -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                <div class="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
                    <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                        <i class="fas fa-hand-holding-medical text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold">Acupressure & Sujok</h3>
                </div>
                <div class="p-6">
                    <p class="text-gray-600 mb-4">Traditional healing techniques for pain relief and holistic wellness.</p>
                    <ul class="space-y-2 mb-6">
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-green-600 mt-1"></i>
                            <span>Pressure point therapy</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-green-600 mt-1"></i>
                            <span>Sujok seed therapy</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-green-600 mt-1"></i>
                            <span>Energy balancing</span>
                        </li>
                    </ul>
                    <a href="/pages/contact" class="inline-flex items-center text-green-600 font-semibold hover:text-green-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>

            <!-- Service 4: Pain Management -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
                    <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                        <i class="fas fa-band-aid text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold">Pain Management</h3>
                </div>
                <div class="p-6">
                    <p class="text-gray-600 mb-4">Comprehensive chronic pain treatment using multiple therapeutic approaches.</p>
                    <ul class="space-y-2 mb-6">
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-purple-600 mt-1"></i>
                            <span>Chronic pain relief</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-purple-600 mt-1"></i>
                            <span>Headache & migraine treatment</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-purple-600 mt-1"></i>
                            <span>Joint pain therapy</span>
                        </li>
                    </ul>
                    <a href="/pages/contact" class="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>

            <!-- Service 5: Stroke Rehabilitation -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                <div class="bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
                    <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                        <i class="fas fa-heartbeat text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold">Stroke Rehabilitation</h3>
                </div>
                <div class="p-6">
                    <p class="text-gray-600 mb-4">Specialized recovery programs for stroke survivors and paralysis patients.</p>
                    <ul class="space-y-2 mb-6">
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-orange-600 mt-1"></i>
                            <span>Motor function recovery</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-orange-600 mt-1"></i>
                            <span>Balance & gait training</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-orange-600 mt-1"></i>
                            <span>Speech & swallowing therapy</span>
                        </li>
                    </ul>
                    <a href="/pages/neuro-paralysis-rehab" class="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>

            <!-- Service 6: Sports Injury -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                <div class="bg-gradient-to-br from-red-500 to-red-600 p-6 text-white">
                    <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                        <i class="fas fa-running text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold">Sports Injury</h3>
                </div>
                <div class="p-6">
                    <p class="text-gray-600 mb-4">Expert treatment for athletes and active individuals to return to peak performance.</p>
                    <ul class="space-y-2 mb-6">
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-red-600 mt-1"></i>
                            <span>Ligament & tendon repair</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-red-600 mt-1"></i>
                            <span>Sports-specific rehab</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-red-600 mt-1"></i>
                            <span>Performance optimization</span>
                        </li>
                    </ul>
                    <a href="/pages/contact" class="inline-flex items-center text-red-600 font-semibold hover:text-red-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>

            <!-- Service 7: Arthritis Treatment -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                <div class="bg-gradient-to-br from-pink-500 to-pink-600 p-6 text-white">
                    <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                        <i class="fas fa-joint text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold">Arthritis Treatment</h3>
                </div>
                <div class="p-6">
                    <p class="text-gray-600 mb-4">Comprehensive care for all types of arthritis and joint inflammation.</p>
                    <ul class="space-y-2 mb-6">
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-pink-600 mt-1"></i>
                            <span>Pain & inflammation reduction</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-pink-600 mt-1"></i>
                            <span>Joint mobility improvement</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-pink-600 mt-1"></i>
                            <span>Lifestyle management</span>
                        </li>
                    </ul>
                    <a href="/pages/joint-pain-arthritis-treatment" class="inline-flex items-center text-pink-600 font-semibold hover:text-pink-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>

            <!-- Service 8: Post-Surgery Rehabilitation -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                <div class="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 text-white">
                    <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                        <i class="fas fa-procedures text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold">Post-Surgery Rehab</h3>
                </div>
                <div class="p-6">
                    <p class="text-gray-600 mb-4">Accelerate recovery after orthopedic and neurological surgeries.</p>
                    <ul class="space-y-2 mb-6">
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-indigo-600 mt-1"></i>
                            <span>Knee & hip replacement rehab</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-indigo-600 mt-1"></i>
                            <span>Spinal surgery recovery</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-indigo-600 mt-1"></i>
                            <span>Strength & function restoration</span>
                        </li>
                    </ul>
                    <a href="/pages/contact" class="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>

            <!-- Service 9: Back & Spine Care -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
                <div class="bg-gradient-to-br from-cyan-500 to-cyan-600 p-6 text-white">
                    <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                        <i class="fas fa-spine text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold">Back & Spine Care</h3>
                </div>
                <div class="p-6">
                    <p class="text-gray-600 mb-4">Specialized treatment for spinal conditions and chronic back pain.</p>
                    <ul class="space-y-2 mb-6">
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-cyan-600 mt-1"></i>
                            <span>Sciatica treatment</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-cyan-600 mt-1"></i>
                            <span>Disc herniation therapy</span>
                        </li>
                        <li class="flex items-start gap-2 text-sm">
                            <i class="fas fa-check text-cyan-600 mt-1"></i>
                            <span>Spondylosis management</span>
                        </li>
                    </ul>
                    <a href="/pages/contact" class="inline-flex items-center text-cyan-600 font-semibold hover:text-cyan-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Treatment Approach -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Our Treatment Approach</h2>
            <p class="text-xl text-gray-600">A systematic process for optimal healing and recovery</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div class="text-center">
                <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span class="text-3xl font-bold text-blue-600">1</span>
                </div>
                <h3 class="text-xl font-bold mb-3">Assessment</h3>
                <p class="text-gray-600">Comprehensive evaluation of your condition, medical history, and recovery goals</p>
            </div>

            <div class="text-center">
                <div class="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span class="text-3xl font-bold text-teal-600">2</span>
                </div>
                <h3 class="text-xl font-bold mb-3">Custom Plan</h3>
                <p class="text-gray-600">Personalized treatment strategy combining multiple therapeutic approaches</p>
            </div>

            <div class="text-center">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span class="text-3xl font-bold text-green-600">3</span>
                </div>
                <h3 class="text-xl font-bold mb-3">Treatment</h3>
                <p class="text-gray-600">Evidence-based therapy sessions with continuous progress monitoring</p>
            </div>

            <div class="text-center">
                <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span class="text-3xl font-bold text-purple-600">4</span>
                </div>
                <h3 class="text-xl font-bold mb-3">Recovery</h3>
                <p class="text-gray-600">Long-term wellness support and prevention strategies for sustained health</p>
            </div>
        </div>
    </div>
</section>

<!-- Why Choose Us -->
<section class="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
            <p class="text-xl text-gray-600">Expert care that makes a difference</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div class="bg-white p-8 rounded-xl shadow-lg">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-user-md text-blue-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Expert Specialist</h3>
                <p class="text-gray-600">MPT (Neurology) qualified with 7+ years of clinical experience</p>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-lg">
                <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-check-circle text-teal-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Proven Results</h3>
                <p class="text-gray-600">98% success rate with 500+ satisfied patients</p>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-lg">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-certificate text-green-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Certified Excellence</h3>
                <p class="text-gray-600">7+ professional certifications in specialized therapies</p>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-lg">
                <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-hospital text-purple-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Modern Facility</h3>
                <p class="text-gray-600">State-of-the-art equipment and comfortable environment</p>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-lg">
                <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-clock text-orange-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Flexible Timings</h3>
                <p class="text-gray-600">Convenient appointment slots to fit your schedule</p>
            </div>

            <div class="bg-white p-8 rounded-xl shadow-lg">
                <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-hand-holding-heart text-pink-600 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Personalized Care</h3>
                <p class="text-gray-600">Individual attention and customized treatment plans</p>
            </div>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="py-20 bg-gradient-to-r from-blue-600 to-teal-500">
    <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold text-white mb-6">Ready to Start Your Healing Journey?</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Book a consultation today and experience expert care that makes a real difference</p>
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

  // Check if services page exists
  const [existing] = await connection.execute(
    "SELECT id FROM pages WHERE slug = ?",
    ["services"]
  );

  if (existing.length > 0) {
    // Update existing page
    await connection.execute(
      "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
      [servicesContent, "services"]
    );
    console.log("✅ Updated existing Services page");
  } else {
    // Create new page
    await connection.execute(
      `INSERT INTO pages (title, slug, content, template, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      ["Our Services", "services", servicesContent, "custom", "published"]
    );
    console.log("✅ Created new Services page");
  }

  console.log("\nServices page includes:");
  console.log("   - 9 comprehensive service cards");
  console.log("   - Treatment approach workflow");
  console.log("   - Why choose us section");
  console.log("   - Quick stats display");
  console.log("   - Strong CTAs");

  await connection.end();
}

createServicesPage().catch(console.error);
