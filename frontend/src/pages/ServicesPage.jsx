import { useState } from 'react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Web Development',
      icon: '🌐',
      color: 'from-blue-500 to-indigo-600',
      shortDesc: 'Custom websites and web applications built with modern technologies.',
      fullDesc: 'We create responsive, fast, and secure websites using the latest technologies like React, Node.js, and cloud platforms. Our web development services include custom website design, e-commerce solutions, content management systems, and progressive web applications.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Secure & Scalable'],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      price: 'Starting at $2,999'
    },
    {
      id: 2,
      title: 'Mobile Apps',
      icon: '📱',
      color: 'from-green-500 to-teal-600',
      shortDesc: 'Native and cross-platform mobile applications for iOS and Android.',
      fullDesc: 'Transform your ideas into powerful mobile applications that work seamlessly across all devices. We develop both native and cross-platform apps using React Native and Flutter, ensuring optimal performance and user experience.',
      features: ['Cross-Platform', 'Native Performance', 'Push Notifications', 'Offline Capability'],
      technologies: ['React Native', 'Flutter', 'Firebase', 'App Store Optimization'],
      price: 'Starting at $4,999'
    },
    {
      id: 3,
      title: 'Digital Marketing',
      icon: '📈',
      color: 'from-purple-500 to-pink-600',
      shortDesc: 'Strategic marketing campaigns to boost your online presence.',
      fullDesc: 'Drive growth with data-driven digital marketing strategies. Our comprehensive approach includes SEO, social media marketing, content creation, email campaigns, and paid advertising to maximize your ROI and reach your target audience.',
      features: ['SEO Optimization', 'Social Media Marketing', 'Content Strategy', 'Analytics & Reporting'],
      technologies: ['Google Analytics', 'Google Ads', 'Facebook Ads', 'Email Automation'],
      price: 'Starting at $1,499/month'
    },
    {
      id: 4,
      title: 'UI/UX Design',
      icon: '🎨',
      color: 'from-orange-500 to-red-600',
      shortDesc: 'Beautiful, user-friendly designs that convert visitors to customers.',
      fullDesc: 'Create exceptional user experiences with our design services. We focus on user research, wireframing, prototyping, and visual design to ensure your digital products are both beautiful and functional.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
      technologies: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision'],
      price: 'Starting at $1,999'
    },
    {
      id: 5,
      title: 'Cloud Solutions',
      icon: '☁️',
      color: 'from-cyan-500 to-blue-600',
      shortDesc: 'Scalable cloud infrastructure and deployment solutions.',
      fullDesc: 'Leverage the power of cloud computing to scale your applications efficiently. We provide cloud migration, infrastructure setup, DevOps implementation, and ongoing maintenance for AWS, Google Cloud, and Azure platforms.',
      features: ['Cloud Migration', 'Auto-Scaling', 'Security & Compliance', '24/7 Monitoring'],
      technologies: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes'],
      price: 'Starting at $999/month'
    },
    {
      id: 6,
      title: 'Consulting',
      icon: '💡',
      color: 'from-yellow-500 to-orange-600',
      shortDesc: 'Expert technical consulting to guide your digital transformation.',
      fullDesc: 'Get expert guidance for your digital transformation journey. Our consulting services include technology assessment, architecture planning, team training, and strategic roadmap development to help you make informed decisions.',
      features: ['Technology Assessment', 'Strategic Planning', 'Team Training', 'Implementation Support'],
      technologies: ['Various based on needs', 'Best Practices', 'Industry Standards'],
      price: 'Starting at $200/hour'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Same as Homepage */}
      <nav className="fixed top-0 w-full z-50 bg-white shadow-lg py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            YourBrand
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={`font-medium transition-colors hover:text-blue-600 ${
                  item === 'Services' ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {item}
              </Link>
            ))}
          </div>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Comprehensive digital solutions to help your business grow and thrive in the modern world.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All Services', 'Development', 'Design', 'Marketing', 'Consulting'].map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full transition-all ${
                  category === 'All Services' 
                    ? 'bg-white text-blue-600' 
                    : 'border border-white text-white hover:bg-white hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.shortDesc}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                  <button className="text-blue-600 font-semibold hover:text-blue-700">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We follow a proven methodology to ensure successful project delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'We understand your business goals and requirements',
                icon: '🔍'
              },
              {
                step: '02',
                title: 'Planning',
                description: 'Strategic planning and roadmap development',
                icon: '📋'
              },
              {
                step: '03',
                title: 'Development',
                description: 'Agile development with regular updates',
                icon: '⚡'
              },
              {
                step: '04',
                title: 'Launch',
                description: 'Testing, deployment, and ongoing support',
                icon: '🚀'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your requirements and create something amazing together.
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

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${selectedService.color} rounded-2xl flex items-center justify-center text-2xl`}>
                    {selectedService.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedService.title}</h2>
                    <p className="text-2xl font-bold text-blue-600 mt-2">{selectedService.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <p className="text-lg text-gray-600 mb-8">{selectedService.fullDesc}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <span className="text-green-600">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;