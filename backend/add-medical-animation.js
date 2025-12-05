const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function addMedicalAnimation() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎨 Adding Medical Animation Section...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // Find the services section and add animation before the grid
    const servicesHeader = content.indexOf(
      '<div class="text-center max-w-3xl mx-auto mb-12">'
    );
    const servicesGridStart = content.indexOf("<!-- Services Grid -->");

    // Insert the medical animation section between header and grid
    const beforeGrid = content.substring(0, servicesGridStart);
    const afterGrid = content.substring(servicesGridStart);

    const medicalAnimationSection = `
        <!-- Medical Animation Section -->
        <div class="mb-16 relative">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Left: Animated Human Body with Pain Points -->
                <div class="relative h-[500px] flex items-center justify-center">
                    <!-- Body Silhouette with Gradient -->
                    <div class="relative w-64 h-full">
                        <!-- Head -->
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full animate-pulse-slow"></div>
                        
                        <!-- Neck -->
                        <div class="absolute top-16 left-1/2 -translate-x-1/2 w-12 h-8 bg-gradient-to-br from-blue-100 to-blue-200"></div>
                        
                        <!-- Shoulders -->
                        <div class="absolute top-20 left-1/2 -translate-x-1/2 w-48 h-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-full"></div>
                        
                        <!-- Torso -->
                        <div class="absolute top-24 left-1/2 -translate-x-1/2 w-40 h-56 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl"></div>
                        
                        <!-- Arms -->
                        <div class="absolute top-28 left-4 w-8 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full transform rotate-12"></div>
                        <div class="absolute top-28 right-4 w-8 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full transform -rotate-12"></div>
                        
                        <!-- Legs -->
                        <div class="absolute top-80 left-16 w-12 h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full"></div>
                        <div class="absolute top-80 right-16 w-12 h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full"></div>

                        <!-- Pain Point Markers with Pulse Animation -->
                        <!-- Neck Pain Point -->
                        <div class="absolute top-20 left-1/2 -translate-x-1/2 group cursor-pointer animate-bounce-slow" style="animation-delay: 0s">
                            <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-red-200 animate-ping-slow">
                                <i class="fas fa-plus text-white text-xs"></i>
                            </div>
                            <div class="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-10">
                                Neck Pain
                            </div>
                        </div>

                        <!-- Shoulder Pain Point -->
                        <div class="absolute top-24 left-6 group cursor-pointer animate-bounce-slow" style="animation-delay: 0.2s">
                            <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-orange-200 animate-ping-slow">
                                <i class="fas fa-plus text-white text-xs"></i>
                            </div>
                            <div class="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-10">
                                Shoulder Pain
                            </div>
                        </div>

                        <!-- Lower Back Pain Point -->
                        <div class="absolute top-56 left-1/2 -translate-x-1/2 group cursor-pointer animate-bounce-slow" style="animation-delay: 0.4s">
                            <div class="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-red-200 animate-ping-slow">
                                <i class="fas fa-plus text-white text-sm"></i>
                            </div>
                            <div class="absolute top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-10">
                                Lower Back Pain
                            </div>
                        </div>

                        <!-- Knee Pain Point -->
                        <div class="absolute top-96 left-16 group cursor-pointer animate-bounce-slow" style="animation-delay: 0.6s">
                            <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-yellow-200 animate-ping-slow">
                                <i class="fas fa-plus text-white text-xs"></i>
                            </div>
                            <div class="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-10">
                                Knee Pain
                            </div>
                        </div>

                        <!-- Hip Pain Point -->
                        <div class="absolute top-64 left-12 group cursor-pointer animate-bounce-slow" style="animation-delay: 0.8s">
                            <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-purple-200 animate-ping-slow">
                                <i class="fas fa-plus text-white text-xs"></i>
                            </div>
                            <div class="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-10">
                                Hip Pain
                            </div>
                        </div>
                    </div>

                    <!-- Decorative Elements -->
                    <div class="absolute top-10 right-10 w-20 h-20 bg-blue-100 rounded-full opacity-50 animate-float"></div>
                    <div class="absolute bottom-10 left-10 w-16 h-16 bg-teal-100 rounded-full opacity-50 animate-float" style="animation-delay: 1s"></div>
                </div>

                <!-- Right: Pain Point Information -->
                <div class="space-y-6">
                    <div class="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">
                            <i class="fas fa-heartbeat text-blue-600 mr-2"></i>
                            We Treat Pain at Every Point
                        </h3>
                        <p class="text-gray-700 leading-relaxed mb-4">
                            Our comprehensive approach targets pain from head to toe, addressing the root cause with advanced therapies and personalized treatment plans.
                        </p>
                    </div>

                    <!-- Pain Point List -->
                    <div class="grid gap-4">
                        <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-brain text-red-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900">Neck & Head Pain</h4>
                                <p class="text-sm text-gray-600">Cervical spondylosis, migraines, tension</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-hand-sparkles text-orange-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900">Shoulder & Arm Pain</h4>
                                <p class="text-sm text-gray-600">Frozen shoulder, rotator cuff, tennis elbow</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-spine text-red-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900">Back & Spine Pain</h4>
                                <p class="text-sm text-gray-600">Sciatica, herniated disc, chronic back pain</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-walking text-yellow-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900">Hip, Knee & Joint Pain</h4>
                                <p class="text-sm text-gray-600">Arthritis, sports injuries, post-surgery rehab</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        `;

    content = beforeGrid + medicalAnimationSection + afterGrid;

    // Add custom CSS animations at the end of content (before closing body tag)
    const customCSS = `
    <style>
        @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        @keyframes bounce-slow {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        @keyframes ping-slow {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            75%, 100% {
                transform: scale(1.5);
                opacity: 0;
            }
        }
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-20px);
            }
        }
        .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-ping-slow {
            animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-float {
            animation: float 4s ease-in-out infinite;
        }
    </style>
    `;

    // Add CSS before closing body tag
    if (content.includes("</body>")) {
      content = content.replace("</body>", customCSS + "</body>");
    } else {
      content += customCSS;
    }

    // Update the database
    await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
      content,
      "home",
    ]);

    console.log("✅ Medical animation section added successfully!");
    console.log("✅ Custom CSS animations added!");
    console.log("\n🎯 Features added:");
    console.log("   - Animated human body silhouette");
    console.log("   - 5 pain point markers (neck, shoulder, back, knee, hip)");
    console.log("   - Hover tooltips on pain points");
    console.log("   - Floating decorative elements");
    console.log("   - Pain point information cards");
    console.log("   - Smooth pulse, bounce, and float animations");
  } catch (error) {
    console.error("❌ Error adding medical animation:", error.message);
  } finally {
    await connection.end();
  }
}

addMedicalAnimation();
