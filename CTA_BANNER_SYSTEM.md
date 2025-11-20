# CTA Banner System - Complete Documentation

## 🎯 Overview

The CTA Banner System allows you to create, manage, and embed call-to-action banners anywhere on your website using shortcodes, just like the Forms system.

## 📁 System Components

### Backend

- **Model**: `backend/models/CTABanner.js` - Database model for CTA banners
- **Controller**: `backend/controllers/ctaBanner.controller.js` - Business logic and API endpoints
- **Routes**: `backend/routes/ctaBanner.routes.js` - API route definitions
- **Migration**: `backend/migrations/008-create-cta-banners.js` - Database schema

### Frontend

- **Admin List**: `frontend/src/pages/admin/CTABannerList.jsx` - Manage all banners
- **Admin Form**: `frontend/src/pages/admin/CTABannerForm.jsx` - Create/edit banners
- **Display Component**: `frontend/src/components/CTABanner.jsx` - Banner UI component
- **Embed Component**: `frontend/src/components/CTABannerEmbed.jsx` - Shortcode renderer
- **Demo Page**: `frontend/src/pages/CTABannerDemo.jsx` - Live preview of all variants

## 🚀 Quick Start Guide

### 1. Access Admin Panel

Navigate to: `/admin/cta-banners`

### 2. Create a Banner

1. Click "Create Banner"
2. Fill in the form:

   - **Banner Name**: Internal name (e.g., "Homepage ROI Audit")
   - **Title**: Main heading text
   - **Description**: Subtitle text
   - **Variant**: Choose display style (sticky-top, floating-button, etc.)
   - **Button Text**: CTA button label
   - **Phone Number**: Contact number
   - **Status**: Set to "Active" to make it live

3. Click "Create Banner"

### 3. Get the Shortcode

1. Click the code icon (📝) next to your banner
2. Copy the shortcode: `[cta_banner id="1"]`

### 4. Embed Anywhere

Paste the shortcode in any:

- Page content
- Blog post
- Custom HTML

The banner will automatically render!

## 📋 Banner Variants

### 1. Sticky Top (`sticky-top`)

- **Description**: Fixed banner at the top of the page
- **Best For**: Maximum visibility, landing pages
- **Mobile**: Fully responsive with stacked layout

### 2. Floating Button (`floating-button`)

- **Description**: Bottom-right floating button with tooltip
- **Best For**: Non-intrusive engagement, blog posts
- **Mobile**: Compact circular button

### 3. Slide Bottom (`slide-bottom`)

- **Description**: Slides up from bottom after scrolling
- **Best For**: Engaged users, content pages
- **Mobile**: Full-width bottom banner

### 4. Smart Header (`smart-header`)

- **Description**: Full-size initially, shrinks on scroll
- **Best For**: Adaptive design, professional sites
- **Mobile**: Compact mode when scrolled

## 🎨 Customization Options

### Basic Settings

- **Title**: Main heading (required)
- **Description**: Supporting text
- **Button Text**: CTA button label
- **Button URL**: Custom navigation URL (optional)
- **Phone Number**: Display phone for calls
- **Show Phone**: Toggle phone display

### Display Settings

- **Show After Scroll**: Pixels before showing (scroll variants)
- **Dismissible**: Allow users to hide banner
- **Placement**: Choose where to show (all pages, homepage, blog, etc.)

### Color Schemes

Choose from preset color themes:

- Red (Default)
- Blue
- Green
- Purple
- Orange

## 📊 Analytics & Tracking

Each banner tracks:

- **Views**: How many times banner was shown
- **Clicks**: How many times CTA was clicked
- **CTR**: Click-through rate (%)

View stats in the admin list page.

## 🔧 API Endpoints

### Public

- `GET /api/cta-banners/active` - Get all active banners
- `GET /api/cta-banners/:id/embed` - Get specific banner for embedding
- `POST /api/cta-banners/:id/track-view` - Track banner view
- `POST /api/cta-banners/:id/track-click` - Track banner click

### Admin (Protected)

- `GET /api/cta-banners` - List all banners
- `GET /api/cta-banners/:id` - Get specific banner
- `POST /api/cta-banners` - Create new banner
- `PUT /api/cta-banners/:id` - Update banner
- `DELETE /api/cta-banners/:id` - Delete banner
- `POST /api/cta-banners/:id/duplicate` - Duplicate banner

## 💻 Developer Guide

### Using in React Components

```jsx
import CTABannerEmbed from "../components/CTABannerEmbed";

function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <CTABannerEmbed id={1} />
    </div>
  );
}
```

### Using Direct Component

```jsx
import CTABanner from "../components/CTABanner";

function CustomCTA() {
  return (
    <CTABanner
      variant="sticky-top"
      title="Special Offer!"
      description="Get 50% off today"
      buttonText="Claim Now"
      phoneNumber="+1234567890"
      onButtonClick={() => console.log("Clicked!")}
    />
  );
}
```

### Shortcode in Content

```javascript
const pageContent = `
  <h1>Welcome</h1>
  <p>Check out our offer below:</p>
  [cta_banner id="1"]
  <p>More content here...</p>
`;

// Render with ContentRenderer
<ContentRenderer content={pageContent} />;
```

## 🎯 Database Schema

```sql
CREATE TABLE cta_banners (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  variant ENUM('sticky-top', 'floating-button', 'slide-bottom', 'smart-header'),
  button_text VARCHAR(255),
  button_url VARCHAR(255),
  phone_number VARCHAR(255),
  show_phone BOOLEAN,
  show_after_scroll INT,
  dismissible BOOLEAN,
  colors TEXT, -- JSON
  settings LONGTEXT, -- JSON
  status ENUM('active', 'inactive', 'draft'),
  placement TEXT, -- JSON array
  click_count INT,
  view_count INT,
  created_at DATETIME,
  updated_at DATETIME
);
```

## 📝 Best Practices

### 1. Content

- Keep titles under 50 characters
- Descriptions under 100 characters
- Use action-oriented CTA text
- Test different variants

### 2. Performance

- Use dismissible banners to improve UX
- Set appropriate scroll triggers
- Don't show too many banners at once
- Monitor CTR and optimize

### 3. Design

- Match color scheme to your brand
- Test on mobile devices
- Ensure phone numbers are clickable
- Use clear, readable fonts

### 4. Placement

- Homepage: Use sticky-top for max visibility
- Blog: Use floating-button to avoid disruption
- Long pages: Use slide-bottom for engaged users
- Service pages: Use smart-header for professional look

## 🔍 Troubleshooting

### Banner Not Showing?

1. Check banner status is "Active"
2. Verify shortcode syntax: `[cta_banner id="1"]`
3. Check placement settings
4. Clear browser localStorage if dismissed
5. Check browser console for errors

### Shortcode Not Parsing?

1. Ensure ContentRenderer is used
2. Check shortcode format (quotes, spacing)
3. Verify banner ID exists
4. Check API connectivity

### Analytics Not Tracking?

1. Verify API endpoints are reachable
2. Check network tab for failed requests
3. Ensure banner ID is correct
4. Check backend logs

## 🎨 Customization Examples

### Example 1: Landing Page Hero CTA

```javascript
{
  name: "Landing Hero CTA",
  variant: "sticky-top",
  title: "Transform Your Business Today",
  description: "Join 1000+ successful clients",
  button_text: "Start Free Trial",
  status: "active",
  placement: ["homepage"]
}
```

### Example 2: Blog Exit Intent

```javascript
{
  name: "Blog Exit CTA",
  variant: "slide-bottom",
  title: "Wait! Before You Go...",
  description: "Subscribe to our newsletter",
  button_text: "Subscribe Now",
  show_after_scroll: 500,
  status: "active",
  placement: ["blog"]
}
```

### Example 3: Mobile-Only Promo

```javascript
{
  name: "Mobile Promo",
  variant: "floating-button",
  title: "Limited Time Offer",
  description: "Get 25% off your first order",
  button_text: "Shop Now",
  dismissible: true,
  status: "active"
}
```

## 📚 Related Documentation

- [CTA_BANNER_GUIDE.md](./CTA_BANNER_GUIDE.md) - Component usage guide
- [FORM_INTEGRATION_GUIDE.md](./FORM_INTEGRATION_GUIDE.md) - Similar shortcode system
- [SHORTCODE_USAGE.md](./SHORTCODE_USAGE.md) - Shortcode parser details

## 🎉 Features Summary

✅ 4 responsive banner variants
✅ Shortcode embedding system
✅ Admin CRUD interface
✅ Real-time analytics
✅ Color customization
✅ Placement targeting
✅ Mobile-optimized
✅ Dismissible banners
✅ Click tracking
✅ View tracking
✅ Duplicate functionality
✅ Live preview mode
✅ Status management

## 🔄 Updates & Changelog

### v1.0.0 (Initial Release)

- Basic CTA banner system
- 4 display variants
- Shortcode integration
- Admin management interface
- Analytics tracking
- Color themes
