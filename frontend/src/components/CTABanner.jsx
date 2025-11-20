import { useState, useEffect } from 'react';
import { FiX, FiPhone, FiMail, FiChevronDown } from 'react-icons/fi';

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
  variant = 'sticky-top',
  title = 'Schedule Your Free ROI Audit',
  description = 'Discover exactly why top brands trust us with ₹300+ Crores in ad spends',
  buttonText = 'Get ROI Audit',
  phoneNumber = '+919176402555',
  onButtonClick = null,
  showAfterScroll = 100,
  dismissible = true,
  storageKey = 'cta-banner-dismissed',
  customColors = null
}) => {
  // Use custom colors with fallback
  const colors = customColors || {
    background: 'from-red-500 to-red-600',
    buttonBg: 'white',
    buttonText: 'red-600',
    text: 'white'
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey);
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    if (variant === 'slide-bottom' || variant === 'floating-button' || variant === 'corner-popup' || variant === 'slide-in-left') {
      const handleScroll = () => {
        const scrolled = window.scrollY > showAfterScroll;
        setIsVisible(scrolled);
        setIsScrolled(scrolled);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else if (variant === 'smart-header') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      setIsVisible(true);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsVisible(true);
    }
  }, [variant, showAfterScroll, storageKey]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    if (storageKey) {
      localStorage.setItem(storageKey, 'true');
    }
  };

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      window.location.href = '/contact';
    }
  };

  if (isDismissed || !isVisible) return null;

  // Helper to get background gradient class
  const getBgClass = () => `bg-gradient-to-r ${colors.background}`;
  const getButtonClass = () => `bg-${colors.buttonBg} text-${colors.buttonText}`;
  const getTextClass = () => `text-${colors.text}`;

  // Variant 1: Sticky Top Banner
  if (variant === 'sticky-top') {
    return (
      <div className={`fixed top-0 left-0 right-0 z-50 ${getBgClass()} ${getTextClass()} shadow-lg transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <div className="hidden md:block flex-shrink-0">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">👨‍💼</span>
                </div>
              </div>
              <div className="text-center md:text-left flex-1 min-w-0">
                <h3 className="text-base md:text-xl font-bold mb-1 truncate">{title}</h3>
                <p className="text-xs md:text-sm opacity-90 line-clamp-1">{description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <button onClick={handleClick} className={`${getButtonClass()} px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold text-sm md:text-base hover:opacity-90 transition-colors shadow-md whitespace-nowrap`}>
                {buttonText}
              </button>
              {phoneNumber && (
                <a href={`tel:${phoneNumber}`} className={`border-2 border-current ${getTextClass()} px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold text-sm md:text-base hover:bg-white hover:bg-opacity-20 transition-colors whitespace-nowrap flex items-center gap-2`}>
                  <FiPhone className="hidden md:inline" />
                  <span className="hidden sm:inline">Call: </span>{phoneNumber}
                </a>
              )}
              {dismissible && (
                <button onClick={handleDismiss} className="hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors ml-2" aria-label="Dismiss">
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
  if (variant === 'floating-button') {
    return (
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="relative group">
          <button onClick={handleClick} className={`${getBgClass()} ${getTextClass()} px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 font-semibold`}>
            <span className="text-lg">🎯</span>
            <span className="hidden sm:inline">{buttonText}</span>
            <span className="sm:hidden">CTA</span>
          </button>
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block animate-fadeIn">
            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm whitespace-nowrap">
              {title}
              {phoneNumber && <div className="text-xs text-gray-300 mt-1">{phoneNumber}</div>}
            </div>
          </div>
          {dismissible && (
            <button onClick={handleDismiss} className={`absolute -top-2 -right-2 ${getBgClass()} text-white rounded-full p-1 hover:opacity-90 transition-colors shadow-lg`} aria-label="Dismiss">
              <FiX size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Variant 3: Slide Bottom
  if (variant === 'slide-bottom') {
    return (
      <div className={`fixed bottom-0 left-0 right-0 z-50 ${getBgClass()} ${getTextClass()} shadow-2xl transform transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-lg md:text-xl font-bold mb-1">{title}</h3>
              <p className="text-sm opacity-90">{description}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button onClick={handleClick} className={`${getButtonClass()} px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors shadow-md whitespace-nowrap`}>
                {buttonText}
              </button>
              {phoneNumber && (
                <a href={`tel:${phoneNumber}`} className="border-2 border-current px-4 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-colors flex items-center gap-2">
                  <FiPhone />
                </a>
              )}
              {dismissible && (
                <button onClick={handleDismiss} className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors" aria-label="Dismiss">
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
  if (variant === 'smart-header') {
    return (
      <div className={`fixed top-0 left-0 right-0 z-50 ${getBgClass()} ${getTextClass()} shadow-lg transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'gap-2' : 'gap-4'}`}>
            {isScrolled ? (
              <>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xl">🎯</span>
                  <span className="font-semibold text-sm truncate hidden md:inline">{title}</span>
                  <span className="font-semibold text-sm md:hidden">Free Audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleClick} className={`${getButtonClass()} px-4 py-1.5 rounded-md font-semibold text-sm hover:opacity-90 transition-colors`}>
                    Get Started
                  </button>
                  {dismissible && (
                    <button onClick={handleDismiss} className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors">
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
                    <h3 className="text-lg md:text-xl font-bold mb-1">{title}</h3>
                    <p className="text-xs md:text-sm opacity-90 hidden md:block">{description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={handleClick} className={`${getButtonClass()} px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-colors`}>
                    {buttonText}
                  </button>
                  {phoneNumber && (
                    <a href={`tel:${phoneNumber}`} className="border-2 border-current px-4 py-2.5 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-colors hidden sm:flex items-center gap-2">
                      <FiPhone /> {phoneNumber}
                    </a>
                  )}
                  {dismissible && (
                    <button onClick={handleDismiss} className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors">
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
  if (variant === 'banner-strip') {
    return (
      <div className={`fixed top-0 left-0 right-0 z-50 ${getBgClass()} ${getTextClass()} shadow-md py-2 transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-xl">📢</span>
              <p className="text-sm md:text-base font-semibold truncate">{title}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleClick} className={`${getButtonClass()} px-4 py-1.5 rounded-md font-semibold text-sm hover:opacity-90 transition-colors whitespace-nowrap`}>
                {buttonText}
              </button>
              {dismissible && (
                <button onClick={handleDismiss} className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors">
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
  if (variant === 'corner-popup') {
    return (
      <div className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className={`${getBgClass()} ${getTextClass()} rounded-xl shadow-2xl p-6 max-w-sm relative`}>
          {dismissible && (
            <button onClick={handleDismiss} className="absolute top-2 right-2 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors" aria-label="Dismiss">
              <FiX size={18} />
            </button>
          )}
          <div className="pr-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm opacity-90 mb-4">{description}</p>
            <div className="space-y-2">
              <button onClick={handleClick} className={`w-full ${getButtonClass()} px-4 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-colors`}>
                {buttonText}
              </button>
              {phoneNumber && (
                <a href={`tel:${phoneNumber}`} className="w-full border-2 border-current px-4 py-2.5 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-colors flex items-center justify-center gap-2">
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
  if (variant === 'full-screen-takeover') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className={`${getBgClass()} ${getTextClass()} rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full relative transform transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          {dismissible && (
            <button onClick={handleDismiss} className="absolute top-4 right-4 hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors" aria-label="Dismiss">
              <FiX size={24} />
            </button>
          )}
          <div className="text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-lg md:text-xl opacity-90 mb-8">{description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleClick} className={`${getButtonClass()} px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-colors shadow-lg`}>
                {buttonText}
              </button>
              {phoneNumber && (
                <a href={`tel:${phoneNumber}`} className="border-2 border-current px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:bg-opacity-20 transition-colors flex items-center justify-center gap-3">
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
  if (variant === 'slide-in-left') {
    return (
      <div className={`fixed top-1/2 left-0 -translate-y-1/2 z-50 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
        <div className={`${getBgClass()} ${getTextClass()} rounded-r-xl shadow-2xl p-6 max-w-xs relative`}>
          {dismissible && (
            <button onClick={handleDismiss} className="absolute top-2 right-2 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors" aria-label="Dismiss">
              <FiX size={16} />
            </button>
          )}
          <div className="pr-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📢</span>
              <h3 className="text-base font-bold">{title}</h3>
            </div>
            <p className="text-sm opacity-90 mb-4">{description}</p>
            <button onClick={handleClick} className={`w-full ${getButtonClass()} px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-colors`}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Variant 9: Sticky Bottom
  if (variant === 'sticky-bottom') {
    return (
      <div className={`fixed bottom-0 left-0 right-0 z-50 ${getBgClass()} ${getTextClass()} shadow-2xl transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0 text-center sm:text-left">
              <div className="hidden sm:block">
                <span className="text-3xl">🎯</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-bold mb-1 truncate">{title}</h3>
                <p className="text-xs md:text-sm opacity-90 line-clamp-1">{description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleClick} className={`${getButtonClass()} px-4 md:px-6 py-2 rounded-lg font-semibold text-sm md:text-base hover:opacity-90 transition-colors whitespace-nowrap`}>
                {buttonText}
              </button>
              {dismissible && (
                <button onClick={handleDismiss} className="hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors" aria-label="Dismiss">
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
  if (variant === 'notification-bar') {
    return (
      <div className={`fixed top-0 left-0 right-0 z-50 ${getBgClass()} ${getTextClass()} shadow-sm py-3 transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 text-center">
            <span className="hidden sm:inline text-lg">ℹ️</span>
            <p className="text-sm md:text-base font-medium flex-1 min-w-0 truncate">
              {title}
            </p>
            <button onClick={handleClick} className={`${getButtonClass()} px-4 py-1.5 rounded-md font-semibold text-sm hover:opacity-90 transition-colors whitespace-nowrap`}>
              {buttonText}
            </button>
            {dismissible && (
              <button onClick={handleDismiss} className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors" aria-label="Dismiss">
                <FiX size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CTABanner;
