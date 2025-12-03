/**
 * Server-side shortcode processor
 * Replaces shortcodes in HTML content with iframe embeds that work universally
 */

const API_URL = process.env.API_URL || process.env.BACKEND_URL || 'http://localhost:5000';

/**
 * Process shortcodes in HTML content
 * Converts [form id="X"], [modal id="X"], etc. to iframe embeds
 */
function processShortcodes(content) {
  if (!content || typeof content !== 'string') {
    return content;
  }

  let processedContent = content;

  // Process form shortcodes
  processedContent = processedContent.replace(
    /\[form\s+id="(\d+)"(?:\s+class="([^"]*)")?\]/g,
    (match, id, className) => {
      return generateIframeEmbed('forms', id, className);
    }
  );

  // Process modal shortcodes
  processedContent = processedContent.replace(
    /\[modal\s+id="(\d+)"(?:\s+class="([^"]*)")?\]/g,
    (match, id, className) => {
      return generateIframeEmbed('modals', id, className);
    }
  );

  // Process popup shortcodes
  processedContent = processedContent.replace(
    /\[popup\s+id="(\d+)"(?:\s+class="([^"]*)")?\]/g,
    (match, id, className) => {
      return generateIframeEmbed('popups', id, className);
    }
  );

  // Process CTA banner shortcodes
  processedContent = processedContent.replace(
    /\[cta_banner\s+id="(\d+)"(?:\s+class="([^"]*)")?\]/g,
    (match, id, className) => {
      return generateIframeEmbed('cta-banners', id, className);
    }
  );

  return processedContent;
}

/**
 * Generate iframe embed HTML for a shortcode
 */
function generateIframeEmbed(type, id, className = '') {
  const iframeId = `embed-${type}-${id}`;
  const embedUrl = `${API_URL}/api/embed/${type}/${id}/html`;
  
  // Different iframe styles based on type
  const iframeStyles = {
    forms: 'width: 100%; border: none; display: block; background: transparent;',
    modals: 'width: 100%; min-height: 100px; border: none; background: transparent;',
    popups: 'width: 1px; height: 1px; position: absolute; opacity: 0; pointer-events: none;',
    'cta-banners': 'width: 1px; height: 1px; position: absolute; opacity: 0; pointer-events: none;'
  };

  const style = iframeStyles[type] || 'width: 100%; border: none; background: transparent;';
  
  return `
    <div class="shortcode-embed ${className}" data-shortcode-type="${type}" data-shortcode-id="${id}" style="width: 100%; overflow: visible;">
      <iframe 
        id="${iframeId}"
        src="${embedUrl}" 
        style="${style}"
        frameborder="0"
        scrolling="no"
        loading="lazy"
        title="${type.charAt(0).toUpperCase() + type.slice(1)} ${id}"
      ></iframe>
    </div>
    ${type === 'forms' ? `
    <script>
      (function() {
        const iframe = document.getElementById('${iframeId}');
        
        // Listen for resize messages from iframe
        window.addEventListener('message', function(e) {
          if (e.data && e.data.type === 'iframeResize') {
            iframe.style.height = e.data.height + 'px';
          }
        });
        
        // Set initial height on load
        iframe.addEventListener('load', function() {
          // Give iframe time to render
          setTimeout(function() {
            try {
              if (iframe.contentWindow) {
                iframe.contentWindow.postMessage({ type: 'getHeight' }, '*');
              }
            } catch(e) {
              console.log('Could not access iframe content');
            }
          }, 100);
        });
      })();
    </script>
    ` : ''}
  `;
}

/**
 * Check if content contains any shortcodes
 */
function hasShortcodes(content) {
  if (!content || typeof content !== 'string') {
    return false;
  }

  const shortcodePattern = /\[(form|modal|popup|cta_banner)\s+id="\d+"(?:\s+class="[^"]*")?\]/;
  return shortcodePattern.test(content);
}

/**
 * Extract all shortcodes from content
 */
function extractShortcodes(content) {
  if (!content || typeof content !== 'string') {
    return [];
  }

  const shortcodePattern = /\[(form|modal|popup|cta_banner)\s+id="(\d+)"(?:\s+class="([^"]*)")?\]/g;
  const shortcodes = [];
  let match;

  while ((match = shortcodePattern.exec(content)) !== null) {
    shortcodes.push({
      type: match[1],
      id: match[2],
      class: match[3] || '',
      fullMatch: match[0]
    });
  }

  return shortcodes;
}

module.exports = {
  processShortcodes,
  hasShortcodes,
  extractShortcodes,
  generateIframeEmbed
};
