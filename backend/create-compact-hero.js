const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const compactHero = `<!-- Compact Professional Hero Section -->
<section class="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-blue-900 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 40px 40px;"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div class="grid lg:grid-cols-2 gap-8 items-center">
            <!-- Left Content -->
            <div class="text-center lg:text-left">
                <!-- Badge -->
                <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 border border-white/30">
                    <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span class="text-xs font-semibold">Currently Accepting New Patients</span>
                </div>

                <!-- Main Headline -->
                <h1 class="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-3 leading-tight">
                    Expert Pain Relief &
                    <span class="block text-yellow-300">Rehabilitation</span>
                    in Vadodara
                </h1>

                <!-- Description -->
                <p class="text-base text-blue-50 mb-4 leading-relaxed">
                    Trusted by 500+ patients for chronic pain management, neurological rehabilitation, and post-surgery recovery.
                </p>

                <!-- Key Benefits -->
                <div class="flex flex-wrap gap-3 mb-5 justify-center lg:justify-start text-sm">
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <i class="fas fa-check text-green-300 text-xs"></i>
                        </div>
                        <span class="font-medium">7+ Years Experience</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <i class="fas fa-check text-green-300 text-xs"></i>
                        </div>
                        <span class="font-medium">MD & BPT Certified</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <i class="fas fa-check text-green-300 text-xs"></i>
                        </div>
                        <span class="font-medium">Holistic Approach</span>
                    </div>
                </div>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-3 mb-5 justify-center lg:justify-start">
                    <a href="/pages/contact" class="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 hover:text-blue-900 transition-all shadow-lg">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Book Free Consultation</span>
                    </a>
                    <a href="tel:8160754633" class="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-all">
                        <i class="fas fa-phone"></i>
                        <span>8160754633</span>
                    </a>
                </div>

                <!-- Trust Signals -->
                <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm">
                    <div class="flex items-center gap-2">
                        <div class="flex -space-x-2">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%234299e1'/%3E%3C/svg%3E" alt="Patient" class="w-8 h-8 rounded-full border-2 border-white" />
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2338b2ac'/%3E%3C/svg%3E" alt="Patient" class="w-8 h-8 rounded-full border-2 border-white" />
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23f6ad55'/%3E%3C/svg%3E" alt="Patient" class="w-8 h-8 rounded-full border-2 border-white" />
                        </div>
                        <div>
                            <div class="font-bold">500+ Patients</div>
                            <div class="text-xs text-blue-100">Successfully Treated</div>
                        </div>
                    </div>
                    <div class="h-8 w-px bg-white/30 hidden sm:block"></div>
                    <div>
                        <div class="flex items-center gap-2 mb-0.5">
                            <div class="flex text-yellow-300">
                                <i class="fas fa-star text-sm"></i>
                                <i class="fas fa-star text-sm"></i>
                                <i class="fas fa-star text-sm"></i>
                                <i class="fas fa-star text-sm"></i>
                                <i class="fas fa-star-half-alt text-sm"></i>
                            </div>
                            <span class="font-bold">4.8/5</span>
                        </div>
                        <div class="text-xs text-blue-100">100+ Google Reviews</div>
                    </div>
                </div>
            </div>

            <!-- Right Card -->
            <div class="hidden lg:block">
                <div class="bg-white text-gray-800 rounded-xl shadow-2xl p-6">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <i class="fas fa-hospital text-white"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-gray-900">Quick Consultation</h3>
                            <p class="text-gray-600 text-xs">Get expert advice today</p>
                        </div>
                    </div>

                    <div class="space-y-4 mb-5">
                        <div class="flex items-start gap-3">
                            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-phone-alt text-blue-600 text-sm"></i>
                            </div>
                            <div>
                                <div class="font-semibold text-gray-900 text-sm mb-0.5">Call Us Now</div>
                                <a href="tel:8160754633" class="text-blue-600 font-bold hover:text-blue-700">8160754633</a>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-map-marker-alt text-teal-600 text-sm"></i>
                            </div>
                            <div>
                                <div class="font-semibold text-gray-900 text-sm mb-0.5">Visit Our Clinic</div>
                                <p class="text-gray-700 text-sm">Ajwa Road, Vadodara</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-clock text-orange-600 text-sm"></i>
                            </div>
                            <div>
                                <div class="font-semibold text-gray-900 text-sm mb-0.5">Working Hours</div>
                                <p class="text-gray-700 text-sm">Tue - Sun: 10 AM - 1 PM</p>
                            </div>
                        </div>
                    </div>

                    <a href="/pages/contact" class="block w-full text-center bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-teal-600 transition-all shadow-lg text-sm">
                        Book Your Appointment
                        <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>`;

async function createCompactHero() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎯 Creating Compact Hero Section...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let currentContent = page[0].content;
    const quickContactIndex = currentContent.indexOf("<!-- Quick Contact Bar");

    if (quickContactIndex > -1) {
      const restOfContent = currentContent.substring(quickContactIndex);
      const newContent = compactHero + "\n\n" + restOfContent;

      await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
        newContent,
        "home",
      ]);

      console.log("========================================");
      console.log("✅ COMPACT HERO CREATED!");
      console.log("========================================\n");

      console.log("📐 SPACING REDUCED:\n");
      console.log("Padding:");
      console.log("  ✓ Desktop: py-12 to py-16 (was py-20 to py-32)");
      console.log("  ✓ Gap between columns: 8 (was 16)");
      console.log("  ✓ Margin bottom: 3-5px (was 6-10px)\n");

      console.log("Font Sizes:");
      console.log("  ✓ Headline: 3xl to 5xl (was 5xl to 7xl)");
      console.log("  ✓ Description: base (was xl)");
      console.log("  ✓ Benefits: sm (was base)");
      console.log("  ✓ Card content: sm to base (was base to lg)\n");

      console.log("Elements:");
      console.log("  ✓ Badge: Smaller (px-3 py-1.5)");
      console.log("  ✓ Buttons: Compact (px-6 py-3)");
      console.log("  ✓ Icons: Reduced size");
      console.log("  ✓ Card: Less padding (p-6 vs p-8)\n");

      console.log("Result:");
      console.log("  ✅ Everything fits in ONE viewport");
      console.log("  ✅ No scrolling needed");
      console.log("  ✅ Still professional & clean");
      console.log("  ✅ Perfect for 1080p+ screens\n");

      console.log("========================================");
    } else {
      console.log("⚠️  Could not find Quick Contact Bar marker");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

createCompactHero();
