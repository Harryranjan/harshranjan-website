import React from "react";
import FormEmbed from "./FormEmbed";

/**
 * Universal Shortcode Parser Component
 *
 * Usage: Wrap any content and shortcodes work automatically
 *
 * Example 1 - Direct in JSX:
 *   <ShortcodeParser>
 *     <p>Contact us [form id="1"] today!</p>
 *   </ShortcodeParser>
 *
 * Example 2 - With variables:
 *   const content = "Fill this [form id='2'] form";
 *   <ShortcodeParser>{content}</ShortcodeParser>
 *
 * Example 3 - With HTML:
 *   <ShortcodeParser>
 *     <div dangerouslySetInnerHTML={{__html: dbContent}} />
 *   </ShortcodeParser>
 */
export default function ShortcodeParser({ children, className = "" }) {
  const parseContent = (content) => {
    if (!content) return null;

    // Convert to string if needed
    const text = typeof content === "string" ? content : content.toString();

    // Find all form shortcodes
    const formPattern =
      /\[form\s+id=["']?(\d+)["']?\s*(?:class=["']([^"']*)["'])?\]/gi;
    const parts = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = formPattern.exec(text)) !== null) {
      // Add text before shortcode
      if (match.index > lastIndex) {
        const beforeText = text.substring(lastIndex, match.index);
        parts.push(
          <span
            key={`text-${key++}`}
            dangerouslySetInnerHTML={{ __html: beforeText }}
          />
        );
      }

      // Add form component
      const formId = parseInt(match[1]);
      const formClass = match[2] || "";
      parts.push(
        <FormEmbed
          key={`form-${formId}-${key++}`}
          formId={formId}
          className={formClass}
        />
      );

      lastIndex = formPattern.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      parts.push(
        <span
          key={`text-${key++}`}
          dangerouslySetInnerHTML={{ __html: remainingText }}
        />
      );
    }

    return parts.length > 0 ? parts : text;
  };

  const processChildren = (children) => {
    return React.Children.map(children, (child) => {
      // If it's a string, parse it
      if (typeof child === "string") {
        return parseContent(child);
      }

      // If it's a React element with children
      if (React.isValidElement(child)) {
        // Check if it has innerHTML set (dangerouslySetInnerHTML)
        if (child.props.dangerouslySetInnerHTML) {
          const html = child.props.dangerouslySetInnerHTML.__html;
          const parsed = parseContent(html);
          return <div className={child.props.className}>{parsed}</div>;
        }

        // If it has text children, parse them
        if (child.props.children) {
          const newChildren = processChildren(child.props.children);
          return React.cloneElement(child, {}, newChildren);
        }
      }

      return child;
    });
  };

  return <div className={className}>{processChildren(children)}</div>;
}
