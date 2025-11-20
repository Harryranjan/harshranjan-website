import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";
import api from "../utils/api";
import FormEmbed from "./FormEmbed";
import { parseShortcodes } from "../utils/shortcodeParser";

/**
 * ModalEmbed - Renders a modal from the backend
 * Can be triggered manually or automatically based on modal settings
 *
 * @param {number} modalId - Modal ID to render
 * @param {function} onClose - Close handler
 * @param {boolean} isOpen - Control visibility externally
 */
export default function ModalEmbed({ modalId, onClose, isOpen = true }) {
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (modalId && isOpen) {
      loadModal();
      trackView();
    }
  }, [modalId, isOpen]);

  const loadModal = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/modals/${modalId}`);
      setModal(data);
    } catch (error) {
      console.error("Error loading modal:", error);
      setError("Failed to load modal");
    } finally {
      setLoading(false);
    }
  };

  const trackView = async () => {
    try {
      await api.post(`/modals/${modalId}/view`);
    } catch (error) {
      console.error("Error tracking view:", error);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleConversion = async () => {
    try {
      await api.post(`/modals/${modalId}/conversion`);
    } catch (error) {
      console.error("Error tracking conversion:", error);
    }
  };

  const handleCTAClick = () => {
    handleConversion();
    if (modal.cta_link) {
      window.location.href = modal.cta_link;
    }
    handleClose();
  };

  if (!isOpen) return null;
  if (loading) return null;
  if (error || !modal) return null;

  // Size classes with exact pixel widths for different screen sizes
  const getSizeClasses = (size) => {
    switch (size) {
      case "xs":
        return "w-full max-w-[320px]"; // Mobile-first, 320px
      case "small":
        return "w-full max-w-[480px]"; // Small screens
      case "medium":
        return "w-full max-w-[640px]"; // Medium screens
      case "large":
        return "w-full max-w-[800px]"; // Large screens
      case "xl":
        return "w-full max-w-[1024px]"; // Extra large
      case "2xl":
        return "w-full max-w-[1280px]"; // 2X large
      case "fullscreen":
        return "w-full h-full max-w-full max-h-full m-0"; // Full screen
      default:
        return "w-full max-w-[640px]"; // Default medium
    }
  };

  // Position classes with exact positioning for all 12 positions
  const getPositionClasses = (position) => {
    switch (position) {
      case "center":
        return "items-center justify-center";
      case "center-top":
        return "items-start justify-center pt-8 md:pt-12";
      case "center-bottom":
        return "items-end justify-center pb-8 md:pb-12";
      case "top-left":
        return "items-start justify-start pt-4 pl-4 md:pt-8 md:pl-8";
      case "top-right":
        return "items-start justify-end pt-4 pr-4 md:pt-8 md:pr-8";
      case "bottom-left":
        return "items-end justify-start pb-4 pl-4 md:pb-8 md:pl-8";
      case "bottom-right":
        return "items-end justify-end pb-4 pr-4 md:pb-8 md:pr-8";
      case "left":
        return "items-center justify-start pl-4 md:pl-8";
      case "right":
        return "items-center justify-end pr-4 md:pr-8";
      case "top":
        return "items-start justify-center pt-4 md:pt-8";
      case "bottom":
        return "items-end justify-center pb-4 md:pb-8";
      default:
        return "items-center justify-center"; // Default center
    }
  };

  // Get animation class
  const getAnimationClass = (animation) => {
    switch (animation) {
      case "fade":
        return "animate-fadeIn";
      case "slideUp":
        return "animate-slideUp";
      case "slideDown":
        return "animate-slideDown";
      case "slideLeft":
        return "animate-slideLeft";
      case "slideRight":
        return "animate-slideRight";
      case "zoomIn":
        return "animate-zoomIn";
      case "bounce":
        return "animate-bounce";
      default:
        return "animate-fadeIn";
    }
  };

  const styling = modal.styling || {};
  const size = styling.size || "medium";
  const position = styling.position || "center";
  const animation = styling.animation || "fade";
  const isFullscreen = size === "fullscreen";
  const isCustomPosition = position === "custom" && styling.customPosition;

  // Build custom position styles with responsive support
  const getCustomPositionStyle = () => {
    if (!isCustomPosition) return {};

    const customPos = styling.customPosition || {};
    const style = {};

    // Check screen width for responsive positioning
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Apply responsive values or fallback to base values
    if (customPos.top) {
      if (isMobile && customPos.topMobile) {
        style.top = `${customPos.topMobile}px`;
      } else if (isTablet && customPos.topTablet) {
        style.top = `${customPos.topTablet}px`;
      } else {
        style.top = `${customPos.top}px`;
      }
    }

    if (customPos.right) {
      if (isMobile && customPos.rightMobile) {
        style.right = `${customPos.rightMobile}px`;
      } else if (isTablet && customPos.rightTablet) {
        style.right = `${customPos.rightTablet}px`;
      } else {
        style.right = `${customPos.right}px`;
      }
    }

    if (customPos.bottom) {
      if (isMobile && customPos.bottomMobile) {
        style.bottom = `${customPos.bottomMobile}px`;
      } else if (isTablet && customPos.bottomTablet) {
        style.bottom = `${customPos.bottomTablet}px`;
      } else {
        style.bottom = `${customPos.bottom}px`;
      }
    }

    if (customPos.left) {
      if (isMobile && customPos.leftMobile) {
        style.left = `${customPos.leftMobile}px`;
      } else if (isTablet && customPos.leftTablet) {
        style.left = `${customPos.leftTablet}px`;
      } else {
        style.left = `${customPos.left}px`;
      }
    }

    return style;
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isCustomPosition ? "" : `flex ${getPositionClasses(position)}`
      } ${isFullscreen ? "p-0" : "p-4"} overflow-y-auto`}
      style={{
        backgroundColor:
          styling.overlay && styling.overlayColor
            ? styling.overlayColor
            : "rgba(0, 0, 0, 0.5)",
      }}
      onClick={handleClose}
    >
      <div
        className={`${getSizeClasses(size)} ${getAnimationClass(animation)} ${
          isCustomPosition ? "fixed" : "relative"
        }`}
        style={isCustomPosition ? getCustomPositionStyle() : {}}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="rounded-lg shadow-2xl p-8 relative"
          style={{
            backgroundColor: modal.styling?.backgroundColor || "#ffffff",
            color: modal.styling?.textColor || "#000000",
            borderRadius: `${modal.styling?.borderRadius || 8}px`,
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            aria-label="Close modal"
          >
            <FiX className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="pr-8">
            {modal.title && (
              <h2 className="text-3xl font-bold mb-4">{modal.title}</h2>
            )}

            {modal.content &&
              (() => {
                const { parsedContent, components } = parseShortcodes(
                  modal.content
                );

                // If no shortcodes, render normally
                if (components.length === 0) {
                  return (
                    <div
                      className="prose max-w-none mb-6"
                      dangerouslySetInnerHTML={{ __html: modal.content }}
                    />
                  );
                }

                // Render content with shortcodes replaced
                let contentWithComponents = parsedContent;
                components.forEach((component) => {
                  if (component.type === "form") {
                    const formEmbed = `<div id="form-${component.id}-placeholder"></div>`;
                    contentWithComponents = contentWithComponents.replace(
                      component.placeholder,
                      formEmbed
                    );
                  }
                });

                return (
                  <div className="mb-6">
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: contentWithComponents,
                      }}
                    />
                    {/* Render forms outside HTML */}
                    {components.map((component, index) => {
                      if (component.type === "form") {
                        return (
                          <div key={index} className="my-4">
                            <FormEmbed
                              formId={parseInt(component.id)}
                              className={component.className}
                              onSuccess={() => {
                                handleConversion();
                                setTimeout(handleClose, 2000);
                              }}
                            />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                );
              })()}

            {/* Legacy form_id support (deprecated, use shortcodes instead) */}
            {modal.form_id &&
              !modal.content?.includes(`[form id="${modal.form_id}"]`) && (
                <div className="mb-6">
                  <FormEmbed
                    formId={modal.form_id}
                    onSuccess={() => {
                      handleConversion();
                      setTimeout(handleClose, 2000);
                    }}
                  />
                </div>
              )}

            {/* CTA Button */}
            {modal.cta_text && (
              <button
                onClick={handleCTAClick}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg"
              >
                {modal.cta_text}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ModalEmbed.propTypes = {
  modalId: PropTypes.number.isRequired,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};
