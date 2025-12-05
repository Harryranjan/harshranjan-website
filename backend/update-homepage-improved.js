const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const improvedHomepage = `<!-- Hero Section - Improved with animations and better hierarchy -->
<section class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden">
    <!-- Animated Background Pattern -->
    <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-0 left-1/2 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Left Column - Main Content -->
            <div class="text-center lg:text-left space-y-8 animate-fade-in-up">
                <!-- Badge -->
                <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                    <i class="fas fa-certificate text-yellow-300"></i>
                    <span>7+ Years of Excellence | 500+ Happy Patients</span>
                </div>

                <!-- Main Heading -->
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Expert <span class="text-yellow-300">Pain Management</span> & Rehabilitation
                </h1>

                <!-- Subheading -->
                <p class="text-lg md:text-xl text-blue-50 leading-relaxed">
                    Compassionate, evidence-based care for chronic pain, neurological conditions, and post-operative recovery in Vadodara.
                </p>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a href="/pages/contact" class="group inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-300 hover:text-blue-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                        <i class="fas fa-calendar-check"></i>
                        <span>Book Appointment</span>
                        <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </a>
                    <a href="tel:8160754633" class="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                        <i class="fas fa-phone"></i>
                        <span>Call Now</span>
                    </a>
                </div>

                <!-- Trust Indicators -->
                <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
                    <div class="flex -space-x-3">
                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-blue-400 border-3 border-white shadow-lg flex items-center justify-center">
                            <i class="fas fa-user text-white text-sm"></i>
                        </div>
                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-teal-300 to-teal-400 border-3 border-white shadow-lg flex items-center justify-center">
                            <i class="fas fa-user text-white text-sm"></i>
                        </div>
                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 border-3 border-white shadow-lg flex items-center justify-center">
                            <i class="fas fa-user text-white text-sm"></i>
                        </div>
                        <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-3 border-white shadow-lg flex items-center justify-center">
                            <span class="text-white text-xs font-bold">+500</span>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center gap-1 text-yellow-300 text-lg">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span class="text-white font-semibold ml-2">4.8/5</span>
                        </div>
                        <div class="text-sm text-blue-100">Based on 100+ reviews</div>
                    </div>
                </div>
            </div>

            <!-- Right Column - Features Card -->
            <div class="hidden lg:block animate-fade-in-right">
                <div class="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
                    <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
                        <i class="fas fa-sparkles text-yellow-300"></i>
                        <span>Why Choose Us?</span>
                    </h3>
                    <ul class="space-y-5">
                        <li class="flex items-start gap-4 group">
                            <div class="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-yellow-300 group-hover:text-blue-900 transition-all">
                                <i class="fas fa-award"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-lg">7+ Years of Excellence</h4>
                                <p class="text-blue-100 text-sm">Trusted healthcare provider in Vadodara</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4 group">
                            <div class="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-yellow-300 group-hover:text-blue-900 transition-all">
                                <i class="fas fa-user-md"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-lg">Expert Team</h4>
                                <p class="text-blue-100 text-sm">MD, BPT certified doctors with advanced training</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4 group">
                            <div class="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-yellow-300 group-hover:text-blue-900 transition-all">
                                <i class="fas fa-heartbeat"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-lg">Holistic Approach</h4>
                                <p class="text-blue-100 text-sm">Manual + Neuro + Alternative therapies</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4 group">
                            <div class="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-yellow-300 group-hover:text-blue-900 transition-all">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                                <h4 class="font-semibold text-lg">Convenient Location</h4>
                                <p class="text-blue-100 text-sm">Easy access on Ajwa Road, Vadodara</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <i class="fas fa-chevron-down text-white/60 text-2xl"></i>
    </div>
</section>

<!-- Quick Contact Bar - Sticky and Improved -->
<section class="bg-white shadow-xl sticky top-0 z-40 border-b-2 border-blue-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <a href="tel:8160754633" class="flex items-center justify-center md:justify-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <i class="fas fa-phone-alt text-blue-600 group-hover:text-white transition-colors"></i>
                </div>
                <div class="text-left">
                    <div class="text-xs text-gray-500 font-medium">Call Us Now</div>
                    <div class="font-bold text-gray-900">8160754633</div>
                </div>
            </a>
            <div class="flex items-center justify-center gap-3 p-3">
                <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-map-marker-alt text-teal-600"></i>
                </div>
                <div class="text-left">
                    <div class="text-xs text-gray-500 font-medium">Visit Us</div>
                    <div class="font-bold text-gray-900">Ajwa Road, Vadodara</div>
                </div>
            </div>
            <div class="flex items-center justify-center md:justify-end gap-3 p-3">
                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-clock text-orange-600"></i>
                </div>
                <div class="text-left">
                    <div class="text-xs text-gray-500 font-medium">Working Hours</div>
                    <div class="font-bold text-gray-900">Tue-Sun: 10AM-1PM</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Core Services - Enhanced Cards with Better Visual Hierarchy -->
<section class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16 space-y-4">
            <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <i class="fas fa-stethoscope"></i>
                <span>Our Services</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900">
                Comprehensive Pain Management Solutions
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                Evidence-based treatments tailored to your specific condition and recovery goals
            </p>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Service 1 - Spine & Back Pain -->
            <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
                <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-6 relative">
                    <div class="absolute top-4 right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full"></div>
                    <div class="relative w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                        <i class="fas fa-spine text-blue-600 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-white">Spine & Back Pain</h3>
                </div>
                <div class="p-6 space-y-4">
                    <p class="text-gray-600">Expert treatment for back pain, sciatica, cervical spondylosis, and spinal issues using manual therapy and advanced techniques.</p>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-blue-600 text-sm"></i>
                            <span>Lower back pain relief</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-blue-600 text-sm"></i>
                            <span>Sciatica treatment</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-blue-600 text-sm"></i>
                            <span>Posture correction</span>
                        </li>
                    </ul>
                    <a href="/pages/spine-back-pain-therapy" class="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group">
                        <span>Learn More</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>

            <!-- Service 2 - Neuro Rehabilitation -->
            <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-teal-200 transform hover:-translate-y-2">
                <div class="bg-gradient-to-br from-teal-500 to-cyan-600 p-6 relative">
                    <div class="absolute top-4 right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full"></div>
                    <div class="relative w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                        <i class="fas fa-brain text-teal-600 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-white">Neuro Rehabilitation</h3>
                </div>
                <div class="p-6 space-y-4">
                    <p class="text-gray-600">Specialized care for paralysis, stroke recovery, numbness, nerve-related conditions, and neurological disorders.</p>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-teal-600 text-sm"></i>
                            <span>Stroke recovery programs</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-teal-600 text-sm"></i>
                            <span>Paralysis treatment</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-teal-600 text-sm"></i>
                            <span>Nerve rehabilitation</span>
                        </li>
                    </ul>
                    <a href="/pages/neuro-paralysis-rehab" class="inline-flex items-center gap-2 text-teal-600 font-semibold hover:gap-3 transition-all">
                        <span>Learn More</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>

            <!-- Service 3 - Post-Operative Rehab -->
            <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2">
                <div class="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 relative">
                    <div class="absolute top-4 right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full"></div>
                    <div class="relative w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                        <i class="fas fa-procedures text-purple-600 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-white">Post-Operative Rehab</h3>
                </div>
                <div class="p-6 space-y-4">
                    <p class="text-gray-600">Comprehensive rehabilitation programs to help you recover faster and regain mobility after surgery.</p>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-purple-600 text-sm"></i>
                            <span>Joint replacement recovery</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-purple-600 text-sm"></i>
                            <span>Fracture rehabilitation</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-purple-600 text-sm"></i>
                            <span>Mobility restoration</span>
                        </li>
                    </ul>
                    <a href="/pages/post-operative-rehabilitation" class="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all">
                        <span>Learn More</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>

            <!-- Service 4 - Manual Therapy -->
            <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200 transform hover:-translate-y-2">
                <div class="bg-gradient-to-br from-orange-500 to-amber-600 p-6 relative">
                    <div class="absolute top-4 right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full"></div>
                    <div class="relative w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                        <i class="fas fa-hands text-orange-600 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-white">Manual Therapy</h3>
                </div>
                <div class="p-6 space-y-4">
                    <p class="text-gray-600">Hands-on techniques including spinal manipulation, joint mobilization, and therapeutic exercises.</p>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-orange-600 text-sm"></i>
                            <span>Spinal manipulation</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-orange-600 text-sm"></i>
                            <span>Joint mobilization</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-orange-600 text-sm"></i>
                            <span>Soft tissue therapy</span>
                        </li>
                    </ul>
                    <a href="/pages/manual-therapy-spinal-manipulation" class="inline-flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all">
                        <span>Learn More</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>

            <!-- Service 5 - Cupping & Acupressure -->
            <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 transform hover:-translate-y-2">
                <div class="bg-gradient-to-br from-red-500 to-rose-600 p-6 relative">
                    <div class="absolute top-4 right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full"></div>
                    <div class="relative w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                        <i class="fas fa-fire-alt text-red-600 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-white">Cupping & Acupressure</h3>
                </div>
                <div class="p-6 space-y-4">
                    <p class="text-gray-600">Alternative healing therapies for pain relief, muscle tension, and overall wellness improvement.</p>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-red-600 text-sm"></i>
                            <span>Traditional cupping therapy</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-red-600 text-sm"></i>
                            <span>Acupressure treatment</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-red-600 text-sm"></i>
                            <span>Detoxification therapy</span>
                        </li>
                    </ul>
                    <a href="/pages/cupping-acupressure-therapy" class="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all">
                        <span>Learn More</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>

            <!-- Service 6 - Joint Pain Treatment -->
            <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
                <div class="bg-gradient-to-br from-green-500 to-emerald-600 p-6 relative">
                    <div class="absolute top-4 right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full"></div>
                    <div class="relative w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                        <i class="fas fa-bone text-green-600 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-white">Joint Pain Treatment</h3>
                </div>
                <div class="p-6 space-y-4">
                    <p class="text-gray-600">Effective solutions for knee pain, frozen shoulder, hip pain, arthritis, and other joint conditions.</p>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-green-600 text-sm"></i>
                            <span>Arthritis management</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-green-600 text-sm"></i>
                            <span>Sports injury recovery</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-check-circle text-green-600 text-sm"></i>
                            <span>Frozen shoulder therapy</span>
                        </li>
                    </ul>
                    <a href="/pages/joint-pain-arthritis-treatment" class="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all">
                        <span>Learn More</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Stats Section - New Addition -->
<section class="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div class="space-y-2">
                <div class="text-4xl md:text-5xl font-bold">500+</div>
                <div class="text-blue-100">Happy Patients</div>
            </div>
            <div class="space-y-2">
                <div class="text-4xl md:text-5xl font-bold">7+</div>
                <div class="text-blue-100">Years Experience</div>
            </div>
            <div class="space-y-2">
                <div class="text-4xl md:text-5xl font-bold">6</div>
                <div class="text-blue-100">Specializations</div>
            </div>
            <div class="space-y-2">
                <div class="text-4xl md:text-5xl font-bold">4.8/5</div>
                <div class="text-blue-100">Patient Rating</div>
            </div>
        </div>
    </div>
</section>

<!-- Meet Our Doctors - Enhanced Design -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16 space-y-4">
            <div class="inline-flex items-center gap-2 bg-teal-100 text-teal-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <i class="fas fa-user-md"></i>
                <span>Our Team</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900">
                Meet Our Expert Doctors
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                Experienced healthcare professionals committed to your recovery and well-being
            </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <!-- Doctor 1 -->
            <div class="group bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-24 relative">
                    <div class="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <div class="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full border-8 border-white shadow-2xl flex items-center justify-center">
                            <i class="fas fa-user-md text-5xl text-white"></i>
                        </div>
                    </div>
                </div>
                <div class="pt-20 p-8 text-center space-y-4">
                    <h3 class="text-2xl font-bold text-gray-900">Dr. Subodh Kumar</h3>
                    <p class="text-blue-600 font-semibold">MD (ACU) | Sujok Therapist | Neurotherapist</p>
                    <p class="text-gray-600 leading-relaxed">
                        Expert in acupressure therapy, neuro therapy, and holistic pain management with 7+ years of clinical experience.
                    </p>
                    <div class="flex flex-wrap justify-center gap-2 pt-4">
                        <span class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            <i class="fas fa-certificate text-xs"></i>
                            <span>MD (ACU)</span>
                        </span>
                        <span class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            <i class="fas fa-certificate text-xs"></i>
                            <span>Sujok Therapy</span>
                        </span>
                        <span class="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            <i class="fas fa-certificate text-xs"></i>
                            <span>Neuro Therapy</span>
                        </span>
                    </div>
                </div>
            </div>

            <!-- Doctor 2 -->
            <div class="group bg-gradient-to-br from-gray-50 to-teal-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="bg-gradient-to-r from-teal-500 to-teal-600 h-24 relative">
                    <div class="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <div class="w-32 h-32 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full border-8 border-white shadow-2xl flex items-center justify-center">
                            <i class="fas fa-user-md text-5xl text-white"></i>
                        </div>
                    </div>
                </div>
                <div class="pt-20 p-8 text-center space-y-4">
                    <h3 class="text-2xl font-bold text-gray-900">Dr. J.K. Tiwari</h3>
                    <p class="text-teal-600 font-semibold">BPT | MTFI | MIAP | NDT</p>
                    <p class="text-gray-600 leading-relaxed">
                        Certified physiotherapist specializing in manual therapy, spinal rehabilitation, and neurodevelopmental techniques.
                    </p>
                    <div class="flex flex-wrap justify-center gap-2 pt-4">
                        <span class="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                            <i class="fas fa-certificate text-xs"></i>
                            <span>BPT</span>
                        </span>
                        <span class="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                            <i class="fas fa-certificate text-xs"></i>
                            <span>MTFI</span>
                        </span>
                        <span class="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                            <i class="fas fa-certificate text-xs"></i>
                            <span>NDT</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center mt-12">
            <a href="/pages/about-team" class="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span>Learn More About Our Team</span>
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>

<!-- Conditions We Treat - Improved Grid -->
<section class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16 space-y-4">
            <div class="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <i class="fas fa-heartbeat"></i>
                <span>Conditions</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900">
                What We Treat
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive care for a wide range of pain and mobility conditions
            </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="group bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all text-center hover:scale-105 border border-gray-100 hover:border-blue-200">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 transition-colors">
                    <i class="fas fa-chevron-right text-blue-600 group-hover:text-white transition-colors"></i>
                </div>
                <h4 class="font-semibold text-gray-900">Back Pain</h4>
            </div>
            <div class="group bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all text-center hover:scale-105 border border-gray-100 hover:border-blue-200">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 transition-colors">
                    <i class="fas fa-chevron-right text-blue-600 group-hover:text-white transition-colors"></i>
                </div>
                <h4 class="font-semibold text-gray-900">Sciatica</h4>
            </div>
            <div class="group bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all text-center hover:scale-105 border border-gray-100 hover:border-blue-200">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 transition-colors">
                    <i class="fas fa-chevron-right text-blue-600 group-hover:text-white transition-colors"></i>
                </div>
                <h4 class="font-semibold text-gray-900">Neck Pain</h4>
            </div>
            <div class="group bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all text-center hover:scale-105 border border-gray-100 hover:border-blue-200">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 transition-colors">
                    <i class="fas fa-chevron-right text-blue-600 group-hover:text-white transition-colors"></i>
                </div>
                <h4 class="font-semibold text-gray-900">Frozen Shoulder</h4>
            </div>
            <div class="group bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all text-center hover:scale-105 border border-gray-100 hover:border-teal-200">
                <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-600 transition-colors">
                    <i class="fas fa-chevron-right text-teal-600 group-hover:text-white transition-colors"></i>
                </div>
                <h4 class="font-semibold text-gray-900">Knee Pain</h4>
            </div>
            <div class="group bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all text-center hover:scale-105 border border-gray-100 hover:border-teal-200">
                <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-600 transition-colors">
                    <i class="fas fa-chevron-right text-teal-600 group-hover:text-white transition-colors"></i>
                </div>
                <h4 class="font-semibold text-gray-900">Hip Pain</h4>
            </div>
            <div class="group bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all text-center hover:scale-105 border border-gray-100 hover:border-teal-200">
                <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-600 transition-colors">
                    <i class="fas fa-chevron-right text-teal-600 group-hover:text-white transition-colors"></i>
                </div>
                <h4 class="font-semibold text-gray-900">Paralysis</h4>
            </div>
            <div class="group bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all text-center hover:scale-105 border border-gray-100 hover:border-teal-200">
                <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-600 transition-colors">
                    <i class="fas fa-chevron-right text-teal-600 group-hover:text-white transition-colors"></i>
                </div>
                <h4 class="font-semibold text-gray-900">Numbness</h4>
            </div>
        </div>

        <div class="text-center mt-12">
            <a href="/pages/conditions-we-treat" class="inline-flex items-center gap-2 text-blue-600 font-semibold text-lg hover:gap-3 transition-all">
                <span>View All 18+ Conditions</span>
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>

<!-- Testimonials - Enhanced with Better Design -->
<section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16 space-y-4">
            <div class="inline-flex items-center gap-2 bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <i class="fas fa-star"></i>
                <span>Testimonials</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900">
                What Our Patients Say
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                Real experiences from real people who trusted us with their recovery
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Testimonial 1 -->
            <div class="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-blue-100 hover:border-blue-200 transform hover:-translate-y-2">
                <div class="flex items-center gap-1 text-yellow-400 text-xl mb-4">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p class="text-gray-700 mb-6 italic leading-relaxed">
                    "Excellent treatment for my chronic back pain. Dr. Subodh's approach is holistic and effective. I'm now pain-free and back to my normal activities. Highly recommended!"
                </p>
                <div class="flex items-center gap-4 border-t border-gray-200 pt-6">
                    <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <span class="text-white font-bold text-lg">RP</span>
                    </div>
                    <div>
                        <div class="font-bold text-gray-900">Rajesh Patel</div>
                        <div class="text-sm text-gray-500">Back Pain Patient</div>
                    </div>
                </div>
            </div>

            <!-- Testimonial 2 -->
            <div class="bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-teal-100 hover:border-teal-200 transform hover:-translate-y-2">
                <div class="flex items-center gap-1 text-yellow-400 text-xl mb-4">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p class="text-gray-700 mb-6 italic leading-relaxed">
                    "Dr. Tiwari's physiotherapy helped me recover completely after my knee surgery. Professional, caring, and incredibly effective. I'm walking normally again!"
                </p>
                <div class="flex items-center gap-4 border-t border-gray-200 pt-6">
                    <div class="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                        <span class="text-white font-bold text-lg">PS</span>
                    </div>
                    <div>
                        <div class="font-bold text-gray-900">Priya Shah</div>
                        <div class="text-sm text-gray-500">Post-Surgery Patient</div>
                    </div>
                </div>
            </div>

            <!-- Testimonial 3 -->
            <div class="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-purple-100 hover:border-purple-200 transform hover:-translate-y-2">
                <div class="flex items-center gap-1 text-yellow-400 text-xl mb-4">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <p class="text-gray-700 mb-6 italic leading-relaxed">
                    "Great experience with cupping therapy. My shoulder pain reduced significantly within weeks. The team is very knowledgeable and supportive throughout."
                </p>
                <div class="flex items-center gap-4 border-t border-gray-200 pt-6">
                    <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <span class="text-white font-bold text-lg">AD</span>
                    </div>
                    <div>
                        <div class="font-bold text-gray-900">Amit Desai</div>
                        <div class="text-sm text-gray-500">Shoulder Pain Patient</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center mt-12">
            <a href="/pages/testimonials" class="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span>Read More Reviews</span>
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>
</section>

<!-- CTA Section - Enhanced with Better Visual Appeal -->
<section class="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center space-y-8">
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <i class="fas fa-bolt text-yellow-300"></i>
                <span>Start Your Journey Today</span>
            </div>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto">
                Ready to Start Your <span class="text-yellow-300">Recovery Journey?</span>
            </h2>

            <p class="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                Book your consultation today and take the first step towards a pain-free, active life.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row justify-center gap-6 pt-8">
                <a href="/pages/contact" class="group inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-yellow-300 hover:text-blue-900 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
                    <i class="fas fa-calendar-check text-xl"></i>
                    <span>Book Appointment</span>
                    <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </a>
                <a href="tel:8160754633" class="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-xl">
                    <i class="fas fa-phone text-xl"></i>
                    <span>Call: 8160754633</span>
                </a>
                <a href="https://wa.me/918160754633" class="inline-flex items-center justify-center gap-3 bg-green-500 border-2 border-green-400 px-10 py-5 rounded-xl font-bold text-lg hover:bg-green-600 transition-all duration-300 shadow-xl">
                    <i class="fab fa-whatsapp text-2xl"></i>
                    <span>WhatsApp</span>
                </a>
            </div>

            <!-- Trust Badges -->
            <div class="flex flex-wrap justify-center items-center gap-8 pt-12 border-t border-white/20">
                <div class="flex items-center gap-2">
                    <i class="fas fa-shield-alt text-yellow-300 text-2xl"></i>
                    <span class="text-sm">Safe & Certified</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fas fa-clock text-yellow-300 text-2xl"></i>
                    <span class="text-sm">Quick Response</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fas fa-thumbs-up text-yellow-300 text-2xl"></i>
                    <span class="text-sm">500+ Satisfied Patients</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fas fa-award text-yellow-300 text-2xl"></i>
                    <span class="text-sm">Expert Care</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Custom Animations CSS -->
<style>
@keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
}

.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out;
}

@keyframes fade-in-right {
    from {
        opacity: 0;
        transform: translateX(20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.animate-fade-in-right {
    animation: fade-in-right 0.6s ease-out 0.3s both;
}
</style>`;

async function updateHomepage() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("\n🎨 Updating Homepage with Improved UI/UX...\n");

    await connection.query("UPDATE pages SET content = ? WHERE slug = ?", [
      improvedHomepage,
      "home",
    ]);

    console.log("========================================");
    console.log("✅ Homepage Updated Successfully!");
    console.log("========================================\n");

    console.log("🎨 UI/UX IMPROVEMENTS MADE:\n");
    console.log("Hero Section:");
    console.log("  ✓ Animated gradient background with blob effects");
    console.log("  ✓ Better visual hierarchy with badges");
    console.log("  ✓ Enhanced CTA buttons with hover animations");
    console.log("  ✓ Improved trust indicators with avatars");
    console.log("  ✓ Scroll indicator for better UX\n");

    console.log("Quick Contact Bar:");
    console.log("  ✓ Made sticky for easy access");
    console.log("  ✓ Interactive hover states");
    console.log("  ✓ Better visual feedback\n");

    console.log("Services Section:");
    console.log("  ✓ Enhanced cards with gradient headers");
    console.log("  ✓ Service benefits listed with checkmarks");
    console.log("  ✓ Smooth hover animations & lift effects");
    console.log("  ✓ Better color coding per service\n");

    console.log("New Stats Section:");
    console.log("  ✓ Added statistics bar for credibility");
    console.log("  ✓ Shows key metrics (500+ patients, 7+ years, etc.)\n");

    console.log("Team Section:");
    console.log("  ✓ Redesigned doctor cards");
    console.log("  ✓ Qualification badges");
    console.log("  ✓ Better visual appeal with gradients\n");

    console.log("Conditions Grid:");
    console.log("  ✓ Interactive hover states");
    console.log("  ✓ Scale animation on hover");
    console.log("  ✓ Better visual hierarchy\n");

    console.log("Testimonials:");
    console.log("  ✓ Enhanced cards with gradient backgrounds");
    console.log("  ✓ Better readability with improved spacing");
    console.log("  ✓ Initials in styled avatars\n");

    console.log("CTA Section:");
    console.log("  ✓ Animated background patterns");
    console.log("  ✓ Multiple contact options (Call, WhatsApp)");
    console.log("  ✓ Trust badges added");
    console.log("  ✓ Better visual appeal\n");

    console.log("General Improvements:");
    console.log("  ✓ Consistent spacing and padding");
    console.log("  ✓ Section badges for better navigation");
    console.log("  ✓ Smooth transitions and animations");
    console.log("  ✓ Better mobile responsiveness");
    console.log("  ✓ Enhanced color scheme consistency");
    console.log("  ✓ Improved typography hierarchy");
    console.log("  ✓ Better accessibility with clear CTAs\n");

    console.log("========================================\n");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

updateHomepage();
