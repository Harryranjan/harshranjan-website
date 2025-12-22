const mysql = require("mysql2/promise");

async function updateFooter() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  const footerHTML = `<footer class="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <h3 class="text-xl font-bold mb-4 text-blue-400">Dr. Subodh Kumar</h3>
        <p class="text-gray-400 text-sm mb-4">Expert Pain Management & Rehabilitation Services in Vadodara</p>
        <div class="flex gap-3">
          <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
      <div>
        <h4 class="font-bold mb-4 text-lg">Quick Links</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="/pages/about" class="hover:text-blue-400 transition">About Us</a></li>
          <li><a href="/pages/services" class="hover:text-blue-400 transition">Services</a></li>
          <li><a href="/pages/treatments" class="hover:text-blue-400 transition">Treatments</a></li>
          <li><a href="/pages/contact" class="hover:text-blue-400 transition">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold mb-4 text-lg">Services</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li>Physiotherapy</li>
          <li>Pain Management</li>
          <li>Rehabilitation</li>
          <li>Sports Injury</li>
          <li>Post-Surgery Care</li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold mb-4 text-lg">Contact</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li class="flex items-center gap-2">
            <i class="fas fa-phone text-blue-400"></i> 8160754633
          </li>
          <li class="flex items-center gap-2">
            <i class="fas fa-envelope text-blue-400"></i> info@paintherapy.com
          </li>
          <li class="flex items-center gap-2">
            <i class="fas fa-map-marker-alt text-blue-400"></i> Vadodara, Gujarat
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
      <p>© 2025 Dr. Subodh Kumar - Pain Therapy & Rehab Centre. All rights reserved.</p>
    </div>
  </div>
</footer>`;

  const settings = JSON.stringify({
    type: "footer-builder",
    customCode: footerHTML,
  });

  await connection.execute("UPDATE menus SET settings = ? WHERE id = 27", [
    settings,
  ]);

  console.log("✅ Footer updated successfully!");
  await connection.end();
}

updateFooter().catch(console.error);
