const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

async function addAnimatedIcons() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎨 Adding Animated Medical Icons to Hero Section...\n");

    const [page] = await connection.query(
      "SELECT content FROM pages WHERE slug = ?",
      ["home"]
    );

    let content = page[0].content;

    // Find hero section and add animated icons
    const heroStart = content.indexOf("<!-- Hero Section -->");
    const backgroundEnd =
      content.indexOf(
        "</div>",
        content.indexOf("<!-- Background Pattern -->")
      ) + 6;

    const beforeBackground = content.substring(0, backgroundEnd);
    const afterBackground = content.substring(backgroundEnd);

    const animatedIcons = `

        <!-- Animated Medical Icons -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <!-- Bone Icon 1 -->
            <div class="absolute top-20 left-10 opacity-10 animate-float" style="animation-duration: 6s;">
                <i class="fas fa-bone text-white text-6xl"></i>
            </div>
            
            <!-- Spine Icon -->
            <div class="absolute top-40 right-20 opacity-15 animate-float" style="animation-duration: 8s; animation-delay: 1s;">
                <i class="fas fa-spine text-white text-7xl"></i>
            </div>
            
            <!-- Heart/Pulse Icon -->
            <div class="absolute bottom-40 left-32 opacity-10 animate-pulse-slow">
                <i class="fas fa-heartbeat text-white text-5xl"></i>
            </div>
            
            <!-- Joint/Knee Icon -->
            <div class="absolute top-1/3 left-1/4 opacity-10 animate-float" style="animation-duration: 7s; animation-delay: 2s;">
                <i class="fas fa-user-injured text-white text-6xl"></i>
            </div>
            
            <!-- Brain Icon -->
            <div class="absolute bottom-32 right-40 opacity-15 animate-float" style="animation-duration: 9s; animation-delay: 0.5s;">
                <i class="fas fa-brain text-white text-6xl"></i>
            </div>
            
            <!-- Hand/Therapy Icon -->
            <div class="absolute top-1/2 right-10 opacity-10 animate-float" style="animation-duration: 7.5s; animation-delay: 1.5s;">
                <i class="fas fa-hands-helping text-white text-5xl"></i>
            </div>
            
            <!-- Bone Icon 2 (rotated) -->
            <div class="absolute bottom-20 left-1/4 opacity-10 animate-float transform rotate-45" style="animation-duration: 8.5s; animation-delay: 3s;">
                <i class="fas fa-bone text-white text-5xl"></i>
            </div>
            
            <!-- Procedures/Surgery Icon -->
            <div class="absolute top-1/4 right-1/3 opacity-10 animate-float" style="animation-duration: 10s;">
                <i class="fas fa-procedures text-white text-6xl"></i>
            </div>
            
            <!-- Stethoscope Icon -->
            <div class="absolute bottom-1/3 right-1/4 opacity-10 animate-pulse-slow" style="animation-delay: 2s;">
                <i class="fas fa-stethoscope text-white text-5xl"></i>
            </div>
        </div>`;

    content = beforeBackground + animatedIcons + afterBackground;

    // Add CSS animations if not already present
    const cssAnimations = `
    <style>
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            25% {
                transform: translateY(-20px) rotate(5deg);
            }
            50% {
                transform: translateY(-10px) rotate(-5deg);
            }
            75% {
                transform: translateY(-30px) rotate(3deg);
            }
        }
        @keyframes pulse-slow {
            0%, 100% {
                opacity: 0.1;
                transform: scale(1);
            }
            50% {
                opacity: 0.15;
                transform: scale(1.05);
            }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
        }
    </style>
    `;

    // Add CSS before closing body tag if not already present
    if (!content.includes("animate-float")) {
      if (content.includes("</body>")) {
        content = content.replace("</body>", cssAnimations + "</body>");
      } else {
        content += cssAnimations;
      }
    }

    // Update the database
    await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
      content,
      "home",
    ]);

    console.log("✅ Animated medical icons added successfully!");
    console.log("\n🎯 Icons added:");
    console.log("   - 2x Bone icons (different positions)");
    console.log("   - 1x Spine icon");
    console.log("   - 1x Heartbeat/Pulse icon");
    console.log("   - 1x Joint/Injury icon");
    console.log("   - 1x Brain icon");
    console.log("   - 1x Hands/Therapy icon");
    console.log("   - 1x Procedures/Surgery icon");
    console.log("   - 1x Stethoscope icon");
    console.log("\n✨ Features:");
    console.log("   - Low opacity (10-15%)");
    console.log("   - Floating animation (smooth up/down movement)");
    console.log("   - Pulse animation on some icons");
    console.log("   - Different animation durations for natural movement");
    console.log("   - Staggered delays for variety");
    console.log("   - White icons blend with blue background");
  } catch (error) {
    console.error("❌ Error adding animated icons:", error.message);
  } finally {
    await connection.end();
  }
}

addAnimatedIcons();
