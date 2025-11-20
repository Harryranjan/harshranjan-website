import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import FormEmbed from "./FormEmbed";
import { parseShortcodes } from "../utils/shortcodeParser";

export default function PopupEmbed({ popup, onClose, onTrackView, onTrackClick, onTrackDismissal }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show popup with slight delay for animation
    setTimeout(() => setVisible(true), 100);
    
    // Track view
    if (onTrackView) {
      onTrackView();
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      if (onTrackDismissal) {
        onTrackDismissal();
      }
      if (onClose) {
        onClose();
      }
    }, 300); // Wait for animation to complete
  };

  const handleCTAClick = () => {
    if (onTrackClick) {
      onTrackClick();
    }
    
    if (popup.cta_link && popup.cta_link !== "#") {
      if (popup.cta_link.startsWith("http")) {
        window.open(popup.cta_link, "_blank");
      } else {
        window.location.href = popup.cta_link;
      }
    }
  };

  // Auto-close functionality
  useEffect(() => {
    if (popup.styling?.autoClose && popup.styling?.autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, popup.styling.autoCloseDelay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [popup.styling]);

  const getPositionClasses = () => {
    const position = popup.styling?.position || "bottom-right";
    
    const positions = {
      "top-left": "top-4 left-4 md:top-6 md:left-6",
      "top-center": "top-4 left-1/2 transform -translate-x-1/2 md:top-6",
      "top-right": "top-4 right-4 md:top-6 md:right-6",
      "center-left": "top-1/2 left-4 transform -translate-y-1/2 md:left-6",
      "center": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      "center-right": "top-1/2 right-4 transform -translate-y-1/2 md:right-6",
      "bottom-left": "bottom-4 left-4 md:bottom-6 md:left-6",
      "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2 md:bottom-6",
      "bottom-right": "bottom-4 right-4 md:bottom-6 md:right-6",
    };
    
    return positions[position] || positions["bottom-right"];
  };

  const getSizeClasses = () => {
    const size = popup.styling?.size || "small";
    
    const sizes = {
      small: "w-80 max-w-[90vw]",
      medium: "w-96 max-w-[90vw]",
      large: "w-[600px] max-w-[90vw]",
      full: "w-full max-w-[95vw]",
    };
    
    return sizes[size] || sizes.small;
  };

  const getAnimationClass = () => {
    if (!visible) return "opacity-0 scale-95";
    
    const animation = popup.styling?.animation || "fadeIn";
    
    switch (animation) {
      case "slideIn":
        const position = popup.styling?.position || "bottom-right";
        if (position.includes("left")) return "opacity-100 translate-x-0";
        if (position.includes("right")) return "opacity-100 translate-x-0";
        if (position.includes("top")) return "opacity-100 translate-y-0";
        if (position.includes("bottom")) return "opacity-100 translate-y-0";
        return "opacity-100";
      case "slideUp":
        return "opacity-100 translate-y-0";
      case "slideDown":
        return "opacity-100 translate-y-0";
      case "bounce":
        return "opacity-100 animate-bounce";
      case "zoomIn":
        return "opacity-100 scale-100";
      case "fadeIn":
      default:
        return "opacity-100";
    }
  };

  const styles = {
    backgroundColor: popup.styling?.backgroundColor || "#3b82f6",
    color: popup.styling?.textColor || "#ffffff",
    borderRadius: `${popup.styling?.borderRadius || 8}px`,
    boxShadow: popup.styling?.shadow
      ? "0 10px 40px rgba(0, 0, 0, 0.3)"
      : "none",
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-out ${getPositionClasses()} ${getSizeClasses()} ${getAnimationClass()}`}
      style={styles}
    >
      <div className="relative p-4 md:p-6">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
          aria-label="Close popup"
        >
          <FiX className="w-4 h-4" />
        </button>

        {/* Icon */}
        {popup.icon && (
          <div className="text-3xl mb-3">{popup.icon}</div>
        )}

        {/* Title */}
        {popup.title && (
          <h3 className="text-lg font-bold mb-2 pr-6">{popup.title}</h3>
        )}

        {/* Content */}
        {popup.content && (
          <div
            className="text-sm mb-4 opacity-90 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: popup.template === 'custom_code' ? popup.content : parseShortcodes(popup.content),
            }}
          />
        )}

        {/* Form Integration */}
        {popup.form_id && (
          <div className="mb-4">
            <FormEmbed formId={popup.form_id} compact />
          </div>
        )}

        {/* CTA Button */}
        {popup.cta_text && (
          <button
            onClick={handleCTAClick}
            className="w-full py-2 px-4 rounded-lg font-medium transition-all hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: popup.styling?.textColor || "#ffffff",
              color: popup.styling?.backgroundColor || "#3b82f6",
            }}
          >
            {popup.cta_text}
          </button>
        )}
      </div>
    </div>
  );
}
