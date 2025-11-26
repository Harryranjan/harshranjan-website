import React, { useState } from "react";

/**
 * Automation Workflow Visualizer
 * Shows animated business process automation flows
 */
const AutomationWorkflow = ({ workflow = "lead-qualification" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflow);

  const workflows = {
    "lead-qualification": {
      name: "Lead Qualification Automation",
      icon: "🎯",
      color: "blue",
      steps: [
        {
          title: "Lead Inquiry Arrives",
          description: "Customer fills out form or sends message",
          icon: "📧",
          time: "Instant",
        },
        {
          title: "AI Bot Responds",
          description: "Automated greeting and initial questions",
          icon: "🤖",
          time: "< 5 seconds",
        },
        {
          title: "Qualify Lead",
          description: "Ask budget, timeline, decision-maker status",
          icon: "✓",
          time: "30 seconds",
        },
        {
          title: "Score & Route",
          description: "Assign lead score and notify right team member",
          icon: "📊",
          time: "Instant",
        },
        {
          title: "Schedule Meeting",
          description: "Book calendar slot automatically",
          icon: "📅",
          time: "10 seconds",
        },
        {
          title: "Send Confirmation",
          description: "Email confirmation + calendar invite",
          icon: "✅",
          time: "Instant",
        },
        {
          title: "Add to CRM",
          description: "Create contact record with all details",
          icon: "💼",
          time: "Instant",
        },
      ],
      manual: { time: "30-45 minutes", cost: "$25-40" },
      automated: { time: "1-2 minutes", cost: "$0.10" },
    },
    "customer-support": {
      name: "Customer Support Automation",
      icon: "💬",
      color: "green",
      steps: [
        {
          title: "Customer Question",
          description: "Question arrives via chat, email, or phone",
          icon: "❓",
          time: "Instant",
        },
        {
          title: "AI Analysis",
          description: "Understand intent and context",
          icon: "🧠",
          time: "< 2 seconds",
        },
        {
          title: "Check Knowledge Base",
          description: "Search for relevant answers",
          icon: "📚",
          time: "1 second",
        },
        {
          title: "Provide Answer",
          description: "Send personalized response",
          icon: "💡",
          time: "3 seconds",
        },
        {
          title: "Escalate if Needed",
          description: "Route complex issues to human agent",
          icon: "👤",
          time: "Instant",
        },
        {
          title: "Log Interaction",
          description: "Save conversation for training",
          icon: "📝",
          time: "Instant",
        },
      ],
      manual: { time: "5-10 minutes", cost: "$8-15" },
      automated: { time: "10-30 seconds", cost: "$0.05" },
    },
    "appointment-booking": {
      name: "Appointment Booking Automation",
      icon: "📅",
      color: "purple",
      steps: [
        {
          title: "Booking Request",
          description: "Customer wants to schedule",
          icon: "📞",
          time: "Instant",
        },
        {
          title: "Check Availability",
          description: "Scan calendar for open slots",
          icon: "🗓️",
          time: "2 seconds",
        },
        {
          title: "Offer Times",
          description: "Present 3-5 available options",
          icon: "⏰",
          time: "1 second",
        },
        {
          title: "Customer Selects",
          description: "Choose preferred time slot",
          icon: "✓",
          time: "5 seconds",
        },
        {
          title: "Book Appointment",
          description: "Block calendar and create event",
          icon: "📌",
          time: "Instant",
        },
        {
          title: "Send Confirmations",
          description: "Email + SMS + calendar invite",
          icon: "📧",
          time: "2 seconds",
        },
        {
          title: "Set Reminders",
          description: "Schedule 24h and 1h reminders",
          icon: "⏰",
          time: "Instant",
        },
      ],
      manual: { time: "5-8 minutes", cost: "$6-12" },
      automated: { time: "15-30 seconds", cost: "$0.03" },
    },
    "data-entry": {
      name: "Data Entry Automation",
      icon: "📊",
      color: "orange",
      steps: [
        {
          title: "Document Received",
          description: "Invoice, form, or receipt arrives",
          icon: "📄",
          time: "Instant",
        },
        {
          title: "OCR Scan",
          description: "Extract text from document",
          icon: "👁️",
          time: "5 seconds",
        },
        {
          title: "AI Extraction",
          description: "Identify fields (name, amount, date, etc.)",
          icon: "🤖",
          time: "3 seconds",
        },
        {
          title: "Validate Data",
          description: "Check for errors and missing info",
          icon: "✓",
          time: "2 seconds",
        },
        {
          title: "Enter into System",
          description: "Add to database or spreadsheet",
          icon: "💾",
          time: "1 second",
        },
        {
          title: "Notification",
          description: "Alert team of new entry",
          icon: "🔔",
          time: "Instant",
        },
      ],
      manual: { time: "10-15 minutes", cost: "$15-25" },
      automated: { time: "15-20 seconds", cost: "$0.08" },
    },
  };

  const currentWorkflow = workflows[selectedWorkflow];

  const playAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);

    const stepDuration = 1500; // 1.5 seconds per step
    currentWorkflow.steps.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index + 1);
        if (index === currentWorkflow.steps.length - 1) {
          setTimeout(() => setIsPlaying(false), stepDuration);
        }
      }, stepDuration * (index + 1));
    });
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-600",
        text: "text-blue-600",
        gradient: "from-blue-600 to-blue-700",
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-600",
        text: "text-green-600",
        gradient: "from-green-600 to-green-700",
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-600",
        text: "text-purple-600",
        gradient: "from-purple-600 to-purple-700",
      },
      orange: {
        bg: "bg-orange-50",
        border: "border-orange-600",
        text: "text-orange-600",
        gradient: "from-orange-600 to-orange-700",
      },
    };
    return colors[color];
  };

  const colorClasses = getColorClasses(currentWorkflow.color);

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 ${colorClasses.bg} rounded-full mb-4`}
          >
            <span className="text-3xl">{currentWorkflow.icon}</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            See Automation in Action
          </h2>
          <p className="text-gray-600">
            Watch how tasks get automated step-by-step
          </p>
        </div>

        {/* Workflow Selector */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Choose Automation Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(workflows).map(([key, wf]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedWorkflow(key);
                  resetAnimation();
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedWorkflow === key
                    ? `border-${wf.color}-600 bg-${wf.color}-50`
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-1">{wf.icon}</div>
                <div className="text-xs font-semibold text-gray-900">
                  {wf.name.replace(" Automation", "")}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Animation Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={playAnimation}
            disabled={isPlaying}
            className={`px-8 py-3 bg-gradient-to-r ${colorClasses.gradient} text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center gap-2`}
          >
            <span>▶</span>
            {isPlaying ? "Playing..." : "Play Animation"}
          </button>
          <button
            onClick={resetAnimation}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-all"
          >
            ↻ Reset
          </button>
        </div>

        {/* Workflow Steps */}
        <div className="space-y-4 mb-8">
          {currentWorkflow.steps.map((step, index) => {
            const isActive = isPlaying && currentStep === index + 1;
            const isCompleted = currentStep > index;

            return (
              <div key={index}>
                <div
                  className={`p-6 rounded-lg border-2 transition-all duration-500 ${
                    isActive
                      ? `${colorClasses.border} ${colorClasses.bg} shadow-lg scale-105`
                      : isCompleted
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        isActive
                          ? `${colorClasses.bg} animate-pulse`
                          : isCompleted
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {isCompleted ? "✓" : step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {index + 1}. {step.title}
                        </h3>
                        <span
                          className={`text-sm font-semibold px-3 py-1 rounded-full ${
                            isActive ? colorClasses.bg : "bg-gray-100"
                          } ${isActive ? colorClasses.text : "text-gray-600"}`}
                        >
                          {step.time}
                        </span>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>

                {/* Animated Arrow */}
                {index < currentWorkflow.steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div
                      className={`text-2xl transition-all duration-300 ${
                        isCompleted
                          ? `${colorClasses.text} animate-bounce`
                          : "text-gray-300"
                      }`}
                    >
                      ↓
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Time & Cost Comparison */}
        <div className="grid md:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-red-50 to-green-50 rounded-lg">
          <div className="text-center p-6 bg-white rounded-lg border-2 border-red-200">
            <div className="text-4xl mb-2">👤</div>
            <h4 className="font-bold text-gray-900 mb-2">Manual Process</h4>
            <div className="text-3xl font-bold text-red-600 mb-1">
              {currentWorkflow.manual.time}
            </div>
            <div className="text-lg font-semibold text-red-600">
              {currentWorkflow.manual.cost}
            </div>
            <p className="text-sm text-gray-600 mt-2">per occurrence</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border-2 border-green-200">
            <div className="text-4xl mb-2">🤖</div>
            <h4 className="font-bold text-gray-900 mb-2">Automated</h4>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {currentWorkflow.automated.time}
            </div>
            <div className="text-lg font-semibold text-green-600">
              {currentWorkflow.automated.cost}
            </div>
            <p className="text-sm text-gray-600 mt-2">per occurrence</p>
          </div>
        </div>

        {/* Savings Calculation */}
        <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            💰 Potential Savings
          </h3>
          <p className="text-gray-700 mb-4">
            If you process this task 100 times per month:
          </p>
          <div className="text-4xl font-bold text-green-600 mb-2">
            Save $
            {(
              (parseFloat(currentWorkflow.manual.cost.replace(/[$,]/g, "")) -
                parseFloat(
                  currentWorkflow.automated.cost.replace(/[$,]/g, "")
                )) *
              100
            ).toLocaleString()}
            /month
          </div>
          <p className="text-lg text-gray-700">
            Plus{" "}
            <span className="font-bold">
              {(parseInt(currentWorkflow.manual.time) - 1) * 100} hours
            </span>{" "}
            freed up
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => (window.location.href = "/contact")}
            className={`px-10 py-4 bg-gradient-to-r ${colorClasses.gradient} text-white font-bold text-lg rounded-lg hover:shadow-2xl transition-all transform hover:scale-105`}
          >
            Automate My Business →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomationWorkflow;
