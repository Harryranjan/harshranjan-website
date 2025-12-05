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

const pages = [
  // ========================================
  // 1. HOME PAGE
  // ========================================
  {
    title: "Pain Therapy & Rehab Centre - Home",
    slug: "home",
    template: "custom_html",
    status: "published",
    is_homepage: true,
    show_in_menu: true,
    menu_order: 1,
    meta_title:
      "Pain Therapy & Rehab Centre - Expert Pain Management & Physiotherapy in Vadodara",
    meta_description:
      "Leading pain management and rehabilitation center in Vadodara. Expert treatment for back pain, sciatica, paralysis, joint pain, and post-operative rehab. Dr. Subodh Kumar & Dr. J.K. Tiwari.",
    meta_keywords:
      "pain therapy vadodara, physiotherapy vadodara, rehab centre ajwa road, back pain treatment, sciatica treatment, neuro rehab vadodara",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pain Therapy & Rehab Centre - Vadodara</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 class="text-5xl font-bold mb-6">Expert Pain Management & Rehabilitation</h1>
                    <p class="text-xl mb-8 text-blue-50">Compassionate care for chronic pain, neurological conditions, and post-operative recovery in Vadodara.</p>
                    <div class="flex flex-wrap gap-4 mb-8">
                        <a href="/pages/contact" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition">Book Appointment</a>
                        <a href="tel:8160754633" class="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition">
                            <i class="fas fa-phone mr-2"></i>Call Now
                        </a>
                    </div>
                    <div class="flex items-center gap-6">
                        <div class="flex -space-x-2">
                            <div class="w-10 h-10 rounded-full bg-blue-300 border-2 border-white"></div>
                            <div class="w-10 h-10 rounded-full bg-blue-200 border-2 border-white"></div>
                            <div class="w-10 h-10 rounded-full bg-blue-100 border-2 border-white"></div>
                        </div>
                        <div>
                            <div class="font-semibold">4.8/5 Rating</div>
                            <div class="text-sm text-blue-100">30+ Happy Patients</div>
                        </div>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                        <h3 class="text-2xl font-bold mb-6">Why Choose Us?</h3>
                        <ul class="space-y-4">
                            <li class="flex items-start gap-3">
                                <i class="fas fa-check-circle text-yellow-300 text-xl mt-1"></i>
                                <span>7+ Years of Excellence in Healthcare</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <i class="fas fa-check-circle text-yellow-300 text-xl mt-1"></i>
                                <span>Expert Team: MD, BPT Certified Doctors</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <i class="fas fa-check-circle text-yellow-300 text-xl mt-1"></i>
                                <span>Holistic Approach: Manual + Neuro + Alternative Therapies</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <i class="fas fa-check-circle text-yellow-300 text-xl mt-1"></i>
                                <span>Convenient Location: Ajwa Road, Vadodara</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Contact Bar -->
    <section class="bg-white shadow-lg py-6">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-3 gap-6 text-center">
                <div class="flex items-center justify-center gap-3">
                    <i class="fas fa-phone-alt text-blue-600 text-2xl"></i>
                    <div class="text-left">
                        <div class="text-sm text-gray-600">Call Us</div>
                        <div class="font-semibold text-lg">8160754633 / 9601704565</div>
                    </div>
                </div>
                <div class="flex items-center justify-center gap-3">
                    <i class="fas fa-map-marker-alt text-blue-600 text-2xl"></i>
                    <div class="text-left">
                        <div class="text-sm text-gray-600">Visit Us</div>
                        <div class="font-semibold">Ajwa Road, Vadodara</div>
                    </div>
                </div>
                <div class="flex items-center justify-center gap-3">
                    <i class="fas fa-clock text-blue-600 text-2xl"></i>
                    <div class="text-left">
                        <div class="text-sm text-gray-600">Working Hours</div>
                        <div class="font-semibold">Tue-Sun: 10AM - 1PM</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Core Services -->
    <section class="py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">Our Core Services</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive pain management and rehabilitation services tailored to your recovery needs.</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Service 1 -->
                <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <i class="fas fa-spine text-blue-600 text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Spine & Back Pain Therapy</h3>
                    <p class="text-gray-600 mb-6">Expert treatment for back pain, sciatica, cervical spondylosis, and spinal issues using manual therapy and advanced techniques.</p>
                    <a href="/pages/spine-back-pain-therapy" class="text-blue-600 font-semibold hover:text-blue-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>

                <!-- Service 2 -->
                <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
                    <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                        <i class="fas fa-brain text-teal-600 text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Neuro Rehabilitation</h3>
                    <p class="text-gray-600 mb-6">Specialized care for paralysis, stroke recovery, numbness, nerve-related conditions, and neurological disorders.</p>
                    <a href="/pages/neuro-paralysis-rehab" class="text-teal-600 font-semibold hover:text-teal-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>

                <!-- Service 3 -->
                <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                        <i class="fas fa-procedures text-purple-600 text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Post-Operative Rehab</h3>
                    <p class="text-gray-600 mb-6">Comprehensive rehabilitation programs to help you recover faster and regain mobility after surgery.</p>
                    <a href="/pages/post-operative-rehabilitation" class="text-purple-600 font-semibold hover:text-purple-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>

                <!-- Service 4 -->
                <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
                    <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                        <i class="fas fa-hands text-orange-600 text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Manual Therapy</h3>
                    <p class="text-gray-600 mb-6">Hands-on techniques including spinal manipulation, joint mobilization, and therapeutic exercises.</p>
                    <a href="/pages/manual-therapy-spinal-manipulation" class="text-orange-600 font-semibold hover:text-orange-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>

                <!-- Service 5 -->
                <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                        <i class="fas fa-fire-alt text-red-600 text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Cupping & Acupressure</h3>
                    <p class="text-gray-600 mb-6">Alternative healing therapies for pain relief, muscle tension, and overall wellness improvement.</p>
                    <a href="/pages/cupping-acupressure-therapy" class="text-red-600 font-semibold hover:text-red-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>

                <!-- Service 6 -->
                <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <i class="fas fa-bone text-green-600 text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Joint Pain Treatment</h3>
                    <p class="text-gray-600 mb-6">Effective solutions for knee pain, frozen shoulder, hip pain, arthritis, and other joint conditions.</p>
                    <a href="/pages/joint-pain-arthritis-treatment" class="text-green-600 font-semibold hover:text-green-700">
                        Learn More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Meet Our Doctors -->
    <section class="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">Meet Our Expert Team</h2>
                <p class="text-xl text-gray-600">Experienced healthcare professionals dedicated to your recovery</p>
            </div>

            <div class="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <!-- Doctor 1 -->
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
                    <div class="p-8 -mt-16">
                        <div class="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg mx-auto mb-6 flex items-center justify-center">
                            <i class="fas fa-user-md text-5xl text-blue-600"></i>
                        </div>
                        <div class="text-center">
                            <h3 class="text-2xl font-bold mb-2">Dr. Subodh Kumar</h3>
                            <p class="text-blue-600 font-semibold mb-4">MD (ACU), Sujok Therapist, Neurotherapist</p>
                            <p class="text-gray-600">Expert in acupressure therapy, neuro therapy, and holistic pain management with years of clinical experience.</p>
                        </div>
                    </div>
                </div>

                <!-- Doctor 2 -->
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div class="bg-gradient-to-r from-teal-500 to-teal-600 h-32"></div>
                    <div class="p-8 -mt-16">
                        <div class="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg mx-auto mb-6 flex items-center justify-center">
                            <i class="fas fa-user-md text-5xl text-teal-600"></i>
                        </div>
                        <div class="text-center">
                            <h3 class="text-2xl font-bold mb-2">Dr. J.K. Tiwari</h3>
                            <p class="text-teal-600 font-semibold mb-4">BPT, MTFI, MIAP, NDT</p>
                            <p class="text-gray-600">Certified physiotherapist specializing in manual therapy, spinal rehabilitation, and neurodevelopmental techniques.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center mt-12">
                <a href="/pages/about-team" class="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Learn More About Our Team
                </a>
            </div>
        </div>
    </section>

    <!-- Conditions We Treat -->
    <section class="py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">Conditions We Treat</h2>
                <p class="text-xl text-gray-600">Comprehensive care for a wide range of pain and mobility conditions</p>
            </div>

            <div class="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
                    <i class="fas fa-chevron-right text-blue-600 mb-3"></i>
                    <h4 class="font-semibold">Back Pain</h4>
                </div>
                <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
                    <i class="fas fa-chevron-right text-blue-600 mb-3"></i>
                    <h4 class="font-semibold">Sciatica</h4>
                </div>
                <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
                    <i class="fas fa-chevron-right text-blue-600 mb-3"></i>
                    <h4 class="font-semibold">Neck Pain</h4>
                </div>
                <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
                    <i class="fas fa-chevron-right text-blue-600 mb-3"></i>
                    <h4 class="font-semibold">Frozen Shoulder</h4>
                </div>
                <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
                    <i class="fas fa-chevron-right text-teal-600 mb-3"></i>
                    <h4 class="font-semibold">Knee Pain</h4>
                </div>
                <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
                    <i class="fas fa-chevron-right text-teal-600 mb-3"></i>
                    <h4 class="font-semibold">Hip Pain</h4>
                </div>
                <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
                    <i class="fas fa-chevron-right text-teal-600 mb-3"></i>
                    <h4 class="font-semibold">Paralysis</h4>
                </div>
                <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
                    <i class="fas fa-chevron-right text-teal-600 mb-3"></i>
                    <h4 class="font-semibold">Numbness</h4>
                </div>
            </div>

            <div class="text-center mt-12">
                <a href="/pages/conditions-we-treat" class="text-blue-600 font-semibold text-lg hover:text-blue-700">
                    View All Conditions <i class="fas fa-arrow-right ml-2"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-gray-100 py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">What Our Patients Say</h2>
                <p class="text-xl text-gray-600">Real experiences from real people</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="text-yellow-400 text-xl">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-6">"Excellent treatment for my chronic back pain. Dr. Subodh's approach is holistic and effective. Highly recommended!"</p>
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

                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="text-yellow-400 text-xl">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-6">"Dr. Tiwari's physiotherapy helped me recover completely after my knee surgery. Professional and caring staff."</p>
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

                <div class="bg-white p-8 rounded-xl shadow-lg">
                    <div class="flex items-center mb-4">
                        <div class="text-yellow-400 text-xl">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </div>
                    </div>
                    <p class="text-gray-600 mb-6">"Great experience with cupping therapy. My shoulder pain reduced significantly. The team is very knowledgeable."</p>
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
            </div>

            <div class="text-center mt-12">
                <a href="/pages/testimonials" class="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Read More Reviews
                </a>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-r from-blue-600 to-teal-500 py-20">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold text-white mb-6">Ready to Start Your Recovery Journey?</h2>
            <p class="text-xl text-blue-50 mb-10 max-w-2xl mx-auto">Book your consultation today and take the first step towards a pain-free life.</p>
            <div class="flex flex-wrap justify-center gap-6">
                <a href="/pages/contact" class="bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition">
                    <i class="fas fa-calendar-check mr-2"></i>Book Appointment
                </a>
                <a href="tel:8160754633" class="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition">
                    <i class="fas fa-phone mr-2"></i>Call: 8160754633
                </a>
                <a href="https://wa.me/918160754633" class="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition">
                    <i class="fab fa-whatsapp mr-2"></i>WhatsApp
                </a>
            </div>
        </div>
    </section>
</body>
</html>`,
  },

  // ========================================
  // 2. ABOUT US / TEAM PAGE
  // ========================================
  {
    title: "About Us - Our Team & Philosophy",
    slug: "about-team",
    template: "custom_html",
    status: "published",
    show_in_menu: true,
    menu_order: 2,
    meta_title:
      "About Pain Therapy & Rehab Centre - Our Expert Team & Approach",
    meta_description:
      "Meet Dr. Subodh Kumar (MD ACU) and Dr. J.K. Tiwari (BPT) - expert therapists with 7+ years experience in pain management and rehabilitation in Vadodara.",
    meta_keywords:
      "dr subodh kumar vadodara, dr jk tiwari physiotherapist, pain therapy team, rehab center ajwa road",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Our Team</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl font-bold mb-4">About Our Team</h1>
            <p class="text-xl text-blue-50 max-w-3xl mx-auto">Dedicated healthcare professionals committed to your wellness and recovery</p>
        </div>
    </section>

    <!-- Our Story -->
    <section class="py-20">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
                <div class="prose prose-lg">
                    <p class="text-gray-600 mb-6">Pain Therapy & Rehab Centre was established with a vision to provide comprehensive, holistic pain management and rehabilitation services to the community of Vadodara. With over <strong>7 years of excellence in healthcare</strong>, we have helped countless patients overcome chronic pain, recover from injuries, and regain their quality of life.</p>
                    
                    <p class="text-gray-600 mb-6">Located in the heart of Ajwa Road at <strong>Amardeep Township Complex</strong>, our center combines traditional physiotherapy techniques with modern neurotherapy and alternative healing approaches to deliver personalized treatment plans for each patient.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Our Philosophy -->
    <section class="bg-blue-50 py-20">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl font-bold text-gray-800 mb-6">Our Philosophy & Approach</h2>
                <p class="text-xl text-gray-600 mb-12">We believe in treating the whole person, not just the symptoms</p>

                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white p-8 rounded-xl shadow-lg">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-heart text-blue-600 text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-4">Patient-Centered Care</h3>
                        <p class="text-gray-600">Every treatment plan is customized to your unique condition, lifestyle, and recovery goals.</p>
                    </div>

                    <div class="bg-white p-8 rounded-xl shadow-lg">
                        <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-brain text-teal-600 text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-4">Holistic Approach</h3>
                        <p class="text-gray-600">We combine manual therapy, neurotherapy, and alternative treatments for comprehensive healing.</p>
                    </div>

                    <div class="bg-white p-8 rounded-xl shadow-lg">
                        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-award text-purple-600 text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-4">Evidence-Based Practice</h3>
                        <p class="text-gray-600">All our treatments are backed by clinical research and proven therapeutic techniques.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Meet Our Doctors -->
    <section class="py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">Meet Our Expert Doctors</h2>
                <p class="text-xl text-gray-600">Highly qualified and experienced healthcare professionals</p>
            </div>

            <!-- Dr. Subodh Kumar -->
            <div class="max-w-5xl mx-auto mb-16">
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div class="md:flex">
                        <div class="md:w-1/3 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-12">
                            <div class="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                <i class="fas fa-user-md text-7xl text-blue-600"></i>
                            </div>
                        </div>
                        <div class="md:w-2/3 p-10">
                            <h3 class="text-3xl font-bold mb-2">Dr. Subodh Kumar</h3>
                            <p class="text-blue-600 font-semibold text-lg mb-6">MD (ACU), Sujok Therapist, Neurotherapist</p>
                            
                            <div class="space-y-4 text-gray-700">
                                <p>Dr. Subodh Kumar is a highly experienced practitioner specializing in acupuncture, Sujok therapy, and neurotherapy. With his MD in Acupuncture, he brings a unique blend of traditional Eastern healing practices and modern therapeutic approaches.</p>
                                
                                <h4 class="font-bold text-gray-800 mt-6 mb-3">Specializations:</h4>
                                <ul class="space-y-2 ml-6">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dr. J.K. Tiwari -->
            <div class="max-w-5xl mx-auto">
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div class="md:flex">
                        <div class="md:w-1/3 bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center p-12">
                            <div class="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                <i class="fas fa-user-md text-7xl text-teal-600"></i>
                            </div>
                        </div>
                        <div class="md:w-2/3 p-10">
                            <h3 class="text-3xl font-bold mb-2">Dr. J.K. Tiwari</h3>
                            <p class="text-teal-600 font-semibold text-lg mb-6">BPT, MTFI, MIAP, NDT Certified</p>
                            
                            <div class="space-y-4 text-gray-700">
                                <p>Dr. J.K. Tiwari is a certified physiotherapist with extensive qualifications including Bachelor of Physiotherapy (BPT), Manual Therapy for Functional Integration (MTFI), and Neurodevelopmental Technique (NDT) certification. He is a member of the Indian Association of Physiotherapists (MIAP).</p>
                                
                                <h4 class="font-bold text-gray-800 mt-6 mb-3">Specializations:</h4>
                                <ul class="space-y-2 ml-6">
                                    <li class="flex items-start gap-2">
                                        <i class="fas fa-check text-teal-600 mt-1"></i>
                                        <span>Manual therapy & spinal manipulation</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <i class="fas fa-check text-teal-600 mt-1"></i>
                                        <span>Joint mobilization techniques</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <i class="fas fa-check text-teal-600 mt-1"></i>
                                        <span>Post-operative rehabilitation</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <i class="fas fa-check text-teal-600 mt-1"></i>
                                        <span>Sports injury rehabilitation</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <i class="fas fa-check text-teal-600 mt-1"></i>
                                        <span>Neurodevelopmental therapy (NDT)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Us -->
    <section class="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-800 mb-4">Why Choose Pain Therapy & Rehab Centre?</h2>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                <div class="bg-white p-8 rounded-xl shadow-lg text-center">
                    <div class="text-5xl font-bold text-blue-600 mb-4">7+</div>
                    <h4 class="font-bold text-lg mb-2">Years Experience</h4>
                    <p class="text-gray-600">Serving the Vadodara community</p>
                </div>

                <div class="bg-white p-8 rounded-xl shadow-lg text-center">
                    <div class="text-5xl font-bold text-teal-600 mb-4">4.8</div>
                    <h4 class="font-bold text-lg mb-2">Rating</h4>
                    <p class="text-gray-600">Based on 30+ patient reviews</p>
                </div>

                <div class="bg-white p-8 rounded-xl shadow-lg text-center">
                    <div class="text-5xl font-bold text-purple-600 mb-4">2</div>
                    <h4 class="font-bold text-lg mb-2">Expert Doctors</h4>
                    <p class="text-gray-600">Highly qualified specialists</p>
                </div>

                <div class="bg-white p-8 rounded-xl shadow-lg text-center">
                    <div class="text-5xl font-bold text-orange-600 mb-4">10+</div>
                    <h4 class="font-bold text-lg mb-2">Treatment Options</h4>
                    <p class="text-gray-600">Comprehensive care approach</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="py-20">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold text-gray-800 mb-6">Ready to Experience Expert Care?</h2>
            <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Schedule your consultation with our experienced team today.</p>
            <a href="/pages/contact" class="inline-block bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition">
                <i class="fas fa-calendar-check mr-2"></i>Book Appointment
            </a>
        </div>
    </section>
</body>
</html>`,
  },
];

async function createPages() {
  let connection;
  try {
    console.log("🔌 Connecting to database...");
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database connected successfully!");

    for (const page of pages) {
      const query = `
        INSERT INTO pages (
          title, slug, content, template, meta_title, meta_description, meta_keywords, 
          status, show_in_menu, menu_order, is_homepage, hide_title, author_id, 
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
        is_homepage = VALUES(is_homepage),
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
        page.show_in_menu || true,
        page.menu_order || 0,
        page.is_homepage || false,
      ]);

      console.log(
        `✅ Created/Updated page: ${page.title} (slug: ${page.slug})`
      );
    }

    console.log(
      "\n🎉 All Pain Therapy & Rehab Centre pages created successfully!"
    );
    console.log("\n📄 Pages created:");
    console.log("1. Home (homepage) - /pages/home");
    console.log("2. About Us & Team - /pages/about-team");
    console.log(
      "\n⏭️  Next: Run the service pages script to add all individual service pages."
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Full error:", error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("🔌 Database connection closed");
    }
    process.exit(0);
  }
}

createPages();
