import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";

const About = () => {
  const [counters, setCounters] = useState({
    years: 0,
    brands: 0,
    adSpend: 0,
    videos: 0,
  });

  // Animated counters
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      years: 7,
      brands: 200,
      adSpend: 2,
      videos: 500,
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        years: Math.min(Math.floor(targets.years * progress), targets.years),
        brands: Math.min(Math.floor(targets.brands * progress), targets.brands),
        adSpend: Math.min(targets.adSpend * progress, targets.adSpend),
        videos: Math.min(Math.floor(targets.videos * progress), targets.videos),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const timeline = [
    {
      year: "2018",
      title: "Started Journey",
      description: "Began freelancing in digital marketing",
    },
    {
      year: "2019",
      title: "First Major Client",
      description: "Managed ₹10L+ ad budget for D2C brand",
    },
    {
      year: "2021",
      title: "AI Integration",
      description: "Started implementing AI-powered marketing systems",
    },
    {
      year: "2023",
      title: "Scale & Growth",
      description: "Expanded to serve 100+ brands across India",
    },
    {
      year: "2025",
      title: "Innovation Leader",
      description: "Leading AI-powered marketing transformation",
    },
  ];

  const skills = [
    { name: "UGC Content Creation", level: 95, icon: "🎬" },
    { name: "Marketing Automation", level: 90, icon: "🤖" },
    { name: "Campaign Management", level: 95, icon: "📊" },
    { name: "Data Analytics", level: 85, icon: "📈" },
    { name: "AI Tools & Platforms", level: 90, icon: "🧠" },
    { name: "Social Media Strategy", level: 92, icon: "📱" },
  ];

  const certifications = [
    "Google Ads Certified",
    "Meta Blueprint Certified",
    "HubSpot Marketing Certified",
    "Google Analytics Expert",
  ];

  return (
    <>
      <Helmet>
        <title>About - Harsh Ranjan | Digital Marketing Expert</title>
        <meta
          name="description"
          content="Learn about Harsh Ranjan's 7-year journey in digital marketing and expertise in SEO, social media, and data-driven strategies."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 animated-gradient min-h-[80vh] flex items-center relative overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple/30 rounded-full blur-3xl float-animation"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyan/20 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "-3s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-cyan rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white">
                  Digital Marketing Expert
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight font-display text-white">
                About
                <br />
                <span className="gradient-text">Harsh Ranjan</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                7+ Years of Transforming Brands Through AI-Powered Marketing.
                From freelancer to AI marketing innovator - helping 200+ brands
                achieve extraordinary results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="gradient-button px-8 py-3 rounded-full text-white font-bold text-lg flex items-center justify-center space-x-2"
                >
                  <span>Let's Work Together</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
                <a
                  href="/portfolio"
                  className="px-8 py-3 rounded-full text-white font-semibold border-2 border-white/30 hover:bg-white/10 transition flex items-center justify-center space-x-2"
                >
                  <i className="fas fa-briefcase"></i>
                  <span>View Portfolio</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <div className="text-2xl font-bold gradient-text">7+</div>
                  <div className="text-xs text-gray-400">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">200+</div>
                  <div className="text-xs text-gray-400">Brands Served</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">₹2Cr+</div>
                  <div className="text-xs text-gray-400">Ad Spend Managed</div>
                </div>
              </div>
            </div>

            {/* Right: Image/Visual */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple/20 to-cyan/20 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="/images/Gemini_Generated_Image_9ev16y9ev16y9ev1.png"
                  alt="Harsh Ranjan - Digital Marketing Expert"
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: "center 20%" }}
                />
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-trophy text-cyan text-2xl"></i>
                  <div>
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-xs text-white/80">Videos Created</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 glass-card p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-chart-line text-purple text-2xl"></i>
                  <div>
                    <div className="text-2xl font-bold text-white">+245%</div>
                    <div className="text-xs text-white/80">Avg. ROI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section with Images */}
      <section className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-cyan-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-cyan-100 px-4 py-2 rounded-full mb-4">
              <i className="fas fa-book-open text-purple-600"></i>
              <span className="text-sm font-bold text-gray-900">My Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-display text-gray-900 mb-4">
              My Journey in{" "}
              <span className="gradient-text">Digital Marketing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to industry innovation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p className="flex items-start">
                    <i className="fas fa-check-circle text-purple-600 mt-1 mr-3 flex-shrink-0"></i>
                    <span>
                      With over{" "}
                      <strong className="text-purple-600 font-bold">
                        7 years of experience
                      </strong>{" "}
                      in digital marketing, I've helped{" "}
                      <strong className="text-cyan-600 font-bold">
                        200+ brands
                      </strong>{" "}
                      across India transform their online presence and achieve
                      measurable growth.
                    </span>
                  </p>
                  <p className="flex items-start">
                    <i className="fas fa-check-circle text-cyan-600 mt-1 mr-3 flex-shrink-0"></i>
                    <span>
                      My journey started with a{" "}
                      <strong className="text-gray-900">
                        passion for understanding consumer behavior
                      </strong>{" "}
                      and leveraging data to drive marketing decisions. Today, I
                      specialize in{" "}
                      <strong className="text-purple-600 font-bold">
                        AI-powered marketing solutions
                      </strong>{" "}
                      that combine creativity with cutting-edge technology.
                    </span>
                  </p>
                  <p className="flex items-start">
                    <i className="fas fa-check-circle text-purple-600 mt-1 mr-3 flex-shrink-0"></i>
                    <span>
                      From UGC content creation to marketing automation and
                      campaign management, I've built systems that help
                      businesses{" "}
                      <strong className="text-gray-900">
                        scale their marketing efforts
                      </strong>{" "}
                      while reducing costs and{" "}
                      <strong className="text-cyan-600 font-bold">
                        improving ROI by 245%
                      </strong>{" "}
                      on average.
                    </span>
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-3xl font-black gradient-text mb-1">
                      7+
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Years
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black gradient-text mb-1">
                      200+
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Brands
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black gradient-text mb-1">
                      245%
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Avg ROI
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="/images/Screenshot 2025-11-27 110127.png"
                      alt="Marketing Strategy"
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-bold text-sm">Marketing Strategy</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="/images/Screenshot 2025-11-27 110353.png"
                      alt="Analytics Dashboard"
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-bold text-sm">Analytics Dashboard</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="/images/Screenshot 2025-11-27 110251.png"
                      alt="Content Creation"
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-bold text-sm">Content Creation</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src="/images/Screenshot 2025-11-27 110853.png"
                      alt="Team Collaboration"
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-bold text-sm">Team Collaboration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-cyan-100 px-4 py-2 rounded-full mb-4">
                <i className="fas fa-certificate text-purple-600"></i>
                <span className="text-sm font-bold text-gray-900">
                  Verified Credentials
                </span>
              </div>
              <h3 className="text-3xl font-black font-display text-gray-900">
                Certifications &{" "}
                <span className="gradient-text">Credentials</span>
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-purple-50 to-cyan-50 px-8 py-4 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-check text-white text-sm"></i>
                    </div>
                    <span className="font-bold text-gray-900">{cert}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">
              Impact & <span className="gradient-text">Results</span>
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that speak for themselves
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-calendar-alt text-white text-2xl"></i>
              </div>
              <div className="text-5xl font-black text-gray-900 mb-2">
                {counters.years}+
              </div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-building text-white text-2xl"></i>
              </div>
              <div className="text-5xl font-black text-gray-900 mb-2">
                {counters.brands}+
              </div>
              <div className="text-gray-600 font-medium">Brands Served</div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rupee-sign text-white text-2xl"></i>
              </div>
              <div className="text-5xl font-black text-gray-900 mb-2">
                ₹{counters.adSpend.toFixed(1)}Cr+
              </div>
              <div className="text-gray-600 font-medium">Ad Spend Managed</div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-coral to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-video text-white text-2xl"></i>
              </div>
              <div className="text-5xl font-black text-gray-900 mb-2">
                {counters.videos}+
              </div>
              <div className="text-gray-600 font-medium">Videos Created</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">
              My <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From freelance beginnings to AI marketing innovation
            </p>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 via-cyan-500 to-purple-600 hidden lg:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-8 ${
                    idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      idx % 2 === 0 ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-cyan-100 px-4 py-2 rounded-full mb-3">
                        <i className="fas fa-calendar text-purple-600"></i>
                        <span className="font-bold text-gray-900">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:block w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 border-4 border-white shadow-lg z-10"></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">
              Skills & <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mastering the tools and strategies that drive results
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-cyan-100 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">{skill.icon}</span>
                    </div>
                    <span className="font-bold text-gray-900 text-lg">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-2xl font-black text-gray-900">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">
              Core <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized services that drive real business results
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 border-2 border-purple-200 rounded-2xl hover:border-purple-600 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-video text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                UGC Content Creation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Creating <strong>authentic, engaging</strong> user-generated
                content that resonates with your audience and drives
                conversions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-white p-8 border-2 border-cyan-200 rounded-2xl hover:border-cyan-600 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-robot text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Marketing Automation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Building <strong>AI-powered automation</strong> systems that
                streamline your marketing operations and improve efficiency.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 border-2 border-orange-200 rounded-2xl hover:border-orange-600 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-chart-line text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Campaign Management
              </h3>
              <p className="text-gray-600 leading-relaxed">
                <strong>End-to-end campaign</strong> management from strategy to
                execution, optimization, and performance tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 animated-gradient relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black font-display text-white mb-6">
            My Marketing <span className="text-cyan-300">Philosophy</span>
          </h2>
          <p className="text-xl md:text-2xl text-white mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
            "Great marketing isn't about{" "}
            <strong className="text-cyan-300 font-bold">shouting louder</strong>
            —it's about{" "}
            <strong className="text-white font-bold">
              understanding deeper
            </strong>
            . I believe in combining data-driven insights with creative
            storytelling to build authentic connections between brands and their
            audiences."
          </p>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="group cursor-pointer">
                <div className="w-20 h-20 bg-white/90 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <i className="fas fa-chart-bar text-purple-600 text-3xl"></i>
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-3">
                  Data
                </div>
                <p className="text-lg text-white/90 font-medium">
                  Decisions backed by analytics
                </p>
              </div>

              <div className="group cursor-pointer">
                <div className="w-20 h-20 bg-white/90 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <i className="fas fa-lightbulb text-cyan-600 text-3xl"></i>
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-3">
                  Creativity
                </div>
                <p className="text-lg text-white/90 font-medium">
                  Stories that captivate
                </p>
              </div>

              <div className="group cursor-pointer">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <i className="fas fa-trophy text-white text-3xl"></i>
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-3">
                  Results
                </div>
                <p className="text-lg text-white/90 font-medium">
                  Measurable business impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black font-display mb-6">
            Let's Build Something{" "}
            <span className="gradient-text">Amazing Together</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Ready to take your marketing to the next level?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="gradient-button inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold text-white hover:scale-105 transition-transform"
            >
              <i className="fas fa-paper-plane"></i>
              Get In Touch
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold text-white border-2 border-white hover:bg-white hover:text-gray-900 transition-all"
            >
              <i className="fas fa-folder-open"></i>
              View Portfolio
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
