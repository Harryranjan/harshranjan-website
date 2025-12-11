const Form = require("../models/Form");
const FormSubmission = require("../models/FormSubmission");

/**
 * Get standalone form HTML for embedding
 * This returns a complete, self-contained HTML form
 */
exports.getFormEmbed = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findByPk(id);

    if (!form) {
      return res.status(404).send(`
        <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c00;">
          <strong>Form Not Found</strong>
          <p>The form you're looking for (ID: ${id}) doesn't exist.</p>
        </div>
      `);
    }

    if (form.status !== "active") {
      return res.status(404).send(`
        <div style="padding: 20px; background: #ffc; border: 1px solid #fc0; border-radius: 8px; color: #840;">
          <strong>Form Inactive</strong>
          <p>This form is currently inactive.</p>
        </div>
      `);
    }

    // Generate standalone HTML
    const embedHtml = generateFormEmbedHTML(form);

    // Set headers for iframe embedding
    res.setHeader("Content-Type", "text/html");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors 'self' http://localhost:5173 http://localhost:5000"
    );
    res.send(embedHtml);
  } catch (error) {
    console.error("Error generating form embed:", error);
    res.status(500).send(`
      <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c00;">
        <strong>Error Loading Form</strong>
        <p>An error occurred while loading this form.</p>
      </div>
    `);
  }
};

/**
 * Generate standalone HTML for form embedding
 */
function generateFormEmbedHTML(form) {
  // Check if this is a custom code form
  if (form.type === "custom" && form.custom_code) {
    // Decode HTML entities if the code is HTML-escaped
    let customCode = form.custom_code;

    // Check if it's HTML-escaped and decode it
    if (
      customCode.includes("&lt;") ||
      customCode.includes("&gt;") ||
      customCode.includes("&quot;")
    ) {
      const he = require("he");
      customCode = he.decode(customCode);
    }

    // If the custom code is already a full HTML document, inject auto-resize script
    if (/^\s*<!DOCTYPE/i.test(customCode)) {
      // Inject transparent background style before </head> tag
      customCode = customCode.replace(
        "</head>",
        `
  <style>
    /* Override body background to be transparent for seamless iframe embedding */
    body {
      background: transparent !important;
      min-height: auto !important;
    }
    html {
      background: transparent !important;
    }
  </style>
</head>`
      );

      // Add auto-resize script before closing body tag
      customCode = customCode.replace(
        "</body>",
        `
  <script>
    // Auto-resize iframe to fit content
    function resizeIframe() {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: 'iframeResize', height: height }, '*');
    }
    
    // Resize on load and on any changes
    window.addEventListener('load', resizeIframe);
    window.addEventListener('resize', resizeIframe);
    
    // Watch for DOM changes
    const observer = new MutationObserver(resizeIframe);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    
    // Initial resize
    resizeIframe();
  </script>
</body>`
      );
      return customCode;
    }

    // Otherwise, wrap it in a basic HTML structure
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${form.name}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 0;
      margin: 0;
      background: transparent;
    }
  </style>
</head>
<body>
  ${customCode}
  <script>
    // Auto-resize iframe to fit content
    function resizeIframe() {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: 'iframeResize', height: height }, '*');
    }
    
    window.addEventListener('load', resizeIframe);
    window.addEventListener('resize', resizeIframe);
    
    const observer = new MutationObserver(resizeIframe);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    
    resizeIframe();
  </script>
</body>
</html>
    `;
  }

  // Standard field-based form
  const fields =
    typeof form.fields === "string" ? JSON.parse(form.fields) : form.fields;
  const styling =
    typeof form.styling === "string"
      ? JSON.parse(form.styling)
      : form.styling || {};

  const fieldHtml = fields
    .map((field) => {
      const required = field.required ? "required" : "";
      const fieldId = `field-${field.id}`;

      let inputHtml = "";

      switch (field.type) {
        case "text":
        case "email":
        case "tel":
        case "url":
        case "number":
          inputHtml = `<input 
          type="${field.type}" 
          id="${fieldId}" 
          name="${field.name}" 
          placeholder="${field.placeholder || ""}" 
          ${required}
          class="form-input"
        />`;
          break;

        case "textarea":
          inputHtml = `<textarea 
          id="${fieldId}" 
          name="${field.name}" 
          placeholder="${field.placeholder || ""}" 
          rows="${field.rows || 4}"
          ${required}
          class="form-input"
        ></textarea>`;
          break;

        case "select":
          const options = field.options || [];
          inputHtml = `<select 
          id="${fieldId}" 
          name="${field.name}" 
          ${required}
          class="form-input"
        >
          <option value="">Select...</option>
          ${options
            .map((opt) => `<option value="${opt}">${opt}</option>`)
            .join("")}
        </select>`;
          break;

        case "checkbox":
          inputHtml = `<label class="checkbox-label">
          <input 
            type="checkbox" 
            id="${fieldId}" 
            name="${field.name}" 
            value="yes"
            ${required}
            class="form-checkbox"
          />
          <span>${field.label}</span>
        </label>`;
          return `<div class="form-field checkbox-field">${inputHtml}</div>`;

        case "radio":
          const radioOptions = field.options || [];
          inputHtml = radioOptions
            .map(
              (opt) => `
          <label class="radio-label">
            <input 
              type="radio" 
              name="${field.name}" 
              value="${opt}"
              ${required}
              class="form-radio"
            />
            <span>${opt}</span>
          </label>
        `
            )
            .join("");
          break;
      }

      if (field.type === "checkbox") {
        return inputHtml;
      }

      return `
      <div class="form-field">
        <label for="${fieldId}" class="form-label">
          ${field.label}
          ${field.required ? '<span class="required">*</span>' : ""}
        </label>
        ${inputHtml}
      </div>
    `;
    })
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${form.name}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 0;
      margin: 0;
    }
    
    .form-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .form-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 8px;
      color: #1a1a1a;
    }
    
    .form-description {
      color: #666;
      margin-bottom: 24px;
      font-size: 14px;
    }
    
    .form-field {
      margin-bottom: 20px;
    }
    
    .form-label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      font-size: 14px;
      color: #374151;
    }
    
    .required {
      color: #ef4444;
      margin-left: 4px;
    }
    
    .form-input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    
    .form-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    textarea.form-input {
      resize: vertical;
      min-height: 100px;
    }
    
    .checkbox-field,
    .radio-field {
      margin-bottom: 12px;
    }
    
    .checkbox-label,
    .radio-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .form-checkbox,
    .form-radio {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    
    .form-button {
      background: ${styling.buttonColor || "#3b82f6"};
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
      width: 100%;
    }
    
    .form-button:hover {
      background: ${styling.buttonHoverColor || "#2563eb"};
    }
    
    .form-button:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
    
    .alert {
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 20px;
      font-size: 14px;
    }
    
    .alert-success {
      background: #d1fae5;
      color: #065f46;
      border: 1px solid #6ee7b7;
    }
    
    .alert-error {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #fca5a5;
    }
    
    .loading {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid #ffffff;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="form-container">
    <h2 class="form-title">${form.name}</h2>
    ${
      form.description
        ? `<p class="form-description">${form.description}</p>`
        : ""
    }
    
    <div id="message"></div>
    
    <form id="embeddedForm" onsubmit="handleSubmit(event)">
      ${fieldHtml}
      
      <button type="submit" class="form-button" id="submitBtn">
        ${form.submit_button_text || "Submit"}
      </button>
    </form>
  </div>
  
  <script>
    async function handleSubmit(e) {
      e.preventDefault();
      
      const btn = document.getElementById('submitBtn');
      const messageDiv = document.getElementById('message');
      const form = document.getElementById('embeddedForm');
      
      // Disable button and show loading
      btn.disabled = true;
      btn.innerHTML = '<span class="loading"></span> Submitting...';
      messageDiv.innerHTML = '';
      
      // Get form data
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        if (data[key]) {
          if (Array.isArray(data[key])) {
            data[key].push(value);
          } else {
            data[key] = [data[key], value];
          }
        } else {
          data[key] = value;
        }
      });
      
      try {
        const response = await fetch('${
          process.env.FRONTEND_URL || "http://localhost:5000"
        }/api/forms/${form.id}/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data })
        });
        
        const result = await response.json();
        
        if (response.ok) {
          messageDiv.innerHTML = '<div class="alert alert-success">${
            form.success_message ||
            "Thank you! Your submission has been received."
          }</div>';
          form.reset();
          
          // Notify parent if in iframe
          if (window.parent !== window) {
            window.parent.postMessage({ type: 'formSubmitted', formId: ${
              form.id
            } }, '*');
          }
        } else {
          messageDiv.innerHTML = '<div class="alert alert-error">' + (result.message || '${
            form.error_message || "An error occurred. Please try again."
          }') + '</div>';
        }
      } catch (error) {
        console.error('Form submission error:', error);
        messageDiv.innerHTML = '<div class="alert alert-error">${
          form.error_message || "An error occurred. Please try again."
        }</div>';
      } finally {
        btn.disabled = false;
        btn.innerHTML = '${form.submit_button_text || "Submit"}';
      }
    }
  </script>
</body>
</html>
  `;
}

module.exports = exports;
