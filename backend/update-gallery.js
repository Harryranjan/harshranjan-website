const mysql = require("mysql2/promise");

async function updateGalleryPage() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  const galleryContent = `<!-- Hero Section -->
<section class="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16">
    <div class="container mx-auto px-6 text-center">
        <h1 class="text-5xl font-bold mb-4">Clinic Gallery</h1>
        <p class="text-xl text-blue-100">Explore our modern facility and professional environment</p>
    </div>
</section>

<!-- Clinic Photos Section -->
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Our Facility</h2>
            <p class="text-xl text-gray-600">State-of-the-art equipment and comfortable treatment environment</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <img src="/images/clinic/IMG20251130095154.jpg" 
                     alt="Pain Therapy Clinic Interior" 
                     class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 class="text-white text-xl font-bold">Treatment Room</h3>
                    <p class="text-gray-200 text-sm">Modern equipment for effective therapy</p>
                </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <img src="/images/clinic/IMG20251130100930.jpg" 
                     alt="Clinic Facility" 
                     class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 class="text-white text-xl font-bold">Therapy Equipment</h3>
                    <p class="text-gray-200 text-sm">Advanced technology for pain management</p>
                </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <img src="/images/clinic/IMG20251130104531.jpg" 
                     alt="Rehabilitation Area" 
                     class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 class="text-white text-xl font-bold">Rehabilitation Area</h3>
                    <p class="text-gray-200 text-sm">Spacious area for recovery exercises</p>
                </div>
            </div>

            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <img src="/images/clinic/IMG20251130132700.jpg" 
                     alt="Clinic Reception" 
                     class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 class="text-white text-xl font-bold">Reception Area</h3>
                    <p class="text-gray-200 text-sm">Welcoming and comfortable waiting space</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Dr. Subodh Recognition Section -->
<section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Professional Recognition</h2>
            <p class="text-xl text-gray-600">Dr. Subodh Kumar receiving awards and certifications</p>
        </div>

        <div class="max-w-4xl mx-auto">
            <div class="rounded-2xl overflow-hidden shadow-2xl">
                <img src="/images/doctor/Dr.SubodhGettingcertifications1.jpg" 
                     alt="Dr. Subodh Kumar Receiving Certification" 
                     class="w-full h-auto">
            </div>
        </div>
    </div>
</section>

<!-- Why Choose Us Section -->
<section class="py-16 bg-gradient-to-r from-blue-50 to-teal-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Clinic?</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-award text-3xl text-blue-600"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Certified Professionals</h3>
                <p class="text-gray-600">Highly qualified and experienced medical team</p>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-microscope text-3xl text-teal-600"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Modern Equipment</h3>
                <p class="text-gray-600">Latest technology for effective treatment</p>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-users text-3xl text-blue-600"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Patient-Centered Care</h3>
                <p class="text-gray-600">Personalized treatment plans for every patient</p>
            </div>
        </div>
    </div>
</section>

<!-- Call to Action -->
<section class="py-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold mb-6">Ready to Start Your Recovery Journey?</h2>
        <p class="text-xl mb-8">Book an appointment today and experience professional care</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/pages/contact" 
               class="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                <i class="fas fa-calendar-check mr-2"></i>
                Book Appointment
            </a>
            <a href="tel:8160754633" 
               class="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl">
                <i class="fas fa-phone mr-2"></i>
                Call: 8160754633
            </a>
        </div>
    </div>
</section>`;

  await connection.execute(
    "UPDATE pages SET content = ?, updated_at = NOW() WHERE slug = ?",
    [galleryContent, "gallery"]
  );

  console.log("✅ Gallery page updated with clinic photos!");
  await connection.end();
}

updateGalleryPage().catch(console.error);
