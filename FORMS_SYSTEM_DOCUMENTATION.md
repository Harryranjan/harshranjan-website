# Forms, Modals & Popups Management System

## Overview

A comprehensive system for creating and managing forms, modal windows, and popup notifications with advanced features including drag-and-drop form builder, submission tracking, and analytics.

---

## ✨ Features

### 📋 Forms

- **Advanced Form Builder**

  - Drag-and-drop interface
  - 16 field types (text, email, textarea, select, radio, checkbox, date, time, file, etc.)
  - Visual field editor with live preview
  - Field validation and required fields
  - Custom styling options

- **Form Management**

  - Create, edit, duplicate, delete forms
  - Form statistics dashboard
  - Multiple form types (Contact, Newsletter, Lead Generation, Custom)
  - Status management (Draft, Active, Inactive)

- **Submission Tracking**
  - View all form submissions
  - Filter by status, date range
  - Individual submission details
  - Add notes to submissions
  - Export submissions to CSV
  - Track metadata (IP, user agent, referrer)

### 🪟 Modals

- **Modal Builder**
  - Visual modal editor
  - Multiple modal types (Announcement, Offer, Newsletter, Custom)
  - Trigger options:
    - Time delay
    - Scroll percentage
    - Exit intent
    - On click
    - Manual
  - Display rules and targeting
  - Form integration
  - Analytics tracking (views, conversions)

### 💬 Popups

- **Popup Builder**
  - Multiple popup styles (Banner, Slide-in, Corner, Bar, Full-screen)
  - Position control (Top, Bottom, Corners, Center)
  - Trigger configuration
  - Schedule start/end dates
  - Auto-close timer
  - Custom styling (colors, animation)
  - Analytics tracking (views, clicks, conversions)

---

## 📊 Database Schema

### Forms Table

```sql
- id (INT, PRIMARY KEY)
- name (VARCHAR, required)
- description (TEXT)
- type (ENUM: contact, newsletter, lead, custom)
- fields (TEXT LONG, JSON array)
- settings (TEXT LONG, JSON object)
- styling (TEXT, JSON object)
- status (ENUM: active, inactive, draft)
- submit_button_text (VARCHAR)
- success_message (TEXT)
- error_message (TEXT)
- submission_count (INT)
- last_submission_at (DATETIME)
- created_at, updated_at (DATETIME)
```

### Form Submissions Table

```sql
- id (INT, PRIMARY KEY)
- form_id (INT, FOREIGN KEY)
- data (TEXT LONG, JSON object)
- user_agent (VARCHAR)
- ip_address (VARCHAR)
- referrer (VARCHAR)
- status (ENUM: new, read, archived, spam)
- notes (TEXT)
- created_at, updated_at (DATETIME)
```

### Modals Table

```sql
- id (INT, PRIMARY KEY)
- name (VARCHAR, required)
- title (VARCHAR)
- content (TEXT LONG)
- type (ENUM: announcement, offer, newsletter, custom)
- trigger_type (ENUM: time, scroll, exit, click, manual)
- trigger_value (VARCHAR)
- display_rules (TEXT, JSON object)
- styling (TEXT, JSON object)
- form_id (INT, FOREIGN KEY)
- cta_text, cta_link (VARCHAR)
- status (ENUM: active, inactive, draft)
- views, conversions (INT)
- created_at, updated_at (DATETIME)
```

### Popups Table

```sql
- id (INT, PRIMARY KEY)
- name (VARCHAR, required)
- title, message (VARCHAR/TEXT)
- type (ENUM: banner, slide-in, full-screen, corner, bar)
- position (ENUM: top, bottom, top-left, etc.)
- trigger_type (ENUM: immediate, time, scroll, exit, click)
- trigger_value (VARCHAR)
- display_rules (TEXT, JSON object)
- styling (TEXT, JSON object)
- form_id (INT, FOREIGN KEY)
- cta_text, cta_link (VARCHAR)
- close_button (BOOLEAN)
- auto_close (INT, seconds)
- status (ENUM: active, inactive, draft, scheduled)
- start_date, end_date (DATETIME)
- views, clicks, conversions (INT)
- created_at, updated_at (DATETIME)
```

---

## 🔌 API Endpoints

### Forms API

```
GET    /api/forms                    - Get all forms
GET    /api/forms/stats              - Get form statistics
GET    /api/forms/:id                - Get single form
POST   /api/forms                    - Create form
PUT    /api/forms/:id                - Update form
DELETE /api/forms/:id                - Delete form
POST   /api/forms/:id/duplicate      - Duplicate form
```

### Form Submissions API

```
POST   /api/forms/:formId/submit                - Submit form (public)
GET    /api/forms/:formId/submissions           - Get submissions
GET    /api/forms/:formId/submissions/export    - Export CSV
GET    /api/forms/submissions/:id               - Get single submission
PUT    /api/forms/submissions/:id               - Update submission status
DELETE /api/forms/submissions/:id               - Delete submission
POST   /api/forms/submissions/bulk-update       - Bulk update status
```

### Modals API

```
GET    /api/modals                   - Get all modals
GET    /api/modals/active            - Get active modals (public)
GET    /api/modals/:id               - Get single modal
POST   /api/modals                   - Create modal
PUT    /api/modals/:id               - Update modal
DELETE /api/modals/:id               - Delete modal
POST   /api/modals/:id/view          - Track view (public)
POST   /api/modals/:id/conversion    - Track conversion (public)
```

### Popups API

```
GET    /api/popups                   - Get all popups
GET    /api/popups/active            - Get active popups (public)
GET    /api/popups/:id               - Get single popup
POST   /api/popups                   - Create popup
PUT    /api/popups/:id               - Update popup
DELETE /api/popups/:id               - Delete popup
POST   /api/popups/:id/view          - Track view (public)
POST   /api/popups/:id/click         - Track click (public)
POST   /api/popups/:id/conversion    - Track conversion (public)
```

---

## 🎨 Frontend Routes

```
/admin/forms                         - Forms list & dashboard
/admin/forms/new                     - Create new form
/admin/forms/:id/edit                - Edit form
/admin/forms/:formId/submissions     - View submissions
/admin/forms/modals/new              - Create new modal
/admin/forms/modals/:id/edit         - Edit modal
/admin/forms/popups/new              - Create new popup
/admin/forms/popups/:id/edit         - Edit popup
```

---

## 🛠️ Form Field Types

| Type      | Description            | Options |
| --------- | ---------------------- | ------- |
| text      | Single line text input | ✓       |
| email     | Email address field    | ✓       |
| tel       | Phone number field     | ✓       |
| textarea  | Multi-line text area   | ✓       |
| number    | Numeric input          | ✓       |
| select    | Dropdown selection     | ✓       |
| radio     | Radio button group     | ✓       |
| checkbox  | Multiple checkboxes    | ✓       |
| date      | Date picker            | ✓       |
| time      | Time picker            | ✓       |
| file      | File upload            | ✓       |
| url       | Website URL            | ✓       |
| hidden    | Hidden field           | ✓       |
| heading   | Section heading        | -       |
| paragraph | Text content           | -       |
| divider   | Visual separator       | -       |

---

## 📈 Statistics Tracked

### Forms

- Total forms count
- Active forms count
- Draft forms count
- Total submissions
- Recent submissions (7 days)
- Top performing forms

### Modals

- Total views
- Conversions
- Conversion rate

### Popups

- Total views
- Total clicks
- Conversions
- Click-through rate
- Conversion rate

---

## 🚀 Usage Examples

### Creating a Contact Form

1. Navigate to `/admin/forms`
2. Click "New Form"
3. Set form name and type
4. Drag field types from left sidebar
5. Configure each field in right sidebar
6. Save and activate form

### Viewing Submissions

1. Go to form list
2. Click 📨 icon next to form
3. View/filter submissions
4. Click export to download CSV
5. Update submission status
6. Add notes to submissions

### Creating a Modal

1. Navigate to `/admin/forms`
2. Click "New Modal"
3. Configure trigger and display rules
4. Add content and CTA
5. Preview and save

### Creating a Popup

1. Navigate to `/admin/forms`
2. Click "New Popup"
3. Select type and position
4. Set trigger conditions
5. Customize styling
6. Schedule or activate

---

## 🔐 Security Features

- Authentication required for all admin endpoints
- Rate limiting on public submission endpoints
- IP address tracking for submissions
- Spam status for filtering
- CSRF protection
- Input validation and sanitization

---

## 📦 Installation

### Backend Migration

```bash
cd backend
npx sequelize-cli db:migrate
```

### Files Created

**Backend:**

- `migrations/20251120000002-create-forms-modals-popups.js`
- `models/Form.js`
- `models/FormSubmission.js`
- `models/Modal.js`
- `models/Popup.js`
- `controllers/form.controller.js`
- `controllers/formSubmission.controller.js`
- `controllers/modal.controller.js`
- `controllers/popup.controller.js`
- `routes/form.routes.js`
- `routes/modal.routes.js`
- `routes/popup.routes.js`

**Frontend:**

- `pages/admin/FormList.jsx` - Forms dashboard
- `pages/admin/FormBuilder.jsx` - Drag-and-drop form builder
- `pages/admin/FormSubmissions.jsx` - Submissions viewer
- `pages/admin/ModalBuilder.jsx` - Modal editor
- `pages/admin/PopupBuilder.jsx` - Popup editor

---

## 🎯 Future Enhancements

- [ ] Conditional logic (show/hide fields based on answers)
- [ ] Multi-step forms with progress bar
- [ ] Form templates library
- [ ] Email notification system
- [ ] Webhook integrations
- [ ] A/B testing for modals/popups
- [ ] Advanced analytics dashboard
- [ ] Form abandonment tracking
- [ ] GDPR compliance features
- [ ] reCAPTCHA integration
- [ ] Payment form fields (Stripe, PayPal)
- [ ] Calendar appointment booking
- [ ] Quiz/survey functionality
- [ ] Rating and feedback fields

---

## 📝 Notes

- All JSON fields are automatically parsed/stringified by Sequelize getters/setters
- Forms can be embedded using form ID
- Modals and popups support targeting by page, device, and frequency
- Export functionality generates CSV with all form fields
- Submission statuses help organize responses (new → read → archived)
- Analytics are tracked server-side via public endpoints

---

**Created:** November 20, 2025
**Version:** 1.0.0
**Status:** ✅ Fully Functional
