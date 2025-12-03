# Architecture Standards & Development Guidelines

## ⚠️ CRITICAL: NO HTML IN DATABASE

**This project uses PURE REACT architecture. DO NOT store HTML in the database.**

## Technology Stack

### Frontend

- **React 18.2.0** - Component-based UI
- **Tailwind CSS 3.x** - Utility-first styling
- **Vite 5.x** - Build tool and dev server
- **React Router** - Client-side routing

### Backend

- **Node.js + Express** - API server
- **MySQL** - Data storage (JSON/text data ONLY, never HTML)
- **Redis** - Caching layer

### Optional

- **Python** - For AI/ML features or data processing scripts

---

## 🚫 WHAT NOT TO DO

### ❌ NEVER Store HTML in Database

```javascript
// ❌ WRONG - Do not do this
const page = {
  content: '<div class="hero"><h1>Welcome</h1></div>', // NO!
};
```

### ❌ NEVER Use Database-Driven Templates

```javascript
// ❌ WRONG - Do not fetch HTML from database
const htmlContent = await db.query("SELECT html_content FROM pages");
return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />; // NO!
```

### ❌ NEVER Mix CMS-Style HTML with React

- No HTML stored in `pages` table
- No HTML stored in `blogs` table
- No HTML templates in database
- No `dangerouslySetInnerHTML` for page content

---

## ✅ CORRECT APPROACH

### ✅ Build React Components

```javascript
// ✅ CORRECT - Pure React components
const HeroSection = ({ title, subtitle, ctaText }) => {
  return (
    <section className="pt-24 pb-12 bg-gradient-to-br from-navy to-purple">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-black text-white">{title}</h1>
        <p className="text-xl text-gray-300">{subtitle}</p>
        <button className="gradient-button px-8 py-4 rounded-full">
          {ctaText}
        </button>
      </div>
    </section>
  );
};
```

### ✅ Store Data Only (JSON/Text)

```javascript
// ✅ CORRECT - Store structured data
const pageData = {
  title: "AI-Powered Marketing",
  subtitle: "Transform your brand with AI",
  ctaText: "Get Started",
  sections: [
    { type: "hero", data: {...} },
    { type: "features", data: {...} },
    { type: "pricing", data: {...} }
  ]
}
```

### ✅ Use Component Mapping

```javascript
// ✅ CORRECT - Map data to React components
const componentMap = {
  hero: HeroSection,
  features: FeaturesSection,
  pricing: PricingSection,
};

const DynamicPage = ({ pageData }) => {
  return (
    <>
      {pageData.sections.map((section, idx) => {
        const Component = componentMap[section.type];
        return <Component key={idx} {...section.data} />;
      })}
    </>
  );
};
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── agency/       # Agency-specific components
│   │   └── common/       # Shared components
│   ├── pages/            # Page-level React components
│   ├── layouts/          # Layout wrappers (Header/Footer)
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Helper functions
│
backend/
├── controllers/          # API request handlers
├── models/              # Database models (NO HTML CONTENT)
├── routes/              # API endpoints
└── services/            # Business logic
```

---

## 🎨 Styling Guidelines

### Always Use Tailwind CSS Classes

```javascript
// ✅ CORRECT
<button className="bg-purple hover:bg-purple-700 px-6 py-3 rounded-full text-white font-bold transition">
  Click Me
</button>

// ❌ WRONG - Avoid inline styles unless absolutely necessary
<button style={{backgroundColor: 'purple', padding: '12px 24px'}}>
  Click Me
</button>
```

### Custom Styles in CSS Files

```css
/* ✅ CORRECT - For complex animations or custom effects */
.gradient-button {
  background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
  transition: transform 0.3s ease;
}

.gradient-button:hover {
  transform: translateY(-2px);
}
```

---

## 🔄 Data Flow

### Page Content Flow

1. **Component Definition** → React component files
2. **Data Storage** → MySQL (JSON/text data only)
3. **API Endpoint** → Express routes return JSON
4. **Frontend Fetch** → React fetches data via API
5. **Render** → React components render with data props

### Example Flow

```
User visits /services
    ↓
React Router loads ServicesPage component
    ↓
Component fetches data: GET /api/services
    ↓
Backend returns JSON: { services: [{id, title, description, icon}] }
    ↓
React renders: <ServiceCard title={...} description={...} />
```

---

## 🛠️ Development Workflow

### Creating New Pages

1. Create React component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`
3. Build reusable components in `frontend/src/components/`
4. Style with Tailwind CSS classes
5. If dynamic data needed, create API endpoint
6. Store data as JSON in MySQL

### Creating New Features

1. Design React components first
2. Identify data requirements (JSON schema)
3. Create database table for data (NOT HTML)
4. Build API endpoints
5. Connect frontend to API
6. Test and iterate

---

## 📝 Database Schema Guidelines

### ✅ GOOD Schema Design

```sql
CREATE TABLE pages (
  id INT PRIMARY KEY,
  slug VARCHAR(255),
  title VARCHAR(255),
  meta_description TEXT,
  component_name VARCHAR(100),  -- React component to use
  page_data JSON,               -- Structured data for component
  created_at TIMESTAMP
);
```

### ❌ BAD Schema Design

```sql
CREATE TABLE pages (
  id INT PRIMARY KEY,
  slug VARCHAR(255),
  html_content TEXT,           -- ❌ NEVER DO THIS
  created_at TIMESTAMP
);
```

---

## 🎯 Component Library Philosophy

Build a comprehensive component library for reusability:

- **Atomic Components**: Buttons, Cards, Inputs
- **Composite Components**: Forms, Modals, Navigation
- **Page Sections**: Hero, Features, Pricing, Testimonials
- **Layout Components**: Header, Footer, Sidebar

All components should:

- Accept data as props
- Be styled with Tailwind CSS
- Be fully reusable
- Be documented with JSDoc comments

---

## 🚀 Deployment Checklist

Before deploying, ensure:

- [ ] No HTML content in database
- [ ] All pages use React components
- [ ] No `dangerouslySetInnerHTML` for page content
- [ ] All styling uses Tailwind CSS
- [ ] Components are properly documented
- [ ] API returns JSON (not HTML)
- [ ] Error boundaries implemented
- [ ] Loading states handled

---

## 📚 Additional Resources

- React Best Practices: https://react.dev/learn
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- Component Design Patterns: Atomic Design methodology
- API Design: RESTful principles

---

## 🔒 Code Review Requirements

All code must pass these checks:

1. ✅ No HTML strings in database
2. ✅ Pure React components
3. ✅ Tailwind CSS for styling
4. ✅ Proper component decomposition
5. ✅ Data as JSON, not HTML
6. ✅ No legacy CMS patterns

---

**Last Updated**: December 2, 2025  
**Maintained By**: Development Team  
**Status**: ACTIVE - Enforce strictly
