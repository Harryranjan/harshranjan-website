const mysql = require("mysql2/promise");

async function createSpineBackPainContent() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh_ranjan_website",
  });

  const content = `<!-- Hero Section -->
<section class="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
    <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto text-center">
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/30">
                <i class="fas fa-spine"></i>
                <span>Expert Spine Care</span>
            </div>
            <h1 class="text-5xl font-bold mb-4">Spine & Back Pain Therapy</h1>
            <p class="text-xl text-blue-100">Comprehensive treatment for all types of spinal conditions and back pain</p>
        </div>
    </div>
</section>

<!-- Introduction -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <p class="text-lg text-gray-700 mb-6">Back pain is one of the most common health problems affecting millions of people worldwide. At Pain Therapy & Rehab Centre, we specialize in treating all types of spine and back pain conditions using advanced physiotherapy techniques, manual therapy, and holistic approaches.</p>
            <p class="text-lg text-gray-700">Our comprehensive spine care program addresses the root cause of your pain, not just the symptoms, ensuring long-lasting relief and improved quality of life.</p>
        </div>
    </div>
</section>

<!-- Conditions We Treat -->
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Conditions We Treat</h2>
            <p class="text-xl text-gray-600">Expert care for a wide range of spine and back conditions</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-blue-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-check-circle text-2xl text-blue-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Lower Back Pain</h3>
                        <p class="text-sm text-gray-600">Acute and chronic lumbar pain affecting daily activities</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-teal-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-check-circle text-2xl text-teal-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Sciatica</h3>
                        <p class="text-sm text-gray-600">Nerve pain radiating from lower back to leg</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-green-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-check-circle text-2xl text-green-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Neck Pain</h3>
                        <p class="text-sm text-gray-600">Cervical pain and stiffness from poor posture or injury</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-purple-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-check-circle text-2xl text-purple-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Herniated Disc</h3>
                        <p class="text-sm text-gray-600">Slipped or bulging disc causing nerve compression</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-orange-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-check-circle text-2xl text-orange-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Cervical Spondylosis</h3>
                        <p class="text-sm text-gray-600">Age-related wear and tear of neck discs</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-pink-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-check-circle text-2xl text-pink-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Spondylolisthesis</h3>
                        <p class="text-sm text-gray-600">Vertebra slipping out of position</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-indigo-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-check-circle text-2xl text-indigo-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Spinal Stenosis</h3>
                        <p class="text-sm text-gray-600">Narrowing of spinal canal causing pressure</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-red-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-check-circle text-2xl text-red-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Postural Back Pain</h3>
                        <p class="text-sm text-gray-600">Pain from poor posture or prolonged sitting</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4 border-yellow-600">
                <div class="flex items-start gap-4">
                    <i class="fas fa-check-circle text-2xl text-yellow-600 mt-1"></i>
                    <div>
                        <h3 class="font-bold text-lg mb-2">Post-Surgery Rehab</h3>
                        <p class="text-sm text-gray-600">Recovery after spinal surgery procedures</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Treatment Approaches -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Our Treatment Approaches</h2>
            <p class="text-xl text-gray-600">Evidence-based therapies tailored to your condition</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
                <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-hands text-white text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Manual Therapy</h3>
                <p class="text-gray-700 mb-4">Hands-on techniques to mobilize joints and soft tissues, reduce pain, and improve spinal mobility.</p>
                <ul class="space-y-2 text-sm text-gray-600">
                    <li class="flex items-start gap-2">
                        <i class="fas fa-chevron-right text-blue-600 mt-1"></i>
                        <span>Spinal manipulation and mobilization</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fas fa-chevron-right text-blue-600 mt-1"></i>
                        <span>Soft tissue massage techniques</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fas fa-chevron-right text-blue-600 mt-1"></i>
                        <span>Myofascial release therapy</span>
                    </li>
                </ul>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-xl">
                <div class="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-dumbbell text-white text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Exercise Therapy</h3>
                <p class="text-gray-700 mb-4">Customized strengthening and flexibility exercises to support spine health and prevent recurrence.</p>
                <ul class="space-y-2 text-sm text-gray-600">
                    <li class="flex items-start gap-2">
                        <i class="fas fa-chevron-right text-teal-600 mt-1"></i>
                        <span>Core strengthening exercises</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fas fa-chevron-right text-teal-600 mt-1"></i>
                        <span>Spinal stabilization training</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fas fa-chevron-right text-teal-600 mt-1"></i>
                        <span>Flexibility and stretching programs</span>
                    </li>
                </ul>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl">
                <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-brain text-white text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Neurotherapy</h3>
                <p class="text-gray-700 mb-4">Advanced nerve stimulation techniques to address nerve-related back pain and sciatica.</p>
                <ul class="space-y-2 text-sm text-gray-600">
                    <li class="flex items-start gap-2">
                        <i class="fas fa-chevron-right text-green-600 mt-1"></i>
                        <span>Nerve mobilization techniques</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fas fa-chevron-right text-green-600 mt-1"></i>
                        <span>Neural tissue management</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fas fa-chevron-right text-green-600 mt-1"></i>
                        <span>Pain pathway modulation</span>
                    </li>
                </ul>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl">
                <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                    <i class="fas fa-heart text-white text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-3">Acupressure & Sujok</h3>
                <p class="text-gray-700 mb-4">Traditional healing techniques to relieve pain and promote natural healing processes.</p>
                <ul class="space-y-2 text-sm text-gray-600">
                    <li class="flex items-start gap-2">
                        <i class="fas fa-chevron-right text-purple-600 mt-1"></i>
                        <span>Targeted pressure point therapy</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fas fa-chevron-right text-purple-600 mt-1"></i>
                        <span>Energy meridian balancing</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fas fa-chevron-right text-purple-600 mt-1"></i>
                        <span>Natural pain relief methods</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- Benefits -->
<section class="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Benefits of Our Spine Care</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check text-blue-600 text-2xl"></i>
                </div>
                <h3 class="font-bold mb-2">Pain Relief</h3>
                <p class="text-sm text-gray-600">Significant reduction in back and neck pain</p>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-walking text-teal-600 text-2xl"></i>
                </div>
                <h3 class="font-bold mb-2">Improved Mobility</h3>
                <p class="text-sm text-gray-600">Enhanced range of motion and flexibility</p>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-shield-alt text-green-600 text-2xl"></i>
                </div>
                <h3 class="font-bold mb-2">Prevent Recurrence</h3>
                <p class="text-sm text-gray-600">Strengthen spine to prevent future issues</p>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-smile text-purple-600 text-2xl"></i>
                </div>
                <h3 class="font-bold mb-2">Better Quality of Life</h3>
                <p class="text-sm text-gray-600">Return to normal activities pain-free</p>
            </div>
        </div>
    </div>
</section>

<!-- CTA -->
<section class="py-16 bg-gradient-to-r from-blue-600 to-teal-500">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold text-white mb-6">Ready to Get Relief from Back Pain?</h2>
        <p class="text-xl text-blue-100 mb-8">Book your consultation today and start your journey to a pain-free life</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/pages/contact" class="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                <i class="fas fa-calendar-check mr-2"></i>
                Book Appointment
            </a>
            <a href="tel:8160754633" class="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl border-2 border-white">
                <i class="fas fa-phone mr-2"></i>
                Call: 8160754633
            </a>
        </div>
    </div>
</section>`;

  await connection.execute(
    "UPDATE pages SET content = ?, template = ?, updated_at = NOW() WHERE slug = ?",
    [content, "custom", "spine-back-pain-therapy"]
  );

  console.log(
    "✅ Created comprehensive content for Spine & Back Pain Therapy page"
  );

  await connection.end();
}

createSpineBackPainContent().catch(console.error);
