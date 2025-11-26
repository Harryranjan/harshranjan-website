/**
 * Input Sanitization Middleware
 * Prevents XSS attacks by sanitizing user input
 * Uses built-in escaping without external dependencies
 */

// Escape HTML special characters
const escapeHtml = (str) => {
  if (typeof str !== "string") return str;

  const htmlEscapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };

  return str.replace(/[&<>"'\/]/g, (char) => htmlEscapeMap[char]);
};

// Remove dangerous patterns (script tags, event handlers, etc.)
const removeDangerousPatterns = (str) => {
  if (typeof str !== "string") return str;

  // Remove script tags
  str = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // Remove event handlers (onclick, onerror, etc.)
  str = str.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "");
  str = str.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, "");

  // Remove javascript: protocol
  str = str.replace(/javascript:/gi, "");

  // Remove data: protocol from non-image contexts
  str = str.replace(/data:(?!image)/gi, "");

  // Remove vbscript: protocol
  str = str.replace(/vbscript:/gi, "");

  return str;
};

// Sanitize string based on context
const sanitizeString = (str, isRichText = false) => {
  if (typeof str !== "string") return str;

  if (isRichText) {
    // For rich text (blog content), only remove dangerous patterns
    return removeDangerousPatterns(str);
  } else {
    // For plain text, escape HTML
    return escapeHtml(str);
  }
};

// Helper function to recursively sanitize object properties
const sanitizeObject = (obj, isRichTextContext = false) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item, isRichTextContext));
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      // Don't sanitize password fields
      if (key.toLowerCase().includes("password") || key.toLowerCase().includes("token")) {
        sanitized[key] = value;
      } else if (
        key === "content" ||
        key === "body" ||
        key === "excerpt" ||
        key === "html" ||
        key === "custom_css" ||
        key === "custom_js" ||
        key === "head_scripts" ||
        key === "body_scripts"
      ) {
        // For content fields, only remove dangerous patterns
        sanitized[key] = sanitizeString(value, true);
      } else {
        // For other fields, escape HTML
        sanitized[key] = sanitizeString(value, false);
      }
    } else if (typeof value === "object") {
      sanitized[key] = sanitizeObject(value, isRichTextContext);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

// Middleware to sanitize request body
const sanitizeBody = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  next();
};

// Middleware to sanitize query parameters
const sanitizeQuery = (req, res, next) => {
  if (req.query) {
    req.query = sanitizeObject(req.query, false);
  }
  next();
};

// Middleware to sanitize route parameters
const sanitizeParams = (req, res, next) => {
  if (req.params) {
    req.params = sanitizeObject(req.params, false);
  }
  next();
};

// Combined sanitization middleware
const sanitizeAll = (req, res, next) => {
  sanitizeBody(req, res, () => {
    sanitizeQuery(req, res, () => {
      sanitizeParams(req, res, next);
    });
  });
};

module.exports = {
  sanitizeBody,
  sanitizeQuery,
  sanitizeParams,
  sanitizeAll,
  escapeHtml,
  removeDangerousPatterns,
};
