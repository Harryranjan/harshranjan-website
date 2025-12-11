const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const additionalPages = [
  // ========================================
  // NEURO / PARALYSIS REHAB
  // ========================================
  {
    title: "Neuro Rehabilitation & Paralysis Treatment",
    slug: "neuro-paralysis-rehab",
    template: "custom_html",
    status: "published",
    show_in_menu: false,
    meta_title:
      "Neuro Rehabilitation & Paralysis Treatment - Stroke Recovery Vadodara",
    meta_description:
      "Expert neuro rehab for paralysis, stroke recovery, numbness, neuropathy & nerve-related conditions. Neurotherapy & specialized care in Vadodara.",
    meta_keywords:
      "neuro rehabilitation vadodara, paralysis treatment, stroke recovery, neurotherapy, nerve pain treatment",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neuro Rehabilitation</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <section class="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16">
        <div class="container mx-auto px-6">
            <nav class="text-sm mb-4">
                <a href="/pages/home" class="text-teal-200 hover:text-white">Home</a>
                <span class="mx-2">/</span>
                <span>Neuro Rehabilitation</span>
            </nav>
            <h1 class="text-5xl font-bold mb-4">Neuro Rehabilitation & Paralysis Treatment</h1>
            <p class="text-xl text-teal-100">Specialized care for neurological conditions and recovery</p>
        </div>
    </section>

    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <div class="bg-teal-50 border-l-4 border-teal-600 p-6 mb-8">
                    <p class="text-lg text-gray-700">
                        Neurological conditions require specialized care and expertise. Our neuro rehabilitation program 
                        helps restore function, improve mobility, and enhance quality of life for patients with nerve-related conditions.
                    </p>
                </div>

                <h2 class="text-3xl font-bold text-gray-800 mb-6">Conditions We Treat</h2>
                <div class="grid md:grid-cols-2 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
                            <i class="fas fa-brain text-teal-600"></i>
                            Stroke Recovery
                        </h3>
                        <p class="text-gray-600 mb-3">Post-stroke rehabilitation to regain movement, speech, and independence.</p>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li>• Hemiplegia (one-sided paralysis)</li>
                            <li>• Balance & coordination issues</li>
                            <li>• Gait training</li>
                        </ul>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
                            <i class="fas fa-wheelchair text-teal-600"></i>
                            Paralysis Conditions
                        </h3>
                        <p class="text-gray-600 mb-3">Comprehensive rehab for various forms of paralysis.</p>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li>• Paraplegia (lower body paralysis)</li>
                            <li>• Bell's Palsy (facial paralysis)</li>
                            <li>• Nerve injury-related paralysis</li>
                        </ul>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
                            <i class="fas fa-bolt text-teal-600"></i>
                            Neuropathy & Numbness
                        </h3>
                        <p class="text-gray-600 mb-3">Treatment for nerve damage and sensation loss.</p>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li>• Peripheral neuropathy</li>
                            <li>• Diabetic neuropathy</li>
                            <li>• Numbness in hands/feet</li>
                        </ul>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
                            <i class="fas fa-head-side-virus text-teal-600"></i>
                            Other Neurological Conditions
                        </h3>
                        <p class="text-gray-600 mb-3">Specialized care for various nerve disorders.</p>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li>• Parkinson's disease management</li>
                            <li>• Multiple sclerosis support</li>
                            <li>• Spinal cord injuries</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-white py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Our Neurotherapy Approach</h2>
                
                <div class="space-y-6">
                    <div class="bg-teal-50 p-6 rounded-lg">
                        <h3 class="text-xl font-bold mb-3">
                            <i class="fas fa-microscope text-teal-600 mr-2"></i>
                            Comprehensive Assessment
                        </h3>
                        <p class="text-gray-700">Detailed neurological evaluation including muscle strength, sensation, coordination, balance, and functional abilities.</p>
                    </div>

                    <div class="bg-teal-50 p-6 rounded-lg">
                        <h3 class="text-xl font-bold mb-3">
                            <i class="fas fa-dumbbell text-teal-600 mr-2"></i>
                            Neurodevelopmental Techniques (NDT)
                        </h3>
                        <p class="text-gray-700">Specialized exercises and handling techniques to facilitate normal movement patterns and motor control.</p>
                    </div>

                    <div class="bg-teal-50 p-6 rounded-lg">
                        <h3 class="text-xl font-bold mb-3">
                            <i class="fas fa-brain text-teal-600 mr-2"></i>
                            Neuroplasticity Training
                        </h3>
                        <p class="text-gray-700">Task-specific training to help the brain form new neural pathways and recover lost functions.</p>
                    </div>

                    <div class="bg-teal-50 p-6 rounded-lg">
                        <h3 class="text-xl font-bold mb-3">
                            <i class="fas fa-spa text-teal-600 mr-2"></i>
                            Acupressure & Sujok Therapy
                        </h3>
                        <p class="text-gray-700">Traditional healing techniques to stimulate nerve function and improve circulation.</p>
                    </div>

                    <div class="bg-teal-50 p-6 rounded-lg">
                        <h3 class="text-xl font-bold mb-3">
                            <i class="fas fa-hands-helping text-teal-600 mr-2"></i>
                            Activities of Daily Living (ADL) Training
                        </h3>
                        <p class="text-gray-700">Practical training to help you regain independence in daily activities like dressing, eating, and bathing.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-teal-50 py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-800 mb-8">Treatment Goals & Expected Outcomes</h2>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <i class="fas fa-walking text-teal-600 text-3xl mb-4"></i>
                        <h3 class="text-xl font-bold mb-2">Improved Mobility</h3>
                        <p class="text-gray-600">Regain ability to walk, move, and perform daily activities independently.</p>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <i class="fas fa-muscle text-teal-600 text-3xl mb-4"></i>
                        <h3 class="text-xl font-bold mb-2">Increased Strength</h3>
                        <p class="text-gray-600">Build muscle strength in affected areas through targeted exercises.</p>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <i class="fas fa-hand-holding-heart text-teal-600 text-3xl mb-4"></i>
                        <h3 class="text-xl font-bold mb-2">Better Coordination</h3>
                        <p class="text-gray-600">Improve hand-eye coordination and fine motor skills.</p>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <i class="fas fa-smile text-teal-600 text-3xl mb-4"></i>
                        <h3 class="text-xl font-bold mb-2">Enhanced Quality of Life</h3>
                        <p class="text-gray-600">Return to meaningful activities and social participation.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <div class="bg-white p-8 rounded-xl shadow-xl">
                    <h2 class="text-2xl font-bold text-gray-800 mb-6">Why Early Intervention Matters</h2>
                    <p class="text-gray-700 mb-4">
                        The sooner you begin neuro rehabilitation after a stroke, injury, or neurological diagnosis, the better your chances of recovery. 
                        Early intervention can:
                    </p>
                    <ul class="space-y-3 text-gray-700">
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-teal-600 mt-1"></i>
                            <span>Prevent secondary complications and muscle atrophy</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-teal-600 mt-1"></i>
                            <span>Maximize neuroplasticity during the critical recovery window</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-teal-600 mt-1"></i>
                            <span>Improve long-term functional outcomes</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-teal-600 mt-1"></i>
                            <span>Reduce dependency and improve independence</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold mb-4">Start Your Recovery Journey Today</h2>
            <p class="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">Expert neuro rehabilitation to help you regain function and independence.</p>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="/pages/contact" class="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-teal-50 transition">
                    <i class="fas fa-calendar-check mr-2"></i>Book Consultation
                </a>
                <a href="tel:8160754633" class="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition">
                    <i class="fas fa-phone mr-2"></i>Call: 8160754633
                </a>
            </div>
        </div>
    </section>
</body>
</html>`,
  },

  // ========================================
  // POST-OPERATIVE REHABILITATION
  // ========================================
  {
    title: "Post-Operative Rehabilitation",
    slug: "post-operative-rehabilitation",
    template: "custom_html",
    status: "published",
    show_in_menu: false,
    meta_title:
      "Post-Operative Rehabilitation - Post-Surgery Recovery Vadodara",
    meta_description:
      "Expert post-operative rehab after knee, hip, shoulder surgery. Faster recovery, pain management & mobility restoration in Vadodara.",
    meta_keywords:
      "post surgery rehabilitation vadodara, post operative physiotherapy, knee surgery recovery, hip replacement rehab",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post-Operative Rehabilitation</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <section class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div class="container mx-auto px-6">
            <nav class="text-sm mb-4">
                <a href="/pages/home" class="text-purple-200 hover:text-white">Home</a>
                <span class="mx-2">/</span>
                <span>Post-Operative Rehabilitation</span>
            </nav>
            <h1 class="text-5xl font-bold mb-4">Post-Operative Rehabilitation</h1>
            <p class="text-xl text-purple-100">Accelerate your recovery after surgery with expert care</p>
        </div>
    </section>

    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <div class="bg-purple-50 border-l-4 border-purple-600 p-6 mb-8">
                    <p class="text-lg text-gray-700">
                        Surgery is just the first step. Proper rehabilitation is crucial for complete recovery, regaining strength, 
                        and returning to your normal activities safely and efficiently.
                    </p>
                </div>

                <h2 class="text-3xl font-bold text-gray-800 mb-6">Why Post-Operative Rehab is Essential</h2>
                <div class="grid md:grid-cols-2 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <i class="fas fa-clock text-purple-600 text-3xl mb-3"></i>
                        <h3 class="font-bold text-lg mb-2">Faster Recovery</h3>
                        <p class="text-gray-600">Structured rehab helps you heal faster and return to normal activities sooner.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <i class="fas fa-shield-alt text-purple-600 text-3xl mb-3"></i>
                        <h3 class="font-bold text-lg mb-2">Prevent Complications</h3>
                        <p class="text-gray-600">Reduce risk of infections, blood clots, muscle atrophy, and joint stiffness.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <i class="fas fa-dumbbell text-purple-600 text-3xl mb-3"></i>
                        <h3 class="font-bold text-lg mb-2">Restore Function</h3>
                        <p class="text-gray-600">Regain full range of motion, strength, and functional abilities.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <i class="fas fa-heart-pulse text-purple-600 text-3xl mb-3"></i>
                        <h3 class="font-bold text-lg mb-2">Better Outcomes</h3>
                        <p class="text-gray-600">Maximize surgical results and improve long-term success.</p>
                    </div>
                </div>

                <h3 class="text-2xl font-bold text-gray-800 mb-4">Surgeries We Provide Rehab For:</h3>
                <div class="grid md:grid-cols-3 gap-4">
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <h4 class="font-bold mb-2"><i class="fas fa-bone text-purple-600 mr-2"></i>Orthopedic Surgeries</h4>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li>• Knee replacement (TKR)</li>
                            <li>• Hip replacement (THR)</li>
                            <li>• ACL reconstruction</li>
                            <li>• Rotator cuff repair</li>
                            <li>• Fracture fixation</li>
                        </ul>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <h4 class="font-bold mb-2"><i class="fas fa-spine text-purple-600 mr-2"></i>Spinal Surgeries</h4>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li>• Disc replacement</li>
                            <li>• Spinal fusion</li>
                            <li>• Laminectomy</li>
                            <li>• Discectomy</li>
                        </ul>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <h4 class="font-bold mb-2"><i class="fas fa-hand-holding-medical text-purple-600 mr-2"></i>Other Surgeries</h4>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li>• Arthroscopy</li>
                            <li>• Tendon repairs</li>
                            <li>• Joint surgeries</li>
                            <li>• Sports injury surgeries</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-white py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Our Rehabilitation Process</h2>
                
                <div class="space-y-6">
                    <div class="border-l-4 border-purple-600 pl-6 py-4">
                        <h3 class="text-xl font-bold mb-2">Phase 1: Early Post-Op (Days 1-14)</h3>
                        <p class="text-gray-600 mb-3">Focus on pain management, wound healing, and preventing complications.</p>
                        <ul class="text-sm text-gray-600 space-y-1 ml-4">
                            <li>• Gentle range of motion exercises</li>
                            <li>• Swelling and pain management</li>
                            <li>• Basic mobility training</li>
                            <li>• Education on precautions</li>
                        </ul>
                    </div>

                    <div class="border-l-4 border-purple-600 pl-6 py-4">
                        <h3 class="text-xl font-bold mb-2">Phase 2: Intermediate Rehab (Weeks 2-6)</h3>
                        <p class="text-gray-600 mb-3">Progressive strengthening and functional training.</p>
                        <ul class="text-sm text-gray-600 space-y-1 ml-4">
                            <li>• Gradual increase in exercise intensity</li>
                            <li>• Balance and coordination training</li>
                            <li>• Muscle strengthening</li>
                            <li>• Gait training and mobility</li>
                        </ul>
                    </div>

                    <div class="border-l-4 border-purple-600 pl-6 py-4">
                        <h3 class="text-xl font-bold mb-2">Phase 3: Advanced Recovery (Weeks 6-12+)</h3>
                        <p class="text-gray-600 mb-3">Return to full function and activity.</p>
                        <ul class="text-sm text-gray-600 space-y-1 ml-4">
                            <li>• Sport-specific or job-specific training</li>
                            <li>• Advanced strengthening exercises</li>
                            <li>• Return to activities program</li>
                            <li>• Long-term maintenance strategies</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-purple-50 py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">What to Expect</h2>
                
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <h3 class="text-xl font-bold mb-4">Your First Visit:</h3>
                    <ul class="space-y-3 text-gray-700 mb-6">
                        <li class="flex items-start gap-2">
                            <i class="fas fa-clipboard-check text-purple-600 mt-1"></i>
                            <span>Review of surgical procedure and surgeon's guidelines</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-clipboard-check text-purple-600 mt-1"></i>
                            <span>Assessment of current mobility, pain levels, and functional status</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-clipboard-check text-purple-600 mt-1"></i>
                            <span>Development of personalized rehabilitation plan</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-clipboard-check text-purple-600 mt-1"></i>
                            <span>Goal-setting for recovery milestones</span>
                        </li>
                    </ul>

                    <div class="bg-purple-50 p-4 rounded-lg">
                        <p class="text-sm text-gray-700">
                            <strong>Duration:</strong> Most patients require 8-12 weeks of rehab, with 2-3 sessions per week. 
                            Timeline varies based on surgery type and individual healing rate.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold mb-4">Optimize Your Surgical Outcome</h2>
            <p class="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">Professional post-operative care for a complete and confident recovery.</p>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="/pages/contact" class="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition">
                    <i class="fas fa-calendar-check mr-2"></i>Schedule Consultation
                </a>
                <a href="tel:8160754633" class="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition">
                    <i class="fas fa-phone mr-2"></i>Call: 8160754633
                </a>
            </div>
        </div>
    </section>
</body>
</html>`,
  },
];

async function createAdditionalPages() {
  let connection;
  try {
    console.log("🔌 Connecting to database...");
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database connected successfully!");

    for (const page of additionalPages) {
      const query = `
        INSERT INTO pages (
          title, slug, content, template, meta_title, meta_description, meta_keywords, 
          status, show_in_menu, parent_id, hide_title, author_id, 
          created_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 1, NOW(), NOW())
        ON DUPLICATE KEY UPDATE
        content = VALUES(content),
        template = VALUES(template),
        meta_title = VALUES(meta_title),
        meta_description = VALUES(meta_description),
        meta_keywords = VALUES(meta_keywords),
        status = VALUES(status),
        updated_at = NOW()
      `;

      const [result] = await connection.execute(query, [
        page.title,
        page.slug,
        page.content,
        page.template,
        page.meta_title,
        page.meta_description,
        page.meta_keywords,
        page.status,
        page.show_in_menu || false,
        page.parent_id || null,
      ]);

      console.log(`✅ Created/Updated: ${page.title}`);
    }

    console.log("\n🎉 Additional service pages created!");
    console.log("\n📄 Pages created:");
    console.log("1. Neuro Rehabilitation & Paralysis Treatment");
    console.log("2. Post-Operative Rehabilitation");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log("🔌 Database connection closed");
    }
    process.exit(0);
  }
}

createAdditionalPages();
