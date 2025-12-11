const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const aboutSectionDrSubodh = `
<!-- About Section - Dr. Subodh Kumar -->
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12">
            <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <i class="fas fa-user-md"></i>
                Meet Your Doctor
            </div>
            <h2 class="text-4xl font-extrabold text-gray-900 mb-4">
                Your Path to Recovery Starts Here
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                Led by Dr. Subodh Kumar, an experienced medical professional dedicated to providing personalized care and comprehensive rehabilitation solutions.
            </p>
        </div>

        <!-- Doctor Profile -->
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div class="grid md:grid-cols-5 gap-0">
                    <!-- Doctor Image -->
                    <div class="md:col-span-2">
                        <div class="aspect-square overflow-hidden bg-gradient-to-br from-blue-100 to-teal-100">
                            <img src="/images/WhatsApp Image 2025-12-04 at 00.24.43_0965a1c9.jpg" 
                                 alt="Dr. Subodh Kumar" 
                                 class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                    </div>

                    <!-- Doctor Info -->
                    <div class="md:col-span-3 p-8 lg:p-10">
                        <div class="mb-6">
                            <h3 class="text-3xl font-bold text-gray-900 mb-2">Dr. Subodh Kumar</h3>
                            <p class="text-blue-600 font-semibold text-lg mb-1">MD (Acupuncture)</p>
                            <p class="text-gray-600">Pain Management Specialist</p>
                        </div>

                        <div class="space-y-4 mb-8">
                            <div class="flex items-start gap-3">
                                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <i class="fas fa-check text-white text-xs"></i>
                                </div>
                                <p class="text-gray-700">7+ years of specialized experience in pain management and rehabilitation</p>
                            </div>
                            <div class="flex items-start gap-3">
                                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <i class="fas fa-check text-white text-xs"></i>
                                </div>
                                <p class="text-gray-700">Expert in acupuncture, cupping therapy, and holistic pain relief techniques</p>
                            </div>
                            <div class="flex items-start gap-3">
                                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <i class="fas fa-check text-white text-xs"></i>
                                </div>
                                <p class="text-gray-700">Specialized in chronic pain, neurological conditions, and post-operative rehabilitation</p>
                            </div>
                            <div class="flex items-start gap-3">
                                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <i class="fas fa-check text-white text-xs"></i>
                                </div>
                                <p class="text-gray-700">Committed to providing personalized treatment plans for every patient</p>
                            </div>
                        </div>

                        <div class="pt-6 border-t border-gray-200">
                            <div class="flex items-center gap-3 text-gray-700">
                                <i class="fas fa-graduation-cap text-blue-600 text-xl"></i>
                                <div>
                                    <div class="font-semibold">Qualifications</div>
                                    <div class="text-sm text-gray-600">MD (Acupuncture), Pain Management Specialist</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Stats Bar -->
        <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div class="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div class="text-4xl font-bold text-blue-600 mb-2">7+</div>
                <div class="text-sm text-gray-600 font-medium">Years Experience</div>
            </div>
            <div class="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div class="text-4xl font-bold text-teal-600 mb-2">500+</div>
                <div class="text-sm text-gray-600 font-medium">Patients Treated</div>
            </div>
            <div class="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div class="text-4xl font-bold text-orange-600 mb-2">95%</div>
                <div class="text-sm text-gray-600 font-medium">Success Rate</div>
            </div>
            <div class="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div class="text-4xl font-bold text-green-600 mb-2">4.8/5</div>
                <div class="text-sm text-gray-600 font-medium">Patient Rating</div>
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

async function updateAboutSection() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n👨‍⚕️ Updating About Section - Dr. Subodh Kumar Only...\n");

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
        beforeAbout + aboutSectionDrSubodh + "\n\n" + afterAbout;

      await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
        newContent,
        "home",
      ]);

      console.log("========================================");
      console.log("✅ ABOUT SECTION UPDATED!");
      console.log("========================================\n");

      console.log("👨‍⚕️ CHANGES:\n");
      console.log("Focus:");
      console.log("  ✓ Only Dr. Subodh Kumar featured");
      console.log("  ✓ No other doctors mentioned");
      console.log("  ✓ Professional single-doctor layout\n");

      console.log("Design:");
      console.log("  ✓ Horizontal card (image left, info right)");
      console.log("  ✓ Large professional photo");
      console.log("  ✓ 4 key expertise points");
      console.log("  ✓ Stats bar with metrics\n");

      console.log("Content:");
      console.log("  ✓ MD (Acupuncture)");
      console.log("  ✓ Pain Management Specialist");
      console.log("  ✓ 7+ years experience highlighted");
      console.log("  ✓ CTA to contact page\n");

      console.log("========================================");
      console.log("Dr. Subodh Kumar featured exclusively!");
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

updateAboutSection();
