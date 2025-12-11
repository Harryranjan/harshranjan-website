# 🚀 Shortcode System - Complete Integration Guide

## 📋 Overview

The shortcode system allows you to embed dynamic components (forms, modals, popups, CTA banners) anywhere in your content using simple shortcode syntax like `[form id="1"]`.

## ✅ Supported Shortcodes

1. **Forms**: `[form id="123"]` or `[form id="123" class="custom-class"]`
2. **Modals**: `[modal id="123"]` or `[modal id="123" class="btn-primary"]`
3. **Popups**: `[popup id="123"]` or `[popup id="123" class="btn-success"]`
4. **CTA Banners**: `[cta_banner id="123"]` or `[cta_banner id="123" class="my-4"]`

---

## 🎯 How It Works

### System Architecture

1. **Content with Shortcodes** → Stored in database
2. **ContentRenderer Component** → Parses and renders shortcodes
3. **Embed Components** → FormEmbed, ModalEmbed, PopupEmbed, CTABannerEmbed
4. **Final Output** → Interactive components in your pages

### Automatic Integration

**Pages Already Using ContentRenderer:**

- ✅ `DynamicPage.jsx` - All custom pages
- ✅ `BlogPost.jsx` - All blog posts
- ✅ Demo pages and examples

**No code changes needed!** Just paste shortcodes in your content.

---

## 📝 Usage Examples

### Example 1: Contact Form in Page Content

In your page editor (Rich/Block/Code mode), add:

```html
<h1>Contact Us</h1>
<p>Fill out this form to get in touch:</p>
[form id="1"]
<p>We'll respond within 24 hours!</p>
```

**Output:** Form automatically renders where `[form id="1"]` appears.

---

### Example 2: Modal Trigger Button

In your page content:

```html
<p>Click below to see our special offer:</p>
[modal id="2" class="btn-primary btn-lg"]
```

**Output:** Button that opens modal when clicked.

---

### Example 3: Popup Notification

```html
<div class="sidebar">
  <h3>Special Announcement</h3>
  [popup id="5" class="btn-info"]
</div>
```

**Output:** Button that triggers popup notification.

---

### Example 4: CTA Banner

```html
<article>
  <h1>Blog Post Title</h1>
  <p>Content here...</p>
  [cta_banner id="3"]
  <p>More content...</p>
</article>
```

**Output:** CTA banner embedded in content.

---

### Example 5: Multiple Shortcodes

```html
<h2>Newsletter Signup</h2>
[form id="1" class="newsletter-form"]

<h2>Contact Form</h2>
[form id="2"]

<p>Or check out our offer:</p>
[modal id="1" class="btn-success"]
```

**Output:** All components render in order.

---

## 🔧 For Developers: Custom Integration

### Using ContentRenderer Component

If you need to use shortcodes in a custom React component:

```jsx
import ContentRenderer from "../components/ContentRenderer";

function MyPage() {
  const content = `
    <h1>Welcome</h1>
    <p>Contact us below:</p>
    [form id="1"]
  `;

  return (
    <div className="container">
      <ContentRenderer content={content} />
    </div>
  );
}
```

### Using from Database/API

```jsx
import { useEffect, useState } from "react";
import ContentRenderer from "../components/ContentRenderer";
import api from "../utils/api";

function DynamicContent() {
  const [pageContent, setPageContent] = useState("");

  useEffect(() => {
    api.get("/pages/about").then((res) => {
      setPageContent(res.data.content); // Contains shortcodes
    });
  }, []);

  return <ContentRenderer content={pageContent} />;
}
```

---

## 🎨 Customizing Button Styles

### Form Shortcode

```html
[form id="1" class="inline-block my-4"]
```

### Modal Shortcode (Button Style)

```html
[modal id="1" class="px-8 py-4 bg-blue-600 text-white rounded-lg
hover:bg-blue-700"]
```

### Popup Shortcode (Button Style)

```html
[popup id="1" class="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg"]
```

---

## 📍 Where Shortcodes Work

✅ **Pages** - Admin → Pages → Add content with shortcodes  
✅ **Blog Posts** - Admin → Blog → Add shortcodes in content  
✅ **Landing Pages** - Use in custom HTML mode  
✅ **Rich Text Editor** - Paste shortcodes directly  
✅ **Block Editor** - Add in HTML blocks  
✅ **Custom Code** - Any HTML content field

---

## 🚀 Quick Start Guide

### Step 1: Create Your Component

1. Go to Admin Panel
2. Create a Form/Modal/Popup/CTA Banner
3. Save and note the ID (e.g., ID: 5)

### Step 2: Copy the Shortcode

The system shows you the shortcode:

- Forms: `[form id="5"]`
- Modals: `[modal id="5"]`
- Popups: `[popup id="5"]`
- CTA Banners: `[cta_banner id="5"]`

### Step 3: Paste in Content

Paste the shortcode anywhere in your page/blog content.

### Step 4: View Your Page

The component automatically renders where you pasted the shortcode!

---

## 🔍 How It Works Behind the Scenes

1. **Parser** (`shortcodeParser.js`) - Scans content for shortcode patterns
2. **ContentRenderer** - Replaces shortcodes with React components
3. **Embed Components** - Fetch data from API and render:
   - `FormEmbed.jsx` - Renders forms
   - `ModalEmbed.jsx` - Renders modal with trigger button
   - `PopupEmbed.jsx` - Renders popup with trigger button
   - `CTABannerEmbed.jsx` - Renders CTA banners

---

## 📝 Shortcode Syntax Reference

### Basic Syntax

```
[type id="number"]
```

### With Custom Class

```
[type id="number" class="css-classes"]
```

### Examples

```html
[form id="1"] [form id="2" class="my-custom-form"] [modal id="3"] [modal id="4"
class="btn-primary btn-lg"] [popup id="5"] [popup id="6" class="btn-info"]
[cta_banner id="7"] [cta_banner id="8" class="mb-8"]
```

---

## ⚠️ Troubleshooting

### Shortcode Not Rendering?

1. **Check ID** - Make sure the ID exists in your database
2. **Check Syntax** - Use double quotes: `[form id="1"]` not `[form id=1]`
3. **Check Status** - Component must be published/active
4. **Check Page** - DynamicPage and BlogPost use ContentRenderer automatically

### Button Shows But Nothing Happens?

- **Modals/Popups**: Check browser console for errors
- **Forms**: Check if form has fields configured

### Styling Issues?

- Use the `class` attribute: `[modal id="1" class="your-classes"]`
- For forms, styling is controlled in the form builder

---

## 💡 Best Practices

1. **Test IDs** - Verify component IDs before using shortcodes
2. **Use Classes** - Add custom classes for consistent styling
3. **Cache Aware** - Changes to forms/modals update automatically
4. **Performance** - Each shortcode makes one API call (cached)
