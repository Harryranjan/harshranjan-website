import React, { useState, useRef, useEffect } from "react";

/**
 * Interactive Chatbot Demo
 * Simulates AI chatbot conversation to demonstrate automation capabilities
 */
const ChatbotDemo = ({ onLeadCapture = null }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi! 👋 I'm an AI assistant. I can help qualify leads, answer questions, and book appointments - all automatically. Try chatting with me!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStage, setConversationStage] = useState("greeting");
  const [leadData, setLeadData] = useState({});
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text, type = "bot", delay = 0) => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          type,
          text,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, delay);
  };

  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(callback, delay);
  };

  const handleBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Stage 1: Initial greeting response
    if (conversationStage === "greeting") {
      simulateTyping(() => {
        addMessage(
          "Great! Let me show you how I work. I can help with lead qualification, appointment booking, and customer support. What's your biggest business challenge right now?",
          "bot"
        );
        setConversationStage("challenge");
      });
      return;
    }

    // Stage 2: Capture business challenge
    if (conversationStage === "challenge") {
      setLeadData((prev) => ({ ...prev, challenge: userMessage }));

      simulateTyping(() => {
        addMessage(
          `I understand - "${userMessage}" is a common challenge. Many businesses solve this with automation. How many hours per week does your team spend on repetitive tasks?`,
          "bot"
        );
        setConversationStage("time");
      }, 1200);
      return;
    }

    // Stage 3: Capture time spent
    if (conversationStage === "time") {
      setLeadData((prev) => ({ ...prev, timeSpent: userMessage }));

      simulateTyping(() => {
        const hours = parseInt(userMessage) || 10;
        const savings = hours * 40; // Assuming $40/hour average
        const monthlySavings = savings * 4;

        addMessage(
          `Got it! If you're spending ${hours} hours/week on repetitive tasks, that's potentially $${monthlySavings.toLocaleString()}/month that could be saved with automation. 💰`,
          "bot"
        );

        setTimeout(() => {
          addMessage(
            "I can handle tasks like:\n• Lead qualification\n• Appointment scheduling\n• Email responses\n• Data entry\n• Customer support\n\nWould you like to see how this works for your business?",
            "bot"
          );
          setConversationStage("interest");
        }, 2000);
      }, 1500);
      return;
    }

    // Stage 4: Capture interest
    if (conversationStage === "interest") {
      if (
        lowerMessage.includes("yes") ||
        lowerMessage.includes("sure") ||
        lowerMessage.includes("interested")
      ) {
        simulateTyping(() => {
          addMessage(
            "Excellent! To send you a personalized automation plan, I'll need your email. What's the best email to reach you?",
            "bot"
          );
          setConversationStage("email");
        }, 1000);
      } else {
        simulateTyping(() => {
          addMessage(
            "No problem! Feel free to explore our website. If you change your mind, just type 'start over' to begin again. Have a great day! 👋",
            "bot"
          );
          setConversationStage("complete");
        }, 1000);
      }
      return;
    }

    // Stage 5: Capture email
    if (conversationStage === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(userMessage)) {
        setLeadData((prev) => ({ ...prev, email: userMessage }));

        // Call lead capture callback or API
        const captureData = {
          ...leadData,
          email: userMessage,
          source: "chatbot_demo",
        };

        if (onLeadCapture) {
          onLeadCapture(captureData).catch((err) =>
            console.error("Lead capture failed:", err)
          );
        } else {
          import("../../api/demoAPI").then((module) => {
            module.default
              .captureLead(captureData)
              .catch((err) => console.error("Lead capture failed:", err));
          });
        }

        simulateTyping(() => {
          addMessage(
            `Perfect! I've sent a personalized automation roadmap to ${userMessage}. 📧\n\nThis conversation just demonstrated how I can:\n✅ Qualify leads automatically\n✅ Calculate ROI instantly\n✅ Capture contact info\n✅ Schedule follow-ups\n\nAll without human intervention! Want to get a bot like me for YOUR business?`,
            "bot"
          );

          setTimeout(() => {
            addMessage(
              '<button class="demo-cta">Book a Free Consultation →</button>',
              "bot"
            );
          }, 2500);

          setConversationStage("complete");
        }, 1500);
      } else {
        simulateTyping(() => {
          addMessage(
            "Hmm, that doesn't look like a valid email. Could you double-check and try again?",
            "bot"
          );
        }, 800);
      }
      return;
    }

    // Handle "start over" command
    if (
      lowerMessage.includes("start over") ||
      lowerMessage.includes("restart")
    ) {
      simulateTyping(() => {
        addMessage(
          "Sure! Let's start fresh. What's your biggest business challenge right now?",
          "bot"
        );
        setConversationStage("challenge");
        setLeadData({});
      }, 800);
      return;
    }

    // Default fallback response
    simulateTyping(() => {
      addMessage(
        "I'm a demo bot, so I'm following a script to show you how automation works. Type 'start over' to begin again, or explore the other demos on this site!",
        "bot"
      );
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    // Add user message
    const userMessage = inputValue.trim();
    addMessage(userMessage, "user", 0);
    setInputValue("");

    // Generate bot response
    handleBotResponse(userMessage);
  };

  const handleQuickReply = (text) => {
    if (isTyping) return;
    addMessage(text, "user", 0);
    handleBotResponse(text);
  };

  const quickReplies = {
    greeting: ["Hi!", "Show me how it works", "Tell me more"],
    challenge: [
      "Need more leads",
      "Too much manual work",
      "Customer support issues",
    ],
    time: ["5 hours", "10 hours", "20+ hours"],
    interest: ["Yes, interested!", "Tell me more", "Not right now"],
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h3 className="font-semibold">AI Assistant Demo</h3>
            <div className="flex items-center gap-2 text-xs text-blue-100">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Online - Try me out!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900 shadow-sm border border-gray-200"
              }`}
            >
              {message.text.includes("<button") ? (
                <div
                  dangerouslySetInnerHTML={{ __html: message.text }}
                  onClick={(e) => {
                    if (e.target.classList.contains("demo-cta")) {
                      window.location.href = "/contact";
                    }
                  }}
                />
              ) : (
                <p className="whitespace-pre-line">{message.text}</p>
              )}
              <span
                className={`text-xs mt-1 block ${
                  message.type === "user" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {quickReplies[conversationStage] && !isTyping && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {quickReplies[conversationStage].map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 bg-white border-t border-gray-200"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isTyping ? "Bot is typing..." : "Type your message..."}
            disabled={isTyping}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Send
          </button>
        </div>
      </form>

      <style jsx>{`
        .demo-cta {
          margin-top: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .demo-cta:hover {
          transform: scale(1.05);
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default ChatbotDemo;
