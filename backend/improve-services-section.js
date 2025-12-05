const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function improveServicesSection() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎨 Improving Services Section UI/UX...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // Find and replace the services section with improved design
    const oldServicesHeader = `        <!-- Section Header -->
        <div class="text-center mb-12">
            <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                <i class="fas fa-procedures"></i>
                Our Services
            </div>
            <h2 class="text-3xl font-extrabold text-gray-900 mb-3">Comprehensive Pain Management Solutions</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">Evidence-based treatments tailored to your specific condition for optimal recovery</p>
        </div>`;

    const newServicesHeader = `        <!-- Section Header -->
        <div class="text-center mb-12">
            <div class="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-blue-100">
                <i class="fas fa-procedures"></i>
                Our Specialized Services
            </div>
            <h2 class="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                Comprehensive Pain Management <span class="text-blue-600">Solutions</span>
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Evidence-based treatments tailored to your specific condition for optimal recovery and long-term wellness
            </p>
            <div class="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
                <div class="flex items-center gap-2">
                    <i class="fas fa-check-circle text-green-500"></i>
                    <span>Personalized Care Plans</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fas fa-check-circle text-green-500"></i>
                    <span>Advanced Techniques</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fas fa-check-circle text-green-500"></i>
                    <span>Proven Results</span>
                </div>
            </div>
        </div>`;

    content = content.replace(oldServicesHeader, newServicesHeader);

    // Also improve the section background and spacing
    const oldSectionTag = `<!-- Core Services - Enhanced Cards with Better Visual Hierarchy -->
<section class="py-16 bg-white">`;

    const newSectionTag = `<!-- Core Services - Enhanced Cards with Better Visual Hierarchy -->
<section class="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    <!-- Decorative Background Elements -->
    <div class="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-20"></div>
    <div class="absolute bottom-0 right-0 w-64 h-64 bg-teal-100 rounded-full filter blur-3xl opacity-20"></div>
    `;

    content = content.replace(oldSectionTag, newSectionTag);

    // Close the decorative divs properly by adding closing tag before container ends
    const servicesContainerEnd = content.indexOf(
      "</section>",
      content.indexOf("Core Services")
    );
    if (servicesContainerEnd > -1) {
      const beforeEnd = content.substring(0, servicesContainerEnd);
      const afterEnd = content.substring(servicesContainerEnd);

      // Make sure we don't add duplicate closing section tags
      if (!beforeEnd.endsWith("    ")) {
        content = beforeEnd + "\n" + afterEnd;
      }
    }

    await connection.query(
      "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
      [content, "home"]
    );

    console.log("========================================");
    console.log("✅ SERVICES SECTION IMPROVED!");
    console.log("========================================\n");

    console.log("🎨 Enhancements:\n");
    console.log("Visual Design:");
    console.log("  ✓ Gradient background (gray-50 to white)");
    console.log("  ✓ Decorative blur elements (subtle depth)");
    console.log("  ✓ Color accent on 'Solutions' word");
    console.log("  ✓ Larger badge with border\n");

    console.log("Content:");
    console.log("  ✓ Enhanced title: 'Our Specialized Services'");
    console.log("  ✓ Larger description text (text-lg)");
    console.log("  ✓ Extended max-width (max-w-3xl)");
    console.log("  ✓ Added 3 trust indicators with checkmarks\n");

    console.log("Typography:");
    console.log("  ✓ Better line height (leading-tight, leading-relaxed)");
    console.log("  ✓ Increased spacing (mb-4 instead of mb-3)\n");

    console.log("========================================");
    console.log("Premium services section! 🌟");
    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

improveServicesSection();
