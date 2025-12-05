const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function matchScreenshotHero() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎨 Matching Hero Section to Screenshot...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // Find and replace hero section
    const heroStart = content.indexOf("<!-- Hero Section -->");
    const heroEnd = content.indexOf("</section>", heroStart) + 10;

    const newHeroSection = `<!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 min-h-[90vh] flex items-center overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
            <div class="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 right-20 w-96 h-96 bg-teal-300 rounded-full blur-3xl"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 py-12">
            <div class="grid lg:grid-cols-5 gap-8 items-center">
                <!-- Left Content - Takes 3 columns -->
                <div class="lg:col-span-3 text-white">
                    <!-- Badge -->
                    <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/30">
                        <i class="fas fa-check-circle"></i>
                        Currently Accepting New Patients
                    </div>

                    <!-- Main Heading -->
                    <h1 class="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
                        Expert Pain Relief & <span class="text-yellow-300">Rehabilitation in Vadodara</span>
                    </h1>

                    <!-- Description -->
                    <p class="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl">
                        Trusted by 500+ patients for chronic pain management, neurological rehabilitation, and post-surgery recovery.
                    </p>

                    <!-- Trust Badges -->
                    <div class="flex flex-wrap gap-3 mb-8">
                        <div class="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                            <i class="fas fa-check-circle text-green-300"></i>
                            <span class="font-medium">7+ Years Experience</span>
                        </div>
                        <div class="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                            <i class="fas fa-check-circle text-green-300"></i>
                            <span class="font-medium">MD & BPT Certified</span>
                        </div>
                        <div class="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                            <i class="fas fa-check-circle text-green-300"></i>
                            <span class="font-medium">Holistic Approach</span>
                        </div>
                    </div>

                    <!-- CTA Buttons -->
                    <div class="flex flex-wrap gap-4 mb-10">
                        <a href="/pages/contact" class="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-xl inline-flex items-center gap-2">
                            <i class="fas fa-calendar-check"></i>
                            Book Free Consultation
                        </a>
                        <a href="tel:8160754633" class="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold border-2 border-white/30 hover:bg-white hover:text-blue-600 transition-all inline-flex items-center gap-2">
                            <i class="fas fa-phone-alt"></i>
                            8160754633
                        </a>
                    </div>

                    <!-- Stats Row -->
                    <div class="flex gap-8">
                        <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
                            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                <i class="fas fa-users text-blue-600 text-xl"></i>
                            </div>
                            <div>
                                <div class="text-2xl font-bold">500+</div>
                                <div class="text-sm text-white/80">Patients Treated</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
                            <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                                <i class="fas fa-star text-white text-xl"></i>
                            </div>
                            <div>
                                <div class="text-2xl font-bold">4.8 <span class="text-base">/5</span></div>
                                <div class="text-sm text-white/80">100+ Reviews</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side - Quick Consultation Card - Takes 2 columns -->
                <div class="lg:col-span-2">
                    <div class="bg-gradient-to-br from-teal-400 to-blue-500 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        <!-- Decorative circles in background -->
                        <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                        <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
                        
                        <div class="relative z-10">
                            <!-- Header with Icon -->
                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <i class="fas fa-hospital-alt text-blue-600 text-2xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold text-white">Pain Therapy Centre</h3>
                                    <p class="text-sm text-white/80">Vadodara's Trusted Rehab</p>
                                </div>
                            </div>

                            <!-- Quick Consultation Box -->
                            <div class="bg-white rounded-2xl p-6 mb-6 shadow-xl">
                                <div class="flex items-center gap-3 mb-5">
                                    <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                        <i class="fas fa-comment-medical text-white"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-gray-900 text-lg">Quick Consultation</h4>
                                        <p class="text-sm text-gray-600">Schedule your visit today</p>
                                    </div>
                                </div>

                                <!-- Contact Details -->
                                <div class="space-y-4">
                                    <!-- Call Now -->
                                    <a href="tel:8160754633" class="flex items-center gap-3 group">
                                        <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                            <i class="fas fa-phone-alt text-blue-600 group-hover:text-white transition-colors"></i>
                                        </div>
                                        <div>
                                            <div class="text-xs text-gray-500">Call Now</div>
                                            <div class="font-bold text-gray-900">8160754633</div>
                                        </div>
                                    </a>

                                    <!-- Location -->
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                            <i class="fas fa-map-marker-alt text-green-600"></i>
                                        </div>
                                        <div>
                                            <div class="text-xs text-gray-500">Location</div>
                                            <div class="font-semibold text-gray-900">Ajwa Road, Vadodara</div>
                                        </div>
                                    </div>

                                    <!-- Hours -->
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                            <i class="fas fa-clock text-orange-600"></i>
                                        </div>
                                        <div>
                                            <div class="text-xs text-gray-500">Hours</div>
                                            <div class="font-semibold text-gray-900">Tue - Sun: 10 AM - 1 PM</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Book Appointment Button -->
                            <a href="/pages/contact" class="block w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white text-center py-4 rounded-xl font-bold hover:from-blue-700 hover:to-teal-600 transition-all shadow-lg">
                                Book Appointment →
                            </a>
                        </div>
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

    console.log("✅ Hero section matched to screenshot!");
    console.log("\n🎯 Exact changes from screenshot:");
    console.log("   - Solid blue gradient background (blue-600 to blue-400)");
    console.log("   - Left side: 3 columns with white text");
    console.log("   - Badge: 'Currently Accepting New Patients'");
    console.log(
      "   - Heading: Yellow highlight on 'Rehabilitation in Vadodara'"
    );
    console.log("   - Description: Trusted by 500+ patients...");
    console.log(
      "   - Trust badges: 7+ Years, MD & BPT, Holistic (green checks)"
    );
    console.log(
      "   - Two buttons: White 'Book Free Consultation' + outlined phone"
    );
    console.log("   - Stats: 500+ Patients & 4.8/5 100+ Reviews");
    console.log("   - Right side: 2 columns - Teal gradient card");
    console.log("   - Card header: Pain Therapy Centre + subtitle");
    console.log("   - White box: Quick Consultation with 3 contact items");
    console.log("   - Blue gradient 'Book Appointment →' button");
  } catch (error) {
    console.error("❌ Error matching hero section:", error.message);
  } finally {
    await connection.end();
  }
}

matchScreenshotHero();
