import { Helmet } from "react-helmet-async";
import { useState } from "react";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "ugc", label: "UGC Content" },
    { id: "automation", label: "Automation" },
    { id: "campaigns", label: "Campaigns" },
  ];

  const projects = [
    {
      id: 1,
      category: "ugc",
      title: "D2C Skincare Brand",
      client: "Leading Skincare Company",
      challenge: "Low engagement and high customer acquisition costs",
      solution: "Created authentic UGC video campaign featuring real customers",
      results: [
        { metric: "+340%", label: "Engagement Rate" },
        { metric: "500K+", label: "Video Views" },
        { metric: "₹2.4L", label: "Revenue Generated" },
      ],
      videoUrl: "/Videos/Aipowered_marketing_that_202512030055.mp4",
      thumbnail: "🎥",
      tags: ["UGC", "Video Marketing", "E-commerce"],
    },
    {
      id: 2,
      category: "ugc",
      title: "EdTech Platform Launch",
      client: "Online Learning Platform",
      challenge: "New product launch in competitive market",
      solution: "Student testimonial videos and course preview content",
      results: [
        { metric: "50K+", label: "Views in 48hrs" },
        { metric: "+18%", label: "Conversion Rate" },
        { metric: "250K+", label: "Total Reach" },
      ],
      videoUrl: "/Videos/Human__ai_202512030122.mp4",
      thumbnail: "📚",
      tags: ["EdTech", "Launch Campaign", "Video"],
    },
    {
      id: 3,
      category: "automation",
      title: "E-commerce Marketing System",
      client: "Multi-Brand E-commerce Store",
      challenge: "Manual processes limiting scale and efficiency",
      solution: "Built end-to-end marketing automation system",
      results: [
        { metric: "₹8,000", label: "Monthly Savings" },
        { metric: "24/7", label: "Automation" },
        { metric: "+65%", label: "Productivity" },
      ],
      thumbnail: "🤖",
      tags: ["Automation", "E-commerce", "Efficiency"],
    },
    {
      id: 4,
      category: "campaigns",
      title: "AI Marketing Campaign",
      client: "Tech Startup",
      challenge: "Limited budget for brand awareness",
      solution: "AI-powered multi-channel campaign with dynamic content",
      results: [
        { metric: "₹2Cr+", label: "Ad Spend" },
        { metric: "+245%", label: "ROI" },
        { metric: "350K+", label: "Impressions" },
      ],
      videoUrl: "/Videos/Scene_1_the_202512030138_1ir2h.mp4",
      thumbnail: "🚀",
      tags: ["AI Marketing", "Tech", "Growth"],
    },
    {
      id: 5,
      category: "ugc",
      title: "Tech Product Launch",
      client: "SaaS Company",
      challenge: "Building trust for new product",
      solution: "Customer success stories and product demo videos",
      results: [
        { metric: "1M+", label: "Launch Week Views" },
        { metric: "+16%", label: "Engagement" },
        { metric: "5000+", label: "Sign-ups" },
      ],
      videoUrl: "/Videos/Aipowered_marketing_that_202512030052_7xdiu.mp4",
      thumbnail: "💻",
      tags: ["SaaS", "Product Launch", "UGC"],
    },
    {
      id: 6,
      category: "campaigns",
      title: "Brand Awareness Campaign",
      client: "FMCG Brand",
      challenge: "Low brand recall in target demographic",
      solution: "Integrated campaign across social, display, and video",
      results: [
        { metric: "450K+", label: "Total Reach" },
        { metric: "2x", label: "Brand Recall" },
        { metric: "+13%", label: "Sales Lift" },
      ],
      videoUrl: "/Videos/Human__ai_202512030102_bdcnz.mp4",
      thumbnail: "🎯",
      tags: ["Brand Awareness", "FMCG", "Multi-channel"],
    },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Portfolio - Harsh Ranjan | Case Studies & Success Stories</title>
        <meta
          name="description"
          content="View successful digital marketing campaigns and case studies with proven results."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-12 animated-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple/30 rounded-full blur-3xl float-animation"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyan/20 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "-3s" }}
          ></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
              Success Stories &{" "}
              <span className="gradient-text">Case Studies</span>
            </h1>
            <p className="text-xl text-gray-300">
              Real results from real campaigns. See how we've helped brands
              achieve their goals.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  selectedCategory === cat.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="h-48 bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center relative overflow-hidden">
                  {project.videoUrl ? (
                    <video
                      className="w-full h-full object-cover"
                      muted
                      loop
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                    >
                      <source src={project.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="text-8xl">{project.thumbnail}</div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      View Case Study
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{project.client}</p>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {project.results.map((result, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-xl font-bold text-purple-600">
                          {result.metric}
                        </div>
                        <div className="text-xs text-gray-600">
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Overall Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                200+
              </div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                ₹2Cr+
              </div>
              <div className="text-gray-600">Ad Spend Managed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                +245%
              </div>
              <div className="text-gray-600">Average ROI</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Videos Created</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Let's discuss how we can achieve similar results for your business
          </p>
          <a
            href="/contact"
            className="gradient-button inline-block px-8 py-4 rounded-full text-lg font-bold text-white"
          >
            Start Your Project
          </a>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-8 py-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedProject.title}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <p className="text-lg text-gray-500 mb-8">
                {selectedProject.client}
              </p>

              {/* Video */}
              {selectedProject.videoUrl && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <video className="w-full" controls>
                    <source src={selectedProject.videoUrl} type="video/mp4" />
                  </video>
                </div>
              )}

              {/* Challenge */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Challenge
                </h3>
                <p className="text-lg text-gray-600">
                  {selectedProject.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Solution
                </h3>
                <p className="text-lg text-gray-600">
                  {selectedProject.solution}
                </p>
              </div>

              {/* Results */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Results
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {selectedProject.results.map((result, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-purple-50 to-cyan-50 rounded-xl p-6 text-center"
                    >
                      <div className="text-4xl font-bold text-purple-600 mb-2">
                        {result.metric}
                      </div>
                      <div className="text-gray-600">{result.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
