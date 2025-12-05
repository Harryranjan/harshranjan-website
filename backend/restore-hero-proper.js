const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function restoreHeroSection() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎨 Restoring Hero Section to Match Screenshot...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // Find and replace hero section
    const heroStart = content.indexOf("<!-- Hero Section -->");
    const heroEnd = content.indexOf("</section>", heroStart) + 10;

    const newHeroSection = `<!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400 min-h-[600px] flex items-center overflow-hidden">
        <!-- Background Decorative Elements -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div class="absolute top-20 left-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 right-20 w-96 h-96 bg-teal-300 opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Left Content -->
                <div class="text-white py-12">
                    <!-- Badge -->
                    <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30">
                        <i class="fas fa-star"></i>
                        Currently Accepting New Patients
                    </div>

                    <!-- Main Heading -->
                    <h1 class="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
                        Expert Pain Relief & <span class="text-yellow-300">Rehabilitation in Vadodara</span>
                    </h1>

                    <!-- Description -->
                    <p class="text-lg lg:text-xl text-blue-50 mb-8 leading-relaxed max-w-xl">
                        Comprehensive treatment for pain management, neurological rehabilitation, and post-surgery recovery.
                    </p>

                    <!-- Trust Badges -->
                    <div class="flex flex-wrap gap-4 mb-8">
                        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                            <i class="fas fa-check-circle text-yellow-300"></i>
                            <span class="font-semibold text-sm">12+ Years Experience</span>
                        </div>
                        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                            <i class="fas fa-check-circle text-yellow-300"></i>
                            <span class="font-semibold text-sm">MD & MPT Certified</span>
                        </div>
                        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                            <i class="fas fa-check-circle text-yellow-300"></i>
                            <span class="font-semibold text-sm">Holistic Approach</span>
                        </div>
                    </div>

                    <!-- CTA Buttons -->
                    <div class="flex flex-wrap gap-4">
                        <a href="/pages/contact" class="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-flex items-center gap-2">
                            <i class="fas fa-calendar-check"></i>
                            Book Free Consultation
                        </a>
                        <a href="tel:8160754633" class="bg-transparent text-white px-8 py-4 rounded-xl font-bold border-2 border-white hover:bg-white hover:text-blue-600 transition-all inline-flex items-center gap-2">
                            <i class="fas fa-phone-alt"></i>
                            8160754633
                        </a>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-2 gap-6 mt-12 max-w-md">
                        <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <i class="fas fa-users text-blue-600 text-xl"></i>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold">500+</div>
                                    <div class="text-sm text-blue-100">Patients Treated</div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <i class="fas fa-star text-blue-600 text-xl"></i>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold">4.8 <span class="text-base">/5</span></div>
                                    <div class="text-sm text-blue-100">Google Reviews</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side - Quick Consultation Card -->
                <div class="lg:py-12">
                    <div class="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                        <!-- Card Header -->
                        <div class="flex items-start gap-4 mb-6">
                            <div class="w-14 h-14 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <i class="fas fa-hospital-alt text-white text-2xl"></i>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-2xl font-bold text-gray-900 mb-1">Pain Therapy Centre</h3>
                                <p class="text-gray-600 text-sm">Expert Care in Vadodara</p>
                            </div>
                        </div>

                        <!-- Quick Consultation Box -->
                        <div class="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 mb-6 border border-blue-100">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-comment-medical text-white"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-900 text-lg">Quick Consultation</h4>
                                    <p class="text-sm text-gray-600">Schedule your visit today</p>
                                </div>
                            </div>
                        </div>

                        <!-- Contact Information -->
                        <div class="space-y-4 mb-6">
                            <!-- Call Now -->
                            <a href="tel:8160754633" class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all group">
                                <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <i class="fas fa-phone-alt text-white"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="text-xs text-gray-600 mb-1">Call Now</div>
                                    <div class="font-bold text-gray-900 text-lg">8160754633</div>
                                </div>
                            </a>

                            <!-- Location -->
                            <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div class="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-map-marker-alt text-white"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="text-xs text-gray-600 mb-1">Location</div>
                                    <div class="font-semibold text-gray-900">Ajwa Road, Vadodara</div>
                                </div>
                            </div>

                            <!-- Timings -->
                            <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div class="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-clock text-white"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="text-xs text-gray-600 mb-1">Open</div>
                                    <div class="font-semibold text-gray-900">Tue - Sun: 10 AM - 1 PM</div>
                                </div>
                            </div>
                        </div>

                        <!-- Book Appointment Button -->
                        <a href="/pages/contact" class="block w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white text-center py-4 rounded-xl font-bold hover:from-blue-700 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl">
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

    console.log("✅ Hero section restored successfully!");
    console.log("\n🎯 Features restored:");
    console.log("   - Blue gradient background on left");
    console.log("   - White Quick Consultation card on right");
    console.log("   - Trust badges (12+ Years, MD & MPT, Holistic)");
    console.log("   - Stats cards (500+ Patients, 4.8/5 Reviews)");
    console.log("   - Contact info cards (Phone, Location, Timings)");
    console.log("   - Book Appointment CTA button");
  } catch (error) {
    console.error("❌ Error restoring hero section:", error.message);
  } finally {
    await connection.end();
  }
}

restoreHeroSection();
