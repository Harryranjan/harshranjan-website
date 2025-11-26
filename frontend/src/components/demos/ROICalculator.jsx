import React, { useState, useEffect } from "react";
import demoAPI from "../../api/demoAPI";

/**
 * ROI Calculator
 * Interactive calculator showing automation cost savings
 */
const ROICalculator = ({ onLeadCapture = null }) => {
  const [inputs, setInputs] = useState({
    employeeCount: 10,
    avgHourlyWage: 25,
    hoursPerWeekRepetitive: 10,
    currentProcesses: 5,
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");

  const processes = [
    { id: "lead-qual", name: "Lead Qualification", timeSaved: 4, icon: "🎯" },
    { id: "data-entry", name: "Data Entry", timeSaved: 8, icon: "📊" },
    {
      id: "scheduling",
      name: "Appointment Scheduling",
      timeSaved: 3,
      icon: "📅",
    },
    { id: "email", name: "Email Responses", timeSaved: 6, icon: "📧" },
    { id: "reporting", name: "Report Generation", timeSaved: 5, icon: "📈" },
    { id: "invoicing", name: "Invoicing", timeSaved: 4, icon: "💰" },
    { id: "support", name: "Customer Support", timeSaved: 10, icon: "💬" },
    { id: "social", name: "Social Media", timeSaved: 5, icon: "📱" },
  ];

  const [selectedProcesses, setSelectedProcesses] = useState([
    "lead-qual",
    "data-entry",
  ]);

  useEffect(() => {
    calculateROI();
  }, [inputs, selectedProcesses]);

  const calculateROI = () => {
    const { employeeCount, avgHourlyWage, hoursPerWeekRepetitive } = inputs;

    // Calculate current costs
    const hoursPerYear = hoursPerWeekRepetitive * 52;
    const totalHoursPerYear = hoursPerYear * employeeCount;
    const currentAnnualCost = totalHoursPerYear * avgHourlyWage;

    // Calculate automation potential
    const automationRate = 0.7; // 70% of repetitive tasks can be automated
    const hoursAutomated = totalHoursPerYear * automationRate;
    const costSavings = hoursAutomated * avgHourlyWage;

    // Calculate implementation cost (rough estimate)
    const setupCost = selectedProcesses.length * 2000; // $2k per process
    const monthlyCost = selectedProcesses.length * 100; // $100/month per process
    const annualSubscription = monthlyCost * 12;
    const totalFirstYearCost = setupCost + annualSubscription;

    // ROI calculations
    const netSavingsFirstYear = costSavings - totalFirstYearCost;
    const netSavingsYearTwo = costSavings - annualSubscription;
    const roi = ((netSavingsFirstYear / totalFirstYearCost) * 100).toFixed(0);
    const paybackMonths = (totalFirstYearCost / (costSavings / 12)).toFixed(1);

    // Additional benefits
    const errorReduction = 85; // 85% fewer errors
    const productivityIncrease = 40; // 40% productivity increase
    const customerSatisfactionIncrease = 25; // 25% satisfaction increase

    setResults({
      currentAnnualCost,
      hoursAutomated,
      costSavings,
      setupCost,
      annualSubscription,
      totalFirstYearCost,
      netSavingsFirstYear,
      netSavingsYearTwo,
      roi,
      paybackMonths,
      errorReduction,
      productivityIncrease,
      customerSatisfactionIncrease,
      fiveYearSavings: netSavingsFirstYear + netSavingsYearTwo * 4,
    });
  };

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const toggleProcess = (processId) => {
    setSelectedProcesses((prev) =>
      prev.includes(processId)
        ? prev.filter((id) => id !== processId)
        : [...prev, processId]
    );
  };

  const handleCalculate = () => {
    calculateROI();
    setShowResults(true);
  };

  const handleGetReport = async (e) => {
    e.preventDefault();

    const leadData = {
      email,
      source: "roi_calculator",
      metadata: {
        calculatorInputs: inputs,
        selectedProcesses,
        calculatedResults: results,
        estimatedSavings: results.netSavingsFirstYear,
        fiveYearSavings: results.fiveYearSavings,
      },
    };

    try {
      if (onLeadCapture) {
        await onLeadCapture(leadData);
      } else {
        await demoAPI.captureLead(leadData);
      }
      // Show success message
      alert(`ROI Report sent to ${email}! Check your inbox.`);
      setShowEmailForm(false);
    } catch (error) {
      console.error("Failed to capture lead:", error);
      alert("Something went wrong. Please try again or contact us directly.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-2xl overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-4">
            <span className="text-3xl">💰</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Automation ROI Calculator
          </h2>
          <p className="text-gray-600">
            Discover how much you can save with business automation
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Number of Employees
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={inputs.employeeCount}
              onChange={(e) =>
                handleInputChange("employeeCount", e.target.value)
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>1</span>
              <span className="font-bold text-2xl text-blue-600">
                {inputs.employeeCount}
              </span>
              <span>100</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Average Hourly Wage ($)
            </label>
            <input
              type="range"
              min="15"
              max="100"
              step="5"
              value={inputs.avgHourlyWage}
              onChange={(e) =>
                handleInputChange("avgHourlyWage", e.target.value)
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>$15</span>
              <span className="font-bold text-2xl text-green-600">
                ${inputs.avgHourlyWage}
              </span>
              <span>$100</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Hours/Week on Repetitive Tasks (per employee)
            </label>
            <input
              type="range"
              min="1"
              max="40"
              value={inputs.hoursPerWeekRepetitive}
              onChange={(e) =>
                handleInputChange("hoursPerWeekRepetitive", e.target.value)
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>1h</span>
              <span className="font-bold text-2xl text-purple-600">
                {inputs.hoursPerWeekRepetitive}h
              </span>
              <span>40h</span>
            </div>
          </div>
        </div>

        {/* Process Selection */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            Select Processes to Automate ({selectedProcesses.length} selected)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {processes.map((process) => (
              <button
                key={process.id}
                onClick={() => toggleProcess(process.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedProcesses.includes(process.id)
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="text-2xl mb-2">{process.icon}</div>
                <div className="text-xs font-semibold text-gray-900 mb-1">
                  {process.name}
                </div>
                <div className="text-xs text-gray-600">
                  ~{process.timeSaved}h/week saved
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleCalculate}
            className="px-12 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-lg rounded-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Calculate My Savings 💰
          </button>
        </div>

        {/* Results Section */}
        {showResults && results && (
          <div className="space-y-6 animate-fade-in">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-semibold mb-2">
                  First Year Savings
                </div>
                <div className="text-4xl font-bold">
                  ${results.netSavingsFirstYear.toLocaleString()}
                </div>
                <div className="text-xs mt-2 opacity-90">
                  After implementation costs
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-semibold mb-2">Annual ROI</div>
                <div className="text-4xl font-bold">{results.roi}%</div>
                <div className="text-xs mt-2 opacity-90">
                  Return on investment
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-semibold mb-2">Payback Period</div>
                <div className="text-4xl font-bold">
                  {results.paybackMonths}
                </div>
                <div className="text-xs mt-2 opacity-90">months</div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                💡 Detailed Breakdown
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Cost Savings
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Hours Automated/Year:
                      </span>
                      <span className="font-bold">
                        {results.hoursAutomated.toLocaleString()}h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Labor Cost Savings:</span>
                      <span className="font-bold text-green-600">
                        ${results.costSavings.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year 2+ Savings:</span>
                      <span className="font-bold text-green-600">
                        ${results.netSavingsYearTwo.toLocaleString()}/year
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-900 font-semibold">
                        5-Year Savings:
                      </span>
                      <span className="font-bold text-green-600 text-xl">
                        ${results.fiveYearSavings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Investment
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Setup Cost:</span>
                      <span className="font-bold">
                        ${results.setupCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Annual Subscription:
                      </span>
                      <span className="font-bold">
                        ${results.annualSubscription.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-900 font-semibold">
                        Total First Year:
                      </span>
                      <span className="font-bold text-red-600">
                        ${results.totalFirstYearCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🚀 Additional Benefits
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {results.errorReduction}%
                  </div>
                  <div className="text-sm text-gray-600">Fewer Errors</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {results.productivityIncrease}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Productivity Boost
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {results.customerSatisfactionIncrease}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Higher Satisfaction
                  </div>
                </div>
              </div>
            </div>

            {/* Email Capture CTA */}
            {!showEmailForm ? (
              <div className="text-center p-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Want a Detailed ROI Report?
                </h3>
                <p className="text-gray-700 mb-4">
                  Get a personalized PDF report with automation recommendations
                  for your business
                </p>
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="px-10 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-lg rounded-lg hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Get Free ROI Report →
                </button>
              </div>
            ) : (
              <div className="p-8 bg-white rounded-lg shadow-lg border-2 border-blue-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  📧 Enter Your Email
                </h3>
                <form onSubmit={handleGetReport} className="max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    Send My Report →
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ROICalculator;
