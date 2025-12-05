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
  // FAQ, Contact, and Gallery pages
  {
    title: "Frequently Asked Questions (FAQ)",
    slug: "faq",
    template: "custom_html",
    status: "published",
    show_in_menu: true,
    menu_order: 5,
    meta_title:
      "FAQ - Common Questions About Pain Therapy & Rehab Centre Vadodara",
    meta_description:
      "Frequently asked questions about our services, treatments, appointments, insurance, and more at Pain Therapy & Rehab Centre Vadodara.",
    meta_keywords:
      "physiotherapy faq, pain therapy questions, treatment information, appointment booking",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FAQ</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <section class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p class="text-xl text-indigo-100">Everything you need to know about our services</p>
        </div>
    </section>

    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <!-- General Questions -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6">General Questions</h2>
                    
                    <div class="space-y-4">
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <details class="group">
                                <summary class="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50">
                                    <h3 class="text-lg font-semibold">What are your operating hours?</h3>
                                    <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                </summary>
                                <div class="p-6 pt-0 text-gray-600">
                                    <p>We are open Tuesday through Sunday, 10:00 AM to 1:00 PM. We are closed on Mondays. Please call ahead to confirm availability or book an appointment.</p>
                                </div>
                            </details>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <details class="group">
                                <summary class="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50">
                                    <h3 class="text-lg font-semibold">Do I need an appointment or can I walk in?</h3>
                                    <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                </summary>
                                <div class="p-6 pt-0 text-gray-600">
                                    <p>We recommend booking an appointment to avoid waiting times. However, walk-ins are welcome if time permits. You can call us at 8160754633 or 9601704565 to book your appointment.</p>
                                </div>
                            </details>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <details class="group">
                                <summary class="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50">
                                    <h3 class="text-lg font-semibold">Where is your center located?</h3>
                                    <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                </summary>
                                <div class="p-6 pt-0 text-gray-600">
                                    <p>We are located at:<br>
                                    <strong>Pain Therapy & Rehab Centre</strong><br>
                                    33, Amardeep Township Complex<br>
                                    Near Ajwa Chowkdi, Opposite Yogeshwar Township-1<br>
                                    Ajwa Road, Vadodara 390019, Gujarat</p>
                                </div>
                            </details>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <details class="group">
                                <summary class="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50">
                                    <h3 class="text-lg font-semibold">Do you accept insurance?</h3>
                                    <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                </summary>
                                <div class="p-6 pt-0 text-gray-600">
                                    <p>Please contact us directly to discuss insurance coverage and payment options. We can provide detailed invoices for insurance reimbursement claims.</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                <!-- Treatment Questions -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6">Treatment Questions</h2>
                    
                    <div class="space-y-4">
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <details class="group">
                                <summary class="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50">
                                    <h3 class="text-lg font-semibold">What should I bring to my first appointment?</h3>
                                    <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                </summary>
                                <div class="p-6 pt-0 text-gray-600">
                                    <p>Please bring:</p>
                                    <ul class="list-disc ml-6 mt-2 space-y-1">
                                        <li>Any recent medical reports, X-rays, or MRI scans</li>
                                        <li>List of current medications</li>
                                        <li>Referral letter from your doctor (if applicable)</li>
                                        <li>Comfortable clothing for physical examination</li>
                                    </ul>
                                </div>
                            </details>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <details class="group">
                                <summary class="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50">
                                    <h3 class="text-lg font-semibold">How long does a treatment session last?</h3>
                                    <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                </summary>
                                <div class="p-6 pt-0 text-gray-600">
                                    <p>The first consultation typically lasts 45-60 minutes, including assessment and initial treatment. Follow-up sessions are usually 30-45 minutes. Duration may vary based on your specific condition and treatment plan.</p>
                                </div>
                            </details>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <details class="group">
                                <summary class="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50">
                                    <h3 class="text-lg font-semibold">How many sessions will I need?</h3>
                                    <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                </summary>
                                <div class="p-6 pt-0 text-gray-600">
                                    <p>The number of sessions varies based on your condition, severity, and response to treatment. Most patients see significant improvement within 6-12 sessions. Your therapist will create a personalized treatment plan and adjust it based on your progress.</p>
                                </div>
                            </details>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <details class="group">
                                <summary class="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50">
                                    <h3 class="text-lg font-semibold">Will treatment be painful?</h3>
                                    <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                </summary>
                                <div class="p-6 pt-0 text-gray-600">
                                    <p>Most treatments are not painful. You may feel some discomfort during manual therapy or stretching, but this should be mild. Some muscle soreness after treatment is normal and usually resolves within 24-48 hours. We always work within your comfort level.</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                <!-- Cupping Therapy Specific -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6">Cupping Therapy Questions</h2>
                    
                    <div class="space-y-4">
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <details class="group">
                                <summary class="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50">
                                    <h3 class="text-lg font-semibold">What should I do after cupping therapy?</h3>
                                    <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                </summary>
                                <div class="p-6 pt-0 text-gray-600">
                                    <p><strong>Important aftercare instructions:</strong></p>
                                    <ul class="list-disc ml-6 mt-2 space-y-2">
                                        <li>Drink plenty of water (8-10 glasses) within 24 hours</li>
                                        <li>Avoid caffeine and alcohol for 24 hours</li>
                                        <li>Rest and avoid strenuous activity for 24 hours</li>
                                        <li>Keep the treated area clean and dry</li>
                                        <li>Avoid cold showers immediately after treatment</li>
                                        <li>Circular marks (bruises) are normal and will fade in 3-7 days</li>
                                    </ul>
                                </div>
                            </details>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <details class="group">
                                <summary class="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50">
                                    <h3 class="text-lg font-semibold">Are the cupping marks permanent?</h3>
                                    <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                </summary>
                                <div class="p-6 pt-0 text-gray-600">
                                    <p>No, the circular marks left by cupping are temporary and completely normal. They are not bruises but a result of increased blood flow. They typically fade within 3-7 days, though this varies by individual.</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                <!-- Payment & Fees -->
                <div class="mb-12">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6">Payment & Fees</h2>
                    
                    <div class="space-y-4">
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <details class="group">
                                <summary class="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50">
                                    <h3 class="text-lg font-semibold">What payment methods do you accept?</h3>
                                    <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                </summary>
                                <div class="p-6 pt-0 text-gray-600">
                                    <p>We accept cash, UPI, and bank transfers. Please ask at reception for specific payment details.</p>
                                </div>
                            </details>
                        </div>

                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <details class="group">
                                <summary class="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50">
                                    <h3 class="text-lg font-semibold">Do you offer treatment packages?</h3>
                                    <i class="fas fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                </summary>
                                <div class="p-6 pt-0 text-gray-600">
                                    <p>Yes, we offer multi-session packages that provide better value. Contact us to discuss package options suitable for your treatment plan.</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-indigo-600 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p class="text-xl text-indigo-100 mb-8">Feel free to contact us anytime. We're here to help!</p>
            <a href="/pages/contact" class="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition inline-block">
                <i class="fas fa-phone mr-2"></i>Contact Us
            </a>
        </div>
    </section>
</body>
</html>`,
  },

  {
    title: "Contact Us & Book Appointment",
    slug: "contact",
    template: "custom_html",
    status: "published",
    show_in_menu: true,
    menu_order: 6,
    meta_title:
      "Contact Us - Pain Therapy & Rehab Centre Vadodara | Book Appointment",
    meta_description:
      "Contact Pain Therapy & Rehab Centre Vadodara. Call 8160754633 / 9601704565. Visit us at Ajwa Road. Book your appointment today!",
    meta_keywords:
      "contact pain therapy vadodara, book appointment physiotherapy, ajwa road rehab center contact",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <section class="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl font-bold mb-4">Contact Us</h1>
            <p class="text-xl text-teal-100">Get in touch to start your recovery journey</p>
        </div>
    </section>

    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
                <!-- Contact Info -->
                <div>
                    <h2 class="text-3xl font-bold text-gray-800 mb-8">Get In Touch</h2>
                    
                    <div class="space-y-6">
                        <div class="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg">
                            <div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-phone-alt text-teal-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-lg mb-1">Phone Numbers</h3>
                                <p class="text-gray-600">Primary: <a href="tel:8160754633" class="text-teal-600 hover:underline">8160754633</a></p>
                                <p class="text-gray-600">Secondary: <a href="tel:9601704565" class="text-teal-600 hover:underline">9601704565</a></p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg">
                            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fab fa-whatsapp text-green-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-lg mb-1">WhatsApp</h3>
                                <p class="text-gray-600">
                                    <a href="https://wa.me/918160754633" class="text-green-600 hover:underline">+91 8160754633</a>
                                </p>
                                <p class="text-sm text-gray-500">Quick response for appointments</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg">
                            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-envelope text-blue-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-lg mb-1">Email</h3>
                                <p class="text-gray-600">
                                    <a href="mailto:info@paintherapyvadodara.com" class="text-blue-600 hover:underline">info@paintherapyvadodara.com</a>
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg">
                            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-map-marker-alt text-purple-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-lg mb-1">Address</h3>
                                <p class="text-gray-600">
                                    33, Amardeep Township Complex<br>
                                    Near Ajwa Chowkdi<br>
                                    Opposite Yogeshwar Township-1<br>
                                    Ajwa Road, Vadodara 390019<br>
                                    Gujarat, India
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg">
                            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i class="fas fa-clock text-orange-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-lg mb-1">Operating Hours</h3>
                                <p class="text-gray-600">
                                    <strong>Tuesday - Sunday:</strong> 10:00 AM - 1:00 PM<br>
                                    <strong>Monday:</strong> Closed
                                </p>
                                <p class="text-sm text-gray-500 mt-2">*Please call ahead to confirm availability</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Form -->
                <div>
                    <div class="bg-white p-8 rounded-xl shadow-lg">
                        <h2 class="text-3xl font-bold text-gray-800 mb-6">Book an Appointment</h2>
                        
                        <form action="/api/contact" method="POST" class="space-y-4">
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Full Name *</label>
                                <input type="text" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                            </div>

                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                                <input type="tel" name="phone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                            </div>

                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Email</label>
                                <input type="email" name="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                            </div>

                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Condition/Issue *</label>
                                <select name="condition" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                                    <option value="">Select a condition</option>
                                    <option>Back Pain / Sciatica</option>
                                    <option>Neck Pain / Cervical Spondylosis</option>
                                    <option>Knee Pain / Arthritis</option>
                                    <option>Shoulder Pain / Frozen Shoulder</option>
                                    <option>Hip Pain</option>
                                    <option>Paralysis / Stroke Recovery</option>
                                    <option>Post-Operative Rehabilitation</option>
                                    <option>Neuropathy / Numbness</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Preferred Date</label>
                                <input type="date" name="preferred_date" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                            </div>

                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Additional Message</label>
                                <textarea name="message" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"></textarea>
                            </div>

                            <button type="submit" class="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-teal-700 hover:to-blue-700 transition">
                                <i class="fas fa-paper-plane mr-2"></i>Submit Appointment Request
                            </button>

                            <p class="text-sm text-gray-500 text-center mt-4">
                                We'll confirm your appointment within 24 hours. For immediate assistance, please call us directly.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Map Section -->
    <section class="py-16 bg-gray-100">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Find Us on Map</h2>
            <div class="max-w-5xl mx-auto">
                <div class="bg-white p-4 rounded-xl shadow-lg">
                    <!-- Google Maps Embed - Replace with actual coordinates -->
                    <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <div class="text-center">
                            <i class="fas fa-map-marked-alt text-6xl text-gray-400 mb-4"></i>
                            <p class="text-gray-600">Google Maps embed will be placed here</p>
                            <p class="text-sm text-gray-500 mt-2">33, Amardeep Township Complex, Ajwa Road, Vadodara</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Action Buttons -->
    <section class="py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl font-bold text-gray-800 mb-8">Quick Actions</h2>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="tel:8160754633" class="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2">
                    <i class="fas fa-phone"></i>
                    Call Now
                </a>
                <a href="https://wa.me/918160754633" class="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition inline-flex items-center gap-2">
                    <i class="fab fa-whatsapp"></i>
                    WhatsApp
                </a>
                <a href="mailto:info@paintherapyvadodara.com" class="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition inline-flex items-center gap-2">
                    <i class="fas fa-envelope"></i>
                    Email Us
                </a>
            </div>
        </div>
    </section>
</body>
</html>`,
  },

  {
    title: "Clinic Gallery - Photos & Facilities",
    slug: "gallery",
    template: "custom_html",
    status: "published",
    show_in_menu: true,
    menu_order: 7,
    meta_title:
      "Clinic Gallery - Pain Therapy & Rehab Centre Vadodara Facilities & Photos",
    meta_description:
      "View photos of our modern physiotherapy clinic, treatment rooms, equipment and facilities at Pain Therapy & Rehab Centre, Ajwa Road Vadodara.",
    meta_keywords:
      "physiotherapy clinic vadodara photos, rehab center gallery, clinic facilities vadodara",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gallery</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-50">
    <section class="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl font-bold mb-4">Clinic Gallery</h1>
            <p class="text-xl text-pink-100">Take a virtual tour of our modern facility</p>
        </div>
    </section>

    <section class="py-16">
        <div class="container mx-auto px-6">
            <div class="max-w-6xl mx-auto">
                <p class="text-center text-lg text-gray-600 mb-12">
                    Our state-of-the-art facility is designed to provide you with the most comfortable and effective treatment experience.
                </p>

                <!-- Reception & Waiting Area -->
                <div class="mb-16">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <i class="fas fa-door-open text-pink-600"></i>
                        Reception & Waiting Area
                    </h2>
                    <div class="grid md:grid-cols-3 gap-6">
                        <div class="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-8 aspect-square flex items-center justify-center shadow-lg">
                            <div class="text-center">
                                <i class="fas fa-image text-6xl text-blue-600 mb-4"></i>
                                <p class="text-gray-700">Reception Area Photo</p>
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl p-8 aspect-square flex items-center justify-center shadow-lg">
                            <div class="text-center">
                                <i class="fas fa-image text-6xl text-teal-600 mb-4"></i>
                                <p class="text-gray-700">Waiting Room Photo</p>
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-8 aspect-square flex items-center justify-center shadow-lg">
                            <div class="text-center">
                                <i class="fas fa-image text-6xl text-purple-600 mb-4"></i>
                                <p class="text-gray-700">Building Exterior Photo</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Treatment Rooms -->
                <div class="mb-16">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <i class="fas fa-clinic-medical text-teal-600"></i>
                        Treatment Rooms & Equipment
                    </h2>
                    <div class="grid md:grid-cols-3 gap-6">
                        <div class="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-8 aspect-square flex items-center justify-center shadow-lg">
                            <div class="text-center">
                                <i class="fas fa-image text-6xl text-orange-600 mb-4"></i>
                                <p class="text-gray-700">Manual Therapy Room</p>
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-8 aspect-square flex items-center justify-center shadow-lg">
                            <div class="text-center">
                                <i class="fas fa-image text-6xl text-green-600 mb-4"></i>
                                <p class="text-gray-700">Exercise Area</p>
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-8 aspect-square flex items-center justify-center shadow-lg">
                            <div class="text-center">
                                <i class="fas fa-image text-6xl text-red-600 mb-4"></i>
                                <p class="text-gray-700">Therapy Equipment</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Our Team in Action -->
                <div class="mb-16">
                    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <i class="fas fa-user-md text-blue-600"></i>
                        Our Team in Action
                    </h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl p-8 aspect-video flex items-center justify-center shadow-lg">
                            <div class="text-center">
                                <i class="fas fa-image text-6xl text-indigo-600 mb-4"></i>
                                <p class="text-gray-700">Dr. Subodh Kumar treating patient</p>
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl p-8 aspect-video flex items-center justify-center shadow-lg">
                            <div class="text-center">
                                <i class="fas fa-image text-6xl text-cyan-600 mb-4"></i>
                                <p class="text-gray-700">Dr. J.K. Tiwari with patient</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Note about photos -->
                <div class="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                    <p class="text-gray-700">
                        <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                        <strong>Note:</strong> Professional photos of our clinic, treatment rooms, equipment, and team will be added soon. 
                        For a preview of our facility, please visit us at our Ajwa Road location or contact us for more information.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold mb-4">Visit Our Modern Facility</h2>
            <p class="text-xl text-pink-100 mb-8">Experience world-class treatment in a comfortable, welcoming environment.</p>
            <a href="/pages/contact" class="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-pink-50 transition inline-block">
                <i class="fas fa-map-marker-alt mr-2"></i>Get Directions
            </a>
        </div>
    </section>
</body>
</html>`,
  },
];

async function createSupportPages() {
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

    console.log(
      "\n🎉 Support pages (FAQ, Contact, Gallery) created successfully!"
    );
    console.log("\n📄 Pages created:");
    console.log("1. FAQ (Frequently Asked Questions)");
    console.log("2. Contact Us & Book Appointment");
    console.log("3. Clinic Gallery");
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

createSupportPages();
