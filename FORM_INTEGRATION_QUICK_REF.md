# 🚀 Quick Reference - Form Integration

## Copy-Paste Examples

### React Component

```jsx
import { FormEmbed } from "../components";

<FormEmbed formId={123} />;
```

### Content with Shortcode

```jsx
import { ContentRenderer } from "../components";

<ContentRenderer content="Hello [form id='123'] world" />;
```

### JavaScript Widget

```html
<div id="form-container-123"></div>
<script src="http://localhost:5000/api/embed/forms/123/widget.js"></script>
```

### iframe

```html
<iframe
  src="http://localhost:5000/api/embed/forms/123/embed"
  width="100%"
  height="600"
></iframe>
```

## When to Use Each Method

| Method              | Use When                  |
| ------------------- | ------------------------- |
| **React Component** | Building React app        |
| **Shortcode**       | CMS content / Blog posts  |
| **JavaScript**      | External site / No React  |
| **iframe**          | Email / Maximum isolation |

## Get Embed Code

1. Admin → Forms, Modals & Popups
2. Click 🔗 on any form
3. Choose method tab
4. Click Copy

## API Endpoints (Public)

```
GET  /api/embed/forms/:id              # Get form
POST /api/embed/forms/:id/submit       # Submit
GET  /api/embed/forms/:id/embed        # iframe HTML
GET  /api/embed/forms/:id/widget.js    # JS widget
```

## Import Shortcuts

```javascript
// Import individual components
import { FormEmbed, ContentRenderer, EmbedCodeModal } from "../components";

// Import parser utilities
import {
  parseShortcodes,
  hasShortcodes,
  generateShortcode,
} from "../utils/shortcodeParser";
```

## Shortcode Syntax

```
[form id="123"]                        # Basic
[form id="123" class="my-custom"]      # With classes
```

## Supported Field Types (22 Total)

- Text, Email, Phone, Textarea, Number
- Select, Radio, Checkbox, Rating, Yes/No
- Date, Time, DateTime
- File, URL, Color, Slider, Signature
- Heading, Paragraph, Divider, Image

## Documentation

- Full Guide: `FORM_INTEGRATION_GUIDE.md`
- Summary: `FORM_INTEGRATION_COMPLETE.md`
- Examples: `/form-integration-examples` page

---

**Need help?** Check the documentation or examples page!
