const mysql = require("mysql2/promise");

async function updateCertifications() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  // Get current content
  const [rows] = await connection.execute(
    "SELECT content FROM pages WHERE slug = ?",
    ["about-team"]
  );
  let content = rows[0].content;

  // Replace the certifications section with accurate details
  const newCertificationsSection = `
<!-- Professional Certifications & Qualifications -->
<section class="py-16 bg-gradient-to-r from-blue-50 to-teal-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Certifications & Qualifications</h2>
            <p class="text-xl text-gray-600">Recognized expertise in pain management and rehabilitation</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <!-- Certificate 1: Chiropractic & Osteopathy -->
            <a href="/images/certifications/Dr.Subodhcertifications.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                        <i class="fas fa-bone text-2xl text-blue-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Chiropractic & Osteopathy</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">Modified Chiropractic & Osteopathy Technique for Spine & Pelvis - Advance Physiotherapy Academy (2020)</p>
                <span class="text-blue-600 font-semibold text-sm inline-flex items-center">
                    View Certificate <i class="fas fa-arrow-right ml-2"></i>
                </span>
            </a>

            <!-- Certificate 2: Neurotherapy -->
            <a href="/images/certifications/Dr.Subodhcertifications1.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition">
                        <i class="fas fa-brain text-2xl text-teal-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Neurotherapy Certificate</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">First Class - Dr. Lajpatrai Mehra's Neurotherapy Academy (2018-2019)</p>
                <span class="text-teal-600 font-semibold text-sm inline-flex items-center">
                    View Certificate <i class="fas fa-arrow-right ml-2"></i>
                </span>
            </a>

            <!-- Certificate 3: Manipulation Therapy -->
            <a href="/images/certifications/Dr.Subodhcertifications2.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                        <i class="fas fa-hands text-2xl text-blue-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Manipulation Therapy (CMT)</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">Advanced Spinal & Peripheral Manipulation Therapy - Manual Therapy Academy, India (2025)</p>
                <span class="text-blue-600 font-semibold text-sm inline-flex items-center">
                    View Certificate <i class="fas fa-arrow-right ml-2"></i>
                </span>
            </a>

            <!-- Certificate 4: COVID Hero Award -->
            <a href="/images/certifications/Dr.Subodhcertifications3.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition">
                        <i class="fas fa-award text-2xl text-red-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">COVID-19 Hero Award</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">Recognition for exceptional healthcare service during pandemic - UTV News24 (2020)</p>
                <span class="text-red-600 font-semibold text-sm inline-flex items-center">
                    View Certificate <i class="fas fa-arrow-right ml-2"></i>
                </span>
            </a>

            <!-- Certificate 5: Bone Setting -->
            <a href="/images/certifications/Dr.Subodhcertifications4.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition">
                        <i class="fas fa-user-ninja text-2xl text-teal-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Bone Setting (Kalari Method)</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">Traditional Kalari Adankal Method - Indian Martial Kalari Marma Gurukulam (2025)</p>
                <span class="text-teal-600 font-semibold text-sm inline-flex items-center">
                    View Certificate <i class="fas fa-arrow-right ml-2"></i>
                </span>
            </a>

            <!-- Certificate 6: Hypnotherapy -->
            <a href="/images/certifications/Dr.Subodhcertifications5.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition">
                        <i class="fas fa-spa text-2xl text-purple-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Hypnotherapy Diploma</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">Past Life Regression & Transpersonal Hypnotherapy - IPHM, UK (2025)</p>
                <span class="text-purple-600 font-semibold text-sm inline-flex items-center">
                    View Certificate <i class="fas fa-arrow-right ml-2"></i>
                </span>
            </a>

            <!-- Certificate 7: Modern Spine Care -->
            <a href="/images/certifications/Dr.Subodhcertifications6.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                        <i class="fas fa-hospital text-2xl text-blue-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Modern Spine Care Workshop</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">From Pain To Performance - Viroc Hospital | Isha Hospital, Vadodara (2025)</p>
                <span class="text-blue-600 font-semibold text-sm inline-flex items-center">
                    View Certificate <i class="fas fa-arrow-right ml-2"></i>
                </span>
            </a>
        </div>

        <!-- Trust Indicators -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div class="bg-white p-6 rounded-xl shadow">
                <div class="text-4xl font-bold text-blue-600 mb-2">15+</div>
                <div class="text-gray-600">Years Experience</div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow">
                <div class="text-4xl font-bold text-teal-600 mb-2">7+</div>
                <div class="text-gray-600">Certifications</div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow">
                <div class="text-4xl font-bold text-blue-600 mb-2">5000+</div>
                <div class="text-gray-600">Patients Treated</div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow">
                <div class="text-4xl font-bold text-teal-600 mb-2">98%</div>
                <div class="text-gray-600">Success Rate</div>
            </div>
        </div>
    </div>
</section>

`;

  // Find and replace the old certifications section
  const startMarker = "<!-- Professional Certifications & Qualifications -->";
  const endMarker = "</section>\n\n<!-- Call to Action -->";

  const startIndex = content.indexOf(startMarker);
  if (startIndex > -1) {
    const endIndex = content.indexOf(endMarker, startIndex);
    if (endIndex > -1) {
      content =
        content.slice(0, startIndex) +
        newCertificationsSection +
        content.slice(endIndex);
    }
  }

  await connection.execute(
    "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
    [content, "about-team"]
  );

  console.log("✅ Certifications updated with accurate details!");
  await connection.end();
}

updateCertifications().catch(console.error);
