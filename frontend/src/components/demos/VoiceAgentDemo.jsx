import React, { useState, useRef } from "react";

/**
 * Voice Agent Demo
 * Demonstrates AI voice capabilities - text-to-speech simulation
 * Note: For production, integrate with ElevenLabs or OpenAI TTS API
 */
const VoiceAgentDemo = () => {
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState("professional");
  const audioRef = useRef(null);

  const voices = [
    {
      id: "professional",
      name: "Professional (Male)",
      description: "Clear, authoritative",
    },
    {
      id: "friendly",
      name: "Friendly (Female)",
      description: "Warm, approachable",
    },
    {
      id: "energetic",
      name: "Energetic (Male)",
      description: "Dynamic, engaging",
    },
  ];

  const useCases = [
    {
      icon: "📞",
      title: "Customer Support",
      description: "24/7 automated phone support",
    },
    {
      icon: "📅",
      title: "Appointment Booking",
      description: "Schedule calls automatically",
    },
    {
      icon: "🎯",
      title: "Lead Qualification",
      description: "Pre-screen prospects",
    },
    {
      icon: "📧",
      title: "Follow-up Calls",
      description: "Never miss a follow-up",
    },
  ];

  const sampleTexts = [
    "Hello! Thank you for calling. How can I assist you today?",
    "I've scheduled your appointment for tomorrow at 2 PM. You'll receive a confirmation email shortly.",
    "Based on your answers, I think our premium package would be perfect for your needs.",
  ];

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In production, this would call ElevenLabs/OpenAI API:
    // const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ text: inputText, voice: selectedVoice })
    // });
    // const audioBlob = await response.blob();
    // setAudioUrl(URL.createObjectURL(audioBlob));

    // For demo purposes, use browser's Speech Synthesis API
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(inputText);
      const voices = window.speechSynthesis.getVoices();

      // Select voice based on selection
      if (selectedVoice === "professional") {
        utterance.voice =
          voices.find((v) => v.name.includes("Male")) || voices[0];
        utterance.pitch = 0.9;
        utterance.rate = 0.95;
      } else if (selectedVoice === "friendly") {
        utterance.voice =
          voices.find((v) => v.name.includes("Female")) || voices[1];
        utterance.pitch = 1.1;
        utterance.rate = 1.0;
      } else {
        utterance.voice =
          voices.find((v) => v.name.includes("Male")) || voices[0];
        utterance.pitch = 1.2;
        utterance.rate = 1.1;
      }

      window.speechSynthesis.speak(utterance);
    }

    setIsGenerating(false);
    setAudioUrl("generated"); // Placeholder for demo
  };

  const handleSampleClick = (text) => {
    setInputText(text);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-xl overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <span className="text-3xl">🎙️</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            AI Voice Agent Demo
          </h2>
          <p className="text-gray-600">
            Type any text and hear it spoken by an AI voice agent
          </p>
        </div>

        {/* Voice Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Choose Voice Style
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {voices.map((voice) => (
              <button
                key={voice.id}
                onClick={() => setSelectedVoice(voice.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedVoice === voice.id
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="font-semibold text-gray-900 mb-1">
                  {voice.name}
                </div>
                <div className="text-sm text-gray-600">{voice.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Enter Text to Generate Voice
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type anything you want the AI agent to say..."
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {inputText.length}/500 characters
            </span>
            <button
              onClick={handleGenerate}
              disabled={!inputText.trim() || isGenerating}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                "🎙️ Generate Voice"
              )}
            </button>
          </div>
        </div>

        {/* Sample Texts */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Or Try Sample Texts
          </label>
          <div className="space-y-2">
            {sampleTexts.map((text, index) => (
              <button
                key={index}
                onClick={() => handleSampleClick(text)}
                className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <span className="text-gray-700">{text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Audio Player */}
        {audioUrl && (
          <div className="mb-6 p-6 bg-white rounded-lg border-2 border-green-200">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-semibold">
                Voice Generated Successfully!
              </span>
            </div>
            <div className="text-center text-gray-600">
              <p className="mb-2">🔊 The AI voice is speaking now...</p>
              <p className="text-sm">
                (Using browser's built-in voice for demo. Production uses
                premium AI voices.)
              </p>
            </div>
          </div>
        )}

        {/* Use Cases */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Where Voice Agents Work Best
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-2">{useCase.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {useCase.title}
                </h4>
                <p className="text-sm text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Ready to Deploy Your Own AI Voice Agent?
          </h3>
          <p className="text-gray-700 mb-4">
            Get a custom voice agent that handles calls 24/7, books
            appointments, and qualifies leads automatically.
          </p>
          <button
            onClick={() => (window.location.href = "/contact")}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Schedule Free Consultation →
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgentDemo;
