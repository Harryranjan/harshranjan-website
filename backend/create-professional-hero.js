const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const professionalHero = `<!-- Modern Professional Hero Section -->
<section class="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-blue-900 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 40px 40px;"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
            <!-- Left Content -->
            <div class="text-center lg:text-left">
                <!-- Badge -->
                <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/30">
                    <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span class="text-sm font-semibold">Currently Accepting New Patients</span>
                </div>

                <!-- Main Headline -->
                <h1 class="text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-tight">
                    Expert Pain Relief &
                    <span class="block text-yellow-300">Rehabilitation</span>
                    in Vadodara
                </h1>

                <!-- Description -->
                <p class="text-xl text-blue-50 mb-8 leading-relaxed">
                    Trusted by 500+ patients for chronic pain management, neurological rehabilitation, and post-surgery recovery.
                </p>

                <!-- Key Benefits -->
                <div class="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
                    <div class="flex items-center gap-2 text-white">
                        <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <i class="fas fa-check text-green-300 text-sm"></i>
                        </div>
                        <span class="font-medium">7+ Years Experience</span>
                    </div>
                    <div class="flex items-center gap-2 text-white">
                        <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <i class="fas fa-check text-green-300 text-sm"></i>
                        </div>
                        <span class="font-medium">MD & BPT Certified</span>
                    </div>
                    <div class="flex items-center gap-2 text-white">
                        <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <i class="fas fa-check text-green-300 text-sm"></i>
                        </div>
                        <span class="font-medium">Holistic Approach</span>
                    </div>
                </div>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
                    <a href="/pages/contact" class="inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 hover:text-blue-900 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Book Free Consultation</span>
                    </a>
                    <a href="tel:8160754633" class="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-all">
                        <i class="fas fa-phone"></i>
                        <span>8160754633</span>
                    </a>
                </div>

                <!-- Trust Signals -->
                <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                    <div class="flex items-center gap-3">
                        <div class="flex -space-x-3">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%234299e1'/%3E%3C/svg%3E" alt="Patient" class="w-12 h-12 rounded-full border-2 border-white" />
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2338b2ac'/%3E%3C/svg%3E" alt="Patient" class="w-12 h-12 rounded-full border-2 border-white" />
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23f6ad55'/%3E%3C/svg%3E" alt="Patient" class="w-12 h-12 rounded-full border-2 border-white" />
                        </div>
                        <div>
                            <div class="font-bold text-lg">500+ Patients</div>
                            <div class="text-sm text-blue-100">Successfully Treated</div>
                        </div>
                    </div>
                    <div class="h-12 w-px bg-white/30 hidden sm:block"></div>
                    <div class="text-center sm:text-left">
                        <div class="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                            <div class="flex text-yellow-300 text-lg">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <span class="font-bold text-xl">4.8/5</span>
                        </div>
                        <div class="text-sm text-blue-100">100+ Google Reviews</div>
                    </div>
                </div>
            </div>

            <!-- Right Card -->
            <div class="hidden lg:block">
                <div class="bg-white text-gray-800 rounded-2xl shadow-2xl p-8">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <i class="fas fa-hospital text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900">Quick Consultation</h3>
                            <p class="text-gray-600 text-sm">Get expert advice today</p>
                        </div>
                    </div>

                    <div class="space-y-6 mb-8">
                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-phone-alt text-blue-600"></i>
                            </div>
                            <div>
                                <div class="font-semibold text-gray-900 mb-1">Call Us Now</div>
                                <a href="tel:8160754633" class="text-blue-600 font-bold text-lg hover:text-blue-700">8160754633 / 9601704565</a>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-map-marker-alt text-teal-600"></i>
                            </div>
                            <div>
                                <div class="font-semibold text-gray-900 mb-1">Visit Our Clinic</div>
                                <p class="text-gray-700">Ajwa Road, Vadodara</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-clock text-orange-600"></i>
                            </div>
                            <div>
                                <div class="font-semibold text-gray-900 mb-1">Working Hours</div>
                                <p class="text-gray-700">Tue - Sun: 10:00 AM - 1:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <a href="/pages/contact" class="block w-full text-center bg-gradient-to-r from-blue-600 to-teal-500 text-white py-4 rounded-lg font-bold hover:from-blue-700 hover:to-teal-600 transition-all shadow-lg">
                        Book Your Appointment
                        <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>`;

async function createProfessionalHero() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n✨ Creating Professional Hero Section...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let currentContent = page[0].content;
    const quickContactIndex = currentContent.indexOf("<!-- Quick Contact Bar");

    if (quickContactIndex > -1) {
      const restOfContent = currentContent.substring(quickContactIndex);
      const newContent = professionalHero + "\n\n" + restOfContent;

      await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
        newContent,
        "home",
      ]);

      console.log("========================================");
      console.log("✅ PROFESSIONAL HERO CREATED!");
      console.log("========================================\n");

      console.log("🎨 DESIGN FEATURES:\n");
      console.log("Layout:");
      console.log("  ✓ Clean 2-column grid (50/50 split)");
      console.log("  ✓ Left: Main message & CTAs");
      console.log("  ✓ Right: Contact card (white background)");
      console.log("  ✓ Perfect balance & spacing\n");

      console.log("Left Column:");
      console.log("  ✓ Status badge (Currently Accepting)");
      console.log("  ✓ Clear, powerful headline");
      console.log("  ✓ Simple description");
      console.log("  ✓ 3 key benefits with checkmarks");
      console.log("  ✓ Prominent CTA buttons");
      console.log("  ✓ Social proof (patients + rating)\n");

      console.log("Right Column:");
      console.log("  ✓ White card (stands out)");
      console.log("  ✓ 'Quick Consultation' title");
      console.log("  ✓ Phone numbers");
      console.log("  ✓ Address");
      console.log("  ✓ Working hours");
      console.log("  ✓ Book appointment button\n");

      console.log("Colors:");
      console.log("  ✓ Clean gradient background");
      console.log("  ✓ White card for contrast");
      console.log("  ✓ Yellow accent for headlines");
      console.log("  ✓ Professional color scheme\n");

      console.log("Mobile:");
      console.log("  ✓ Single column stack");
      console.log("  ✓ Right card hidden (no clutter)");
      console.log("  ✓ All essential info visible\n");

      console.log("========================================");
      console.log("Result: Clean, professional, modern");
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

createProfessionalHero();
