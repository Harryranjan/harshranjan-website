const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const pages = [
  // Manual Therapy & Cupping services + Conditions + Testimonials + FAQ + Contact + Gallery
  {
    title: "Manual Therapy & Spinal Manipulation",
    slug: "manual-therapy-spinal-manipulation",
    template: "custom_html",
    status: "published",
    show_in_menu: false,
    meta_title:
      "Manual Therapy & Spinal Manipulation - Hands-on Treatment Vadodara",
    meta_description:
      "Expert manual therapy including spinal manipulation, joint mobilization, soft tissue therapy for pain relief and mobility in Vadodara.",
    meta_keywords:
      "manual therapy vadodara, spinal manipulation, joint mobilization, soft tissue therapy, hands-on treatment",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manual Therapy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <section class="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-16">
        <div class="container mx-auto px-6">
            <nav class="text-sm mb-4">
                <a href="/pages/home" class="text-orange-200 hover:text-white">Home</a>
                <span class="mx-2">/</span>
                <span>Manual Therapy</span>
            </nav>
            <h1 class="text-5xl font-bold mb-4">Manual Therapy & Spinal Manipulation</h1>
            <p class="text-xl text-orange-100">Expert hands-on treatment for pain relief and improved mobility</p>
        </div>
    </section>

    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <p class="text-lg text-gray-700 mb-8">
                    Manual therapy is a specialized form of physical therapy delivered with the hands, rather than machines or devices. 
                    Our certified therapists use hands-on techniques to diagnose and treat soft tissues and joint structures for pain relief, 
                    improved mobility, and reduced inflammation.
                </p>

                <h2 class="text-3xl font-bold text-gray-800 mb-6">Manual Therapy Techniques We Use:</h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-600">
                        <h3 class="font-bold text-lg mb-3"><i class="fas fa-hand-sparkles text-orange-600 mr-2"></i>Spinal Manipulation</h3>
                        <p class="text-gray-600">High-velocity, low-amplitude thrust techniques to restore proper alignment and reduce pain in the spine.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-600">
                        <h3 class="font-bold text-lg mb-3"><i class="fas fa-hand-holding-medical text-orange-600 mr-2"></i>Joint Mobilization</h3>
                        <p class="text-gray-600">Slow, controlled movements to improve joint range of motion and reduce stiffness.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-600">
                        <h3 class="font-bold text-lg mb-3"><i class="fas fa-hands text-orange-600 mr-2"></i>Soft Tissue Mobilization</h3>
                        <p class="text-gray-600">Deep tissue massage and myofascial release to reduce muscle tension and break up scar tissue.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-600">
                        <h3 class="font-bold text-lg mb-3"><i class="fas fa-compress text-orange-600 mr-2"></i>Muscle Energy Techniques</h3>
                        <p class="text-gray-600">Patient participation techniques that use muscle contractions to improve joint position and mobility.</p>
                    </div>
                </div>

                <div class="bg-orange-50 p-8 rounded-xl mt-8">
                    <h3 class="text-2xl font-bold mb-4">Benefits of Manual Therapy:</h3>
                    <ul class="grid md:grid-cols-2 gap-4">
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-orange-600 mt-1"></i>
                            <span>Immediate pain relief</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-orange-600 mt-1"></i>
                            <span>Improved joint mobility</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-orange-600 mt-1"></i>
                            <span>Reduced muscle tension</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-orange-600 mt-1"></i>
                            <span>Enhanced circulation</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-orange-600 mt-1"></i>
                            <span>Faster healing</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-orange-600 mt-1"></i>
                            <span>Improved posture</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold mb-4">Experience the Power of Hands-On Healing</h2>
            <p class="text-xl text-orange-100 mb-8">Let our expert therapists help you move better and feel better.</p>
            <a href="/pages/contact" class="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition inline-block">
                <i class="fas fa-calendar-check mr-2"></i>Book Your Session
            </a>
        </div>
    </section>
</body>
</html>`,
  },

  {
    title: "Cupping & Acupressure Therapy",
    slug: "cupping-acupressure-therapy",
    template: "custom_html",
    status: "published",
    show_in_menu: false,
    meta_title: "Cupping & Acupressure Therapy - Alternative Healing Vadodara",
    meta_description:
      "Traditional cupping therapy and acupressure for pain relief, detoxification, muscle tension and wellness at Pain Therapy & Rehab Centre Vadodara.",
    meta_keywords:
      "cupping therapy vadodara, acupressure treatment, sujok therapy, alternative medicine, holistic healing",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cupping & Acupressure Therapy</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <section class="bg-gradient-to-r from-red-600 to-rose-600 text-white py-16">
        <div class="container mx-auto px-6">
            <nav class="text-sm mb-4">
                <a href="/pages/home" class="text-red-200 hover:text-white">Home</a>
                <span class="mx-2">/</span>
                <span>Cupping & Acupressure Therapy</span>
            </nav>
            <h1 class="text-5xl font-bold mb-4">Cupping & Acupressure Therapy</h1>
            <p class="text-xl text-red-100">Ancient healing techniques for modern wellness</p>
        </div>
    </section>

    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-800 mb-6">Cupping Therapy</h2>
                <p class="text-gray-700 mb-6">
                    Cupping therapy is an ancient form of alternative medicine that involves placing cups on the skin to create suction. 
                    This promotes blood flow, reduces inflammation, and helps with pain relief and relaxation.
                </p>

                <div class="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h3 class="text-xl font-bold mb-4">Benefits of Cupping:</h3>
                        <ul class="space-y-3">
                            <li class="flex items-start gap-2">
                                <i class="fas fa-fire text-red-600 mt-1"></i>
                                <span>Relieves muscle tension and pain</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <i class="fas fa-fire text-red-600 mt-1"></i>
                                <span>Improves blood circulation</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <i class="fas fa-fire text-red-600 mt-1"></i>
                                <span>Reduces inflammation</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <i class="fas fa-fire text-red-600 mt-1"></i>
                                <span>Promotes relaxation & stress relief</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <i class="fas fa-fire text-red-600 mt-1"></i>
                                <span>Aids in detoxification</span>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-red-50 p-6 rounded-xl">
                        <h3 class="text-xl font-bold mb-4">Aftercare Instructions:</h3>
                        <ul class="space-y-2 text-sm text-gray-700">
                            <li>✓ Drink plenty of water (8-10 glasses)</li>
                            <li>✓ Avoid caffeine & alcohol for 24 hours</li>
                            <li>✓ Rest and avoid strenuous activity</li>
                            <li>✓ Keep the area clean and dry</li>
                            <li>✓ Circular marks are normal and will fade in 3-7 days</li>
                            <li>✓ Avoid cold showers immediately after treatment</li>
                        </ul>
                    </div>
                </div>

                <hr class="my-12" />

                <h2 class="text-3xl font-bold text-gray-800 mb-6">Acupressure & Sujok Therapy</h2>
                <p class="text-gray-700 mb-6">
                    Acupressure is a traditional Chinese healing method involving applying pressure to specific points on the body to 
                    promote healing and wellness. Sujok therapy is a specialized form focusing on hands and feet correspondence points.
                </p>

                <div class="grid md:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <i class="fas fa-hand-pointer text-red-600 text-3xl mb-4"></i>
                        <h3 class="font-bold text-lg mb-2">Pain Relief</h3>
                        <p class="text-gray-600 text-sm">Effective for headaches, back pain, joint pain, and muscle tension</p>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <i class="fas fa-spa text-red-600 text-3xl mb-4"></i>
                        <h3 class="font-bold text-lg mb-2">Stress Reduction</h3>
                        <p class="text-gray-600 text-sm">Promotes relaxation and reduces anxiety & stress levels</p>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <i class="fas fa-heart-pulse text-red-600 text-3xl mb-4"></i>
                        <h3 class="font-bold text-lg mb-2">Energy Balance</h3>
                        <p class="text-gray-600 text-sm">Restores energy flow and promotes overall wellness</p>
                    </div>
                </div>

                <div class="bg-gray-100 p-8 rounded-xl mt-8">
                    <h3 class="text-2xl font-bold mb-4 text-center">What to Expect During Your Session</h3>
                    <p class="text-gray-700 mb-4">
                        Both cupping and acupressure sessions are painless and relaxing. Most patients feel immediate relief and a sense of 
                        deep relaxation. Sessions typically last 30-45 minutes.
                    </p>
                    <p class="text-gray-700 text-sm italic text-center">
                        Note: These therapies complement, but do not replace, conventional medical treatment.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-gradient-to-r from-red-600 to-rose-600 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold mb-4">Discover the Benefits of Alternative Healing</h2>
            <p class="text-xl text-red-100 mb-8">Experience traditional therapies backed by modern expertise.</p>
            <a href="/pages/contact" class="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition inline-block">
                <i class="fas fa-calendar-check mr-2"></i>Book Your Therapy
            </a>
        </div>
    </section>
</body>
</html>`,
  },

  {
    title: "Conditions We Treat",
    slug: "conditions-we-treat",
    template: "custom_html",
    status: "published",
    show_in_menu: true,
    menu_order: 3,
    meta_title: "Conditions We Treat - Pain & Rehabilitation Services Vadodara",
    meta_description:
      "Comprehensive list of conditions treated at Pain Therapy & Rehab Centre including back pain, sciatica, paralysis, joint pain, post-surgery rehab and more.",
    meta_keywords:
      "pain conditions vadodara, rehabilitation services, orthopedic conditions, neurological conditions treatment",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conditions We Treat</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <section class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl font-bold mb-4">Conditions We Treat</h1>
            <p class="text-xl text-blue-100">Comprehensive care for a wide range of pain and mobility conditions</p>
        </div>
    </section>

    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-6xl mx-auto">
                <!-- Spine & Back -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <i class="fas fa-spine text-blue-600"></i>
                        Spine & Back Conditions
                    </h2>
                    <div class="grid md:grid-cols-3 gap-4">
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Low Back Pain</h3>
                            <p class="text-sm text-gray-600">Acute or chronic lumbar pain</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Sciatica</h3>
                            <p class="text-sm text-gray-600">Nerve pain radiating to leg</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Neck Pain</h3>
                            <p class="text-sm text-gray-600">Cervical pain and stiffness</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Cervical Spondylosis</h3>
                            <p class="text-sm text-gray-600">Age-related neck degeneration</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Herniated Disc</h3>
                            <p class="text-sm text-gray-600">Bulging or ruptured disc</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Spinal Stenosis</h3>
                            <p class="text-sm text-gray-600">Spinal canal narrowing</p>
                        </div>
                    </div>
                </div>

                <!-- Joint Conditions -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <i class="fas fa-bone text-green-600"></i>
                        Joint & Musculoskeletal Conditions
                    </h2>
                    <div class="grid md:grid-cols-3 gap-4">
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Knee Pain & Arthritis</h3>
                            <p class="text-sm text-gray-600">Osteoarthritis, meniscus tears</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Frozen Shoulder</h3>
                            <p class="text-sm text-gray-600">Adhesive capsulitis</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Hip Pain</h3>
                            <p class="text-sm text-gray-600">Hip arthritis, bursitis</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Heel Pain</h3>
                            <p class="text-sm text-gray-600">Plantar fasciitis, heel spurs</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Tennis/Golfer's Elbow</h3>
                            <p class="text-sm text-gray-600">Lateral/medial epicondylitis</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Rheumatoid Arthritis</h3>
                            <p class="text-sm text-gray-600">Autoimmune joint inflammation</p>
                        </div>
                    </div>
                </div>

                <!-- Neurological -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <i class="fas fa-brain text-teal-600"></i>
                        Neurological Conditions
                    </h2>
                    <div class="grid md:grid-cols-3 gap-4">
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Paralysis</h3>
                            <p class="text-sm text-gray-600">Stroke, hemiplegia, paraplegia</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Peripheral Neuropathy</h3>
                            <p class="text-sm text-gray-600">Nerve damage, numbness</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Bell's Palsy</h3>
                            <p class="text-sm text-gray-600">Facial nerve paralysis</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Spinal Cord Injury</h3>
                            <p class="text-sm text-gray-600">Traumatic or non-traumatic</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Parkinson's Disease</h3>
                            <p class="text-sm text-gray-600">Movement disorder management</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Multiple Sclerosis</h3>
                            <p class="text-sm text-gray-600">MS symptom management</p>
                        </div>
                    </div>
                </div>

                <!-- Post-Surgical -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <i class="fas fa-procedures text-purple-600"></i>
                        Post-Surgical Rehabilitation
                    </h2>
                    <div class="grid md:grid-cols-3 gap-4">
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Knee Replacement</h3>
                            <p class="text-sm text-gray-600">Total/partial TKR recovery</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Hip Replacement</h3>
                            <p class="text-sm text-gray-600">THR rehabilitation</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">ACL Reconstruction</h3>
                            <p class="text-sm text-gray-600">Ligament surgery recovery</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Spinal Surgery</h3>
                            <p class="text-sm text-gray-600">Fusion, discectomy rehab</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Rotator Cuff Repair</h3>
                            <p class="text-sm text-gray-600">Shoulder surgery recovery</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            <h3 class="font-bold mb-1">Fracture Rehabilitation</h3>
                            <p class="text-sm text-gray-600">Post-fracture recovery</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-blue-600 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl font-bold mb-4">Don't See Your Condition Listed?</h2>
            <p class="text-xl text-blue-100 mb-8">We treat many other conditions. Contact us to discuss your specific needs.</p>
            <a href="/pages/contact" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition inline-block">
                <i class="fas fa-phone mr-2"></i>Contact Us
            </a>
        </div>
    </section>
</body>
</html>`,
  },

  {
    title: "Patient Testimonials & Reviews",
    slug: "testimonials",
    template: "custom_html",
    status: "published",
    show_in_menu: true,
    menu_order: 4,
    meta_title:
      "Patient Testimonials & Reviews - Pain Therapy & Rehab Centre Vadodara",
    meta_description:
      "Read real patient reviews and success stories from Pain Therapy & Rehab Centre. 4.8/5 rating with 30+ satisfied patients in Vadodara.",
    meta_keywords:
      "patient reviews vadodara, physiotherapy testimonials, pain therapy reviews, rehab center ratings",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Patient Testimonials</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <section class="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl font-bold mb-4">Patient Testimonials</h1>
            <p class="text-xl text-purple-100 mb-6">Real Stories from Real Patients</p>
            <div class="flex items-center justify-center gap-4">
                <div class="text-5xl font-bold">4.8</div>
                <div>
                    <div class="text-yellow-300 text-2xl">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <div class="text-sm text-purple-200">Based on 30+ Reviews</div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Testimonial 1 -->
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="text-yellow-400 text-lg">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-6">"Excellent treatment for my chronic back pain. Dr. Subodh's holistic approach really works. I'm pain-free after years of suffering!"</p>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-blue-600"></i>
                        </div>
                        <div>
                            <div class="font-semibold">Rajesh Patel</div>
                            <div class="text-sm text-gray-500">Back Pain Patient</div>
                        </div>
                    </div>
                </div>

                <!-- Testimonial 2 -->
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="text-yellow-400 text-lg">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-6">"Dr. Tiwari helped me recover completely after knee surgery. His expertise and care are outstanding. Highly recommend!"</p>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-teal-600"></i>
                        </div>
                        <div>
                            <div class="font-semibold">Priya Shah</div>
                            <div class="text-sm text-gray-500">Post-Surgery Patient</div>
                        </div>
                    </div>
                </div>

                <!-- Testimonial 3 -->
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="text-yellow-400 text-lg">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-6">"Amazing results with cupping therapy. My shoulder pain reduced significantly within weeks. Very professional team!"</p>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-purple-600"></i>
                        </div>
                        <div>
                            <div class="font-semibold">Amit Desai</div>
                            <div class="text-sm text-gray-500">Shoulder Pain Patient</div>
                        </div>
                    </div>
                </div>

                <!-- Add more testimonials... -->
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="text-yellow-400 text-lg">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-6">"My father had a stroke. Dr. Subodh's neuro therapy helped him regain mobility. We are so grateful for the care!"</p>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-green-600"></i>
                        </div>
                        <div>
                            <div class="font-semibold">Meera Joshi</div>
                            <div class="text-sm text-gray-500">Family Member</div>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="text-yellow-400 text-lg">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-6">"I had severe knee pain for years. After treatment here, I can walk comfortably and even climb stairs. Life-changing!"</p>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-orange-600"></i>
                        </div>
                        <div>
                            <div class="font-semibold">Kiran Mehta</div>
                            <div class="text-sm text-gray-500">Knee Pain Patient</div>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="text-yellow-400 text-lg">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-6">"Best physiotherapy center in Vadodara! Professional staff, clean facility, and effective treatments. Totally worth it."</p>
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-red-600"></i>
                        </div>
                        <div>
                            <div class="font-semibold">Vikram Singh</div>
                            <div class="text-sm text-gray-500">General Patient</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-purple-50 py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">Ready to Experience Expert Care?</h2>
            <p class="text-xl text-gray-600 mb-8">Join our happy patients and start your recovery journey today.</p>
            <a href="/pages/contact" class="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition inline-block">
                <i class="fas fa-calendar-check mr-2"></i>Book Your Appointment
            </a>
        </div>
    </section>
</body>
</html>`,
  },
];

async function createFinalPages() {
  let connection;
  try {
    console.log("🔌 Connecting to database...");
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database connected successfully!");

    for (const page of pages) {
      const query = `
        INSERT INTO pages (
          title, slug, content, template, meta_title, meta_description, meta_keywords, 
          status, show_in_menu, menu_order, parent_id, hide_title, author_id, 
          created_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 1, NOW(), NOW())
        ON DUPLICATE KEY UPDATE
        content = VALUES(content),
        template = VALUES(template),
        meta_title = VALUES(meta_title),
        meta_description = VALUES(meta_description),
        meta_keywords = VALUES(meta_keywords),
        status = VALUES(status),
        show_in_menu = VALUES(show_in_menu),
        menu_order = VALUES(menu_order),
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
        page.menu_order || 0,
        page.parent_id || null,
      ]);

      console.log(`✅ Created/Updated: ${page.title}`);
    }

    console.log("\n🎉 Final pages created successfully!");
    console.log("\n📄 Pages created:");
    console.log("1. Manual Therapy & Spinal Manipulation");
    console.log("2. Cupping & Acupressure Therapy");
    console.log("3. Conditions We Treat");
    console.log("4. Patient Testimonials & Reviews");
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

createFinalPages();
