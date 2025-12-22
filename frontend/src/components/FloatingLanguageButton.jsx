import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Floating Language Switcher Button - Bottom Left
 */
export default function FloatingLanguageButton() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧", nativeName: "EN" },
    { code: "hi", name: "Hindi", flag: "🇮🇳", nativeName: "HI" },
    { code: "gu", name: "Gujarati", flag: "🇮🇳", nativeName: "GU" },
    { code: "mr", name: "Marathi", flag: "🇮🇳", nativeName: "MR" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode) => {
    console.log("🌍 Changing language to:", langCode);
    i18n.changeLanguage(langCode);
    localStorage.setItem("userLanguage", langCode);
    setIsOpen(false);
    console.log("✅ Language changed. Current:", i18n.language);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Change language"
        >
          <div className="flex flex-col items-center">
            <span className="text-xl">{currentLanguage.flag}</span>
            <span className="text-xs font-semibold">{currentLanguage.nativeName}</span>
          </div>
        </button>

        {/* Language Options Panel */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-20 -z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <div className="absolute bottom-16 left-0 bg-white rounded-xl shadow-2xl p-3 min-w-[200px] border border-gray-100 animate-fade-in-up">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                Select Language
              </div>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      currentLanguage.code === lang.code
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="text-left flex-1">
                      <div className="font-medium text-sm">{lang.name}</div>
                      <div className="text-xs text-gray-500">{lang.nativeName}</div>
                    </div>
                    {currentLanguage.code === lang.code && (
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
