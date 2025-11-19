import { useMemo } from "react";
import { parseShortcodes } from "../utils/shortcodeParser";

/**
 * Hook to automatically parse shortcodes in any text
 *
 * Usage:
 *   const content = "Contact us [form id='1'] today!";
 *   const parsed = useShortcodes(content);
 *   return <div>{parsed}</div>
 */
export function useShortcodes(content) {
  return useMemo(() => {
    if (!content) return content;

    const { parsedContent, components } = parseShortcodes(content);

    // Return object with parsed data
    return {
      hasShortcodes: components.length > 0,
      parsedContent,
      components,
      originalContent: content,
    };
  }, [content]);
}

/**
 * Hook to check if content has any shortcodes
 */
export function useHasShortcodes(content) {
  return useMemo(() => {
    if (!content) return false;
    return /\[(?:form|modal|popup)\s+id=["']?\d+["']?\]/i.test(content);
  }, [content]);
}
