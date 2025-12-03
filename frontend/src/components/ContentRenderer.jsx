import React, { useState } from "react";
import { parseShortcodes } from "../utils/shortcodeParser";
import FormEmbed from "./FormEmbed";
import CTABannerEmbed from "./CTABannerEmbed";
import ModalEmbed from "./ModalEmbed";
import PopupEmbed from "./PopupEmbed";
import api from "../utils/api";

/**
 * Component that renders content with shortcode support
 * Usage: <ContentRenderer content="Some text [form id='123'] more text" />
 * Supports: [form id="123"], [cta_banner id="123"], [modal id="123"], [popup id="123"]
 */
// Helper component to trigger popups
function PopupTrigger({ popupId, className }) {
  const [popup, setPopup] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPopup = async () => {
    if (loading || popup) return;
    
    try {
      setLoading(true);
      const { data } = await api.get(`/popups/${popupId}`);
      setPopup(data);
      setShowPopup(true);
    } catch (error) {
      console.error("Error loading popup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={loadPopup}
        disabled={loading}
        className={className || "inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"}
      >
        {loading ? "Loading..." : "Show Popup"}
      </button>
      {showPopup && popup && (
        <PopupEmbed
          popup={popup}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default function ContentRenderer({ content, className = "" }) {
  const [openModals, setOpenModals] = useState({});
  const [openPopups, setOpenPopups] = useState({});

  if (!content) return null;

  const { parsedContent, components } = parseShortcodes(content);

  // If no components, just render the content as HTML
  if (components.length === 0) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Split content by placeholders
  const parts = parsedContent.split(/(__[A-Z_]+_\d+_\d+__)/g);

  const handleOpenModal = (modalId) => {
    setOpenModals(prev => ({ ...prev, [modalId]: true }));
  };

  const handleCloseModal = (modalId) => {
    setOpenModals(prev => ({ ...prev, [modalId]: false }));
  };

  return (
    <div className={className}>
      {parts.map((part, index) => {
        const component = components.find((c) => c.placeholder === part);

        if (component) {
          if (component.type === "form") {
            return (
              <FormEmbed
                key={`form-${component.id}-${index}`}
                formId={parseInt(component.id)}
                className={component.className}
              />
            );
          }
          if (component.type === "cta_banner") {
            return (
              <CTABannerEmbed
                key={`cta-banner-${component.id}-${index}`}
                id={parseInt(component.id)}
              />
            );
          }
          if (component.type === "modal") {
            return (
              <div key={`modal-${component.id}-${index}`}>
                <button
                  onClick={() => handleOpenModal(component.id)}
                  className={component.className || "inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"}
                >
                  Open Modal
                </button>
                {openModals[component.id] && (
                  <ModalEmbed
                    modalId={parseInt(component.id)}
                    isOpen={true}
                    onClose={() => handleCloseModal(component.id)}
                  />
                )}
              </div>
            );
          }
          if (component.type === "popup") {
            // Popup needs to fetch its data first
            return (
              <PopupTrigger
                key={`popup-${component.id}-${index}`}
                popupId={parseInt(component.id)}
                className={component.className}
              />
            );
          }
          return null;
        }

        return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
      })}
    </div>
  );
}
