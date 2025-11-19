const express = require("express");
const router = express.Router();
const { Form, FormSubmission } = require("../models");

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

module.exports = router;
