const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
};

const starvyClonePage = {
  title: 'Harsh Ranjan - AI Developer Services',
  slug: 'ai-developer-services',
  template: 'custom',
  content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Harsh Ranjan - Simplify Your Development with AI-Powered Precision</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary': '#10B981',
                        'dark': '#0F172A',
                        'gray-900': '#0F172A',
                        'gray-800': '#1E293B',
                        'gray-700': '#334155',
                        'gray-600': '#475569',
                        'gray-500': '#64748B',
                        'gray-400': '#94A3B8',
                        'gray-300': '#CBD5E1',
                        'gray-200': '#E2E8F0',
                        'gray-100': '#F1F5F9'
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0F172A;
            color: white;
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
        }
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        }
        
        .text-gradient {
            background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .feature-icon {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.2);
        }
        
        .step-number {
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            color: white;
            font-weight: 700;
        }
        
        .pricing-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
        }
        
        .pricing-card.featured {
            background: rgba(16, 185, 129, 0.05);
            border: 1px solid rgba(16, 185, 129, 0.2);
        }
        
        .faq-item {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
    </style>
</head>
<body class="gradient-bg">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 backdrop-blur-lg bg-gray-900/80 border-b border-gray-800" x-data="{ isOpen: false }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center">
                        <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                            <i class="fas fa-code text-white text-sm"></i>
                        </div>
                        <span class="text-xl font-bold text-white">Harsh</span>
                    </div>
                </div>
                
                <!-- Desktop Navigation -->
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <a href="#home" class="text-gray-300 hover:text-primary transition-colors">Home</a>
                        <a href="#features" class="text-gray-300 hover:text-primary transition-colors">Features</a>
                        <a href="#how-it-works" class="text-gray-300 hover:text-primary transition-colors">How It Works</a>
                        <a href="#testimonials" class="text-gray-300 hover:text-primary transition-colors">Testimonials</a>
                        <a href="#pricing" class="text-gray-300 hover:text-primary transition-colors">Pricing</a>
                        <a href="#faq" class="text-gray-300 hover:text-primary transition-colors">FAQ</a>
                    </div>
                </div>

                <!-- CTA Button -->
                <div class="hidden md:block">
                    <button class="btn-primary px-6 py-2 rounded-full text-white font-semibold">
                        Get Started Free
                    </button>
                </div>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button @click="isOpen = !isOpen" class="text-gray-400 hover:text-white">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- Mobile Navigation -->
            <div x-show="isOpen" x-transition class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
                    <a href="#home" class="block text-gray-300 hover:text-primary px-3 py-2">Home</a>
                    <a href="#features" class="block text-gray-300 hover:text-primary px-3 py-2">Features</a>
                    <a href="#how-it-works" class="block text-gray-300 hover:text-primary px-3 py-2">How It Works</a>
                    <a href="#testimonials" class="block text-gray-300 hover:text-primary px-3 py-2">Testimonials</a>
                    <a href="#pricing" class="block text-gray-300 hover:text-primary px-3 py-2">Pricing</a>
                    <a href="#faq" class="block text-gray-300 hover:text-primary px-3 py-2">FAQ</a>
                    <button class="btn-primary px-6 py-2 rounded-full text-white font-semibold mt-4 ml-3">
                        Get Started Free
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="pt-16 pb-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Navigation breadcrumb -->
            <div class="flex items-center space-x-2 text-sm text-gray-400 mb-8 pt-8">
                <span>home</span>
                <i class="fas fa-chevron-right text-xs"></i>
                <span class="text-primary">Your AI Development Assistant</span>
            </div>

            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Left Content -->
                <div>
                    <h1 class="text-5xl md:text-6xl font-black leading-tight mb-6">
                        <span class="text-gradient">Simplify Your Development</span><br>
                        <span class="text-white">with AI-Powered Precision</span>
                    </h1>
                    
                    <p class="text-xl text-gray-300 mb-8 leading-relaxed">
                        Effortlessly build modern applications, integrate AI solutions, and scale your digital presence with our intelligent development services
                    </p>

                    <button class="btn-primary px-8 py-4 rounded-full text-white font-semibold text-lg flex items-center">
                        Get Started Free
                        <i class="fas fa-arrow-right ml-2"></i>
                    </button>

                    <!-- Trusted by logos -->
                    <div class="mt-16">
                        <p class="text-gray-500 text-sm mb-6 uppercase tracking-wider">Trusted by developers worldwide</p>
                        <div class="flex items-center space-x-8 opacity-60">
                            <div class="text-2xl font-bold text-gray-600">React</div>
                            <div class="text-2xl font-bold text-gray-600">Node.js</div>
                            <div class="text-2xl font-bold text-gray-600">Python</div>
                            <div class="text-2xl font-bold text-gray-600">AWS</div>
                            <div class="text-2xl font-bold text-gray-600">AI/ML</div>
                        </div>
                    </div>
                </div>

                <!-- Right Content - Hero Image Placeholder -->
                <div class="relative">
                    <div class="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                        <div class="bg-gray-900 rounded-lg p-6 mb-4">
                            <div class="flex items-center space-x-3 mb-4">
                                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <div class="space-y-3">
                                <div class="h-2 bg-primary/30 rounded w-3/4"></div>
                                <div class="h-2 bg-gray-600 rounded w-1/2"></div>
                                <div class="h-2 bg-gray-700 rounded w-2/3"></div>
                                <div class="h-2 bg-primary/50 rounded w-1/4"></div>
                            </div>
                        </div>
                        <div class="text-center">
                            <i class="fas fa-robot text-6xl text-primary mb-4"></i>
                            <p class="text-gray-400">AI-Powered Development Tools</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <div class="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                    <span class="text-primary text-sm font-medium uppercase tracking-wider">Features</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                    Powerful Features to Simplify<br>
                    <span class="text-gradient">Your Development</span>
                </h2>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto">
                    Discover how our AI-driven tools can transform your productivity and streamline your development workflow
                </p>
            </div>

            <!-- Features Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Feature 1 -->
                <div class="card-hover bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                    <div class="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                        <i class="fas fa-code text-2xl text-primary"></i>
                    </div>
                    <div class="mb-4">
                        <span class="text-primary text-sm font-semibold uppercase tracking-wider">Smart Development</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Automate Code Generation</h3>
                    <p class="text-gray-400 leading-relaxed mb-6">
                        Our AI solution reduces manual effort, minimizes errors, and ensures seamless coordination, allowing you to focus on what truly matters.
                    </p>
                    <div class="bg-gray-900 rounded-lg p-4 flex items-center justify-center">
                        <i class="fas fa-laptop-code text-3xl text-primary"></i>
                    </div>
                </div>

                <!-- Feature 2 -->
                <div class="card-hover bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                    <div class="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                        <i class="fas fa-brain text-2xl text-primary"></i>
                    </div>
                    <div class="mb-4">
                        <span class="text-primary text-sm font-semibold uppercase tracking-wider">AI Integration</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Get Smart AI Solutions</h3>
                    <p class="text-gray-400 leading-relaxed mb-6">
                        Our system ensures your applications with intelligent features that adapt to user behavior and provide personalized experiences.
                    </p>
                    <div class="bg-gray-900 rounded-lg p-4 flex items-center justify-center">
                        <i class="fas fa-robot text-3xl text-primary"></i>
                    </div>
                </div>

                <!-- Feature 3 -->
                <div class="card-hover bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                    <div class="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                        <i class="fas fa-tasks text-2xl text-primary"></i>
                    </div>
                    <div class="mb-4">
                        <span class="text-primary text-sm font-semibold uppercase tracking-wider">Project Management</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Organize Your Projects Easily</h3>
                    <p class="text-gray-400 leading-relaxed mb-6">
                        Keep your projects in order with minimal effort. Our tools help you quickly organize and prioritize your workload.
                    </p>
                    <div class="bg-gray-900 rounded-lg p-4 flex items-center justify-center">
                        <i class="fas fa-project-diagram text-3xl text-primary"></i>
                    </div>
                </div>

                <!-- Feature 4 -->
                <div class="card-hover bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                    <div class="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                        <i class="fas fa-user-cog text-2xl text-primary"></i>
                    </div>
                    <div class="mb-4">
                        <span class="text-primary text-sm font-semibold uppercase tracking-wider">Personalized Experience</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Get Personalized Solutions</h3>
                    <p class="text-gray-400 leading-relaxed mb-6">
                        Receive customized development solutions that adapt to your specific requirements and business needs.
                    </p>
                    <div class="bg-gray-900 rounded-lg p-4 flex items-center justify-center">
                        <i class="fas fa-cogs text-3xl text-primary"></i>
                    </div>
                </div>

                <!-- Feature 5 -->
                <div class="card-hover bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                    <div class="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                        <i class="fas fa-plug text-2xl text-primary"></i>
                    </div>
                    <div class="mb-4">
                        <span class="text-primary text-sm font-semibold uppercase tracking-wider">Seamless Integration</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Integrate with Popular Tools</h3>
                    <p class="text-gray-400 leading-relaxed mb-6">
                        Seamlessly connect with your favorite development tools and platforms to keep everything in sync.
                    </p>
                    <div class="bg-gray-900 rounded-lg p-4 flex items-center justify-center">
                        <i class="fas fa-link text-3xl text-primary"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <div class="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                    <span class="text-primary text-sm font-medium uppercase tracking-wider">How it Works</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                    Getting Started with<br>
                    <span class="text-gradient">Our AI Development Assistant</span>
                </h2>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto">
                    See how easy it is to streamline your development process and boost your productivity with just a few simple steps
                </p>
            </div>

            <!-- Steps -->
            <div class="grid md:grid-cols-3 gap-8">
                <!-- Step 1 -->
                <div class="text-center">
                    <div class="bg-gray-800 rounded-2xl p-6 mb-6">
                        <div class="bg-gray-900 rounded-lg p-8 mb-4">
                            <i class="fas fa-user-plus text-4xl text-primary"></i>
                        </div>
                    </div>
                    <div class="step-number w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        STEP 1
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Setup Your Project</h3>
                    <p class="text-gray-400 leading-relaxed">
                        Start by providing your project requirements, tech stack preferences, and specific goals you want to achieve.
                    </p>
                </div>

                <!-- Step 2 -->
                <div class="text-center">
                    <div class="bg-gray-800 rounded-2xl p-6 mb-6">
                        <div class="bg-gray-900 rounded-lg p-8 mb-4">
                            <i class="fas fa-sync-alt text-4xl text-primary"></i>
                        </div>
                    </div>
                    <div class="step-number w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        STEP 2
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">Integrate AI Solutions</h3>
                    <p class="text-gray-400 leading-relaxed">
                        Easily integrate AI-powered features to enhance functionality and create intelligent user experiences.
                    </p>
                </div>

                <!-- Step 3 -->
                <div class="text-center">
                    <div class="bg-gray-800 rounded-2xl p-6 mb-6">
                        <div class="bg-gray-900 rounded-lg p-8 mb-4">
                            <i class="fas fa-rocket text-4xl text-primary"></i>
                        </div>
                    </div>
                    <div class="step-number w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
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
    <section id="testimonials" class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <div class="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                    <span class="text-primary text-sm font-medium uppercase tracking-wider">Testimonials</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                    What Our <span class="text-gradient">Clients</span> are Saying
                </h2>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto">
                    Hear from satisfied clients who have transformed their development process with our AI-powered solutions
                </p>
            </div>

            <!-- Testimonials Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Testimonial 1 -->
                <div class="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                            <span class="text-primary font-bold">JA</span>
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
                <div class="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                            <span class="text-primary font-bold">EJ</span>
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
                <div class="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                            <span class="text-primary font-bold">MS</span>
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

                <!-- Testimonial 4 -->
                <div class="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                            <span class="text-primary font-bold">DM</span>
                        </div>
                        <div>
                            <h4 class="text-white font-semibold">David Miller</h4>
                            <p class="text-gray-400 text-sm">Operations Manager at Efficiency Experts</p>
                        </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed">
                        "The AI Development Assistant is a highly reliable and efficient tool that has streamlined our development process, reduced errors, and saved us valuable time."
                    </p>
                </div>

                <!-- Testimonial 5 -->
                <div class="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                            <span class="text-primary font-bold">WS</span>
                        </div>
                        <div>
                            <h4 class="text-white font-semibold">William Smith</h4>
                            <p class="text-gray-400 text-sm">CEO at Business Solutions Group</p>
                        </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed">
                        "As a CEO, time is my most valuable resource. The AI Development Assistant helps me optimize our tech strategy and focus on what matters most."
                    </p>
                </div>

                <!-- Testimonial 6 -->
                <div class="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                            <span class="text-primary font-bold">JD</span>
                        </div>
                        <div>
                            <h4 class="text-white font-semibold">Jane Doe</h4>
                            <p class="text-gray-400 text-sm">Marketing Director at Creative Solutions</p>
                        </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed">
                        "The AI Development Assistant revolutionized our workflow. It's like having a personal technical consultant who works around the clock!"
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <div class="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                    <span class="text-primary text-sm font-medium uppercase tracking-wider">Pricing</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                    Flexible Pricing Plans for <span class="text-gradient">Every Need</span>
                </h2>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                    Choose the plan that best fits your requirements and start optimizing your development process today!
                </p>
                
                <!-- Billing Toggle -->
                <div class="flex items-center justify-center space-x-4">
                    <span class="text-gray-400">Monthly</span>
                    <div class="relative">
                        <input type="checkbox" class="sr-only" id="billing-toggle">
                        <div class="w-12 h-6 bg-gray-700 rounded-full cursor-pointer"></div>
                        <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"></div>
                    </div>
                    <span class="text-white">Annually</span>
                    <span class="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm font-semibold">20% Off</span>
                </div>
            </div>

            <!-- Pricing Cards -->
            <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <!-- Basic Plan -->
                <div class="pricing-card rounded-2xl p-8 text-center">
                    <h3 class="text-2xl font-bold text-white mb-4">Basic</h3>
                    <p class="text-gray-400 mb-8">Perfect for individuals looking to streamline their development with essential features.</p>
                    
                    <div class="mb-8">
                        <div class="text-5xl font-black text-white mb-2">Free</div>
                    </div>

                    <div class="space-y-4 mb-8">
                        <p class="text-gray-400 font-semibold mb-4">Features:</p>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Basic Code Generation</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Simple AI Integration</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Project Templates</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Email Support</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Basic Documentation</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">24/7 Community Support</span>
                        </div>
                    </div>

                    <button class="w-full border-2 border-gray-600 text-white py-3 rounded-full font-semibold hover:border-primary hover:text-primary transition-colors">
                        Get Started
                    </button>
                </div>

                <!-- Pro Plan - Featured -->
                <div class="pricing-card featured rounded-2xl p-8 text-center relative">
                    <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-white text-sm font-semibold">
                        Most Popular
                    </div>
                    
                    <h3 class="text-2xl font-bold text-white mb-4">Pro</h3>
                    <p class="text-gray-400 mb-8">Ideal for small teams needing advanced development tools and customization options.</p>
                    
                    <div class="mb-8">
                        <div class="text-5xl font-black text-white mb-2">$99.99<span class="text-xl text-gray-400">/month</span></div>
                    </div>

                    <div class="space-y-4 mb-8">
                        <p class="text-gray-400 font-semibold mb-4">Features:</p>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">All Basic Plan Features</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Advanced AI Integration</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Custom Integrations</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Priority Support</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Analytics and Insights</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Team Collaboration</span>
                        </div>
                    </div>

                    <button class="w-full btn-primary py-3 rounded-full text-white font-semibold">
                        Get Started
                    </button>
                </div>

                <!-- Enterprise Plan -->
                <div class="pricing-card rounded-2xl p-8 text-center">
                    <h3 class="text-2xl font-bold text-white mb-4">Enterprise</h3>
                    <p class="text-gray-400 mb-8">Tailored for large organizations requiring enterprise-grade features and integrations.</p>
                    
                    <div class="mb-8">
                        <div class="text-5xl font-black text-white mb-2">Custom</div>
                    </div>

                    <div class="space-y-4 mb-8">
                        <p class="text-gray-400 font-semibold mb-4">Features:</p>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">All Pro Plan Features</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Dedicated Account Manager</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Custom Integrations</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Advanced Security Features</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Team Collaboration Tools</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-primary mr-3"></i>
                            <span class="text-gray-300">Onboarding and Training</span>
                        </div>
                    </div>

                    <button class="w-full border-2 border-gray-600 text-white py-3 rounded-full font-semibold hover:border-primary hover:text-primary transition-colors">
                        Contact Sales
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <div class="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                    <span class="text-primary text-sm font-medium uppercase tracking-wider">FAQ</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                    Frequently Asked <span class="text-gradient">Questions</span>
                </h2>
                <p class="text-xl text-gray-400">
                    Find quick answers to common questions about our AI Development Assistant.
                </p>
            </div>

            <!-- FAQ Items -->
            <div class="space-y-6" x-data="{ openFaq: 1 }">
                <!-- FAQ 1 -->
                <div class="faq-item pb-6">
                    <button @click="openFaq = openFaq === 1 ? null : 1" class="flex items-center justify-between w-full text-left">
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
                    <button @click="openFaq = openFaq === 2 ? null : 2" class="flex items-center justify-between w-full text-left">
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
                    <button @click="openFaq = openFaq === 3 ? null : 3" class="flex items-center justify-between w-full text-left">
                        <h3 class="text-xl font-semibold text-white">Is the AI Development Assistant compatible with my tech stack?</h3>
                        <i class="fas fa-chevron-down text-primary transition-transform duration-300" :class="{ 'rotate-180': openFaq === 3 }"></i>
                    </button>
                    <div x-show="openFaq === 3" x-transition class="mt-4">
                        <p class="text-gray-400 leading-relaxed">
                            Yes, our AI Development Assistant seamlessly integrates with popular frameworks like React, Node.js, Python, and cloud platforms like AWS, ensuring your projects are always in sync.
                        </p>
                    </div>
                </div>

                <!-- FAQ 4 -->
                <div class="faq-item pb-6">
                    <button @click="openFaq = openFaq === 4 ? null : 4" class="flex items-center justify-between w-full text-left">
                        <h3 class="text-xl font-semibold text-white">Can the AI Development Assistant handle complex projects?</h3>
                        <i class="fas fa-chevron-down text-primary transition-transform duration-300" :class="{ 'rotate-180': openFaq === 4 }"></i>
                    </button>
                    <div x-show="openFaq === 4" x-transition class="mt-4">
                        <p class="text-gray-400 leading-relaxed">
                            Yes, it can handle projects of any complexity, from simple websites to enterprise applications with advanced AI features and integrations.
                        </p>
                    </div>
                </div>

                <!-- FAQ 5 -->
                <div class="faq-item pb-6">
                    <button @click="openFaq = openFaq === 5 ? null : 5" class="flex items-center justify-between w-full text-left">
                        <h3 class="text-xl font-semibold text-white">How secure is my data with the AI Development Assistant?</h3>
                        <i class="fas fa-chevron-down text-primary transition-transform duration-300" :class="{ 'rotate-180': openFaq === 5 }"></i>
                    </button>
                    <div x-show="openFaq === 5" x-transition class="mt-4">
                        <p class="text-gray-400 leading-relaxed">
                            We take your privacy and security seriously. Our AI Development Assistant uses advanced encryption and security protocols to ensure your data and code are protected at all times.
                        </p>
                    </div>
                </div>

                <!-- FAQ 6 -->
                <div class="faq-item pb-6">
                    <button @click="openFaq = openFaq === 6 ? null : 6" class="flex items-center justify-between w-full text-left">
                        <h3 class="text-xl font-semibold text-white">How do I get started with AI Development services?</h3>
                        <i class="fas fa-chevron-down text-primary transition-transform duration-300" :class="{ 'rotate-180': openFaq === 6 }"></i>
                    </button>
                    <div x-show="openFaq === 6" x-transition class="mt-4">
                        <p class="text-gray-400 leading-relaxed">
                            You can get started by signing up for our AI Development Assistant and connecting it with your existing development tools and repositories.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 relative">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="bg-gray-800/50 border border-gray-700 rounded-3xl p-12">
                <div class="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <i class="fas fa-rocket text-3xl text-primary"></i>
                </div>
                
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                    Ready to Transform Your <span class="text-gradient">Development Process?</span>
                </h2>
                
                <p class="text-xl text-gray-400 mb-8 leading-relaxed">
                    Join thousands of developers who have already streamlined their development workflow with our AI Assistant.
                </p>
                
                <button class="btn-primary px-8 py-4 rounded-full text-white font-semibold text-lg">
                    Get Started Free
                </button>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <!-- Logo and Description -->
                <div class="mb-8 md:mb-0">
                    <div class="flex items-center mb-4">
                        <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                            <i class="fas fa-code text-white text-sm"></i>
                        </div>
                        <span class="text-xl font-bold text-white">Harsh</span>
                    </div>
                    <p class="text-gray-400 max-w-sm">
                        A sleek and modern AI development service designed to help emerging businesses and startups create intelligent digital solutions.
                    </p>
                </div>

                <!-- Links -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <!-- Pages -->
                    <div>
                        <h4 class="text-white font-semibold mb-4">Pages</h4>
                        <ul class="space-y-2 text-gray-400 text-sm">
                            <li><a href="#features" class="hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#how-it-works" class="hover:text-primary transition-colors">How It Works</a></li>
                            <li><a href="#testimonials" class="hover:text-primary transition-colors">Testimonials</a></li>
                            <li><a href="#pricing" class="hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="#faq" class="hover:text-primary transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    <!-- Resources -->
                    <div>
                        <h4 class="text-white font-semibold mb-4">Resources</h4>
                        <ul class="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" class="hover:text-primary transition-colors">Changelog</a></li>
                            <li><a href="#" class="hover:text-primary transition-colors">Licenses</a></li>
                            <li><a href="#" class="hover:text-primary transition-colors">Style Guide</a></li>
                        </ul>
                    </div>

                    <!-- Social Media -->
                    <div>
                        <h4 class="text-white font-semibold mb-4">Social Media</h4>
                        <ul class="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" class="hover:text-primary transition-colors">LinkedIn</a></li>
                            <li><a href="#" class="hover:text-primary transition-colors">GitHub</a></li>
                            <li><a href="#" class="hover:text-primary transition-colors">Twitter</a></li>
                            <li><a href="#" class="hover:text-primary transition-colors">Discord</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="border-t border-gray-800 mt-12 pt-8 text-center">
                <p class="text-gray-500 text-sm">
                    ©Designed by Harsh Ranjan. Powered by AI Precision.
                </p>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
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
    </script>
</body>
</html>`,
  meta_title: 'Harsh Ranjan - Simplify Your Development with AI-Powered Precision | AI Development Services',
  meta_description: 'Effortlessly build modern applications, integrate AI solutions, and scale your digital presence with our intelligent development services. Get started free today.',
  meta_keywords: 'AI development, machine learning integration, web development, React developer, Node.js, Python, cloud solutions, AI assistant, intelligent applications'
};

async function createStarvyClone() {
  let connection;
  try {
    console.log('🚀 Creating Starvy-style AI Development Services page...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connected!');
    
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
      starvyClonePage.title,
      starvyClonePage.slug,
      starvyClonePage.content,
      starvyClonePage.template,
      starvyClonePage.meta_title,
      starvyClonePage.meta_description,
      starvyClonePage.meta_keywords
    ]);
    
    console.log('🎉 EXACT Starvy-style page created successfully!');
    console.log('\n🔥 STARVY CLONE FEATURES:');
    console.log('✅ EXACT same layout structure as Starvy');
    console.log('✅ Same navigation style and positioning');
    console.log('✅ Identical hero section with breadcrumb');
    console.log('✅ Same features grid layout (3 columns)');
    console.log('✅ Identical "How It Works" 3-step process');
    console.log('✅ Same testimonials grid with avatar initials');
    console.log('✅ Identical pricing cards with toggle');
    console.log('✅ Same FAQ accordion functionality');
    console.log('✅ Same CTA section design');
    console.log('✅ Identical footer structure');
    console.log('✅ Same color scheme and typography');
    console.log('✅ Same button styles and hover effects');
    
    console.log('\n🎯 CUSTOMIZED FOR YOU:');
    console.log('📝 Content: AI Development Services');
    console.log('🎨 Branding: "Harsh" with your personal touch');
    console.log('🔧 Services: Development, AI Integration, Cloud');
    console.log('💰 Pricing: Free/Pro/Enterprise tiers');
    
    console.log('\n🔗 ACCESS YOUR STARVY CLONE AT:');
    console.log('Frontend: http://localhost:5173/pages/ai-developer-services');
    console.log('Backend:  http://localhost:3000/pages/ai-developer-services');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

createStarvyClone();