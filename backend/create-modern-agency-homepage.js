const mysql = require("mysql2/promise");
require("dotenv").config();

async function createModernAgencyHomepage() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  });

  try {
    console.log("🎨 Creating Modern Marketing Agency Homepage...\n");

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Harsh Ranjan - AI-Powered UGC Content That Converts</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        // Primary Brand Colors
                        'navy': '#0F172A',
                        'purple': '#8B5CF6',
                        'cyan': '#06B6D4',
                        // Accent Colors
                        'coral': '#F97316',
                        // Grays
                        'gray-50': '#F8FAFC',
                        'gray-100': '#F1F5F9',
                        'gray-200': '#E2E8F0',
                        'gray-300': '#CBD5E1',
                        'gray-400': '#94A3B8',
                        'gray-500': '#64748B',
                        'gray-600': '#475569',
                        'gray-700': '#334155',
                        'gray-800': '#1E293B',
                        'gray-900': '#0F172A',
                        // Background Colors
                        'bg-primary': '#FFFFFF',
                        'bg-secondary': '#F8FAFC',
                        'bg-tertiary': '#FAF5FF',
                        'bg-dark': '#0F172A',
                        'bg-darker': '#020617',
                    },
                    fontFamily: {
                        'display': ['Space Grotesk', 'sans-serif'],
                        'body': ['Inter', 'sans-serif'],
                    },
                    backgroundImage: {
                        'gradient-hero': 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
                        'gradient-cta': 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
                        'gradient-card': 'linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 100%)',
                        'gradient-button': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
        
        /* Gradient Text */
        .gradient-text {
            background: linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        /* Gradient Button */
        .gradient-button {
            background: linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%);
            box-shadow: 0 10px 40px rgba(139, 92, 246, 0.3);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .gradient-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
        }
        
        .gradient-button:hover::before {
            left: 100%;
        }
        
        .gradient-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 50px rgba(139, 92, 246, 0.4);
        }
        
        /* Glass Card */
        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        
        .glass-card:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        /* Animated Background */
        .animated-gradient {
            background: linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
        }
        
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Floating Animation */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        .float-animation {
            animation: float 6s ease-in-out infinite;
        }
        
        /* Scroll Reveal */
        .scroll-reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        .scroll-reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Video Grid Hover */
        .video-card {
            position: relative;
            overflow: hidden;
            border-radius: 12px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .video-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
        }
        
        .video-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(15, 23, 42, 0.85), transparent 60%);
            opacity: 1;
            transition: all 0.3s;
            display: flex;
            align-items: flex-end;
            padding: 1.5rem;
        }
        
        .video-card:hover .video-overlay {
            background: linear-gradient(to top, rgba(139, 92, 246, 0.9), transparent 60%);
        }
        
        /* Pricing Card */
        .pricing-card {
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .pricing-card:hover {
            transform: translateY(-10px) scale(1.02);
        }
        
        .pricing-card.popular {
            border: 2px solid #7C3AED;
            background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(0, 229, 255, 0.1));
        }
    </style>
</head>
<body class="bg-white">

    <!-- Navigation -->
    <nav class="fixed w-full z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm" x-data="{ mobileMenuOpen: false }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Logo -->
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-cta rounded-lg flex items-center justify-center">
                        <i class="fas fa-play text-white"></i>
                    </div>
                    <span class="text-2xl font-bold gradient-text font-display">Harsh Ranjan</span>
                </div>
                
                <!-- Desktop Menu -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#home" class="text-gray-600 hover:text-navy transition">Home</a>
                    <a href="#services" class="text-gray-600 hover:text-navy transition">Services</a>
                    <a href="#work" class="text-gray-600 hover:text-navy transition">Work</a>
                    <a href="#about" class="text-gray-600 hover:text-navy transition">About</a>
                    <a href="#contact" class="text-gray-600 hover:text-navy transition">Contact</a>
                    <button class="bg-coral hover:bg-orange-600 px-6 py-2.5 rounded-full text-white font-semibold transition">
                        Book Strategy Call
                    </button>
                </div>
                
                <!-- Mobile Menu Button -->
                <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-navy">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>
            
            <!-- Mobile Menu -->
            <div x-show="mobileMenuOpen" x-transition class="md:hidden py-4 border-t border-gray-200">
                <div class="flex flex-col space-y-4">
                    <a href="#work" class="text-gray-600 hover:text-navy transition">Sample Work</a>
                    <a href="#services" class="text-gray-600 hover:text-navy transition">Services</a>
                    <a href="#process" class="text-gray-600 hover:text-navy transition">Process</a>
                    <a href="#pricing" class="text-gray-600 hover:text-navy transition">Pricing</a>
                    <a href="#results" class="text-gray-600 hover:text-navy transition">Results</a>
                    <button class="gradient-button px-6 py-2.5 rounded-full text-white font-semibold w-full">
                        Get Started Free
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-24 pb-12 animated-gradient h-screen flex items-center relative overflow-hidden">
        <!-- Floating Orbs -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-20 left-10 w-72 h-72 bg-purple/30 rounded-full blur-3xl float-animation"></div>
            <div class="absolute bottom-20 right-10 w-96 h-96 bg-cyan/20 rounded-full blur-3xl float-animation" style="animation-delay: -3s;"></div>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Left Content -->
                <div class="space-y-6">
                    <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                        <div class="w-2 h-2 bg-cyan rounded-full animate-pulse"></div>
                        <span class="text-sm font-medium text-white">AI-Powered Marketing Solutions</span>
                    </div>
                    
                    <h1 class="text-3xl md:text-5xl font-black leading-tight font-display text-white">
                        AI-Powered Marketing<br>
                        <span class="gradient-text">That Actually Works</span><br>
                        for Indian Businesses
                    </h1>
                    
                    <p class="text-lg text-gray-300 leading-relaxed">
                        From content creation to campaign automation - we handle your marketing so you can focus on growth. 
                        Complete AI-powered solutions for modern brands.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-4">
                        <button class="gradient-button px-8 py-3 rounded-full text-white font-bold text-lg flex items-center justify-center space-x-2">
                            <span>Explore Services</span>
                            <i class="fas fa-arrow-right"></i>
                        </button>
                        <button class="px-8 py-3 rounded-full text-white font-semibold border-2 border-white/30 hover:bg-white/10 transition flex items-center justify-center space-x-2">
                            <i class="fas fa-play-circle"></i>
                            <span>See Our Work</span>
                        </button>
                    </div>
                    
                    <!-- Trust Indicators -->
                    <div class="flex items-center space-x-8 pt-4">
                        <div>
                            <div class="text-2xl font-bold gradient-text">500+</div>
                            <div class="text-xs text-gray-400">Videos Created</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold gradient-text">₹2Cr+</div>
                            <div class="text-xs text-gray-400">Ad Spend Managed</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold gradient-text">50+</div>
                            <div class="text-xs text-gray-400">Systems Built</div>
                        </div>
                    </div>
                </div>
                
                <!-- Right Content - Video Preview -->
                <div class="relative">
                    <div class="aspect-video bg-gradient-to-br from-purple/20 to-cyan/20 rounded-2xl overflow-hidden shadow-2xl float-animation border border-white/10">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="text-center space-y-4">
                                <i class="fas fa-play-circle text-6xl text-white/80"></i>
                                <p class="text-white/80 font-semibold">Watch Sample UGC Video</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Floating Stats -->
                    <div class="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 bg-gradient-cta rounded-lg flex items-center justify-center">
                                <i class="fas fa-chart-line text-white"></i>
                            </div>
                            <div>
                                <div class="text-sm text-gray-400">Avg. Engagement</div>
                                <div class="text-xl font-bold text-white">+245%</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="absolute -top-6 -right-6 glass-card p-4 rounded-xl">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 bg-gradient-cta rounded-lg flex items-center justify-center">
                                <i class="fas fa-dollar-sign text-white"></i>
                            </div>
                            <div>
                                <div class="text-sm text-gray-400">Cost Savings</div>
                                <div class="text-xl font-bold text-white">₹8,000</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- The Problem Section -->
    <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 scroll-reveal">
                <h2 class="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
                    Marketing <span class="gradient-text">Shouldn't Be This Hard</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    Indian businesses face complex marketing challenges that drain resources and slow growth.
                </p>
                <p class="text-lg text-cyan font-semibold">
                    We solve all of this with AI + expert strategy
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white p-8 rounded-2xl text-center scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                    <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-rupee-sign text-3xl text-red-400"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-navy">Content creation costs ₹50k+/month</h3>
                    <p class="text-gray-600">Hiring creators, videographers, and designers burns through your budget with inconsistent results.</p>
                </div>
                
                <div class="bg-white p-8 rounded-2xl text-center scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all" style="transition-delay: 0.1s;">
                    <div class="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-cogs text-3xl text-yellow-400"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-navy">Campaigns run manually, waste time</h3>
                    <p class="text-gray-600">Spending hours on repetitive tasks instead of strategic growth activities.</p>
                </div>
                
                <div class="bg-white p-8 rounded-2xl text-center scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all" style="transition-delay: 0.2s;">
                    <div class="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-exclamation-triangle text-3xl text-purple-400"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-navy">No marketing systems in place</h3>
                    <p class="text-gray-600">Missing automated funnels, email sequences, and lead nurturing workflows.</p>
                </div>
                
                <div class="bg-white p-8 rounded-2xl text-center scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all" style="transition-delay: 0.3s;">
                    <div class="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-users text-3xl text-warm-orange"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-navy">Hiring a team costs ₹2L+/month</h3>
                    <p class="text-gray-600">Full marketing teams are expensive and hard to manage for growing businesses.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Three Core Services Section -->
    <section id="services" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 scroll-reveal">
                <div class="inline-flex items-center space-x-2 bg-purple/10 px-4 py-2 rounded-full mb-6">
                    <i class="fas fa-rocket text-purple"></i>
                    <span class="text-sm font-semibold text-purple">Complete Marketing Solutions</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
                    Three Ways We <span class="gradient-text">Power Your Marketing</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    From content creation to campaign management - everything your business needs to grow.
                </p>
            </div>
            
            <div class="grid lg:grid-cols-3 gap-8">
                <!-- Service 1: AI UGC Content Creation -->
                <div class="bg-gradient-card p-8 rounded-2xl scroll-reveal group shadow-lg border border-gray-200 hover:shadow-2xl transition-all">
                    <div class="w-20 h-20 bg-gradient-to-br from-electric-purple to-bright-cyan rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-video text-3xl text-white"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-center text-navy">AI UGC Content Creation</h3>
                    <p class="text-gray-600 text-center mb-6">
                        Get authentic-looking UGC videos that drive conversions without the traditional creator costs.
                    </p>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-purple mt-1"></i>
                            <span class="text-sm text-gray-700">Authentic-looking videos</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-purple mt-1"></i>
                            <span class="text-sm text-gray-700">₹4,999/month pricing</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-purple mt-1"></i>
                            <span class="text-sm text-gray-700">48-hour delivery</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-purple mt-1"></i>
                            <span class="text-sm text-gray-700">Multiple video formats</span>
                        </li>
                    </ul>
                    <button class="w-full py-3 rounded-full border-2 border-purple text-purple hover:bg-purple hover:text-white transition font-semibold">
                        Learn More
                    </button>
                </div>
                
                <!-- Service 2: Marketing Automation & Systems -->
                <div class="bg-gradient-card p-8 rounded-2xl scroll-reveal group shadow-lg border border-gray-200 hover:shadow-2xl transition-all" style="transition-delay: 0.1s;">
                    <div class="w-20 h-20 bg-gradient-to-br from-bright-cyan to-warm-orange rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-cogs text-3xl text-white"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-center text-navy">Marketing Automation & Systems</h3>
                    <p class="text-gray-600 text-center mb-6">
                        Set up automated funnels, email sequences, and CRM systems that work 24/7 for your business.
                    </p>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-cyan mt-1"></i>
                            <span class="text-sm text-gray-700">Email flows & sequences</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-cyan mt-1"></i>
                            <span class="text-sm text-gray-700">CRM setup & management</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-cyan mt-1"></i>
                            <span class="text-sm text-gray-700">Lead nurturing on autopilot</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-cyan mt-1"></i>
                            <span class="text-sm text-gray-700">Sales funnel optimization</span>
                        </li>
                    </ul>
                    <button class="w-full py-3 rounded-full border-2 border-cyan text-cyan hover:bg-cyan hover:text-white transition font-semibold">
                        Learn More
                    </button>
                </div>
                
                <!-- Service 3: Campaign Management -->
                <div class="bg-gradient-card p-8 rounded-2xl scroll-reveal group shadow-lg border border-gray-200 hover:shadow-2xl transition-all" style="transition-delay: 0.2s;">
                    <div class="w-20 h-20 bg-gradient-to-br from-warm-orange to-electric-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-chart-line text-3xl text-white"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-center text-navy">Campaign Management</h3>
                    <p class="text-gray-600 text-center mb-6">
                        Full-service ad management across all major platforms with data-driven optimization.
                    </p>
                    <ul class="space-y-3 mb-8">
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-coral mt-1"></i>
                            <span class="text-sm text-gray-700">Ad strategy & planning</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-coral mt-1"></i>
                            <span class="text-sm text-gray-700">Creative testing & optimization</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-coral mt-1"></i>
                            <span class="text-sm text-gray-700">ROI tracking & reporting</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-coral mt-1"></i>
                            <span class="text-sm text-gray-700">Multi-platform management</span>
                        </li>
                    </ul>
                    <button class="w-full py-3 rounded-full border-2 border-coral text-coral hover:bg-coral hover:text-white transition font-semibold">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Sample Work Grid -->
    <section id="work" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 scroll-reveal">
                <h2 class="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
                    Work That <span class="gradient-text">Drives Results</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    See examples from all three service areas - content, automation, and campaigns.
                </p>
                
                <!-- Filter Tabs -->
                <div class="flex flex-wrap justify-center gap-4 mb-12" x-data="{ activeTab: 'all' }">
                    <button @click="activeTab = 'all'" :class="activeTab === 'all' ? 'bg-purple text-white' : 'bg-white text-gray-600 hover:text-purple border border-gray-300'" class="px-6 py-3 rounded-full font-semibold transition">
                        All Work
                    </button>
                    <button @click="activeTab = 'ugc'" :class="activeTab === 'ugc' ? 'bg-purple text-white' : 'bg-white text-gray-600 hover:text-purple border border-gray-300'" class="px-6 py-3 rounded-full font-semibold transition">
                        UGC Content
                    </button>
                    <button @click="activeTab = 'automation'" :class="activeTab === 'automation' ? 'bg-cyan text-white' : 'bg-white text-gray-600 hover:text-cyan border border-gray-300'" class="px-6 py-3 rounded-full font-semibold transition">
                        Automation
                    </button>
                    <button @click="activeTab = 'campaigns'" :class="activeTab === 'campaigns' ? 'bg-coral text-white' : 'bg-white text-gray-600 hover:text-coral border border-gray-300'" class="px-6 py-3 rounded-full font-semibold transition">
                        Campaigns
                    </button>
                </div>
            </div>
            
            <div x-data="{ activeTab: 'all' }" class="min-h-[400px]">
                <!-- UGC Content Grid -->
                <div x-show="activeTab === 'all' || activeTab === 'ugc'" class="grid md:grid-cols-3 gap-6">
                    <!-- Video Card 1 -->
                    <div class="video-card scroll-reveal">
                        <div class="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                            <div class="flex items-center justify-center h-full">
                                <i class="fas fa-play text-6xl text-white/50"></i>
                            </div>
                        </div>
                        <div class="video-overlay">
                            <div class="text-white">
                                <div class="font-bold text-lg">D2C Skincare Brand</div>
                                <div class="text-sm opacity-80">+340% engagement rate</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="video-card scroll-reveal" style="transition-delay: 0.1s;">
                        <div class="aspect-video bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl">
                            <div class="flex items-center justify-center h-full">
                                <i class="fas fa-play text-6xl text-white/50"></i>
                            </div>
                        </div>
                        <div class="video-overlay">
                            <div class="text-white">
                                <div class="font-bold text-lg">EdTech Platform</div>
                                <div class="text-sm opacity-80">50K+ views in 48 hours</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="video-card scroll-reveal" style="transition-delay: 0.2s;">
                        <div class="aspect-video bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl">
                            <div class="flex items-center justify-center h-full">
                                <i class="fas fa-play text-6xl text-white/50"></i>
                            </div>
                        </div>
                        <div class="video-overlay">
                            <div class="text-white">
                                <div class="font-bold text-lg">E-commerce Store</div>
                                <div class="text-sm opacity-80">₹2.4L revenue generated</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Automation Systems Grid -->
                <div x-show="activeTab === 'all' || activeTab === 'automation'" class="grid md:grid-cols-2 gap-8 mt-8">
                    <div class="bg-white p-6 rounded-xl scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                        <div class="flex items-center space-x-4 mb-4">
                            <div class="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center">
                                <i class="fas fa-envelope text-cyan"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-navy">Email Automation System</h4>
                                <p class="text-sm text-gray-500">SaaS Company</p>
                            </div>
                        </div>
                        <p class="text-gray-600 mb-4">Complete 15-email onboarding sequence with 85% open rates</p>
                        <div class="flex space-x-4 text-sm">
                            <div class="text-cyan font-bold">+85%</div>
                            <div class="text-gray-500">Open Rate</div>
                        </div>
                    </div>
                    
                    <div class="glass-card p-6 rounded-xl scroll-reveal">
                        <div class="flex items-center space-x-4 mb-4">
                            <div class="w-12 h-12 bg-purple/20 rounded-lg flex items-center justify-center">
                                <i class="fas fa-funnel-dollar text-purple"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-navy">Sales Funnel Setup</h4>
                                <p class="text-sm text-gray-500">D2C Brand</p>
                            </div>
                        </div>
                        <p class="text-gray-600 mb-4">Automated lead qualification and nurturing system</p>
                        <div class="flex space-x-4 text-sm">
                            <div class="text-purple font-bold">+320%</div>
                            <div class="text-gray-500">Conversions</div>
                        </div>
                    </div>
                </div>
                
                <!-- Campaigns Grid -->
                <div x-show="activeTab === 'all' || activeTab === 'campaigns'" class="grid md:grid-cols-3 gap-6 mt-8">
                    <div class="bg-white p-6 rounded-xl text-center scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                        <div class="w-16 h-16 bg-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-chart-bar text-coral text-2xl"></i>
                        </div>
                        <h4 class="font-bold mb-2 text-navy">Meta Ads Campaign</h4>
                        <p class="text-sm text-gray-500 mb-4">Fashion Brand</p>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-500">ROAS:</span>
                                <span class="font-bold text-coral">4.2x</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-500">Spend:</span>
                                <span class="font-bold text-navy">₹2.5L</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="glass-card p-6 rounded-xl text-center scroll-reveal">
                        <div class="w-16 h-16 bg-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-search text-cyan text-2xl"></i>
                        </div>
                        <h4 class="font-bold mb-2 text-navy">Google Ads Campaign</h4>
                        <p class="text-sm text-gray-500 mb-4">EdTech Platform</p>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-500">CPC:</span>
                                <span class="font-bold text-cyan">₹12</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-500">Leads:</span>
                                <span class="font-bold text-navy">2,500+</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="glass-card p-6 rounded-xl text-center scroll-reveal">
                        <div class="w-16 h-16 bg-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-linkedin text-purple text-2xl"></i>
                        </div>
                        <h4 class="font-bold mb-2 text-navy">LinkedIn Campaign</h4>
                        <p class="text-sm text-gray-500 mb-4">B2B SaaS</p>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-500">CTR:</span>
                                <span class="font-bold text-purple">3.8%</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-500">Demos:</span>
                                <span class="font-bold text-navy">150+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-12">
                <button class="gradient-button px-8 py-4 rounded-full text-white font-bold">
                    View Full Portfolio
                </button>
            </div>
        </div>
    </section>

    <!-- How It Works (3-Step Process) -->
    <section id="process" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 scroll-reveal">
                <h2 class="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
                    From Brief to Video in <span class="gradient-text">3 Simple Steps</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    No complicated processes. No endless revisions. Just high-quality content, fast.
                </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-12 relative">
                <!-- Connecting Line -->
                <div class="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-purple via-cyan to-coral opacity-30"></div>
                
                <!-- Step 1 -->
                <div class="text-center scroll-reveal relative">
                    <div class="w-24 h-24 bg-gradient-cta rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                        <span class="text-4xl font-black text-white">1</span>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-navy">Share Your Product</h3>
                    <p class="text-gray-600 leading-relaxed">
                        Tell us about your product, target audience, and campaign goals. Send product images or videos.
                    </p>
                </div>
                
                <!-- Step 2 -->
                <div class="text-center scroll-reveal relative" style="transition-delay: 0.1s;">
                    <div class="w-24 h-24 bg-gradient-cta rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                        <span class="text-4xl font-black text-white">2</span>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-navy">We Create AI Magic</h3>
                    <p class="text-gray-600 leading-relaxed">
                        Our AI creates authentic UGC videos while our team ensures brand alignment and quality.
                    </p>
                </div>
                
                <!-- Step 3 -->
                <div class="text-center scroll-reveal relative" style="transition-delay: 0.2s;">
                    <div class="w-24 h-24 bg-gradient-cta rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                        <span class="text-4xl font-black text-white">3</span>
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-navy">Get Ready-to-Post Videos</h3>
                    <p class="text-gray-600 leading-relaxed">
                        Receive your finished videos in 48 hours. Download and start driving conversions immediately.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 scroll-reveal">
                <h2 class="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
                    Simple, Transparent <span class="gradient-text">Pricing</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    Choose the plan that fits your content needs. All plans include 48-hour delivery and unlimited revisions.
                </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <!-- Starter -->
                <div class="pricing-card bg-white p-8 rounded-2xl scroll-reveal shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all">
                    <div class="mb-6">
                        <h3 class="text-2xl font-bold mb-2 text-navy">Starter</h3>
                        <p class="text-gray-500 text-sm">Perfect for testing UGC</p>
                    </div>
                    <div class="mb-6">
                        <div class="text-5xl font-black mb-2 text-navy">₹2,999</div>
                        <div class="text-gray-500">/month</div>
                    </div>
                    <ul class="space-y-4 mb-8">
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-cyan mt-1"></i>
                            <span class="text-gray-700">3 UGC videos/month</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-cyan mt-1"></i>
                            <span class="text-gray-700">15-30 second videos</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-cyan mt-1"></i>
                            <span class="text-gray-700">48-hour delivery</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-cyan mt-1"></i>
                            <span class="text-gray-700">1 revision per video</span>
                        </li>
                    </ul>
                    <button class="w-full py-3 rounded-full border-2 border-purple text-purple hover:bg-purple hover:text-white transition font-semibold">
                        Get Started
                    </button>
                </div>
                
                <!-- Content Machine (Most Popular) -->
                <div class="pricing-card popular bg-white p-8 rounded-2xl scroll-reveal relative shadow-2xl border-2 border-purple hover:shadow-2xl transition-all" style="transition-delay: 0.1s;">
                    <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-cta px-6 py-2 rounded-full text-sm font-bold text-white">
                        MOST POPULAR
                    </div>
                    <div class="mb-6 mt-4">
                        <h3 class="text-2xl font-bold mb-2 text-navy">Content Machine</h3>
                        <p class="text-gray-500 text-sm">For serious brands</p>
                    </div>
                    <div class="mb-6">
                        <div class="text-5xl font-black gradient-text mb-2">₹4,999</div>
                        <div class="text-gray-500">/month</div>
                    </div>
                    <ul class="space-y-4 mb-8">
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-purple mt-1"></i>
                            <span class="text-gray-700">10 UGC videos/month</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-purple mt-1"></i>
                            <span class="text-gray-700">30-60 second videos</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-purple mt-1"></i>
                            <span class="text-gray-700">24-hour priority delivery</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-purple mt-1"></i>
                            <span class="text-gray-700">Unlimited revisions</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-purple mt-1"></i>
                            <span class="text-gray-700">Content strategy call</span>
                        </li>
                    </ul>
                    <button class="bg-coral hover:bg-orange-600 w-full py-3 rounded-full font-bold text-white shadow-lg transition">
                        Get Started
                    </button>
                </div>
                
                <!-- Full Agency -->
                <div class="pricing-card bg-white p-8 rounded-2xl scroll-reveal shadow-lg border-2 border-gray-200 hover:shadow-2xl transition-all" style="transition-delay: 0.2s;">
                    <div class="mb-6">
                        <h3 class="text-2xl font-bold mb-2 text-navy">Full Agency</h3>
                        <p class="text-gray-500 text-sm">Enterprise solution</p>
                    </div>
                    <div class="mb-6">
                        <div class="text-5xl font-black mb-2 text-navy">Custom</div>
                        <div class="text-gray-500">Let's talk</div>
                    </div>
                    <ul class="space-y-4 mb-8">
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-cyan mt-1"></i>
                            <span class="text-gray-700">Unlimited UGC videos</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-cyan mt-1"></i>
                            <span class="text-gray-700">Any length videos</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-cyan mt-1"></i>
                            <span class="text-gray-700">12-hour rush delivery</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-cyan mt-1"></i>
                            <span class="text-gray-700">Dedicated account manager</span>
                        </li>
                        <li class="flex items-start space-x-3">
                            <i class="fas fa-check text-cyan mt-1"></i>
                            <span class="text-gray-700">Full campaign management</span>
                        </li>
                    </ul>
                    <button class="w-full py-3 rounded-full border-2 border-purple text-purple hover:bg-purple hover:text-white transition font-semibold">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Results/Social Proof -->
    <section id="results" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 scroll-reveal">
                <h2 class="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
                    Real Results from <span class="gradient-text">Real Brands</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    See how our AI-powered UGC content drives measurable business outcomes.
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Testimonial 1 -->
                <div class="bg-gradient-card p-8 rounded-2xl scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                    <div class="flex items-center space-x-4 mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-electric-purple to-bright-cyan rounded-full"></div>
                        <div>
                            <div class="font-bold text-lg text-navy">Priya Sharma</div>
                            <div class="text-gray-500">Founder, GlowUp Skincare</div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <i class="fas fa-star text-coral"></i>
                        <i class="fas fa-star text-coral"></i>
                        <i class="fas fa-star text-coral"></i>
                        <i class="fas fa-star text-coral"></i>
                        <i class="fas fa-star text-coral"></i>
                    </div>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        "We went from spending ₹30,000/month on creators to ₹4,999 with Harsh's AI UGC. Our engagement rates actually INCREASED by 240%. Game-changer."
                    </p>
                    <div class="flex items-center space-x-6 text-sm">
                        <div>
                            <div class="font-bold text-purple">+240%</div>
                            <div class="text-gray-500">Engagement</div>
                        </div>
                        <div>
                            <div class="font-bold text-purple">₹25K</div>
                            <div class="text-gray-500">Saved/Month</div>
                        </div>
                    </div>
                </div>
                
                <!-- Testimonial 2 -->
                <div class="bg-gradient-card p-8 rounded-2xl scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all" style="transition-delay: 0.1s;">
                    <div class="flex items-center space-x-4 mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-warm-orange to-electric-purple rounded-full"></div>
                        <div>
                            <div class="font-bold text-lg text-navy">Rahul Verma</div>
                            <div class="text-gray-500">Marketing Head, EdTech Pro</div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <i class="fas fa-star text-coral"></i>
                        <i class="fas fa-star text-coral"></i>
                        <i class="fas fa-star text-coral"></i>
                        <i class="fas fa-star text-coral"></i>
                        <i class="fas fa-star text-coral"></i>
                    </div>
                    <p class="text-gray-600 leading-relaxed mb-4">
                        "The speed is insane. We launched a campaign on Monday, had 15 videos by Wednesday. Our conversion rate jumped from 2.1% to 5.8%. Cannot recommend enough."
                    </p>
                    <div class="flex items-center space-x-6 text-sm">
                        <div>
                            <div class="font-bold text-cyan">+176%</div>
                            <div class="text-gray-500">Conversions</div>
                        </div>
                        <div>
                            <div class="font-bold text-cyan">48hrs</div>
                            <div class="text-gray-500">Launch Time</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Logo Cloud -->
            <div class="mt-20 scroll-reveal">
                <p class="text-center text-gray-400 text-sm mb-8 uppercase tracking-wider">Trusted by leading brands</p>
                <div class="flex flex-wrap justify-center items-center gap-12 opacity-60">
                    <div class="text-2xl font-bold text-gray-400">BrandOne</div>
                    <div class="text-2xl font-bold text-gray-400">StartupCo</div>
                    <div class="text-2xl font-bold text-gray-400">TechFlow</div>
                    <div class="text-2xl font-bold text-gray-400">GrowthLab</div>
                    <div class="text-2xl font-bold text-gray-400">ProStore</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="py-20 bg-navy text-white relative overflow-hidden">
        <div class="absolute inset-0">
            <div class="absolute top-0 left-0 w-96 h-96 bg-purple/20 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 right-0 w-96 h-96 bg-cyan/20 rounded-full blur-3xl"></div>
        </div>
        
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 scroll-reveal">
            <div class="glass-card p-10 rounded-3xl">
                <div class="w-16 h-16 bg-gradient-cta rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-gift text-2xl text-white"></i>
                </div>
                
                <h2 class="text-3xl md:text-4xl font-black mb-4 font-display">
                    Get Your First 3 Videos <span class="gradient-text">Free</span>
                </h2>
                
                <p class="text-lg text-gray-400 mb-6 leading-relaxed">
                    See the quality for yourself. No credit card required. No strings attached. Just authentic UGC content delivered in 48 hours.
                </p>
                
                <form class="max-w-md mx-auto mb-6">
                    <div class="flex flex-col sm:flex-row gap-4">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            class="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan transition"
                        >
                        <button class="bg-coral hover:bg-orange-600 px-8 py-4 rounded-full text-white font-bold whitespace-nowrap shadow-lg transition-all hover:shadow-xl">
                            Claim Free Videos
                        </button>
                    </div>
                </form>
                
                <div class="flex items-center justify-center space-x-8 text-sm text-gray-400">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-check-circle text-cyan"></i>
                        <span>No credit card</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-check-circle text-cyan"></i>
                        <span>48hr delivery</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-check-circle text-cyan"></i>
                        <span>Cancel anytime</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 bg-bg-darker text-white border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <!-- Brand -->
                <div>
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="w-10 h-10 bg-gradient-cta rounded-lg flex items-center justify-center">
                            <i class="fas fa-play text-white"></i>
                        </div>
                        <span class="text-xl font-bold gradient-text font-display">Harsh Ranjan</span>
                    </div>
                    <p class="text-gray-400 text-sm">
                        AI-powered UGC content creation for modern brands. Fast, authentic, affordable.
                    </p>
                </div>
                
                <!-- Quick Links -->
                <div>
                    <h4 class="font-bold mb-4">Quick Links</h4>
                    <ul class="space-y-2 text-gray-400 text-sm">
                        <li><a href="#work" class="hover:text-white transition">Sample Work</a></li>
                        <li><a href="#services" class="hover:text-white transition">Services</a></li>
                        <li><a href="#pricing" class="hover:text-white transition">Pricing</a></li>
                        <li><a href="#results" class="hover:text-white transition">Results</a></li>
                    </ul>
                </div>
                
                <!-- Services -->
                <div>
                    <h4 class="font-bold mb-4">Services</h4>
                    <ul class="space-y-2 text-gray-400 text-sm">
                        <li>AI UGC Videos</li>
                        <li>Social Media Content</li>
                        <li>Campaign Management</li>
                        <li>Content Strategy</li>
                    </ul>
                </div>
                
                <!-- Contact -->
                <div>
                    <h4 class="font-bold mb-4">Get in Touch</h4>
                    <ul class="space-y-2 text-gray-400 text-sm">
                        <li>hello@harshranjan.com</li>
                        <li>+91 98765 43210</li>
                        <li class="flex space-x-4 pt-4">
                            <a href="#" class="text-gray-400 hover:text-purple transition"><i class="fab fa-linkedin text-xl"></i></a>
                            <a href="#" class="text-gray-400 hover:text-cyan transition"><i class="fab fa-instagram text-xl"></i></a>
                            <a href="#" class="text-gray-400 hover:text-purple transition"><i class="fab fa-twitter text-xl"></i></a>
                            <a href="#" class="text-gray-400 hover:text-coral transition"><i class="fab fa-youtube text-xl"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                <p>© 2025 Harsh Ranjan. All rights reserved. Powered by AI + Human Strategy.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script>
        // GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Scroll Reveal Animation
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => observer.observe(el));
        
        // Smooth Scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Navbar shadow on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.boxShadow = 'none';
            }
        });
    </script>

</body>
</html>`;

    const slug = "modern-agency-homepage";
    const title = "Harsh Ranjan - AI-Powered UGC Content That Converts";

    // Check if page already exists
    const [existing] = await connection.execute(
      "SELECT id FROM pages WHERE slug = ?",
      [slug]
    );

    if (existing.length > 0) {
      console.log("⚠️  Page already exists. Updating...");
      await connection.execute(
        `UPDATE pages SET 
          content = ?,
          title = ?,
          template = 'custom',
          status = 'published',
          meta_title = ?,
          meta_description = ?,
          meta_keywords = ?,
          updated_at = NOW()
        WHERE slug = ?`,
        [
          htmlContent,
          title,
          title,
          "AI-powered UGC content creation for modern brands. Get scroll-stopping videos in 48 hours without the ₹10k creator fees.",
          "AI UGC, user generated content, content creation, video marketing, social media content, AI video creator, UGC content, authentic videos, marketing agency",
          slug,
        ]
      );
      console.log("✅ Page updated successfully!");
    } else {
      await connection.execute(
        `INSERT INTO pages (
          title, slug, content, template, status,
          meta_title, meta_description, meta_keywords,
          is_homepage, show_in_menu, author_id
        ) VALUES (?, ?, ?, 'custom', 'published', ?, ?, ?, false, true, 1)`,
        [
          title,
          slug,
          htmlContent,
          title,
          "AI-powered UGC content creation for modern brands. Get scroll-stopping videos in 48 hours without the ₹10k creator fees.",
          "AI UGC, user generated content, content creation, video marketing, social media content, AI video creator, UGC content, authentic videos, marketing agency",
        ]
      );
      console.log("✅ Page created successfully!");
    }

    console.log("\n🎨 MODERN MARKETING AGENCY HOMEPAGE CREATED!");
    console.log("\n📊 Design Specifications:");
    console.log(
      "   ✓ Color Palette: Navy Blue (#0A1F44), Electric Purple (#7C3AED), Bright Cyan (#00E5FF)"
    );
    console.log("   ✓ Typography: Space Grotesk (headings), Inter (body)");
    console.log(
      "   ✓ Style: Modern Marketing Agency with Strategic AI Elements"
    );
    console.log(
      "   ✓ Features: Gradient buttons, glass cards, animated backgrounds"
    );
    console.log(
      "   ✓ Sections: Hero, Problem, Sample Work, Process, Pricing, Results, CTA"
    );
    console.log("\n🚀 Access your page at:");
    console.log("   http://localhost:5174/modern-agency-homepage");
    console.log("   http://localhost:5174/pages/modern-agency-homepage");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await connection.end();
  }
}

createModernAgencyHomepage();
