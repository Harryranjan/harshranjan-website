const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function matchAboutSection() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎨 Matching About Section to Screenshot EXACTLY...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // Find and replace About section
    const aboutStart = content.indexOf("<!-- About Dr. Subodh Kumar -->");
    const aboutEnd = content.indexOf("</section>", aboutStart) + 10;

    const newAboutSection = `<!-- About Dr. Subodh Kumar -->
    <section class="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-12">
                <div class="inline-flex items-center gap-2 text-blue-600 font-semibold mb-3">
                    <i class="fas fa-user-md text-xl"></i>
                    <span>Meet Your Doctor</span>
                </div>
                <h2 class="text-4xl font-extrabold text-gray-900 mb-3">Expert Care You Can Trust</h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">Experience compassionate, evidence-based pain relief treatment</p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 items-start">
                <!-- Left: Doctor Image -->
                <div>
                    <div class="bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-2xl">
                        <img src="/images/transform_any_image_with_ai_for_free.png" alt="Dr. Subodh Kumar" class="w-full h-auto object-cover">
                    </div>
                </div>

                <!-- Right: Doctor Info -->
                <div class="space-y-6">
                    <!-- Doctor Name & Badges -->
                    <div>
                        <h3 class="text-3xl font-bold text-gray-900 mb-4">Dr. Subodh Kumar</h3>
                        <div class="flex flex-wrap gap-3 mb-6">
                            <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm">
                                <i class="fas fa-user-md"></i>
                                MD (Acupuncture)
                            </div>
                            <div class="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full font-semibold text-sm">
                                <i class="fas fa-heartbeat"></i>
                                Pain Specialist
                            </div>
                            <div class="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold text-sm">
                                <i class="fas fa-award"></i>
                                7+ Years
                            </div>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="text-gray-700 leading-relaxed space-y-4">
                        <p>Dr. Subodh Kumar is a highly qualified pain management specialist with over 7 years of clinical experience in treating chronic pain, neurological disorders, and post-operative rehabilitation. His approach combines traditional acupuncture with modern physiotherapy techniques to deliver comprehensive, patient-centered care.</p>
                        
                        <p>Specializing in non-invasive pain relief methods, Dr. Kumar has successfully treated hundreds of patients suffering from back pain, arthritis, sports injuries, and nerve-related conditions. His holistic treatment philosophy focuses on identifying root causes rather than just managing symptoms, ensuring long-term relief and improved quality of life.</p>
                        
                        <p>With advanced training in traditional Chinese medicine and modern rehabilitation protocols, he provides personalized treatment plans tailored to each patient's unique needs and recovery goals.</p>
                    </div>

                    <!-- Specialties Grid -->
                    <div class="grid grid-cols-2 gap-4 pt-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-syringe text-blue-600"></i>
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-sm">Acupuncture</div>
                                <div class="text-xs text-gray-600">Traditional therapy</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-hand-holding-medical text-teal-600"></i>
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-sm">Pain Relief</div>
                                <div class="text-xs text-gray-600">Chronic relief</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-brain text-orange-600"></i>
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-sm">Neuro Rehab</div>
                                <div class="text-xs text-gray-600">Recovery</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-procedures text-purple-600"></i>
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-sm">Post-Op Care</div>
                                <div class="text-xs text-gray-600">After surgery</div>
                            </div>
                        </div>
                    </div>

                    <!-- Stats Row -->
                    <div class="grid grid-cols-4 gap-3 pt-6">
                        <div class="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                            <div class="text-2xl font-bold text-blue-600">7+</div>
                            <div class="text-xs text-gray-600 font-medium mt-1">Years</div>
                        </div>
                        <div class="bg-teal-50 rounded-xl p-4 text-center border border-teal-100">
                            <div class="text-2xl font-bold text-teal-600">500+</div>
                            <div class="text-xs text-gray-600 font-medium mt-1">Patients</div>
                        </div>
                        <div class="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
                            <div class="text-2xl font-bold text-orange-600">95%</div>
                            <div class="text-xs text-gray-600 font-medium mt-1">Success</div>
                        </div>
                        <div class="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                            <div class="text-2xl font-bold text-green-600">4.8★</div>
                            <div class="text-xs text-gray-600 font-medium mt-1">Rating</div>
                        </div>
                    </div>

                    <!-- Success Stories Banner -->
                    <div class="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-6 text-white shadow-xl mt-6">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-award text-white text-2xl"></i>
                            </div>
                            <div>
                                <div class="text-2xl font-bold">500+ Success Stories</div>
                                <div class="text-sm text-blue-100">Trusted across Vadodara</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

    content =
      content.substring(0, aboutStart) +
      newAboutSection +
      content.substring(aboutEnd);

    // Update the database
    await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
      content,
      "home",
    ]);

    console.log("✅ About section matched to screenshot EXACTLY!");
    console.log("\n🎯 Exact match details:");
    console.log("   ✓ Header: 'Meet Your Doctor' with icon");
    console.log("   ✓ Title: 'Expert Care You Can Trust'");
    console.log(
      "   ✓ Subtitle: 'Experience compassionate, evidence-based pain relief treatment'"
    );
    console.log("   ✓ Left: Doctor image in rounded card");
    console.log("   ✓ Right: Dr. Subodh Kumar heading");
    console.log(
      "   ✓ Badges: MD (Acupuncture) [blue], Pain Specialist [teal], 7+ Years [orange]"
    );
    console.log("   ✓ Three paragraph description (exactly as screenshot)");
    console.log(
      "   ✓ Four specialty boxes: Acupuncture, Pain Relief, Neuro Rehab, Post-Op Care"
    );
    console.log(
      "   ✓ Stats: 7+ Years, 500+ Patients, 95% Success, 4.8★ Rating"
    );
    console.log(
      "   ✓ Blue gradient banner: '500+ Success Stories - Trusted across Vadodara'"
    );
  } catch (error) {
    console.error("❌ Error matching about section:", error.message);
  } finally {
    await connection.end();
  }
}

matchAboutSection();
