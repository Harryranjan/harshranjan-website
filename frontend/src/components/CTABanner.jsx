import { useState, useEffect } from "react";
import { FiX, FiPhone, FiMail, FiChevronDown } from "react-icons/fi";

/**
 * CTA Banner Component with 10 display variants and dynamic colors
 *
 * Variants:
 * 1. sticky-top - Fixed banner at the top
 * 2. floating-button - Floating button at bottom right
 * 3. slide-bottom - Slides up from bottom after scroll
 * 4. smart-header - Shows in header, shrinks on scroll
 * 5. banner-strip - Thin strip at top with minimal design
 * 6. corner-popup - Pops up from bottom left corner
 * 7. full-screen-takeover - Full screen overlay (aggressive)
 * 8. slide-in-left - Slides in from left side
 * 9. sticky-bottom - Fixed at bottom with close button
 * 10. notification-bar - Minimal notification style at top
 */

const CTABanner = ({
  variant = "sticky-top",
  title = "Schedule Your Free ROI Audit",
  description = "Discover exactly why top brands trust us with ₹300+ Crores in ad spends",
  buttonText = "Get ROI Audit",
  phoneNumber = "+919176402555",
  onButtonClick = null,
  showAfterScroll = 100,
  dismissible = true,
  storageKey = "cta-banner-dismissed",
  customColors = null,
  formId = null,
}) => {
  // Use custom colors with fallback
  const colors = customColors || {
    bgFrom: "#ef4444",
    bgTo: "#dc2626",
    buttonBg: "#ffffff",
    buttonText: "#dc2626",
    text: "#ffffff",
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  // State for interactive variants
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Create inline styles for background gradient
  const bgStyle = {
    background: `linear-gradient(to right, ${colors.bgFrom}, ${colors.bgTo})`,
    color: colors.text,
  };

  const buttonStyle = {
    background: colors.buttonBg,
    color: colors.buttonText,
  };

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey);
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    if (
      variant === "slide-bottom" ||
      variant === "floating-button" ||
      variant === "corner-popup" ||
      variant === "slide-in-left"
    ) {
      const handleScroll = () => {
        const scrolled = window.scrollY > showAfterScroll;
        setIsVisible(scrolled);
        setIsScrolled(scrolled);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else if (variant === "smart-header") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      setIsVisible(true);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsVisible(true);
    }
  }, [variant, showAfterScroll, storageKey]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    if (storageKey) {
      localStorage.setItem(storageKey, "true");
    }
  };

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (formId) {
      // Open form in modal
      window.dispatchEvent(
        new CustomEvent("openFormModal", { detail: { formId } })
      );
    } else {
      window.location.href = "/contact";
    }
  };

  if (isDismissed || !isVisible) return null;

  // Variant 1: Sticky Top Banner
  if (variant === "sticky-top") {
    return (
      <div
        className={`fixed top-0 left-0 right-0 z-50 shadow-lg transform transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={bgStyle}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <div className="hidden md:block flex-shrink-0">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">👨‍💼</span>
                </div>
              </div>
              <div className="text-center md:text-left flex-1 min-w-0">
                <h3 className="text-base md:text-xl font-bold mb-1 truncate">
                  {title}
                </h3>
                <p className="text-xs md:text-sm opacity-90 line-clamp-1">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <button
                onClick={handleClick}
                className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold text-sm md:text-base hover:opacity-90 transition-colors shadow-md whitespace-nowrap"
                style={buttonStyle}
              >
                {buttonText}
              </button>
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  className="border-2 px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold text-sm md:text-base hover:bg-white hover:bg-opacity-20 transition-colors whitespace-nowrap flex items-center gap-2"
                  style={{ borderColor: colors.text, color: colors.text }}
                >
                  <FiPhone className="hidden md:inline" />
                  <span className="hidden sm:inline">Call: </span>
                  {phoneNumber}
                </a>
              )}
              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors ml-2"
                  aria-label="Dismiss"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant 2: Floating Button
  if (variant === "floating-button") {
    return (
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <div className="relative group">
          <button
            onClick={handleClick}
            style={bgStyle}
            className="px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 font-semibold"
          >
            <span className="text-lg">🎯</span>
            <span className="hidden sm:inline">{buttonText}</span>
            <span className="sm:hidden">CTA</span>
          </button>
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block animate-fadeIn">
            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm whitespace-nowrap">
              {title}
              {phoneNumber && (
                <div className="text-xs text-gray-300 mt-1">{phoneNumber}</div>
              )}
            </div>
          </div>
          {dismissible && (
            <button
              onClick={handleDismiss}
              style={bgStyle}
              className="absolute -top-2 -right-2 text-white rounded-full p-1 hover:opacity-90 transition-colors shadow-lg"
              aria-label="Dismiss"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Variant 3: Slide Bottom
  if (variant === "slide-bottom") {
    return (
      <div
        style={bgStyle}
        className={`fixed bottom-0 left-0 right-0 z-50 shadow-2xl transform transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-lg md:text-xl font-bold mb-1">{title}</h3>
              <p className="text-sm opacity-90">{description}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleClick}
                style={buttonStyle}
                className="px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors shadow-md whitespace-nowrap"
              >
                {buttonText}
              </button>
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  style={{ borderColor: colors.text, color: colors.text }}
                  className="border-2 px-4 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-colors flex items-center gap-2"
                >
                  <FiPhone />
                </a>
              )}
              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                  aria-label="Dismiss"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant 4: Smart Header
  if (variant === "smart-header") {
    return (
      <div
        style={bgStyle}
        className={`fixed top-0 left-0 right-0 z-50 shadow-lg transition-all duration-300 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "gap-2" : "gap-4"
            }`}
          >
            {isScrolled ? (
              <>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xl">🎯</span>
                  <span className="font-semibold text-sm truncate hidden md:inline">
                    {title}
                  </span>
                  <span className="font-semibold text-sm md:hidden">
                    Free Audit
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClick}
                    style={buttonStyle}
                    className="px-4 py-1.5 rounded-md font-semibold text-sm hover:opacity-90 transition-colors"
                  >
                    Get Started
                  </button>
                  {dismissible && (
                    <button
                      onClick={handleDismiss}
                      className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
                    >
                      <FiX size={16} />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="hidden md:block flex-shrink-0">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">👨‍💼</span>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-bold mb-1">
                      {title}
                    </h3>
                    <p className="text-xs md:text-sm opacity-90 hidden md:block">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleClick}
                    style={buttonStyle}
                    className="px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-colors"
                  >
                    {buttonText}
                  </button>
                  {phoneNumber && (
                    <a
                      href={`tel:${phoneNumber}`}
                      style={{ borderColor: colors.text, color: colors.text }}
                      className="border-2 px-4 py-2.5 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-colors hidden sm:flex items-center gap-2"
                    >
                      <FiPhone /> {phoneNumber}
                    </a>
                  )}
                  {dismissible && (
                    <button
                      onClick={handleDismiss}
                      className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                    >
                      <FiX size={20} />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Variant 5: Banner Strip
  if (variant === "banner-strip") {
    return (
      <div
        style={bgStyle}
        className={`fixed top-0 left-0 right-0 z-50 shadow-md py-2 transform transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-xl">📢</span>
              <p className="text-sm md:text-base font-semibold truncate">
                {title}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClick}
                style={buttonStyle}
                className="px-4 py-1.5 rounded-md font-semibold text-sm hover:opacity-90 transition-colors whitespace-nowrap"
              >
                {buttonText}
              </button>
              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant 6: Corner Popup
  if (variant === "corner-popup") {
    return (
      <div
        className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
          isVisible
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <div
          style={bgStyle}
          className="rounded-xl shadow-2xl p-6 max-w-sm relative"
        >
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
              aria-label="Dismiss"
            >
              <FiX size={18} />
            </button>
          )}
          <div className="pr-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm opacity-90 mb-4">{description}</p>
            <div className="space-y-2">
              <button
                onClick={handleClick}
                style={buttonStyle}
                className="w-full px-4 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-colors"
              >
                {buttonText}
              </button>
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  style={{ borderColor: colors.text, color: colors.text }}
                  className="w-full border-2 px-4 py-2.5 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-colors flex items-center justify-center gap-2"
                >
                  <FiPhone /> Call Now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant 7: Full Screen Takeover
  if (variant === "full-screen-takeover") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
        <div
          style={bgStyle}
          className={`rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full relative transform transition-all duration-500 ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              aria-label="Dismiss"
            >
              <FiX size={24} />
            </button>
          )}
          <div className="text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-lg md:text-xl opacity-90 mb-8">{description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleClick}
                style={buttonStyle}
                className="px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-colors shadow-lg"
              >
                {buttonText}
              </button>
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  style={{ borderColor: colors.text, color: colors.text }}
                  className="border-2 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:bg-opacity-20 transition-colors flex items-center justify-center gap-3"
                >
                  <FiPhone size={24} /> {phoneNumber}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant 8: Slide In Left
  if (variant === "slide-in-left") {
    return (
      <div
        className={`fixed top-1/2 left-0 -translate-y-1/2 z-50 transition-all duration-500 ${
          isVisible
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <div
          style={bgStyle}
          className="rounded-r-xl shadow-2xl p-6 max-w-xs relative"
        >
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
              aria-label="Dismiss"
            >
              <FiX size={16} />
            </button>
          )}
          <div className="pr-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📢</span>
              <h3 className="text-base font-bold">{title}</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">{description}</p>
            <button
              onClick={handleClick}
              style={buttonStyle}
              className="w-full px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-colors"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Variant 9: Sticky Bottom
  if (variant === "sticky-bottom") {
    return (
      <div
        style={bgStyle}
        className={`fixed bottom-0 left-0 right-0 z-50 shadow-2xl transform transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0 text-center sm:text-left">
              <div className="hidden sm:block">
                <span className="text-3xl">🎯</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-bold mb-1 truncate">
                  {title}
                </h3>
                <p className="text-xs md:text-sm opacity-90 line-clamp-1">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClick}
                style={buttonStyle}
                className="px-4 md:px-6 py-2 rounded-lg font-semibold text-sm md:text-base hover:opacity-90 transition-colors whitespace-nowrap"
              >
                {buttonText}
              </button>
              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors"
                  aria-label="Dismiss"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant 10: Notification Bar
  if (variant === "notification-bar") {
    return (
      <div
        style={bgStyle}
        className={`fixed top-0 left-0 right-0 z-50 shadow-sm py-3 transform transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 text-center">
            <span className="hidden sm:inline text-lg">ℹ️</span>
            <p className="text-sm md:text-base font-medium flex-1 min-w-0 truncate">
              {title}
            </p>
            <button
              onClick={handleClick}
              style={buttonStyle}
              className="px-4 py-1.5 rounded-md font-semibold text-sm hover:opacity-90 transition-colors whitespace-nowrap"
            >
              {buttonText}
            </button>
            {dismissible && (
              <button
                onClick={handleDismiss}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
                aria-label="Dismiss"
              >
                <FiX size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Variant 11: Slide In Right
  if (variant === "slide-in-right") {
    return (
      <div
        className={`fixed top-1/2 right-0 -translate-y-1/2 z-50 transition-all duration-500 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div
          style={bgStyle}
          className="rounded-l-xl shadow-2xl p-6 max-w-xs relative"
        >
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="absolute top-2 left-2 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
              aria-label="Dismiss"
            >
              <FiX size={16} />
            </button>
          )}
          <div className="pl-6">
            <div className="flex items-center gap-2 mb-3 justify-end">
              <h3 className="text-base font-bold">{title}</h3>
              <span className="text-2xl">🎯</span>
            </div>
            <p className="text-sm opacity-90 mb-4 text-right">{description}</p>
            <button
              onClick={handleClick}
              style={buttonStyle}
              className="w-full px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-colors"
            >
              {buttonText}
            </button>
            {phoneNumber && (
              <a
                href={`tel:${phoneNumber}`}
                style={{ borderColor: colors.text, color: colors.text }}
                className="w-full border-2 px-4 py-2 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <FiPhone /> Call Now
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Variant 12: Expanding Bar
  if (variant === "expanding-bar") {
    return (
      <div
        style={bgStyle}
        className={`fixed top-0 left-0 right-0 z-50 shadow-lg transform transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isExpanded ? "py-6" : "py-3"}`}
      >
        <div className="container mx-auto px-4">
          {isExpanded ? (
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-base opacity-90 mb-4 max-w-2xl mx-auto">
                {description}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleClick}
                  style={buttonStyle}
                  className="px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors"
                >
                  {buttonText}
                </button>
                {phoneNumber && (
                  <a
                    href={`tel:${phoneNumber}`}
                    style={{ borderColor: colors.text, color: colors.text }}
                    className="border-2 px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-colors flex items-center gap-2"
                  >
                    <FiPhone /> {phoneNumber}
                  </a>
                )}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-colors"
                >
                  <FiChevronDown className="transform rotate-180" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-xl">🎯</span>
                <p className="text-sm md:text-base font-semibold truncate">
                  {title}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="px-4 py-1.5 rounded-md font-semibold text-sm hover:bg-white hover:bg-opacity-20 transition-colors whitespace-nowrap"
                >
                  Learn More <FiChevronDown className="inline ml-1" />
                </button>
                {dismissible && (
                  <button
                    onClick={handleDismiss}
                    className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
                    aria-label="Dismiss"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Variant 13: Ribbon Corner
  if (variant === "ribbon-corner") {
    return (
      <div
        className={`fixed top-0 right-0 z-50 transform transition-all duration-500 ${
          isVisible
            ? "translate-x-0 translate-y-0 opacity-100"
            : "translate-x-full -translate-y-full opacity-0"
        }`}
      >
        <div className="relative">
          <div
            style={bgStyle}
            className="w-64 py-4 px-6 shadow-2xl transform origin-top-right rotate-45 translate-x-16 -translate-y-8"
          >
            <div className="transform -rotate-45 translate-y-8">
              <p className="text-sm font-bold text-center mb-2">{title}</p>
              <button
                onClick={handleClick}
                style={buttonStyle}
                className="w-full px-4 py-2 rounded-lg font-semibold text-xs hover:opacity-90 transition-colors"
              >
                {buttonText}
              </button>
            </div>
          </div>
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white hover:bg-opacity-70 rounded-full p-1 transition-colors"
              aria-label="Dismiss"
            >
              <FiX size={14} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Variant 14: Floating Card
  if (variant === "floating-card") {
    return (
      <div
        className={`fixed bottom-20 right-6 z-50 transition-all duration-700 ${
          isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-10 opacity-0 scale-95"
        }`}
      >
        <div
          style={bgStyle}
          className="rounded-2xl shadow-2xl p-6 max-w-sm relative animate-bounce-slow"
        >
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors"
              aria-label="Dismiss"
            >
              <FiX size={18} />
            </button>
          )}
          <div className="pr-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-4xl animate-pulse">🎯</div>
              <h3 className="text-lg font-bold">{title}</h3>
            </div>
            <p className="text-sm opacity-90 mb-4 leading-relaxed">
              {description}
            </p>
            <div className="space-y-2">
              <button
                onClick={handleClick}
                style={buttonStyle}
                className="w-full px-5 py-3 rounded-xl font-bold hover:opacity-90 transition-all hover:scale-105 shadow-lg"
              >
                {buttonText}
              </button>
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  style={{ borderColor: colors.text, color: colors.text }}
                  className="w-full border-2 px-5 py-3 rounded-xl font-bold hover:bg-white hover:bg-opacity-20 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FiPhone size={18} /> Call Now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant 15: Side Tab
  if (variant === "side-tab") {
    return (
      <div
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex items-stretch transition-all duration-500 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div style={bgStyle} className="rounded-r-xl shadow-2xl p-6 max-w-sm">
            {dismissible && (
              <button
                onClick={handleDismiss}
                className="absolute top-2 right-2 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
                aria-label="Dismiss"
              >
                <FiX size={16} />
              </button>
            )}
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm opacity-90 mb-4">{description}</p>
            <button
              onClick={handleClick}
              style={buttonStyle}
              className="w-full px-4 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-colors mb-2"
            >
              {buttonText}
            </button>
            {phoneNumber && (
              <a
                href={`tel:${phoneNumber}`}
                style={{ borderColor: colors.text, color: colors.text }}
                className="w-full border-2 px-4 py-2.5 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-colors flex items-center justify-center gap-2"
              >
                <FiPhone /> {phoneNumber}
              </a>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={bgStyle}
            className="py-8 px-3 rounded-r-xl shadow-lg hover:opacity-90 transition-all flex items-center"
          >
            <span className="text-sm font-bold writing-mode-vertical transform -rotate-180 whitespace-nowrap">
              {isOpen ? "◀ Close" : "Open ▶"}
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Variant 16: Bottom Drawer
  if (variant === "bottom-drawer") {
    return (
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          style={bgStyle}
          className={`shadow-2xl transition-all duration-500 ${
            isExpanded ? "h-96" : "h-20"
          }`}
        >
          <div className="container mx-auto px-4 h-full">
            {isExpanded ? (
              <div className="h-full flex flex-col justify-center py-6">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-3 right-4 hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  <FiChevronDown />
                </button>
                <div className="text-center max-w-2xl mx-auto">
                  <div className="text-5xl mb-4">🎯</div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    {title}
                  </h2>
                  <p className="text-base md:text-lg opacity-90 mb-6">
                    {description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleClick}
                      style={buttonStyle}
                      className="px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-colors shadow-lg"
                    >
                      {buttonText}
                    </button>
                    {phoneNumber && (
                      <a
                        href={`tel:${phoneNumber}`}
                        style={{ borderColor: colors.text, color: colors.text }}
                        className="border-2 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:bg-opacity-20 transition-colors flex items-center justify-center gap-3"
                      >
                        <FiPhone size={24} /> {phoneNumber}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h3 className="text-base md:text-lg font-bold truncate">
                      {title}
                    </h3>
                    <p className="text-xs md:text-sm opacity-90 truncate hidden sm:block">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="px-4 md:px-6 py-2 rounded-lg font-semibold text-sm md:text-base hover:bg-white hover:bg-opacity-20 transition-colors whitespace-nowrap"
                  >
                    View Details{" "}
                    <FiChevronDown className="inline ml-1 transform -rotate-180" />
                  </button>
                  {dismissible && (
                    <button
                      onClick={handleDismiss}
                      className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                      aria-label="Dismiss"
                    >
                      <FiX size={20} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Variant 17: Vertical Left
  if (variant === "vertical-left") {
    return (
      <>
        {/* Desktop: Full-height vertical banner */}
        <div
          className={`hidden lg:block fixed right-0 top-0 bottom-0 z-40 w-28 xl:w-32 transition-all duration-700 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div
            style={bgStyle}
            className="h-full shadow-2xl flex flex-col items-center justify-between py-6 px-3 relative overflow-hidden"
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 pointer-events-none"></div>

            {dismissible && (
              <button
                onClick={handleDismiss}
                className="relative z-10 hover:bg-white hover:bg-opacity-30 rounded-full p-1.5 transition-all hover:scale-110 hover:rotate-90 shadow-lg"
                aria-label="Dismiss"
              >
                <FiX size={16} />
              </button>
            )}

            <div className="relative z-10 flex-1 flex flex-col-reverse items-center justify-center gap-5 py-4">
              {/* Icon with glow effect */}
              <div className="relative">
                <div
                  className="absolute inset-0 blur-xl opacity-50"
                  style={{ background: colors.buttonBg }}
                ></div>
                <div className="relative text-4xl animate-bounce-slow drop-shadow-2xl">
                  🎯
                </div>
              </div>

              {/* Vertical Title with better styling */}
              <div className="relative h-48 flex items-center justify-center">
                <h3
                  className="text-xs xl:text-sm font-black tracking-wide whitespace-nowrap absolute drop-shadow-lg"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                    letterSpacing: "0.05em",
                  }}
                >
                  {title}
                </h3>
              </div>

              {/* CTA Button with enhanced styling */}
              <button
                onClick={handleClick}
                style={buttonStyle}
                className="relative px-3 py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-all hover:scale-105 shadow-xl w-full group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span
                  className="relative block whitespace-nowrap text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                    letterSpacing: "0.03em",
                  }}
                >
                  {buttonText}
                </span>
              </button>

              {/* Phone Button with pulse animation */}
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  style={{ borderColor: colors.text, color: colors.text }}
                  className="relative border-2 p-3 rounded-full hover:bg-white hover:bg-opacity-30 transition-all hover:scale-105 shadow-xl group animate-pulse-slow"
                >
                  <FiPhone
                    size={20}
                    className="group-hover:rotate-12 transition-transform"
                  />
                </a>
              )}
            </div>

            {/* Bottom accent line */}
            <div
              className="relative z-10 w-full h-0.5 rounded-full"
              style={{ background: colors.buttonBg, opacity: 0.3 }}
            ></div>
          </div>
        </div>

        {/* Mobile: Bottom sticky bar */}
        <div
          className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <div style={bgStyle} className="shadow-2xl px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-2xl">🎯</span>
                <h3 className="text-sm font-bold truncate">{title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClick}
                  style={buttonStyle}
                  className="px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-colors whitespace-nowrap shadow-md"
                >
                  {buttonText}
                </button>
                {phoneNumber && (
                  <a
                    href={`tel:${phoneNumber}`}
                    style={{ borderColor: colors.text, color: colors.text }}
                    className="border-2 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                  >
                    <FiPhone size={18} />
                  </a>
                )}
                {dismissible && (
                  <button
                    onClick={handleDismiss}
                    className="hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors"
                    aria-label="Dismiss"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Variant 18: Vertical Right
  if (variant === "vertical-right") {
    return (
      <>
        {/* Desktop: Full-height vertical banner */}
        <div
          className={`hidden lg:block fixed left-0 top-0 bottom-0 z-40 w-28 xl:w-32 transition-all duration-700 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div
            style={bgStyle}
            className="h-full shadow-2xl flex flex-col items-center justify-between py-6 px-3 relative overflow-hidden"
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 pointer-events-none"></div>

            {dismissible && (
              <button
                onClick={handleDismiss}
                className="relative z-10 hover:bg-white hover:bg-opacity-30 rounded-full p-1.5 transition-all hover:scale-110 hover:rotate-90 shadow-lg"
                aria-label="Dismiss"
              >
                <FiX size={16} />
              </button>
            )}

            <div className="relative z-10 flex-1 flex flex-col-reverse items-center justify-center gap-5 py-4">
              {/* Icon with glow effect */}
              <div className="relative">
                <div
                  className="absolute inset-0 blur-xl opacity-50"
                  style={{ background: colors.buttonBg }}
                ></div>
                <div className="relative text-4xl animate-bounce-slow drop-shadow-2xl">
                  🎯
                </div>
              </div>

              {/* Vertical Title with better styling */}
              <div className="relative h-48 flex items-center justify-center">
                <h3
                  className="text-xs xl:text-sm font-black tracking-wide whitespace-nowrap absolute drop-shadow-lg"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                    letterSpacing: "0.05em",
                  }}
                >
                  {title}
                </h3>
              </div>

              {/* CTA Button with enhanced styling */}
              <button
                onClick={handleClick}
                style={buttonStyle}
                className="relative px-3 py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-all hover:scale-105 shadow-xl w-full group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span
                  className="relative block whitespace-nowrap text-xs"
                  style={{
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                    letterSpacing: "0.03em",
                  }}
                >
                  {buttonText}
                </span>
              </button>

              {/* Phone Button with pulse animation */}
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  style={{ borderColor: colors.text, color: colors.text }}
                  className="relative border-2 p-3 rounded-full hover:bg-white hover:bg-opacity-30 transition-all hover:scale-105 shadow-xl group animate-pulse-slow"
                >
                  <FiPhone
                    size={20}
                    className="group-hover:rotate-12 transition-transform"
                  />
                </a>
              )}
            </div>

            {/* Bottom accent line */}
            <div
              className="relative z-10 w-full h-0.5 rounded-full"
              style={{ background: colors.buttonBg, opacity: 0.3 }}
            ></div>
          </div>
        </div>

        {/* Mobile: Bottom sticky bar */}
        <div
          className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <div style={bgStyle} className="shadow-2xl px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-2xl">🎯</span>
                <h3 className="text-sm font-bold truncate">{title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClick}
                  style={buttonStyle}
                  className="px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-colors whitespace-nowrap shadow-md"
                >
                  {buttonText}
                </button>
                {phoneNumber && (
                  <a
                    href={`tel:${phoneNumber}`}
                    style={{ borderColor: colors.text, color: colors.text }}
                    className="border-2 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                  >
                    <FiPhone size={18} />
                  </a>
                )}
                {dismissible && (
                  <button
                    onClick={handleDismiss}
                    className="hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors"
                    aria-label="Dismiss"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default CTABanner;
