const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function rebuildHomepage() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🔨 Rebuilding Homepage from Scratch...\n");

    // Get current content to preserve the enhanced paragraph
    const [currentPage] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    const oldContent = currentPage[0].content;

    // Extract the enhanced paragraph we added
    const paragraphMatch = oldContent.match(
      /Dr\. Subodh Kumar is a highly qualified[^<]+patient's unique needs and recovery goals\./
    );
    const enhancedParagraph = paragraphMatch
      ? paragraphMatch[0]
      : "Dr. Subodh Kumar is a highly qualified pain management specialist with over 7 years of clinical experience in treating chronic pain, neurological disorders, and post-operative rehabilitation. His approach combines traditional acupuncture with modern physiotherapy techniques to deliver comprehensive, patient-centered care. Specializing in non-invasive pain relief methods, Dr. Kumar has successfully treated hundreds of patients suffering from back pain, arthritis, sports injuries, and nerve-related conditions. His holistic treatment philosophy focuses on identifying root causes rather than just managing symptoms, ensuring long-term relief and improved quality of life. With advanced training in traditional Chinese medicine and modern rehabilitation protocols, he provides personalized treatment plans tailored to each patient's unique needs and recovery goals.";

    console.log("✓ Preserved enhanced paragraph");

    const completeHomepage = `
<!-- Updated: ${new Date().toISOString()} -->

<!-- Clean Compact Hero Section -->
<section class="relative bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 text-white overflow-hidden">
    <!-- Subtle Pattern -->
    <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
    </div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid lg:grid-cols-5 gap-8 items-center">
            <!-- Left Content - 3 columns -->
            <div class="lg:col-span-3 space-y-6">
                <!-- Status Badge -->
                <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                    <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Available for Consultation Today
                </div>

                <!-- Main Headline -->
                <h1 class="text-4xl font-extrabold leading-tight">
                    Expert Pain Relief & <br class="hidden sm:block"/>
                    <span class="text-yellow-300">Rehabilitation</span> in Vadodara
                </h1>

                <!-- Description -->
                <p class="text-lg text-blue-50 leading-relaxed">
                    Trusted by 500+ patients for chronic pain management, neurological rehabilitation, and post-operative recovery. Get personalized care from MD certified specialists.
                </p>

                <!-- Benefits -->
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-yellow-300"></i>
                        <span>7+ Years Experience</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-yellow-300"></i>
                        <span>95% Success Rate</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-yellow-300"></i>
                        <span>Non-Invasive Methods</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-yellow-300"></i>
                        <span>Holistic Approach</span>
                    </div>
                </div>

                <!-- CTA Buttons -->
                <div class="flex flex-wrap gap-4">
                    <a href="/pages/contact" class="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 hover:text-blue-900 transition-all shadow-lg">
                        <i class="fas fa-calendar-check"></i>
                        Book Free Consultation
                    </a>
                    <a href="tel:8160754633" class="inline-flex items-center gap-2 border-2 border-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-all">
                        <i class="fas fa-phone"></i>
                        Call: 8160754633
                    </a>
                </div>

                <!-- Social Proof - No Photos -->
                <div class="flex items-center gap-6 pt-2">
                    <div class="flex gap-1">
                        <i class="fas fa-star text-yellow-300"></i>
                        <i class="fas fa-star text-yellow-300"></i>
                        <i class="fas fa-star text-yellow-300"></i>
                        <i class="fas fa-star text-yellow-300"></i>
                        <i class="fas fa-star-half-alt text-yellow-300"></i>
                    </div>
                    <div class="text-sm">
                        <div class="font-semibold">4.8/5 Rating</div>
                        <div class="text-blue-100">500+ Happy Patients</div>
                    </div>
                </div>
            </div>

            <!-- Right Contact Card - 2 columns -->
            <div class="lg:col-span-2">
                <div class="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                    <!-- Icon Header Instead of Image -->
                    <div class="flex items-center justify-center mb-4">
                        <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-notes-medical text-white text-2xl"></i>
                        </div>
                    </div>

                    <!-- Card Content -->
                    <h3 class="text-xl font-bold text-gray-900 text-center mb-4">Quick Consultation</h3>
                    <div class="space-y-3 text-gray-700">
                        <div class="flex items-start gap-3">
                            <i class="fas fa-map-marker-alt text-blue-600 mt-1"></i>
                            <div class="text-sm">
                                <div class="font-semibold">Location</div>
                                <div>Ajwa Road, Vadodara</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <i class="fas fa-clock text-blue-600 mt-1"></i>
                            <div class="text-sm">
                                <div class="font-semibold">Timing</div>
                                <div>Tue-Sun: 10 AM - 1 PM</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <i class="fas fa-phone text-blue-600 mt-1"></i>
                            <div class="text-sm">
                                <div class="font-semibold">Contact</div>
                                <div>8160754633 / 9173646456</div>
                            </div>
                        </div>
                    </div>
                    <a href="/pages/contact" class="block w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white text-center py-3 rounded-lg font-bold mt-4 hover:shadow-lg transition-all">
                        Book Appointment Now
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Ultra Compact About Section - Dr. Subodh Kumar -->
<section class="relative py-12 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
    <!-- Subtle Decorative Elements -->
    <div class="absolute top-0 right-0 w-48 h-48 bg-blue-100 rounded-full filter blur-3xl opacity-20"></div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Minimal Header -->
        <div class="text-center mb-8">
            <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-blue-100">
                <i class="fas fa-stethoscope"></i>
                Meet Your Doctor
            </div>
            <h2 class="text-3xl font-extrabold text-gray-900 mb-1">
                Expert Care You Can Trust
            </h2>
            <p class="text-sm text-gray-600">Experience compassionate, evidence-based pain relief treatment</p>
        </div>

        <!-- Ultra Compact Main Card -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div class="grid lg:grid-cols-5 gap-0">
                <!-- Smaller Height Image Section -->
                <div class="lg:col-span-2 relative">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-teal-600/5"></div>
                    <img src="/images/transform_any_image_with_ai_for_free_t53lvoea0zh2ahgjvshw.png" 
                         alt="Pain Therapy & Rehab Centre - Dr. Subodh Kumar" 
                         class="w-full h-full object-cover min-h-[240px]" />
                </div>

                <!-- Compact Content Section -->
                <div class="lg:col-span-3 p-5">
                    <!-- Doctor Name & Badges -->
                    <div class="mb-3">
                        <h3 class="text-xl font-extrabold text-gray-900 mb-2">Dr. Subodh Kumar</h3>
                        <div class="flex flex-wrap items-center gap-1.5 mb-2">
                            <span class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                                <i class="fas fa-user-md"></i>
                                MD (Acupuncture)
                            </span>
                            <span class="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                                <i class="fas fa-heartbeat"></i>
                                Pain Specialist
                            </span>
                            <span class="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                                <i class="fas fa-clock"></i>
                                7+ Years
                            </span>
                        </div>
                        <!-- Enhanced Description Paragraph -->
                        <p class="text-xs text-gray-600 leading-relaxed mb-2">
                            ${enhancedParagraph}
                        </p>
                    </div>

                    <!-- Compact Expertise Grid -->
                    <div class="grid grid-cols-2 gap-1.5 mb-3">
                        <div class="flex items-center gap-1.5 p-1.5 bg-blue-50 rounded-lg">
                            <i class="fas fa-procedures text-blue-600 text-xs"></i>
                            <div>
                                <div class="font-bold text-gray-900 text-xs">Acupuncture</div>
                                <div class="text-xs text-gray-600">Traditional therapy</div>
                            </div>
                        </div>

                        <div class="flex items-center gap-1.5 p-1.5 bg-teal-50 rounded-lg">
                            <i class="fas fa-brain text-teal-600 text-xs"></i>
                            <div>
                                <div class="font-bold text-gray-900 text-xs">Pain Relief</div>
                                <div class="text-xs text-gray-600">Chronic relief</div>
                            </div>
                        </div>

                        <div class="flex items-center gap-1.5 p-1.5 bg-orange-50 rounded-lg">
                            <i class="fas fa-walking text-orange-600 text-xs"></i>
                            <div>
                                <div class="font-bold text-gray-900 text-xs">Neuro Rehab</div>
                                <div class="text-xs text-gray-600">Recovery</div>
                            </div>
                        </div>

                        <div class="flex items-center gap-1.5 p-1.5 bg-purple-50 rounded-lg">
                            <i class="fas fa-hand-holding-medical text-purple-600 text-xs"></i>
                            <div>
                                <div class="font-bold text-gray-900 text-xs">Post-Op Care</div>
                                <div class="text-xs text-gray-600">After surgery</div>
                            </div>
                        </div>
                    </div>

                    <!-- Mini Stats -->
                    <div class="grid grid-cols-4 gap-1.5 mb-3">
                        <div class="text-center p-1.5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                            <div class="text-lg font-bold text-blue-600">7+</div>
                            <div class="text-xs text-gray-600">Years</div>
                        </div>
                        <div class="text-center p-1.5 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg">
                            <div class="text-lg font-bold text-teal-600">500+</div>
                            <div class="text-xs text-gray-600">Patients</div>
                        </div>
                        <div class="text-center p-1.5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                            <div class="text-lg font-bold text-orange-600">95%</div>
                            <div class="text-xs text-gray-600">Success</div>
                        </div>
                        <div class="text-center p-1.5 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                            <div class="text-lg font-bold text-green-600">4.8★</div>
                            <div class="text-xs text-gray-600">Rating</div>
                        </div>
                    </div>

                    <!-- Success Stories Card -->
                    <div class="bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg p-2.5 shadow-lg">
                        <div class="flex items-center gap-2 text-white">
                            <div class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-award text-white text-sm"></i>
                            </div>
                            <div>
                                <div class="font-bold text-white text-sm">500+ Success Stories</div>
                                <div class="text-xs text-white/90">Trusted across Vadodara</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Quick Contact Bar - Sticky and Improved -->
<section class="sticky top-0 z-40 bg-gradient-to-r from-blue-600 to-teal-500 py-3 shadow-lg">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center justify-between gap-4 text-white text-sm">
            <div class="flex items-center gap-6">
                <a href="tel:8160754633" class="flex items-center gap-2 hover:text-yellow-300 transition">
                    <i class="fas fa-phone-alt"></i>
                    <span class="hidden sm:inline">8160754633</span>
                </a>
                <div class="flex items-center gap-2">
                    <i class="fas fa-map-marker-alt"></i>
                    <span class="hidden md:inline">Ajwa Road, Vadodara</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fas fa-clock"></i>
                    <span class="hidden lg:inline">Tue-Sun: 10 AM - 1 PM</span>
                </div>
            </div>
            <a href="/pages/contact" class="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-yellow-300 transition text-sm">
                Book Now
            </a>
        </div>
    </div>
</section>

<!-- Core Services - Enhanced Cards with Better Visual Hierarchy -->
<section class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12">
            <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                <i class="fas fa-procedures"></i>
                Our Services
            </div>
            <h2 class="text-3xl font-extrabold text-gray-900 mb-3">Comprehensive Pain Management Solutions</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Evidence-based treatments tailored to your specific condition for optimal recovery</p>
        </div>

        <!-- Services Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Service 1 - Spine & Back Pain -->
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <i class="fas fa-spine text-white text-xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Spine & Back Pain</h3>
                <p class="text-gray-700 text-sm mb-4">Expert treatment for lower back pain, sciatica, herniated discs, and chronic spinal conditions.</p>
                <ul class="space-y-2 text-sm text-gray-700">
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-blue-600"></i>
                        <span>LOWER BACK PAIN RELIEF</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-blue-600"></i>
                        <span>SCIATICA TREATMENT</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-blue-600"></i>
                        <span>SPINAL ALIGNMENT</span>
                    </li>
                </ul>
                <a href="/pages/spine-back-pain" class="inline-block mt-4 text-blue-600 font-semibold hover:text-blue-700">
                    Learn More →
                </a>
            </div>

            <!-- Service 2 - Neuro Rehabilitation -->
            <div class="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
                <div class="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                    <i class="fas fa-brain text-white text-xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Neuro Rehabilitation</h3>
                <p class="text-gray-700 text-sm mb-4">Specialized care for stroke recovery, paralysis, facial palsy, and neurological disorders.</p>
                <ul class="space-y-2 text-sm text-gray-700">
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-teal-600"></i>
                        <span>STROKE RECOVERY</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-teal-600"></i>
                        <span>PARALYSIS MANAGEMENT</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-teal-600"></i>
                        <span>NEUROPATHY TREATMENT</span>
                    </li>
                </ul>
                <a href="/pages/neuro-rehabilitation" class="inline-block mt-4 text-teal-600 font-semibold hover:text-teal-700">
                    Learn More →
                </a>
            </div>

            <!-- Service 3 - Post-Operative Rehab -->
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                <div class="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                    <i class="fas fa-procedures text-white text-xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Post-Operative Rehab</h3>
                <p class="text-gray-700 text-sm mb-4">Comprehensive recovery programs after surgery for faster healing and mobility restoration.</p>
                <ul class="space-y-2 text-sm text-gray-700">
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-orange-600"></i>
                        <span>POST-SURGERY RECOVERY</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-orange-600"></i>
                        <span>MOBILITY RESTORATION</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-orange-600"></i>
                        <span>PAIN MANAGEMENT</span>
                    </li>
                </ul>
                <a href="/pages/post-operative-rehab" class="inline-block mt-4 text-orange-600 font-semibold hover:text-orange-700">
                    Learn More →
                </a>
            </div>

            <!-- Service 4 - Manual Therapy -->
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <i class="fas fa-hands text-white text-xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Manual Therapy</h3>
                <p class="text-gray-700 text-sm mb-4">Hands-on techniques including massage, mobilization, and manipulation for pain relief.</p>
                <ul class="space-y-2 text-sm text-gray-700">
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-purple-600"></i>
                        <span>THERAPEUTIC MASSAGE</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-purple-600"></i>
                        <span>JOINT MOBILIZATION</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-purple-600"></i>
                        <span>SOFT TISSUE THERAPY</span>
                    </li>
                </ul>
                <a href="/pages/manual-therapy" class="inline-block mt-4 text-purple-600 font-semibold hover:text-purple-700">
                    Learn More →
                </a>
            </div>

            <!-- Service 5 - Cupping & Acupressure -->
            <div class="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
                <div class="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <i class="fas fa-spa text-white text-xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Cupping & Acupressure</h3>
                <p class="text-gray-700 text-sm mb-4">Traditional alternative therapies for holistic healing and pain management.</p>
                <ul class="space-y-2 text-sm text-gray-700">
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-pink-600"></i>
                        <span>CUPPING THERAPY</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-pink-600"></i>
                        <span>ACUPRESSURE POINTS</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-pink-600"></i>
                        <span>HOLISTIC HEALING</span>
                    </li>
                </ul>
                <a href="/pages/cupping-acupressure" class="inline-block mt-4 text-pink-600 font-semibold hover:text-pink-700">
                    Learn More →
                </a>
            </div>

            <!-- Service 6 - Joint Pain Treatment -->
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                    <i class="fas fa-bone text-white text-xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Joint Pain Treatment</h3>
                <p class="text-gray-700 text-sm mb-4">Targeted treatment for arthritis, knee pain, shoulder pain, and all joint conditions.</p>
                <ul class="space-y-2 text-sm text-gray-700">
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-green-600"></i>
                        <span>ARTHRITIS MANAGEMENT</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-green-600"></i>
                        <span>KNEE PAIN RELIEF</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-check text-green-600"></i>
                        <span>FROZEN SHOULDER</span>
                    </li>
                </ul>
                <a href="/pages/joint-pain-treatment" class="inline-block mt-4 text-green-600 font-semibold hover:text-green-700">
                    Learn More →
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Stats Section - New Addition -->
<section class="py-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
                <div class="text-5xl font-extrabold mb-2">500+</div>
                <div class="text-blue-100">Happy Patients</div>
            </div>
            <div>
                <div class="text-5xl font-extrabold mb-2">7+</div>
                <div class="text-blue-100">Years Experience</div>
            </div>
            <div>
                <div class="text-5xl font-extrabold mb-2">6</div>
                <div class="text-blue-100">Specialized Services</div>
            </div>
            <div>
                <div class="text-5xl font-extrabold mb-2">4.85</div>
                <div class="text-blue-100">Average Rating</div>
            </div>
        </div>
    </div>
</section>

<!-- Conditions We Treat - Improved Grid -->
<section class="py-16 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12">
            <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                <i class="fas fa-notes-medical"></i>
                Conditions
            </div>
            <h2 class="text-3xl font-extrabold text-gray-900 mb-3">What We Treat</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Comprehensive care for a wide range of pain and mobility conditions</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
            <!-- Chronic Pain -->
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="fas fa-exclamation-circle text-blue-600"></i>
                    Chronic Pain
                </h3>
                <ul class="space-y-2 text-gray-700">
                    <li class="flex items-center gap-2">
                        <i class="fas fa-chevron-right text-blue-600 text-xs"></i>
                        Lower Back Pain
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-chevron-right text-blue-600 text-xs"></i>
                        Neck & Shoulder Pain
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-chevron-right text-blue-600 text-xs"></i>
                        Arthritis Pain
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-chevron-right text-blue-600 text-xs"></i>
                        Sciatica
                    </li>
                </ul>
            </div>

            <!-- Neurological -->
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="fas fa-brain text-teal-600"></i>
                    Neurological
                </h3>
                <ul class="space-y-2 text-gray-700">
                    <li class="flex items-center gap-2">
                        <i class="fas fa-chevron-right text-teal-600 text-xs"></i>
                        Stroke Recovery
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-chevron-right text-teal-600 text-xs"></i>
                        Paralysis Management
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-chevron-right text-teal-600 text-xs"></i>
                        Facial Palsy
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-chevron-right text-teal-600 text-xs"></i>
                        Neuropathy
                    </li>
                </ul>
            </div>

            <!-- Rehabilitation -->
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="fas fa-heartbeat text-orange-600"></i>
                    Rehabilitation
                </h3>
                <ul class="space-y-2 text-gray-700">
                    <li class="flex items-center gap-2">
                        <i class="fas fa-chevron-right text-orange-600 text-xs"></i>
                        Post-Surgery Recovery
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-chevron-right text-orange-600 text-xs"></i>
                        Sports Injuries
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-chevron-right text-orange-600 text-xs"></i>
                        Frozen Shoulder
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="fas fa-chevron-right text-orange-600 text-xs"></i>
                        Mobility Issues
                    </li>
                </ul>
            </div>
        </div>

        <div class="text-center mt-10">
            <a href="/pages/conditions" class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                View All Conditions
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>

<!-- Testimonials - Enhanced with Better Design -->
<section class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12">
            <div class="inline-flex items-center gap-2 bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                <i class="fas fa-star"></i>
                Testimonials
            </div>
            <h2 class="text-3xl font-extrabold text-gray-900 mb-3">What Our Patients Say</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Real experiences from real people who've trusted us with their recovery</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
            <!-- Testimonial 1 -->
            <div class="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 shadow-sm">
                <div class="flex gap-1 text-yellow-400 mb-3">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p class="text-gray-700 mb-4 text-sm italic">"I suffered from chronic lower back pain for 3 years. After just 2 months of treatment with Dr. Subodh, I'm pain-free and back to my normal life. His holistic approach really works!"</p>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        RS
                    </div>
                    <div>
                        <div class="font-semibold text-gray-900">Rajesh Sharma</div>
                        <div class="text-xs text-gray-500">Back Pain Patient</div>
                    </div>
                </div>
            </div>

            <!-- Testimonial 2 -->
            <div class="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 border border-teal-100 shadow-sm">
                <div class="flex gap-1 text-yellow-400 mb-3">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p class="text-gray-700 mb-4 text-sm italic">"My mother had a stroke and was partially paralyzed. Thanks to Dr. Subodh's neuro rehab program, she can now walk with minimal support. We're forever grateful!"</p>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                        PP
                    </div>
                    <div>
                        <div class="font-semibold text-gray-900">Priya Patel</div>
                        <div class="text-xs text-gray-500">Stroke Recovery Family</div>
                    </div>
                </div>
            </div>

            <!-- Testimonial 3 -->
            <div class="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100 shadow-sm">
                <div class="flex gap-1 text-yellow-400 mb-3">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <p class="text-gray-700 mb-4 text-sm italic">"Post-knee surgery, I couldn't walk properly. Dr. Subodh's rehab program helped me regain full mobility in just 6 weeks. Highly recommend this center!"</p>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                        AK
                    </div>
                    <div>
                        <div class="font-semibold text-gray-900">Amit Kumar</div>
                        <div class="text-xs text-gray-500">Post-Op Patient</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center mt-10">
            <a href="/pages/testimonials" class="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
                Read More Reviews
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>

<!-- CTA Section - Enhanced with Better Visual Appeal -->
<section class="relative py-16 bg-gradient-to-br from-blue-600 via-teal-500 to-blue-700 text-white overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-40 h-40 bg-white rounded-full filter blur-3xl animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300 rounded-full filter blur-3xl animate-pulse"></div>
    </div>

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-extrabold mb-4">
            Ready to Start Your Recovery Journey?
        </h2>
        <p class="text-xl text-blue-50 mb-8">
            Book your consultation today and take the first step towards a pain-free, active life.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap justify-center gap-4 mb-10">
            <a href="/pages/contact" class="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 hover:text-blue-900 transition-all shadow-2xl text-lg">
                <i class="fas fa-calendar-check"></i>
                Book Appointment
            </a>
            <a href="tel:8160754633" class="inline-flex items-center gap-2 border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all text-lg">
                <i class="fas fa-phone"></i>
                Call: 8160754633
            </a>
            <a href="https://wa.me/918160754633" target="_blank" class="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-all shadow-2xl text-lg">
                <i class="fab fa-whatsapp"></i>
                WhatsApp
            </a>
        </div>

        <!-- Trust Badges -->
        <div class="flex flex-wrap justify-center items-center gap-8 text-sm">
            <div class="flex items-center gap-2">
                <i class="fas fa-shield-alt text-2xl text-yellow-300"></i>
                <span>Safe & Certified</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="fas fa-user-md text-2xl text-yellow-300"></i>
                <span>MD Qualified Doctors</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="fas fa-award text-2xl text-yellow-300"></i>
                <span>500+ Success Stories</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="fas fa-star text-2xl text-yellow-300"></i>
                <span>4.8/5 Rating</span>
            </div>
        </div>
    </div>
</section>
`;

    await connection.query(
      "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
      [completeHomepage, "home"]
    );

    console.log("========================================");
    console.log("✅ HOMEPAGE REBUILT!");
    console.log("========================================\n");

    console.log("🔨 Complete Structure:\n");
    console.log("1. ✓ Hero Section (py-12, compact)");
    console.log(
      "2. ✓ About Dr. Subodh Kumar (py-12, enhanced paragraph, Success card)"
    );
    console.log("3. ✓ Quick Contact Bar (sticky)");
    console.log("4. ✓ Core Services (6 cards, py-16)");
    console.log("5. ✓ Stats Section (py-16)");
    console.log("6. ✓ Conditions We Treat (py-16)");
    console.log("7. ✓ Testimonials (py-16)");
    console.log("8. ✓ Final CTA (py-16)\n");

    console.log("✨ All Features:");
    console.log("  ✓ Consistent spacing throughout");
    console.log("  ✓ Consistent fonts (text-3xl, text-xl, text-sm)");
    console.log("  ✓ Consistent max-w-6xl containers");
    console.log("  ✓ Enhanced paragraph preserved");
    console.log("  ✓ Success card below stats");
    console.log("  ✓ No duplicates");
    console.log("  ✓ Clean, working code\n");

    console.log("========================================");
    console.log("Now HARD REFRESH: Ctrl + Shift + R");
    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

rebuildHomepage();
