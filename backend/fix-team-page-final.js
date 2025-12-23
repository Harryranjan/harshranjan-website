const mysql = require("mysql2/promise");

async function fixTeamPage() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  const [rows] = await connection.execute(
    "SELECT content FROM pages WHERE slug = ?",
    ["about-team"]
  );

  let content = rows[0].content;

  // Remove the entire Dr. J.K. Tiwari section
  const jkSectionStart = content.indexOf("<!-- Dr. J.K. Tiwari -->");
  const jkSectionEnd = content.indexOf(
    "</div>\n        </div>\n\n    <!-- Why Choose Us",
    jkSectionStart
  );

  if (jkSectionStart === -1 || jkSectionEnd === -1) {
    console.log("❌ Could not find Dr. J.K. Tiwari section markers");
    await connection.end();
    return;
  }

  // Remove J.K. Tiwari section
  content =
    content.substring(0, jkSectionStart) + content.substring(jkSectionEnd);

  // Now add Dr. Subodh Kumar's content in the empty section
  const subodhSectionStart = content.indexOf("<!-- Dr. Subodh Kumar -->");
  const subodhEmptyDiv = content.indexOf(
    '<div class="max-w-5xl mx-auto mb-16">\n                \n            </div>',
    subodhSectionStart
  );

  if (subodhEmptyDiv === -1) {
    console.log("❌ Could not find Dr. Subodh Kumar empty section");
    await connection.end();
    return;
  }

  const drSubodhContent = `<div class="max-w-5xl mx-auto mb-16">
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div class="md:flex">
                        <div class="md:w-1/3 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center p-12">
                            <div class="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                <i class="fas fa-user-md text-7xl text-blue-600"></i>
                            </div>
                        </div>
                        <div class="md:w-2/3 p-10">
                            <h3 class="text-3xl font-bold mb-2">Dr. Subodh Kumar</h3>
                            <p class="text-blue-600 font-semibold text-lg mb-6">BPT, MPT (Neurology), Certified Acupuncturist</p>
                            
                            <div class="space-y-4 text-gray-700">
                                <p>Dr. Subodh Kumar is a highly qualified physiotherapist with a Master's degree in Physiotherapy (Neurology) and additional certification in Acupuncture. With over 7 years of clinical experience, he specializes in treating complex neurological conditions and chronic pain disorders.</p>
                                
                                <h4 class="font-bold text-gray-800 mt-6 mb-3">Specializations:</h4>
                                <ul class="space-y-2 ml-6">
                                    <li class="flex items-start gap-2">
                                        <i class="fas fa-check text-blue-600 mt-1"></i>
                                        <span>Advanced neurotherapy & nerve rehabilitation</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <i class="fas fa-check text-blue-600 mt-1"></i>
                                        <span>Acupressure & Sujok Therapy for pain management</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <i class="fas fa-check text-blue-600 mt-1"></i>
                                        <span>Neurotherapy for nerve-related conditions</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <i class="fas fa-check text-blue-600 mt-1"></i>
                                        <span>Holistic treatment for chronic pain conditions</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <i class="fas fa-check text-blue-600 mt-1"></i>
                                        <span>Paralysis and stroke rehabilitation</span>
                                    </li>
                                </ul>
                                
                                <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                                    <p class="text-sm"><i class="fas fa-quote-left text-blue-400 mr-2"></i><em>"My approach is to treat the root cause, not just the symptoms. Every patient deserves personalized care and attention."</em></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

  // Replace the empty div with Dr. Subodh's content
  const emptyDivEnd = content.indexOf("</div>", subodhEmptyDiv) + 6;
  content =
    content.substring(0, subodhEmptyDiv) +
    drSubodhContent +
    content.substring(emptyDivEnd);

  // Update database
  await connection.execute(
    "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
    [content, "about-team"]
  );

  console.log("✅ Fixed team page:");
  console.log("   - Added Dr. Subodh Kumar content");
  console.log("   - Removed Dr. J.K. Tiwari");
  console.log("\nVerification:");
  console.log(
    "Dr. Subodh Kumar present:",
    content.includes("Dr. Subodh Kumar")
  );
  console.log("Dr. J.K. Tiwari present:", content.includes("Dr. J.K. Tiwari"));

  await connection.end();
}

fixTeamPage().catch(console.error);
