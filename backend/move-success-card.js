const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function moveSuccessCard() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n📦 Moving Success Stories Card...\n");

    // Remove the badge overlay from image
    const removeOverlay = `                    <!-- Stats Badge Overlay -->
                    <div class="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                        <div class="flex items-center gap-2">
                            <div class="w-7 h-7 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-award text-white text-xs"></i>
                            </div>
                            <div>
                                <div class="font-bold text-gray-900 text-xs">500+ Success Stories</div>
                                <div class="text-xs text-gray-600">Trusted across Vadodara</div>
                            </div>
                        </div>
                    </div>`;

    // Replace with just closing div
    await connection.query(
      "UPDATE pages SET content = REPLACE(content, ?, ?) WHERE slug = ?",
      [removeOverlay, "", "home"]
    );

    // Now add the card below stats
    const oldStatsGrid = `                    <!-- Mini Stats -->
                    <div class="grid grid-cols-4 gap-1.5">
                        <div class="text-center p-1.5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                            <div class="text-lg font-bold text-blue-600">7+</div>
                            <div class="text-xs text-gray-600">Years</div>
                        </div>
                        <div class="text-center p-1.5 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg">
                            <div class="text-lg font-bold text-teal-600">500+</div>
                            <div class="text-xs text-gray-600">Patients</div>
                        </div>
                        <div class="text-center p-1.5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                            <div class="text-lg font-bold text-orange-600">95%</div>
                            <div class="text-xs text-gray-600">Success</div>
                        </div>
                        <div class="text-center p-1.5 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                            <div class="text-lg font-bold text-green-600">4.8★</div>
                            <div class="text-xs text-gray-600">Rating</div>
                        </div>
                    </div>`;

    const newStatsWithCard = `                    <!-- Mini Stats -->
                    <div class="grid grid-cols-4 gap-1.5 mb-3">
                        <div class="text-center p-1.5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                            <div class="text-lg font-bold text-blue-600">7+</div>
                            <div class="text-xs text-gray-600">Years</div>
                        </div>
                        <div class="text-center p-1.5 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg">
                            <div class="text-lg font-bold text-teal-600">500+</div>
                            <div class="text-xs text-gray-600">Patients</div>
                        </div>
                        <div class="text-center p-1.5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                            <div class="text-lg font-bold text-orange-600">95%</div>
                            <div class="text-xs text-gray-600">Success</div>
                        </div>
                        <div class="text-center p-1.5 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                            <div class="text-lg font-bold text-green-600">4.8★</div>
                            <div class="text-xs text-gray-600">Rating</div>
                        </div>
                    </div>

                    <!-- Success Stories Card -->
                    <div class="bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg p-2.5 shadow-lg">
                        <div class="flex items-center gap-2 text-white">
                            <div class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-award text-white text-sm"></i>
                            </div>
                            <div>
                                <div class="font-bold text-white text-sm">500+ Success Stories</div>
                                <div class="text-xs text-white/90">Trusted across Vadodara</div>
                            </div>
                        </div>
                    </div>`;

    await connection.query(
      "UPDATE pages SET content = REPLACE(content, ?, ?) WHERE slug = ?",
      [oldStatsGrid, newStatsWithCard, "home"]
    );

    console.log("========================================");
    console.log("✅ SUCCESS CARD MOVED!");
    console.log("========================================\n");

    console.log("📦 Changes:\n");
    console.log("  ✓ Removed overlay badge from image");
    console.log("  ✓ Added Success Stories card below stats");
    console.log("  ✓ Card spans full width");
    console.log("  ✓ Gradient background (blue to teal)");
    console.log("  ✓ Icon + text layout maintained\n");

    console.log("Layout:");
    console.log("  • 4 stat boxes (Years, Patients, Success, Rating)");
    console.log("  • Success Stories card below (full width)\n");

    console.log("========================================");
    console.log("Card repositioned! 🎯");
    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

moveSuccessCard();
