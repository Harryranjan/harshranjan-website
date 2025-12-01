import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Floating Cursor */}
      <div 
        className="fixed w-6 h-6 border-2 border-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: `${mousePosition.x - 12}px`,
          top: `${mousePosition.y - 12}px`,
          transform: 'scale(1)',
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/10 backdrop-blur-md border-b border-white/20' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              NEXUS
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Home', href: '/' },
                { name: 'Work', href: '/work' },
                { name: 'Services', href: '/services' },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative text-white/90 hover:text-white transition-all duration-300 group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            <button className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Shapes */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Hero Badge */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
            <span className="text-white/90 text-sm">Available for new projects</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-none tracking-tight">
            CRAFTING
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-pulse">
              DIGITAL
            </span>
            <span className="block text-5xl md:text-7xl text-white/80">EXPERIENCES</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed">
            We create award-winning digital products that combine stunning design 
            with cutting-edge technology to deliver exceptional user experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105">
              <span className="relative z-10">View Our Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150"></div>
            </button>
            
            <button className="group border-2 border-white/30 bg-white/5 backdrop-blur-md text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              <span className="inline-flex items-center">
                Start a Project
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { number: '250+', label: 'Projects Delivered' },
              { number: '50+', label: 'Happy Clients' },
              { number: '5+', label: 'Years Experience' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-white/60 text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-white/50 text-sm uppercase tracking-wider">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-gradient-to-b from-slate-900 to-black relative">
        {/* Section Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <span className="text-purple-400 text-sm font-medium">WHAT WE DO</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Our
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              We specialize in creating digital experiences that not only look stunning 
              but also drive real business results.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Web Development',
                description: 'Lightning-fast websites built with cutting-edge technologies and optimized for performance.',
                icon: '⚡',
                gradient: 'from-blue-500 via-purple-500 to-pink-500',
                delay: '0'
              },
              {
                title: 'Mobile Apps',
                description: 'Native and cross-platform mobile applications that users love to engage with.',
                icon: '📱',
                gradient: 'from-green-400 via-blue-500 to-purple-600',
                delay: '100'
              },
              {
                title: 'UI/UX Design',
                description: 'User-centered designs that convert visitors into customers and drive engagement.',
                icon: '🎨',
                gradient: 'from-pink-500 via-red-500 to-yellow-500',
                delay: '200'
              },
              {
                title: 'Brand Identity',
                description: 'Memorable brand experiences that tell your story and connect with your audience.',
                icon: '✨',
                gradient: 'from-purple-500 via-pink-500 to-red-500',
                delay: '300'
              },
              {
                title: 'E-commerce',
                description: 'Powerful online stores that maximize conversions and provide seamless shopping experiences.',
                icon: '🛍️',
                gradient: 'from-cyan-400 via-blue-500 to-purple-600',
                delay: '400'
              },
              {
                title: 'Consulting',
                description: 'Strategic guidance to help you make informed decisions about your digital presence.',
                icon: '🚀',
                gradient: 'from-yellow-400 via-orange-500 to-red-500',
                delay: '500'
              }
            ].map((service, index) => (
              <div
                key={index}
                className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-2`}
                style={{ animationDelay: `${service.delay}ms` }}
              >
                {/* Hover Gradient Border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
                
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-all duration-300`}>
                  {service.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-white/70 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                  {service.description}
                </p>
                
                {/* Learn More Link */}
                <div className="flex items-center text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
                  <span className="text-sm font-medium mr-2">Learn More</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* View All Services Button */}
          <div className="text-center mt-16">
            <button className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105">
              <span className="relative z-10">View All Services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-block bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
                <span className="text-purple-400 text-sm font-medium">ABOUT US</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
                We Create
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Digital Magic
                </span>
              </h2>
              
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                We're a team of passionate designers and developers who believe in the power 
                of great design to transform businesses and create meaningful connections.
              </p>

              {/* Achievement Stats */}
              <div className="grid grid-cols-2 gap-8">
                {[
                  { number: '250+', label: 'Projects\nDelivered', color: 'from-blue-400 to-purple-500' },
                  { number: '99%', label: 'Client\nSatisfaction', color: 'from-purple-400 to-pink-500' },
                  { number: '50+', label: 'Happy\nClients', color: 'from-pink-400 to-red-500' },
                  { number: '24/7', label: 'Support\nAvailable', color: 'from-cyan-400 to-blue-500' }
                ].map((stat, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.number}
                    </div>
                    <div className="text-white/60 text-sm leading-tight whitespace-pre-line group-hover:text-white/80 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 group hover:scale-105 transition-all duration-500">
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-80 group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl opacity-60 group-hover:-rotate-12 transition-transform duration-700"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-8xl mb-6 filter grayscale hover:grayscale-0 transition-all duration-500">🎯</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-white/70 leading-relaxed">
                    To create digital experiences that not only look beautiful but also 
                    drive real business results and meaningful user engagement.
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-8 -left-8 w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="absolute -top-8 right-8 w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-500"></div>
              <div className="absolute bottom-8 -right-8 w-5 h-5 bg-cyan-500 rounded-full animate-bounce delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-b from-black to-slate-900 relative">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <span className="text-purple-400 text-sm font-medium">TESTIMONIALS</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Client
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Love Stories
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our amazing clients have to say about their experience.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO, TechStart',
                content: 'Working with this team was absolutely phenomenal. They transformed our vision into a stunning reality that exceeded all expectations.',
                rating: 5,
                avatar: '👩‍💼',
                company: 'TechStart Inc.'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Founder, GrowthLab',
                content: 'Our website traffic increased by 400% after the redesign. The attention to detail and user experience is unmatched.',
                rating: 5,
                avatar: '👨‍💻',
                company: 'GrowthLab'
              },
              {
                name: 'Emily Chen',
                role: 'Creative Director',
                content: 'The most professional and creative team I\'ve worked with. They truly understand modern design and user psychology.',
                rating: 5,
                avatar: '👩‍🎨',
                company: 'Creative Studios'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  "
                </div>
                
                {/* Rating Stars */}
                <div className="flex mb-6 space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>★</span>
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-white/80 leading-relaxed mb-8 text-lg group-hover:text-white transition-colors duration-300">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-white/60 text-sm">{testimonial.role}</div>
                    <div className="text-purple-400 text-xs">{testimonial.company}</div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and turn your ideas into reality. 
            Contact us today for a free consultation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all">
              Get Free Quote
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">YourBrand</div>
              <p className="text-gray-400 mb-4">
                Building digital experiences that matter.
              </p>
              <div className="flex space-x-4">
                {['📧', '📱', '🌐'].map((icon, index) => (
                  <div key={index} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/services" className="hover:text-white transition-colors">Web Development</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Mobile Apps</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Digital Marketing</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">UI/UX Design</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>📍 123 Business St, City, State 12345</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>✉️ hello@yourbrand.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 YourBrand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;