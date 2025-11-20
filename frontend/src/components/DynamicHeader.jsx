import { useState, useEffect } from "react";
import api from "../utils/api";

const DynamicHeader = () => {
  const [headerHTML, setHeaderHTML] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeader();
  }, []);

  const fetchHeader = async () => {
    try {
      // Fetch the active header for the 'header' location
      const response = await api.get("/menus/location/header");
      
      if (response.data.menu && response.data.menu.is_active) {
        const { settings } = response.data.menu;
        
        // Use custom code if available
        if (settings && settings.customCode) {
          setHeaderHTML(settings.customCode);
        }
      }
    } catch (error) {
      console.error("Failed to fetch header:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null; // or a loading skeleton
  }

  if (!headerHTML) {
    return null; // No header configured
  }

  // Extract just the header HTML (remove DOCTYPE and html/head/body tags if present)
  const extractHeaderContent = (html) => {
    // If it's a complete HTML document, extract just the header
    if (html.includes("<!DOCTYPE") || html.includes("<html")) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const header = doc.querySelector("header");
      return header ? header.outerHTML : html;
    }
    return html;
  };

  const cleanHeaderHTML = extractHeaderContent(headerHTML);

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: cleanHeaderHTML }}
      className="dynamic-header"
    />
  );
};

export default DynamicHeader;
