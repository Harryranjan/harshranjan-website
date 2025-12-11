const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const correctImageAbout = `
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
                    <!-- Stats Badge Overlay -->
                    <div class="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                        <div class="flex items-center gap-2">
                            <div class="w-7 h-7 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-award text-white text-xs"></i>
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-xs">500+ Success Stories</div>
                                <div class="text-xs text-gray-600">Trusted across Vadodara</div>
                            </div>
                        </div>
                    </div>
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
                        <!-- Compact Description Paragraph -->
                        <p class="text-xs text-gray-600 leading-relaxed mb-2">
                            Dr. Subodh Kumar is a highly qualified pain management specialist with over 7 years of clinical experience in treating chronic pain, neurological disorders, and post-operative rehabilitation. His approach combines traditional acupuncture with modern medicine to deliver comprehensive, patient-centered care.
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
                    <div class="grid grid-cols-4 gap-1.5">
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
                </div>
            </div>
        </div>

        <!-- Minimal Why Choose CTA -->
        <div class="bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl p-5 text-white text-center shadow-xl">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-6 text-sm">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-user-shield text-lg"></i>
                        <span class="font-semibold">Personalized Care</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-certificate text-lg"></i>
                        <span class="font-semibold">95% Success Rate</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-hands-helping text-lg"></i>
                        <span class="font-semibold">Holistic Approach</span>
                    </div>
                </div>
                <a href="/pages/contact" class="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2 rounded-lg font-bold hover:bg-yellow-300 hover:text-blue-900 transition-all shadow-lg whitespace-nowrap text-sm">
                    <i class="fas fa-calendar-check"></i>
                    Book Consultation
                </a>
            </div>
        </div>
    </div>
</section>`;

async function fixImage() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🖼️  Fixing Image Path...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let currentContent = page[0].content;

    const aboutStartIndex = currentContent.indexOf(
      "<!-- Ultra Compact About Section"
    );
    const quickContactIndex = currentContent.indexOf("<!-- Quick Contact Bar");

    if (aboutStartIndex > -1 && quickContactIndex > -1) {
      const beforeAbout = currentContent.substring(0, aboutStartIndex);
      const afterAbout = currentContent.substring(quickContactIndex);

      const newContent = beforeAbout + correctImageAbout + "\n\n" + afterAbout;

      await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
        newContent,
        "home",
      ]);

      console.log("========================================");
      console.log("✅ IMAGE PATH FIXED!");
      console.log("========================================\n");

      console.log("🖼️  CHANGE:\n");
      console.log("Image:");
      console.log("  ✓ Back to: transform_any_image_with_ai_for_free.png");
      console.log("  ✓ Height: 240px (compact)");
      console.log("  ✓ Same compact layout maintained\n");

      console.log("========================================");
      console.log("Correct image restored! 🎯");
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

fixImage();
