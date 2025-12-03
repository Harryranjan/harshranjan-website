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
        } else if (settings && settings.type === "footer-builder") {
          // Generate HTML from visual builder settings
          setFooterHTML(generateFooterHTML(settings));
        }
      }
    } catch (error) {
      console.error("Failed to fetch footer:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateFooterHTML = (settings) => {
    const {
      columns = [],
      copyright = {},
      socialIcons = {},
      newsletter = {},
      styles = {},
      spacing = {},
      layout = {},
      typography = {},
      theme = "modern",
    } = settings;

    // Get spacing values with defaults
    const paddingTop = spacing.paddingTop || "64";
    const paddingBottom = spacing.paddingBottom || "32";
    const paddingX = spacing.paddingX || "16";
    const columnGap = spacing.columnGap || "48";
    const sectionGap = spacing.sectionGap || "64";

    // Get typography values with defaults
    const headingSize = typography.headingSize || "20";
    const linkSize = typography.linkSize || "16";
    const headingWeight = typography.headingWeight || "700";

    // Get layout values
    const alignment = layout.alignment || "left";
    const textAlign =
      alignment === "center"
        ? "text-center"
        : alignment === "right"
        ? "text-right"
        : "text-left";

    const columnClass =
      columns.length === 1
        ? "grid-cols-1"
        : columns.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : columns.length === 3
        ? "grid-cols-1 md:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

    // Theme-specific styles
    const themeStyles = {
      modern: {
        background: `linear-gradient(to bottom, ${
          styles.backgroundColor || "#1F2937"
        }, #0F172A)`,
        headingGradient: `linear-gradient(135deg, ${
          styles.accentColor || "#8B5CF6"
        }, #06B6D4)`,
        buttonGradient: `linear-gradient(135deg, ${
          styles.accentColor || "#8B5CF6"
        }, #06B6D4)`,
        socialGradient: `linear-gradient(135deg, ${
          styles.accentColor || "#8B5CF6"
        }, #06B6D4)`,
        borderRadius: "12px",
        shadow: "rgba(139, 92, 246, 0.4)",
      },
      minimal: {
        background: styles.backgroundColor || "#FFFFFF",
        headingGradient: "none",
        buttonGradient: "none",
        socialGradient: "none",
        borderRadius: "4px",
        shadow: "rgba(0, 0, 0, 0.1)",
      },
      corporate: {
        background: styles.backgroundColor || "#1E293B",
        headingGradient: "none",
        buttonGradient: "none",
        socialGradient: "none",
        borderRadius: "8px",
        shadow: "rgba(0, 0, 0, 0.2)",
      },
      creative: {
        background: `linear-gradient(135deg, ${
          styles.backgroundColor || "#1F2937"
        }, #7C3AED, #EC4899)`,
        headingGradient: `linear-gradient(90deg, #FBBF24, #F59E0B, #EF4444)`,
        buttonGradient: `linear-gradient(135deg, #F59E0B, #EF4444)`,
        socialGradient: `linear-gradient(135deg, #8B5CF6, #EC4899)`,
        borderRadius: "16px",
        shadow: "rgba(236, 72, 153, 0.5)",
      },
    };

    const currentTheme = themeStyles[theme] || themeStyles.modern;

    return `
<style>
  .footer-link {
    position: relative;
    display: inline-block;
    transition: all 0.3s ease;
  }
  ${
    theme === "modern"
      ? `
  .footer-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: ${styles.accentColor || "#8B5CF6"};
    transition: width 0.3s ease;
  }
  .footer-link:hover::after {
    width: 100%;
  }
  `
      : ""
  }
  .footer-link:hover {
    color: ${styles.linkHoverColor || "#FFFFFF"} !important;
    ${theme === "modern" ? "transform: translateX(4px);" : ""}
  }
  .social-icon {
    transition: all 0.3s ease;
  }
  .social-icon:hover {
    ${
      theme === "modern"
        ? `
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 8px 16px ${currentTheme.shadow};
    `
        : theme === "creative"
        ? `
    transform: rotate(10deg) scale(1.15);
    box-shadow: 0 10px 20px ${currentTheme.shadow};
    `
        : "opacity: 0.8;"
    }
  }
  .newsletter-input {
    transition: all 0.3s ease;
  }
  .newsletter-input:focus {
    outline: none;
    ${
      theme !== "minimal"
        ? `
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
    transform: translateY(-2px);
    `
        : "box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);"
    }
  }
  .newsletter-button {
    transition: all 0.3s ease;
  }
  .newsletter-button:hover {
    ${theme !== "minimal" ? "transform: translateY(-2px);" : ""}
    box-shadow: 0 8px 16px ${currentTheme.shadow};
  }
  .newsletter-button:active {
    transform: translateY(0);
  }
  ${
    theme === "modern"
      ? `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  `
      : ""
  }
</style>
<footer style="background: ${currentTheme.background}; color: ${
      styles.textColor || "#FFFFFF"
    }; padding: ${paddingTop}px ${paddingX}px ${paddingBottom}px;">
  <div class="container mx-auto">
    ${
      newsletter.enabled
        ? `
    <div class="mb-${
      parseInt(sectionGap) / 4
    } text-center max-w-2xl mx-auto" style="margin-bottom: ${sectionGap}px;">
      <h3 class="text-3xl md:text-4xl font-bold mb-4" style="color: ${
        styles.textColor || "#FFFFFF"
      }; ${
            currentTheme.headingGradient !== "none"
              ? `background: ${currentTheme.headingGradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;`
              : ""
          }">
        ${newsletter.title || "Subscribe to Our Newsletter"}
      </h3>
      <p class="text-base md:text-lg mb-8" style="color: ${
        styles.linkColor || "#9CA3AF"
      };">Stay updated with our latest news and updates</p>
      <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="${newsletter.placeholder || "Enter your email address"}" 
          class="newsletter-input flex-1 px-5 py-4 text-gray-900"
          style="background-color: #FFFFFF; border-radius: ${
            currentTheme.borderRadius
          };"
        />
        <button class="newsletter-button px-8 py-4 font-semibold whitespace-nowrap" style="${
          currentTheme.buttonGradient !== "none"
            ? `background: ${currentTheme.buttonGradient}`
            : `background-color: ${styles.accentColor || "#8B5CF6"}`
        }; color: #FFFFFF; border-radius: ${currentTheme.borderRadius};">
          Subscribe
        </button>
      </div>
    </div>
    `
        : ""
    }
    
    <div class="grid ${columnClass}" style="gap: ${columnGap}px; margin-bottom: ${
      parseInt(paddingBottom) + 16
    }px;">
      ${columns
        .map(
          (column, index) => `
      <div class="footer-column ${textAlign}" style="${
            theme === "modern"
              ? `animation: fadeInUp 0.6s ease ${index * 0.1}s both;`
              : ""
          }">
        <h3 class="font-bold mb-6 relative ${
          alignment === "center" ? "inline-block" : ""
        }" style="color: ${
            styles.textColor || "#FFFFFF"
          }; font-size: ${headingSize}px; font-weight: ${headingWeight};">
          ${column.title}
          ${
            theme !== "minimal"
              ? `<span style="position: absolute; bottom: -8px; ${
                  alignment === "center"
                    ? "left: 50%; transform: translateX(-50%);"
                    : "left: 0;"
                } width: 40px; height: 3px; background: linear-gradient(90deg, ${
                  styles.accentColor || "#8B5CF6"
                }, transparent); border-radius: 2px;"></span>`
              : ""
          }
        </h3>
        ${
          column.content === "social" && socialIcons.enabled
            ? `<div class="flex ${
                alignment === "center"
                  ? "justify-center"
                  : alignment === "right"
                  ? "justify-end"
                  : ""
              } flex-wrap gap-3">
          ${socialIcons.icons
            .map(
              (icon) => `
            <a href="${
              icon.url
            }" target="_blank" rel="noopener noreferrer" class="social-icon w-12 h-12 rounded-full flex items-center justify-center" style="${
                currentTheme.socialGradient !== "none"
                  ? `background: ${currentTheme.socialGradient}`
                  : `background-color: ${styles.accentColor || "#8B5CF6"}`
              }; color: #FFFFFF; border-radius: ${
                currentTheme.borderRadius
              };" title="${icon.icon}">
              ${
                icon.icon === "LinkedIn"
                  ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>'
                  : icon.icon === "Twitter"
                  ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>'
                  : icon.icon === "Facebook"
                  ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
                  : icon.icon === "Instagram"
                  ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>'
                  : icon.icon === "YouTube"
                  ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
                  : icon.icon === "GitHub"
                  ? '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'
                  : icon.name.charAt(0)
              }
            </a>
          `
            )
            .join("")}
        </div>`
            : `<ul class="space-y-3">
          ${column.items
            .map(
              (item) => `
            <li>
              <a href="${item.url}" class="footer-link" style="color: ${
                styles.linkColor || "#9CA3AF"
              }; font-size: ${linkSize}px;">
                ${item.label}
              </a>
            </li>
          `
            )
            .join("")}
        </ul>`
        }
      </div>
      `
        )
        .join("")}
    </div>
    
    ${
      copyright.enabled
        ? `
    <div class="border-t pt-8 mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-sm" style="border-color: ${
      styles.borderColor || "#374151"
    };">
      <p style="color: ${styles.linkColor || "#9CA3AF"};" class="text-center">${
            copyright.text
          }</p>
    </div>
    `
        : ""
    }
  </div>
</footer>`;
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
