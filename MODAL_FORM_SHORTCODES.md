# Modal Form Integration with Shortcodes

## 🎯 Overview

The modal system now supports **flexible form embedding using shortcodes**. This gives you complete control over where and how forms appear within your modal content.

---

## 📝 Shortcode Syntax

### Basic Form Shortcode

```
[form id="123"]
```

### With Custom CSS Class

```
[form id="123" class="my-custom-class"]
```

---

## 🚀 How to Use

### Method 1: Quick Insert (Recommended)

1. **Navigate to Modal Builder** → Content Section
2. **Select a form** from the "Embed Form" dropdown
3. **Shortcode auto-inserted** at the end of your content
4. **Move the shortcode** anywhere in your content using the HTML editor

### Method 2: Quick Insert Buttons

1. **Scroll to "Form Integration" section**
2. **See list of available forms** with "Insert" buttons
3. **Click "Insert"** next to any form
4. **Shortcode added** to content automatically
5. **Toast notification** confirms insertion

### Method 3: Manual Entry

1. **Switch to HTML mode** in the Rich Text Editor
2. **Type the shortcode** manually: `[form id="123"]`
3. **Replace 123** with your actual form ID
4. **Switch back to Visual mode** to continue editing

---

## 🎨 Live Preview

The preview window automatically detects and displays form shortcodes:

```
┌─────────────────────────────┐
│  Modal Title                │
│                             │
│  Your content here...       │
│                             │
│  ╔═══════════════════════╗  │
│  ║ 📋 Form: Contact Form ║  │
│  ║ This form will be     ║  │
│  ║ embedded here on the  ║  │
│  ║ live site             ║  │
│  ╚═══════════════════════╝  │
│                             │
│  More content...            │
│                             │
│  [    Button Text     ]     │
└─────────────────────────────┘
```

**Preview Features:**

- ✅ Shows form name and ID
- ✅ Displays placeholder with blue dashed border
- ✅ Updates in real-time as you edit
- ✅ Multiple forms supported

---

## 💡 Use Cases

### Use Case 1: Newsletter Signup

```html
<p>Stay updated with our latest news!</p>
<p>Join our newsletter and get exclusive content.</p>
[form id="5"]
```

### Use Case 2: Contact Request

```html
<h3>Get in Touch</h3>
<p>We'd love to hear from you. Fill out the form below:</p>
[form id="12"]
<p><small>We respond within 24 hours.</small></p>
```

### Use Case 3: Multiple Forms

```html
<h3>Choose Your Path</h3>
<p>For general inquiries:</p>
[form id="10"]

<p>For sales questions:</p>
[form id="11"]
```

### Use Case 4: Conditional Content

```html
<div class="offer-section">
  <h2>Limited Time Offer!</h2>
  <p>Get 20% off by signing up today</p>
  [form id="8"]
</div>

<div class="social-proof">
  <p><strong>Join 10,000+ happy customers</strong></p>
</div>
```

---

## 🔧 Technical Details

### Frontend Rendering

**ModalEmbed Component** automatically:

1. Parses content for `[form id="X"]` patterns
2. Extracts form IDs and classes
3. Replaces shortcodes with `<FormEmbed>` components
4. Tracks conversions when forms are submitted

### Shortcode Parser

Located in: `src/utils/shortcodeParser.js`

**Supported patterns:**

- `[form id="123"]`
- `[form id='123']`
- `[form id="123" class="my-class"]`

**Regex pattern:**

```javascript
/\[form\s+id=["'](\d+)["']\s*(?:class=["']([^"']*)["'])?\]/gi;
```

---

## 🎯 Best Practices

### ✅ DO

1. **Use shortcodes for flexibility**

   - Place forms anywhere in your content
   - Mix text, images, and forms freely
   - Create complex layouts

2. **Test in preview**

   - Always check preview before publishing
   - Verify form placement looks good
   - Test on different screen sizes

3. **Keep form IDs accurate**

   - Use the "Insert" buttons to avoid typos
   - Double-check form IDs in HTML mode
   - Verify forms are active before using

4. **Add context around forms**
   - Explain what the form is for
   - Provide clear instructions
   - Add social proof or benefits

### ❌ DON'T

1. **Don't use invalid form IDs**

   - Forms with invalid IDs won't render
   - Always verify form exists in admin

2. **Don't nest shortcodes**

   - One shortcode per line/paragraph
   - Don't put shortcodes inside HTML tags

3. **Don't overload modals**
   - Max 1-2 forms per modal
   - Too many forms confuse users
   - Keep focus on one action

---

## 🔄 Migration from Legacy `form_id`

### Old Way (Still Supported)

```javascript
{
  "form_id": 123,
  "content": "<p>Your content here</p>"
}
```

**Result:** Form appears at the bottom, after content

### New Way (Recommended)

```javascript
{
  "form_id": null,
  "content": "<p>Your content here</p>[form id=\"123\"]"
}
```

**Result:** Form appears exactly where you place the shortcode

### Automatic Migration

The system automatically:

- ✅ Detects if `form_id` is set
- ✅ Checks if shortcode already exists in content
- ✅ Falls back to legacy rendering if no shortcode
- ✅ Prevents duplicate forms

---

## 📊 Comparison: Legacy vs Shortcodes

| Feature            | Legacy `form_id`    | Shortcodes         |
| ------------------ | ------------------- | ------------------ |
| **Placement**      | End of content only | Anywhere           |
| **Multiple Forms** | ❌ No               | ✅ Yes             |
| **Custom Styling** | ❌ No               | ✅ Yes (via class) |
| **Content Flow**   | Fixed               | Flexible           |
| **Preview**        | Generic placeholder | Named placeholder  |
| **Recommended**    | No (deprecated)     | ✅ Yes             |

---

## 🎓 Advanced Examples

### Example 1: Split Layout (Horizontal Orientation)

```html
<div style="display: flex; gap: 2rem;">
  <div style="flex: 1;">
    <h3>Why Choose Us</h3>
    <ul>
      <li>24/7 Support</li>
      <li>Money-back guarantee</li>
      <li>Free shipping</li>
    </ul>
  </div>
  <div style="flex: 1;">[form id="20"]</div>
</div>
```

### Example 2: Tabbed Forms

```html
<div class="tabs">
  <button onclick="showForm(1)">Individual</button>
  <button onclick="showForm(2)">Business</button>
</div>

<div id="form-1">[form id="25"]</div>

<div id="form-2" style="display: none;">[form id="26"]</div>
```

### Example 3: Progressive Disclosure

```html
<h3>Ready to get started?</h3>
<button onclick="document.getElementById('signup').style.display='block'">
  Yes, show me the form!
</button>

<div id="signup" style="display: none; margin-top: 1rem;">[form id="30"]</div>
```

---

## 🐛 Troubleshooting

### Form Not Showing

**Problem:** Shortcode doesn't render
**Solutions:**

1. Verify form ID is correct
2. Check form is active in admin
3. Ensure shortcode syntax is exact: `[form id="123"]`
4. Try refreshing the page

### Multiple Forms Overlap

**Problem:** Forms appear on top of each other
**Solutions:**

1. Add spacing: `<p><br></p>` between shortcodes
2. Wrap in divs with margins
3. Use horizontal orientation for side-by-side

### Shortcode Visible as Text

**Problem:** Shows `[form id="123"]` instead of form
**Solutions:**

1. Form ID doesn't exist - check admin
2. Typo in shortcode - use Insert button
3. Frontend not updated - hard refresh (Ctrl+Shift+R)

---

## 📚 Related Documentation

- **Shortcode System:** `SHORTCODE_USAGE.md`
- **Form Integration:** `FORM_INTEGRATION_COMPLETE.md`
- **Modal System:** `MODAL_SYSTEM_DOCUMENTATION.md`
- **Modal Features:** `MODAL_ADVANCED_FEATURES.md`

---

## 🚀 Quick Reference

### Available Shortcodes

```
[form id="123"]           - Embed form by ID
[form id="123" class="custom"] - With custom class
```

### Helper Locations

- **Content Editor:** Shows tip about shortcodes
- **Form Integration:** Shows quick insert buttons
- **Preview Window:** Shows form placeholders

### Keyboard Shortcuts

- `Ctrl+Shift+H` - Toggle HTML mode (in editor)
- Use HTML mode to manually add/edit shortcodes

---

**Version:** 2.0  
**Last Updated:** November 20, 2025  
**Status:** ✅ Production Ready
