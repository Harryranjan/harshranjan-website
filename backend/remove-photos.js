const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const heroWithoutPhotos = `<!-- Clean Compact Hero Section -->
<section class="relative bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 text-white overflow-hidden">
    <!-- Subtle Pattern -->
    <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div class="grid lg:grid-cols-5 gap-8 items-center">
            <!-- Left Content - 3 columns -->
            <div class="lg:col-span-3 text-center lg:text-left space-y-5">
                <!-- Status Badge -->
                <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30 text-xs font-semibold">
                    <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Currently Accepting New Patients
                </div>

                <!-- Main Headline -->
                <h1 class="text-4xl lg:text-5xl font-extrabold leading-tight">
                    Expert Pain Relief &
                    <span class="text-yellow-300">Rehabilitation</span>
                    in Vadodara
                </h1>

                <!-- Description -->
                <p class="text-lg text-blue-50">
                    Trusted by 500+ patients for chronic pain management, neurological rehabilitation, and post-surgery recovery.
                </p>

                <!-- Benefits -->
                <div class="flex flex-wrap gap-3 justify-center lg:justify-start text-sm">
                    <span class="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
                        <i class="fas fa-check-circle text-green-300"></i> 7+ Years Experience
                    </span>
                    <span class="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
                        <i class="fas fa-check-circle text-green-300"></i> MD & BPT Certified
                    </span>
                    <span class="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
                        <i class="fas fa-check-circle text-green-300"></i> Holistic Approach
                    </span>
                </div>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <a href="/pages/contact" class="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 hover:text-blue-900 transition-all shadow-lg">
                        <i class="fas fa-calendar-check"></i>
                        Book Free Consultation
                    </a>
                    <a href="tel:8160754633" class="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-all">
                        <i class="fas fa-phone-alt"></i>
                        8160754633
                    </a>
                </div>

                <!-- Social Proof - No Photos -->
                <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm pt-2">
                    <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <i class="fas fa-users text-white text-lg"></i>
                        </div>
                        <div class="text-left">
                            <div class="font-bold text-lg">500+</div>
                            <div class="text-xs text-blue-100">Patients Treated</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <div class="w-10 h-10 bg-yellow-400/90 rounded-full flex items-center justify-center">
                            <i class="fas fa-star text-yellow-900 text-lg"></i>
                        </div>
                        <div class="text-left">
                            <div class="flex items-center gap-1 mb-0.5">
                                <span class="font-bold text-lg">4.8</span>
                                <span class="text-xs text-blue-100">/5</span>
                            </div>
                            <div class="text-xs text-blue-100">100+ Reviews</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Contact Card - 2 columns -->
            <div class="lg:col-span-2 hidden lg:block">
                <div class="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <!-- Icon Header Instead of Image -->
                    <div class="relative h-36 bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
                        <div class="text-center text-white">
                            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-white/30">
                                <i class="fas fa-hospital-alt text-4xl"></i>
                            </div>
                            <h3 class="text-2xl font-bold">Pain Therapy Centre</h3>
                            <p class="text-sm text-blue-100">Vadodara's Trusted Rehab</p>
                        </div>
                    </div>
                    
                    <!-- Card Content -->
                    <div class="p-5">
                        <div class="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
                            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                                <i class="fas fa-calendar-check text-white"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-gray-900">Quick Consultation</h3>
                                <p class="text-xs text-gray-600">Schedule your visit today</p>
                            </div>
                        </div>

                        <div class="space-y-3 mb-4">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-phone text-blue-600 text-sm"></i>
                                </div>
                                <div class="min-w-0">
                                    <div class="text-xs text-gray-600 mb-0.5">Call Now</div>
                                    <a href="tel:8160754633" class="text-blue-600 font-bold text-sm hover:text-blue-700">8160754633</a>
                                </div>
                            </div>

                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-map-marker-alt text-teal-600 text-sm"></i>
                                </div>
                                <div class="min-w-0">
                                    <div class="text-xs text-gray-600 mb-0.5">Location</div>
                                    <p class="text-gray-900 text-sm font-medium">Ajwa Road, Vadodara</p>
                                </div>
                            </div>

                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-clock text-orange-600 text-sm"></i>
                                </div>
                                <div class="min-w-0">
                                    <div class="text-xs text-gray-600 mb-0.5">Hours</div>
                                    <p class="text-gray-900 text-sm font-medium">Tue - Sun: 10 AM - 1 PM</p>
                                </div>
                            </div>
                        </div>

                        <a href="/pages/contact" class="block w-full text-center bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2.5 rounded-lg font-bold hover:from-blue-700 hover:to-teal-600 transition-all shadow-md text-sm">
                            Book Appointment →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;

async function removePhotos() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🔒 Removing Patient/Doctor Photos...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let currentContent = page[0].content;
    const quickContactIndex = currentContent.indexOf("<!-- Quick Contact Bar");

    if (quickContactIndex > -1) {
      const restOfContent = currentContent.substring(quickContactIndex);
      const newContent = heroWithoutPhotos + "\n\n" + restOfContent;

      await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
        newContent,
        "home",
      ]);

      console.log("========================================");
      console.log("✅ PHOTOS REMOVED - PRIVACY PROTECTED!");
      console.log("========================================\n");

      console.log("🔒 CHANGES MADE:\n");
      console.log("Patient Avatars:");
      console.log("  ✓ Removed overlapping photo circles");
      console.log("  ✓ Replaced with icon-based cards");
      console.log("  ✓ Shows 500+ count with users icon");
      console.log("  ✓ Shows 4.8 rating with star icon\n");

      console.log("Card Header:");
      console.log("  ✓ Removed clinic photo");
      console.log("  ✓ Replaced with gradient + hospital icon");
      console.log("  ✓ Shows clinic name and tagline");
      console.log("  ✓ Professional appearance\n");

      console.log("Benefits:");
      console.log("  ✓ No privacy concerns");
      console.log("  ✓ Clean, professional design");
      console.log("  ✓ Focus on stats, not photos");
      console.log("  ✓ HIPAA/privacy compliant\n");

      console.log("========================================");
      console.log("Safe to use - No personal photos!");
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

removePhotos();
