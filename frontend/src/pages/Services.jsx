import { Helmet } from "react-helmet-async";
import { useState } from "react";

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 0,
      icon: "🎥",
      title: "UGC Content Creation",
      tagline: "Authentic Content That Converts",
      description: "Transform your brand with authentic user-generated content that builds trust and drives engagement. Our AI-powered content creation system produces high-quality videos at scale.",
      features: [
        "Professional UGC video production",
        "AI-enhanced editing and optimization",
        "Multi-platform content adaptation",
        "Content strategy and planning",
        "Performance tracking and analytics",
      ],
      pricing: "Starting at ₹15,000/month",
      results: [
        { metric: "+340%", label: "Avg. Engagement" },
        { metric: "500+", label: "Videos Created" },
        { metric: "48hr", label: "Delivery Time" },
      ]
    },
    {
      id: 1,
      icon: "🤖",
      title: "Marketing Automation",
      tagline: "Scale Your Marketing Effortlessly",
      description: "Build powerful automation systems that handle repetitive tasks, nurture leads, and optimize campaigns 24/7. Free up your time to focus on strategy and growth.",
      features: [
        "Email marketing automation",
        "Social media scheduling & posting",
        "Lead nurturing workflows",
        "AI-powered chatbots",
        "Analytics & reporting automation",
      ],
      pricing: "Starting at ₹25,000/month",
      results: [
        { metric: "₹8,000", label: "Cost Savings" },
        { metric: "50+", label: "Systems Built" },
        { metric: "24/7", label: "Automation" },
      ]
    },
    {
      id: 2,
      icon: "📈",
      title: "Campaign Management",
      tagline: "Results-Driven Campaign Excellence",
      description: "End-to-end campaign management across all digital channels. From strategy to execution, we optimize every touchpoint to maximize your ROI and drive measurable results.",
      features: [
        "Multi-channel campaign strategy",
        "Ad creation and copywriting",
        "A/B testing and optimization",
        "Budget management & allocation",
        "Detailed performance reporting",
      ],
      pricing: "Starting at ₹30,000/month",
      results: [
        { metric: "₹2Cr+", label: "Ad Spend" },
        { metric: "+245%", label: "Avg. ROI" },
        { metric: "200+", label: "Campaigns" },
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>Services - Harsh Ranjan | AI-Powered Marketing Solutions</title>
        <meta
          name="description"
          content="Explore AI-powered marketing services including UGC content creation, marketing automation, and campaign management."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-12 animated-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple/30 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '-3s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
              <span className="gradient-text">AI-Powered</span> Marketing Services
            </h1>
            <p className="text-xl text-gray-300">
              Complete marketing solutions that drive growth and maximize ROI
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`p-8 rounded-2xl cursor-pointer transition-all ${
                  activeService === index
                    ? "bg-gradient-to-br from-purple-600 to-cyan-600 text-white shadow-2xl scale-105"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  activeService === index ? "text-white" : "text-gray-900"
                }`}>
                  {service.title}
                </h3>
                <p className={`text-sm mb-4 ${
                  activeService === index ? "text-purple-100" : "text-gray-600"
                }`}>
                  {service.tagline}
                </p>
                <div className="text-lg font-bold">{service.pricing}</div>
              </div>
            ))}
          </div>

          {/* Service Details */}
          <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="text-6xl mb-6">{services[activeService].icon}</div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {services[activeService].title}
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  {services[activeService].description}
                </p>
                <div className="space-y-3">
                  {services[activeService].features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Results You Can Expect</h3>
                  <div className="grid grid-cols-3 gap-6">
                    {services[activeService].results.map((result, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">{result.metric}</div>
                        <div className="text-sm text-gray-600">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Pricing</h3>
                  <p className="text-3xl font-bold mb-4">{services[activeService].pricing}</p>
                  <p className="text-purple-100 mb-6">
                    Flexible packages tailored to your needs. No long-term contracts required.
                  </p>
                  <a
                    href="/contact"
                    className="gradient-button inline-block px-6 py-3 rounded-full font-bold text-white"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How We Work
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Discovery</h3>
              <p className="text-gray-600">We learn about your business, goals, and challenges</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Strategy</h3>
              <p className="text-gray-600">Custom strategy tailored to your specific needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-coral-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Execution</h3>
              <p className="text-gray-600">We implement and optimize your campaigns</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-navy-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Results</h3>
              <p className="text-gray-600">Track performance and scale what works</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Let's discuss which service is right for your business
          </p>
          <a
            href="/contact"
            className="gradient-button inline-block px-8 py-4 rounded-full text-lg font-bold text-white"
          >
            Schedule Free Consultation
          </a>
        </div>
      </section>
    </>
  );
};

export default Services;
