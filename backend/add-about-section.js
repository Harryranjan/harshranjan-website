const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const aboutSection = `
<!-- About Section - Meet Our Doctors -->
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12">
            <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <i class="fas fa-user-md"></i>
                Meet Our Expert Team
            </div>
            <h2 class="text-4xl font-extrabold text-gray-900 mb-4">
                Your Path to Recovery Starts Here
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                Led by experienced medical professionals dedicated to providing personalized care and comprehensive rehabilitation solutions.
            </p>
        </div>

        <!-- Doctors Grid -->
        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <!-- Dr. Subodh Kumar -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <div class="aspect-square overflow-hidden bg-gradient-to-br from-blue-100 to-teal-100">
                    <img src="/images/WhatsApp Image 2025-12-04 at 00.24.43_0965a1c9.jpg" 
                         alt="Dr. Subodh Kumar" 
                         class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">Dr. Subodh Kumar</h3>
                    <p class="text-blue-600 font-semibold mb-4">MD (Acupuncture)</p>
                    <div class="space-y-3 text-gray-700">
                        <div class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-green-500 mt-1"></i>
                            <p>7+ years of specialized experience in pain management</p>
                        </div>
                        <div class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-green-500 mt-1"></i>
                            <p>Expert in acupuncture and holistic pain relief techniques</p>
                        </div>
                        <div class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-green-500 mt-1"></i>
                            <p>Specialized in chronic pain and neurological conditions</p>
                        </div>
                    </div>
                    <div class="mt-6 pt-6 border-t border-gray-200">
                        <div class="flex items-center gap-2 text-sm text-gray-600">
                            <i class="fas fa-graduation-cap text-blue-600"></i>
                            <span>MD (Acupuncture), Pain Management Specialist</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dr. J.K. Tiwari -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <div class="aspect-square overflow-hidden bg-gradient-to-br from-teal-100 to-blue-100">
                    <img src="/images/WhatsApp Image 2025-12-04 at 00.24.44_8e91fcce.jpg" 
                         alt="Dr. J.K. Tiwari" 
                         class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">Dr. J.K. Tiwari</h3>
                    <p class="text-teal-600 font-semibold mb-4">BPT (Bachelor of Physiotherapy)</p>
                    <div class="space-y-3 text-gray-700">
                        <div class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-green-500 mt-1"></i>
                            <p>Expert in post-operative rehabilitation and recovery</p>
                        </div>
                        <div class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-green-500 mt-1"></i>
                            <p>Specialized in manual therapy and spinal manipulation</p>
                        </div>
                        <div class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-green-500 mt-1"></i>
                            <p>Advanced training in sports injury rehabilitation</p>
                        </div>
                    </div>
                    <div class="mt-6 pt-6 border-t border-gray-200">
                        <div class="flex items-center gap-2 text-sm text-gray-600">
                            <i class="fas fa-graduation-cap text-teal-600"></i>
                            <span>BPT, Rehabilitation & Manual Therapy Expert</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Stats Bar -->
        <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div class="text-center p-4 bg-white rounded-lg shadow">
                <div class="text-3xl font-bold text-blue-600 mb-1">7+</div>
                <div class="text-sm text-gray-600">Years Experience</div>
            </div>
            <div class="text-center p-4 bg-white rounded-lg shadow">
                <div class="text-3xl font-bold text-teal-600 mb-1">500+</div>
                <div class="text-sm text-gray-600">Patients Treated</div>
            </div>
            <div class="text-center p-4 bg-white rounded-lg shadow">
                <div class="text-3xl font-bold text-orange-600 mb-1">95%</div>
                <div class="text-sm text-gray-600">Success Rate</div>
            </div>
            <div class="text-center p-4 bg-white rounded-lg shadow">
                <div class="text-3xl font-bold text-green-600 mb-1">4.8/5</div>
                <div class="text-sm text-gray-600">Patient Rating</div>
            </div>
        </div>

        <!-- CTA -->
        <div class="mt-12 text-center">
            <a href="/pages/contact" class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <i class="fas fa-calendar-check"></i>
                Schedule Your Consultation Today
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>`;

async function addAboutSection() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n👨‍⚕️ Adding About Section with Doctor Photos...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let currentContent = page[0].content;
    const quickContactIndex = currentContent.indexOf("<!-- Quick Contact Bar");

    if (quickContactIndex > -1) {
      const heroEndIndex = quickContactIndex;
      const heroSection = currentContent.substring(0, heroEndIndex);
      const restOfContent = currentContent.substring(heroEndIndex);

      const newContent = heroSection + aboutSection + "\n\n" + restOfContent;

      await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
        newContent,
        "home",
      ]);

      console.log("========================================");
      console.log("✅ ABOUT SECTION ADDED!");
      console.log("========================================\n");

      console.log("👨‍⚕️ SECTION FEATURES:\n");
      console.log("Doctor Profiles:");
      console.log("  ✓ Dr. Subodh Kumar (MD ACU)");
      console.log("  ✓ Dr. J.K. Tiwari (BPT)");
      console.log("  ✓ Professional photos displayed");
      console.log("  ✓ Qualifications & expertise listed\n");

      console.log("Design:");
      console.log("  ✓ 2-column grid layout");
      console.log("  ✓ Hover effects on cards");
      console.log("  ✓ Stats bar with key metrics");
      console.log("  ✓ CTA button to contact page\n");

      console.log("Content:");
      console.log("  ✓ 7+ years experience");
      console.log("  ✓ 500+ patients treated");
      console.log("  ✓ 95% success rate");
      console.log("  ✓ 4.8/5 rating\n");

      console.log("========================================");
      console.log("Professional team showcase ready!");
      console.log("========================================\n");
    } else {
      console.log("⚠️  Could not find Quick Contact Bar marker");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

addAboutSection();
