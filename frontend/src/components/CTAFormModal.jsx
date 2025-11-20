import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import FormEmbed from "./FormEmbed";

/**
 * Global modal for displaying forms triggered by CTA banners
 * Listens for custom events to open forms
 */
const CTAFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formId, setFormId] = useState(null);

  useEffect(() => {
    const handleOpenFormModal = (event) => {
      const { formId } = event.detail;
      if (formId) {
        setFormId(formId);
        setIsOpen(true);
      }
    };

    window.addEventListener("openFormModal", handleOpenFormModal);

    return () => {
      window.removeEventListener("openFormModal", handleOpenFormModal);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setFormId(null), 300); // Clear after animation
  };

  const handleSuccess = () => {
    // Show success message and close
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  if (!isOpen || !formId) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-600">
          <h2 className="text-lg font-bold text-white">Request Information</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <FiX size={20} className="text-white" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <FormEmbed formId={parseInt(formId)} onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default CTAFormModal;
