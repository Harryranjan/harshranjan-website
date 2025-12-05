const mysql = require("mysql2/promise");
require("dotenv").config();

// Create database connection
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const servicePages = [
  // ========================================
  // SERVICE 1: SPINE & BACK PAIN THERAPY
  // ========================================
  {
    title: "Spine & Back Pain Therapy",
    slug: "spine-back-pain-therapy",
    template: "custom_html",
    status: "published",
    show_in_menu: false,
    parent_id: null, // Can set this to Services page ID if needed
    meta_title: "Spine & Back Pain Therapy - Expert Treatment in Vadodara",
    meta_description:
      "Comprehensive treatment for back pain, low back pain, sciatica, cervical spondylosis & spinal issues. Manual therapy, spinal manipulation & exercises.",
    meta_keywords:
      "back pain treatment vadodara, sciatica treatment, cervical spondylosis, spine therapy, spinal manipulation",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spine & Back Pain Therapy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div class="container mx-auto px-6">
            <nav class="text-sm mb-4">
                <a href="/pages/home" class="text-blue-200 hover:text-white">Home</a>
                <span class="mx-2">/</span>
                <span>Spine & Back Pain Therapy</span>
            </nav>
            <h1 class="text-5xl font-bold mb-4">Spine & Back Pain Therapy</h1>
            <p class="text-xl text-blue-100">Expert treatment for chronic and acute back pain conditions</p>
        </div>
    </section>

    <!-- Overview -->
    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <div class="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
                    <p class="text-lg text-gray-700">
                        <strong>Back pain</strong> is one of the most common health complaints affecting millions worldwide. 
                        Whether it's due to poor posture, injury, or degenerative conditions, our specialized spine therapy 
                        can help you find relief and regain mobility.
                    </p>
                </div>

                <div class="prose prose-lg max-w-none">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6">What is Spine & Back Pain Therapy?</h2>
                    <p class="text-gray-600 mb-6">
                        Our comprehensive spine therapy program combines manual therapy techniques, spinal manipulation, 
                        therapeutic exercises, and neurotherapy to address the root cause of your back pain. We don't just 
                        treat symptoms – we work to restore proper spinal alignment, improve muscle strength, and enhance 
                        overall function.
                    </p>

                    <h3 class="text-2xl font-bold text-gray-800 mb-4 mt-8">Conditions We Treat:</h3>
                    <div class="grid md:grid-cols-2 gap-4 mb-8">
                        <div class="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
                            <i class="fas fa-check-circle text-blue-600 text-xl mt-1"></i>
                            <div>
                                <h4 class="font-semibold mb-1">Low Back Pain (Lumbar Pain)</h4>
                                <p class="text-sm text-gray-600">Acute or chronic pain in the lower back region</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
                            <i class="fas fa-check-circle text-blue-600 text-xl mt-1"></i>
                            <div>
                                <h4 class="font-semibold mb-1">Sciatica</h4>
                                <p class="text-sm text-gray-600">Nerve pain radiating down the leg</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
                            <i class="fas fa-check-circle text-blue-600 text-xl mt-1"></i>
                            <div>
                                <h4 class="font-semibold mb-1">Cervical Spondylosis</h4>
                                <p class="text-sm text-gray-600">Neck pain and stiffness due to age-related changes</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
                            <i class="fas fa-check-circle text-blue-600 text-xl mt-1"></i>
                            <div>
                                <h4 class="font-semibold mb-1">Herniated Disc</h4>
                                <p class="text-sm text-gray-600">Bulging or ruptured spinal disc</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
                            <i class="fas fa-check-circle text-blue-600 text-xl mt-1"></i>
                            <div>
                                <h4 class="font-semibold mb-1">Spinal Stenosis</h4>
                                <p class="text-sm text-gray-600">Narrowing of spinal canal causing nerve compression</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 bg-white p-4 rounded-lg shadow">
                            <i class="fas fa-check-circle text-blue-600 text-xl mt-1"></i>
                            <div>
                                <h4 class="font-semibold mb-1">Postural Problems</h4>
                                <p class="text-sm text-gray-600">Pain from poor posture and muscle imbalances</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Treatment Approach -->
    <section class="bg-white py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Our Treatment Approach</h2>
                
                <div class="space-y-6">
                    <div class="flex items-start gap-4 bg-blue-50 p-6 rounded-lg">
                        <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span class="text-white font-bold">1</span>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Comprehensive Assessment</h3>
                            <p class="text-gray-600">Detailed evaluation of your spine, posture, movement patterns, and pain triggers to identify the root cause.</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-4 bg-blue-50 p-6 rounded-lg">
                        <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span class="text-white font-bold">2</span>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Manual Therapy & Spinal Manipulation</h3>
                            <p class="text-gray-600">Hands-on techniques to restore proper spinal alignment, reduce muscle tension, and improve joint mobility.</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-4 bg-blue-50 p-6 rounded-lg">
                        <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span class="text-white font-bold">3</span>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Therapeutic Exercises</h3>
                            <p class="text-gray-600">Customized exercise programs to strengthen core muscles, improve flexibility, and prevent future injuries.</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-4 bg-blue-50 p-6 rounded-lg">
                        <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span class="text-white font-bold">4</span>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Pain Management Techniques</h3>
                            <p class="text-gray-600">Advanced modalities including acupressure, neurotherapy, and therapeutic massage for immediate pain relief.</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-4 bg-blue-50 p-6 rounded-lg">
                        <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span class="text-white font-bold">5</span>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold mb-2">Education & Prevention</h3>
                            <p class="text-gray-600">Learn proper posture, ergonomics, and self-care strategies to maintain your spinal health long-term.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Benefits -->
    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Expected Benefits</h2>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <i class="fas fa-heartbeat text-blue-600 text-3xl mb-4"></i>
                        <h3 class="text-xl font-bold mb-2">Pain Relief</h3>
                        <p class="text-gray-600">Significant reduction in chronic and acute back pain</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <i class="fas fa-running text-blue-600 text-3xl mb-4"></i>
                        <h3 class="text-xl font-bold mb-2">Improved Mobility</h3>
                        <p class="text-gray-600">Enhanced flexibility and range of motion</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <i class="fas fa-shield-alt text-blue-600 text-3xl mb-4"></i>
                        <h3 class="text-xl font-bold mb-2">Injury Prevention</h3>
                        <p class="text-gray-600">Stronger core and better body mechanics</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <i class="fas fa-smile text-blue-600 text-3xl mb-4"></i>
                        <h3 class="text-xl font-bold mb-2">Better Quality of Life</h3>
                        <p class="text-gray-600">Return to daily activities without limitations</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- What to Expect -->
    <section class="bg-blue-50 py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-800 mb-8">What to Expect During Treatment</h2>
                
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <h3 class="text-xl font-bold mb-4">First Session (45-60 minutes):</h3>
                    <ul class="space-y-3 mb-6 text-gray-700">
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check text-blue-600 mt-1"></i>
                            <span>Detailed medical history and symptom evaluation</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check text-blue-600 mt-1"></i>
                            <span>Physical examination and posture assessment</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check text-blue-600 mt-1"></i>
                            <span>Movement analysis to identify problem areas</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check text-blue-600 mt-1"></i>
                            <span>Initial treatment session</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check text-blue-600 mt-1"></i>
                            <span>Personalized treatment plan discussion</span>
                        </li>
                    </ul>

                    <h3 class="text-xl font-bold mb-4">Follow-up Sessions (30-45 minutes):</h3>
                    <ul class="space-y-3 text-gray-700">
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check text-blue-600 mt-1"></i>
                            <span>Progress assessment and plan adjustments</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check text-blue-600 mt-1"></i>
                            <span>Therapeutic interventions (manual therapy, exercises)</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check text-blue-600 mt-1"></i>
                            <span>Home exercise program updates</span>
                        </li>
                    </ul>

                    <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p class="text-sm text-gray-700">
                            <strong>Typical Treatment Duration:</strong> Most patients see significant improvement within 6-12 sessions, 
                            though this varies based on condition severity and individual response.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold mb-4">Ready to Get Relief from Back Pain?</h2>
            <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Schedule your consultation and start your journey to a pain-free life.</p>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="/pages/contact" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition">
                    <i class="fas fa-calendar-check mr-2"></i>Book Appointment
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
  // SERVICE 2: JOINT PAIN & ARTHRITIS TREATMENT
  // ========================================
  {
    title: "Joint Pain & Arthritis Treatment",
    slug: "joint-pain-arthritis-treatment",
    template: "custom_html",
    status: "published",
    show_in_menu: false,
    meta_title:
      "Joint Pain & Arthritis Treatment - Knee, Hip, Shoulder Pain Relief Vadodara",
    meta_description:
      "Expert treatment for knee pain, frozen shoulder, hip pain, arthritis & joint conditions. Manual therapy, joint mobilization & pain relief in Vadodara.",
    meta_keywords:
      "knee pain treatment vadodara, frozen shoulder treatment, hip pain therapy, arthritis treatment, joint pain relief",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Joint Pain & Arthritis Treatment</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <section class="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div class="container mx-auto px-6">
            <nav class="text-sm mb-4">
                <a href="/pages/home" class="text-green-200 hover:text-white">Home</a>
                <span class="mx-2">/</span>
                <span>Joint Pain & Arthritis Treatment</span>
            </nav>
            <h1 class="text-5xl font-bold mb-4">Joint Pain & Arthritis Treatment</h1>
            <p class="text-xl text-green-100">Comprehensive care for all types of joint pain and mobility issues</p>
        </div>
    </section>

    <!-- Overview -->
    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <div class="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
                    <p class="text-lg text-gray-700">
                        Joint pain can significantly impact your daily life, making simple tasks difficult. Our specialized 
                        joint therapy program helps restore mobility, reduce pain, and improve your quality of life.
                    </p>
                </div>

                <h2 class="text-3xl font-bold text-gray-800 mb-6">What is Joint Pain Therapy?</h2>
                <p class="text-gray-600 mb-8">
                    Our comprehensive approach combines manual therapy, joint mobilization techniques, therapeutic exercises, 
                    and pain management strategies to address the underlying causes of joint pain. We treat the whole person, 
                    not just the symptoms.
                </p>

                <h3 class="text-2xl font-bold text-gray-800 mb-4">Common Joint Conditions We Treat:</h3>
                <div class="grid md:grid-cols-2 gap-4 mb-8">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <div class="flex items-start gap-3">
                            <i class="fas fa-running text-green-600 text-2xl mt-1"></i>
                            <div>
                                <h4 class="font-bold text-lg mb-2">Knee Pain</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• Osteoarthritis of the knee</li>
                                    <li>• Meniscus tears</li>
                                    <li>• Ligament injuries (ACL, MCL)</li>
                                    <li>• Patellofemoral pain syndrome</li>
                                    <li>• Post-surgical rehabilitation</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <div class="flex items-start gap-3">
                            <i class="fas fa-hand-paper text-green-600 text-2xl mt-1"></i>
                            <div>
                                <h4 class="font-bold text-lg mb-2">Shoulder Pain</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• Frozen shoulder (adhesive capsulitis)</li>
                                    <li>• Rotator cuff injuries</li>
                                    <li>• Shoulder impingement</li>
                                    <li>• Bursitis</li>
                                    <li>• Post-fracture rehabilitation</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <div class="flex items-start gap-3">
                            <i class="fas fa-walking text-green-600 text-2xl mt-1"></i>
                            <div>
                                <h4 class="font-bold text-lg mb-2">Hip Pain</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• Hip arthritis</li>
                                    <li>• Hip bursitis</li>
                                    <li>• Hip labral tears</li>
                                    <li>• Post-hip replacement rehab</li>
                                    <li>• Muscle strains</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <div class="flex items-start gap-3">
                            <i class="fas fa-hands text-green-600 text-2xl mt-1"></i>
                            <div>
                                <h4 class="font-bold text-lg mb-2">Other Joint Conditions</h4>
                                <ul class="text-sm text-gray-600 space-y-1">
                                    <li>• Elbow pain (tennis/golfer's elbow)</li>
                                    <li>• Wrist & hand arthritis</li>
                                    <li>• Ankle sprains & instability</li>
                                    <li>• Heel pain & plantar fasciitis</li>
                                    <li>• Rheumatoid arthritis</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Treatment Techniques -->
    <section class="bg-white py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Our Treatment Techniques</h2>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="border border-green-200 rounded-lg p-6 hover:shadow-lg transition">
                        <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
                            <i class="fas fa-hands text-green-600"></i>
                            Joint Mobilization
                        </h3>
                        <p class="text-gray-600">Gentle manual techniques to restore normal joint movement and reduce stiffness.</p>
                    </div>

                    <div class="border border-green-200 rounded-lg p-6 hover:shadow-lg transition">
                        <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
                            <i class="fas fa-dumbbell text-green-600"></i>
                            Strengthening Exercises
                        </h3>
                        <p class="text-gray-600">Targeted exercises to build muscle support around affected joints.</p>
                    </div>

                    <div class="border border-green-200 rounded-lg p-6 hover:shadow-lg transition">
                        <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
                            <i class="fas fa-compress-arrows-alt text-green-600"></i>
                            Range of Motion Therapy
                        </h3>
                        <p class="text-gray-600">Progressive stretching to improve flexibility and joint mobility.</p>
                    </div>

                    <div class="border border-green-200 rounded-lg p-6 hover:shadow-lg transition">
                        <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
                            <i class="fas fa-spa text-green-600"></i>
                            Pain Relief Modalities
                        </h3>
                        <p class="text-gray-600">Advanced techniques including cupping, acupressure, and manual therapy.</p>
                    </div>

                    <div class="border border-green-200 rounded-lg p-6 hover:shadow-lg transition">
                        <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
                            <i class="fas fa-balance-scale text-green-600"></i>
                            Gait & Posture Training
                        </h3>
                        <p class="text-gray-600">Correction of walking patterns and body mechanics to reduce joint stress.</p>
                    </div>

                    <div class="border border-green-200 rounded-lg p-6 hover:shadow-lg transition">
                        <h3 class="text-xl font-bold mb-3 flex items-center gap-2">
                            <i class="fas fa-heartbeat text-green-600"></i>
                            Activity Modification
                        </h3>
                        <p class="text-gray-600">Guidance on lifestyle changes to protect and preserve joint health.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Treatment Process -->
    <section class="bg-green-50 py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Your Treatment Journey</h2>
                
                <div class="space-y-6">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
                            <h3 class="text-xl font-bold">Initial Evaluation</h3>
                        </div>
                        <p class="text-gray-600 ml-16">Comprehensive assessment of your joint condition, pain levels, range of motion, and functional limitations.</p>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
                            <h3 class="text-xl font-bold">Personalized Treatment Plan</h3>
                        </div>
                        <p class="text-gray-600 ml-16">Customized therapy program based on your specific condition, goals, and lifestyle.</p>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
                            <h3 class="text-xl font-bold">Active Treatment Phase</h3>
                        </div>
                        <p class="text-gray-600 ml-16">Regular therapy sessions combining manual therapy, exercises, and pain management techniques.</p>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">4</div>
                            <h3 class="text-xl font-bold">Progress Monitoring</h3>
                        </div>
                        <p class="text-gray-600 ml-16">Regular reassessments to track improvement and adjust treatment as needed.</p>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">5</div>
                            <h3 class="text-xl font-bold">Maintenance & Prevention</h3>
                        </div>
                        <p class="text-gray-600 ml-16">Long-term strategies to maintain joint health and prevent future problems.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Success Stories -->
    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Patient Success Stories</h2>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <div class="flex items-center mb-4">
                            <div class="text-yellow-400 text-lg">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                        <p class="text-gray-600 mb-4">"I had severe knee pain for months. After just 6 sessions, I can walk without pain and even climb stairs comfortably. Dr. Tiwari's expertise is amazing!"</p>
                        <div class="font-semibold">- Mrs. Patel, Age 58</div>
                        <div class="text-sm text-gray-500">Knee Arthritis Patient</div>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <div class="flex items-center mb-4">
                            <div class="text-yellow-400 text-lg">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                        <p class="text-gray-600 mb-4">"My frozen shoulder made it impossible to work. The treatment here gave me back full range of motion. I'm back to my normal life!"</p>
                        <div class="font-semibold">- Mr. Shah, Age 45</div>
                        <div class="text-sm text-gray-500">Frozen Shoulder Patient</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold mb-4">Don't Let Joint Pain Hold You Back</h2>
            <p class="text-xl text-green-100 mb-8 max-w-2xl mx-auto">Get expert treatment and start moving freely again.</p>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="/pages/contact" class="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition">
                    <i class="fas fa-calendar-check mr-2"></i>Book Appointment
                </a>
                <a href="tel:8160754633" class="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition">
                    <i class="fas fa-phone mr-2"></i>Call Now
                </a>
            </div>
        </div>
    </section>
</body>
</html>`,
  },
];

// Rest of services will be added in next batch...
async function createServicePages() {
  let connection;
  try {
    console.log("🔌 Connecting to database...");
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database connected successfully!");

    for (const page of servicePages) {
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
        show_in_menu = VALUES(show_in_menu),
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

    console.log("\n🎉 Service pages (Batch 1) created successfully!");
    console.log("\n📄 Pages created:");
    console.log("1. Spine & Back Pain Therapy");
    console.log("2. Joint Pain & Arthritis Treatment");
    console.log("\n⏭️  Run additional scripts for remaining service pages.");
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

createServicePages();
