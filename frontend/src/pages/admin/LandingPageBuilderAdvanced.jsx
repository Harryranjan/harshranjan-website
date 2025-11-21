import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import api from "../../utils/api";
import { Spinner } from "../../components/ui";
import Toast from "../../components/Toast";

export default function LandingPageBuilderAdvanced() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const template = searchParams.get("template");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState("desktop"); // desktop, tablet, mobile
  const [activePanel, setActivePanel] = useState("sections"); // sections, settings, styles
  const [showSectionLibrary, setShowSectionLibrary] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    status: "draft",
    template: "custom",
    meta_title: "",
    meta_description: "",
    meta_keywords: "landing",
    custom_css: "",
    custom_js: "",
    head_scripts: "",
    body_scripts: "",
  });

  const [globalStyles, setGlobalStyles] = useState({
    primaryColor: "#0ea5e9",
    secondaryColor: "#8b5cf6",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    fontFamily: "Inter",
    containerWidth: "1200px",
  });

  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [forms, setForms] = useState([]);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [codeEditorMode, setCodeEditorMode] = useState("html"); // html, css, js
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchForms();
    if (id) {
      fetchLandingPage();
    } else if (template) {
      loadAdvancedTemplate(template);
    }
  }, [id, template]);

  const fetchForms = async () => {
    try {
      const response = await api.get("/forms");
      setForms(response.data.forms || []);
    } catch (error) {
      console.error("Failed to fetch forms:", error);
    }
  };

  const fetchLandingPage = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/pages/${id}`);
      setFormData(response.data);

      try {
        const parsedData = JSON.parse(response.data.content || "{}");
        if (parsedData.sections) {
          setSections(parsedData.sections);
        }
        if (parsedData.globalStyles) {
          setGlobalStyles(parsedData.globalStyles);
        }
      } catch {
        setSections([]);
      }
    } catch (error) {
      console.error("Failed to fetch landing page:", error);
      setToast({ type: "error", message: "Failed to load landing page" });
    } finally {
      setLoading(false);
    }
  };

  const loadAdvancedTemplate = (templateId) => {
    const templates = {
      "complete-business": {
        title: "Complete Business Landing Page",
        slug: "complete-business-landing",
        excerpt:
          "Full-featured landing page with hero, about, portfolio, services, CTA, testimonials, form and footer",
        sections: [
          // 1. Hero Section
          {
            id: "hero-1",
            type: "hero",
            variant: "centered",
            content: {
              heading: "Transform Your Business Today",
              subheading:
                "We deliver exceptional results through innovative solutions and dedicated service",
              ctaText: "Get Started Free",
              ctaLink: "#contact",
            },
            styles: {
              backgroundColor: "#0f172a",
              textColor: "#ffffff",
              padding: "120px 20px",
              alignment: "center",
            },
          },
          // 2. About Section
          {
            id: "about-1",
            type: "html",
            content: {
              html: `<div class="about-section">
                <h2>About Our Company</h2>
                <p>With over 10 years of experience, we've helped thousands of businesses achieve their goals through cutting-edge solutions and personalized service.</p>
                <div class="stats-grid">
                  <div><strong>500+</strong><span>Projects</span></div>
                  <div><strong>200+</strong><span>Clients</span></div>
                  <div><strong>15+</strong><span>Awards</span></div>
                </div>
              </div>`,
              showPreview: true,
            },
            styles: {
              backgroundColor: "#ffffff",
              padding: "80px 20px",
              alignment: "center",
            },
          },
          // 3. Portfolio Section
          {
            id: "portfolio-1",
            type: "html",
            content: {
              html: `<div class="portfolio-section">
                <h2>Our Recent Work</h2>
                <p>Check out some of our latest projects</p>
                <div class="portfolio-grid">
                  <div class="portfolio-item"><img src="/api/placeholder/400/300" alt="Project 1"/><h3>E-Commerce Platform</h3></div>
                  <div class="portfolio-item"><img src="/api/placeholder/400/300" alt="Project 2"/><h3>Mobile App Design</h3></div>
                  <div class="portfolio-item"><img src="/api/placeholder/400/300" alt="Project 3"/><h3>Brand Identity</h3></div>
                </div>
              </div>`,
              showPreview: true,
            },
            styles: {
              backgroundColor: "#f8fafc",
              padding: "80px 20px",
            },
          },
          // 4. Services Section
          {
            id: "services-1",
            type: "features",
            variant: "grid-3col",
            content: {
              title: "Our Services",
              subtitle: "Comprehensive solutions for your business needs",
              features: [
                {
                  icon: "💻",
                  title: "Web Development",
                  description: "Custom websites built with latest technologies",
                },
                {
                  icon: "📱",
                  title: "Mobile Apps",
                  description: "Native and cross-platform mobile applications",
                },
                {
                  icon: "🎨",
                  title: "UI/UX Design",
                  description: "Beautiful and intuitive user experiences",
                },
              ],
            },
            styles: {
              backgroundColor: "#ffffff",
              padding: "80px 20px",
            },
          },
          // 5. CTA Banner
          {
            id: "cta-1",
            type: "cta",
            content: {
              title: "Ready to Start Your Project?",
              description: "Let's work together to bring your vision to life",
              buttonText: "Schedule a Consultation",
              buttonLink: "#contact",
              note: "Free consultation • No obligation",
            },
            styles: {
              backgroundColor: "#0ea5e9",
              textColor: "#ffffff",
              padding: "60px 20px",
            },
          },
          // 6. Testimonials
          {
            id: "testimonials-1",
            type: "testimonials",
            content: {
              title: "What Our Clients Say",
              testimonials: [
                {
                  quote: "Exceptional service and outstanding results!",
                  author: "John Smith",
                  role: "CEO, TechCorp",
                  rating: 5,
                },
                {
                  quote: "They transformed our business completely.",
                  author: "Sarah Johnson",
                  role: "Founder, StartupXYZ",
                  rating: 5,
                },
              ],
            },
            styles: {
              backgroundColor: "#f8fafc",
              padding: "80px 20px",
            },
          },
          // 7. Form with Side Column
          {
            id: "form-1",
            type: "html",
            content: {
              html: `<div class="form-section-split">
                <div class="form-info">
                  <h3>Get In Touch</h3>
                  <p>📧 info@company.com</p>
                  <p>📞 +1 (555) 123-4567</p>
                  <p>📍 123 Business St, City</p>
                </div>
                <div class="form-container">
                  <form><input type="text" placeholder="Name"/><input type="email" placeholder="Email"/><textarea placeholder="Message"></textarea><button>Send Message</button></form>
                </div>
              </div>`,
              showPreview: true,
            },
            styles: {
              backgroundColor: "#ffffff",
              padding: "80px 20px",
            },
          },
          // 8. Footer
          {
            id: "footer-1",
            type: "html",
            content: {
              html: `<footer class="footer">
                <div class="footer-content">
                  <div><h4>Company</h4><ul><li>About</li><li>Services</li><li>Portfolio</li></ul></div>
                  <div><h4>Contact</h4><ul><li>Email</li><li>Phone</li><li>Address</li></ul></div>
                  <div><h4>Follow Us</h4><ul><li>Facebook</li><li>Twitter</li><li>LinkedIn</li></ul></div>
                </div>
                <p class="copyright">© 2025 Company Name. All rights reserved.</p>
              </footer>`,
              showPreview: true,
            },
            styles: {
              backgroundColor: "#1f2937",
              textColor: "#ffffff",
              padding: "60px 20px 30px",
            },
          },
        ],
      },
      // Template 2: Creative Agency
      "creative-agency": {
        title: "Creative Agency Landing",
        slug: "creative-agency-landing",
        excerpt: "Modern landing page for creative agencies",
        sections: [
          {
            id: "hero-2",
            type: "hero",
            variant: "centered",
            content: {
              heading: "Creative Solutions for Modern Brands",
              subheading: "Award-winning design and development studio",
              ctaText: "View Our Work",
              ctaLink: "#portfolio",
            },
            styles: {
              backgroundColor: "#8b5cf6",
              textColor: "#ffffff",
              padding: "120px 20px",
            },
          },
          {
            id: "about-2",
            type: "html",
            content: {
              html: `<div class="about-section"><h2>We Are Creators</h2><p>A passionate team of designers, developers, and strategists dedicated to crafting exceptional digital experiences.</p></div>`,
              showPreview: true,
            },
            styles: { backgroundColor: "#ffffff", padding: "80px 20px" },
          },
          {
            id: "portfolio-2",
            type: "html",
            content: {
              html: `<div class="portfolio-section"><h2>Featured Projects</h2><div class="portfolio-grid"><div class="portfolio-item"><img src="/api/placeholder/400/300"/><h3>Brand Redesign</h3></div><div class="portfolio-item"><img src="/api/placeholder/400/300"/><h3>Website Launch</h3></div><div class="portfolio-item"><img src="/api/placeholder/400/300"/><h3>App Interface</h3></div></div></div>`,
              showPreview: true,
            },
            styles: { backgroundColor: "#faf5ff", padding: "80px 20px" },
          },
          {
            id: "services-2",
            type: "features",
            variant: "grid-3col",
            content: {
              title: "What We Do",
              features: [
                {
                  icon: "🎨",
                  title: "Branding",
                  description: "Complete brand identity development",
                },
                {
                  icon: "💻",
                  title: "Web Design",
                  description: "Stunning websites that convert",
                },
                {
                  icon: "📱",
                  title: "App Design",
                  description: "User-centered mobile experiences",
                },
              ],
            },
            styles: { backgroundColor: "#ffffff", padding: "80px 20px" },
          },
          {
            id: "cta-2",
            type: "cta",
            content: {
              title: "Let's Create Something Amazing",
              description: "Start your project with us today",
              buttonText: "Start a Project",
              buttonLink: "#contact",
            },
            styles: {
              backgroundColor: "#8b5cf6",
              textColor: "#ffffff",
              padding: "60px 20px",
            },
          },
          {
            id: "testimonials-2",
            type: "testimonials",
            content: {
              title: "Client Success Stories",
              testimonials: [
                {
                  quote: "Incredible creativity and professionalism!",
                  author: "Mike Chen",
                  role: "Marketing Director",
                  rating: 5,
                },
              ],
            },
            styles: { backgroundColor: "#faf5ff", padding: "80px 20px" },
          },
          {
            id: "form-2",
            type: "form",
            content: { title: "Let's Talk", formId: null },
            styles: { backgroundColor: "#ffffff", padding: "80px 20px" },
          },
          {
            id: "footer-2",
            type: "html",
            content: {
              html: `<footer class="footer"><p>© 2025 Creative Agency</p></footer>`,
              showPreview: true,
            },
            styles: {
              backgroundColor: "#1f2937",
              textColor: "#ffffff",
              padding: "40px 20px",
            },
          },
        ],
      },
      // Template 3: SaaS Product
      "saas-product": {
        title: "SaaS Product Landing",
        slug: "saas-product-landing",
        excerpt: "Perfect for SaaS and software products",
        sections: [
          {
            id: "hero-3",
            type: "hero",
            variant: "split",
            content: {
              heading: "The All-in-One Platform",
              subheading: "Streamline your workflow with powerful automation",
              ctaText: "Start Free Trial",
              ctaLink: "#signup",
            },
            styles: {
              backgroundColor: "#0ea5e9",
              textColor: "#ffffff",
              padding: "120px 20px",
            },
          },
          {
            id: "about-3",
            type: "html",
            content: {
              html: `<div class="about-section"><h2>Why Choose Us</h2><p>Join 10,000+ teams who trust our platform to get work done faster and more efficiently.</p></div>`,
              showPreview: true,
            },
            styles: { backgroundColor: "#ffffff", padding: "80px 20px" },
          },
          {
            id: "portfolio-3",
            type: "stats",
            content: {
              stats: [
                { value: "10K+", label: "Active Users" },
                { value: "99.9%", label: "Uptime" },
                { value: "24/7", label: "Support" },
              ],
            },
            styles: { backgroundColor: "#f0f9ff", padding: "60px 20px" },
          },
          {
            id: "services-3",
            type: "features",
            variant: "grid-3col",
            content: {
              title: "Powerful Features",
              features: [
                {
                  icon: "⚡",
                  title: "Fast",
                  description: "Lightning-fast performance",
                },
                {
                  icon: "🔒",
                  title: "Secure",
                  description: "Bank-level security",
                },
                {
                  icon: "📊",
                  title: "Analytics",
                  description: "Detailed insights",
                },
              ],
            },
            styles: { backgroundColor: "#ffffff", padding: "80px 20px" },
          },
          {
            id: "cta-3",
            type: "cta",
            content: {
              title: "Start Your Free 14-Day Trial",
              description: "No credit card required",
              buttonText: "Get Started",
              buttonLink: "#signup",
            },
            styles: {
              backgroundColor: "#0ea5e9",
              textColor: "#ffffff",
              padding: "60px 20px",
            },
          },
          {
            id: "testimonials-3",
            type: "testimonials",
            content: {
              title: "Loved by Teams",
              testimonials: [
                {
                  quote: "Game-changer for our productivity!",
                  author: "Alex Turner",
                  role: "CTO",
                  rating: 5,
                },
              ],
            },
            styles: { backgroundColor: "#f0f9ff", padding: "80px 20px" },
          },
          {
            id: "form-3",
            type: "form",
            content: { title: "Contact Sales", formId: null },
            styles: { backgroundColor: "#ffffff", padding: "80px 20px" },
          },
          {
            id: "footer-3",
            type: "html",
            content: {
              html: `<footer class="footer"><p>© 2025 SaaS Company</p></footer>`,
              showPreview: true,
            },
            styles: {
              backgroundColor: "#0f172a",
              textColor: "#ffffff",
              padding: "40px 20px",
            },
          },
        ],
      },
      // Template 4: Professional Services
      "professional-services": {
        title: "Professional Services Landing",
        slug: "professional-services-landing",
        excerpt: "For consultants and service providers",
        sections: [
          {
            id: "hero-4",
            type: "hero",
            variant: "centered",
            content: {
              heading: "Expert Consulting Services",
              subheading: "Strategic guidance for business growth",
              ctaText: "Book Consultation",
              ctaLink: "#contact",
            },
            styles: {
              backgroundColor: "#1e40af",
              textColor: "#ffffff",
              padding: "120px 20px",
            },
          },
          {
            id: "about-4",
            type: "html",
            content: {
              html: `<div class="about-section"><h2>About Us</h2><p>25+ years of combined experience helping businesses achieve sustainable growth and operational excellence.</p></div>`,
              showPreview: true,
            },
            styles: { backgroundColor: "#ffffff", padding: "80px 20px" },
          },
          {
            id: "portfolio-4",
            type: "html",
            content: {
              html: `<div class="portfolio-section"><h2>Case Studies</h2><p>Real results for real businesses</p></div>`,
              showPreview: true,
            },
            styles: { backgroundColor: "#eff6ff", padding: "80px 20px" },
          },
          {
            id: "services-4",
            type: "features",
            variant: "grid-3col",
            content: {
              title: "Our Expertise",
              features: [
                {
                  icon: "📈",
                  title: "Strategy",
                  description: "Business strategy consulting",
                },
                {
                  icon: "💼",
                  title: "Operations",
                  description: "Process optimization",
                },
                {
                  icon: "🎯",
                  title: "Growth",
                  description: "Scaling and expansion",
                },
              ],
            },
            styles: { backgroundColor: "#ffffff", padding: "80px 20px" },
          },
          {
            id: "cta-4",
            type: "cta",
            content: {
              title: "Ready to Grow Your Business?",
              description: "Schedule a free consultation",
              buttonText: "Get Started",
              buttonLink: "#contact",
            },
            styles: {
              backgroundColor: "#1e40af",
              textColor: "#ffffff",
              padding: "60px 20px",
            },
          },
          {
            id: "testimonials-4",
            type: "testimonials",
            content: {
              title: "Client Results",
              testimonials: [
                {
                  quote: "Revenue increased by 150% in 6 months!",
                  author: "Robert Kim",
                  role: "CEO",
                  rating: 5,
                },
              ],
            },
            styles: { backgroundColor: "#eff6ff", padding: "80px 20px" },
          },
          {
            id: "form-4",
            type: "form",
            content: { title: "Schedule a Call", formId: null },
            styles: { backgroundColor: "#ffffff", padding: "80px 20px" },
          },
          {
            id: "footer-4",
            type: "html",
            content: {
              html: `<footer class="footer"><p>© 2025 Professional Services</p></footer>`,
              showPreview: true,
            },
            styles: {
              backgroundColor: "#1f2937",
              textColor: "#ffffff",
              padding: "40px 20px",
            },
          },
        ],
      },
      // Template 5: E-Commerce
      "ecommerce-landing": {
        title: "E-Commerce Product Landing",
        slug: "ecommerce-landing",
        excerpt: "Product showcase and sales landing page",
        sections: [
          {
            id: "hero-5",
            type: "hero",
            variant: "split",
            content: {
              heading: "Premium Quality Products",
              subheading: "Shop the latest collection with free shipping",
              ctaText: "Shop Now",
              ctaLink: "#products",
            },
            styles: {
              backgroundColor: "#ec4899",
              textColor: "#ffffff",
              padding: "120px 20px",
            },
          },
          {
            id: "about-5",
            type: "html",
            content: {
              html: `<div class="about-section"><h2>Why Shop With Us</h2><p>Quality guaranteed, fast shipping, 30-day returns, and exceptional customer service.</p></div>`,
              showPreview: true,
            },
            styles: { backgroundColor: "#ffffff", padding: "80px 20px" },
          },
          {
            id: "portfolio-5",
            type: "html",
            content: {
              html: `<div class="portfolio-section"><h2>Featured Products</h2><div class="portfolio-grid"><div class="portfolio-item"><img src="/api/placeholder/400/300"/><h3>Product 1</h3><p>$99.99</p></div></div></div>`,
              showPreview: true,
            },
            styles: { backgroundColor: "#fdf2f8", padding: "80px 20px" },
          },
          {
            id: "services-5",
            type: "features",
            variant: "grid-3col",
            content: {
              title: "Our Promise",
              features: [
                {
                  icon: "🚚",
                  title: "Free Shipping",
                  description: "On orders over $50",
                },
                {
                  icon: "🔄",
                  title: "Easy Returns",
                  description: "30-day money-back",
                },
                {
                  icon: "⭐",
                  title: "Top Quality",
                  description: "Premium materials",
                },
              ],
            },
            styles: { backgroundColor: "#ffffff", padding: "80px 20px" },
          },
          {
            id: "cta-5",
            type: "cta",
            content: {
              title: "Limited Time Offer",
              description: "Get 20% off your first order",
              buttonText: "Shop Now",
              buttonLink: "#products",
            },
            styles: {
              backgroundColor: "#ec4899",
              textColor: "#ffffff",
              padding: "60px 20px",
            },
          },
          {
            id: "testimonials-5",
            type: "testimonials",
            content: {
              title: "Happy Customers",
              testimonials: [
                {
                  quote: "Best purchase I've made this year!",
                  author: "Emma Davis",
                  role: "Verified Buyer",
                  rating: 5,
                },
              ],
            },
            styles: { backgroundColor: "#fdf2f8", padding: "80px 20px" },
          },
          {
            id: "form-5",
            type: "form",
            content: { title: "Stay Updated", formId: null },
            styles: { backgroundColor: "#ffffff", padding: "80px 20px" },
          },
          {
            id: "footer-5",
            type: "html",
            content: {
              html: `<footer class="footer"><p>© 2025 E-Commerce Store</p></footer>`,
              showPreview: true,
            },
            styles: {
              backgroundColor: "#1f2937",
              textColor: "#ffffff",
              padding: "40px 20px",
            },
          },
        ],
      },
    };

    const templateData =
      templates[templateId] || templates["complete-business"];
    setFormData({
      ...formData,
      title: templateData.title,
      slug: templateData.slug,
      excerpt: templateData.excerpt,
    });
    setSections(templateData.sections);
  };

  const handleSave = async (publishNow = false) => {
    setSaving(true);
    try {
      const dataToSave = {
        ...formData,
        content: JSON.stringify({
          sections,
          globalStyles,
          version: "2.0",
        }),
        status: publishNow ? "published" : formData.status,
      };

      if (id) {
        await api.put(`/pages/${id}`, dataToSave);
        setToast({
          type: "success",
          message: "Landing page updated successfully!",
        });
      } else {
        const response = await api.post("/pages", dataToSave);
        setToast({
          type: "success",
          message: "Landing page created successfully!",
        });
        setTimeout(() => navigate("/admin/landing-pages"), 1500);
      }
    } catch (error) {
      console.error("Failed to save landing page:", error);
      setToast({
        type: "error",
        message: error.response?.data?.message || "Failed to save landing page",
      });
    } finally {
      setSaving(false);
    }
  };

  const addSection = (type, variant = "default") => {
    const newSection = {
      id: `${type}-${Date.now()}`,
      type,
      variant,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type),
    };
    setSections([...sections, newSection]);
    setSelectedSectionId(newSection.id);
  };

  const getDefaultContent = (type) => {
    const defaults = {
      hero: {
        heading: "Your Compelling Headline",
        subheading: "A clear value proposition that converts",
        ctaText: "Get Started",
        ctaLink: "#",
        features: [],
      },
      features: {
        title: "Amazing Features",
        subtitle: "Everything you need in one place",
        features: [
          {
            icon: "⚡",
            title: "Feature 1",
            description: "Feature description",
          },
        ],
      },
      testimonials: {
        title: "What Our Customers Say",
        testimonials: [
          {
            quote: "This product changed everything for us!",
            author: "John Doe",
            role: "CEO at Company",
            avatar: "",
            rating: 5,
          },
        ],
      },
      cta: {
        title: "Ready to Get Started?",
        description: "Join thousands of satisfied customers",
        buttonText: "Start Your Free Trial",
        buttonLink: "#",
        note: "No credit card required",
      },
      pricing: {
        title: "Choose Your Plan",
        subtitle: "Flexible pricing for businesses of all sizes",
        plans: [
          {
            name: "Starter",
            price: "$29",
            period: "/month",
            features: ["Feature 1", "Feature 2", "Feature 3"],
            highlighted: false,
          },
        ],
      },
      stats: {
        stats: [
          { value: "10K+", label: "Users" },
          { value: "99%", label: "Satisfaction" },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        faqs: [{ question: "Question here?", answer: "Answer here..." }],
      },
      form: {
        title: "Get in Touch",
        formId: null,
        showTitle: true,
      },
      video: {
        title: "See It In Action",
        videoUrl: "",
        thumbnail: "",
        autoplay: false,
      },
      logos: {
        title: "Trusted By",
        logos: [],
      },
      html: {
        html: "<div class='custom-section'>\n  <h2>Custom HTML Section</h2>\n  <p>Add your HTML here...</p>\n</div>",
        css: "/* Custom CSS */\n.custom-section {\n  padding: 40px;\n  text-align: center;\n}",
        showPreview: true,
      },
      code: {
        html: "<!-- HTML Code -->\n<div class='code-section'>\n  <h2>Your Content</h2>\n</div>",
        css: "/* CSS Styles */\n.code-section {\n  padding: 60px 20px;\n}",
        js: "// JavaScript\nconsole.log('Custom code section loaded');",
        showPreview: true,
      },
    };
    return defaults[type] || {};
  };

  const getDefaultStyles = (type) => {
    return {
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
      padding: "80px 20px",
      alignment: "center",
    };
  };

  const updateSection = (sectionId, updates) => {
    setSections(
      sections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s))
    );
  };

  const deleteSection = (sectionId) => {
    if (window.confirm("Delete this section?")) {
      setSections(sections.filter((s) => s.id !== sectionId));
      setSelectedSectionId(null);
    }
  };

  const duplicateSection = (sectionId) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      const newSection = {
        ...section,
        id: `${section.type}-${Date.now()}`,
      };
      const index = sections.findIndex((s) => s.id === sectionId);
      const newSections = [...sections];
      newSections.splice(index + 1, 0, newSection);
      setSections(newSections);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);
  };

  const exportLandingPage = () => {
    const data = {
      page: formData,
      sections,
      globalStyles,
      version: "2.0",
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.slug || "landing-page"}.json`;
    a.click();
  };

  const importLandingPage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.sections) setSections(data.sections);
          if (data.globalStyles) setGlobalStyles(data.globalStyles);
          if (data.page) setFormData({ ...formData, ...data.page });
          setToast({
            type: "success",
            message: "Landing page imported successfully!",
          });
        } catch (error) {
          setToast({ type: "error", message: "Invalid file format" });
        }
      };
      reader.readAsText(file);
    }
  };

  const advancedSectionTypes = [
    {
      type: "hero",
      icon: "🎯",
      label: "Hero Section",
      variants: ["centered", "split", "video"],
    },
    {
      type: "features",
      icon: "⭐",
      label: "Features",
      variants: ["grid-3col", "grid-4col", "alternating"],
    },
    {
      type: "testimonials",
      icon: "💬",
      label: "Testimonials",
      variants: ["slider", "grid", "featured"],
    },
    {
      type: "stats",
      icon: "📊",
      label: "Stats/Numbers",
      variants: ["horizontal", "grid", "animated"],
    },
    {
      type: "cta",
      icon: "📢",
      label: "Call to Action",
      variants: ["simple", "boxed", "full-width"],
    },
    {
      type: "pricing",
      icon: "💰",
      label: "Pricing Table",
      variants: ["3-column", "comparison", "toggle"],
    },
    {
      type: "faq",
      icon: "❓",
      label: "FAQ Accordion",
      variants: ["simple", "two-column"],
    },
    {
      type: "form",
      icon: "📋",
      label: "Contact Form",
      variants: ["inline", "modal"],
    },
    {
      type: "video",
      icon: "🎥",
      label: "Video Section",
      variants: ["embedded", "popup"],
    },
    {
      type: "logos",
      icon: "🏢",
      label: "Logo Showcase",
      variants: ["marquee", "grid"],
    },
    {
      type: "countdown",
      icon: "⏰",
      label: "Countdown Timer",
      variants: ["simple", "flip"],
    },
    {
      type: "team",
      icon: "👥",
      label: "Team Members",
      variants: ["grid", "carousel"],
    },
    {
      type: "html",
      icon: "💻",
      label: "Custom HTML",
      variants: ["html", "react"],
    },
    {
      type: "code",
      icon: "📝",
      label: "Custom Code",
      variants: ["html-css-js", "react-component"],
    },
  ];

  const selectedSection = sections.find((s) => s.id === selectedSectionId);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>{id ? "Edit" : "Create"} Landing Page - Advanced Builder</title>
      </Helmet>

      {/* Full-Screen Code Editor Modal */}
      {showCodeEditor &&
        selectedSection &&
        (selectedSection.type === "html" ||
          selectedSection.type === "code") && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Code Editor -{" "}
                    {selectedSection.type === "html"
                      ? "Custom HTML"
                      : "Custom Code"}
                  </h3>
                  <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setCodeEditorMode("html")}
                      className={`px-3 py-1.5 text-sm rounded transition ${
                        codeEditorMode === "html"
                          ? "bg-white text-gray-900 shadow"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      HTML
                    </button>
                    <button
                      onClick={() => setCodeEditorMode("css")}
                      className={`px-3 py-1.5 text-sm rounded transition ${
                        codeEditorMode === "css"
                          ? "bg-white text-gray-900 shadow"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      CSS
                    </button>
                    {selectedSection.type === "code" && (
                      <button
                        onClick={() => setCodeEditorMode("js")}
                        className={`px-3 py-1.5 text-sm rounded transition ${
                          codeEditorMode === "js"
                            ? "bg-white text-gray-900 shadow"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        JavaScript
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedSection.content.showPreview || false}
                      onChange={(e) =>
                        updateSection(selectedSection.id, {
                          content: {
                            ...selectedSection.content,
                            showPreview: e.target.checked,
                          },
                        })
                      }
                      className="rounded"
                    />
                    <span className="text-gray-700">Live Preview</span>
                  </label>
                  <button
                    onClick={() => setShowCodeEditor(false)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Done
                  </button>
                </div>
              </div>

              {/* Modal Body - Split View */}
              <div className="flex-1 flex overflow-hidden">
                {/* Code Editor Side */}
                <div className="flex-1 flex flex-col border-r border-gray-200">
                  <div className="flex-1 p-4 overflow-hidden">
                    {codeEditorMode === "html" && (
                      <textarea
                        value={selectedSection.content.html || ""}
                        onChange={(e) =>
                          updateSection(selectedSection.id, {
                            content: {
                              ...selectedSection.content,
                              html: e.target.value,
                            },
                          })
                        }
                        className="w-full h-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-mono bg-gray-900 text-green-400 resize-none"
                        placeholder="<div>Your HTML code...</div>"
                        spellCheck={false}
                      />
                    )}
                    {codeEditorMode === "css" && (
                      <textarea
                        value={selectedSection.content.css || ""}
                        onChange={(e) =>
                          updateSection(selectedSection.id, {
                            content: {
                              ...selectedSection.content,
                              css: e.target.value,
                            },
                          })
                        }
                        className="w-full h-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-mono bg-gray-900 text-blue-400 resize-none"
                        placeholder="/* Your CSS styles... */\n.custom-class {\n  color: #333;\n}"
                        spellCheck={false}
                      />
                    )}
                    {codeEditorMode === "js" &&
                      selectedSection.type === "code" && (
                        <textarea
                          value={selectedSection.content.js || ""}
                          onChange={(e) =>
                            updateSection(selectedSection.id, {
                              content: {
                                ...selectedSection.content,
                                js: e.target.value,
                              },
                            })
                          }
                          className="w-full h-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-mono bg-gray-900 text-yellow-400 resize-none"
                          placeholder="// Your JavaScript code...\nconsole.log('Hello!');"
                          spellCheck={false}
                        />
                      )}
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="font-medium mb-1">Tips:</p>
                        <ul className="space-y-0.5">
                          <li>• Use Tailwind CSS classes for quick styling</li>
                          <li>
                            • Enable "Live Preview" to see changes in real-time
                          </li>
                          <li>• Test your code in different preview modes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Preview Side */}
                {selectedSection.content.showPreview && (
                  <div className="flex-1 flex flex-col bg-white">
                    <div className="p-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
                      Live Preview
                    </div>
                    <div className="flex-1 overflow-auto p-6">
                      <style
                        dangerouslySetInnerHTML={{
                          __html: selectedSection.content.css || "",
                        }}
                      />
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedSection.content.html || "",
                        }}
                        className="custom-html-preview"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      {/* Top Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/landing-pages")}
            className="text-gray-600 hover:text-gray-900 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {formData.title || "Untitled Landing Page"}
            </h1>
            <p className="text-xs text-gray-500">
              {id ? "Editing" : "Creating"} • Last saved: Just now
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Preview Mode Switcher */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`px-3 py-1.5 rounded text-sm transition ${
                previewMode === "desktop"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setPreviewMode("tablet")}
              className={`px-3 py-1.5 rounded text-sm transition ${
                previewMode === "tablet"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`px-3 py-1.5 rounded text-sm transition ${
                previewMode === "mobile"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>

          {/* Actions */}
          <button
            onClick={exportLandingPage}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            Export
          </button>
          <label className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition cursor-pointer">
            Import
            <input
              type="file"
              accept=".json"
              onChange={importLandingPage}
              className="hidden"
            />
          </label>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-6 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <Spinner size="sm" /> : null}
            Publish
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Sections & Settings */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          {/* Panel Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActivePanel("sections")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                activePanel === "sections"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sections
            </button>
            <button
              onClick={() => setActivePanel("settings")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                activePanel === "settings"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => setActivePanel("styles")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition ${
                activePanel === "styles"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Styles
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activePanel === "sections" && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Add Sections
                </h3>
                {advancedSectionTypes.map((sectionType) => (
                  <div key={sectionType.type} className="group">
                    <button
                      onClick={() =>
                        addSection(sectionType.type, sectionType.variants[0])
                      }
                      className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition text-left"
                    >
                      <span className="text-2xl">{sectionType.icon}</span>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                        {sectionType.label}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activePanel === "settings" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.meta_title}
                    onChange={(e) =>
                      setFormData({ ...formData, meta_title: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.meta_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        meta_description: e.target.value,
                      })
                    }
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
            )}

            {activePanel === "styles" && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Global Styles
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    value={globalStyles.primaryColor}
                    onChange={(e) =>
                      setGlobalStyles({
                        ...globalStyles,
                        primaryColor: e.target.value,
                      })
                    }
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    value={globalStyles.secondaryColor}
                    onChange={(e) =>
                      setGlobalStyles({
                        ...globalStyles,
                        secondaryColor: e.target.value,
                      })
                    }
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Family
                  </label>
                  <select
                    value={globalStyles.fontFamily}
                    onChange={(e) =>
                      setGlobalStyles({
                        ...globalStyles,
                        fontFamily: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center - Canvas with Sections */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
          <div
            className={`mx-auto bg-white shadow-xl transition-all ${
              previewMode === "mobile"
                ? "max-w-sm"
                : previewMode === "tablet"
                ? "max-w-2xl"
                : "max-w-6xl"
            }`}
            style={{ minHeight: "100vh" }}
          >
            {sections.length === 0 ? (
              <div className="flex items-center justify-center h-96 text-center p-8">
                <div>
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Start Building
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Add sections from the left panel to start creating your
                    landing page
                  </p>
                </div>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {sections.map((section, index) => (
                        <Draggable
                          key={section.id}
                          draggableId={section.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`relative group ${
                                snapshot.isDragging ? "opacity-50" : ""
                              } ${
                                selectedSectionId === section.id
                                  ? "ring-2 ring-purple-500"
                                  : ""
                              }`}
                              onClick={() => setSelectedSectionId(section.id)}
                            >
                              {/* Section Controls */}
                              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button
                                  {...provided.dragHandleProps}
                                  className="p-2 bg-white rounded shadow hover:bg-gray-50"
                                  title="Drag to reorder"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 8h16M4 16h16"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    duplicateSection(section.id);
                                  }}
                                  className="p-2 bg-white rounded shadow hover:bg-gray-50"
                                  title="Duplicate"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteSection(section.id);
                                  }}
                                  className="p-2 bg-white rounded shadow hover:bg-red-50 text-red-600"
                                  title="Delete"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              </div>

                              {/* Section Content - Render Preview */}
                              <div
                                style={{
                                  backgroundColor:
                                    section.styles?.backgroundColor,
                                  color: section.styles?.textColor,
                                  padding: section.styles?.padding,
                                  textAlign: section.styles?.alignment,
                                }}
                              >
                                {/* Simplified preview rendering */}
                                {section.type === "hero" && (
                                  <div className="py-20">
                                    <h1 className="text-4xl font-bold mb-4">
                                      {section.content.heading}
                                    </h1>
                                    <p className="text-xl mb-6">
                                      {section.content.subheading}
                                    </p>
                                    <button className="px-8 py-3 bg-purple-600 text-white rounded-lg">
                                      {section.content.ctaText}
                                    </button>
                                  </div>
                                )}

                                {section.type === "features" && (
                                  <div className="py-16">
                                    <h2 className="text-3xl font-bold mb-8">
                                      {section.content.title}
                                    </h2>
                                    <div className="grid grid-cols-3 gap-8">
                                      {section.content.features?.map(
                                        (feature, idx) => (
                                          <div
                                            key={idx}
                                            className="text-center"
                                          >
                                            <div className="text-4xl mb-4">
                                              {feature.icon}
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">
                                              {feature.title}
                                            </h3>
                                            <p className="text-gray-600">
                                              {feature.description}
                                            </p>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}

                                {section.type === "cta" && (
                                  <div className="py-16">
                                    <h2 className="text-3xl font-bold mb-4">
                                      {section.content.title}
                                    </h2>
                                    <p className="text-xl mb-6 text-gray-600">
                                      {section.content.description}
                                    </p>
                                    <button className="px-8 py-3 bg-purple-600 text-white rounded-lg text-lg font-semibold">
                                      {section.content.buttonText}
                                    </button>
                                  </div>
                                )}

                                {section.type === "stats" && (
                                  <div className="py-12">
                                    <div className="grid grid-cols-4 gap-8">
                                      {section.content.stats?.map(
                                        (stat, idx) => (
                                          <div
                                            key={idx}
                                            className="text-center"
                                          >
                                            <div className="text-4xl font-bold mb-2">
                                              {stat.value}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                              {stat.label}
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}

                                {(section.type === "html" ||
                                  section.type === "code") &&
                                  section.content.showPreview && (
                                    <div className="relative">
                                      <style
                                        dangerouslySetInnerHTML={{
                                          __html: section.content.css || "",
                                        }}
                                      />
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: section.content.html || "",
                                        }}
                                        className="custom-html-preview"
                                      />
                                      {section.content.js && (
                                        <script
                                          dangerouslySetInnerHTML={{
                                            __html: section.content.js,
                                          }}
                                        />
                                      )}
                                    </div>
                                  )}

                                {(section.type === "html" ||
                                  section.type === "code") &&
                                  !section.content.showPreview && (
                                    <div className="py-12 text-center bg-gray-50">
                                      <div className="text-4xl mb-3">💻</div>
                                      <p className="text-gray-600">
                                        Custom Code Section
                                      </p>
                                      <p className="text-sm text-gray-500 mt-2">
                                        Enable preview to see live output
                                      </p>
                                    </div>
                                  )}

                                {/* Fallback for other section types */}
                                {![
                                  "hero",
                                  "features",
                                  "cta",
                                  "stats",
                                  "html",
                                  "code",
                                ].includes(section.type) && (
                                  <div className="py-12 text-center">
                                    <div className="text-4xl mb-3">
                                      {advancedSectionTypes.find(
                                        (t) => t.type === section.type
                                      )?.icon || "📄"}
                                    </div>
                                    <p className="text-gray-600 font-medium capitalize">
                                      {section.type} Section
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">
                                      Preview coming soon...
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </div>

        {/* Right Sidebar - Section Editor */}
        {selectedSection && (
          <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Edit {selectedSection.type}
              </h3>
              <button
                onClick={() => setSelectedSectionId(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Dynamic section editor based on type */}
            <div className="space-y-4">
              {selectedSection.type === "hero" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heading
                    </label>
                    <input
                      type="text"
                      value={selectedSection.content.heading || ""}
                      onChange={(e) =>
                        updateSection(selectedSection.id, {
                          content: {
                            ...selectedSection.content,
                            heading: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subheading
                    </label>
                    <textarea
                      value={selectedSection.content.subheading || ""}
                      onChange={(e) =>
                        updateSection(selectedSection.id, {
                          content: {
                            ...selectedSection.content,
                            subheading: e.target.value,
                          },
                        })
                      }
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CTA Text
                      </label>
                      <input
                        type="text"
                        value={selectedSection.content.ctaText || ""}
                        onChange={(e) =>
                          updateSection(selectedSection.id, {
                            content: {
                              ...selectedSection.content,
                              ctaText: e.target.value,
                            },
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CTA Link
                      </label>
                      <input
                        type="text"
                        value={selectedSection.content.ctaLink || ""}
                        onChange={(e) =>
                          updateSection(selectedSection.id, {
                            content: {
                              ...selectedSection.content,
                              ctaLink: e.target.value,
                            },
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Custom HTML/Code Editor */}
              {(selectedSection.type === "html" ||
                selectedSection.type === "code") && (
                <>
                  {/* Full-Screen Editor Button */}
                  <button
                    onClick={() => {
                      setShowCodeEditor(true);
                      setCodeEditorMode("html");
                    }}
                    className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center justify-center gap-2 font-medium"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                    Open Full-Screen Code Editor
                  </button>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        HTML Code
                      </label>
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={selectedSection.content.showPreview || false}
                          onChange={(e) =>
                            updateSection(selectedSection.id, {
                              content: {
                                ...selectedSection.content,
                                showPreview: e.target.checked,
                              },
                            })
                          }
                          className="rounded"
                        />
                        <span className="text-gray-600">Live Preview</span>
                      </label>
                    </div>
                    <textarea
                      value={selectedSection.content.html || ""}
                      onChange={(e) =>
                        updateSection(selectedSection.id, {
                          content: {
                            ...selectedSection.content,
                            html: e.target.value,
                          },
                        })
                      }
                      rows={8}
                      placeholder="<div>Your HTML code...</div>"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono bg-gray-50"
                      spellCheck={false}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CSS Styles
                    </label>
                    <textarea
                      value={selectedSection.content.css || ""}
                      onChange={(e) =>
                        updateSection(selectedSection.id, {
                          content: {
                            ...selectedSection.content,
                            css: e.target.value,
                          },
                        })
                      }
                      rows={6}
                      placeholder="/* Your CSS styles... */\n.custom-class {\n  color: #333;\n}"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono bg-gray-50"
                      spellCheck={false}
                    />
                  </div>

                  {selectedSection.type === "code" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        JavaScript
                      </label>
                      <textarea
                        value={selectedSection.content.js || ""}
                        onChange={(e) =>
                          updateSection(selectedSection.id, {
                            content: {
                              ...selectedSection.content,
                              js: e.target.value,
                            },
                          })
                        }
                        rows={6}
                        placeholder="// Your JavaScript code...\nconsole.log('Hello!');"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono bg-gray-50"
                        spellCheck={false}
                      />
                      <p className="text-xs text-amber-600 mt-1 flex items-start gap-1">
                        <svg
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          Use with caution. JavaScript will execute on the page.
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Code Templates */}
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <h5 className="text-xs font-semibold text-purple-900 mb-2 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                        />
                      </svg>
                      Quick Insert Templates
                    </h5>
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          updateSection(selectedSection.id, {
                            content: {
                              ...selectedSection.content,
                              html: '<div class="container mx-auto px-4 py-16">\n  <div class="text-center">\n    <h2 class="text-4xl font-bold mb-4">Your Heading</h2>\n    <p class="text-xl text-gray-600">Your description here</p>\n  </div>\n</div>',
                              css: ".container {\n  max-width: 1200px;\n}",
                            },
                          });
                        }}
                        className="w-full text-left px-3 py-2 text-xs bg-white hover:bg-purple-50 rounded border border-purple-200 hover:border-purple-300 transition"
                      >
                        📝 Basic Section Template
                      </button>
                      <button
                        onClick={() => {
                          updateSection(selectedSection.id, {
                            content: {
                              ...selectedSection.content,
                              html: '<div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">\n  <div class="text-center p-6 bg-white rounded-lg shadow">\n    <div class="text-4xl mb-4">🎯</div>\n    <h3 class="text-xl font-bold mb-2">Feature One</h3>\n    <p class="text-gray-600">Description here</p>\n  </div>\n  <div class="text-center p-6 bg-white rounded-lg shadow">\n    <div class="text-4xl mb-4">⚡</div>\n    <h3 class="text-xl font-bold mb-2">Feature Two</h3>\n    <p class="text-gray-600">Description here</p>\n  </div>\n  <div class="text-center p-6 bg-white rounded-lg shadow">\n    <div class="text-4xl mb-4">🚀</div>\n    <h3 class="text-xl font-bold mb-2">Feature Three</h3>\n    <p class="text-gray-600">Description here</p>\n  </div>\n</div>',
                            },
                          });
                        }}
                        className="w-full text-left px-3 py-2 text-xs bg-white hover:bg-purple-50 rounded border border-purple-200 hover:border-purple-300 transition"
                      >
                        ⭐ 3-Column Feature Grid
                      </button>
                      <button
                        onClick={() => {
                          updateSection(selectedSection.id, {
                            content: {
                              ...selectedSection.content,
                              html: '<div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-pink-600">\n  <div class="text-center text-white">\n    <h1 class="text-6xl font-bold mb-4">Coming Soon</h1>\n    <p class="text-2xl mb-8">Something amazing is on the way!</p>\n    <button class="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Notify Me</button>\n  </div>\n</div>',
                            },
                          });
                        }}
                        className="w-full text-left px-3 py-2 text-xs bg-white hover:bg-purple-50 rounded border border-purple-200 hover:border-purple-300 transition"
                      >
                        ⏰ Coming Soon Section
                      </button>
                      <button
                        onClick={() => {
                          updateSection(selectedSection.id, {
                            content: {
                              ...selectedSection.content,
                              html: '<div class="relative overflow-hidden">\n  <video autoplay loop muted playsinline class="w-full h-full object-cover">\n    <source src="your-video.mp4" type="video/mp4">\n  </video>\n  <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">\n    <div class="text-center text-white">\n      <h2 class="text-5xl font-bold mb-4">Video Background</h2>\n      <p class="text-xl">Add your message here</p>\n    </div>\n  </div>\n</div>',
                              css: ".relative {\n  min-height: 600px;\n}",
                            },
                          });
                        }}
                        className="w-full text-left px-3 py-2 text-xs bg-white hover:bg-purple-50 rounded border border-purple-200 hover:border-purple-300 transition"
                      >
                        🎥 Video Background Hero
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h5 className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Tips
                    </h5>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Use Tailwind CSS classes for styling</li>
                      <li>• Include inline styles for custom designs</li>
                      <li>• Toggle "Live Preview" to see changes</li>
                      <li>• Test responsiveness in preview modes</li>
                      <li>• Use templates above for quick start</li>
                    </ul>
                  </div>
                </>
              )}

              {/* Section Styles */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Section Styles
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={
                        selectedSection.styles?.backgroundColor || "#ffffff"
                      }
                      onChange={(e) =>
                        updateSection(selectedSection.id, {
                          styles: {
                            ...selectedSection.styles,
                            backgroundColor: e.target.value,
                          },
                        })
                      }
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Color
                    </label>
                    <input
                      type="color"
                      value={selectedSection.styles?.textColor || "#1f2937"}
                      onChange={(e) =>
                        updateSection(selectedSection.id, {
                          styles: {
                            ...selectedSection.styles,
                            textColor: e.target.value,
                          },
                        })
                      }
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
