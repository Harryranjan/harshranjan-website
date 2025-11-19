# 🚀 Shortcode Integration - Super Simple Guide

## Just Copy & Paste!

### **Step 1: Import the component** (once per page)

```jsx
import { ShortcodeParser } from "../components";
```

### **Step 2: Wrap your content**

```jsx
<ShortcodeParser>
  {/* Paste your shortcodes anywhere inside */}
  <p>Contact us [form id="1"] today!</p>
</ShortcodeParser>
```

**That's it!** The form automatically appears where you put `[form id="1"]`

---

## ✨ Real Examples

### Example 1: Simple Page

```jsx
import { ShortcodeParser } from "../components";

function ContactPage() {
  return (
    <ShortcodeParser>
      <div className="container">
        <h1>Contact Us</h1>
        <p>Fill out the form below:</p>
        [form id="1"]
        <p>We'll respond within 24 hours!</p>
      </div>
    </ShortcodeParser>
  );
}
```

### Example 2: With Variables

```jsx
import { ShortcodeParser } from "../components";

function Page() {
  const content = "Get a quote [form id='2'] now!";

  return (
    <ShortcodeParser>
      <p>{content}</p>
    </ShortcodeParser>
  );
}
```

### Example 3: From Database/CMS

```jsx
import { ShortcodeParser } from "../components";

function BlogPost({ post }) {
  // post.content from database contains: "Read more [form id='3'] subscribe"

  return (
    <ShortcodeParser>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </ShortcodeParser>
  );
}
```

### Example 4: Multiple Forms

```jsx
<ShortcodeParser>
  <div>
    <h2>Newsletter</h2>
    [form id="1"]
    <h2>Contact</h2>
    [form id="2"]
    <h2>Feedback</h2>
    [form id="3"]
  </div>
</ShortcodeParser>
```

---

## 📝 Shortcode Syntax

```
[form id="1"]                    ← Basic
[form id="2" class="my-4"]       ← With CSS classes
```

---

## 🎯 Where It Works

✅ In JSX directly  
✅ In string variables  
✅ In database content  
✅ In CMS fields  
✅ In API responses  
✅ **Anywhere with text!**

---

## 🆚 Alternative: ContentRenderer (For pure HTML strings)

If your content is **only** HTML string (no JSX), use this instead:

```jsx
import { ContentRenderer } from "../components";

function Page({ cmsContent }) {
  // cmsContent = "<h1>Title</h1><p>Text [form id='1'] here</p>"

  return <ContentRenderer content={cmsContent} />;
}
```

---

## 🎨 Live Demo

Visit `/shortcode-demo` in your app to see all examples working live!

---

## 💡 Remember

1. **Wrap content with `<ShortcodeParser>`** - One time per page
2. **Paste shortcode** - Anywhere inside
3. **Done!** - Form renders automatically

**No other setup needed!** 🎉
