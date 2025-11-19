# Form Integration Guide

Complete guide for embedding forms in your website using multiple integration methods.

## 🚀 Quick Start

### 1. React Component (Recommended for React apps)

```jsx
import { FormEmbed } from "../components";

function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <FormEmbed formId={123} className="max-w-2xl" />
    </div>
  );
}
```

### 2. Shortcode (For CMS/Content)

```jsx
import { ContentRenderer } from "../components";

function Page({ content }) {
  // Content can include: [form id="123"]
  return <ContentRenderer content={content} />;
}
```

Example content:

```html
<h2>Get in Touch</h2>
<p>Fill out this form to contact us.</p>

[form id="123" class="my-custom-class"]

<p>We'll respond within 24 hours.</p>
```

### 3. JavaScript Widget (For any HTML page)

```html
<!-- Add where you want the form -->
<div id="form-container-123"></div>

<!-- Add before closing </body> tag -->
<script src="https://yoursite.com/api/embed/forms/123/widget.js"></script>
```

### 4. iframe (Maximum compatibility)

```html
<iframe
  src="https://yoursite.com/api/embed/forms/123/embed"
  width="100%"
  height="600"
  frameborder="0"
  title="Contact Form"
></iframe>
```

## 📋 Integration Methods Comparison

| Method                | Use Case                      | Pros                                         | Cons                     |
| --------------------- | ----------------------------- | -------------------------------------------- | ------------------------ |
| **React Component**   | React applications            | Type-safe, full control, optimal performance | React only               |
| **Shortcode**         | CMS content, blog posts       | Easy for non-technical users, WordPress-like | Requires ContentRenderer |
| **JavaScript Widget** | External sites, landing pages | Works anywhere, no React needed              | Limited customization    |
| **iframe**            | Maximum isolation             | Works everywhere, no conflicts               | Heavier, fixed height    |

## 🎨 Customization

### React Component Props

```jsx
<FormEmbed
  formId={123} // Required: Form ID
  className="my-custom-styles" // Optional: Custom CSS classes
/>
```

### Shortcode Options

```
[form id="123" class="custom-class"]
```

Supported attributes:

- `id` (required): Form ID
- `class` (optional): CSS classes

### JavaScript Widget Options

By default, the widget looks for `#form-container-{formId}`. To use a custom container:

```javascript
// Manual initialization with custom container
window.initForm123("my-custom-container-id");
```

### Styling

All methods support custom styling:

**React Component:**

```jsx
<FormEmbed formId={123} className="p-6 bg-white rounded-lg shadow" />
```

**Shortcode:**

```
[form id="123" class="p-6 bg-white rounded-lg"]
```

**JavaScript Widget:**

```html
<div id="form-container-123" class="p-6 bg-white rounded-lg shadow"></div>
```

**iframe:**

```html
<iframe
  src="..."
  style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
></iframe>
```

## 🔧 API Endpoints

### Public Endpoints (No authentication required)

```
GET  /api/embed/forms/:id              # Get form data
POST /api/embed/forms/:id/submit       # Submit form
GET  /api/embed/forms/:id/embed        # iframe HTML page
GET  /api/embed/forms/:id/widget.js    # JavaScript widget
```

### Example API Usage

```javascript
// Get form data
fetch("https://yoursite.com/api/embed/forms/123")
  .then((res) => res.json())
  .then((form) => console.log(form));

// Submit form
fetch("https://yoursite.com/api/embed/forms/123/submit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    data: {
      "field-1": "John Doe",
      "field-2": "john@example.com",
      "field-3": "Hello!",
    },
  }),
});
```

## 📦 Components Reference

### FormEmbed

Renders a complete form with validation and submission handling.

```jsx
import { FormEmbed } from "../components";

<FormEmbed
  formId={number} // Form ID (required)
  className={string} // CSS classes (optional)
/>;
```

**Features:**

- Automatic form fetching
- Field validation (required, email, phone, URL, min/max length)
- Error handling
- Success messages
- Loading states
- Automatic form reset after submission

### ContentRenderer

Parses content and renders shortcodes as React components.

```jsx
import { ContentRenderer } from "../components";

<ContentRenderer
  content={string} // Content with shortcodes (required)
  className={string} // CSS classes (optional)
/>;
```

**Supported Shortcodes:**

- `[form id="123"]` - Embed form
- `[modal id="123"]` - Embed modal (coming soon)
- `[popup id="123"]` - Embed popup (coming soon)

### Shortcode Parser Utilities

```javascript
import {
  parseShortcodes,
  renderWithShortcodes,
  useShortcodes,
  extractShortcodes,
  hasShortcodes,
  generateShortcode,
} from "../utils/shortcodeParser";

// Parse shortcodes from content
const { parsedContent, components } = parseShortcodes(content);

// Check if content has shortcodes
if (hasShortcodes(content)) {
  // Render with React components
  return renderWithShortcodes(content);
}

// Generate shortcode string
const shortcode = generateShortcode("form", 123, { className: "my-class" });
// Returns: [form id="123" class="my-class"]

// Extract all shortcodes from content
const shortcodes = extractShortcodes(content);
// Returns: [{ type: 'form', id: '123', className: 'my-class' }]

// Hook for React components
const { parsedContent, components } = useShortcodes(content);
```

## 🎯 Use Cases

### Blog Post with Contact Form

```jsx
function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <ContentRenderer content={post.content} />
      {/* Content includes: [form id="456"] */}
    </article>
  );
}
```

### Landing Page with Multiple Forms

```jsx
function LandingPage() {
  return (
    <div>
      <section>
        <h2>Newsletter</h2>
        <FormEmbed formId={1} className="max-w-md" />
      </section>

      <section>
        <h2>Contact</h2>
        <FormEmbed formId={2} className="max-w-xl" />
      </section>
    </div>
  );
}
```

### External WordPress Site

```html
<!-- In WordPress post/page editor -->
<div class="contact-form-wrapper">
  <h2>Get Quote</h2>
  <div id="form-container-789"></div>
</div>

<script src="https://yoursite.com/api/embed/forms/789/widget.js"></script>
```

### Email Newsletter

```html
<!-- iframe works great in emails -->
<iframe
  src="https://yoursite.com/api/embed/forms/321/embed"
  width="600"
  height="400"
  style="border: none;"
></iframe>
```

## 🔒 Security

- All embed endpoints are public but only return **published** forms
- Form submissions are rate-limited to prevent spam
- CORS is configured to allow embedding from any domain
- Input validation on both client and server side
- XSS protection built-in

## 🎨 Supported Field Types

All integration methods support these field types:

**Basic:**

- Text
- Email
- Phone
- Textarea
- Number

**Choice:**

- Dropdown (select)
- Radio buttons
- Checkboxes
- Rating (star rating)
- Yes/No toggle

**Date & Time:**

- Date
- Time
- DateTime

**Advanced:**

- File upload
- URL
- Color picker
- Slider (range)
- Signature

**Content:**

- Heading
- Paragraph
- Divider
- Image

## 📱 Responsive Design

All integration methods are fully responsive and work on:

- Desktop browsers
- Tablets
- Mobile devices
- Progressive Web Apps (PWA)

## 🐛 Troubleshooting

### Form not loading

1. Check form ID is correct
2. Ensure form is published (not draft)
3. Check browser console for errors
4. Verify API endpoint is accessible

### Styles not applying

**React Component:**

```jsx
// Add Tailwind or custom CSS classes
<FormEmbed formId={123} className="p-4 bg-white" />
```

**iframe:**

```css
/* Style the iframe container */
.form-wrapper iframe {
  border: 1px solid #ddd;
  border-radius: 8px;
}
```

### CORS errors

Make sure your backend `.env` has:

```
FRONTEND_URL=http://localhost:5173
```

Or configure CORS to allow your domain.

## 📚 Advanced Usage

### Custom Form Validation

```jsx
import { useState } from "react";
import { FormEmbed } from "../components";

function CustomFormWrapper() {
  const [formData, setFormData] = useState({});

  const handleFormChange = (data) => {
    setFormData(data);
    // Custom validation logic
  };

  return <FormEmbed formId={123} onChange={handleFormChange} />;
}
```

### Programmatic Form Submission

```javascript
async function submitFormProgrammatically() {
  const response = await fetch("/api/embed/forms/123/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        "field-email": "user@example.com",
        "field-name": "John Doe",
      },
    }),
  });

  const result = await response.json();
  console.log("Submitted:", result);
}
```

### Multiple Forms on Same Page

```jsx
function MultiFormPage() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <FormEmbed formId={1} />
      <FormEmbed formId={2} />
      <FormEmbed formId={3} />
    </div>
  );
}
```

## 🚀 Performance Tips

1. **Lazy Load Forms:** Use React.lazy() for forms below the fold
2. **Cache Form Data:** Forms are cached after first load
3. **Use iframe for heavy forms:** Isolates resources
4. **Optimize field count:** Fewer fields = faster loading

## 📞 Getting Embed Code

In the admin panel:

1. Go to Forms list
2. Click the 🔗 icon on any form
3. Choose your integration method
4. Copy the generated code

## 🎓 Best Practices

1. **Always publish forms** before embedding
2. **Test on multiple devices** before going live
3. **Use descriptive form names** for better tracking
4. **Monitor submissions** regularly in admin panel
5. **Keep forms short** for better conversion rates
6. **Use appropriate method** for each use case

## 🆘 Support

For issues or questions:

1. Check this documentation
2. Review the example page at `/form-integration-examples`
3. Check browser console for errors
4. Contact your developer

---

Built with ❤️ using React, Express, and modern web standards.
