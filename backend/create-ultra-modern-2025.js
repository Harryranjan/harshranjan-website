const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
};

const ultraModernPage = {
  title: 'Ultra Modern Homepage 2025',
  slug: 'homepage-2025',
  template: 'custom_html',
  content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEXUS - Digital Experiences Beyond Reality</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/three@0.159.0/build/three.min.js"></script>
    <script src="https://unpkg.com/gsap@3.12.2/dist/gsap.min.js"></script>
    <script src="https://unpkg.com/lenis@1.0.29/bundled/lenis.min.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'inter': ['Inter', 'system-ui', 'sans-serif'],
                    },
                    animation: {
                        'float': 'float 6s ease-in-out infinite',
                        'glow': 'glow 2s ease-in-out infinite alternate',
                        'morph': 'morph 8s ease-in-out infinite',
                        'particle': 'particle 20s linear infinite',
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        
        :root {
            --primary: #6366f1;
            --secondary: #ec4899;
            --accent: #06b6d4;
            --dark: #0f0f0f;
            --light: #ffffff;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', system-ui, sans-serif;
            background: var(--dark);
            color: var(--light);
            overflow-x: hidden;
            cursor: none;
        }
        
        /* Custom Cursor */
        .cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        }
        
        .cursor-follower {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.15s ease;
        }
        
        /* Three.js Canvas */
        #bg-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.7;
        }
        
        /* Glassmorphism */
        .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
        }
        
        /* Neumorphism 2.0 */
        .neuro {
            background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
            box-shadow: 
                20px 20px 40px #080808,
                -20px -20px 40px #1c1c1c,
                inset 5px 5px 10px rgba(255, 255, 255, 0.01),
                inset -5px -5px 10px rgba(0, 0, 0, 0.5);
        }
        
        /* Gradient Animations */
        .gradient-mesh {
            background: linear-gradient(
                45deg,
                #6366f1,
                #8b5cf6,
                #ec4899,
                #06b6d4,
                #10b981
            );
            background-size: 400% 400%;
            animation: gradient-shift 15s ease infinite;
        }
        
        @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes glow {
            0% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
            100% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.8), 0 0 60px rgba(236, 72, 153, 0.4); }
        }
        
        @keyframes morph {
            0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        
        @keyframes particle {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        
        /* Fluid Typography */
        .fluid-text {
            font-size: clamp(2rem, 8vw, 8rem);
            font-weight: 900;
            line-height: 0.9;
            background: linear-gradient(
                135deg,
                #6366f1 0%,
                #8b5cf6 25%,
                #ec4899 50%,
                #f97316 75%,
                #06b6d4 100%
            );
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradient-shift 8s ease infinite;
        }
        
        /* Interactive Elements */
        .interactive-card {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform-style: preserve-3d;
        }
        
        .interactive-card:hover {
            transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
        }
        
        /* Scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
        }
        
        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            border-radius: 3px;
        }
        
        /* Particles */
        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }
        
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            border-radius: 50%;
            animation: particle var(--duration, 20s) linear infinite;
            animation-delay: var(--delay, 0s);
        }
        
        /* Magnetic Effect */
        .magnetic {
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        /* Reveal Animation */
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body>
    <!-- Custom Cursors -->
    <div class="cursor"></div>
    <div class="cursor-follower"></div>
    
    <!-- 3D Background -->
    <canvas id="bg-canvas"></canvas>
    
    <!-- Particles -->
    <div class="particles">
        <div class="particle" style="--duration: 15s; --delay: 0s; left: 10%;"></div>
        <div class="particle" style="--duration: 18s; --delay: 2s; left: 20%;"></div>
        <div class="particle" style="--duration: 22s; --delay: 4s; left: 30%;"></div>
        <div class="particle" style="--duration: 16s; --delay: 1s; left: 40%;"></div>
        <div class="particle" style="--duration: 20s; --delay: 3s; left: 50%;"></div>
        <div class="particle" style="--duration: 19s; --delay: 5s; left: 60%;"></div>
        <div class="particle" style="--duration: 17s; --delay: 2s; left: 70%;"></div>
        <div class="particle" style="--duration: 21s; --delay: 4s; left: 80%;"></div>
        <div class="particle" style="--duration: 23s; --delay: 1s; left: 90%;"></div>
    </div>

    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 glass">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    NEXUS
                </div>
                
                <!-- Navigation Links -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#" class="relative group text-white/80 hover:text-white transition-all duration-300 magnetic">
                        <span>Home</span>
                        <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
                    </a>
                    <a href="#" class="relative group text-white/80 hover:text-white transition-all duration-300 magnetic">
                        <span>Work</span>
                        <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
                    </a>
                    <a href="#" class="relative group text-white/80 hover:text-white transition-all duration-300 magnetic">
                        <span>Services</span>
                        <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
                    </a>
                    <a href="#" class="relative group text-white/80 hover:text-white transition-all duration-300 magnetic">
                        <span>About</span>
                        <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
                    </a>
                    <a href="#" class="relative group text-white/80 hover:text-white transition-all duration-300 magnetic">
                        <span>Contact</span>
                        <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 group-hover:w-full"></div>
                    </a>
                </div>

                <!-- CTA Button -->
                <button class="relative overflow-hidden gradient-mesh text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 magnetic glow">
                    <span class="relative z-10">Let's Create</span>
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div class="container mx-auto px-6 text-center relative z-10">
            <!-- Status Badge -->
            <div class="inline-flex items-center glass rounded-full px-6 py-3 mb-8 reveal">
                <div class="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span class="text-white/90 text-sm font-medium">Available for new projects</span>
            </div>

            <!-- Main Headline -->
            <div class="reveal">
                <h1 class="fluid-text mb-8 select-none">
                    DIGITAL
                    <br>
                    <span class="inline-block transform hover:scale-110 transition-transform duration-500">EXPERIENCES</span>
                    <br>
                    <span style="font-size: clamp(1.5rem, 6vw, 6rem);">BEYOND REALITY</span>
                </h1>
            </div>
            
            <!-- Subtitle -->
            <p class="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed reveal">
                We craft immersive digital experiences using cutting-edge technologies, 
                <br class="hidden md:block">
                AI-powered interactions, and award-winning design principles.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-6 justify-center mb-20 reveal">
                <button class="group relative overflow-hidden gradient-mesh text-white px-10 py-5 rounded-full text-lg font-semibold transition-all duration-500 hover:scale-110 magnetic">
                    <span class="relative z-10 flex items-center justify-center">
                        Explore Our Work
                        <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                    </span>
                </button>
                
                <button class="group glass text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-500 hover:scale-105 magnetic">
                    <span class="flex items-center justify-center">
                        Start a Project
                        <svg class="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </span>
                </button>
            </div>

            <!-- 3D Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto reveal">
                <div class="interactive-card neuro p-8 rounded-3xl text-center magnetic">
                    <div class="text-5xl font-black fluid-text mb-4">500+</div>
                    <div class="text-white/60 uppercase tracking-wider text-sm">Projects Delivered</div>
                </div>
                <div class="interactive-card neuro p-8 rounded-3xl text-center magnetic">
                    <div class="text-5xl font-black fluid-text mb-4">98%</div>
                    <div class="text-white/60 uppercase tracking-wider text-sm">Client Satisfaction</div>
                </div>
                <div class="interactive-card neuro p-8 rounded-3xl text-center magnetic">
                    <div class="text-5xl font-black fluid-text mb-4">24/7</div>
                    <div class="text-white/60 uppercase tracking-wider text-sm">Global Support</div>
                </div>
            </div>
        </div>

        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 w-32 h-32 gradient-mesh rounded-full opacity-20 animate-float" style="animation-delay: 0s;"></div>
        <div class="absolute top-40 right-10 w-24 h-24 gradient-mesh rounded-full opacity-30 animate-float animate-morph" style="animation-delay: 2s;"></div>
        <div class="absolute bottom-20 left-1/3 w-40 h-40 gradient-mesh rounded-full opacity-15 animate-float" style="animation-delay: 4s;"></div>
    </section>

    <!-- Services Section -->
    <section class="py-32 relative">
        <div class="container mx-auto px-6">
            <!-- Section Header -->
            <div class="text-center mb-20 reveal">
                <div class="inline-flex items-center glass rounded-full px-4 py-2 mb-8">
                    <span class="text-indigo-400 text-sm font-medium uppercase tracking-wider">Our Expertise</span>
                </div>
                <h2 class="text-6xl md:text-7xl font-black text-white mb-8">
                    What We
                    <span class="gradient-mesh bg-clip-text text-transparent">Create</span>
                </h2>
                <p class="text-xl text-white/60 max-w-3xl mx-auto">
                    From AI-powered web applications to immersive 3D experiences
                </p>
            </div>

            <!-- Services Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Service Card 1 -->
                <div class="interactive-card glass p-8 rounded-3xl group hover:bg-white/10 transition-all duration-500 magnetic reveal">
                    <div class="w-16 h-16 gradient-mesh rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        🚀
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4 group-hover:gradient-mesh group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        AI-Powered Web Apps
                    </h3>
                    <p class="text-white/70 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                        Next-generation applications powered by machine learning and artificial intelligence.
                    </p>
                    <div class="flex items-center text-indigo-400 group-hover:text-pink-400 transition-colors duration-300">
                        <span class="text-sm font-medium mr-2">Explore More</span>
                        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </div>
                </div>

                <!-- Service Card 2 -->
                <div class="interactive-card glass p-8 rounded-3xl group hover:bg-white/10 transition-all duration-500 magnetic reveal">
                    <div class="w-16 h-16 gradient-mesh rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        🎨
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4 group-hover:gradient-mesh group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        3D Immersive Design
                    </h3>
                    <p class="text-white/70 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                        Three-dimensional experiences with WebGL, physics simulations, and interactive storytelling.
                    </p>
                    <div class="flex items-center text-indigo-400 group-hover:text-pink-400 transition-colors duration-300">
                        <span class="text-sm font-medium mr-2">Explore More</span>
                        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </div>
                </div>

                <!-- Service Card 3 -->
                <div class="interactive-card glass p-8 rounded-3xl group hover:bg-white/10 transition-all duration-500 magnetic reveal">
                    <div class="w-16 h-16 gradient-mesh rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        ⚡
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4 group-hover:gradient-mesh group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        Performance Optimization
                    </h3>
                    <p class="text-white/70 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                        Lightning-fast applications optimized for Core Web Vitals and user experience.
                    </p>
                    <div class="flex items-center text-indigo-400 group-hover:text-pink-400 transition-colors duration-300">
                        <span class="text-sm font-medium mr-2">Explore More</span>
                        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-32 relative overflow-hidden">
        <!-- Dynamic Background -->
        <div class="absolute inset-0 gradient-mesh opacity-10"></div>
        
        <div class="container mx-auto px-6 text-center relative z-10">
            <!-- Floating Elements -->
            <div class="absolute -top-8 left-8 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
            <div class="absolute -top-4 right-12 w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
            <div class="absolute top-8 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style="animation-delay: 700ms;"></div>
            
            <!-- Main Content -->
            <div class="reveal">
                <div class="inline-flex items-center glass rounded-full px-6 py-2 mb-8">
                    <div class="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                    <span class="text-white/90 text-sm font-medium">Ready to innovate?</span>
                </div>

                <h2 class="text-7xl md:text-9xl font-black text-white mb-8 leading-none">
                    Let's Build
                    <br>
                    <span class="gradient-mesh bg-clip-text text-transparent animate-pulse">The Future</span>
                </h2>
                
                <p class="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
                    Ready to push the boundaries of what's possible? Let's create something 
                    extraordinary that sets new standards in digital innovation.
                </p>

                <!-- Enhanced CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                    <button class="group relative overflow-hidden bg-white text-black px-12 py-6 rounded-full text-xl font-bold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-white/25 magnetic">
                        <span class="relative z-10 flex items-center justify-center">
                            Start Your Project
                            <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                        </span>
                        <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                    </button>
                    
                    <button class="group glass text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-white/10 transition-all duration-500 hover:scale-105 magnetic">
                        <span class="flex items-center justify-center">
                            View Our Portfolio
                            <svg class="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </span>
                    </button>
                </div>

                <!-- Contact Info -->
                <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/60">
                    <div class="flex items-center space-x-2">
                        <span class="text-lg">📧</span>
                        <span>hello@nexus.studio</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-lg">📞</span>
                        <span>+1 (555) 123-4567</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-lg">💬</span>
                        <span>Free consultation available</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="glass py-20 relative">
        <div class="container mx-auto px-6">
            <div class="text-center reveal">
                <div class="text-4xl font-black gradient-mesh bg-clip-text text-transparent mb-6">
                    NEXUS
                </div>
                <p class="text-white/60 mb-8">
                    Crafting digital experiences beyond reality
                </p>
                <div class="text-white/40 text-sm">
                    &copy; 2025 NEXUS. Pushing boundaries since tomorrow.
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Enhanced Cursor
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX - 10 + 'px';
            cursor.style.top = mouseY - 10 + 'px';
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.left = followerX - 20 + 'px';
            follower.style.top = followerY - 20 + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Three.js Background
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 5;

        // Create floating geometry
        const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x6366f1, 
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const torus = new THREE.Mesh(geometry, material);
        scene.add(torus);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            torus.rotation.x += 0.01;
            torus.rotation.y += 0.005;
            renderer.render(scene, camera);
        }
        animate();

        // Smooth scrolling with Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // GSAP Scroll Animations
        gsap.registerPlugin(ScrollTrigger);

        // Reveal animations
        gsap.utils.toArray('.reveal').forEach((element) => {
            gsap.fromTo(element, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Magnetic effect
        document.querySelectorAll('.magnetic').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(element, {
                    duration: 0.3,
                    x: x * 0.3,
                    y: y * 0.3,
                    ease: "power2.out"
                });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    duration: 0.3,
                    x: 0,
                    y: 0,
                    ease: "power2.out"
                });
            });
        });

        // Responsive resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
</body>
</html>`,
  meta_title: 'NEXUS - Digital Experiences Beyond Reality | Ultra Modern Agency 2025',
  meta_description: 'Experience the future of digital design with AI-powered applications, 3D immersive experiences, and cutting-edge web technologies. Award-winning digital agency.',
  meta_keywords: 'ultra modern web design, AI digital agency, 3D web experiences, WebGL development, 2025 design trends, immersive digital experiences'
};

async function createUltraModernPage() {
  let connection;
  try {
    console.log('🚀 Creating ultra-modern 2025 homepage...');
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
      ultraModernPage.title,
      ultraModernPage.slug,
      ultraModernPage.content,
      ultraModernPage.template,
      ultraModernPage.meta_title,
      ultraModernPage.meta_description,
      ultraModernPage.meta_keywords
    ]);
    
    console.log('🎉 Ultra-modern homepage created!');
    console.log('\n🌟 FEATURES INCLUDED:');
    console.log('✨ Custom cursor with magnetic effects');
    console.log('🎨 Three.js 3D background animations');
    console.log('🌈 Gradient mesh animations');
    console.log('💎 Glassmorphism & Neumorphism 2.0');
    console.log('⚡ GSAP scroll animations');
    console.log('📱 Fluid responsive typography');
    console.log('🎯 Interactive hover states');
    console.log('🌊 Smooth scrolling with Lenis');
    console.log('✨ Particle system animations');
    console.log('\n🔗 Access at: /pages/homepage-2025');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

createUltraModernPage();