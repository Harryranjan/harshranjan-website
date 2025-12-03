const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

const cleanHeaderHTML = `<header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center py-4">
      <a href="/" class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%);">
          <i class="fas fa-play text-white"></i>
        </div>
        <span class="text-2xl font-bold" style="background: linear-gradient(135deg, #9333ea 0%, #06b6d4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Harsh Ranjan</span>
      </a>
      <nav class="hidden md:flex items-center space-x-8">
        <a href="/" class="text-gray-700 hover:text-cyan-500 transition font-medium text-sm">Home</a>
        <a href="#services" class="text-gray-700 hover:text-cyan-500 transition font-medium text-sm">Services</a>
        <a href="#work" class="text-gray-700 hover:text-cyan-500 transition font-medium text-sm">Work</a>
        <a href="#pricing" class="text-gray-700 hover:text-cyan-500 transition font-medium text-sm">Pricing</a>
        <a href="#contact" class="text-gray-700 hover:text-cyan-500 transition font-medium text-sm">Contact</a>
        <a href="#book" class="text-white px-6 py-2.5 rounded-full font-semibold transition transform hover:scale-105" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); box-shadow: 0 4px 6px -1px rgba(249, 115, 22, 0.3);">Book Strategy Call</a>
      </nav>
      <button class="md:hidden text-gray-700 text-2xl">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </div>
</header>`;

async function restoreHeader() {
  try {
    const settings = {
      type: "header-builder",
      sticky: true,
      customCode: cleanHeaderHTML,
    };

    await sequelize.query("UPDATE menus SET settings = ? WHERE id = 23", {
      replacements: [JSON.stringify(settings)],
      type: Sequelize.QueryTypes.UPDATE,
    });

    console.log("✅ Header HTML restored successfully!");
    console.log("The header is clean and not encoded.");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

restoreHeader();
