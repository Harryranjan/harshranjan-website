import React from "react";
import { parseShortcodes } from "../utils/shortcodeParser";
import FormEmbed from "./FormEmbed";
import CTABannerEmbed from "./CTABannerEmbed";

/**
 * Component that renders content with shortcode support
 * Usage: <ContentRenderer content="Some text [form id='123'] more text" />
 * Supports: [form id="123"], [cta_banner id="123"]
 */
export default function ContentRenderer({ content, className = "" }) {
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
          // Add modal and popup rendering here later
          return null;
        }

        return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
      })}
    </div>
  );
}
