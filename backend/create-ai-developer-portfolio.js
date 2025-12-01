const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
};

const aiDeveloperPage = {
  title: 'Harsh Ranjan - AI-Powered Developer',
  slug: 'ai-developer-portfolio',
  template: 'custom',
  content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Harsh Ranjan - AI-Powered Developer | Building Tomorrow's Digital Experiences</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'dark': '#0F0F0F',
                        'green': '#10B981',
                        'purple': '#8B5CF6',
                        'gray-dark': '#1F2937',
                        'gray-light': '#6B7280'
                    },
                    fontFamily: {
                        'sans': ['Inter', 'system-ui', 'sans-serif'],
                    },
                    animation: {
                        'float': 'float 6s ease-in-out infinite',
                        'glow': 'glow 2s ease-in-out infinite alternate',
                        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
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
            font-family: 'Inter', system-ui, sans-serif;
            background: #0F0F0F;
            color: #FFFFFF;
            overflow-x: hidden;
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
        }
        
        ::-webkit-scrollbar-track {
            background: #1F2937;
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #10B981, #8B5CF6);
            border-radius: 3px;
        }
        
        /* Gradient Background */
        .gradient-bg {
            background: linear-gradient(135deg, #0F0F0F 0%, #1F2937 50%, #0F0F0F 100%);
        }
        
        /* Animations */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
            0% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
            100% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.8), 0 0 60px rgba(139, 92, 246, 0.4); }
        }
        
        @keyframes typing {
            from { width: 0 }
            to { width: 100% }
        }
        
        @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: #10B981; }
        }
        
        /* Glassmorphism */
        .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Hover Effects */
        .hover-lift {
            transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
            transform: translateY(-5px);
        }
        
        /* Code Snippet Styling */
        .code-snippet {
            background: #1a1a1a;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #333;
        }
        
        .code-header {
            background: #2d2d2d;
            padding: 8px 16px;
            border-bottom: 1px solid #333;
            font-size: 12px;
            color: #888;
        }
        
        .code-content {
            padding: 16px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 14px;
            line-height: 1.5;
            overflow-x: auto;
        }
        
        /* Typing Effect */
        .typing-text {
            overflow: hidden;
            border-right: 3px solid #10B981;
            white-space: nowrap;
            margin: 0 auto;
            animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
        }
        
        /* Service Cards */
        .service-card {
            background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
            border: 1px solid rgba(16, 185, 129, 0.2);
            transition: all 0.3s ease;
        }
        
        .service-card:hover {
            border-color: #10B981;
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
        }
    </style>
</head>
<body class="gradient-bg">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 glass" x-data="{ isOpen: false }">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="text-2xl font-bold">
                    <span class="text-green">Harsh</span>
                    <span class="text-white">Ranjan</span>
                </div>
                
                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#home" class="text-gray-300 hover:text-green transition-colors">Home</a>
                    <a href="#about" class="text-gray-300 hover:text-green transition-colors">About</a>
                    <a href="#services" class="text-gray-300 hover:text-green transition-colors">Services</a>
                    <a href="#portfolio" class="text-gray-300 hover:text-green transition-colors">Portfolio</a>
                    <a href="#contact" class="text-gray-300 hover:text-green transition-colors">Contact</a>
                    <a href="#contact" class="bg-green text-dark px-6 py-2 rounded-full hover:bg-purple transition-all hover:scale-105">
                        Get Started
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <button @click="isOpen = !isOpen" class="md:hidden text-white">
                    <i class="fas fa-bars text-2xl"></i>
                </button>
            </div>

            <!-- Mobile Navigation -->
            <div x-show="isOpen" x-transition class="md:hidden mt-4 pb-4">
                <div class="flex flex-col space-y-4">
                    <a href="#home" class="text-gray-300 hover:text-green transition-colors">Home</a>
                    <a href="#about" class="text-gray-300 hover:text-green transition-colors">About</a>
                    <a href="#services" class="text-gray-300 hover:text-green transition-colors">Services</a>
                    <a href="#portfolio" class="text-gray-300 hover:text-green transition-colors">Portfolio</a>
                    <a href="#contact" class="text-gray-300 hover:text-green transition-colors">Contact</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="min-h-screen flex items-center justify-center pt-20">
        <div class="container mx-auto px-6 text-center">
            <!-- Status Badge -->
            <div class="inline-flex items-center glass rounded-full px-6 py-2 mb-8" data-aos="fade-down">
                <div class="w-2 h-2 bg-green rounded-full mr-3 animate-pulse"></div>
                <span class="text-sm">Available for new projects</span>
            </div>

            <!-- Main Headline -->
            <div data-aos="fade-up" data-aos-delay="200">
                <h1 class="text-5xl md:text-7xl font-black mb-6">
                    Building Tomorrow's
                    <br>
                    <span class="text-green">Digital Experiences</span>
                    <br>
                    <span class="text-3xl md:text-5xl text-purple font-light">with AI Precision</span>
                </h1>
            </div>
            
            <!-- Subtitle with Typing Effect -->
            <div class="mb-8" data-aos="fade-up" data-aos-delay="400">
                <p class="text-xl md:text-2xl text-gray-300 mb-4">
                    Full-Stack Developer | AI Enthusiast | Digital Innovator
                </p>
                <div class="typing-text text-green text-lg font-mono">
                    Transforming ideas into intelligent applications...
                </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-6 justify-center mb-16" data-aos="fade-up" data-aos-delay="600">
                <a href="#portfolio" class="bg-green text-dark px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple hover:text-white transition-all hover:scale-105 animate-glow">
                    View My Work
                </a>
                <a href="#contact" class="glass text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all hover:scale-105">
                    Let's Connect
                </a>
            </div>

            <!-- Tech Stack -->
            <div class="flex flex-wrap justify-center gap-4 text-sm text-gray-400" data-aos="fade-up" data-aos-delay="800">
                <span class="px-3 py-1 rounded-full bg-gray-dark">React.js</span>
                <span class="px-3 py-1 rounded-full bg-gray-dark">Node.js</span>
                <span class="px-3 py-1 rounded-full bg-gray-dark">Python</span>
                <span class="px-3 py-1 rounded-full bg-gray-dark">AI/ML</span>
                <span class="px-3 py-1 rounded-full bg-gray-dark">Next.js</span>
                <span class="px-3 py-1 rounded-full bg-gray-dark">PostgreSQL</span>
                <span class="px-3 py-1 rounded-full bg-gray-dark">AWS</span>
            </div>
        </div>

        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 w-20 h-20 bg-green/20 rounded-full animate-float opacity-50"></div>
        <div class="absolute top-40 right-10 w-16 h-16 bg-purple/20 rounded-full animate-float opacity-50" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-20 left-1/3 w-24 h-24 bg-green/10 rounded-full animate-float opacity-30" style="animation-delay: 4s;"></div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <!-- Content -->
                <div data-aos="fade-right">
                    <div class="inline-flex items-center glass rounded-full px-4 py-2 mb-6">
                        <span class="text-green text-sm font-medium">About Me</span>
                    </div>
                    
                    <h2 class="text-4xl md:text-5xl font-bold mb-6">
                        Passionate about creating
                        <span class="text-green">intelligent solutions</span>
                    </h2>
                    
                    <p class="text-gray-300 text-lg leading-relaxed mb-6">
                        I'm a full-stack developer with a passion for artificial intelligence and cutting-edge web technologies. 
                        With over 5+ years of experience, I specialize in building scalable applications that leverage AI 
                        to solve real-world problems.
                    </p>
                    
                    <div class="space-y-4 mb-8">
                        <div class="flex items-center">
                            <i class="fas fa-check text-green mr-3"></i>
                            <span>5+ years of development experience</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-green mr-3"></i>
                            <span>50+ successful projects delivered</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-green mr-3"></i>
                            <span>Expertise in AI/ML integration</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-check text-green mr-3"></i>
                            <span>100% client satisfaction rate</span>
                        </div>
                    </div>
                    
                    <a href="#contact" class="bg-green text-dark px-6 py-3 rounded-full hover:bg-purple hover:text-white transition-all">
                        Let's Work Together
                    </a>
                </div>

                <!-- Code Snippet -->
                <div class="code-snippet hover-lift" data-aos="fade-left">
                    <div class="code-header">
                        <span>harsh-ranjan.js</span>
                    </div>
                    <div class="code-content">
                        <div class="text-purple">const</div> <span class="text-green">harshRanjan</span> <span class="text-white">=</span> <span class="text-yellow-400">{</span><br>
                        &nbsp;&nbsp;<span class="text-blue-400">name</span><span class="text-white">:</span> <span class="text-orange-400">"Harsh Ranjan"</span><span class="text-white">,</span><br>
                        &nbsp;&nbsp;<span class="text-blue-400">role</span><span class="text-white">:</span> <span class="text-orange-400">"Full-Stack Developer"</span><span class="text-white">,</span><br>
                        &nbsp;&nbsp;<span class="text-blue-400">specialties</span><span class="text-white">:</span> <span class="text-white">[</span><br>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-orange-400">"AI/ML Integration"</span><span class="text-white">,</span><br>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-orange-400">"React/Next.js"</span><span class="text-white">,</span><br>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-orange-400">"Node.js/Python"</span><span class="text-white">,</span><br>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-orange-400">"Cloud Architecture"</span><br>
                        &nbsp;&nbsp;<span class="text-white">],</span><br>
                        &nbsp;&nbsp;<span class="text-blue-400">passion</span><span class="text-white">:</span> <span class="text-orange-400">"Building the future"</span><br>
                        <span class="text-yellow-400">}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20">
        <div class="container mx-auto px-6">
            <!-- Section Header -->
            <div class="text-center mb-16" data-aos="fade-up">
                <div class="inline-flex items-center glass rounded-full px-4 py-2 mb-6">
                    <span class="text-green text-sm font-medium">What I Offer</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-bold mb-6">
                    Services That Drive
                    <span class="text-green">Innovation</span>
                </h2>
                <p class="text-gray-300 text-lg max-w-3xl mx-auto">
                    Comprehensive digital solutions powered by cutting-edge technology and AI precision
                </p>
            </div>

            <!-- Services Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Service 1 -->
                <div class="service-card p-8 rounded-2xl hover-lift" data-aos="fade-up" data-aos-delay="100">
                    <div class="w-16 h-16 bg-green/20 rounded-2xl flex items-center justify-center text-2xl text-green mb-6">
                        <i class="fas fa-robot"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">AI Integration</h3>
                    <p class="text-gray-300 leading-relaxed mb-6">
                        Enhance your applications with machine learning, natural language processing, and intelligent automation.
                    </p>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li>• Machine Learning Models</li>
                        <li>• Chatbot Development</li>
                        <li>• Data Analysis & Insights</li>
                        <li>• Predictive Analytics</li>
                    </ul>
                </div>

                <!-- Service 2 -->
                <div class="service-card p-8 rounded-2xl hover-lift" data-aos="fade-up" data-aos-delay="200">
                    <div class="w-16 h-16 bg-purple/20 rounded-2xl flex items-center justify-center text-2xl text-purple mb-6">
                        <i class="fas fa-code"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Web Development</h3>
                    <p class="text-gray-300 leading-relaxed mb-6">
                        Modern, responsive web applications built with the latest technologies and best practices.
                    </p>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li>• React/Next.js Applications</li>
                        <li>• Progressive Web Apps</li>
                        <li>• E-commerce Solutions</li>
                        <li>• API Development</li>
                    </ul>
                </div>

                <!-- Service 3 -->
                <div class="service-card p-8 rounded-2xl hover-lift" data-aos="fade-up" data-aos-delay="300">
                    <div class="w-16 h-16 bg-green/20 rounded-2xl flex items-center justify-center text-2xl text-green mb-6">
                        <i class="fas fa-cloud"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Cloud Solutions</h3>
                    <p class="text-gray-300 leading-relaxed mb-6">
                        Scalable cloud architecture and deployment solutions for high-performance applications.
                    </p>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li>• AWS/Azure Infrastructure</li>
                        <li>• DevOps & CI/CD</li>
                        <li>• Database Optimization</li>
                        <li>• Performance Monitoring</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" class="py-20">
        <div class="container mx-auto px-6">
            <!-- Section Header -->
            <div class="text-center mb-16" data-aos="fade-up">
                <div class="inline-flex items-center glass rounded-full px-4 py-2 mb-6">
                    <span class="text-green text-sm font-medium">My Work</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-bold mb-6">
                    Featured
                    <span class="text-green">Projects</span>
                </h2>
                <p class="text-gray-300 text-lg max-w-3xl mx-auto">
                    A showcase of innovative solutions that demonstrate the power of AI-driven development
                </p>
            </div>

            <!-- Portfolio Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Project 1 -->
                <div class="glass p-6 rounded-2xl hover-lift group" data-aos="fade-up" data-aos-delay="100">
                    <div class="w-full h-48 bg-gradient-to-br from-green/20 to-purple/20 rounded-lg mb-6 flex items-center justify-center">
                        <i class="fas fa-brain text-4xl text-green"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">AI Chat Assistant</h3>
                    <p class="text-gray-300 text-sm mb-4">
                        Intelligent chatbot with natural language processing and context awareness
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-2 py-1 text-xs bg-green/20 text-green rounded">AI/ML</span>
                        <span class="px-2 py-1 text-xs bg-purple/20 text-purple rounded">React</span>
                        <span class="px-2 py-1 text-xs bg-gray-600 text-white rounded">Node.js</span>
                    </div>
                    <a href="#" class="text-green hover:text-purple transition-colors group-hover:underline">
                        View Project <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>

                <!-- Project 2 -->
                <div class="glass p-6 rounded-2xl hover-lift group" data-aos="fade-up" data-aos-delay="200">
                    <div class="w-full h-48 bg-gradient-to-br from-purple/20 to-green/20 rounded-lg mb-6 flex items-center justify-center">
                        <i class="fas fa-chart-line text-4xl text-purple"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Analytics Dashboard</h3>
                    <p class="text-gray-300 text-sm mb-4">
                        Real-time data visualization with predictive analytics and AI insights
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-2 py-1 text-xs bg-purple/20 text-purple rounded">Next.js</span>
                        <span class="px-2 py-1 text-xs bg-green/20 text-green rounded">Python</span>
                        <span class="px-2 py-1 text-xs bg-gray-600 text-white rounded">PostgreSQL</span>
                    </div>
                    <a href="#" class="text-green hover:text-purple transition-colors group-hover:underline">
                        View Project <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>

                <!-- Project 3 -->
                <div class="glass p-6 rounded-2xl hover-lift group" data-aos="fade-up" data-aos-delay="300">
                    <div class="w-full h-48 bg-gradient-to-br from-green/20 to-purple/20 rounded-lg mb-6 flex items-center justify-center">
                        <i class="fas fa-shopping-cart text-4xl text-green"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Smart E-Commerce</h3>
                    <p class="text-gray-300 text-sm mb-4">
                        AI-powered e-commerce platform with personalized recommendations
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="px-2 py-1 text-xs bg-green/20 text-green rounded">React</span>
                        <span class="px-2 py-1 text-xs bg-purple/20 text-purple rounded">Node.js</span>
                        <span class="px-2 py-1 text-xs bg-gray-600 text-white rounded">MongoDB</span>
                    </div>
                    <a href="#" class="text-green hover:text-purple transition-colors group-hover:underline">
                        View Project <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>

            <!-- View All Projects Button -->
            <div class="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
                <a href="#contact" class="inline-flex items-center glass px-8 py-3 rounded-full hover:bg-white/10 transition-all">
                    <span class="mr-2">View All Projects</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20">
        <div class="container mx-auto px-6">
            <!-- Section Header -->
            <div class="text-center mb-16" data-aos="fade-up">
                <div class="inline-flex items-center glass rounded-full px-4 py-2 mb-6">
                    <span class="text-green text-sm font-medium">Testimonials</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-bold mb-6">
                    What Clients
                    <span class="text-green">Say</span>
                </h2>
            </div>

            <!-- Testimonials Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Testimonial 1 -->
                <div class="glass p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="100">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-green/20 rounded-full flex items-center justify-center text-green font-bold mr-4">
                            SR
                        </div>
                        <div>
                            <h4 class="font-semibold">Sarah Rodriguez</h4>
                            <p class="text-sm text-gray-400">CEO, TechStart Inc.</p>
                        </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed">
                        "Harsh delivered an exceptional AI-powered solution that transformed our business operations. 
                        His expertise in both development and AI integration is outstanding."
                    </p>
                    <div class="flex text-yellow-400 mt-4">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>

                <!-- Testimonial 2 -->
                <div class="glass p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="200">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-purple/20 rounded-full flex items-center justify-center text-purple font-bold mr-4">
                            MJ
                        </div>
                        <div>
                            <h4 class="font-semibold">Michael Johnson</h4>
                            <p class="text-sm text-gray-400">CTO, InnovateLab</p>
                        </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed">
                        "Working with Harsh was a game-changer. He not only built our platform but also integrated 
                        cutting-edge AI features that gave us a competitive advantage."
                    </p>
                    <div class="flex text-yellow-400 mt-4">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>

                <!-- Testimonial 3 -->
                <div class="glass p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="300">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-green/20 rounded-full flex items-center justify-center text-green font-bold mr-4">
                            EW
                        </div>
                        <div>
                            <h4 class="font-semibold">Emily Wong</h4>
                            <p class="text-sm text-gray-400">Founder, DigitalEdge</p>
                        </div>
                    </div>
                    <p class="text-gray-300 leading-relaxed">
                        "Harsh's attention to detail and innovative approach to problem-solving impressed us. 
                        The AI solutions he built exceeded our expectations."
                    </p>
                    <div class="flex text-yellow-400 mt-4">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto">
                <!-- Section Header -->
                <div class="text-center mb-16" data-aos="fade-up">
                    <div class="inline-flex items-center glass rounded-full px-4 py-2 mb-6">
                        <span class="text-green text-sm font-medium">Let's Connect</span>
                    </div>
                    <h2 class="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Build
                        <span class="text-green">Something Amazing?</span>
                    </h2>
                    <p class="text-gray-300 text-lg">
                        Let's discuss your project and turn your ideas into intelligent digital solutions
                    </p>
                </div>

                <!-- Contact Form -->
                <div class="glass p-8 rounded-2xl" data-aos="fade-up" data-aos-delay="200">
                    <form class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">Name</label>
                            <input type="text" class="w-full bg-gray-dark border border-gray-600 rounded-lg px-4 py-3 focus:border-green focus:outline-none transition-colors" placeholder="Your name">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Email</label>
                            <input type="email" class="w-full bg-gray-dark border border-gray-600 rounded-lg px-4 py-3 focus:border-green focus:outline-none transition-colors" placeholder="your@email.com">
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium mb-2">Project Type</label>
                            <select class="w-full bg-gray-dark border border-gray-600 rounded-lg px-4 py-3 focus:border-green focus:outline-none transition-colors">
                                <option>AI Integration</option>
                                <option>Web Development</option>
                                <option>Cloud Solutions</option>
                                <option>Full-Stack Project</option>
                            </select>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium mb-2">Project Description</label>
                            <textarea rows="5" class="w-full bg-gray-dark border border-gray-600 rounded-lg px-4 py-3 focus:border-green focus:outline-none transition-colors" placeholder="Tell me about your project..."></textarea>
                        </div>
                        <div class="md:col-span-2">
                            <button type="submit" class="w-full bg-green text-dark py-4 rounded-lg font-semibold hover:bg-purple hover:text-white transition-all">
                                Send Message <i class="fas fa-paper-plane ml-2"></i>
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Contact Info -->
                <div class="grid md:grid-cols-3 gap-6 mt-12" data-aos="fade-up" data-aos-delay="400">
                    <div class="text-center glass p-6 rounded-xl">
                        <i class="fas fa-envelope text-3xl text-green mb-4"></i>
                        <h3 class="font-semibold mb-2">Email</h3>
                        <p class="text-gray-300">harsh@developer.com</p>
                    </div>
                    <div class="text-center glass p-6 rounded-xl">
                        <i class="fas fa-phone text-3xl text-green mb-4"></i>
                        <h3 class="font-semibold mb-2">Phone</h3>
                        <p class="text-gray-300">+1 (555) 123-4567</p>
                    </div>
                    <div class="text-center glass p-6 rounded-xl">
                        <i class="fas fa-map-marker-alt text-3xl text-green mb-4"></i>
                        <h3 class="font-semibold mb-2">Location</h3>
                        <p class="text-gray-300">Available Worldwide</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="glass py-12">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row items-center justify-between">
                <div class="mb-4 md:mb-0">
                    <div class="text-2xl font-bold mb-2">
                        <span class="text-green">Harsh</span>
                        <span class="text-white">Ranjan</span>
                    </div>
                    <p class="text-gray-400">Building the future with AI precision</p>
                </div>
                
                <div class="flex space-x-6">
                    <a href="#" class="text-gray-400 hover:text-green transition-colors">
                        <i class="fab fa-linkedin text-2xl"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-green transition-colors">
                        <i class="fab fa-github text-2xl"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-green transition-colors">
                        <i class="fab fa-twitter text-2xl"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-green transition-colors">
                        <i class="fas fa-envelope text-2xl"></i>
                    </a>
                </div>
            </div>
            
            <div class="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 Harsh Ranjan. All rights reserved. Built with AI precision.</p>
            </div>
        </div>
    </footer>

    <script>
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-cubic'
        });

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
                link.classList.remove('text-green');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('text-green');
                }
            });
        });
    </script>
</body>
</html>`,
  meta_title: 'Harsh Ranjan - AI-Powered Developer | Building Tomorrow\'s Digital Experiences with AI Precision',
  meta_description: 'Full-Stack Developer specializing in AI integration, modern web development, and cloud solutions. Transform your ideas into intelligent applications with cutting-edge technology.',
  meta_keywords: 'AI developer, full-stack developer, AI integration, machine learning, React developer, Node.js, Python, cloud solutions, web development, artificial intelligence'
};

async function createAIDeveloperPortfolio() {
  let connection;
  try {
    console.log('🚀 Creating AI-Powered Developer Portfolio...');
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
      aiDeveloperPage.title,
      aiDeveloperPage.slug,
      aiDeveloperPage.content,
      aiDeveloperPage.template,
      aiDeveloperPage.meta_title,
      aiDeveloperPage.meta_description,
      aiDeveloperPage.meta_keywords
    ]);
    
    console.log('🎉 AI-Powered Developer Portfolio Created Successfully!');
    console.log('\n🌟 STARVY-INSPIRED FEATURES:');
    console.log('✨ Dark theme with green accents (like Starvy)');
    console.log('🤖 AI-focused messaging and branding');
    console.log('💎 Clean, minimalist layout');
    console.log('🎯 Professional service offerings');
    console.log('📱 Fully responsive design');
    console.log('⚡ Smooth animations and interactions');
    console.log('🎨 Glassmorphism effects');
    console.log('📊 Portfolio showcase section');
    console.log('💬 Client testimonials');
    console.log('📝 Contact form integration');
    
    console.log('\n🎯 PERSONAL BRANDING THEME:');
    console.log('Brand: "AI-Powered Developer"');
    console.log('Colors: Dark (#0F0F0F) + Green (#10B981) + Purple (#8B5CF6)');
    console.log('Message: "Building Tomorrow\'s Digital Experiences with AI Precision"');
    
    console.log('\n🔗 ACCESS YOUR NEW PORTFOLIO AT:');
    console.log('Frontend: http://localhost:5173/pages/ai-developer-portfolio');
    console.log('Backend:  http://localhost:3000/pages/ai-developer-portfolio');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

createAIDeveloperPortfolio();