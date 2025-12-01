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

const pages = [
  {
    title: 'Homepage',
    slug: 'homepage',
    template: 'custom_html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEXUS - Digital Agency</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    animation: {
                        'bounce': 'bounce 1s infinite',
                        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }
                }
            }
        }
    </script>
    <style>
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        .float { animation: float 6s ease-in-out infinite; }
    </style>
</head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-40 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    NEXUS
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#" class="text-white/90 hover:text-white transition-all duration-300">Home</a>
                    <a href="#" class="text-white/90 hover:text-white transition-all duration-300">Services</a>
                    <a href="#" class="text-white/90 hover:text-white transition-all duration-300">About</a>
                    <a href="#" class="text-white/90 hover:text-white transition-all duration-300">Contact</a>
                </div>
                <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105">
                    Let's Talk
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center relative overflow-hidden">
        <!-- Animated Background -->
        <div class="absolute inset-0">
            <div class="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute top-40 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div class="container mx-auto px-6 text-center relative z-10">
            <!-- Hero Badge -->
            <div class="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8">
                <span class="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                <span class="text-white/90 text-sm">Available for new projects</span>
            </div>

            <!-- Main Headline -->
            <h1 class="text-6xl md:text-8xl font-black text-white mb-6 leading-none tracking-tight">
                CRAFTING
                <span class="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                    DIGITAL
                </span>
                <span class="block text-5xl md:text-7xl text-white/80">EXPERIENCES</span>
            </h1>
            
            <p class="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed">
                We create award-winning digital products that combine stunning design 
                with cutting-edge technology to deliver exceptional user experiences.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105">
                    View Our Work
                </button>
                <button class="border-2 border-white/30 bg-white/5 backdrop-blur-md text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                    Start a Project →
                </button>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div class="text-center">
                    <div class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">250+</div>
                    <div class="text-white/60 text-sm uppercase tracking-wide">Projects Delivered</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">50+</div>
                    <div class="text-white/60 text-sm uppercase tracking-wide">Happy Clients</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">5+</div>
                    <div class="text-white/60 text-sm uppercase tracking-wide">Years Experience</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="py-32 bg-gradient-to-b from-slate-900 to-black">
        <div class="container mx-auto px-6">
            <div class="text-center mb-20">
                <div class="inline-block bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
                    <span class="text-purple-400 text-sm font-medium">WHAT WE DO</span>
                </div>
                <h2 class="text-5xl md:text-6xl font-black text-white mb-6">
                    Our <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Expertise</span>
                </h2>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Service Cards -->
                <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500">
                    <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-2xl mb-6">⚡</div>
                    <h3 class="text-2xl font-bold text-white mb-4">Web Development</h3>
                    <p class="text-white/70">Lightning-fast websites built with cutting-edge technologies.</p>
                </div>

                <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500">
                    <div class="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-2xl mb-6">📱</div>
                    <h3 class="text-2xl font-bold text-white mb-4">Mobile Apps</h3>
                    <p class="text-white/70">Native and cross-platform mobile applications that users love.</p>
                </div>

                <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500">
                    <div class="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center text-2xl mb-6">🎨</div>
                    <h3 class="text-2xl font-bold text-white mb-4">UI/UX Design</h3>
                    <p class="text-white/70">User-centered designs that convert visitors into customers.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-32 bg-gradient-to-r from-purple-900 to-pink-800">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-6xl md:text-8xl font-black text-white mb-8">
                Let's Create
                <span class="block bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">Something</span>
                <span class="block text-5xl md:text-7xl text-white/90">AMAZING</span>
            </h2>
            
            <p class="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto">
                Ready to transform your digital presence? Let's discuss your vision and create something extraordinary together.
            </p>

            <div class="flex flex-col sm:flex-row gap-6 justify-center">
                <button class="bg-white text-black px-10 py-5 rounded-full text-xl font-bold hover:scale-110 transition-transform">
                    Start Your Project →
                </button>
                <button class="border-2 border-white/30 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition-all">
                    View Our Work
                </button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black py-20">
        <div class="container mx-auto px-6">
            <div class="text-center">
                <div class="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">NEXUS</div>
                <p class="text-white/60 mb-8">Crafting digital experiences that inspire and engage.</p>
                <div class="text-white/40 text-sm">&copy; 2025 NEXUS. All rights reserved.</div>
            </div>
        </div>
    </footer>
</body>
</html>`,
    meta_title: 'NEXUS - Digital Agency | Premium Web Design & Development',
    meta_description: 'Award-winning digital agency specializing in web development, mobile apps, and UI/UX design. Transform your digital presence with cutting-edge solutions.',
    meta_keywords: 'digital agency, web development, mobile apps, UI/UX design, branding'
  },
  {
    title: 'Services',
    slug: 'services',
    template: 'custom_html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Services - NEXUS</title>
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
                    <a href="/pages/services" class="text-purple-400 font-medium">Services</a>
                    <a href="/pages/about" class="text-white/90 hover:text-white transition-colors">About</a>
                    <a href="/pages/contact" class="text-white/90 hover:text-white transition-colors">Contact</a>
                </div>
                <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full">Let's Talk</button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-24 pb-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">Our Services</h1>
            <p class="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Comprehensive digital solutions to help your business grow and thrive in the modern world.
            </p>
        </div>
    </section>

    <!-- Services Grid -->
    <section class="py-32 bg-black">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Web Development -->
                <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500">
                    <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-2xl mb-6">⚡</div>
                    <h3 class="text-2xl font-bold text-white mb-4">Web Development</h3>
                    <p class="text-white/70 mb-6">Lightning-fast websites built with cutting-edge technologies and optimized for performance.</p>
                    <div class="text-2xl font-bold text-blue-400 mb-4">Starting at $2,999</div>
                    <div class="text-purple-400 font-semibold">Learn More →</div>
                </div>

                <!-- Mobile Apps -->
                <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500">
                    <div class="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-2xl mb-6">📱</div>
                    <h3 class="text-2xl font-bold text-white mb-4">Mobile Apps</h3>
                    <p class="text-white/70 mb-6">Native and cross-platform mobile applications that users love to engage with.</p>
                    <div class="text-2xl font-bold text-blue-400 mb-4">Starting at $4,999</div>
                    <div class="text-purple-400 font-semibold">Learn More →</div>
                </div>

                <!-- UI/UX Design -->
                <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500">
                    <div class="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center text-2xl mb-6">🎨</div>
                    <h3 class="text-2xl font-bold text-white mb-4">UI/UX Design</h3>
                    <p class="text-white/70 mb-6">User-centered designs that convert visitors into customers and drive engagement.</p>
                    <div class="text-2xl font-bold text-blue-400 mb-4">Starting at $1,999</div>
                    <div class="text-purple-400 font-semibold">Learn More →</div>
                </div>

                <!-- Brand Identity -->
                <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500">
                    <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl mb-6">✨</div>
                    <h3 class="text-2xl font-bold text-white mb-4">Brand Identity</h3>
                    <p class="text-white/70 mb-6">Memorable brand experiences that tell your story and connect with your audience.</p>
                    <div class="text-2xl font-bold text-blue-400 mb-4">Starting at $1,499</div>
                    <div class="text-purple-400 font-semibold">Learn More →</div>
                </div>

                <!-- E-commerce -->
                <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500">
                    <div class="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-2xl mb-6">🛍️</div>
                    <h3 class="text-2xl font-bold text-white mb-4">E-commerce</h3>
                    <p class="text-white/70 mb-6">Powerful online stores that maximize conversions and provide seamless shopping experiences.</p>
                    <div class="text-2xl font-bold text-blue-400 mb-4">Starting at $3,999</div>
                    <div class="text-purple-400 font-semibold">Learn More →</div>
                </div>

                <!-- Consulting -->
                <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500">
                    <div class="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-6">🚀</div>
                    <h3 class="text-2xl font-bold text-white mb-4">Consulting</h3>
                    <p class="text-white/70 mb-6">Strategic guidance to help you make informed decisions about your digital presence.</p>
                    <div class="text-2xl font-bold text-blue-400 mb-4">Starting at $200/hour</div>
                    <div class="text-purple-400 font-semibold">Learn More →</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Process Section -->
    <section class="py-32 bg-gradient-to-b from-black to-slate-900">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-5xl font-bold text-white mb-4">Our Process</h2>
                <p class="text-xl text-white/60 max-w-2xl mx-auto">We follow a proven methodology to ensure successful project delivery.</p>
            </div>

            <div class="grid md:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">01</div>
                    <div class="text-4xl mb-4">🔍</div>
                    <h3 class="text-2xl font-bold text-white mb-4">Discovery</h3>
                    <p class="text-white/60">We understand your business goals and requirements</p>
                </div>

                <div class="text-center">
                    <div class="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">02</div>
                    <div class="text-4xl mb-4">📋</div>
                    <h3 class="text-2xl font-bold text-white mb-4">Planning</h3>
                    <p class="text-white/60">Strategic planning and roadmap development</p>
                </div>

                <div class="text-center">
                    <div class="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">03</div>
                    <div class="text-4xl mb-4">⚡</div>
                    <h3 class="text-2xl font-bold text-white mb-4">Development</h3>
                    <p class="text-white/60">Agile development with regular updates</p>
                </div>

                <div class="text-center">
                    <div class="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">04</div>
                    <div class="text-4xl mb-4">🚀</div>
                    <h3 class="text-2xl font-bold text-white mb-4">Launch</h3>
                    <p class="text-white/60">Testing, deployment, and ongoing support</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-32 bg-gradient-to-r from-purple-600 to-pink-600">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-5xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
            <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Let's discuss your requirements and create something amazing together.</p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">Get Free Quote</button>
                <button class="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all">View Portfolio</button>
            </div>
        </div>
    </section>
</body>
</html>`,
    meta_title: 'Our Services - NEXUS Digital Agency',
    meta_description: 'Explore our comprehensive digital services including web development, mobile apps, UI/UX design, branding, e-commerce, and consulting.',
    meta_keywords: 'web development, mobile apps, UI/UX design, branding, e-commerce, digital consulting'
  },
  {
    title: 'About Us',
    slug: 'about',
    template: 'custom_html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - NEXUS</title>
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
                    <a href="/pages/about" class="text-purple-400 font-medium">About</a>
                    <a href="/pages/contact" class="text-white/90 hover:text-white transition-colors">Contact</a>
                </div>
                <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full">Let's Talk</button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 text-center">
        <div class="container mx-auto px-6">
            <div class="inline-block bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
                <span class="text-purple-400 text-sm font-medium">ABOUT US</span>
            </div>
            <h1 class="text-5xl md:text-6xl font-black text-white mb-8">
                We Create <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Digital Magic</span>
            </h1>
            <p class="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
                We're a team of passionate designers and developers who believe in the power of great design to transform businesses and create meaningful connections.
            </p>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-black/50">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">250+</div>
                    <div class="text-white/60 text-sm leading-tight">Projects<br>Delivered</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">99%</div>
                    <div class="text-white/60 text-sm leading-tight">Client<br>Satisfaction</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent mb-2">50+</div>
                    <div class="text-white/60 text-sm leading-tight">Happy<br>Clients</div>
                </div>
                <div class="text-center">
                    <div class="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">24/7</div>
                    <div class="text-white/60 text-sm leading-tight">Support<br>Available</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-32 bg-gradient-to-b from-black to-slate-900">
        <div class="container mx-auto px-6">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">Our Story</h2>
                    <p class="text-xl text-white/70 mb-6">
                        Founded in 2020, NEXUS started with a simple mission: to create digital experiences that don't just look beautiful, but actually drive results for our clients.
                    </p>
                    <p class="text-lg text-white/60 mb-8">
                        What began as a small team of designers and developers has grown into a full-service digital agency, but we've never lost sight of what matters most - delivering exceptional work that exceeds expectations.
                    </p>
                    <div class="space-y-4">
                        <div class="flex items-center space-x-4">
                            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span class="text-white/80">User-centered design approach</span>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="w-2 h-2 bg-pink-500 rounded-full"></div>
                            <span class="text-white/80">Cutting-edge technology stack</span>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span class="text-white/80">Agile development methodology</span>
                        </div>
                    </div>
                </div>

                <div class="relative">
                    <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8">
                        <div class="text-8xl mb-6">🎯</div>
                        <h3 class="text-2xl font-bold text-white mb-4">Our Mission</h3>
                        <p class="text-white/70">
                            To create digital experiences that not only look beautiful but also drive real business results and meaningful user engagement.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Team Section -->
    <section class="py-32 bg-black">
        <div class="container mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Meet Our Team</h2>
                <p class="text-xl text-white/60">The creative minds behind NEXUS</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Team Member 1 -->
                <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl text-center">
                    <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">👨‍💻</div>
                    <h3 class="text-xl font-bold text-white mb-2">Alex Johnson</h3>
                    <p class="text-purple-400 mb-4">Creative Director</p>
                    <p class="text-white/60 text-sm">Leading creative vision and ensuring every project meets the highest design standards.</p>
                </div>

                <!-- Team Member 2 -->
                <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl text-center">
                    <div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">👩‍💻</div>
                    <h3 class="text-xl font-bold text-white mb-2">Sarah Chen</h3>
                    <p class="text-blue-400 mb-4">Lead Developer</p>
                    <p class="text-white/60 text-sm">Bringing designs to life with clean, efficient code and cutting-edge technologies.</p>
                </div>

                <!-- Team Member 3 -->
                <div class="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl text-center">
                    <div class="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">👨‍💼</div>
                    <h3 class="text-xl font-bold text-white mb-2">Mike Rodriguez</h3>
                    <p class="text-green-400 mb-4">Project Manager</p>
                    <p class="text-white/60 text-sm">Ensuring projects are delivered on time, on budget, and exceed client expectations.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Values Section -->
    <section class="py-32 bg-gradient-to-b from-black to-slate-900">
        <div class="container mx-auto px-6">
            <div class="text-center mb-20">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Our Values</h2>
                <p class="text-xl text-white/60">What drives us every day</p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">🎨</div>
                    <h3 class="text-xl font-bold text-white mb-4">Creativity</h3>
                    <p class="text-white/60">We push creative boundaries to deliver unique, memorable experiences.</p>
                </div>

                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">🔧</div>
                    <h3 class="text-xl font-bold text-white mb-4">Quality</h3>
                    <p class="text-white/60">Every project is crafted with meticulous attention to detail and precision.</p>
                </div>

                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">🤝</div>
                    <h3 class="text-xl font-bold text-white mb-4">Partnership</h3>
                    <p class="text-white/60">We work closely with clients as true partners in their success.</p>
                </div>

                <div class="text-center">
                    <div class="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">🚀</div>
                    <h3 class="text-xl font-bold text-white mb-4">Innovation</h3>
                    <p class="text-white/60">We stay ahead of trends and embrace new technologies and methodologies.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-32 bg-gradient-to-r from-purple-600 to-pink-600">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Work Together?</h2>
            <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Let's discuss your project and see how we can help bring your vision to life.</p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">Start a Project</button>
                <button class="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all">View Our Work</button>
            </div>
        </div>
    </section>
</body>
</html>`,
    meta_title: 'About Us - NEXUS Digital Agency',
    meta_description: 'Learn about NEXUS, a passionate team of designers and developers creating digital experiences that drive real business results.',
    meta_keywords: 'about nexus, digital agency team, creative directors, web developers, design team'
  }
];

async function createPages() {
  let connection;
  try {
    console.log('🔌 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connected successfully!');
    
    for (const page of pages) {
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
    
    console.log('\n🎉 All pages created successfully!');
    console.log('\nYou can now see these pages in your admin panel:');
    console.log('- Homepage (/pages/homepage)');
    console.log('- Services (/pages/services)');
    console.log('- About Us (/pages/about)');
    
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

createPages();