import { useState, useEffect } from "react";
import api from "../utils/api";

const DynamicFooter = () => {
  const [footerHTML, setFooterHTML] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      // Fetch the active footer for the 'footer' location
      const response = await api.get("/menus/location/footer");

      if (response.data.menu && response.data.menu.is_active) {
        const { settings } = response.data.menu;

        // Use custom code if available
        if (settings && settings.customCode) {
          setFooterHTML(settings.customCode);
        }
      }
    } catch (error) {
      console.error("Failed to fetch footer:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null; // or a loading skeleton
  }

  if (!footerHTML) {
    return null; // No footer configured
  }

  // Extract just the footer HTML (remove DOCTYPE and html/head/body tags if present)
  const extractFooterContent = (html) => {
    // If it's a complete HTML document, extract just the footer
    if (html.includes("<!DOCTYPE") || html.includes("<html")) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const footer = doc.querySelector("footer");
      return footer ? footer.outerHTML : html;
    }
    return html;
  };

  const cleanFooterHTML = extractFooterContent(footerHTML);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: cleanFooterHTML }}
      className="dynamic-footer"
    />
  );
};

export default DynamicFooter;
