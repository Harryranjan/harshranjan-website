const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const improvedHeroSection = `<!-- Enhanced Hero Section with Modern Design -->
<section class="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden flex items-center">
    <!-- Dynamic Animated Background -->
    <div class="absolute inset-0">
        <!-- Gradient Orbs -->
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div class="absolute top-40 right-20 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-40 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <!-- Grid Pattern Overlay -->
        <div class="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]"></div>
        
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-blue-900/40"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Left Column - Main Content -->
            <div class="text-center lg:text-left space-y-8 z-10">
                <!-- Top Badge with Animation -->
                <div data-aos="fade-down" class="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-3 rounded-full border border-white/30 shadow-lg hover:bg-white/30 transition-all">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span class="text-sm font-semibold">Currently Accepting Patients</span>
                    </div>
                    <div class="h-4 w-px bg-white/40"></div>
                    <div class="flex items-center gap-1">
                        <i class="fas fa-certificate text-yellow-300 text-sm"></i>
                        <span class="text-sm font-semibold">7+ Years Trusted Care</span>
                    </div>
                </div>

                <!-- Main Headline with Emphasis -->
                <div data-aos="fade-up" class="space-y-4">
                    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                        Your Journey to
                        <span class="block mt-2 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 text-transparent bg-clip-text animate-gradient">
                            Pain-Free Living
                        </span>
                        Starts Here
                    </h1>
                    <div class="h-1 w-24 bg-gradient-to-r from-yellow-300 to-teal-300 rounded-full"></div>
                </div>

                <!-- Enhanced Subheading -->
                <p data-aos="fade-up" data-aos-delay="100" class="text-lg sm:text-xl md:text-2xl text-blue-100 leading-relaxed font-light max-w-2xl">
                    Expert physiotherapy & rehabilitation for 
                    <span class="font-semibold text-white">chronic pain, neurological conditions,</span> 
                    and post-operative recovery in Vadodara.
                </p>

                <!-- Key Benefits Pills -->
                <div data-aos="fade-up" data-aos-delay="200" class="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <div class="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                        <i class="fas fa-check-circle text-green-300"></i>
                        <span class="text-sm font-medium">Non-Invasive</span>
                    </div>
                    <div class="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                        <i class="fas fa-check-circle text-green-300"></i>
                        <span class="text-sm font-medium">Personalized Care</span>
                    </div>
                    <div class="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                        <i class="fas fa-check-circle text-green-300"></i>
                        <span class="text-sm font-medium">Fast Recovery</span>
                    </div>
                </div>

                <!-- CTA Buttons with Enhanced Design -->
                <div data-aos="fade-up" data-aos-delay="300" class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <a href="/pages/contact" class="group relative inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-5 rounded-2xl font-bold text-lg overflow-hidden shadow-2xl hover:shadow-yellow-300/50 transition-all duration-300 transform hover:scale-105">
                        <div class="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                        <span class="relative z-10 flex items-center gap-3 group-hover:text-blue-900 transition-colors">
                            <i class="fas fa-calendar-check text-xl"></i>
                            <span>Book Free Consultation</span>
                            <i class="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform"></i>
                        </span>
                    </a>
                    
                    <a href="tel:8160754633" class="group inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/50 px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-xl">
                        <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                            <i class="fas fa-phone text-xl group-hover:text-white"></i>
                        </div>
                        <div class="text-left">
                            <div class="text-xs opacity-80">Call Now</div>
                            <div class="font-bold">8160754633</div>
                        </div>
                    </a>
                </div>

                <!-- Social Proof Section -->
                <div data-aos="fade-up" data-aos-delay="400" class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 pt-8 border-t border-white/20">
                    <!-- Patient Avatars -->
                    <div class="flex items-center gap-4">
                        <div class="flex -space-x-4">
                            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-4 border-white shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                                <i class="fas fa-user text-white text-sm"></i>
                            </div>
                            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-4 border-white shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                                <i class="fas fa-user text-white text-sm"></i>
                            </div>
                            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-4 border-white shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                                <i class="fas fa-user text-white text-sm"></i>
                            </div>
                            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-4 border-white shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                                <span class="text-white text-xs font-bold">+500</span>
                            </div>
                        </div>
                        <div class="text-left">
                            <div class="font-bold text-lg">500+ Recovered</div>
                            <div class="text-sm text-blue-100">Happy Patients</div>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="h-12 w-px bg-white/30 hidden sm:block"></div>

                    <!-- Rating -->
                    <div class="text-left">
                        <div class="flex items-center gap-2 mb-1">
                            <div class="flex text-yellow-300 text-lg">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <span class="font-bold text-xl">4.8</span>
                        </div>
                        <div class="text-sm text-blue-100">Based on 100+ reviews</div>
                    </div>
                </div>
            </div>

            <!-- Right Column - Visual Feature Card -->
            <div data-aos="fade-left" data-aos-delay="200" class="hidden lg:block">
                <div class="relative">
                    <!-- Main Feature Card -->
                    <div class="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <div class="space-y-6">
                            <!-- Card Header -->
                            <div class="flex items-center gap-3 mb-8">
                                <div class="w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
                                    <i class="fas fa-sparkles text-blue-900 text-xl"></i>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold">Why Patients Choose Us</h3>
                                    <p class="text-blue-100 text-sm">Excellence in every treatment</p>
                                </div>
                            </div>

                            <!-- Feature List -->
                            <div class="space-y-5">
                                <!-- Feature 1 -->
                                <div class="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                                    <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <i class="fas fa-award text-white text-lg"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-bold text-lg mb-1">7+ Years Excellence</h4>
                                        <p class="text-blue-100 text-sm leading-relaxed">Proven track record in pain management and rehabilitation</p>
                                    </div>
                                </div>

                                <!-- Feature 2 -->
                                <div class="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                                    <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <i class="fas fa-user-md text-white text-lg"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-bold text-lg mb-1">Expert Specialists</h4>
                                        <p class="text-blue-100 text-sm leading-relaxed">MD & BPT certified doctors with advanced training</p>
                                    </div>
                                </div>

                                <!-- Feature 3 -->
                                <div class="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                                    <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <i class="fas fa-heartbeat text-white text-lg"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-bold text-lg mb-1">Holistic Treatment</h4>
                                        <p class="text-blue-100 text-sm leading-relaxed">Combining manual, neuro & alternative therapies</p>
                                    </div>
                                </div>

                                <!-- Feature 4 -->
                                <div class="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                                    <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <i class="fas fa-map-marker-alt text-white text-lg"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-bold text-lg mb-1">Prime Location</h4>
                                        <p class="text-blue-100 text-sm leading-relaxed">Easy access on Ajwa Road, Vadodara</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Bottom CTA in Card -->
                            <div class="pt-6 border-t border-white/20">
                                <a href="/pages/about-team" class="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all group">
                                    <div class="flex items-center gap-3">
                                        <i class="fas fa-users text-yellow-300 text-xl"></i>
                                        <span class="font-semibold">Meet Our Expert Team</span>
                                    </div>
                                    <i class="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Floating Stats Cards -->
                    <div class="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-gray-200 animate-float">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                                <i class="fas fa-check-circle text-white text-xl"></i>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-gray-900">95%</div>
                                <div class="text-xs text-gray-600">Success Rate</div>
                            </div>
                        </div>
                    </div>

                    <div class="absolute -top-6 -left-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-gray-200 animate-float animation-delay-2000">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                                <i class="fas fa-fire text-white text-xl"></i>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-gray-900">500+</div>
                                <div class="text-xs text-gray-600">Lives Changed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2">
        <span class="text-sm text-blue-100 font-medium">Scroll to explore</span>
        <div class="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div class="w-1.5 h-3 bg-white rounded-full animate-scroll"></div>
        </div>
    </div>
</section>

<!-- Enhanced CSS Animations -->
<style>
/* Blob Animation */
@keyframes blob {
    0%, 100% { 
        transform: translate(0, 0) scale(1); 
    }
    33% { 
        transform: translate(30px, -50px) scale(1.1); 
    }
    66% { 
        transform: translate(-20px, 20px) scale(0.9); 
    }
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

/* Gradient Animation */
@keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
}

/* Float Animation */
@keyframes float {
    0%, 100% { 
        transform: translateY(0px); 
    }
    50% { 
        transform: translateY(-20px); 
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

/* Scroll Animation */
@keyframes scroll {
    0% { 
        transform: translateY(0);
        opacity: 0;
    }
    50% { 
        opacity: 1;
    }
    100% { 
        transform: translateY(12px);
        opacity: 0;
    }
}

.animate-scroll {
    animation: scroll 2s ease-in-out infinite;
}

/* Grid Background */
.bg-grid-white {
    background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
}

/* AOS-like animations (if AOS library not available) */
[data-aos="fade-up"] {
    animation: fadeUp 0.6s ease-out;
}

[data-aos="fade-down"] {
    animation: fadeDown 0.6s ease-out;
}

[data-aos="fade-left"] {
    animation: fadeLeft 0.6s ease-out;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeLeft {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

[data-aos-delay="100"] {
    animation-delay: 0.1s;
}

[data-aos-delay="200"] {
    animation-delay: 0.2s;
}

[data-aos-delay="300"] {
    animation-delay: 0.3s;
}

[data-aos-delay="400"] {
    animation-delay: 0.4s;
}
</style>`;

async function updateHeroSection() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🚀 Updating Hero Section with Premium Design...\n");

    // Get current homepage
    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let currentContent = page[0].content;

    // Replace hero section (everything before Quick Contact Bar)
    const quickContactIndex = currentContent.indexOf("<!-- Quick Contact Bar");
    if (quickContactIndex > -1) {
      const restOfContent = currentContent.substring(quickContactIndex);
      const newContent = improvedHeroSection + "\n\n" + restOfContent;

      await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
        newContent,
        "home",
      ]);

      console.log("========================================");
      console.log("✅ Hero Section Updated Successfully!");
      console.log("========================================\n");

      console.log("🎨 PREMIUM DESIGN IMPROVEMENTS:\n");

      console.log("Visual Design:");
      console.log("  ✓ Full-height hero (min-h-screen)");
      console.log("  ✓ Dynamic animated gradient background");
      console.log("  ✓ Floating blob animations");
      console.log("  ✓ Grid pattern overlay");
      console.log("  ✓ Multi-layer depth effects\n");

      console.log("Content Hierarchy:");
      console.log("  ✓ Status badge (Currently Accepting Patients)");
      console.log("  ✓ Massive headline with gradient text effect");
      console.log("  ✓ Enhanced subheading with emphasis");
      console.log("  ✓ Key benefit pills (Non-Invasive, Personalized, Fast)");
      console.log("  ✓ Decorative divider line\n");

      console.log("CTA Enhancements:");
      console.log("  ✓ Primary: 'Book Free Consultation' with gradient hover");
      console.log("  ✓ Secondary: Phone CTA with icon & number");
      console.log("  ✓ Enhanced hover animations");
      console.log("  ✓ Better visual feedback\n");

      console.log("Social Proof:");
      console.log("  ✓ Animated patient avatars with +500 indicator");
      console.log("  ✓ 4.8 star rating display");
      console.log("  ✓ Trust indicators");
      console.log("  ✓ Separated by elegant divider\n");

      console.log("Right Column Card:");
      console.log("  ✓ Glassmorphism design");
      console.log("  ✓ 4 feature highlights with icons");
      console.log("  ✓ Hover effects on each feature");
      console.log("  ✓ 'Meet Our Team' quick link");
      console.log("  ✓ Floating stats cards (95% Success, 500+ Lives)");
      console.log("  ✓ Smooth scale animation on hover\n");

      console.log("Micro-Interactions:");
      console.log("  ✓ Scroll indicator with animation");
      console.log("  ✓ Element entrance animations (AOS-style)");
      console.log("  ✓ Button hover transformations");
      console.log("  ✓ Icon hover scales");
      console.log("  ✓ Gradient text animation\n");

      console.log("Mobile Optimization:");
      console.log("  ✓ Responsive grid layout");
      console.log("  ✓ Stacked CTAs on mobile");
      console.log("  ✓ Hidden right column on small screens");
      console.log("  ✓ Touch-friendly button sizes\n");

      console.log("========================================");
      console.log("🌟 The hero section now features:");
      console.log("   • Premium glassmorphism effects");
      console.log("   • Multi-layered animations");
      console.log("   • Better visual hierarchy");
      console.log("   • Stronger call-to-action");
      console.log("   • Enhanced credibility signals");
      console.log("   • Professional modern design");
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

updateHeroSection();
