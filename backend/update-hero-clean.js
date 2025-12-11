const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const cleanHeroSection = `<!-- Clean & Structured Hero Section -->
<section class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden">
    <!-- Subtle Animated Background -->
    <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div class="absolute top-40 right-20 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-40 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <!-- Top Status Badge -->
        <div class="flex justify-center lg:justify-start mb-8">
            <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-sm font-semibold">Currently Accepting Patients</span>
                <span class="text-white/40">•</span>
                <i class="fas fa-certificate text-yellow-300 text-sm"></i>
                <span class="text-sm font-semibold">7+ Years Trusted Care</span>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <!-- Left Column - Main Content (Takes 7 columns on large screens) -->
            <div class="lg:col-span-7 text-center lg:text-left space-y-8">
                <!-- Main Headline -->
                <div class="space-y-4">
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
                        Your Journey to
                    </h1>
                    <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                        <span class="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 text-transparent bg-clip-text">
                            Pain-Free Living
                        </span>
                    </h1>
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
                        Starts Here
                    </h1>
                </div>

                <!-- Subheading -->
                <p class="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Expert physiotherapy & rehabilitation for <span class="font-semibold text-white">chronic pain, neurological conditions,</span> and post-operative recovery in Vadodara.
                </p>

                <!-- Benefit Pills -->
                <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <span class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                        <i class="fas fa-check-circle text-green-300"></i>
                        Non-Invasive
                    </span>
                    <span class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                        <i class="fas fa-check-circle text-green-300"></i>
                        Personalized Care
                    </span>
                    <span class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                        <i class="fas fa-check-circle text-green-300"></i>
                        Fast Recovery
                    </span>
                </div>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <a href="/pages/contact" class="group inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-yellow-300/50 hover:bg-yellow-300 hover:text-blue-900 transition-all duration-300 transform hover:scale-105">
                        <i class="fas fa-calendar-check"></i>
                        <span>Book Free Consultation</span>
                        <i class="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                    </a>
                    
                    <a href="tel:8160754633" class="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/50 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                        <i class="fas fa-phone"></i>
                        <span>8160754633</span>
                    </a>
                </div>

                <!-- Social Proof -->
                <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6">
                    <!-- Patient Count -->
                    <div class="flex items-center gap-3">
                        <div class="flex -space-x-2">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center">
                                <i class="fas fa-user text-white text-xs"></i>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-white flex items-center justify-center">
                                <i class="fas fa-user text-white text-xs"></i>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-white flex items-center justify-center">
                                <i class="fas fa-user text-white text-xs"></i>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center">
                                <span class="text-white text-xs font-bold">+500</span>
                            </div>
                        </div>
                        <div>
                            <div class="font-bold">500+ Recovered</div>
                            <div class="text-sm text-blue-100">Happy Patients</div>
                        </div>
                    </div>

                    <!-- Rating -->
                    <div class="h-12 w-px bg-white/30 hidden sm:block"></div>
                    
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <div class="flex text-yellow-300">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <span class="font-bold text-lg">4.8</span>
                        </div>
                        <div class="text-sm text-blue-100">Based on 100+ reviews</div>
                    </div>
                </div>
            </div>

            <!-- Right Column - Feature Card (Takes 5 columns on large screens) -->
            <div class="lg:col-span-5 hidden lg:block">
                <div class="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-2xl">
                    <!-- Card Title -->
                    <div class="mb-8">
                        <div class="flex items-center gap-3 mb-2">
                            <div class="w-10 h-10 bg-yellow-300 rounded-lg flex items-center justify-center">
                                <i class="fas fa-sparkles text-blue-900"></i>
                            </div>
                            <h3 class="text-2xl font-bold">Why Patients Choose Us</h3>
                        </div>
                        <p class="text-blue-100 text-sm">Excellence in every treatment</p>
                    </div>

                    <!-- Features List -->
                    <div class="space-y-6">
                        <!-- Feature 1 -->
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                                <i class="fas fa-award text-white"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-1">7+ Years Excellence</h4>
                                <p class="text-blue-100 text-sm">Trusted healthcare provider in Vadodara</p>
                            </div>
                        </div>

                        <!-- Feature 2 -->
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                                <i class="fas fa-user-md text-white"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-1">Expert Specialists</h4>
                                <p class="text-blue-100 text-sm">MD & BPT certified with advanced training</p>
                            </div>
                        </div>

                        <!-- Feature 3 -->
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                                <i class="fas fa-heartbeat text-white"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-1">Holistic Treatment</h4>
                                <p class="text-blue-100 text-sm">Manual, neuro & alternative therapies</p>
                            </div>
                        </div>

                        <!-- Feature 4 -->
                        <div class="flex items-start gap-4">
                            <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                                <i class="fas fa-map-marker-alt text-white"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg mb-1">Prime Location</h4>
                                <p class="text-blue-100 text-sm">Easy access on Ajwa Road, Vadodara</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
        <span class="text-xs text-blue-100">Scroll to explore</span>
        <div class="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div class="w-1 h-2 bg-white rounded-full animate-scroll"></div>
        </div>
    </div>
</section>

<!-- CSS Animations -->
<style>
@keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
}

.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}

@keyframes scroll {
    0% { 
        transform: translateY(0);
        opacity: 0;
    }
    50% { 
        opacity: 1;
    }
    100% { 
        transform: translateY(8px);
        opacity: 0;
    }
}

.animate-scroll {
    animation: scroll 2s ease-in-out infinite;
}
</style>`;

async function updateCleanHero() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎯 Creating Clean & Structured Hero Section...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let currentContent = page[0].content;
    const quickContactIndex = currentContent.indexOf("<!-- Quick Contact Bar");

    if (quickContactIndex > -1) {
      const restOfContent = currentContent.substring(quickContactIndex);
      const newContent = cleanHeroSection + "\n\n" + restOfContent;

      await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
        newContent,
        "home",
      ]);

      console.log("========================================");
      console.log("✅ Hero Section Restructured!");
      console.log("========================================\n");

      console.log("🎨 LAYOUT IMPROVEMENTS:\n");

      console.log("Structure:");
      console.log("  ✓ Clean 12-column grid layout");
      console.log("  ✓ Left content: 7 columns (main focus)");
      console.log("  ✓ Right card: 5 columns (supporting)");
      console.log("  ✓ Proper spacing between all elements");
      console.log("  ✓ No overlapping components\n");

      console.log("Visual Hierarchy:");
      console.log("  ✓ Status badge at top (small, subtle)");
      console.log("  ✓ Headline broken into 3 lines for clarity");
      console.log("  ✓ 'Pain-Free Living' stands out with gradient");
      console.log("  ✓ Subheading separated with proper spacing");
      console.log("  ✓ Benefit pills clearly visible");
      console.log("  ✓ CTAs prominent but not overwhelming\n");

      console.log("Spacing:");
      console.log("  ✓ Consistent 8-unit spacing (space-y-8)");
      console.log("  ✓ 12-unit gap between columns");
      console.log("  ✓ Proper padding (py-20 md:py-28)");
      console.log("  ✓ Element groups clearly separated\n");

      console.log("Right Column Card:");
      console.log("  ✓ Removed floating stat cards (cluttering)");
      console.log("  ✓ Clean feature list with icons");
      console.log("  ✓ Consistent spacing between items");
      console.log("  ✓ Hidden on mobile to reduce clutter\n");

      console.log("Simplified Elements:");
      console.log("  ✓ Removed complex animations");
      console.log("  ✓ Removed AOS data attributes");
      console.log("  ✓ Cleaner button designs");
      console.log("  ✓ Simplified social proof section");
      console.log("  ✓ Removed bottom CTA in card\n");

      console.log("Mobile Optimization:");
      console.log("  ✓ Single column on mobile");
      console.log("  ✓ Centered text on small screens");
      console.log("  ✓ Right card hidden (no clutter)");
      console.log("  ✓ Stacked CTAs with proper spacing\n");

      console.log("========================================");
      console.log("Result: Clean, organized, professional");
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

updateCleanHero();
