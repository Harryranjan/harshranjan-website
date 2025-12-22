const mysql = require('mysql2/promise');

async function updateFacilityPhotos() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'harsh_ranjan_website'
  });

  // First, let's check what pages we have related to gallery/facility
  const [pages] = await connection.execute(
    'SELECT id, slug, title FROM pages WHERE slug IN ("about", "gallery", "our-facility") OR title LIKE "%facility%" OR title LIKE "%gallery%"'
  );

  console.log('Found pages:', pages);

  // Update the about page with correct clinic photos
  const galleryContent = `<!-- Hero Section -->
<section class="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
    <div class="container mx-auto px-6 text-center">
        <h1 class="text-5xl font-bold mb-4">Our Facility</h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">State-of-the-art equipment and comfortable treatment environment</p>
    </div>
</section>

<!-- Facility Gallery -->
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Photo 1 -->
            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <img src="/images/WhatsApp Image 2025-12-04 at 00.24.43_0965a1c9.jpg" 
                     alt="Treatment Room" 
                     class="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-300">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 class="text-white text-2xl font-bold mb-2">Treatment Room</h3>
                    <p class="text-gray-200">Modern equipment for effective therapy</p>
                </div>
            </div>

            <!-- Photo 2 -->
            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <img src="/images/WhatsApp Image 2025-12-04 at 00.24.44_8e91fcce.jpg" 
                     alt="Therapy Equipment" 
                     class="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-300">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 class="text-white text-2xl font-bold mb-2">Therapy Equipment</h3>
                    <p class="text-gray-200">Advanced technology for pain management</p>
                </div>
            </div>

            <!-- Photo 3 -->
            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <img src="/images/WhatsApp Image 2025-12-04 at 00.24.43_0965a1c9.jpg" 
                     alt="Rehabilitation Area" 
                     class="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-300">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 class="text-white text-2xl font-bold mb-2">Rehabilitation Area</h3>
                    <p class="text-gray-200">Spacious area for recovery exercises</p>
                </div>
            </div>

            <!-- Photo 4 -->
            <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <img src="/images/WhatsApp Image 2025-12-04 at 00.24.44_8e91fcce.jpg" 
                     alt="Reception Area" 
                     class="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-300">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 class="text-white text-2xl font-bold mb-2">Reception Area</h3>
                    <p class="text-gray-200">Welcoming and comfortable waiting space</p>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Why Choose Our Facility -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Facility</h2>
            <p class="text-xl text-gray-600">Excellence in care, comfort, and technology</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center p-6">
                <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-hospital text-4xl text-blue-600"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Modern Equipment</h3>
                <p class="text-gray-600">Latest physiotherapy and rehabilitation technology for effective treatment</p>
            </div>
            
            <div class="text-center p-6">
                <div class="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-heart text-4xl text-teal-600"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Comfortable Environment</h3>
                <p class="text-gray-600">Clean, hygienic, and welcoming space designed for patient comfort</p>
            </div>
            
            <div class="text-center p-6">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-user-md text-4xl text-green-600"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Expert Care</h3>
                <p class="text-gray-600">Experienced team providing personalized treatment plans</p>
            </div>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="py-16 bg-gradient-to-r from-blue-600 to-teal-500">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold text-white mb-6">Visit Our Facility</h2>
        <p class="text-xl text-blue-100 mb-8">Experience world-class physiotherapy care in Vadodara</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/pages/contact" class="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg">
                <i class="fas fa-calendar-check mr-2"></i>
                Book Appointment
            </a>
            <a href="tel:8160754633" class="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg">
                <i class="fas fa-phone mr-2"></i>
                Call: 8160754633
            </a>
        </div>
    </div>
</section>`;

  // Check if we need to create or update a page
  if (pages.length === 0) {
    // Create new gallery/facility page
    await connection.execute(
      `INSERT INTO pages (title, slug, content, template, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      ['Our Facility', 'our-facility', galleryContent, 'custom', 'published']
    );
    console.log('✅ Created new "Our Facility" page with correct photos!');
  } else {
    // Update existing page
    const targetPage = pages.find(p => p.slug === 'about') || pages[0];
    await connection.execute(
      'UPDATE pages SET content = ?, updated_at = NOW() WHERE id = ?',
      [galleryContent, targetPage.id]
    );
    console.log(`✅ Updated "${targetPage.title}" (${targetPage.slug}) page with correct facility photos!`);
  }

  await connection.end();
}

updateFacilityPhotos().catch(console.error);
