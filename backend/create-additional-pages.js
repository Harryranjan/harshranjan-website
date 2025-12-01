const mysql = require('mysql2/promise');
require('dotenv').config();

// Create database connection
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
};

const additionalPages = [
  {
    title: 'Contact Us',
    slug: 'contact',
    template: 'custom_html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - NEXUS</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">NEXUS</div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/" class="text-white/90 hover:text-white transition-colors">Home</a>
                    <a href="/pages/services" class="text-white/90 hover:text-white transition-colors">Services</a>
                    <a href="/pages/about" class="text-white/90 hover:text-white transition-colors">About</a>
                    <a href="/pages/contact" class="text-purple-400 font-medium">Contact</a>
                </div>
                <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full">Let's Talk</button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 text-center">
        <div class="container mx-auto px-6">
            <div class="inline-block bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
                <span class="text-purple-400 text-sm font-medium">GET IN TOUCH</span>
            </div>
            <h1 class="text-5xl md:text-6xl font-black text-white mb-8">
                Let's Create Something
                <span class="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Amazing Together</span>
            </h1>
            <p class="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                Ready to bring your vision to life? We'd love to hear about your project and explore how we can help you achieve your goals.
            </p>
        </div>
    </section>

    <!-- Contact Form & Info Section -->
    <section class="py-20 bg-black/50">
        <div class="container mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-16">
                <!-- Contact Form -->
                <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
                    <h2 class="text-3xl font-bold text-white mb-8">Send us a Message</h2>
                    
                    <form class="space-y-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-white/80 text-sm font-medium mb-2">First Name</label>
                                <input type="text" class="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors" placeholder="John">
                            </div>
                            <div>
                                <label class="block text-white/80 text-sm font-medium mb-2">Last Name</label>
                                <input type="text" class="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors" placeholder="Doe">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-white/80 text-sm font-medium mb-2">Email</label>
                            <input type="email" class="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors" placeholder="john@example.com">
                        </div>
                        
                        <div>
                            <label class="block text-white/80 text-sm font-medium mb-2">Project Type</label>
                            <select class="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors">
                                <option value="">Select a service</option>
                                <option value="web-development">Web Development</option>
                                <option value="mobile-app">Mobile App</option>
                                <option value="ui-ux-design">UI/UX Design</option>
                                <option value="branding">Brand Identity</option>
                                <option value="ecommerce">E-commerce</option>
                                <option value="consulting">Consulting</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-white/80 text-sm font-medium mb-2">Project Budget</label>
                            <select class="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors">
                                <option value="">Select budget range</option>
                                <option value="under-5k">Under $5,000</option>
                                <option value="5k-10k">$5,000 - $10,000</option>
                                <option value="10k-25k">$10,000 - $25,000</option>
                                <option value="25k-50k">$25,000 - $50,000</option>
                                <option value="50k-plus">$50,000+</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-white/80 text-sm font-medium mb-2">Tell us about your project</label>
                            <textarea rows="6" class="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors" placeholder="Describe your project, goals, timeline, and any specific requirements..."></textarea>
                        </div>
                        
                        <button type="submit" class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform">
                            Send Message
                        </button>
                    </form>
                </div>

                <!-- Contact Information -->
                <div>
                    <h2 class="text-3xl font-bold text-white mb-8">Get in Touch</h2>
                    
                    <div class="space-y-8">
                        <!-- Contact Info Cards -->
                        <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                            <div class="flex items-center space-x-4 mb-4">
                                <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl">📧</div>
                                <div>
                                    <h3 class="text-white font-semibold">Email Us</h3>
                                    <p class="text-white/60 text-sm">We'll respond within 24 hours</p>
                                </div>
                            </div>
                            <p class="text-white/80">hello@nexusagency.com</p>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                            <div class="flex items-center space-x-4 mb-4">
                                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-xl">📞</div>
                                <div>
                                    <h3 class="text-white font-semibold">Call Us</h3>
                                    <p class="text-white/60 text-sm">Mon-Fri 9am-6pm EST</p>
                                </div>
                            </div>
                            <p class="text-white/80">+1 (555) 123-4567</p>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                            <div class="flex items-center space-x-4 mb-4">
                                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-xl">📍</div>
                                <div>
                                    <h3 class="text-white font-semibold">Visit Us</h3>
                                    <p class="text-white/60 text-sm">Our office location</p>
                                </div>
                            </div>
                            <p class="text-white/80">123 Innovation Drive<br>Suite 100<br>San Francisco, CA 94105</p>
                        </div>

                        <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                            <div class="flex items-center space-x-4 mb-4">
                                <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-xl">💬</div>
                                <div>
                                    <h3 class="text-white font-semibold">Free Consultation</h3>
                                    <p class="text-white/60 text-sm">30-minute strategy session</p>
                                </div>
                            </div>
                            <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
                                Schedule Call
                            </button>
                        </div>
                    </div>

                    <!-- Social Media -->
                    <div class="mt-12">
                        <h3 class="text-xl font-bold text-white mb-6">Follow Us</h3>
                        <div class="flex space-x-4">
                            <a href="#" class="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-xl hover:bg-white/10 transition-colors">🐦</a>
                            <a href="#" class="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-xl hover:bg-white/10 transition-colors">📧</a>
                            <a href="#" class="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-xl hover:bg-white/10 transition-colors">💼</a>
                            <a href="#" class="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-xl hover:bg-white/10 transition-colors">📷</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-32 bg-gradient-to-b from-black to-slate-900">
        <div class="container mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                <p class="text-xl text-white/60">Everything you need to know about working with us</p>
            </div>

            <div class="max-w-4xl mx-auto space-y-6">
                <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h3 class="text-xl font-bold text-white mb-4">How long does a typical project take?</h3>
                    <p class="text-white/70">Project timelines vary based on scope and complexity. A simple website typically takes 2-4 weeks, while complex applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation.</p>
                </div>

                <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h3 class="text-xl font-bold text-white mb-4">What's included in your pricing?</h3>
                    <p class="text-white/70">Our pricing includes design, development, testing, deployment, and 30 days of post-launch support. We also provide training materials and documentation for your team.</p>
                </div>

                <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h3 class="text-xl font-bold text-white mb-4">Do you work with clients internationally?</h3>
                    <p class="text-white/70">Yes! We work with clients worldwide. We're experienced in managing projects across different time zones and use collaborative tools to ensure smooth communication.</p>
                </div>

                <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h3 class="text-xl font-bold text-white mb-4">What technologies do you use?</h3>
                    <p class="text-white/70">We use modern, proven technologies including React, Node.js, Python, and cloud platforms like AWS. We always choose the best tech stack for your specific needs and goals.</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`,
    meta_title: 'Contact Us - NEXUS Digital Agency',
    meta_description: 'Get in touch with NEXUS for your next digital project. Free consultation, expert guidance, and award-winning results.',
    meta_keywords: 'contact nexus, digital agency contact, web development inquiry, project consultation'
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    template: 'custom_html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - NEXUS</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">NEXUS</div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/" class="text-white/90 hover:text-white transition-colors">Home</a>
                    <a href="/pages/services" class="text-white/90 hover:text-white transition-colors">Services</a>
                    <a href="/pages/about" class="text-white/90 hover:text-white transition-colors">About</a>
                    <a href="/pages/contact" class="text-white/90 hover:text-white transition-colors">Contact</a>
                </div>
                <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full">Let's Talk</button>
            </div>
        </div>
    </nav>

    <div class="pt-32 pb-20">
        <div class="container mx-auto px-6 max-w-4xl">
            <h1 class="text-5xl font-bold text-white mb-8">Privacy Policy</h1>
            <p class="text-white/60 mb-12">Last updated: December 1, 2025</p>
            
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 space-y-8 text-white/80">
                <section>
                    <h2 class="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                    <p class="mb-4">We collect information you provide directly to us, such as when you:</p>
                    <ul class="list-disc list-inside space-y-2 text-white/70">
                        <li>Fill out contact forms or request quotes</li>
                        <li>Subscribe to our newsletter</li>
                        <li>Communicate with us via email or phone</li>
                        <li>Use our website and services</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                    <p class="mb-4">We use the information we collect to:</p>
                    <ul class="list-disc list-inside space-y-2 text-white/70">
                        <li>Provide and improve our services</li>
                        <li>Respond to your inquiries and requests</li>
                        <li>Send you marketing communications (with your consent)</li>
                        <li>Analyze website usage and improve user experience</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
                    <p class="text-white/70">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.</p>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                    <p class="text-white/70">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
                    <p class="text-white/70">If you have any questions about this Privacy Policy, please contact us at privacy@nexusagency.com.</p>
                </section>
            </div>
        </div>
    </div>
</body>
</html>`,
    meta_title: 'Privacy Policy - NEXUS',
    meta_description: 'Learn how NEXUS protects your privacy and handles your personal information.',
    meta_keywords: 'privacy policy, data protection, personal information, NEXUS'
  },
  {
    title: 'Terms and Conditions',
    slug: 'terms-conditions',
    template: 'custom_html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms and Conditions - NEXUS</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">NEXUS</div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/" class="text-white/90 hover:text-white transition-colors">Home</a>
                    <a href="/pages/services" class="text-white/90 hover:text-white transition-colors">Services</a>
                    <a href="/pages/about" class="text-white/90 hover:text-white transition-colors">About</a>
                    <a href="/pages/contact" class="text-white/90 hover:text-white transition-colors">Contact</a>
                </div>
                <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full">Let's Talk</button>
            </div>
        </div>
    </nav>

    <div class="pt-32 pb-20">
        <div class="container mx-auto px-6 max-w-4xl">
            <h1 class="text-5xl font-bold text-white mb-8">Terms and Conditions</h1>
            <p class="text-white/60 mb-12">Last updated: December 1, 2025</p>
            
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 space-y-8 text-white/80">
                <section>
                    <h2 class="text-2xl font-bold text-white mb-4">1. Services</h2>
                    <p class="text-white/70">NEXUS provides digital design and development services including but not limited to web development, mobile applications, UI/UX design, and digital consulting.</p>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-white mb-4">2. Project Scope and Deliverables</h2>
                    <p class="mb-4">All projects begin with a detailed scope of work that outlines:</p>
                    <ul class="list-disc list-inside space-y-2 text-white/70">
                        <li>Project deliverables and milestones</li>
                        <li>Timeline and deadlines</li>
                        <li>Pricing and payment terms</li>
                        <li>Responsibilities of both parties</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-white mb-4">3. Payment Terms</h2>
                    <p class="mb-4">Unless otherwise agreed:</p>
                    <ul class="list-disc list-inside space-y-2 text-white/70">
                        <li>50% deposit required to begin work</li>
                        <li>Remaining balance due upon project completion</li>
                        <li>Late payments may incur additional fees</li>
                        <li>All prices are in USD unless otherwise specified</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
                    <p class="text-white/70">Upon full payment, client owns all custom work created specifically for their project. NEXUS retains rights to general methodologies, techniques, and any pre-existing intellectual property.</p>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
                    <p class="text-white/70">NEXUS's liability is limited to the total amount paid for services. We are not responsible for indirect, incidental, or consequential damages.</p>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-white mb-4">6. Contact Information</h2>
                    <p class="text-white/70">For questions regarding these terms, contact us at legal@nexusagency.com.</p>
                </section>
            </div>
        </div>
    </div>
</body>
</html>`,
    meta_title: 'Terms and Conditions - NEXUS',
    meta_description: 'Read our terms and conditions for working with NEXUS Digital Agency.',
    meta_keywords: 'terms conditions, service agreement, legal terms, NEXUS'
  }
];

async function createAdditionalPages() {
  let connection;
  try {
    console.log('🔌 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connected successfully!');
    
    for (const page of additionalPages) {
      const query = `
        INSERT INTO pages (title, slug, content, template, meta_title, meta_description, meta_keywords, status, hide_title, author_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'published', 0, 1, NOW(), NOW())
        ON DUPLICATE KEY UPDATE
        content = VALUES(content),
        template = VALUES(template),
        meta_title = VALUES(meta_title),
        meta_description = VALUES(meta_description),
        meta_keywords = VALUES(meta_keywords),
        updated_at = NOW()
      `;
      
      const [result] = await connection.execute(query, [
        page.title,
        page.slug,
        page.content,
        page.template,
        page.meta_title,
        page.meta_description,
        page.meta_keywords
      ]);
      
      console.log(`✅ Created/Updated page: ${page.title}`);
    }
    
    console.log('\n🎉 Additional pages created successfully!');
    console.log('\nNew pages added to your admin panel:');
    console.log('- Contact Us (/pages/contact)');
    console.log('- Privacy Policy (/pages/privacy-policy)');
    console.log('- Terms and Conditions (/pages/terms-conditions)');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
    process.exit(0);
  }
}

createAdditionalPages();