const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function makeAboutCompact() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎨 Making About Section Compact & Premium...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // Find and replace About section
    const aboutStart = content.indexOf("<!-- About Dr. Subodh Kumar -->");
    const aboutEnd = content.indexOf("</section>", aboutStart) + 10;

    const newAboutSection = `<!-- About Dr. Subodh Kumar -->
    <section class="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-8">
                <div class="inline-flex items-center gap-2 text-blue-600 font-semibold mb-2 text-sm">
                    <i class="fas fa-user-md"></i>
                    <span>Meet Your Doctor</span>
                </div>
                <h2 class="text-3xl font-extrabold text-gray-900 mb-2">Expert Care You Can Trust</h2>
                <p class="text-base text-gray-600">Experience compassionate, evidence-based pain relief treatment</p>
            </div>

            <div class="grid lg:grid-cols-2 gap-8 items-start">
                <!-- Left: Doctor Image -->
                <div>
                    <div class="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden shadow-xl">
                        <img src="/images/transform_any_image_with_ai_for_free_t53lvoea0zh2ahgjvshw.png" alt="Dr. Subodh Kumar" class="w-full h-auto object-cover">
                    </div>
                </div>

                <!-- Right: Doctor Info -->
                <div class="space-y-4">
                    <!-- Doctor Name & Badges -->
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-3">Dr. Subodh Kumar</h3>
                        <div class="flex flex-wrap gap-2 mb-4">
                            <div class="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-semibold text-xs">
                                <i class="fas fa-user-md text-sm"></i>
                                MD (Acupuncture)
                            </div>
                            <div class="inline-flex items-center gap-1.5 bg-teal-100 text-teal-700 px-3 py-1.5 rounded-full font-semibold text-xs">
                                <i class="fas fa-heartbeat text-sm"></i>
                                Pain Specialist
                            </div>
                            <div class="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full font-semibold text-xs">
                                <i class="fas fa-award text-sm"></i>
                                7+ Years
                            </div>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="text-gray-700 leading-relaxed space-y-3 text-sm">
                        <p>Dr. Subodh Kumar is a highly qualified pain management specialist with over 7 years of clinical experience in treating chronic pain, neurological disorders, and post-operative rehabilitation. His approach combines traditional acupuncture with modern physiotherapy techniques to deliver comprehensive, patient-centered care.</p>
                        
                        <p>Specializing in non-invasive pain relief methods, Dr. Kumar has successfully treated hundreds of patients suffering from back pain, arthritis, sports injuries, and nerve-related conditions. His holistic treatment philosophy focuses on identifying root causes rather than just managing symptoms, ensuring long-term relief and improved quality of life.</p>
                        
                        <p>With advanced training in traditional Chinese medicine and modern rehabilitation protocols, he provides personalized treatment plans tailored to each patient's unique needs and recovery goals.</p>
                    </div>

                    <!-- Specialties Grid -->
                    <div class="grid grid-cols-2 gap-3">
                        <div class="flex items-center gap-2">
                            <div class="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-syringe text-blue-600 text-sm"></i>
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-xs">Acupuncture</div>
                                <div class="text-xs text-gray-600">Traditional therapy</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-hand-holding-medical text-teal-600 text-sm"></i>
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-xs">Pain Relief</div>
                                <div class="text-xs text-gray-600">Chronic relief</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-brain text-orange-600 text-sm"></i>
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-xs">Neuro Rehab</div>
                                <div class="text-xs text-gray-600">Recovery</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-procedures text-purple-600 text-sm"></i>
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-xs">Post-Op Care</div>
                                <div class="text-xs text-gray-600">After surgery</div>
                            </div>
                        </div>
                    </div>

                    <!-- Stats Row -->
                    <div class="grid grid-cols-4 gap-2">
                        <div class="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
                            <div class="text-xl font-bold text-blue-600">7+</div>
                            <div class="text-xs text-gray-600 font-medium">Years</div>
                        </div>
                        <div class="bg-teal-50 rounded-lg p-3 text-center border border-teal-100">
                            <div class="text-xl font-bold text-teal-600">500+</div>
                            <div class="text-xs text-gray-600 font-medium">Patients</div>
                        </div>
                        <div class="bg-orange-50 rounded-lg p-3 text-center border border-orange-100">
                            <div class="text-xl font-bold text-orange-600">95%</div>
                            <div class="text-xs text-gray-600 font-medium">Success</div>
                        </div>
                        <div class="bg-green-50 rounded-lg p-3 text-center border border-green-100">
                            <div class="text-xl font-bold text-green-600">4.8★</div>
                            <div class="text-xs text-gray-600 font-medium">Rating</div>
                        </div>
                    </div>

                    <!-- Success Stories Banner -->
                    <div class="bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl p-5 text-white shadow-lg">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-award text-white text-xl"></i>
                            </div>
                            <div>
                                <div class="text-xl font-bold">500+ Success Stories</div>
                                <div class="text-xs text-blue-100">Trusted across Vadodara</div>
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

    console.log("✅ About section made compact & premium!");
    console.log("\n🎯 Compact changes:");
    console.log("   - Section padding: py-16 → py-12");
    console.log("   - Header margin: mb-12 → mb-8");
    console.log("   - Title size: text-4xl → text-3xl");
    console.log("   - Subtitle: text-lg → text-base");
    console.log("   - Doctor name: text-3xl → text-2xl");
    console.log(
      "   - Badge padding: px-4 py-2 → px-3 py-1.5, text-sm → text-xs"
    );
    console.log("   - Description: text-base → text-sm, space-y-4 → space-y-3");
    console.log("   - Specialty icons: w-10 h-10 → w-9 h-9");
    console.log("   - Specialty text: text-sm → text-xs");
    console.log(
      "   - Stats: text-2xl → text-xl, p-4 → p-3, rounded-xl → rounded-lg"
    );
    console.log(
      "   - Banner: p-6 → p-5, text-2xl → text-xl, rounded-2xl → rounded-xl"
    );
    console.log("   - Grid gap: gap-12 → gap-8");
    console.log("   - Space-y: space-y-6 → space-y-4");
    console.log("   ✨ More compact, cleaner, premium look!");
  } catch (error) {
    console.error("❌ Error making about section compact:", error.message);
  } finally {
    await connection.end();
  }
}

makeAboutCompact();
