const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function refineHeroSection() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log(
      "\n🎨 Refining Hero Section - Bigger Buttons, Smaller Boxes...\n"
    );

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // Find and replace hero section
    const heroStart = content.indexOf("<!-- Hero Section -->");
    const heroEnd = content.indexOf("</section>", heroStart) + 10;

    const newHeroSection = `<!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400 min-h-[90vh] flex items-center overflow-hidden">
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
                    <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs mb-5 border border-white/30">
                        <i class="fas fa-check-circle text-sm"></i>
                        Currently Accepting New Patients
                    </div>

                    <!-- Main Heading -->
                    <h1 class="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-5">
                        Expert Pain Relief & <span class="text-yellow-300">Rehabilitation in Vadodara</span>
                    </h1>

                    <!-- Description -->
                    <p class="text-base text-white/90 mb-6 leading-relaxed max-w-2xl">
                        Trusted by 500+ patients for chronic pain management, neurological rehabilitation, and post-surgery recovery.
                    </p>

                    <!-- Trust Badges -->
                    <div class="flex flex-wrap gap-2 mb-6">
                        <div class="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 text-sm">
                            <i class="fas fa-check-circle text-green-300 text-xs"></i>
                            <span class="font-medium">7+ Years Experience</span>
                        </div>
                        <div class="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 text-sm">
                            <i class="fas fa-check-circle text-green-300 text-xs"></i>
                            <span class="font-medium">MD & BPT Certified</span>
                        </div>
                        <div class="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 text-sm">
                            <i class="fas fa-check-circle text-green-300 text-xs"></i>
                            <span class="font-medium">Holistic Approach</span>
                        </div>
                    </div>

                    <!-- CTA Buttons - BIGGER -->
                    <div class="flex flex-wrap gap-4 mb-8">
                        <a href="/pages/contact" class="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-xl inline-flex items-center gap-3 text-lg">
                            <i class="fas fa-calendar-check text-xl"></i>
                            Book Free Consultation
                        </a>
                        <a href="tel:8160754633" class="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-xl font-bold border-2 border-white/30 hover:bg-white hover:text-blue-600 transition-all inline-flex items-center gap-3 text-lg">
                            <i class="fas fa-phone-alt text-xl"></i>
                            8160754633
                        </a>
                    </div>

                    <!-- Stats Row - SMALLER -->
                    <div class="flex gap-4">
                        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/20">
                            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-users text-blue-600 text-lg"></i>
                            </div>
                            <div>
                                <div class="text-xl font-bold">500+</div>
                                <div class="text-xs text-white/80">Patients Treated</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/20">
                            <div class="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-star text-white text-lg"></i>
                            </div>
                            <div>
                                <div class="text-xl font-bold">4.8 <span class="text-sm">/5</span></div>
                                <div class="text-xs text-white/80">100+ Reviews</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side - Quick Consultation Card - Takes 2 columns -->
                <div class="lg:col-span-2">
                    <div class="bg-gradient-to-br from-teal-400 to-blue-500 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                        <!-- Decorative circles in background -->
                        <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                        <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
                        
                        <div class="relative z-10">
                            <!-- Header with Icon - SMALLER -->
                            <div class="flex items-center gap-2.5 mb-5">
                                <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                                    <i class="fas fa-hospital-alt text-blue-600 text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold text-white leading-tight">Pain Therapy Centre</h3>
                                    <p class="text-xs text-white/80">Vadodara's Trusted Rehab</p>
                                </div>
                            </div>

                            <!-- Quick Consultation Box - SMALLER -->
                            <div class="bg-white rounded-xl p-4 mb-4 shadow-xl">
                                <div class="flex items-center gap-2 mb-4">
                                    <div class="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-comment-medical text-white text-sm"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-gray-900">Quick Consultation</h4>
                                        <p class="text-xs text-gray-600">Schedule your visit today</p>
                                    </div>
                                </div>

                                <!-- Contact Details - SMALLER -->
                                <div class="space-y-2.5">
                                    <!-- Call Now -->
                                    <a href="tel:8160754633" class="flex items-center gap-2.5 group">
                                        <div class="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors flex-shrink-0">
                                            <i class="fas fa-phone-alt text-blue-600 group-hover:text-white transition-colors text-sm"></i>
                                        </div>
                                        <div>
                                            <div class="text-xs text-gray-500">Call Now</div>
                                            <div class="font-bold text-gray-900 text-sm">8160754633</div>
                                        </div>
                                    </a>

                                    <!-- Location -->
                                    <div class="flex items-center gap-2.5">
                                        <div class="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <i class="fas fa-map-marker-alt text-green-600 text-sm"></i>
                                        </div>
                                        <div>
                                            <div class="text-xs text-gray-500">Location</div>
                                            <div class="font-semibold text-gray-900 text-sm">Ajwa Road, Vadodara</div>
                                        </div>
                                    </div>

                                    <!-- Hours -->
                                    <div class="flex items-center gap-2.5">
                                        <div class="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <i class="fas fa-clock text-orange-600 text-sm"></i>
                                        </div>
                                        <div>
                                            <div class="text-xs text-gray-500">Hours</div>
                                            <div class="font-semibold text-gray-900 text-sm">Tue - Sun: 10 AM - 1 PM</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Book Appointment Button - BIGGER & SIMPLE BLUE -->
                            <a href="/pages/contact" class="block w-full bg-blue-600 text-white text-center py-5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg text-base">
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

    console.log("✅ Hero section refined successfully!");
    console.log("\n🎯 Changes made:");
    console.log("   BUTTONS (BIGGER):");
    console.log(
      "   - CTA buttons: px-8 py-4 → px-10 py-5, text-base → text-lg"
    );
    console.log("   - Button icons: regular → text-xl");
    console.log("   - Book Appointment: py-4 → py-5, text-base");
    console.log("");
    console.log("   BOXES (SMALLER):");
    console.log("   - Badge: px-4 py-2 → px-3 py-1.5, text-sm → text-xs");
    console.log("   - Trust badges: px-4 py-2 → px-3 py-1.5, font-medium");
    console.log("   - Stats boxes: px-5 py-3 → px-4 py-2.5");
    console.log("   - Stats icons: w-12 h-12 → w-10 h-10");
    console.log("   - Header card: p-8 → p-6");
    console.log("   - Header icon: w-14 h-14 → w-12 h-12, text-2xl → text-xl");
    console.log("   - Header title: text-2xl → text-xl");
    console.log("   - White box: p-6 → p-4");
    console.log("   - Contact icons: w-10 h-10 → w-9 h-9");
    console.log("   - Contact spacing: space-y-4 → space-y-2.5");
    console.log("");
    console.log("   BOOK APPOINTMENT:");
    console.log(
      "   - Gradient removed: from-blue-600 to-teal-500 → solid bg-blue-600"
    );
    console.log("   - Simple hover: hover:bg-blue-700 (no gradient)");
    console.log("   - Clean, professional look");
  } catch (error) {
    console.error("❌ Error refining hero section:", error.message);
  } finally {
    await connection.end();
  }
}

refineHeroSection();
