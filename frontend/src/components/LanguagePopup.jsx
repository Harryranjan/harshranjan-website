import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Language Selection Popup
 * Shows when user is detected from Vadodara
 */
export default function LanguagePopup({ show, onClose, locationData }) {
  const { t, i18n } = useTranslation();
  const [rememberChoice, setRememberChoice] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      // Small delay for smooth animation
      setTimeout(() => setIsVisible(true), 100);
    }
  }, [show]);

  const handleLanguageSelect = (language) => {
    i18n.changeLanguage(language);

    if (rememberChoice) {
      localStorage.setItem("userLanguage", language);
      localStorage.setItem("languagePopupShown", "true");
    } else {
      sessionStorage.setItem("languagePopupShown", "true");
    }

    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-50 ${
          isVisible ? "bg-opacity-50" : "bg-opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Popup */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`bg-white rounded-lg shadow-2xl max-w-sm w-full transform transition-all duration-300 ${
            isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xl">🌍</span>
                <div>
                  <h2 className="text-sm font-bold">
                    {t("language.popup.title")}
                  </h2>
                  <p className="text-xs text-blue-100 mt-0.5">
                    {locationData?.city && (
                      <span>
                        📍 {locationData.city}, {locationData.region || "Gujarat"}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
              >
                <svg
                  className="w-4 h-4"
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
          </div>

          {/* Content */}
          <div className="p-3">
            <p className="text-gray-600 text-center text-xs mb-3">
              {t("language.popup.subtitle")}
            </p>

            {/* Language Options */}
            <div className="space-y-1.5">
              {/* Hindi Option */}
              <button
                onClick={() => handleLanguageSelect("hi")}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md p-2 transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">IN</span>
                    <div className="text-left">
                      <div className="font-bold text-sm">हिंदी (Hindi)</div>
                      <div className="text-xs text-orange-100">
                        National Language
                      </div>
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              {/* Gujarati Option */}
              <button
                onClick={() => handleLanguageSelect("gu")}
                className="w-full group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-md p-2 transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">IN</span>
                    <div className="text-left">
                      <div className="font-bold text-sm">
                        ગુજરાતી (Gujarati)
                      </div>
                      <div className="text-xs text-blue-100">
                        Recommended for Gujarat
                      </div>
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              {/* Marathi Option */}
              <button
                onClick={() => handleLanguageSelect("mr")}
                className="w-full group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-md p-2 transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">IN</span>
                    <div className="text-left">
                      <div className="font-bold text-sm">मराठी (Marathi)</div>
                      <div className="text-xs text-purple-100">
                        Recommended for Maharashtra
                      </div>
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              {/* English Option */}
              <button
                onClick={() => handleLanguageSelect("en")}
                className="w-full group bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-400 text-gray-700 rounded-md p-2 transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">GB</span>
                    <div className="text-left">
                      <div className="font-bold text-sm">
                        {t("language.popup.english")}
                      </div>
                      <div className="text-xs text-gray-500">International</div>
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>

            {/* Remember Choice */}
            <div className="mt-2.5 pt-2.5 border-t border-gray-200">
              <label className="flex items-center gap-1.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberChoice}
                  onChange={(e) => setRememberChoice(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs text-gray-600 group-hover:text-gray-900">
                  {t("language.popup.rememberChoice")}
                </span>
              </label>
            </div>

            {/* Info */}
            <div className="mt-2 bg-blue-50 border border-blue-100 rounded-md p-2">
              <p className="text-xs text-blue-800 text-center">
                💡 You can change the language anytime using the language
                switcher in the navigation menu
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
