import React from "react";

/**
 * MessageBubble - Reusable chat message component
 *
 * @param {string} type - 'user' or 'bot'
 * @param {string} text - Message content
 * @param {Date} timestamp - Message timestamp
 * @param {boolean} showTime - Display timestamp (default: true)
 * @param {string} avatar - Avatar emoji or image URL
 */
const MessageBubble = ({
  type = "bot",
  text,
  timestamp,
  showTime = true,
  avatar = null,
  className = "",
}) => {
  const isBot = type === "bot";

  return (
    <div
      className={`flex ${
        isBot ? "justify-start" : "justify-end"
      } mb-4 animate-fade-in ${className}`}
    >
      <div
        className={`flex items-start gap-2 max-w-[80%] ${
          isBot ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Avatar */}
        {avatar && (
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              isBot ? "bg-blue-100" : "bg-gray-200"
            }`}
          >
            {avatar.startsWith("http") ? (
              <img
                src={avatar}
                alt="avatar"
                className="w-full h-full rounded-full"
              />
            ) : (
              <span className="text-lg">{avatar}</span>
            )}
          </div>
        )}

        {/* Message Content */}
        <div className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}>
          <div
            className={`px-4 py-3 rounded-2xl shadow-sm ${
              isBot
                ? "bg-white border border-gray-200 text-gray-800"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {text}
            </p>
          </div>
          {showTime && timestamp && (
            <span className="text-xs text-gray-400 mt-1 px-1">
              {new Date(timestamp).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * TypingIndicator - Shows when bot is typing
 */
export const TypingIndicator = ({ className = "" }) => {
  return (
    <div className={`flex justify-start mb-4 ${className}`}>
      <div className="flex items-center gap-2 max-w-[80%]">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-lg">🤖</span>
        </div>
        <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm">
          <div className="flex gap-1">
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
