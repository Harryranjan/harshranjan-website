const mysql = require("mysql2/promise");

async function updateCertificationsViewOnly() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  const certificationsSection = `
<!-- Professional Certifications & Qualifications -->
<section class="py-16 bg-gradient-to-r from-blue-50 to-teal-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Certifications & Qualifications</h2>
            <p class="text-xl text-gray-600">Recognized expertise in pain management and rehabilitation</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <!-- Certificate 1: Chiropractic & Osteopathy -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div class="relative h-80 bg-gray-100">
                    <iframe src="/images/certifications/Dr.Subodhcertifications.pdf#toolbar=0&navpanes=0&scrollbar=0" 
                            class="w-full h-full pointer-events-none"
                            style="border: none;"></iframe>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Chiropractic & Osteopathy Technique</h3>
                    <p class="text-sm text-gray-600">Advance Physiotherapy Academy, 2020</p>
                </div>
            </div>

            <!-- Certificate 2: Neurotherapy -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div class="relative h-80 bg-gray-100">
                    <iframe src="/images/certifications/Dr.Subodhcertifications1.pdf#toolbar=0&navpanes=0&scrollbar=0" 
                            class="w-full h-full pointer-events-none"
                            style="border: none;"></iframe>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Neurotherapy - First Class</h3>
                    <p class="text-sm text-gray-600">Dr. Lajpatrai Mehra's Academy, 2018-19</p>
                </div>
            </div>

            <!-- Certificate 3: Manipulation Therapy -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div class="relative h-80 bg-gray-100">
                    <iframe src="/images/certifications/Dr.Subodhcertifications2.pdf#toolbar=0&navpanes=0&scrollbar=0" 
                            class="w-full h-full pointer-events-none"
                            style="border: none;"></iframe>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Advanced Manipulation Therapy (CMT)</h3>
                    <p class="text-sm text-gray-600">Manual Therapy Academy, India, 2025</p>
                </div>
            </div>

            <!-- Certificate 4: COVID Hero Award -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div class="relative h-80 bg-gray-100">
                    <iframe src="/images/certifications/Dr.Subodhcertifications3.pdf#toolbar=0&navpanes=0&scrollbar=0" 
                            class="w-full h-full pointer-events-none"
                            style="border: none;"></iframe>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">COVID-19 Healthcare Hero Award</h3>
                    <p class="text-sm text-gray-600">UTV News24, 2020</p>
                </div>
            </div>

            <!-- Certificate 5: Bone Setting -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div class="relative h-80 bg-gray-100">
                    <iframe src="/images/certifications/Dr.Subodhcertifications4.pdf#toolbar=0&navpanes=0&scrollbar=0" 
                            class="w-full h-full pointer-events-none"
                            style="border: none;"></iframe>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Bone Setting - Kalari Adankal Method</h3>
                    <p class="text-sm text-gray-600">Martial Kalari Marma Gurukulam, 2025</p>
                </div>
            </div>

            <!-- Certificate 6: Hypnotherapy -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div class="relative h-80 bg-gray-100">
                    <iframe src="/images/certifications/Dr.Subodhcertifications5.pdf#toolbar=0&navpanes=0&scrollbar=0" 
                            class="w-full h-full pointer-events-none"
                            style="border: none;"></iframe>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Hypnotherapy Diploma (IPHM, UK)</h3>
                    <p class="text-sm text-gray-600">Past Life Regression Therapy, 2025</p>
                </div>
            </div>

            <!-- Certificate 7: Modern Spine Care -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div class="relative h-80 bg-gray-100">
                    <iframe src="/images/certifications/Dr.Subodhcertifications6.pdf#toolbar=0&navpanes=0&scrollbar=0" 
                            class="w-full h-full pointer-events-none"
                            style="border: none;"></iframe>
                </div>
                <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Modern Physiotherapy in Spine Care</h3>
                    <p class="text-sm text-gray-600">Viroc & Isha Hospital, Vadodara, 2025</p>
                </div>
            </div>
        </div>

        <!-- Trust Indicators -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <div class="text-4xl font-bold text-blue-600 mb-2">15+</div>
                <div class="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <div class="text-4xl font-bold text-teal-600 mb-2">7+</div>
                <div class="text-gray-600 font-medium">Professional Certifications</div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <div class="text-4xl font-bold text-blue-600 mb-2">5000+</div>
                <div class="text-gray-600 font-medium">Patients Treated</div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <div class="text-4xl font-bold text-teal-600 mb-2">98%</div>
                <div class="text-gray-600 font-medium">Success Rate</div>
            </div>
        </div>
    </div>
</section>

<style>
/* Hide PDF toolbar controls */
iframe[src*=".pdf"] {
    pointer-events: none;
}
</style>
`;

  // Get current content
  const [rows] = await connection.execute(
    "SELECT content FROM pages WHERE slug = ?",
    ["about-team"]
  );
  let content = rows[0].content;

  // Find and replace the certifications section
  const startMarker = "<!-- Professional Certifications & Qualifications -->";
  const startIndex = content.indexOf(startMarker);

  if (startIndex > -1) {
    const nextSectionIndex = content.indexOf(
      "<!-- Call to Action -->",
      startIndex
    );
    if (nextSectionIndex > -1) {
      content =
        content.slice(0, startIndex) +
        certificationsSection +
        content.slice(nextSectionIndex);
    } else {
      content = content.slice(0, startIndex) + certificationsSection;
    }
  } else {
    const ctaIndex = content.indexOf("<!-- Call to Action -->");
    if (ctaIndex > -1) {
      content =
        content.slice(0, ctaIndex) +
        certificationsSection +
        content.slice(ctaIndex);
    }
  }

  await connection.execute(
    "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
    [content, "about-team"]
  );

  console.log("✅ Certifications updated - view only, no download buttons!");
  await connection.end();
}

updateCertificationsViewOnly().catch(console.error);
