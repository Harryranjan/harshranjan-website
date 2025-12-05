const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function compactHeroSection() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎨 Making Hero Section Compact (One Viewport)...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // Find and replace hero section
    const heroStart = content.indexOf("<!-- Hero Section -->");
    const heroEnd = content.indexOf("</section>", heroStart) + 10;

    const newHeroSection = `<!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400 min-h-screen flex items-center overflow-hidden">
        <!-- Background Decorative Elements -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div class="absolute top-20 left-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 right-20 w-96 h-96 bg-teal-300 opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-8">
            <div class="grid lg:grid-cols-2 gap-8 items-center">
                <!-- Left Content -->
                <div class="text-white">
                    <!-- Badge -->
                    <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border border-white/30">
                        <i class="fas fa-star text-sm"></i>
                        Currently Accepting New Patients
                    </div>

                    <!-- Main Heading -->
                    <h1 class="text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight mb-4">
                        Expert Pain Relief & <span class="text-yellow-300">Rehabilitation in Vadodara</span>
                    </h1>

                    <!-- Description -->
                    <p class="text-base lg:text-lg text-blue-50 mb-6 leading-relaxed">
                        Comprehensive treatment for pain management, neurological rehabilitation, and post-surgery recovery.
                    </p>

                    <!-- Trust Badges -->
                    <div class="flex flex-wrap gap-3 mb-6">
                        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                            <i class="fas fa-check-circle text-yellow-300 text-sm"></i>
                            <span class="font-semibold text-xs">12+ Years Experience</span>
                        </div>
                        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                            <i class="fas fa-check-circle text-yellow-300 text-sm"></i>
                            <span class="font-semibold text-xs">MD & MPT Certified</span>
                        </div>
                        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                            <i class="fas fa-check-circle text-yellow-300 text-sm"></i>
                            <span class="font-semibold text-xs">Holistic Approach</span>
                        </div>
                    </div>

                    <!-- CTA Buttons -->
                    <div class="flex flex-wrap gap-3 mb-6">
                        <a href="/pages/contact" class="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 text-sm">
                            <i class="fas fa-calendar-check"></i>
                            Book Free Consultation
                        </a>
                        <a href="tel:8160754633" class="bg-transparent text-white px-6 py-2.5 rounded-lg font-bold border-2 border-white hover:bg-white hover:text-blue-600 transition-all inline-flex items-center gap-2 text-sm">
                            <i class="fas fa-phone-alt"></i>
                            8160754633
                        </a>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                            <div class="flex items-center gap-2">
                                <div class="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-users text-blue-600 text-lg"></i>
                                </div>
                                <div>
                                    <div class="text-xl font-bold">500+</div>
                                    <div class="text-xs text-blue-100">Patients Treated</div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                            <div class="flex items-center gap-2">
                                <div class="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-star text-blue-600 text-lg"></i>
                                </div>
                                <div>
                                    <div class="text-xl font-bold">4.8 <span class="text-sm">/5</span></div>
                                    <div class="text-xs text-blue-100">Google Reviews</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side - Quick Consultation Card -->
                <div>
                    <div class="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                        <!-- Card Header -->
                        <div class="flex items-start gap-3 mb-4">
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <i class="fas fa-hospital-alt text-white text-xl"></i>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl font-bold text-gray-900 mb-0.5">Pain Therapy Centre</h3>
                                <p class="text-gray-600 text-xs">Expert Care in Vadodara</p>
                            </div>
                        </div>

                        <!-- Quick Consultation Box -->
                        <div class="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-4 mb-4 border border-blue-100">
                            <div class="flex items-center gap-2">
                                <div class="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-comment-medical text-white text-sm"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-900">Quick Consultation</h4>
                                    <p class="text-xs text-gray-600">Schedule your visit today</p>
                                </div>
                            </div>
                        </div>

                        <!-- Contact Information -->
                        <div class="space-y-3 mb-4">
                            <!-- Call Now -->
                            <a href="tel:8160754633" class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all group">
                                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                                    <i class="fas fa-phone-alt text-white text-sm"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="text-xs text-gray-600">Call Now</div>
                                    <div class="font-bold text-gray-900">8160754633</div>
                                </div>
                            </a>

                            <!-- Location -->
                            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <div class="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-map-marker-alt text-white text-sm"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="text-xs text-gray-600">Location</div>
                                    <div class="font-semibold text-gray-900 text-sm">Ajwa Road, Vadodara</div>
                                </div>
                            </div>

                            <!-- Timings -->
                            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-clock text-white text-sm"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="text-xs text-gray-600">Open</div>
                                    <div class="font-semibold text-gray-900 text-sm">Tue - Sun: 10 AM - 1 PM</div>
                                </div>
                            </div>
                        </div>

                        <!-- Book Appointment Button -->
                        <a href="/pages/contact" class="block w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white text-center py-3 rounded-xl font-bold hover:from-blue-700 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl text-sm">
                            Book Appointment →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

    content =
      content.substring(0, heroStart) +
      newHeroSection +
      content.substring(heroEnd);

    // Update the database
    await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
      content,
      "home",
    ]);

    console.log("✅ Hero section compacted successfully!");
    console.log("\n🎯 Changes made:");
    console.log(
      "   - Changed min-h-[600px] to min-h-screen with flex items-center"
    );
    console.log(
      "   - Reduced all padding and margins (py-8, mb-4, mb-6, gap-3)"
    );
    console.log("   - Smaller text sizes (text-3xl lg:text-4xl xl:text-5xl)");
    console.log("   - Compact badges (text-xs, py-1.5, px-3)");
    console.log("   - Smaller buttons (py-2.5, text-sm)");
    console.log("   - Compact stats cards (p-3, text-xl)");
    console.log("   - Smaller consultation card (p-6, rounded-2xl)");
    console.log("   - Reduced contact info spacing (space-y-3, p-3)");
    console.log("   ✨ Everything fits in one viewport now!");
  } catch (error) {
    console.error("❌ Error compacting hero section:", error.message);
  } finally {
    await connection.end();
  }
}

compactHeroSection();
