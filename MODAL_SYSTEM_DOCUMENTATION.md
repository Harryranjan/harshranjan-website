# Modal System Documentation

## 🎯 Overview

The Modal System allows you to create, manage, and display modal pop-ups for announcements, offers, lead generation, and custom purposes. Built with the same architecture as the Forms system, it provides a complete solution for engaging visitors.

---

## 📁 File Structure

### Backend
```
backend/
├── models/
│   └── Modal.js                 # Modal database model
├── controllers/
│   └── modal.controller.js      # Business logic for modals
└── routes/
    └── modal.routes.js          # API endpoints
```

### Frontend
```
frontend/src/
├── pages/admin/
│   ├── ModalList.jsx           # List all modals with filters
│   └── ModalBuilder.jsx        # Create/edit modals
└── components/
    └── ModalEmbed.jsx          # Render modals on frontend
```

---

## 🗄️ Database Schema

```javascript
{
  id: INTEGER (Primary Key),
  name: STRING (Required),                  // Admin-facing name
  title: STRING,                            // Displayed title
  content: TEXT,                            // HTML content
  type: ENUM,                               // announcement | offer | newsletter | custom
  trigger_type: ENUM,                       // time | scroll | exit | click | manual
  trigger_value: STRING,                    // Trigger configuration
  display_rules: JSON {                     // Display targeting
    pages: [],
    devices: ["desktop", "mobile", "tablet"],
    frequency: "always" | "once" | "once_per_day" | "once_per_week"
  },
  styling: JSON {                           // Visual customization
    size: "small" | "medium" | "large" | "full",
    position: "center" | "top" | "bottom",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    overlay: true,
    overlayColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "8"
  },
  form_id: INTEGER,                         // Embedded form (optional)
  cta_text: STRING,                         // Call-to-action button text
  cta_link: STRING,                         // CTA destination URL
  status: ENUM,                             // active | inactive | draft
  views: INTEGER,                           // View counter
  conversions: INTEGER,                     // Conversion tracker
  created_at: DATETIME,
  updated_at: DATETIME
}
```

---

## 🚀 Features

### Admin Features (ModalList.jsx)
✅ List all modals with pagination
✅ Filter by status (active, inactive, draft)
✅ Filter by type (announcement, offer, newsletter, custom)
✅ Search by name
✅ View performance metrics (views, conversions, conversion rate)
✅ Quick status toggle (activate/deactivate)
✅ Get embed code for integration
✅ Delete modals with confirmation
✅ Statistics dashboard

### Modal Builder (ModalBuilder.jsx)
✅ **Basic Settings**
  - Modal name (internal)
  - Modal type selection
  - Status (draft, active, inactive)

✅ **Trigger Settings**
  - Manual trigger (via code)
  - Time delay (seconds)
  - Scroll percentage trigger
  - Exit intent detection
  - Click event trigger

✅ **Content**
  - Title
  - Rich text content (HTML)
  - CTA button text
  - CTA button link
  - Optional form embedding

✅ **Styling**
  - Size presets (small, medium, large, full)
  - Position (center, top, bottom)
  - Border radius customization
  - Background color picker
  - Text color picker
  - Overlay toggle with color

✅ **Display Rules**
  - Device targeting (desktop, tablet, mobile)
  - Display frequency (always, once per session, once per day, once per week)

✅ **Preview**
  - Live preview modal
  - See all styling in real-time

---

## 📡 API Endpoints

### Admin Endpoints (Protected)

**GET `/api/modals`**
- List all modals with filtering and pagination
- Query params: status, type, page, limit
- Returns: { modals: [], pagination: {} }

**GET `/api/modals/:id`**
- Get single modal by ID
- Returns: Modal object

**POST `/api/modals`**
- Create new modal
- Body: Modal data object
- Returns: Created modal

**PUT `/api/modals/:id`**
- Update existing modal
- Body: Updated modal data
- Returns: Updated modal

**DELETE `/api/modals/:id`**
- Delete modal
- Returns: Success message

### Public Endpoints

**GET `/api/modals/active`**
- Get all active modals
- No authentication required
- Returns: Array of active modals

**POST `/api/modals/:id/view`**
- Track modal view
- Increments view counter

**POST `/api/modals/:id/conversion`**
- Track modal conversion
- Increments conversion counter

---

## 💻 Frontend Integration

### Using ModalEmbed Component

```jsx
import { ModalEmbed } from "../components";

function MyPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>

      {showModal && (
        <ModalEmbed
          modalId={123}
          onClose={() => setShowModal(false)}
          isOpen={showModal}
        />
      )}
    </div>
  );
}
```

### Auto-Trigger Implementation

```jsx
import { useState, useEffect } from "react";
import { ModalEmbed } from "../components";
import api from "../utils/api";

function PageWithAutoModal() {
  const [activeModals, setActiveModals] = useState([]);
  const [shownModals, setShownModals] = useState([]);

  useEffect(() => {
    loadActiveModals();
  }, []);

  const loadActiveModals = async () => {
    try {
      const { data } = await api.get("/modals/active");
      
      // Filter modals based on trigger type
      data.forEach(modal => {
        if (modal.trigger_type === "time") {
          setTimeout(() => {
            setShownModals(prev => [...prev, modal]);
          }, parseInt(modal.trigger_value) * 1000);
        }
        
        if (modal.trigger_type === "scroll") {
          window.addEventListener("scroll", () => {
            const scrollPercent = (window.scrollY / 
              (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent >= parseInt(modal.trigger_value)) {
              setShownModals(prev => [...prev, modal]);
            }
          });
        }
        
        if (modal.trigger_type === "exit") {
          document.addEventListener("mouseout", (e) => {
            if (e.clientY <= 0) {
              setShownModals(prev => [...prev, modal]);
            }
          });
        }
      });
      
      setActiveModals(data);
    } catch (error) {
      console.error("Error loading modals:", error);
    }
  };

  return (
    <div>
      {/* Your page content */}
      
      {/* Render active modals */}
      {shownModals.map(modal => (
        <ModalEmbed
          key={modal.id}
          modalId={modal.id}
          isOpen={true}
          onClose={() => {
            setShownModals(prev => prev.filter(m => m.id !== modal.id));
          }}
        />
      ))}
    </div>
  );
}
```

---

## 🎨 Modal Types

### 1. Announcement
Use for: Site updates, news, important notices
Typical styling: Informational blue/gray colors

### 2. Offer
Use for: Discounts, promotions, special deals
Typical styling: Bold colors, urgency messaging

### 3. Newsletter
Use for: Email subscription forms
Typical styling: Clean, form-focused design

### 4. Custom
Use for: Any other purpose
Typical styling: Fully customizable

---

## 🎯 Trigger Types Explained

### Manual
- Triggered programmatically via code
- Full control over when modal appears
- Use for: Click events, custom conditions

### Time Delay
- Appears after X seconds on page
- Value: Number of seconds (e.g., "5")
- Use for: Welcome messages, announcements

### Scroll Percentage
- Triggers when user scrolls X% down page
- Value: Percentage (e.g., "50")
- Use for: Exit intent alternatives, engagement

### Exit Intent
- Detects when user about to leave page
- No value needed
- Use for: Last-chance offers, retention

### Click
- Triggers when specific element clicked
- Value: CSS selector (e.g., ".btn-primary")
- Use for: Info modals, confirmations

---

## 📊 Performance Tracking

### Metrics Collected
- **Views**: Total number of times modal displayed
- **Conversions**: Button clicks or form submissions
- **Conversion Rate**: (Conversions / Views) × 100

### Viewing Analytics
1. Go to Modal List
2. See performance column for each modal
3. View aggregate stats in header cards

### Optimizing Performance
- Test different trigger types
- A/B test content and CTAs
- Monitor conversion rates
- Adjust display frequency

---

## 🔧 Component Props

### ModalEmbed Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `modalId` | number | Yes | Modal ID to render |
| `onClose` | function | No | Close handler callback |
| `isOpen` | boolean | No | Control visibility (default: true) |

---

## 🎨 Styling Options

### Size Presets
- **Small**: 400px max width
- **Medium**: 600px max width
- **Large**: 800px max width
- **Full**: Maximum width (responsive)

### Position Options
- **Center**: Vertically and horizontally centered
- **Top**: Anchored to top of viewport
- **Bottom**: Anchored to bottom of viewport

### Colors
- Background color (any hex value)
- Text color (any hex value)
- Overlay color (RGBA for transparency)

---

## 📱 Device Targeting

Select which devices should display the modal:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

Responsive breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🔄 Display Frequency

Control how often users see the modal:

### Always
- Shows every time conditions are met
- Use for: Critical announcements

### Once Per Session
- Shows once until browser closed
- Use for: Welcome messages

### Once Per Day
- Shows once per 24 hours
- Use for: Daily deals, updates

### Once Per Week
- Shows once per 7 days
- Use for: Newsletter prompts

*Implementation uses localStorage/cookies*

---

## 🚀 Best Practices

### Content
✅ Keep titles short and compelling
✅ Use clear, action-oriented CTAs
✅ Limit content to 2-3 sentences
✅ Test different messages

### Timing
✅ Don't trigger immediately (wait 3-5s)
✅ Don't overwhelm with multiple modals
✅ Consider user intent and journey
✅ Use exit intent sparingly

### Design
✅ Maintain brand consistency
✅ Ensure mobile responsiveness
✅ Use high contrast for readability
✅ Keep overlay semi-transparent

### Performance
✅ Monitor conversion rates
✅ A/B test different approaches
✅ Adjust frequency based on data
✅ Remove underperforming modals

---

## 🔍 Troubleshooting

### Modal Not Appearing
1. Check status is "active"
2. Verify trigger conditions are met
3. Check display rules (devices, frequency)
4. Look for JavaScript console errors
5. Ensure API endpoint is accessible

### Styling Issues
1. Verify CSS classes are loaded
2. Check z-index conflicts
3. Test on different screen sizes
4. Inspect browser DevTools

### Performance Issues
1. Limit number of active modals
2. Optimize image sizes in content
3. Use simple CSS animations
4. Test on slower connections

---

## 📚 Related Documentation

- [Form System Documentation](./FORMS_SYSTEM_DOCUMENTATION.md)
- [Popup System Documentation](./POPUP_SYSTEM_DOCUMENTATION.md) (Coming Soon)
- [Reusable Components](./NEW_REUSABLE_COMPONENTS.md)

---

## 🎯 What's Next?

After completing the Modal system, we'll implement:
1. **Popup System** - Similar to modals but with different positioning and animations
2. **Modal/Popup Analytics Dashboard** - Detailed performance metrics
3. **A/B Testing** - Test multiple versions of modals
4. **Advanced Targeting** - URL patterns, user segments, custom rules

---

**Created:** November 20, 2025  
**Status:** ✅ Production Ready  
**Version:** 1.0  
**Backend:** Complete with all CRUD operations  
**Frontend:** Complete with ModalList, ModalBuilder, and ModalEmbed
