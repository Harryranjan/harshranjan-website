import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

/**
 * DemoModal Component
 * Reusable modal system for embedding demos throughout the site
 */
const DemoModal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "large", // 'small', 'medium', 'large', 'full'
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (closeOnEsc && e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose, closeOnEsc]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeClasses = {
    small: "max-w-md",
    medium: "max-w-2xl",
    large: "max-w-5xl",
    full: "max-w-7xl",
    xlarge: "max-w-6xl",
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 ${
        isAnimating ? "animate-fade-in" : ""
      }`}
      onClick={handleOverlayClick}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

      {/* Modal Container - Increased height and better scrolling */}
      <div
        className={`relative bg-white rounded-xl sm:rounded-2xl shadow-2xl ${
          sizeClasses[size]
        } w-full max-h-[95vh] flex flex-col ${
          isAnimating ? "animate-scale-in" : ""
        }`}
      >
        {/* Header */}
        {(title || description || showCloseButton) && (
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between z-10">
            <div className="flex-1 pr-4">
              {title && (
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-gray-600 text-sm">{description}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
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
            )}
          </div>
        )}

        {/* Content - Better scrolling for content-heavy demos */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 sm:py-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="max-w-full">{children}</div>
        </div>
      </div>
    </div>
  );

  // Render modal in portal (outside root component hierarchy)
  return ReactDOM.createPortal(modalContent, document.body);
};

/**
 * useDemoModal Hook
 * Simplifies modal state management
 */
export const useDemoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, open, close, toggle };
};

/**
 * DemoButton Component
 * Reusable button that triggers demo modals
 */
export const DemoButton = ({
  children,
  variant = "primary", // 'primary', 'secondary', 'outline'
  size = "medium", // 'small', 'medium', 'large'
  onClick,
  icon,
  fullWidth = false,
  disabled = false,
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105",
    secondary:
      "bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-xl hover:scale-105",
    outline:
      "border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-700",
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-10 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        font-bold rounded-lg transition-all transform
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        flex items-center justify-center gap-2
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

/**
 * DemoCard Component
 * Card with demo preview and "Try Demo" button
 */
export const DemoCard = ({
  title,
  description,
  icon,
  image,
  demoComponent,
  gradient = "from-blue-500 to-purple-500",
  modalSize = "large", // Allow customization of modal size
}) => {
  const { isOpen, open, close } = useDemoModal();

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 group">
        {/* Header with Gradient */}
        <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
          <div className="flex items-center gap-3 mb-2">
            {icon && <span className="text-4xl">{icon}</span>}
            <h3 className="text-2xl font-bold">{title}</h3>
          </div>
          <p className="text-white/90">{description}</p>
        </div>

        {/* Image Preview (optional) */}
        {image && (
          <div className="aspect-video bg-gray-100 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        )}

        {/* Footer with CTA */}
        <div className="p-6">
          <DemoButton onClick={open} variant="primary" fullWidth>
            Try Interactive Demo →
          </DemoButton>
        </div>
      </div>

      {/* Modal with Demo */}
      <DemoModal
        isOpen={isOpen}
        onClose={close}
        title={title}
        description={description}
        size={modalSize}
      >
        {demoComponent}
      </DemoModal>
    </>
  );
};

/**
 * QuickDemoTrigger Component
 * Inline button/link that opens demo modal (for embedding in content)
 */
export const QuickDemoTrigger = ({
  children,
  demoComponent,
  modalTitle,
  modalDescription,
  buttonText = "Try Demo",
  inline = false,
}) => {
  const { isOpen, open, close } = useDemoModal();

  if (inline) {
    return (
      <>
        <button
          onClick={open}
          className="text-blue-600 hover:text-blue-700 font-semibold underline inline-flex items-center gap-1"
        >
          {buttonText}
          <span className="text-xs">▶</span>
        </button>
        <DemoModal
          isOpen={isOpen}
          onClose={close}
          title={modalTitle}
          description={modalDescription}
        >
          {demoComponent}
        </DemoModal>
      </>
    );
  }

  return (
    <>
      {children ? (
        <div onClick={open} className="cursor-pointer">
          {children}
        </div>
      ) : (
        <DemoButton onClick={open}>{buttonText}</DemoButton>
      )}
      <DemoModal
        isOpen={isOpen}
        onClose={close}
        title={modalTitle}
        description={modalDescription}
      >
        {demoComponent}
      </DemoModal>
    </>
  );
};

export default DemoModal;
