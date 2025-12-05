const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const compactPremiumAbout = `
<!-- Compact Premium About Section - Dr. Subodh Kumar -->
<section class="relative py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
    <!-- Subtle Decorative Elements -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-20"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-teal-100 rounded-full filter blur-3xl opacity-20"></div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Compact Header -->
        <div class="text-center mb-10">
            <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 border border-blue-100">
                <i class="fas fa-stethoscope"></i>
                Meet Your Doctor
            </div>
            <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
                Expert Care You Can Trust
            </h2>
            <p class="text-gray-600 max-w-xl mx-auto">
                Experience compassionate, evidence-based pain relief treatment
            </p>
        </div>

        <!-- Compact Main Card -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
            <div class="grid lg:grid-cols-5 gap-0">
                <!-- Compact Image Side -->
                <div class="lg:col-span-2 relative">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-teal-600/5"></div>
                    <img src="/images/WhatsApp Image 2025-12-04 at 00.24.43_0965a1c9.jpg" 
                         alt="Dr. Subodh Kumar" 
                         class="w-full h-full object-cover min-h-[400px]" />
                    <!-- Compact Badge -->
                    <div class="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-award text-white text-lg"></i>
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-sm">500+ Success Stories</div>
                                <div class="text-xs text-gray-600">Trusted across Vadodara</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Compact Content Side -->
                <div class="lg:col-span-3 p-6 lg:p-8">
                    <!-- Header -->
                    <div class="mb-6">
                        <h3 class="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
                            Dr. Subodh Kumar
                        </h3>
                        <div class="flex flex-wrap items-center gap-2 mb-3">
                            <span class="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                <i class="fas fa-user-md text-sm"></i>
                                MD (Acupuncture)
                            </span>
                            <span class="inline-flex items-center gap-1.5 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold">
                                <i class="fas fa-heartbeat text-sm"></i>
                                Pain Specialist
                            </span>
                        </div>
                        <p class="text-sm text-gray-600 leading-relaxed">
                            7+ years combining traditional healing with modern medicine for exceptional patient outcomes.
                        </p>
                    </div>

                    <!-- Compact Expertise Grid -->
                    <div class="grid grid-cols-2 gap-3 mb-6">
                        <div class="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                            <i class="fas fa-procedures text-blue-600 mt-0.5"></i>
                            <div>
                                <div class="font-bold text-gray-900 text-xs mb-0.5">Acupuncture</div>
                                <div class="text-xs text-gray-600">Traditional therapy</div>
                            </div>
                        </div>

                        <div class="flex items-start gap-2 p-3 bg-teal-50 rounded-lg">
                            <i class="fas fa-brain text-teal-600 mt-0.5"></i>
                            <div>
                                <div class="font-bold text-gray-900 text-xs mb-0.5">Pain Management</div>
                                <div class="text-xs text-gray-600">Chronic relief</div>
                            </div>
                        </div>

                        <div class="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                            <i class="fas fa-walking text-orange-600 mt-0.5"></i>
                            <div>
                                <div class="font-bold text-gray-900 text-xs mb-0.5">Neuro Rehab</div>
                                <div class="text-xs text-gray-600">Recovery programs</div>
                            </div>
                        </div>

                        <div class="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
                            <i class="fas fa-hand-holding-medical text-purple-600 mt-0.5"></i>
                            <div>
                                <div class="font-bold text-gray-900 text-xs mb-0.5">Post-Op Care</div>
                                <div class="text-xs text-gray-600">After surgery</div>
                            </div>
                        </div>
                    </div>

                    <!-- Compact Stats -->
                    <div class="grid grid-cols-4 gap-3">
                        <div class="text-center p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                            <div class="text-2xl font-bold text-blue-600">7+</div>
                            <div class="text-xs text-gray-600">Years</div>
                        </div>
                        <div class="text-center p-2 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg">
                            <div class="text-2xl font-bold text-teal-600">500+</div>
                            <div class="text-xs text-gray-600">Patients</div>
                        </div>
                        <div class="text-center p-2 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                            <div class="text-2xl font-bold text-orange-600">95%</div>
                            <div class="text-xs text-gray-600">Success</div>
                        </div>
                        <div class="text-center p-2 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                            <div class="text-2xl font-bold text-green-600">4.8★</div>
                            <div class="text-xs text-gray-600">Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Compact Why Choose CTA -->
        <div class="bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl p-6 lg:p-8 text-white text-center shadow-xl">
            <h3 class="text-2xl font-bold mb-4">Why Choose Dr. Subodh Kumar?</h3>
            <div class="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                <div>
                    <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-user-shield text-xl"></i>
                    </div>
                    <div class="font-semibold mb-1">Personalized Care</div>
                    <p class="text-xs text-blue-50">Customized treatment plans</p>
                </div>
                <div>
                    <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-certificate text-xl"></i>
                    </div>
                    <div class="font-semibold mb-1">Proven Results</div>
                    <p class="text-xs text-blue-50">95% success rate</p>
                </div>
                <div>
                    <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                        <i class="fas fa-hands-helping text-xl"></i>
                    </div>
                    <div class="font-semibold mb-1">Holistic Approach</div>
                    <p class="text-xs text-blue-50">Traditional + Modern</p>
                </div>
            </div>
            <a href="/pages/contact" class="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 hover:text-blue-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <i class="fas fa-calendar-check"></i>
                Book Your Consultation
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>`;

async function makeCompactPremium() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n💎 Making About Section Compact & Premium...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let currentContent = page[0].content;

    const aboutStartIndex = currentContent.indexOf(
      "<!-- Enhanced About Section"
    );
    const quickContactIndex = currentContent.indexOf("<!-- Quick Contact Bar");

    if (aboutStartIndex > -1 && quickContactIndex > -1) {
      const beforeAbout = currentContent.substring(0, aboutStartIndex);
      const afterAbout = currentContent.substring(quickContactIndex);

      const newContent =
        beforeAbout + compactPremiumAbout + "\n\n" + afterAbout;

      await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
        newContent,
        "home",
      ]);

      console.log("========================================");
      console.log("✅ COMPACT PREMIUM DESIGN APPLIED!");
      console.log("========================================\n");

      console.log("💎 PREMIUM CHANGES:\n");
      console.log("Size Reduction:");
      console.log("  ✓ Padding: py-20 → py-16 (20% smaller)");
      console.log("  ✓ Card padding: p-12 → p-8 (33% smaller)");
      console.log("  ✓ Image height: 500px → 400px");
      console.log("  ✓ Text sizes reduced across board\n");

      console.log("Layout:");
      console.log("  ✓ 40/60 split (image/content)");
      console.log("  ✓ 2x2 expertise grid (was 4 rows)");
      console.log("  ✓ Inline stats (4 columns compact)");
      console.log("  ✓ Tighter spacing everywhere\n");

      console.log("Typography:");
      console.log("  ✓ Heading: 4xl → 3xl");
      console.log("  ✓ Smaller badges and pills");
      console.log("  ✓ Condensed descriptions");
      console.log("  ✓ xs/sm text throughout\n");

      console.log("Premium Feel:");
      console.log("  ✓ Subtle gradients");
      console.log("  ✓ Refined shadows");
      console.log("  ✓ Compact but elegant");
      console.log("  ✓ Professional proportions\n");

      console.log("========================================");
      console.log("Compact, elegant, premium! 💎");
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

makeCompactPremium();
