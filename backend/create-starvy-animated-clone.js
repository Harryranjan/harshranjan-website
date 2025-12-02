const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const starvyFullAnimatedPage = {
  title: "Harsh Ranjan - AI Developer Services (Animated)",
  slug: "starvy-animated-clone",
  template: "custom",
  content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Harsh Ranjan - Simplify Your Development with AI-Powered Precision</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="https://unpkg.com/lenis@latest/dist/lenis.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary': '#8B5CF6',
                        'primary-dark': '#7C3AED',
                        'secondary': '#06B6D4',
                        'dark': '#0F0B27',
                        'dark-lighter': '#1A1535',
                        'purple-900': '#0F0B27',
                        'purple-800': '#1A1535',
                        'purple-700': '#2D1B69',
                        'purple-600': '#4C1D95',
                    },
                    animation: {
                        'float': 'float 6s ease-in-out infinite',
                        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'gradient': 'gradient 8s ease infinite',
                        'glow': 'glow 2s ease-in-out infinite alternate',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-20px)' },
                        },
                        gradient: {
                            '0%, 100%': { backgroundPosition: '0% 50%' },
                            '50%': { backgroundPosition: '100% 50%' },
                        },
                        glow: {
                            '0%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
                            '100%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
                        }
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: #0F0B27;
            color: white;
            overflow-x: hidden;
        }
        
        /* Animated Background */
        .animated-bg {
            background: linear-gradient(-45deg, #0F0B27, #1A1535, #2D1B69, #4C1D95);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
            position: relative;
        }
        
        /* Floating Particles */
        .particles {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }
        
        .particle {
            position: absolute;
            background: rgba(139, 92, 246, 0.1);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }
        
        .particle:nth-child(1) { left: 20%; width: 80px; height: 80px; animation-delay: 0s; }
        .particle:nth-child(2) { left: 50%; width: 120px; height: 120px; animation-delay: -2s; }
        .particle:nth-child(3) { left: 80%; width: 60px; height: 60px; animation-delay: -4s; }
        .particle:nth-child(4) { left: 10%; width: 100px; height: 100px; animation-delay: -1s; }
        .particle:nth-child(5) { left: 70%; width: 90px; height: 90px; animation-delay: -3s; }
        
        /* Glassmorphism Cards */
        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .glass-card:hover {
            transform: translateY(-10px) scale(1.02);
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(139, 92, 246, 0.3);
            box-shadow: 0 25px 50px rgba(139, 92, 246, 0.2);
        }
        
        /* Animated Gradients */
        .gradient-text {
            background: linear-gradient(135deg, #8B5CF6, #06B6D4, #EC4899);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradient 6s ease infinite;
        }
        
        .gradient-border {
            background: linear-gradient(135deg, #8B5CF6, #06B6D4);
            background-size: 300% 300%;
            animation: gradient 6s ease infinite;
            padding: 2px;
            border-radius: 50px;
        }
        
        /* Custom Button */
        .btn-animated {
            background: linear-gradient(135deg, #8B5CF6, #7C3AED);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .btn-animated::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }
        
        .btn-animated:hover::before {
            left: 100%;
        }
        
        .btn-animated:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(139, 92, 246, 0.4);
        }
        
        /* Scroll Animations */
        .fade-in-up {
            opacity: 0;
            transform: translateY(60px);
            transition: all 0.8s ease;
        }
        
        .fade-in-up.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Feature Cards with Hover Effects */
        .feature-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
            overflow: hidden;
        }
        
        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1));
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .feature-card:hover::before {
            opacity: 1;
        }
        
        .feature-card:hover {
            transform: translateY(-15px) rotateY(5deg);
            border-color: rgba(139, 92, 246, 0.3);
            box-shadow: 0 30px 60px rgba(139, 92, 246, 0.2);
        }
        
        /* Testimonial Cards */
        .testimonial-card {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(6, 182, 212, 0.05));
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            position: relative;
            transition: all 0.4s ease;
        }
        
        .testimonial-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(139, 92, 246, 0.15);
        }
        
        /* Pricing Cards */
        .pricing-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            transition: all 0.4s ease;
            position: relative;
        }
        
        .pricing-card.featured {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1));
            border: 2px solid rgba(139, 92, 246, 0.3);
            transform: scale(1.05);
        }
        
        .pricing-card:hover {
            transform: translateY(-10px) scale(1.02);
            border-color: rgba(139, 92, 246, 0.4);
            box-shadow: 0 30px 60px rgba(139, 92, 246, 0.2);
        }
        
        /* Smooth Scrolling */
        html {
            scroll-behavior: smooth;
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: #1A1535;
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #8B5CF6, #06B6D4);
            border-radius: 10px;
        }
        
        /* Navbar Background Blur */
        .navbar-blur {
            backdrop-filter: blur(20px);
            background: rgba(15, 11, 39, 0.8);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Interactive Elements */
        .interactive-hover {
            transition: all 0.3s ease;
        }
        
        .interactive-hover:hover {
            color: #8B5CF6;
            transform: translateY(-2px);
        }
        
        /* FAQ Animation */
        .faq-item {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        
        .faq-item:hover {
            background: rgba(139, 92, 246, 0.05);
        }
        
        /* Logo Animation */
        .logo-animate {
            transition: all 0.3s ease;
        }
        
        .logo-animate:hover {
            transform: scale(1.1);
            filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.5));
        }
        
        /* Background Orbs */
        .orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.3;
            animation: float 8s ease-in-out infinite;
        }
        
        .orb-1 {
            background: linear-gradient(135deg, #8B5CF6, #EC4899);
            width: 300px;
            height: 300px;
            top: 10%;
            left: 10%;
            animation-delay: 0s;
        }
        
        .orb-2 {
            background: linear-gradient(135deg, #06B6D4, #8B5CF6);
            width: 200px;
            height: 200px;
            top: 60%;
            right: 10%;
            animation-delay: -4s;
        }
        
        .orb-3 {
            background: linear-gradient(135deg, #EC4899, #06B6D4);
            width: 150px;
            height: 150px;
            bottom: 20%;
            left: 50%;
            animation-delay: -2s;
        }
    </style>
</head>
<body class="animated-bg">
    <!-- Floating Particles -->
    <div class="particles fixed inset-0 pointer-events-none">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
    </div>
    
    <!-- Background Orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 navbar-blur" x-data="{ isOpen: false }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center logo-animate">
                        <div class="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mr-3 animate-glow">
                            <i class="fas fa-code text-white text-sm"></i>
                        </div>
                        <span class="text-xl font-bold gradient-text">Harsh</span>
                    </div>
                </div>
                
                <!-- Desktop Navigation -->
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <a href="#home" class="interactive-hover text-gray-300">Home</a>
                        <a href="#features" class="interactive-hover text-gray-300">Features</a>
                        <a href="#how-it-works" class="interactive-hover text-gray-300">How It Works</a>
                        <a href="#testimonials" class="interactive-hover text-gray-300">Testimonials</a>
                        <a href="#pricing" class="interactive-hover text-gray-300">Pricing</a>
                        <a href="#faq" class="interactive-hover text-gray-300">FAQ</a>
                    </div>
                </div>

                <!-- CTA Button -->
                <div class="hidden md:block">
                    <button class="btn-animated px-6 py-2 rounded-full text-white font-semibold">
                        Get Started Free
                    </button>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button @click="isOpen = !isOpen" class="interactive-hover text-gray-400">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- Mobile Navigation -->
            <div x-show="isOpen" x-transition class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
                    <a href="#home" class="block interactive-hover text-gray-300 px-3 py-2">Home</a>
                    <a href="#features" class="block interactive-hover text-gray-300 px-3 py-2">Features</a>
                    <a href="#how-it-works" class="block interactive-hover text-gray-300 px-3 py-2">How It Works</a>
                    <a href="#testimonials" class="block interactive-hover text-gray-300 px-3 py-2">Testimonials</a>
                    <a href="#pricing" class="block interactive-hover text-gray-300 px-3 py-2">Pricing</a>
                    <a href="#faq" class="block interactive-hover text-gray-300 px-3 py-2">FAQ</a>
                    <button class="btn-animated px-6 py-2 rounded-full text-white font-semibold mt-4 ml-3">
                        Get Started Free
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="pt-16 pb-20 relative min-h-screen flex items-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <!-- Navigation breadcrumb -->
            <div class="flex items-center space-x-2 text-sm text-gray-400 mb-8 pt-8 fade-in-up">
                <span>home</span>
                <i class="fas fa-chevron-right text-xs"></i>
                <span class="text-primary">Your AI Development Assistant</span>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Left Content -->
                <div class="fade-in-up">
                    <h1 class="text-5xl md:text-7xl font-black leading-tight mb-6">
                        <span class="gradient-text">Simplify Your Development</span><br>
                        <span class="text-white">with AI-Powered Precision</span>
                    </h1>
                    
                    <p class="text-xl text-gray-300 mb-8 leading-relaxed">
                        Effortlessly build modern applications, integrate AI solutions, and scale your digital presence with our intelligent development services
                    </p>

                    <button class="btn-animated px-8 py-4 rounded-full text-white font-semibold text-lg flex items-center">
                        Get Started Free
                        <i class="fas fa-arrow-right ml-2"></i>
                    </button>

                    <!-- Trusted by logos -->
                    <div class="mt-16 fade-in-up">
                        <p class="text-gray-500 text-sm mb-6 uppercase tracking-wider">Trusted by developers worldwide</p>
                        <div class="flex items-center space-x-8 opacity-60">
                            <div class="text-2xl font-bold text-gray-600 interactive-hover">React</div>
                            <div class="text-2xl font-bold text-gray-600 interactive-hover">Node.js</div>
                            <div class="text-2xl font-bold text-gray-600 interactive-hover">Python</div>
                            <div class="text-2xl font-bold text-gray-600 interactive-hover">AWS</div>
                            <div class="text-2xl font-bold text-gray-600 interactive-hover">AI/ML</div>
                        </div>
                    </div>
                </div>

                <!-- Right Content - Animated Hero Image -->
                <div class="relative fade-in-up">
                    <div class="glass-card p-8 animate-float">
                        <div class="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 mb-4 relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-gradient"></div>
                            <div class="flex items-center space-x-3 mb-4 relative z-10">
                                <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <div class="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                                <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
                            </div>
                            <div class="space-y-3 relative z-10">
                                <div class="h-2 bg-primary/50 rounded w-3/4 animate-pulse"></div>
                                <div class="h-2 bg-gray-600 rounded w-1/2 animate-pulse"></div>
                                <div class="h-2 bg-gray-700 rounded w-2/3 animate-pulse"></div>
                                <div class="h-2 bg-primary/70 rounded w-1/4 animate-pulse"></div>
                            </div>
                        </div>
                        <div class="text-center">
                            <i class="fas fa-robot text-6xl gradient-text mb-4 animate-float"></i>
                            <p class="text-gray-400">AI-Powered Development Tools</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16 fade-in-up">
                <div class="gradient-border inline-block rounded-full px-4 py-2 mb-6">
                    <span class="text-primary text-sm font-medium uppercase tracking-wider bg-dark rounded-full px-4 py-2">Features</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                    Powerful Features to Simplify<br>
                    <span class="gradient-text">Your Development</span>
                </h2>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto">
                    Discover how our AI-driven tools can transform your productivity and streamline your development workflow
                </p>
            </div>

            <!-- Features Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="feature-card rounded-2xl p-8 fade-in-up">
                    <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r from-primary to-secondary animate-glow">
                        <i class="fas fa-code text-2xl text-white"></i>
                    </div>
                    <div class="mb-4">
                        <span class="text-primary text-sm font-semibold uppercase tracking-wider">Smart Development</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Automate Code Generation</h3>
                    <p class="text-gray-400 leading-relaxed mb-6">
                        Our AI solution reduces manual effort, minimizes errors, and ensures seamless coordination, allowing you to focus on what truly matters.
                    </p>
                    <div class="glass-card rounded-lg p-4 flex items-center justify-center">
                        <i class="fas fa-laptop-code text-3xl gradient-text animate-pulse"></i>
                    </div>
                </div>

                <!-- Feature 2 -->
                <div class="feature-card rounded-2xl p-8 fade-in-up" style="animation-delay: 0.1s">
                    <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r from-secondary to-primary animate-glow">
                        <i class="fas fa-brain text-2xl text-white"></i>
                    </div>
                    <div class="mb-4">
                        <span class="text-secondary text-sm font-semibold uppercase tracking-wider">AI Integration</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Get Smart AI Solutions</h3>
                    <p class="text-gray-400 leading-relaxed mb-6">
                        Our system ensures your applications with intelligent features that adapt to user behavior and provide personalized experiences.
                    </p>
                    <div class="glass-card rounded-lg p-4 flex items-center justify-center">
                        <i class="fas fa-robot text-3xl gradient-text animate-pulse"></i>
                    </div>
                </div>

                <!-- Feature 3 -->
                <div class="feature-card rounded-2xl p-8 fade-in-up" style="animation-delay: 0.2s">
                    <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 animate-glow">
                        <i class="fas fa-tasks text-2xl text-white"></i>
                    </div>
                    <div class="mb-4">
                        <span class="text-pink-400 text-sm font-semibold uppercase tracking-wider">Project Management</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Organize Your Projects Easily</h3>
                    <p class="text-gray-400 leading-relaxed mb-6">
                        Keep your projects in order with minimal effort. Our tools help you quickly organize and prioritize your workload.
                    </p>
                    <div class="glass-card rounded-lg p-4 flex items-center justify-center">
                        <i class="fas fa-project-diagram text-3xl gradient-text animate-pulse"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-20 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16 fade-in-up">
                <div class="gradient-border inline-block rounded-full px-4 py-2 mb-6">
                    <span class="text-primary text-sm font-medium uppercase tracking-wider bg-dark rounded-full px-4 py-2">How it Works</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                    Getting Started with<br>
                    <span class="gradient-text">Our AI Development Assistant</span>
                </h2>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto">
                    See how easy it is to streamline your development process and boost your productivity with just a few simple steps
                </p>
            </div>

            <!-- Steps -->
            <div class="grid md:grid-cols-3 gap-8">
                <!-- Step 1 -->
                <div class="text-center fade-in-up">
                    <div class="glass-card rounded-2xl p-6 mb-6 group">
                        <div class="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-8 mb-4 relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <i class="fas fa-user-plus text-4xl gradient-text animate-float relative z-10"></i>
                        </div>
                    </div>
                    <div class="w-20 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm animate-glow">
                        STEP 1
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Setup Your Project</h3>
                    <p class="text-gray-400 leading-relaxed">
                        Start by providing your project requirements, tech stack preferences, and specific goals you want to achieve.
                    </p>
                </div>

                <!-- Step 2 -->
                <div class="text-center fade-in-up" style="animation-delay: 0.1s">
                    <div class="glass-card rounded-2xl p-6 mb-6 group">
                        <div class="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-8 mb-4 relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-r from-secondary/20 to-pink-400/20 animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <i class="fas fa-sync-alt text-4xl gradient-text animate-float relative z-10"></i>
                        </div>
                    </div>
                    <div class="w-20 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-secondary to-primary text-white font-bold text-sm animate-glow">
                        STEP 2
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Integrate AI Solutions</h3>
                    <p class="text-gray-400 leading-relaxed">
                        Easily integrate AI-powered features to enhance functionality and create intelligent user experiences.
                    </p>
                </div>

                <!-- Step 3 -->
                <div class="text-center fade-in-up" style="animation-delay: 0.2s">
                    <div class="glass-card rounded-2xl p-6 mb-6 group">
                        <div class="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-8 mb-4 relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-primary/20 animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <i class="fas fa-rocket text-4xl gradient-text animate-float relative z-10"></i>
                        </div>
                    </div>
                    <div class="w-20 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm animate-glow">
                        STEP 3
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Launch & Scale</h3>
                    <p class="text-gray-400 leading-relaxed">
                        Deploy your application with confidence and scale it to meet growing demands with our robust infrastructure.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-20 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16 fade-in-up">
                <div class="gradient-border inline-block rounded-full px-4 py-2 mb-6">
                    <span class="text-primary text-sm font-medium uppercase tracking-wider bg-dark rounded-full px-4 py-2">Testimonials</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                    What Our <span class="gradient-text">Clients</span> are Saying
                </h2>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto">
                    Hear from satisfied clients who have transformed their development process with our AI-powered solutions
                </p>
            </div>

            <!-- Testimonials Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Testimonial 1 -->
                <div class="testimonial-card rounded-2xl p-8 fade-in-up">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mr-4 animate-glow">
                            <span class="text-white font-bold">JA</span>
                        </div>
                        <div>
                            <h4 class="text-white font-semibold">James Anderson</h4>
                            <p class="text-gray-400 text-sm">Software Developer at Code Masters Inc.</p>
                        </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed">
                        "The AI integration with our existing systems is seamless, and the development speed improvements are always spot-on. Highly recommend!"
                    </p>
                </div>

                <!-- Testimonial 2 -->
                <div class="testimonial-card rounded-2xl p-8 fade-in-up" style="animation-delay: 0.1s">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-gradient-to-r from-secondary to-pink-500 rounded-full flex items-center justify-center mr-4 animate-glow">
                            <span class="text-white font-bold">EJ</span>
                        </div>
                        <div>
                            <h4 class="text-white font-semibold">Emma Johnson</h4>
                            <p class="text-gray-400 text-sm">Project Manager at Tech Innovators</p>
                        </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed">
                        "The AI Development Assistant has revolutionized the way we manage projects. Applications are now seamlessly built without any effort on our part."
                    </p>
                </div>

                <!-- Testimonial 3 -->
                <div class="testimonial-card rounded-2xl p-8 fade-in-up" style="animation-delay: 0.2s">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-gradient-to-r from-pink-500 to-primary rounded-full flex items-center justify-center mr-4 animate-glow">
                            <span class="text-white font-bold">MS</span>
                        </div>
                        <div>
                            <h4 class="text-white font-semibold">Michael Smith</h4>
                            <p class="text-gray-400 text-sm">Sales Executive at Global Enterprises</p>
                        </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed">
                        "I love how the AI Development Assistant integrates with our workflow. It saves us so much time and prevents development bottlenecks."
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16 fade-in-up">
                <div class="gradient-border inline-block rounded-full px-4 py-2 mb-6">
                    <span class="text-primary text-sm font-medium uppercase tracking-wider bg-dark rounded-full px-4 py-2">Pricing</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                    Flexible Pricing Plans for <span class="gradient-text">Every Need</span>
                </h2>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                    Choose the plan that best fits your requirements and start optimizing your development process today!
                </p>
                
                <!-- Billing Toggle -->
                <div class="flex items-center justify-center space-x-4">
                    <span class="text-gray-400">Monthly</span>
                    <div class="relative">
                        <input type="checkbox" class="sr-only" id="billing-toggle">
                        <div class="w-12 h-6 bg-gradient-to-r from-primary to-secondary rounded-full cursor-pointer animate-glow"></div>
                        <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"></div>
                    </div>
                    <span class="text-white">Annually</span>
                    <span class="bg-gradient-to-r from-primary to-secondary text-white px-2 py-1 rounded-full text-sm font-semibold animate-glow">20% Off</span>
                </div>
            </div>

            <!-- Pricing Cards -->
            <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <!-- Basic Plan -->
                <div class="pricing-card rounded-2xl p-8 text-center fade-in-up">
                    <h3 class="text-2xl font-bold text-white mb-4">Basic</h3>
                    <p class="text-gray-400 mb-8">Perfect for individuals looking to streamline their development with essential features.</p>
                    
                    <div class="mb-8">
                        <div class="text-5xl font-black gradient-text mb-2">Free</div>
                    </div>

                    <button class="w-full border-2 border-gray-600 text-white py-3 rounded-full font-semibold interactive-hover">
                        Get Started
                    </button>
                </div>

                <!-- Pro Plan - Featured -->
                <div class="pricing-card featured rounded-2xl p-8 text-center relative fade-in-up" style="animation-delay: 0.1s">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-white text-sm font-semibold animate-glow">
                        Most Popular
                    </div>
                    
                    <h3 class="text-2xl font-bold text-white mb-4">Pro</h3>
                    <p class="text-gray-400 mb-8">Ideal for small teams needing advanced development tools and customization options.</p>
                    
                    <div class="mb-8">
                        <div class="text-5xl font-black gradient-text mb-2">$99.99<span class="text-xl text-gray-400">/month</span></div>
                    </div>

                    <button class="w-full btn-animated py-3 rounded-full text-white font-semibold">
                        Get Started
                    </button>
                </div>

                <!-- Enterprise Plan -->
                <div class="pricing-card rounded-2xl p-8 text-center fade-in-up" style="animation-delay: 0.2s">
                    <h3 class="text-2xl font-bold text-white mb-4">Enterprise</h3>
                    <p class="text-gray-400 mb-8">Tailored for large organizations requiring enterprise-grade features and integrations.</p>
                    
                    <div class="mb-8">
                        <div class="text-5xl font-black gradient-text mb-2">Custom</div>
                    </div>

                    <button class="w-full border-2 border-gray-600 text-white py-3 rounded-full font-semibold interactive-hover">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20 relative">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16 fade-in-up">
                <div class="gradient-border inline-block rounded-full px-4 py-2 mb-6">
                    <span class="text-primary text-sm font-medium uppercase tracking-wider bg-dark rounded-full px-4 py-2">FAQ</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                    Frequently Asked <span class="gradient-text">Questions</span>
                </h2>
                <p class="text-xl text-gray-400">
                    Find quick answers to common questions about our AI Development Assistant.
                </p>
            </div>

            <!-- FAQ Items -->
            <div class="space-y-6 fade-in-up" x-data="{ openFaq: 1 }">
                <!-- FAQ 1 -->
                <div class="faq-item pb-6">
                    <button @click="openFaq = openFaq === 1 ? null : 1" class="flex items-center justify-between w-full text-left interactive-hover">
                        <h3 class="text-xl font-semibold text-white">What is the AI Development Assistant?</h3>
                        <i class="fas fa-chevron-down text-primary transition-transform duration-300" :class="{ 'rotate-180': openFaq === 1 }"></i>
                    </button>
                    <div x-show="openFaq === 1" x-transition class="mt-4">
                        <p class="text-gray-400 leading-relaxed">
                            The AI Development Assistant is a comprehensive tool designed to streamline and automate your development process by integrating with popular development tools and intelligently managing your projects and workflows.
                        </p>
                    </div>
                </div>

                <!-- FAQ 2 -->
                <div class="faq-item pb-6">
                    <button @click="openFaq = openFaq === 2 ? null : 2" class="flex items-center justify-between w-full text-left interactive-hover">
                        <h3 class="text-xl font-semibold text-white">How does the AI Development Assistant work?</h3>
                        <i class="fas fa-chevron-down text-primary transition-transform duration-300" :class="{ 'rotate-180': openFaq === 2 }"></i>
                    </button>
                    <div x-show="openFaq === 2" x-transition class="mt-4">
                        <p class="text-gray-400 leading-relaxed">
                            It uses AI to analyze your project requirements, identify optimal solutions, and automatically generate code and configurations that work best for your specific use case.
                        </p>
                    </div>
                </div>

                <!-- FAQ 3 -->
                <div class="faq-item pb-6">
                    <button @click="openFaq = openFaq === 3 ? null : 3" class="flex items-center justify-between w-full text-left interactive-hover">
                        <h3 class="text-xl font-semibold text-white">Is the AI Development Assistant compatible with my tech stack?</h3>
                        <i class="fas fa-chevron-down text-primary transition-transform duration-300" :class="{ 'rotate-180': openFaq === 3 }"></i>
                    </button>
                    <div x-show="openFaq === 3" x-transition class="mt-4">
                        <p class="text-gray-400 leading-relaxed">
                            Yes, our AI Development Assistant seamlessly integrates with popular frameworks like React, Node.js, Python, and cloud platforms like AWS, ensuring your projects are always in sync.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 relative">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in-up">
            <div class="glass-card rounded-3xl p-12 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 animate-gradient"></div>
                
                <div class="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-8 animate-glow relative z-10">
                    <i class="fas fa-rocket text-3xl text-white"></i>
                </div>
                
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6 relative z-10">
                    Ready to Transform Your <span class="gradient-text">Development Process?</span>
                </h2>
                
                <p class="text-xl text-gray-400 mb-8 leading-relaxed relative z-10">
                    Join thousands of developers who have already streamlined their development workflow with our AI Assistant.
                </p>
                
                <button class="btn-animated px-8 py-4 rounded-full text-white font-semibold text-lg relative z-10">
                    Get Started Free
                </button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-gray-700 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <!-- Logo and Description -->
                <div class="mb-8 md:mb-0">
                    <div class="flex items-center mb-4 logo-animate">
                        <div class="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mr-3 animate-glow">
                            <i class="fas fa-code text-white text-sm"></i>
                        </div>
                        <span class="text-xl font-bold gradient-text">Harsh</span>
                    </div>
                    <p class="text-gray-400 max-w-sm">
                        A sleek and modern AI development service designed to help emerging businesses and startups create intelligent digital solutions.
                    </p>
                </div>

                <!-- Links -->
                <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <!-- Pages -->
                    <div>
                        <h4 class="text-white font-semibold mb-4">Pages</h4>
                        <ul class="space-y-2 text-gray-400 text-sm">
                            <li><a href="#features" class="interactive-hover">Features</a></li>
                            <li><a href="#how-it-works" class="interactive-hover">How It Works</a></li>
                            <li><a href="#testimonials" class="interactive-hover">Testimonials</a></li>
                            <li><a href="#pricing" class="interactive-hover">Pricing</a></li>
                            <li><a href="#faq" class="interactive-hover">FAQ</a></li>
                        </ul>
                    </div>

                    <!-- Social Media -->
                    <div>
                        <h4 class="text-white font-semibold mb-4">Social Media</h4>
                        <ul class="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" class="interactive-hover">LinkedIn</a></li>
                            <li><a href="#" class="interactive-hover">GitHub</a></li>
                            <li><a href="#" class="interactive-hover">Twitter</a></li>
                            <li><a href="#" class="interactive-hover">Discord</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="border-t border-gray-700 mt-12 pt-8 text-center">
                <p class="text-gray-500 text-sm">
                    ©Designed by <span class="gradient-text">Harsh Ranjan</span>. Powered by AI Precision.
                </p>
            </div>
        </div>
    </footer>

    <script>
        // Initialize GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Initialize Smooth Scrolling with Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Fade in animations on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        // Observe all fade-in-up elements
        document.querySelectorAll('.fade-in-up').forEach((el) => {
            observer.observe(el);
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    lenis.scrollTo(target);
                }
            });
        });

        // Add active class to navigation based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('nav a[href^="#"]');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-primary');
                link.classList.add('text-gray-300');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.remove('text-gray-300');
                    link.classList.add('text-primary');
                }
            });
        });

        // GSAP Animations for hero elements
        gsap.timeline()
            .from('.fade-in-up', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

        // Parallax effect for background orbs
        gsap.to('.orb-1', {
            y: -100,
            x: 100,
            rotation: 90,
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "none"
        });

        gsap.to('.orb-2', {
            y: 50,
            x: -80,
            rotation: -45,
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: "none"
        });

        gsap.to('.orb-3', {
            y: -30,
            x: 60,
            rotation: 180,
            duration: 25,
            repeat: -1,
            yoyo: true,
            ease: "none"
        });

        // Feature cards animation on scroll
        ScrollTrigger.batch('.feature-card', {
            onEnter: (elements) => {
                gsap.from(elements, {
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out"
                });
            }
        });

        // Testimonial cards animation
        ScrollTrigger.batch('.testimonial-card', {
            onEnter: (elements) => {
                gsap.from(elements, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                });
            }
        });

        // Pricing cards animation
        ScrollTrigger.batch('.pricing-card', {
            onEnter: (elements) => {
                gsap.from(elements, {
                    y: 80,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out"
                });
            }
        });

        // Mouse movement parallax effect
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            gsap.to('.orb-1', {
                x: mouseX * 50,
                y: mouseY * 30,
                duration: 2,
                ease: "power2.out"
            });

            gsap.to('.orb-2', {
                x: mouseX * -30,
                y: mouseY * -20,
                duration: 2,
                ease: "power2.out"
            });

            gsap.to('.orb-3', {
                x: mouseX * 40,
                y: mouseY * -40,
                duration: 2,
                ease: "power2.out"
            });
        });
    </script>
</body>
</html>`,
  meta_title:
    "Harsh Ranjan - Simplify Your Development with AI-Powered Precision | Animated Portfolio",
  meta_description:
    "Experience the fully animated AI Development Assistant with stunning visual effects, smooth animations, and cutting-edge design. Transform your development workflow today.",
  meta_keywords:
    "animated portfolio, AI development, GSAP animations, smooth scrolling, interactive design, modern web development, React developer, Node.js, Python",
};

async function createStarvyAnimatedClone() {
  let connection;
  try {
    console.log(
      "🌟 Creating FULLY ANIMATED Starvy clone with advanced animations..."
    );
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Database connected!");

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
      starvyFullAnimatedPage.title,
      starvyFullAnimatedPage.slug,
      starvyFullAnimatedPage.content,
      starvyFullAnimatedPage.template,
      starvyFullAnimatedPage.meta_title,
      starvyFullAnimatedPage.meta_description,
      starvyFullAnimatedPage.meta_keywords,
    ]);

    console.log("🎉 FULLY ANIMATED Starvy clone created successfully!");
    console.log("\n🚀 ADVANCED ANIMATION FEATURES:");
    console.log("✨ GSAP ScrollTrigger animations");
    console.log("✨ Lenis smooth scrolling");
    console.log("✨ Floating particle background");
    console.log("✨ Animated gradient backgrounds");
    console.log("✨ Glassmorphism with hover effects");
    console.log("✨ Mouse-following parallax orbs");
    console.log("✨ Staggered element animations");
    console.log("✨ 3D transform hover effects");
    console.log("✨ Gradient text animations");
    console.log("✨ Animated borders and buttons");
    console.log("✨ Pulse and glow effects");
    console.log("✨ Custom loading animations");
    console.log("✨ Interactive FAQ accordions");
    console.log("✨ Smooth section transitions");

    console.log("\n🎨 VISUAL ENHANCEMENTS:");
    console.log("🌈 Purple/blue gradient theme matching Starvy");
    console.log("💫 Floating background orbs with physics");
    console.log("🔮 Glassmorphism cards with blur effects");
    console.log("✨ Animated gradient text and borders");
    console.log("🎭 Hover animations on all interactive elements");
    console.log("🌊 Smooth scrolling with momentum");
    console.log("🎪 Parallax mouse-following effects");

    console.log("\n🔗 ACCESS YOUR ANIMATED STARVY CLONE:");
    console.log("Frontend: http://localhost:5173/pages/starvy-animated-clone");
    console.log("Backend:  http://localhost:3000/pages/starvy-animated-clone");
    console.log(
      "\n💡 This version includes ALL the animations from the original Starvy site!"
    );
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

createStarvyAnimatedClone();
