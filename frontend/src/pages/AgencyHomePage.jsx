import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from "axios";
import { PricingCard, VideoCard, TestimonialCard } from "../components/agency";

const AgencyHomePage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    // Scroll reveal animations
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoadingBlogs(true);
        console.log(
          "🔄 Fetching blog posts from /api/blog?limit=4&published=true"
        );
        const response = await axios.get("/api/blog?limit=4&published=true");

        console.log("📦 Full API Response:", response.data);
        console.log("📊 Total posts in DB:", response.data.total);
        console.log("📝 Posts array:", response.data.posts);

        const posts = response.data.posts || [];
        console.log("📌 Posts length:", posts.length);

        if (posts && posts.length > 0) {
          // Set featured post (first/latest one)
          setFeaturedPost(posts[0]);
          console.log("⭐ Featured Post set:", posts[0]);
          console.log("🖼️ Featured Image URL:", posts[0].featured_image);
          console.log("📂 Featured Category:", posts[0].category);

          // Set remaining posts (up to 3)
          const remaining = posts.slice(1, 4);
          setBlogPosts(remaining);
          console.log("🃏 Blog Cards set:", remaining);
          console.log("🃏 Blog Cards length:", remaining.length);
        } else {
          console.warn("⚠️ No blog posts found! Posts array is empty.");
          console.warn(
            "⚠️ Check if you have published blog posts in your database."
          );
        }
      } catch (error) {
        console.error("❌ Error fetching blog posts:", error);
        console.error("❌ Error response:", error.response?.data);
      } finally {
        setLoadingBlogs(false);
        console.log("✅ Blog loading complete. Loading state:", false);
      }
    };

    fetchBlogPosts();
  }, []);

  const videoProjects = [
    {
      id: 1,
      category: "ugc",
      title: "D2C Skincare Brand",
      description: "+340% engagement rate",
      videoUrl: "/Videos/Aipowered_marketing_that_202512030055.mp4",
      stats: { views: "500K+", engagement: "12%" },
    },
    {
      id: 2,
      category: "ugc",
      title: "EdTech Platform",
      description: "50K+ views in 48 hours",
      videoUrl: "/Videos/Human__ai_202512030122.mp4",
      stats: { views: "250K+", engagement: "18%" },
    },
    {
      id: 3,
      category: "ugc",
      title: "E-commerce Store",
      description: "₹2.4L revenue generated",
      videoUrl: "/Videos/Prompt_a_continuous_202512030141_621eq.mp4",
      stats: { views: "800K+", engagement: "15%" },
    },
    {
      id: 4,
      category: "campaigns",
      title: "AI Marketing Campaign",
      description: "Dynamic visual storytelling",
      videoUrl: "/Videos/Scene_1_the_202512030138_1ir2h.mp4",
      stats: { views: "350K+", engagement: "14%" },
    },
    {
      id: 5,
      category: "ugc",
      title: "Tech Startup Launch",
      description: "1M+ impressions in launch week",
      videoUrl: "/Videos/Aipowered_marketing_that_202512030052_7xdiu.mp4",
      stats: { views: "1M+", engagement: "16%" },
    },
    {
      id: 6,
      category: "campaigns",
      title: "Brand Awareness Drive",
      description: "2x conversion rate improvement",
      videoUrl: "/Videos/Human__ai_202512030102_bdcnz.mp4",
      stats: { views: "450K+", engagement: "13%" },
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? videoProjects
      : videoProjects.filter((p) => p.category.toLowerCase() === activeFilter);

  return (
    <>
      <Helmet>
        <title>
          Harsh Ranjan - AI-Powered Marketing Agency | UGC Content, Automation &
          Campaigns
        </title>
        <meta
          name="description"
          content="Transform your brand with AI-powered UGC content, marketing automation, and campaign management. Complete marketing solutions for Indian businesses."
        />
        <meta
          name="keywords"
          content="AI marketing, UGC content, marketing automation, campaign management, digital marketing india"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-12 animated-gradient min-h-screen flex items-center relative overflow-hidden">
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
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-cyan rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white">
                  AI-Powered Marketing Solutions
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black leading-tight font-display text-white">
                AI-Powered Marketing
                <br />
                <span className="gradient-text">That Actually Works</span>
                <br />
                for Indian Businesses
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed">
                From content creation to campaign automation - we handle your
                marketing so you can focus on growth. Complete AI-powered
                solutions for modern brands.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="gradient-button px-8 py-3 rounded-full text-white font-bold text-lg flex items-center justify-center space-x-2">
                  <span>Explore Services</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
                <button className="px-8 py-3 rounded-full text-white font-semibold border-2 border-white/30 hover:bg-white/10 transition flex items-center justify-center space-x-2">
                  <i className="fas fa-play-circle"></i>
                  <span>See Our Work</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <div className="text-2xl font-bold gradient-text">500+</div>
                  <div className="text-xs text-gray-400">Videos Created</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">₹2Cr+</div>
                  <div className="text-xs text-gray-400">Ad Spend Managed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">50+</div>
                  <div className="text-xs text-gray-400">Systems Built</div>
                </div>
              </div>
            </div>

            {/* Right Content - Video Preview */}
            <div className="relative">
              <div
                className="aspect-video bg-gradient-to-br from-purple/20 to-cyan/20 rounded-2xl overflow-hidden shadow-2xl float-animation border border-white/10 cursor-pointer group"
                onClick={() =>
                  setSelectedVideo({
                    title: "AI-Powered Marketing Demo",
                    videoUrl:
                      "/Videos/Aipowered_marketing_that_202512030055.mp4",
                  })
                }
              >
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source
                    src="/Videos/Aipowered_marketing_that_202512030055.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <i className="fas fa-play text-purple text-3xl ml-1"></i>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-chart-line text-cyan text-2xl"></i>
                  <div>
                    <div className="text-2xl font-bold text-white">+245%</div>
                    <div className="text-xs text-white/80">Avg. Engagement</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 glass-card p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-dollar-sign text-purple text-2xl"></i>
                  <div>
                    <div className="text-2xl font-bold text-white">₹8,000</div>
                    <div className="text-xs text-white/80">Cost Savings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos / Trust Bar */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Trusted by 50+ Growing Brands
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-gray-400">
                Brand Logo 1
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-gray-400">
                Brand Logo 2
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-gray-400">
                Brand Logo 3
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-gray-400">
                Brand Logo 4
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-gray-400">
                Brand Logo 5
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-2xl font-bold text-gray-400">
                Brand Logo 6
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
              Marketing{" "}
              <span className="gradient-text">Shouldn't Be This Hard</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Indian businesses face complex marketing challenges that drain
              resources and slow growth.
            </p>
            <p className="text-lg text-cyan font-semibold">
              We solve all of this with AI + expert strategy
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl text-center scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-rupee-sign text-3xl text-red-400"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-navy">
                Content creation costs ₹50k+/month
              </h3>
              <p className="text-gray-600">
                Hiring creators, videographers, and designers burns through your
                budget with inconsistent results.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-2xl text-center scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-cogs text-3xl text-yellow-400"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-navy">
                Campaigns run manually, waste time
              </h3>
              <p className="text-gray-600">
                Spending hours on repetitive tasks instead of strategic growth
                activities.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-2xl text-center scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-exclamation-triangle text-3xl text-purple-400"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-navy">
                No marketing systems in place
              </h3>
              <p className="text-gray-600">
                Missing automated funnels, email sequences, and lead nurturing
                workflows.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-2xl text-center scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              style={{ transitionDelay: "0.3s" }}
            >
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-users text-3xl text-orange-400"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-navy">
                Hiring a team costs ₹2L+/month
              </h3>
              <p className="text-gray-600">
                Full marketing teams are expensive and hard to manage for
                growing businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Core Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <div className="inline-flex items-center space-x-2 bg-purple/10 px-4 py-2 rounded-full mb-6">
              <i className="fas fa-rocket text-purple"></i>
              <span className="text-sm font-semibold text-purple">
                Complete Marketing Solutions
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
              Three Ways We{" "}
              <span className="gradient-text">Power Your Marketing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From content creation to campaign management - everything your
              business needs to grow.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Service 1: AI UGC Content Creation */}
            <div className="bg-gradient-card p-8 rounded-2xl scroll-reveal group shadow-lg border border-gray-200 hover:shadow-2xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-purple to-cyan rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-video text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-navy">
                AI UGC Content Creation
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Get authentic-looking UGC videos that drive conversions without
                the traditional creator costs.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-purple mt-1"></i>
                  <span className="text-sm text-gray-700">
                    Authentic-looking videos
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-purple mt-1"></i>
                  <span className="text-sm text-gray-700">
                    ₹4,999/month pricing
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-purple mt-1"></i>
                  <span className="text-sm text-gray-700">
                    48-hour delivery
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-purple mt-1"></i>
                  <span className="text-sm text-gray-700">
                    Multiple video formats
                  </span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-full border-2 border-purple text-purple hover:bg-purple hover:text-white transition font-semibold">
                Learn More
              </button>
            </div>

            {/* Service 2: Marketing Automation & Systems */}
            <div
              className="bg-gradient-card p-8 rounded-2xl scroll-reveal group shadow-lg border border-gray-200 hover:shadow-2xl transition-all"
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-cyan to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-cogs text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-navy">
                Marketing Automation & Systems
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Set up automated funnels, email sequences, and CRM systems that
                work 24/7 for your business.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-cyan mt-1"></i>
                  <span className="text-sm text-gray-700">
                    Email flows & sequences
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-cyan mt-1"></i>
                  <span className="text-sm text-gray-700">
                    CRM setup & management
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-cyan mt-1"></i>
                  <span className="text-sm text-gray-700">
                    Lead nurturing on autopilot
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-cyan mt-1"></i>
                  <span className="text-sm text-gray-700">
                    Sales funnel optimization
                  </span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-full border-2 border-cyan text-cyan hover:bg-cyan hover:text-white transition font-semibold">
                Learn More
              </button>
            </div>

            {/* Service 3: Campaign Management */}
            <div
              className="bg-gradient-card p-8 rounded-2xl scroll-reveal group shadow-lg border border-gray-200 hover:shadow-2xl transition-all"
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-chart-line text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-navy">
                Campaign Management
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Full-service ad management across all major platforms with
                data-driven optimization.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-coral mt-1"></i>
                  <span className="text-sm text-gray-700">
                    Ad strategy & planning
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-coral mt-1"></i>
                  <span className="text-sm text-gray-700">
                    Creative testing & optimization
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-coral mt-1"></i>
                  <span className="text-sm text-gray-700">
                    ROI tracking & reporting
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <i className="fas fa-check text-coral mt-1"></i>
                  <span className="text-sm text-gray-700">
                    Multi-platform management
                  </span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-full border-2 border-coral text-coral hover:bg-coral hover:text-white transition font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Work Portfolio Section */}
      <section id="work" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
              Work That <span className="gradient-text">Drives Results</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See examples from all three service areas - content, automation,
              and campaigns.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 scroll-reveal">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                activeFilter === "all"
                  ? "bg-purple text-white"
                  : "bg-white text-gray-600 hover:text-purple border border-gray-300"
              }`}
            >
              All Work
            </button>
            <button
              onClick={() => setActiveFilter("ugc")}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                activeFilter === "ugc"
                  ? "bg-purple text-white"
                  : "bg-white text-gray-600 hover:text-purple border border-gray-300"
              }`}
            >
              UGC Content
            </button>
            <button
              onClick={() => setActiveFilter("automation")}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                activeFilter === "automation"
                  ? "bg-cyan text-white"
                  : "bg-white text-gray-600 hover:text-cyan border border-gray-300"
              }`}
            >
              Automation
            </button>
            <button
              onClick={() => setActiveFilter("campaigns")}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                activeFilter === "campaigns"
                  ? "bg-coral text-white"
                  : "bg-white text-gray-600 hover:text-coral border border-gray-300"
              }`}
            >
              Campaigns
            </button>
          </div>

          <div className="min-h-[400px]">
            {/* Video Portfolio Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {filteredProjects.map((project) => (
                <VideoCard
                  key={project.id}
                  videoUrl={project.videoUrl}
                  title={project.title}
                  description={project.description}
                  category={project.category.toUpperCase()}
                  stats={project.stats}
                  onClick={() => setSelectedVideo(project)}
                />
              ))}
            </div>

            {/* Automation Systems Grid */}
            {(activeFilter === "all" || activeFilter === "automation") && (
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-xl scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-cyan/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-envelope text-cyan"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy">
                        Email Automation System
                      </h4>
                      <p className="text-sm text-gray-500">SaaS Company</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Complete 15-email onboarding sequence with 85% open rates
                  </p>
                  <div className="flex space-x-4 text-sm">
                    <div className="text-cyan font-bold">+85%</div>
                    <div className="text-gray-500">Open Rate</div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl scroll-reveal">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-purple/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-funnel-dollar text-purple"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy">
                        Sales Funnel Setup
                      </h4>
                      <p className="text-sm text-gray-500">D2C Brand</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Automated lead qualification and nurturing system
                  </p>
                  <div className="flex space-x-4 text-sm">
                    <div className="text-purple font-bold">+320%</div>
                    <div className="text-gray-500">Conversions</div>
                  </div>
                </div>
              </div>
            )}

            {/* Campaigns Grid */}
            {(activeFilter === "all" || activeFilter === "campaigns") && (
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl text-center scroll-reveal shadow-lg border border-gray-200 hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-chart-bar text-coral text-2xl"></i>
                  </div>
                  <h4 className="font-bold mb-2 text-navy">
                    Meta Ads Campaign
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">Fashion Brand</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">ROAS:</span>
                      <span className="font-bold text-coral">4.2x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Spend:</span>
                      <span className="font-bold text-navy">₹2.5L</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl text-center scroll-reveal">
                  <div className="w-16 h-16 bg-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-search text-cyan text-2xl"></i>
                  </div>
                  <h4 className="font-bold mb-2 text-navy">
                    Google Ads Campaign
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">EdTech Platform</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">CPC:</span>
                      <span className="font-bold text-cyan">₹12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Leads:</span>
                      <span className="font-bold text-navy">2,500+</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl text-center scroll-reveal">
                  <div className="w-16 h-16 bg-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-linkedin text-purple text-2xl"></i>
                  </div>
                  <h4 className="font-bold mb-2 text-navy">
                    LinkedIn Campaign
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">B2B SaaS</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">CTR:</span>
                      <span className="font-bold text-purple">3.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Demos:</span>
                      <span className="font-bold text-navy">150+</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-12 scroll-reveal">
            <button className="gradient-button px-8 py-4 rounded-full text-white font-bold flex items-center justify-center space-x-2 mx-auto">
              <span>View Full Portfolio</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
              From Brief to Video in{" "}
              <span className="gradient-text">3 Simple Steps</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No complicated processes. No endless revisions. Just high-quality
              content, fast.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-purple via-cyan to-coral opacity-30"></div>

            <div className="text-center scroll-reveal relative">
              <div className="w-24 h-24 bg-gradient-cta rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="text-4xl font-black text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-navy">
                Share Your Product
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us about your product, target audience, and campaign goals.
                Send product images or videos.
              </p>
            </div>

            <div
              className="text-center scroll-reveal relative"
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="w-24 h-24 bg-gradient-cta rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="text-4xl font-black text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-navy">
                We Create AI Magic
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI creates authentic UGC videos while our team ensures brand
                alignment and quality.
              </p>
            </div>

            <div
              className="text-center scroll-reveal relative"
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="w-24 h-24 bg-gradient-cta rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="text-4xl font-black text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-navy">
                Get Ready-to-Post Videos
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Receive your finished videos in 48 hours. Download and start
                driving conversions immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your content needs. All plans include
              48-hour delivery and unlimited revisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="scroll-reveal">
              <PricingCard
                name="Starter"
                price="₹2,999"
                priceUnit="month"
                description="Perfect for testing UGC"
                features={[
                  "3 UGC videos/month",
                  "15-30 second videos",
                  "48-hour delivery",
                  "1 revision per video",
                ]}
                ctaText="Get Started"
                ctaVariant="outline"
                ctaLink="/contact"
              />
            </div>

            <div className="scroll-reveal" style={{ transitionDelay: "0.1s" }}>
              <PricingCard
                name="Content Machine"
                price="₹4,999"
                priceUnit="month"
                description="For serious brands"
                features={[
                  "10 UGC videos/month",
                  "30-60 second videos",
                  "24-hour priority delivery",
                  "Unlimited revisions",
                  "Content strategy call",
                ]}
                isPopular={true}
                ctaText="Get Started"
                ctaVariant="coral"
                ctaLink="/contact"
              />
            </div>

            <div className="scroll-reveal" style={{ transitionDelay: "0.2s" }}>
              <PricingCard
                name="Full Agency"
                price="Custom"
                priceUnit="Let's talk"
                description="Enterprise solution"
                features={[
                  "Unlimited UGC videos",
                  "Any length videos",
                  "12-hour rush delivery",
                  "Dedicated account manager",
                  "Full campaign management",
                ]}
                ctaText="Contact Sales"
                ctaVariant="outline"
                ctaLink="/contact"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results/Testimonials Section */}
      <section id="results" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
              Real Results from{" "}
              <span className="gradient-text">Real Brands</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our AI-powered UGC content drives measurable business
              outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="scroll-reveal">
              <TestimonialCard
                quote="These AI UGC videos changed everything for us. We went from spending ₹40k/month on creators to ₹5k for better results. Our engagement rate tripled and sales are up 180%."
                author="Priya Sharma"
                role="Founder"
                company="GlowUp Skincare"
                rating={5}
                stats={[
                  { value: "3x", label: "Engagement" },
                  { value: "180%", label: "Sales Growth" },
                  { value: "₹35k", label: "Monthly Savings" },
                ]}
              />
            </div>

            <div className="scroll-reveal" style={{ transitionDelay: "0.1s" }}>
              <TestimonialCard
                quote="I was skeptical about AI-generated content, but Harsh's team delivered videos that look completely authentic. Our customers can't tell the difference, and our conversion rate proves it works."
                author="Rajesh Mehta"
                role="Marketing Head"
                company="FitLife Supplements"
                rating={5}
                stats={[
                  { value: "2.5x", label: "Conversions" },
                  { value: "50K+", label: "Video Views" },
                  { value: "₹8L", label: "Revenue Generated" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        id="blog"
        className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        {/* Background Decorations */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple/10 to-cyan/10 px-4 py-2 rounded-full mb-6 border border-purple/20">
              <i className="fas fa-lightbulb text-purple"></i>
              <span className="text-sm font-semibold text-purple">
                Latest Insights & Resources
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
              Learn From Our{" "}
              <span className="gradient-text">Marketing Playbook</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Actionable strategies, case studies, and insider tips to scale
              your business with AI-powered marketing.
            </p>
          </div>

          {/* Featured Post */}
          {loadingBlogs ? (
            <div className="mb-12 scroll-reveal">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-spinner fa-spin text-4xl text-purple mb-4"></i>
                  <p className="text-gray-500">Loading featured post...</p>
                </div>
              </div>
            </div>
          ) : featuredPost ? (
            <div className="mb-12 scroll-reveal">
              <article className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-video md:aspect-auto bg-gradient-to-br from-purple via-cyan to-coral overflow-hidden">
                    {featuredPost.featured_image ? (
                      <img
                        key={`featured-img-${featuredPost.id}`}
                        src={featuredPost.featured_image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error(
                            "Featured image failed to load:",
                            featuredPost.featured_image
                          );
                          e.target.parentElement.innerHTML = `
                            <div class="absolute inset-0 flex items-center justify-center">
                              <div class="text-center space-y-4 p-8">
                                <i class="fas fa-star text-7xl text-white/30"></i>
                                <div class="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                  <span class="text-sm font-bold text-purple-600">FEATURED</span>
                                </div>
                              </div>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-4 p-8">
                          <i className="fas fa-star text-7xl text-white/30"></i>
                          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                            <span className="text-sm font-bold text-purple">
                              FEATURED
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-xs font-semibold text-white bg-gradient-cta px-3 py-1 rounded-full">
                        {(() => {
                          const cat = featuredPost.category;
                          if (!cat) return "Featured";

                          // Try to parse if it's a JSON string
                          if (typeof cat === "string") {
                            try {
                              const parsed = JSON.parse(cat);
                              if (Array.isArray(parsed) && parsed.length > 0) {
                                return parsed[0];
                              }
                              return cat;
                            } catch {
                              return cat;
                            }
                          }

                          if (Array.isArray(cat) && cat.length > 0)
                            return typeof cat[0] === "string"
                              ? cat[0]
                              : cat[0]?.name || "Featured";
                          return cat.name || "Featured";
                        })()}
                      </span>
                      <span className="text-sm text-gray-500">
                        •{" "}
                        {featuredPost.reading_time ||
                          featuredPost.read_time ||
                          "12"}{" "}
                        min read
                      </span>
                      <span className="text-sm text-gray-500">
                        •{" "}
                        {new Date(
                          featuredPost.published_at || featuredPost.created_at
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black mb-4 text-navy group-hover:text-purple transition leading-tight line-clamp-3">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed line-clamp-3">
                      {featuredPost.excerpt ||
                        featuredPost.meta_description ||
                        "Discover the latest insights and strategies for your business growth."}
                    </p>
                    <a
                      href={`/blog/${featuredPost.slug}`}
                      className="gradient-button px-6 py-3 rounded-full text-white font-bold inline-flex items-center space-x-2 hover:space-x-3 transition-all w-fit"
                    >
                      <span>Read Full Article</span>
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ) : null}

          {/* Recent Posts Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {loadingBlogs
              ? // Loading skeletons
                [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
                  >
                    <div className="aspect-video bg-gray-200"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-6 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))
              : blogPosts.length > 0
              ? blogPosts.map((post, index) => {
                  // Parse category from JSON string if needed
                  let categoryName = "Blog";
                  let categoryArray = [];
                  try {
                    if (post.category) {
                      if (typeof post.category === "string") {
                        categoryArray = JSON.parse(post.category);
                      } else if (Array.isArray(post.category)) {
                        categoryArray = post.category;
                      }
                      if (categoryArray.length > 0) {
                        categoryName = categoryArray[0];
                      }
                    }
                  } catch (err) {
                    console.error("Error parsing category:", err);
                  }

                  // Category color schemes - matching brand colors
                  const getCategoryColors = (cat) => {
                    const lowerCat = cat.toLowerCase();
                    if (
                      lowerCat.includes("ugc") ||
                      lowerCat.includes("content")
                    ) {
                      return {
                        gradient: "from-purple to-purple",
                        badge: "bg-purple text-white",
                        text: "text-purple",
                        hover: "hover:border-purple",
                      };
                    } else if (lowerCat.includes("automation")) {
                      return {
                        gradient: "from-cyan to-cyan",
                        badge: "bg-cyan text-white",
                        text: "text-cyan",
                        hover: "hover:border-cyan",
                      };
                    } else if (
                      lowerCat.includes("campaign") ||
                      lowerCat.includes("analytics")
                    ) {
                      return {
                        gradient: "from-coral to-coral",
                        badge: "bg-coral text-white",
                        text: "text-coral",
                        hover: "hover:border-coral",
                      };
                    } else if (lowerCat.includes("marketing")) {
                      return {
                        gradient: "from-purple to-purple",
                        badge: "bg-purple text-white",
                        text: "text-purple",
                        hover: "hover:border-purple",
                      };
                    }
                    return {
                      gradient: "from-navy to-navy",
                      badge: "bg-navy text-white",
                      text: "text-navy",
                      hover: "hover:border-navy",
                    };
                  };

                  const colors = getCategoryColors(categoryName);
                  const readingTime = post.reading_time || post.read_time || 5;

                  return (
                    <article
                      key={`blog-card-${post.id}`}
                      className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 ${colors.hover}`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      data-category={categoryName}
                    >
                      {/* Image Section */}
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        {post.featured_image ? (
                          <img
                            key={`blog-img-${post.id}`}
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              console.error(
                                "Image failed to load:",
                                post.featured_image
                              );
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}
                          >
                            <div className="text-white text-6xl opacity-20">
                              <i className="fas fa-newspaper"></i>
                            </div>
                          </div>
                        )}
                        {/* Category Badge Overlay */}
                        <div className="absolute top-3 right-3 z-10">
                          <span
                            className={`${colors.badge} px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg`}
                          >
                            {categoryName}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        {/* Meta Info */}
                        <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <i className="fas fa-clock"></i>
                            {readingTime} min read
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(
                              post.published_at || post.created_at
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors leading-snug line-clamp-2 min-h-[3.25rem]">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 min-h-[4rem]">
                          {post.excerpt ||
                            post.meta_description ||
                            "Discover insights and strategies to help grow your business and achieve your goals."}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white text-xs font-bold shadow-sm`}
                            >
                              {(post.author?.name || "Harsh Ranjan")
                                .split(" ")
                                .map((n) => n.charAt(0))
                                .join("")
                                .slice(0, 2)}
                            </div>
                            <span className="text-xs font-medium text-gray-700">
                              {post.author?.name || "Harsh Ranjan"}
                            </span>
                          </div>
                          <a
                            href={`/blog/${post.slug}`}
                            className={`${colors.text} font-bold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all hover:underline`}
                          >
                            <span>Read More</span>
                            <i className="fas fa-arrow-right text-xs"></i>
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })
              : null}
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 scroll-reveal">
            <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-semibold hover:bg-purple hover:text-white transition shadow-sm">
              <i className="fas fa-video mr-2"></i>UGC Content
            </button>
            <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-semibold hover:bg-cyan hover:text-white transition shadow-sm">
              <i className="fas fa-cogs mr-2"></i>Automation
            </button>
            <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-semibold hover:bg-coral hover:text-white transition shadow-sm">
              <i className="fas fa-chart-line mr-2"></i>Campaigns
            </button>
            <button className="px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-semibold hover:bg-purple hover:text-white transition shadow-sm">
              <i className="fas fa-lightbulb mr-2"></i>Case Studies
            </button>
          </div>

          {/* View All CTA */}
          <div className="text-center scroll-reveal">
            <a
              href="/blog"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-white rounded-full text-navy font-bold hover:shadow-xl transition-all border-2 border-gray-200 hover:border-purple group"
            >
              <span>Explore All Articles</span>
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-display text-navy">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our AI-powered marketing
              services.
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <details className="bg-gray-50 rounded-xl p-6 scroll-reveal group">
              <summary className="font-bold text-lg text-navy cursor-pointer flex items-center justify-between">
                <span>How do AI-generated UGC videos look authentic?</span>
                <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-purple"></i>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Our AI technology creates videos that mimic real user-generated
                content by analyzing thousands of authentic UGC videos. We
                combine AI generation with human oversight to ensure brand
                alignment, natural delivery, and authentic aesthetics. The
                result is content that your audience can't distinguish from
                traditional UGC.
              </p>
            </details>

            {/* FAQ Item 2 */}
            <details
              className="bg-gray-50 rounded-xl p-6 scroll-reveal group"
              style={{ transitionDelay: "0.1s" }}
            >
              <summary className="font-bold text-lg text-navy cursor-pointer flex items-center justify-between">
                <span>What's your typical turnaround time?</span>
                <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-purple"></i>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Standard delivery is 48 hours for UGC videos. Content Machine
                plan members get 24-hour priority delivery. For urgent projects,
                we offer 12-hour rush delivery for Full Agency clients. All
                timelines start after you provide your product details and
                approval of the initial concept.
              </p>
            </details>

            {/* FAQ Item 3 */}
            <details
              className="bg-gray-50 rounded-xl p-6 scroll-reveal group"
              style={{ transitionDelay: "0.2s" }}
            >
              <summary className="font-bold text-lg text-navy cursor-pointer flex items-center justify-between">
                <span>Do you offer revisions if I'm not satisfied?</span>
                <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-purple"></i>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Yes! Starter plan includes 1 revision per video, Content Machine
                and Full Agency plans include unlimited revisions. We work with
                you until you're completely satisfied with the final result. Our
                goal is to create content that drives real results for your
                business.
              </p>
            </details>

            {/* FAQ Item 4 */}
            <details
              className="bg-gray-50 rounded-xl p-6 scroll-reveal group"
              style={{ transitionDelay: "0.3s" }}
            >
              <summary className="font-bold text-lg text-navy cursor-pointer flex items-center justify-between">
                <span>Can I use the videos on multiple platforms?</span>
                <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-purple"></i>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Absolutely! All videos are delivered with full commercial usage
                rights. Use them on Instagram, Facebook, TikTok, YouTube, your
                website, email campaigns, paid ads - anywhere you need. We can
                also create platform-specific versions optimized for each
                channel's requirements.
              </p>
            </details>

            {/* FAQ Item 5 */}
            <details
              className="bg-gray-50 rounded-xl p-6 scroll-reveal group"
              style={{ transitionDelay: "0.4s" }}
            >
              <summary className="font-bold text-lg text-navy cursor-pointer flex items-center justify-between">
                <span>
                  What about marketing automation and campaign management?
                </span>
                <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-purple"></i>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Beyond UGC content, we offer complete marketing automation setup
                (email flows, CRM, funnels) and full-service campaign management
                across Meta, Google, and LinkedIn. These services are available
                as add-ons or as part of our Full Agency package. Contact us for
                custom pricing based on your needs.
              </p>
            </details>

            {/* FAQ Item 6 */}
            <details
              className="bg-gray-50 rounded-xl p-6 scroll-reveal group"
              style={{ transitionDelay: "0.5s" }}
            >
              <summary className="font-bold text-lg text-navy cursor-pointer flex items-center justify-between">
                <span>Is there a minimum contract period?</span>
                <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-purple"></i>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                No lock-in contracts! All our plans are month-to-month
                subscriptions. You can cancel anytime with no penalties. We
                believe in earning your business every month by delivering
                exceptional results, not by locking you into long-term
                commitments.
              </p>
            </details>
          </div>

          <div className="text-center mt-12 scroll-reveal">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a
              href="/contact"
              className="gradient-button px-8 py-4 rounded-full text-white font-bold inline-flex items-center space-x-2"
            >
              <span>Talk to Our Team</span>
              <i className="fas fa-comments"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 scroll-reveal">
          <div className="glass-card p-10 rounded-3xl">
            <div className="w-16 h-16 bg-gradient-cta rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-gift text-2xl text-white"></i>
            </div>

            <h2 className="text-3xl md:text-4xl font-black mb-4 font-display">
              Get Your First 3 Videos{" "}
              <span className="gradient-text">Free</span>
            </h2>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              See the quality for yourself. No credit card required. No strings
              attached. Just authentic UGC content delivered in 48 hours.
            </p>

            <form className="max-w-2xl mx-auto mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan transition"
                />
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 py-3.5 rounded-full text-white font-bold transition shadow-lg hover:shadow-xl whitespace-nowrap">
                  Claim Free Videos
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-cyan"></i>
                <span>No credit card</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-cyan"></i>
                <span>48hr delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-cyan"></i>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            {/* Video Player */}
            <video
              className="w-full h-full object-contain"
              controls
              autoPlay
              src={selectedVideo.videoUrl}
            >
              Your browser does not support the video tag.
            </video>

            {/* Video Info */}
            {selectedVideo.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-bold mb-1">
                  {selectedVideo.title}
                </h3>
                {selectedVideo.description && (
                  <p className="text-gray-300 text-sm">
                    {selectedVideo.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AgencyHomePage;
