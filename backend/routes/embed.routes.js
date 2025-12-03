const express = require("express");
const router = express.Router();
const { Form, FormSubmission } = require("../models");
const embedController = require("../controllers/embed.controller");
const Modal = require("../models/Modal");
const Popup = require("../models/Popup");
const CTABanner = require("../models/CTABanner");

// Public route - Get form for embedding (no auth required)
router.get("/forms/:id", async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Only return published forms for public embed
    if (form.status !== "published") {
      return res.status(404).json({ message: "Form not available" });
    }

    res.json(form);
  } catch (error) {
    console.error("Error fetching form for embed:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Public route - Submit form (no auth required)
router.post("/forms/:id/submit", async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    if (form.status !== "published") {
      return res
        .status(400)
        .json({ message: "Form is not accepting submissions" });
    }

    const submission = await FormSubmission.create({
      form_id: req.params.id,
      data: req.body.data,
      submitted_at: new Date(),
    });

    res.status(201).json({
      message: "Form submitted successfully",
      id: submission.id,
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Public route - Get form HTML for iframe embed
router.get("/forms/:id/embed", async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);

    if (!form || form.status !== "published") {
      return res
        .status(404)
        .send("<html><body><h1>Form not found</h1></body></html>");
    }

    // Generate standalone HTML page for iframe
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${form.name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body>
  <div id="form-root"></div>
  <script type="module">
    import React from 'https://esm.sh/react@18';
    import ReactDOM from 'https://esm.sh/react-dom@18';
    
    const formData = ${JSON.stringify(form)};
    
    function FormEmbed() {
      const [data, setData] = React.useState({});
      const [submitted, setSubmitted] = React.useState(false);
      const [error, setError] = React.useState(null);
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('${
            process.env.API_URL || "http://localhost:5000"
          }/api/embed/forms/${form.id}/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data })
          });
          
          if (response.ok) {
            setSubmitted(true);
          } else {
            setError('Failed to submit form');
          }
        } catch (err) {
          setError('Network error');
        }
      };
      
      if (submitted) {
        return React.createElement('div', { className: 'bg-green-50 p-6 rounded-lg text-center' },
          React.createElement('h2', { className: 'text-xl font-bold text-green-800' }, 
            formData.success_message || 'Thank you for your submission!'
          )
        );
      }
      
      return React.createElement('div', {},
        formData.name && React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, formData.name),
        formData.description && React.createElement('p', { className: 'text-gray-600 mb-6' }, formData.description),
        React.createElement('form', { onSubmit: handleSubmit, className: 'space-y-4' },
          ...formData.fields.map(field => 
            React.createElement('div', { key: field.id },
              React.createElement('label', { className: 'block text-sm font-medium mb-1' }, field.label),
              React.createElement(field.type === 'textarea' ? 'textarea' : 'input', {
                type: field.type,
                placeholder: field.placeholder,
                required: field.required,
                className: 'w-full px-4 py-2 border rounded-lg',
                onChange: (e) => setData(prev => ({ ...prev, [field.id]: e.target.value }))
              })
            )
          ),
          error && React.createElement('div', { className: 'text-red-600' }, error),
          React.createElement('button', {
            type: 'submit',
            className: 'w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700'
          }, formData.submit_button_text || 'Submit')
        )
      );
    }
    
    const root = ReactDOM.createRoot(document.getElementById('form-root'));
    root.render(React.createElement(FormEmbed));
  </script>
</body>
</html>
    `;

    res.send(html);
  } catch (error) {
    console.error("Error generating embed HTML:", error);
    res
      .status(500)
      .send("<html><body><h1>Error loading form</h1></body></html>");
  }
});

// Public route - Get JavaScript widget
router.get("/forms/:id/widget.js", async (req, res) => {
  try {
    const form = await Form.findByPk(req.params.id);

    if (!form || form.status !== "published") {
      return res.status(404).send('console.error("Form not found");');
    }

    const js = `
(function() {
  const formData = ${JSON.stringify(form)};
  const API_URL = '${process.env.API_URL || "http://localhost:5000"}';
  
  function createForm(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let formValues = {};
    let isSubmitted = false;
    
    function render() {
      if (isSubmitted) {
        container.innerHTML = \`
          <div style="background: #f0fdf4; padding: 24px; border-radius: 8px; text-align: center;">
            <h3 style="color: #166534; font-size: 18px; font-weight: bold;">
              \${formData.success_message || 'Thank you for your submission!'}
            </h3>
          </div>
        \`;
        return;
      }
      
      let html = '<div style="font-family: system-ui, sans-serif;">';
      
      if (formData.name) {
        html += \`<h2 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">\${formData.name}</h2>\`;
      }
      
      if (formData.description) {
        html += \`<p style="color: #6b7280; margin-bottom: 24px;">\${formData.description}</p>\`;
      }
      
      html += '<form id="embedded-form-${
        form.id
      }" style="display: flex; flex-direction: column; gap: 16px;">';
      
      formData.fields.forEach(field => {
        if (field.type === 'heading' || field.type === 'paragraph' || field.type === 'divider') return;
        
        html += \`
          <div>
            <label style="display: block; font-size: 14px; font-weight: 500; margin-bottom: 6px;">
              \${field.label}\${field.required ? '<span style="color: #ef4444;">*</span>' : ''}
            </label>
            <\${field.type === 'textarea' ? 'textarea' : 'input'}
              type="\${field.type}"
              id="field-\${field.id}"
              placeholder="\${field.placeholder || ''}"
              \${field.required ? 'required' : ''}
              style="width: 100%; padding: 10px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;"
              \${field.type === 'textarea' ? 'rows="4"' : ''}
            >\${field.type === 'textarea' ? '</textarea>' : ''}
          </div>
        \`;
      });
      
      html += \`
        <button type="submit" style="width: 100%; background: #2563eb; color: white; padding: 12px; border: none; border-radius: 8px; font-size: 16px; font-weight: 500; cursor: pointer;">
          \${formData.submit_button_text || 'Submit'}
        </button>
      </form></div>
      \`;
      
      container.innerHTML = html;
      
      const form = document.getElementById('embedded-form-${form.id}');
      form.addEventListener('submit', handleSubmit);
    }
    
    async function handleSubmit(e) {
      e.preventDefault();
      
      formData.fields.forEach(field => {
        const input = document.getElementById(\`field-\${field.id}\`);
        if (input) {
          formValues[field.id] = input.value;
        }
      });
      
      try {
        const response = await fetch(\`\${API_URL}/api/embed/forms/${
          form.id
        }/submit\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: formValues })
        });
        
        if (response.ok) {
          isSubmitted = true;
          render();
        } else {
          alert(formData.error_message || 'Failed to submit form');
        }
      } catch (err) {
        console.error('Form submission error:', err);
        alert(formData.error_message || 'Network error');
      }
    }
    
    render();
  }
  
  // Auto-initialize if container exists
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => createForm('form-container-${
      form.id
    }'));
  } else {
    createForm('form-container-${form.id}');
  }
  
  // Expose function for manual initialization
  window.initForm${form.id} = createForm;
})();
    `;

    res.setHeader("Content-Type", "application/javascript");
    res.send(js);
  } catch (error) {
    console.error("Error generating widget JS:", error);
    res.status(500).send('console.error("Error loading form widget");');
  }
});

// ===== UNIVERSAL SHORTCODE HANDLER EMBEDS =====
// These return standalone HTML that works anywhere (iframes, external sites, full HTML pages)

// Form standalone HTML embed
router.get("/forms/:id/html", embedController.getFormEmbed);

// Modal standalone HTML embed
router.get("/modals/:id/html", async (req, res) => {
  try {
    const { id } = req.params;
    const modal = await Modal.findByPk(id);

    if (!modal || modal.status !== "active") {
      return res.status(404).send(`
        <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c00;">
          <strong>Modal Not Found</strong>
        </div>
      `);
    }

    const styling = typeof modal.styling === "string" ? JSON.parse(modal.styling) : modal.styling || {};

    const embedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${modal.title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px;
    }
    .modal-trigger {
      background: ${styling.buttonColor || '#3b82f6'};
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .modal-trigger:hover {
      background: ${styling.buttonHoverColor || '#2563eb'};
    }
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999999;
      align-items: center;
      justify-content: center;
    }
    .modal-overlay.active {
      display: flex;
    }
    .modal-content {
      background: white;
      border-radius: 12px;
      padding: 32px;
      max-width: ${styling.maxWidth || '600px'};
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
    }
    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #999;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }
    .modal-close:hover {
      background: #f3f4f6;
      color: #333;
    }
    .modal-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 16px;
      color: #1a1a1a;
    }
    .modal-body {
      color: #374151;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <button class="modal-trigger" onclick="openModal()">${styling.triggerText || 'Open Modal'}</button>
  
  <div class="modal-overlay" id="modalOverlay" onclick="closeModalOnOverlay(event)">
    <div class="modal-content">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <h2 class="modal-title">${modal.title}</h2>
      <div class="modal-body">${modal.content}</div>
    </div>
  </div>
  
  <script>
    function openModal() {
      document.getElementById('modalOverlay').classList.add('active');
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'modalOpened', modalId: ${id} }, '*');
      }
    }
    
    function closeModal() {
      document.getElementById('modalOverlay').classList.remove('active');
    }
    
    function closeModalOnOverlay(e) {
      if (e.target.id === 'modalOverlay') {
        closeModal();
      }
    }
    
    // ESC key closes modal
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  </script>
</body>
</html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.send(embedHtml);
  } catch (error) {
    console.error("Error generating modal embed:", error);
    res.status(500).send(`
      <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c00;">
        <strong>Error Loading Modal</strong>
      </div>
    `);
  }
});

// Popup standalone HTML embed
router.get("/popups/:id/html", async (req, res) => {
  try {
    const { id } = req.params;
    const popup = await Popup.findByPk(id);

    if (!popup || popup.status !== "active") {
      return res.status(404).send(`
        <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c00;">
          <strong>Popup Not Found</strong>
        </div>
      `);
    }

    const styling = typeof popup.styling === "string" ? JSON.parse(popup.styling) : popup.styling || {};
    const triggerType = popup.trigger_type || "time";
    const triggerValue = popup.trigger_value || 3000;

    const embedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${popup.title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    .popup-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999999;
      align-items: center;
      justify-content: center;
    }
    .popup-overlay.active {
      display: flex;
    }
    .popup-content {
      background: white;
      border-radius: 12px;
      padding: 32px;
      max-width: ${styling.maxWidth || '500px'};
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .popup-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #999;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }
    .popup-close:hover {
      background: #f3f4f6;
      color: #333;
    }
    .popup-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 16px;
      color: #1a1a1a;
    }
    .popup-body {
      color: #374151;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="popup-overlay" id="popupOverlay" onclick="closePopupOnOverlay(event)">
    <div class="popup-content">
      <button class="popup-close" onclick="closePopup()">&times;</button>
      <h2 class="popup-title">${popup.title}</h2>
      <div class="popup-body">${popup.content}</div>
    </div>
  </div>
  
  <script>
    const popupId = ${id};
    const triggerType = '${triggerType}';
    const triggerValue = ${triggerValue};
    const seenKey = 'popup_seen_' + popupId;
    
    // Check if already seen
    const hasSeenPopup = localStorage.getItem(seenKey);
    
    if (!hasSeenPopup) {
      if (triggerType === 'time') {
        setTimeout(openPopup, triggerValue);
      } else if (triggerType === 'scroll') {
        window.addEventListener('scroll', checkScroll);
      } else if (triggerType === 'exit') {
        document.addEventListener('mouseout', checkExit);
      }
    }
    
    function checkScroll() {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= triggerValue) {
        openPopup();
        window.removeEventListener('scroll', checkScroll);
      }
    }
    
    function checkExit(e) {
      if (e.clientY <= 0) {
        openPopup();
        document.removeEventListener('mouseout', checkExit);
      }
    }
    
    function openPopup() {
      document.getElementById('popupOverlay').classList.add('active');
      localStorage.setItem(seenKey, 'true');
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'popupOpened', popupId: popupId }, '*');
      }
    }
    
    function closePopup() {
      document.getElementById('popupOverlay').classList.remove('active');
    }
    
    function closePopupOnOverlay(e) {
      if (e.target.id === 'popupOverlay') {
        closePopup();
      }
    }
    
    // ESC key closes popup
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closePopup();
      }
    });
  </script>
</body>
</html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.send(embedHtml);
  } catch (error) {
    console.error("Error generating popup embed:", error);
    res.status(500).send(`
      <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c00;">
        <strong>Error Loading Popup</strong>
      </div>
    `);
  }
});

// CTA Banner standalone HTML embed
router.get("/cta-banners/:id/html", async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await CTABanner.findByPk(id);

    if (!banner || banner.status !== "active") {
      return res.status(404).send(`
        <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c00;">
          <strong>Banner Not Found</strong>
        </div>
      `);
    }

    const styling = typeof banner.styling === "string" ? JSON.parse(banner.styling) : banner.styling || {};
    const position = banner.position || "bottom";

    const embedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${banner.title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    .cta-banner {
      position: fixed;
      ${position}: 0;
      left: 0;
      right: 0;
      background: ${styling.backgroundColor || '#1f2937'};
      color: ${styling.textColor || 'white'};
      padding: 16px 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 999998;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
      from {
        transform: translateY(${position === 'top' ? '-' : ''}100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    .cta-content {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .cta-title {
      font-weight: 600;
      font-size: 16px;
    }
    .cta-description {
      font-size: 14px;
      opacity: 0.9;
    }
    .cta-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .cta-button {
      background: ${styling.buttonColor || '#3b82f6'};
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: background-color 0.2s;
      white-space: nowrap;
    }
    .cta-button:hover {
      background: ${styling.buttonHoverColor || '#2563eb'};
    }
    .cta-close {
      background: none;
      border: none;
      color: currentColor;
      font-size: 20px;
      cursor: pointer;
      opacity: 0.7;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }
    .cta-close:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.1);
    }
    @media (max-width: 640px) {
      .cta-banner {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
      }
      .cta-content {
        flex-direction: column;
        gap: 8px;
      }
      .cta-actions {
        justify-content: center;
      }
    }
  </style>
</head>
<body>
  <div class="cta-banner" id="ctaBanner">
    <div class="cta-content">
      <div>
        <div class="cta-title">${banner.title}</div>
        ${banner.description ? `<div class="cta-description">${banner.description}</div>` : ''}
      </div>
    </div>
    <div class="cta-actions">
      ${banner.button_text ? `<a href="${banner.button_link || '#'}" class="cta-button" ${banner.open_in_new_tab ? 'target="_blank" rel="noopener"' : ''}>${banner.button_text}</a>` : ''}
      <button class="cta-close" onclick="closeBanner()">&times;</button>
    </div>
  </div>
  
  <script>
    const bannerId = ${id};
    const dismissKey = 'cta_dismissed_' + bannerId;
    
    // Check if already dismissed
    const isDismissed = localStorage.getItem(dismissKey);
    if (isDismissed) {
      document.getElementById('ctaBanner').style.display = 'none';
    }
    
    function closeBanner() {
      const banner = document.getElementById('ctaBanner');
      banner.style.animation = 'slideOut 0.3s ease-out';
      
      setTimeout(() => {
        banner.style.display = 'none';
        localStorage.setItem(dismissKey, 'true');
        if (window.parent !== window) {
          window.parent.postMessage({ type: 'ctaBannerClosed', bannerId: bannerId }, '*');
        }
      }, 300);
    }
  </script>
</body>
</html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.send(embedHtml);
  } catch (error) {
    console.error("Error generating CTA banner embed:", error);
    res.status(500).send(`
      <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c00;">
        <strong>Error Loading Banner</strong>
      </div>
    `);
  }
});

module.exports = router;
