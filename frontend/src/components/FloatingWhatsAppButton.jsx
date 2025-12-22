import { useState } from "react";

/**
 * Floating WhatsApp Button - Bottom Right
 */
export default function FloatingWhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = "918160754633"; // Indian format: 91 + 8160754633
  const message =
    "Hello! I would like to book an appointment for pain therapy treatment.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      {/* Pulsing ring animation */}
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>

      {/* Main button */}
      <div className="relative w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110">
        <i className="fab fa-whatsapp text-white text-3xl"></i>
      </div>

      {/* Tooltip */}
      <div
        className={`absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all duration-300 ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        Chat on WhatsApp
        {/* Arrow */}
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-gray-900"></div>
      </div>

      <style jsx>{`
        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </a>
  );
}
