import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [footerMenu, setFooterMenu] = useState(null);

  // Fetch footer menu from database
  useEffect(() => {
    const fetchFooterMenu = async () => {
      try {
        console.log("🦶 Fetching footer menu...");
        const response = await fetch(
          "http://localhost:5000/api/menus/location/footer"
        );
        const data = await response.json();
        console.log("🦶 Footer API Response:", data);
        if (data.menu) {
          setFooterMenu(data);
          console.log("🦶 Footer menu set:", data.items?.length, "sections");
        } else {
          console.log("🦶 No footer menu found in response");
        }
      } catch (error) {
        console.error("🦶 Error fetching footer menu:", error);
      }
    };
    fetchFooterMenu();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus("subscribing");
    setTimeout(() => {
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => setSubscribeStatus(""), 3000);
    }, 1000);
  };

  // Group menu items by parent sections
  const getSections = () => {
    if (!footerMenu?.items) {
      console.log("🦶 No footer menu items available");
      return [];
    }
    const sections = footerMenu.items.filter((item) => item.parent_id === null);
    console.log("🦶 Footer sections:", sections.length);
    return sections;
  };

  const sections = getSections();

  console.log("🦶 Rendering footer with", sections.length, "sections");
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-gray-300 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 via-teal-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-teal-500/20 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
                <i className="fas fa-envelope-open-text text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-400 mb-8">
                Stay updated with our latest news and updates
              </p>
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-5 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    disabled={subscribeStatus === "subscribing"}
                    className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 whitespace-nowrap"
                  >
                    {subscribeStatus === "subscribing" ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : subscribeStatus === "success" ? (
                      <i className="fas fa-check"></i>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Render sections from database or fallback */}
            {sections.length > 0 ? (
              sections.map((section, idx) => (
                <div key={section.id}>
                  <div className="inline-block mb-6">
                    <h4 className="text-white font-bold text-lg mb-1">
                      {section.title}
                    </h4>
                    <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                  </div>
                  <ul className="space-y-3">
                    {section.children?.map((child) => (
                      <li key={child.id}>
                        <Link
                          to={child.url}
                          className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                        >
                          <span
                            className={`w-1.5 h-1.5 ${
                              idx === 0
                                ? "bg-blue-500"
                                : idx === 1
                                ? "bg-teal-500"
                                : "bg-purple-500"
                            } rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}
                          ></span>
                          <span>{child.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              // Fallback content if no menu data
              <>
                {/* Column 1: Pain Therapy Centre */}
                <div>
                  <div className="inline-block mb-6">
                    <h4 className="text-white font-bold text-lg mb-1">
                      Pain Therapy Centre
                    </h4>
                    <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { label: "About Us", path: "/pages/home" },
                      { label: "Our Story", path: "/pages/about-team" },
                      { label: "Team", path: "/pages/about-team" },
                      { label: "Careers", path: "/pages/gallery" },
                      { label: "Contact", path: "/pages/contact" },
                      { label: "Blog", path: "/pages/testimonials" },
                    ].map((link, idx) => (
                      <li key={idx}>
                        <Link
                          to={link.path}
                          className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Services */}
                <div>
                  <div className="inline-block mb-6">
                    <h4 className="text-white font-bold text-lg mb-1">
                      Services
                    </h4>
                    <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                  </div>
                  <ul className="space-y-3">
                    {[
                      {
                        label: "Spine & Back Pain",
                        path: "/pages/spine-back-pain-therapy",
                      },
                      {
                        label: "Joint Pain & Arthritis",
                        path: "/pages/joint-pain-arthritis-treatment",
                      },
                      {
                        label: "Neuro Rehabilitation",
                        path: "/pages/neuro-paralysis-rehab",
                      },
                      {
                        label: "Post-Operative Rehab",
                        path: "/pages/post-operative-rehabilitation",
                      },
                      {
                        label: "Manual Therapy",
                        path: "/pages/manual-therapy-spinal-manipulation",
                      },
                      {
                        label: "Cupping & Acupressure",
                        path: "/pages/cupping-acupressure-therapy",
                      },
                    ].map((service, idx) => (
                      <li key={idx}>
                        <Link
                          to={service.path}
                          className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span>{service.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Resources */}
                <div>
                  <div className="inline-block mb-6">
                    <h4 className="text-white font-bold text-lg mb-1">
                      Resources
                    </h4>
                    <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { label: "Blog & Insights", path: "/pages/testimonials" },
                      {
                        label: "Case Studies",
                        path: "/pages/conditions-we-treat",
                      },
                      { label: "Portfolio", path: "/pages/gallery" },
                      { label: "Free Tools", path: "/pages/home" },
                      { label: "Documentation", path: "/pages/faq" },
                      { label: "FAQ", path: "/pages/faq" },
                      { label: "Support Center", path: "/pages/contact" },
                    ].map((resource, idx) => (
                      <li key={idx}>
                        <Link
                          to={resource.path}
                          className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span>{resource.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 4: Connect With Us */}
                <div>
                  <div className="inline-block mb-6">
                    <h4 className="text-white font-bold text-lg mb-1">
                      Connect With Us
                    </h4>
                    <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                  </div>

                  {/* Social Icons */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                      {
                        letter: "L",
                        gradient: "from-blue-600 to-blue-500",
                        href: "https://linkedin.com",
                        label: "LinkedIn",
                      },
                      {
                        letter: "T",
                        gradient: "from-blue-500 to-cyan-400",
                        href: "https://twitter.com",
                        label: "Twitter",
                      },
                      {
                        letter: "F",
                        gradient: "from-blue-700 to-blue-600",
                        href: "https://facebook.com",
                        label: "Facebook",
                      },
                      {
                        letter: "I",
                        gradient: "from-purple-600 to-pink-500",
                        href: "https://instagram.com",
                        label: "Instagram",
                      },
                      {
                        letter: "Y",
                        gradient: "from-red-600 to-red-500",
                        href: "https://youtube.com",
                        label: "YouTube",
                      },
                      {
                        letter: "G",
                        gradient: "from-cyan-500 to-teal-500",
                        href: "https://github.com",
                        label: "GitHub",
                      },
                    ].map((social, idx) => (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-gradient-to-br ${social.gradient} rounded-xl flex items-center justify-center text-white font-bold hover:scale-110 transition-transform shadow-lg hover:shadow-xl`}
                        aria-label={social.label}
                      >
                        {social.letter}
                      </a>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <i className="fas fa-phone-alt text-blue-400"></i>
                      </div>
                      <a
                        href="tel:8160754633"
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        8160754633
                      </a>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                        <i className="fas fa-envelope text-purple-400"></i>
                      </div>
                      <a
                        href="mailto:info@paintherapy.com"
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        info@paintherapy.com
                      </a>
                    </div>
                    <div className="flex items-start gap-3 group">
                      <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center group-hover:bg-teal-500/20 transition-colors flex-shrink-0">
                        <i className="fas fa-map-marker-alt text-teal-400"></i>
                      </div>
                      <span className="text-gray-400 text-sm leading-relaxed">
                        Ajwa Road, Vadodara, Gujarat
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © {currentYear} Pain Therapy Centre. All rights reserved. |
                <span className="text-gray-500">
                  {" "}
                  Empowering health through expert care and rehabilitation.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
