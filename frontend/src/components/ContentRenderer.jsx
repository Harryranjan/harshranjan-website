import React from "react";
import { parseShortcodes } from "../utils/shortcodeParser";
import FormEmbed from "./FormEmbed";

/**
 * Component that renders content with shortcode support
 * Usage: <ContentRenderer content="Some text [form id='123'] more text" />
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
  const parts = parsedContent.split(/(__[A-Z]+_\d+_\d+__)/g);

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
          // Add modal and popup rendering here later
          return null;
        }

        return <div key={index} dangerouslySetInnerHTML={{ __html: part }} />;
      })}
    </div>
  );
}
