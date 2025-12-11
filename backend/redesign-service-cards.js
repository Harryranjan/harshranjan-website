const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function redesignServicesCards() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎨 Redesigning Service Cards...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // Find the services grid section and replace with completely redesigned cards
    const oldServicesGrid = content.substring(
      content.indexOf("<!-- Services Grid -->"),
      content.indexOf("</section>", content.indexOf("<!-- Services Grid -->"))
    );

    const newServicesGrid = `<!-- Services Grid -->
        <div class="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Service 1 - Spine & Back Pain -->
            <div class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300 hover:-translate-y-2">
                <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50"></div>
                <div class="relative">
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-spine text-white text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Spine & Back Pain</h3>
                    <p class="text-gray-600 mb-6 leading-relaxed">Expert treatment for lower back pain, sciatica, herniated discs, and chronic spinal conditions using advanced techniques.</p>
                    
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-blue-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Lower Back Pain Relief</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-blue-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Sciatica Treatment</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-blue-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Spinal Alignment</span>
                        </div>
                    </div>
                    
                    <a href="/pages/spine-back-pain" class="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group">
                        Learn More
                        <i class="fas fa-arrow-right text-sm"></i>
                    </a>
                </div>
            </div>

            <!-- Service 2 - Neuro Rehabilitation -->
            <div class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-teal-100 hover:border-teal-300 hover:-translate-y-2">
                <div class="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full opacity-50"></div>
                <div class="relative">
                    <div class="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-brain text-white text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">Neuro Rehabilitation</h3>
                    <p class="text-gray-600 mb-6 leading-relaxed">Specialized care for stroke recovery, paralysis, facial palsy, and neurological disorders with proven protocols.</p>
                    
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-teal-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Stroke Recovery</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-teal-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Paralysis Management</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-teal-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Neuropathy Treatment</span>
                        </div>
                    </div>
                    
                    <a href="/pages/neuro-rehabilitation" class="inline-flex items-center gap-2 text-teal-600 font-semibold hover:gap-3 transition-all group">
                        Learn More
                        <i class="fas fa-arrow-right text-sm"></i>
                    </a>
                </div>
            </div>

            <!-- Service 3 - Post-Operative Rehab -->
            <div class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100 hover:border-orange-300 hover:-translate-y-2">
                <div class="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full opacity-50"></div>
                <div class="relative">
                    <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-procedures text-white text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">Post-Operative Rehab</h3>
                    <p class="text-gray-600 mb-6 leading-relaxed">Comprehensive recovery programs after surgery for faster healing and complete mobility restoration.</p>
                    
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-orange-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Post-Surgery Recovery</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-orange-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Mobility Restoration</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-orange-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Pain Management</span>
                        </div>
                    </div>
                    
                    <a href="/pages/post-operative-rehab" class="inline-flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all group">
                        Learn More
                        <i class="fas fa-arrow-right text-sm"></i>
                    </a>
                </div>
            </div>

            <!-- Service 4 - Manual Therapy -->
            <div class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300 hover:-translate-y-2">
                <div class="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full opacity-50"></div>
                <div class="relative">
                    <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-hands text-white text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Manual Therapy</h3>
                    <p class="text-gray-600 mb-6 leading-relaxed">Hands-on techniques including therapeutic massage, mobilization, and manipulation for effective pain relief.</p>
                    
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-purple-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Therapeutic Massage</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-purple-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Joint Mobilization</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-purple-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Soft Tissue Therapy</span>
                        </div>
                    </div>
                    
                    <a href="/pages/manual-therapy" class="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all group">
                        Learn More
                        <i class="fas fa-arrow-right text-sm"></i>
                    </a>
                </div>
            </div>

            <!-- Service 5 - Cupping & Acupressure -->
            <div class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100 hover:border-pink-300 hover:-translate-y-2">
                <div class="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full opacity-50"></div>
                <div class="relative">
                    <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-spa text-white text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">Cupping & Acupressure</h3>
                    <p class="text-gray-600 mb-6 leading-relaxed">Traditional alternative therapies combining ancient wisdom with modern practice for holistic healing.</p>
                    
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-pink-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Cupping Therapy</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-pink-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Acupressure Points</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-pink-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Holistic Healing</span>
                        </div>
                    </div>
                    
                    <a href="/pages/cupping-acupressure" class="inline-flex items-center gap-2 text-pink-600 font-semibold hover:gap-3 transition-all group">
                        Learn More
                        <i class="fas fa-arrow-right text-sm"></i>
                    </a>
                </div>
            </div>

            <!-- Service 6 - Joint Pain Treatment -->
            <div class="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-100 hover:border-green-300 hover:-translate-y-2">
                <div class="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full opacity-50"></div>
                <div class="relative">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-bone text-white text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Joint Pain Treatment</h3>
                    <p class="text-gray-600 mb-6 leading-relaxed">Targeted treatment for arthritis, knee pain, shoulder pain, and all joint-related conditions with lasting results.</p>
                    
                    <div class="space-y-3 mb-6">
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-green-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Arthritis Management</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-green-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Knee Pain Relief</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm">
                            <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-check text-green-600 text-xs"></i>
                            </div>
                            <span class="text-gray-700 font-medium">Frozen Shoulder</span>
                        </div>
                    </div>
                    
                    <a href="/pages/joint-pain-treatment" class="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all group">
                        Learn More
                        <i class="fas fa-arrow-right text-sm"></i>
                    </a>
                </div>
            </div>
        </div>`;

    content = content.replace(oldServicesGrid, newServicesGrid);

    await connection.query(
      "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
      [content, "home"]
    );

    console.log("========================================");
    console.log("✅ SERVICE CARDS REDESIGNED!");
    console.log("========================================\n");

    console.log("🎨 Major Improvements:\n");
    console.log("Visual Design:");
    console.log("  ✓ Modern rounded-2xl cards with shadows");
    console.log("  ✓ Decorative corner elements (subtle circles)");
    console.log("  ✓ Hover lift effect (-translate-y-2)");
    console.log("  ✓ Border color transitions on hover");
    console.log("  ✓ Icon scale animation on hover\n");

    console.log("Card Structure:");
    console.log("  ✓ Larger icons (w-16 h-16) with gradients");
    console.log("  ✓ Bigger titles (text-2xl) for hierarchy");
    console.log("  ✓ Better spacing (p-8, mb-6)");
    console.log("  ✓ Circular checkmark badges");
    console.log("  ✓ Animated 'Learn More' links\n");

    console.log("Content:");
    console.log("  ✓ Enhanced descriptions");
    console.log("  ✓ Better formatted benefits");
    console.log("  ✓ Visual checkmarks with color coding");
    console.log("  ✓ Professional typography\n");

    console.log("Interactions:");
    console.log("  ✓ Smooth hover transitions (300ms)");
    console.log("  ✓ Shadow elevation on hover");
    console.log("  ✓ Title color change on hover");
    console.log("  ✓ Arrow animation on link hover\n");

    console.log("========================================");
    console.log("Premium service cards! 🌟");
    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

redesignServicesCards();
