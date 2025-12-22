const mysql = require("mysql2/promise");

async function addCertificationsToAbout() {
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

  // Add certifications section before the final CTA section
  const certificationsSection = `
<!-- Professional Certifications & Qualifications -->
<section class="py-16 bg-gradient-to-r from-blue-50 to-teal-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Certifications & Qualifications</h2>
            <p class="text-xl text-gray-600">Recognized expertise in pain management and rehabilitation</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <a href="/images/certifications/Dr.Subodhcertifications.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                        <i class="fas fa-certificate text-2xl text-blue-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Medical Certification 1</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">Professional qualification in pain management</p>
                <span class="text-blue-600 font-semibold text-sm inline-flex items-center">
                    View Certificate <i class="fas fa-arrow-right ml-2"></i>
                </span>
            </a>

            <a href="/images/certifications/Dr.Subodhcertifications1.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition">
                        <i class="fas fa-award text-2xl text-teal-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Medical Certification 2</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">Advanced training in physiotherapy</p>
                <span class="text-teal-600 font-semibold text-sm inline-flex items-center">
                    View Certificate <i class="fas fa-arrow-right ml-2"></i>
                </span>
            </a>

            <a href="/images/certifications/Dr.Subodhcertifications2.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                        <i class="fas fa-medal text-2xl text-blue-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Medical Certification 3</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">Specialized rehabilitation techniques</p>
                <span class="text-blue-600 font-semibold text-sm inline-flex items-center">
                    View Certificate <i class="fas fa-arrow-right ml-2"></i>
                </span>
            </a>

            <a href="/images/certifications/Dr.Subodhcertifications3.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition">
                        <i class="fas fa-user-md text-2xl text-teal-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Medical Certification 4</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">Clinical excellence certification</p>
                <span class="text-teal-600 font-semibold text-sm inline-flex items-center">
                    View Certificate <i class="fas fa-arrow-right ml-2"></i>
                </span>
            </a>

            <a href="/images/certifications/Dr.Subodhcertifications4.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                        <i class="fas fa-graduation-cap text-2xl text-blue-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Medical Certification 5</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">Advanced medical training</p>
                <span class="text-blue-600 font-semibold text-sm inline-flex items-center">
                    View Certificate <i class="fas fa-arrow-right ml-2"></i>
                </span>
            </a>

            <a href="/images/certifications/Dr.Subodhcertifications5.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition">
                        <i class="fas fa-stethoscope text-2xl text-teal-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Medical Certification 6</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">Professional healthcare certification</p>
                <span class="text-teal-600 font-semibold text-sm inline-flex items-center">
                    View Certificate <i class="fas fa-arrow-right ml-2"></i>
                </span>
            </a>

            <a href="/images/certifications/Dr.Subodhcertifications6.pdf" 
               target="_blank"
               class="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition">
                        <i class="fas fa-briefcase-medical text-2xl text-blue-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800">Medical Certification 7</h3>
                </div>
                <p class="text-gray-600 text-sm mb-3">Continuing medical education</p>
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

  // Insert before the final CTA section
  const ctaSectionStart = content.lastIndexOf("<!-- Call to Action -->");
  if (ctaSectionStart > -1) {
    content =
      content.slice(0, ctaSectionStart) +
      certificationsSection +
      content.slice(ctaSectionStart);
  } else {
    // If no CTA found, append at the end
    content += certificationsSection;
  }

  await connection.execute(
    "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
    [content, "about-team"]
  );

  console.log("✅ About page updated with certifications section!");
  await connection.end();
}

addCertificationsToAbout().catch(console.error);
