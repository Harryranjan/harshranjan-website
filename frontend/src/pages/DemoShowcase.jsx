import React from "react";
import { DemoCard } from "../components/demos/DemoModal";
import ChatbotDemo from "../components/demos/ChatbotDemo";
import VoiceAgentDemo from "../components/demos/VoiceAgentDemo";
import AutomationWorkflow from "../components/demos/AutomationWorkflow";
import ROICalculator from "../components/demos/ROICalculator";
import demoAPI from "../api/demoAPI";

/**
 * Demo Showcase Page
 * Central hub for all interactive demos
 */
const DemoShowcase = () => {
  const handleLeadCapture = async (leadData) => {
    try {
      const result = await demoAPI.captureLead(leadData);
      console.log("Lead captured successfully:", result);
      return result;
    } catch (error) {
      console.error("Lead capture error:", error);
      throw error;
    }
  };

  const demos = [
    {
      id: "chatbot",
      title: "AI Chatbot Assistant",
      description:
        "Experience an intelligent chatbot that qualifies leads, answers questions, and schedules meetings automatically.",
      icon: "🤖",
      gradient: "from-blue-600 to-blue-700",
      component: <ChatbotDemo onLeadCapture={handleLeadCapture} />,
      tags: ["Lead Generation", "Customer Service", "Automation"],
    },
    {
      id: "voice-agent",
      title: "AI Voice Agent",
      description:
        "Test our AI-powered voice technology that handles phone calls, appointments, and customer support with human-like conversations.",
      icon: "🎙️",
      gradient: "from-purple-600 to-purple-700",
      component: <VoiceAgentDemo />,
      tags: ["Voice AI", "Phone Automation", "Customer Support"],
    },
    {
      id: "automation-workflow",
      title: "Automation Workflow Visualizer",
      description:
        "See exactly how business processes get automated step-by-step. Watch tasks that take hours complete in seconds.",
      icon: "⚙️",
      gradient: "from-green-600 to-green-700",
      component: <AutomationWorkflow />,
      tags: ["Process Automation", "Workflow", "Efficiency"],
    },
    {
      id: "roi-calculator",
      title: "ROI Calculator",
      description:
        "Calculate your potential savings from automation. See real numbers: cost reduction, time saved, and payback period.",
      icon: "💰",
      gradient: "from-orange-600 to-orange-700",
      component: <ROICalculator onLeadCapture={handleLeadCapture} />,
      tags: ["ROI", "Cost Savings", "Business Planning"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Experience AI Automation in Action
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Don't just read about it – interact with working demos of AI
              automation tools that can transform your business
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">✨ 100% Interactive</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🚀 Real Technology</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">💡 Live Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">70%</div>
              <div className="text-gray-600">Time Saved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                $50K+
              </div>
              <div className="text-gray-600">Avg Annual Savings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">Automation Running</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">
                3 Months
              </div>
              <div className="text-gray-600">Avg ROI Payback</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Try Our Interactive Demos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Click any demo below to experience real AI automation technology.
              No signup required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {demos.map((demo) => (
              <DemoCard
                key={demo.id}
                title={demo.title}
                description={demo.description}
                icon={demo.icon}
                gradient={demo.gradient}
                demoComponent={demo.component}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Perfect For Your Industry
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-bold mb-2">
                  Professional Services
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Client intake automation</li>
                  <li>✓ Appointment scheduling</li>
                  <li>✓ Document processing</li>
                  <li>✓ Follow-up sequences</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                <div className="text-4xl mb-4">🛍️</div>
                <h3 className="text-xl font-bold mb-2">E-Commerce</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Order processing</li>
                  <li>✓ Customer support chatbots</li>
                  <li>✓ Inventory management</li>
                  <li>✓ Abandoned cart recovery</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-bold mb-2">Healthcare</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Patient scheduling</li>
                  <li>✓ Appointment reminders</li>
                  <li>✓ Insurance verification</li>
                  <li>✓ Follow-up coordination</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              How We Implement Automation
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Discovery Call",
                  description:
                    "We analyze your business processes and identify automation opportunities.",
                  icon: "🔍",
                  color: "blue",
                },
                {
                  step: "2",
                  title: "Custom Solution Design",
                  description:
                    "We design AI automation tailored specifically to your workflows and systems.",
                  icon: "🎨",
                  color: "purple",
                },
                {
                  step: "3",
                  title: "Implementation",
                  description:
                    "We build, test, and deploy your automation with zero disruption to operations.",
                  icon: "⚙️",
                  color: "green",
                },
                {
                  step: "4",
                  title: "Training & Support",
                  description:
                    "Your team gets trained, and we provide ongoing support and optimization.",
                  icon: "🎓",
                  color: "orange",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md"
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 bg-${item.color}-100 rounded-full flex items-center justify-center text-2xl`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-sm font-bold text-${item.color}-600 bg-${item.color}-100 px-3 py-1 rounded-full`}
                      >
                        Step {item.step}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Automate Your Business?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Book a free consultation to discuss how AI automation can transform
            your operations and save you time and money.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => (window.location.href = "/contact")}
              className="px-10 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Schedule Free Consultation →
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-lg hover:bg-white/20 transition-all border-2 border-white"
            >
              Try More Demos ↑
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoShowcase;
