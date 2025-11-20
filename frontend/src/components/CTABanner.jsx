import { useState, useEffect } from 'react';
import { FiX, FiPhone } from 'react-icons/fi';

/**
 * CTA Banner Component with multiple display variants
 * 
 * Variants:
 * 1. sticky-top - Fixed banner at the top (like your image)
 * 2. floating-button - Floating button at bottom right
 * 3. slide-bottom - Slides up from bottom after scroll
 * 4. smart-header - Shows in header, shrinks on scroll
 */

const CTABanner = ({ 
  variant = 'sticky-top',
  title = 'Schedule Your Free ROI Audit',
  description = 'Discover exactly why top brands trust us with ₹300+ Crores in ad spends',
  buttonText = 'Get ROI Audit',
  phoneNumber = '+919176402555',
  onButtonClick = null,
  showAfterScroll = 100, // pixels to scroll before showing (for slide-bottom variant)
  dismissible = true,
  storageKey = 'cta-banner-dismissed', // localStorage key for dismissed state
  customColors = null // Custom color scheme from database
}) => {
  // Use custom colors if provided, otherwise use default red theme
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
    // Check if banner was previously dismissed
    const dismissed = localStorage.getItem(storageKey);
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show banner based on variant
    if (variant === 'slide-bottom' || variant === 'floating-button') {
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
      // sticky-top - always visible
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
      // Default action - open modal or navigate
      window.location.href = '/contact';
    }
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  if (isDismissed || !isVisible) return null;

  // Variant 1: Sticky Top Banner (Like your image)
  if (variant === 'sticky-top') {
    return (
      <div className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            {/* Left: Image + Text */}
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <div className="hidden md:block flex-shrink-0">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">👨‍💼</span>
                </div>
              </div>
              <div className="text-center md:text-left flex-1 min-w-0">
                <h3 className="text-base md:text-xl font-bold mb-1 truncate">{title}</h3>
                <p className="text-xs md:text-sm text-red-50 line-clamp-1">{description}</p>
              </div>
            </div>

            {/* Right: CTA Buttons */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <button
                onClick={handleClick}
                className="bg-white text-red-600 px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold text-sm md:text-base hover:bg-red-50 transition-colors shadow-md whitespace-nowrap"
              >
                {buttonText}
              </button>
              <a
                href={`tel:${phoneNumber}`}
                className="border-2 border-white text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold text-sm md:text-base hover:bg-white hover:text-red-600 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                <FiPhone className="hidden md:inline" />
                <span className="hidden sm:inline">Call: </span>{phoneNumber}
              </a>

              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors ml-2"
                  aria-label="Dismiss banner"
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

  // Variant 2: Floating Button (Bottom Right)
  if (variant === 'floating-button') {
    return (
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="relative group">
          {/* Main Button */}
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 font-semibold"
          >
            <span className="text-lg">🎯</span>
            <span className="hidden sm:inline">{buttonText}</span>
            <span className="sm:hidden">ROI Audit</span>
          </button>

          {/* Tooltip on hover */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block animate-fadeIn">
            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm whitespace-nowrap">
              {title}
              <div className="text-xs text-gray-300 mt-1">{phoneNumber}</div>
            </div>
          </div>

          {/* Dismiss button */}
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors shadow-lg"
              aria-label="Dismiss"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Variant 3: Slide-in Bottom Banner
  if (variant === 'slide-bottom') {
    return (
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-2xl transform transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-lg md:text-xl font-bold mb-1">{title}</h3>
              <p className="text-sm text-red-50">{description}</p>
            </div>
            
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleClick}
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors shadow-md whitespace-nowrap"
              >
                {buttonText}
              </button>
              <a
                href={`tel:${phoneNumber}`}
                className="border-2 border-white text-white px-4 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors flex items-center gap-2"
              >
                <FiPhone />
              </a>

              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
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

  // Variant 4: Smart Header (Shrinks on scroll)
  if (variant === 'smart-header') {
    return (
      <div className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'gap-2' : 'gap-4'}`}>
            {/* Compact view on scroll */}
            {isScrolled ? (
              <>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xl">🎯</span>
                  <span className="font-semibold text-sm truncate hidden md:inline">{title}</span>
                  <span className="font-semibold text-sm md:hidden">Free ROI Audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClick}
                    className="bg-white text-red-600 px-4 py-1.5 rounded-md font-semibold text-sm hover:bg-red-50 transition-colors"
                  >
                    Get Audit
                  </button>
                  {dismissible && (
                    <button onClick={handleDismiss} className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors">
                      <FiX size={16} />
                    </button>
                  )}
                </div>
              </>
            ) : (
              // Full view
              <>
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="hidden md:block flex-shrink-0">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">👨‍💼</span>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-bold mb-1">{title}</h3>
                    <p className="text-xs md:text-sm text-red-50 hidden md:block">{description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleClick}
                    className="bg-white text-red-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                  >
                    {buttonText}
                  </button>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="border-2 border-white text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors hidden sm:flex items-center gap-2"
                  >
                    <FiPhone /> {phoneNumber}
                  </a>
                  {dismissible && (
                    <button onClick={handleDismiss} className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors">
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

  return null;
};

export default CTABanner;
