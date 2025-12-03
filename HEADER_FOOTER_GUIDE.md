# Header & Footer Management System

## Overview

Dynamic header and footer management system that allows admin users to configure site-wide header and footer content through the admin dashboard **WITHOUT storing HTML in the database**.

## ✅ Architecture (Follows Standards)

- **Data Storage**: JSON configuration in MySQL
- **Rendering**: Pure React components
- **Styling**: Tailwind CSS
- **Admin Interface**: React-based configuration panel

---

## 🗄️ Database Setup

### 1. Run Migration

```bash
cd backend
mysql -u root -p harsh_ranjan_website < migrations/create-header-footer-tables.sql
```

### 2. Tables Created

- `site_header` - Stores header configuration (logo, navigation, CTA button)
- `site_footer` - Stores footer configuration (brand info, columns, social links)

Both tables store **JSON data**, NOT HTML markup.

---

## 🔌 API Endpoints

### Public Endpoints (No Auth Required)

```
GET /api/header-footer/header    - Get active header configuration
GET /api/header-footer/footer    - Get active footer configuration
```

### Admin Endpoints (Auth Required)

```
PUT /api/header-footer/header    - Update header configuration
PUT /api/header-footer/footer    - Update footer configuration
GET /api/header-footer/header/history - Get header version history
GET /api/header-footer/footer/history - Get footer version history
```

---

## 📊 Data Structure

### Header Configuration (JSON)

```json
{
  "logo_text": "Harsh Ranjan",
  "logo_icon": "fas fa-play",
  "navigation_items": [
    { "label": "Home", "href": "#home" },
    { "label": "Services", "href": "#services" },
    { "label": "Contact", "href": "/contact", "isLink": true }
  ],
  "cta_button": {
    "text": "Book Strategy Call",
    "variant": "coral"
  },
  "social_links": []
}
```

### Footer Configuration (JSON)

```json
{
  "brand_info": {
    "logo_text": "Harsh Ranjan",
    "logo_icon": "fas fa-play",
    "tagline": "AI-powered marketing solutions for modern brands."
  },
  "footer_columns": [
    {
      "title": "Quick Links",
      "links": [
        { "label": "Services", "href": "#services" },
        { "label": "Pricing", "href": "#pricing" }
      ]
    }
  ],
  "social_links": [
    {
      "platform": "linkedin",
      "icon": "fab fa-linkedin",
      "url": "#",
      "color": "purple"
    }
  ],
  "copyright_text": "© 2025 Harsh Ranjan. All rights reserved."
}
```

---

## 🎨 Admin Dashboard Usage

### Access

Navigate to: **`/admin/header-footer`**

### Features

#### Header Management

1. **Logo Settings**

   - Edit logo text
   - Change logo icon (Font Awesome class)

2. **Navigation Items**

   - Add/remove navigation links
   - Set label and href
   - Toggle React Router Link (for internal pages)

3. **CTA Button**
   - Customize button text
   - Choose button color variant (coral, purple, cyan, gradient)

#### Footer Management

1. **Brand Information**

   - Edit logo and tagline
   - Configure brand identity

2. **Footer Columns**

   - Add/remove columns
   - Each column has title and links
   - Unlimited links per column

3. **Copyright Text**
   - Customize footer copyright message

---

## 🔄 How It Works

### Frontend Flow

```
1. AgencyLayout component mounts
2. Fetch GET /api/header-footer/header
3. Fetch GET /api/header-footer/footer
4. React renders header/footer with fetched data
5. All styling done with Tailwind CSS classes
```

### Admin Flow

```
1. Admin opens /admin/header-footer
2. Form loads current configuration
3. Admin edits fields (JSON data)
4. Click "Save Header" or "Save Footer"
5. PUT request to API with new configuration
6. Database stores new version (deactivates old)
7. Frontend immediately shows updated content
```

---

## 🚀 Implementation in React Components

### Update AgencyLayout to Fetch Data

```jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const AgencyLayout = ({ children }) => {
  const [header, setHeader] = useState(null);
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    const fetchHeaderFooter = async () => {
      try {
        const [headerRes, footerRes] = await Promise.all([
          axios.get("/api/header-footer/header"),
          axios.get("/api/header-footer/footer"),
        ]);
        setHeader(headerRes.data);
        setFooter(footerRes.data);
      } catch (error) {
        console.error("Error fetching header/footer:", error);
      }
    };
    fetchHeaderFooter();
  }, []);

  if (!header || !footer) return <div>Loading...</div>;

  return (
    <div>
      {/* Dynamic Header */}
      <nav>
        <span>{header.logo_text}</span>
        {header.navigation_items.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <button>{header.cta_button.text}</button>
      </nav>

      <main>{children}</main>

      {/* Dynamic Footer */}
      <footer>
        <p>{footer.brand_info.tagline}</p>
        {footer.footer_columns.map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            {col.links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
        <p>{footer.copyright_text}</p>
      </footer>
    </div>
  );
};
```

---

## 📝 Benefits

✅ **No HTML in Database** - Only JSON configuration
✅ **Version Control** - History of all changes
✅ **Easy Updates** - Admin can change without code deployment
✅ **Type Safe** - Structured data with validation
✅ **React Native** - Pure component-based rendering
✅ **Fast Performance** - No HTML parsing required
✅ **Tailwind Styling** - All styles in React components

---

## 🔒 Security

- Admin endpoints protected with JWT authentication
- Input sanitization on all fields
- JSON schema validation
- No XSS vulnerabilities (no HTML injection)
- Rate limiting applied

---

## 🐛 Troubleshooting

### Header/Footer not updating?

- Check browser console for API errors
- Verify token is valid (logged in as admin)
- Check database connection
- Ensure migration was run successfully

### Styles not applying?

- Verify Tailwind CSS is configured
- Check className attributes in AgencyLayout
- Confirm Font Awesome CDN is loaded

---

## 📚 Next Steps

1. ✅ Run database migration
2. ✅ Test API endpoints
3. ✅ Update AgencyLayout to fetch data dynamically
4. ✅ Access admin panel at `/admin/header-footer`
5. ✅ Configure header and footer
6. ✅ Test on frontend

---

**Last Updated**: December 2, 2025  
**Status**: Production Ready ✅
