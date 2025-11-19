import React from "react";

/**
 * Parse shortcodes in content and replace with React components
 * Supports: [form id="123"], [modal id="123"], [popup id="123"]
 */
export const parseShortcodes = (content) => {
  if (!content) return content;

  // Regular expressions for different shortcodes
  const patterns = {
    form: /\[form\s+id=["'](\d+)["']\s*(?:class=["']([^"']*)["'])?\]/gi,
    modal: /\[modal\s+id=["'](\d+)["']\s*(?:class=["']([^"']*)["'])?\]/gi,
    popup: /\[popup\s+id=["'](\d+)["']\s*(?:class=["']([^"']*)["'])?\]/gi,
  };

  let parsedContent = content;
  const components = [];

  // Parse form shortcodes
  let match;
  while ((match = patterns.form.exec(content)) !== null) {
    const [fullMatch, id, className = ""] = match;
    const placeholder = `__FORM_${id}_${components.length}__`;
    parsedContent = parsedContent.replace(fullMatch, placeholder);
    components.push({
      type: "form",
      id,
      className,
      placeholder,
    });
  }

  return { parsedContent, components };
};

/**
 * Render content with shortcodes as React components
 * Note: This returns JSX elements that need FormEmbed component
 */
export const renderWithShortcodes = (content) => {
  const { parsedContent, components } = parseShortcodes(content);

  if (components.length === 0) {
    return parsedContent;
  }

  // Return data for ContentRenderer to handle
  return { parsedContent, components };
};

/**
 * Hook to use shortcodes in React components
 */
export const useShortcodes = (content) => {
  return React.useMemo(() => {
    return parseShortcodes(content);
  }, [content]);
};

/**
 * Initialize shortcodes on mount for server-rendered content
 * This scans the DOM for shortcodes and hydrates them with React
 */
export const initShortcodes = () => {
  // This would be implemented if needed for SSR
  console.warn("initShortcodes: Use ContentRenderer component instead");
};

/**
 * Extract shortcode data from text
 */
export const extractShortcodes = (content) => {
  const { components } = parseShortcodes(content);
  return components;
};

/**
 * Check if content contains any shortcodes
 */
export const hasShortcodes = (content) => {
  if (!content) return false;
  return /\[(form|modal|popup)\s+id=["']\d+["']\]/i.test(content);
};

/**
 * Generate shortcode string
 */
export const generateShortcode = (type, id, options = {}) => {
  let shortcode = `[${type} id="${id}"`;

  if (options.className) {
    shortcode += ` class="${options.className}"`;
  }

  shortcode += "]";
  return shortcode;
};

export default {
  parseShortcodes,
  renderWithShortcodes,
  useShortcodes,
  initShortcodes,
  extractShortcodes,
  hasShortcodes,
  generateShortcode,
};
