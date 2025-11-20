# CTA Banner Component - Usage Guide

## 🎯 Overview

The `CTABanner` component provides 4 different variants for displaying Call-to-Action banners on your website. Each variant is optimized for different use cases and user experiences.

## 📦 Demo

Visit `/cta-demo` to see all variants in action and compare them side-by-side.

## 🚀 Quick Start

```jsx
import CTABanner from "./components/CTABanner";

function App() {
  return (
    <div>
      <CTABanner
        variant="sticky-top"
        title="Schedule Your Free ROI Audit"
        description="Discover exactly why top brands trust us with ₹300+ Crores in ad spends"
        buttonText="Get ROI Audit"
        phoneNumber="+919176402555"
        dismissible={true}
      />
      {/* Your page content */}
    </div>
  );
}
```

## 📋 Variants

### 1. Sticky Top Banner (Recommended for Maximum Visibility)

```jsx
<CTABanner variant="sticky-top" />
```

**Best for:** Maximum visibility, professional websites
**Pros:** Always visible, professional look, high conversion
**Cons:** Takes header space
**Use case:** Homepage, landing pages, high-priority CTAs

### 2. Floating Button

```jsx
<CTABanner variant="floating-button" showAfterScroll={200} />
```

**Best for:** Non-intrusive engagement, mobile users
**Pros:** Clean design, doesn't block content, modern
**Cons:** Lower initial visibility
**Use case:** Blog posts, long-form content, mobile-first sites

### 3. Slide-in Bottom

```jsx
<CTABanner variant="slide-bottom" showAfterScroll={300} />
```

**Best for:** Engaged users who have scrolled
**Pros:** Good timing, easy to dismiss, high engagement
**Cons:** Can be missed by quick visitors
**Use case:** Content pages, service pages, product pages

### 4. Smart Header

```jsx
<CTABanner variant="smart-header" />
```

**Best for:** Adaptive design, professional sites
**Pros:** Full info initially, compact on scroll, non-intrusive
**Cons:** More complex animation
**Use case:** Corporate sites, portfolios, multi-page websites

## ⚙️ Props

| Prop              | Type     | Default                          | Description                                                                     |
| ----------------- | -------- | -------------------------------- | ------------------------------------------------------------------------------- |
| `variant`         | string   | `'sticky-top'`                   | Banner variant: `sticky-top`, `floating-button`, `slide-bottom`, `smart-header` |
| `title`           | string   | `'Schedule Your Free ROI Audit'` | Main heading text                                                               |
| `description`     | string   | `'Discover exactly why...'`      | Subtext/description                                                             |
| `buttonText`      | string   | `'Get ROI Audit'`                | Primary CTA button text                                                         |
| `phoneNumber`     | string   | `'+919176402555'`                | Phone number for call button                                                    |
| `onButtonClick`   | function | `null`                           | Custom click handler (default: navigates to /contact)                           |
| `showAfterScroll` | number   | `100`                            | Pixels to scroll before showing (for scroll-triggered variants)                 |
| `dismissible`     | boolean  | `true`                           | Whether banner can be dismissed                                                 |
| `storageKey`      | string   | `'cta-banner-dismissed'`         | localStorage key for dismissed state                                            |

## 🎨 Customization Examples

### Custom Click Handler

```jsx
<CTABanner
  onButtonClick={() => {
    // Open modal, track analytics, etc.
    console.log("CTA clicked!");
    // Open your custom modal
    setShowContactModal(true);
  }}
/>
```

### Different Content

```jsx
<CTABanner
  variant="floating-button"
  title="Get 50% Off Today!"
  description="Limited time offer for new customers"
  buttonText="Claim Offer"
  phoneNumber="+919176402555"
  showAfterScroll={500}
/>
```

### Non-dismissible Banner

```jsx
<CTABanner
  variant="sticky-top"
  dismissible={false}
  title="Important Announcement"
  description="New features launching soon!"
/>
```

## 💡 Best Practices

### 1. **Choose the Right Variant**

- **Landing pages**: Use `sticky-top` for maximum visibility
- **Blog posts**: Use `floating-button` to avoid disrupting reading
- **Long pages**: Use `slide-bottom` to engage scrolling users
- **Corporate sites**: Use `smart-header` for professional appearance

### 2. **Mobile Optimization**

All variants are fully responsive and mobile-optimized with:

- Smaller text on mobile devices
- Touch-friendly button sizes
- Adaptive layouts
- Proper spacing for small screens

### 3. **Performance**

- Banner uses CSS transforms for smooth animations
- localStorage prevents showing dismissed banners
- Scroll listeners are optimized with proper cleanup
- Minimal re-renders with efficient state management

### 4. **A/B Testing**

Test different variants to see which performs best:

```jsx
const variant = Math.random() > 0.5 ? "sticky-top" : "floating-button";
<CTABanner variant={variant} />;
```

## 🎯 My Recommendations

Based on your image and typical use cases:

### **For Your Website (Professional Services)**

```jsx
// Homepage/Landing Pages
<CTABanner
  variant="sticky-top"
  title="Schedule Your Free ROI Audit"
  description="Discover exactly why top brands trust us with ₹300+ Crores in ad spends"
  buttonText="Get ROI Audit"
  phoneNumber="+919176402555"
  dismissible={true}
/>

// Blog/Content Pages
<CTABanner
  variant="floating-button"
  showAfterScroll={300}
  dismissible={true}
/>
```

### **Desktop vs Mobile Strategy**

```jsx
const isMobile = window.innerWidth < 768;

<CTABanner variant={isMobile ? "floating-button" : "sticky-top"} />;
```

## 🔧 Integration with Existing Layout

### Option 1: Add to PublicLayout

```jsx
// frontend/src/layouts/PublicLayout.jsx
import CTABanner from "../components/CTABanner";

function PublicLayout({ children }) {
  return (
    <>
      <CTABanner variant="sticky-top" />
      <DynamicHeader />
      <main>{children}</main>
      <DynamicFooter />
    </>
  );
}
```

### Option 2: Add to Specific Pages

```jsx
// frontend/src/pages/Home.jsx
import CTABanner from "../components/CTABanner";

function Home() {
  return (
    <>
      <CTABanner variant="smart-header" />
      <div>Your page content</div>
    </>
  );
}
```

### Option 3: Conditional Display

```jsx
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const showCTA = ["/", "/services", "/about"].includes(location.pathname);

  return (
    <>
      {showCTA && <CTABanner variant="sticky-top" />}
      <Routes>...</Routes>
    </>
  );
}
```

## 📱 Responsive Behavior

All variants automatically adapt to screen sizes:

- **Mobile (< 640px)**

  - Compact layout
  - Stacked buttons
  - Shorter text
  - Smaller icons

- **Tablet (640px - 1024px)**

  - Medium layout
  - Side-by-side buttons on larger tablets
  - Optimized spacing

- **Desktop (> 1024px)**
  - Full layout
  - All elements visible
  - Maximum information display

## 🎨 Styling

The component uses Tailwind CSS and can be customized via props. For advanced customization, modify the component directly or use custom CSS classes.

### Custom Colors

To change the color scheme, edit the gradient classes in `CTABanner.jsx`:

```jsx
// Change from red to blue
from-red-500 to-red-600  →  from-blue-500 to-blue-600
```

## ⚡ Performance Tips

1. **Use dismissible**: Allows users to hide the banner, improving UX
2. **Set appropriate scroll triggers**: Don't show too early or too late
3. **Use localStorage**: Respect user's dismissal choice across sessions
4. **Optimize content**: Keep text concise for mobile devices

## 🐛 Troubleshooting

### Banner not showing?

- Check if it was previously dismissed (clear localStorage)
- Verify scroll position for scroll-triggered variants
- Check z-index conflicts with other elements

### Overlapping content?

- Add margin/padding to your main content
- For sticky-top: Add `padding-top` to body or main element
- For floating-button: Ensure bottom-right area is clear

### Mobile issues?

- Test with actual mobile devices, not just browser resize
- Check touch target sizes (should be at least 44x44px)
- Verify text is readable on small screens

## 📞 Support

For issues or questions, check:

1. Demo page: `/cta-demo`
2. Component source: `frontend/src/components/CTABanner.jsx`
3. Example usage: `frontend/src/pages/CTABannerDemo.jsx`
