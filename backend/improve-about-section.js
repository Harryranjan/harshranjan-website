const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const improvedAboutSection = `
<!-- Enhanced About Section - Dr. Subodh Kumar -->
<section class="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
    <!-- Decorative Elements -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
            <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-blue-100">
                <i class="fas fa-stethoscope"></i>
                Meet Your Doctor
            </div>
            <h2 class="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                Expert Care You Can Trust
            </h2>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience compassionate, evidence-based treatment from a dedicated pain management specialist
            </p>
        </div>

        <!-- Main Profile Card -->
        <div class="max-w-6xl mx-auto mb-16">
            <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div class="grid lg:grid-cols-2 gap-0">
                    <!-- Image Side -->
                    <div class="relative lg:order-1">
                        <div class="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-teal-600/10"></div>
                        <img src="/images/WhatsApp Image 2025-12-04 at 00.24.43_0965a1c9.jpg" 
                             alt="Dr. Subodh Kumar - Pain Management Specialist" 
                             class="w-full h-full object-cover min-h-[500px]" />
                        <!-- Floating Badge -->
                        <div class="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                            <div class="flex items-center gap-4">
                                <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-award text-white text-2xl"></i>
                                </div>
                                <div>
                                    <div class="font-bold text-gray-900 text-lg">500+ Success Stories</div>
                                    <div class="text-sm text-gray-600">Trusted by patients across Vadodara</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Content Side -->
                    <div class="p-8 lg:p-12 lg:order-2">
                        <!-- Header -->
                        <div class="mb-8">
                            <h3 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
                                Dr. Subodh Kumar
                            </h3>
                            <div class="flex flex-wrap items-center gap-3 mb-4">
                                <span class="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                                    <i class="fas fa-user-md"></i>
                                    MD (Acupuncture)
                                </span>
                                <span class="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full font-semibold">
                                    <i class="fas fa-heartbeat"></i>
                                    Pain Specialist
                                </span>
                            </div>
                            <p class="text-lg text-gray-600 leading-relaxed">
                                With over 7 years of dedicated experience, Dr. Subodh Kumar combines traditional healing methods with modern medical practices to deliver exceptional patient outcomes.
                            </p>
                        </div>

                        <!-- Expertise Cards -->
                        <div class="space-y-4 mb-8">
                            <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-xl hover:shadow-md transition-shadow">
                                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-procedures text-white"></i>
                                </div>
                                <div>
                                    <div class="font-bold text-gray-900 mb-1">Acupuncture & Traditional Therapy</div>
                                    <div class="text-sm text-gray-600">Expert in needle therapy, cupping, and acupressure techniques</div>
                                </div>
                            </div>

                            <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-teal-50 to-transparent rounded-xl hover:shadow-md transition-shadow">
                                <div class="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-brain text-white"></i>
                                </div>
                                <div>
                                    <div class="font-bold text-gray-900 mb-1">Chronic Pain Management</div>
                                    <div class="text-sm text-gray-600">Specialized treatment for persistent back, neck, and joint pain</div>
                                </div>
                            </div>

                            <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-transparent rounded-xl hover:shadow-md transition-shadow">
                                <div class="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-walking text-white"></i>
                                </div>
                                <div>
                                    <div class="font-bold text-gray-900 mb-1">Neurological Rehabilitation</div>
                                    <div class="text-sm text-gray-600">Recovery programs for stroke, paralysis, and nerve conditions</div>
                                </div>
                            </div>

                            <div class="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-transparent rounded-xl hover:shadow-md transition-shadow">
                                <div class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-hand-holding-medical text-white"></i>
                                </div>
                                <div>
                                    <div class="font-bold text-gray-900 mb-1">Post-Operative Care</div>
                                    <div class="text-sm text-gray-600">Comprehensive rehabilitation after surgery or injury</div>
                                </div>
                            </div>
                        </div>

                        <!-- Credentials -->
                        <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <i class="fas fa-graduation-cap text-blue-600 text-2xl"></i>
                            <div>
                                <div class="font-semibold text-gray-900">Professional Qualifications</div>
                                <div class="text-sm text-gray-600">MD (Acupuncture) • Pain Management Certification • 7+ Years Clinical Experience</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
            <div class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border-t-4 border-blue-500">
                <div class="text-4xl lg:text-5xl font-extrabold text-blue-600 mb-2">7+</div>
                <div class="text-sm font-semibold text-gray-600">Years of Experience</div>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border-t-4 border-teal-500">
                <div class="text-4xl lg:text-5xl font-extrabold text-teal-600 mb-2">500+</div>
                <div class="text-sm font-semibold text-gray-600">Happy Patients</div>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border-t-4 border-orange-500">
                <div class="text-4xl lg:text-5xl font-extrabold text-orange-600 mb-2">95%</div>
                <div class="text-sm font-semibold text-gray-600">Success Rate</div>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center border-t-4 border-green-500">
                <div class="flex items-center justify-center gap-1 mb-2">
                    <span class="text-4xl lg:text-5xl font-extrabold text-green-600">4.8</span>
                    <i class="fas fa-star text-yellow-400 text-2xl"></i>
                </div>
                <div class="text-sm font-semibold text-gray-600">Patient Rating</div>
            </div>
        </div>

        <!-- Why Choose Section -->
        <div class="bg-gradient-to-br from-blue-600 to-teal-500 rounded-3xl p-8 lg:p-12 text-white text-center shadow-2xl">
            <h3 class="text-3xl font-bold mb-6">Why Choose Dr. Subodh Kumar?</h3>
            <div class="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-user-shield text-3xl"></i>
                    </div>
                    <h4 class="font-bold text-xl mb-2">Personalized Care</h4>
                    <p class="text-blue-50">Every treatment plan is customized to your specific needs and goals</p>
                </div>
                <div>
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-certificate text-3xl"></i>
                    </div>
                    <h4 class="font-bold text-xl mb-2">Proven Results</h4>
                    <p class="text-blue-50">95% success rate with evidence-based treatment methods</p>
                </div>
                <div>
                    <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-hands-helping text-3xl"></i>
                    </div>
                    <h4 class="font-bold text-xl mb-2">Holistic Approach</h4>
                    <p class="text-blue-50">Combining traditional and modern therapies for optimal healing</p>
                </div>
            </div>
            <a href="/pages/contact" class="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 hover:text-blue-900 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <i class="fas fa-calendar-check"></i>
                Book Your Consultation
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>`;

async function improveAboutSection() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n✨ Improving About Section UI/UX...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let currentContent = page[0].content;

    // Find the about section and replace it
    const aboutStartIndex = currentContent.indexOf("<!-- About Section");
    const quickContactIndex = currentContent.indexOf("<!-- Quick Contact Bar");

    if (aboutStartIndex > -1 && quickContactIndex > -1) {
      const beforeAbout = currentContent.substring(0, aboutStartIndex);
      const afterAbout = currentContent.substring(quickContactIndex);

      const newContent =
        beforeAbout + improvedAboutSection + "\n\n" + afterAbout;

      await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
        newContent,
        "home",
      ]);

      console.log("========================================");
      console.log("✅ ABOUT SECTION IMPROVED!");
      console.log("========================================\n");

      console.log("🎨 UI/UX IMPROVEMENTS:\n");
      console.log("Visual Design:");
      console.log("  ✓ Gradient backgrounds with blur effects");
      console.log("  ✓ 3D card shadows and hover effects");
      console.log("  ✓ Floating badge on doctor image");
      console.log("  ✓ Color-coded expertise cards\n");

      console.log("Layout:");
      console.log("  ✓ 50/50 split (image + content)");
      console.log("  ✓ Better spacing and padding");
      console.log("  ✓ Responsive grid for stats");
      console.log("  ✓ Modern rounded corners (3xl)\n");

      console.log("Content:");
      console.log("  ✓ 4 color-coded expertise areas");
      console.log("  ✓ Professional badges (MD, Specialist)");
      console.log("  ✓ Stats with border accents");
      console.log("  ✓ 'Why Choose' CTA section\n");

      console.log("Interactive Elements:");
      console.log("  ✓ Hover effects on cards");
      console.log("  ✓ Animated CTA button");
      console.log("  ✓ Icon-based visual hierarchy");
      console.log("  ✓ Decorative background elements\n");

      console.log("========================================");
      console.log("Premium professional appearance!");
      console.log("========================================\n");
    } else {
      console.log("⚠️  Could not find About section markers");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

improveAboutSection();
