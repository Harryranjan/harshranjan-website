# CTA Banner Form Integration Test Guide

## Fixed Issues

### 1. ✅ FormEmbed Component - Missing onSuccess Callback
**Problem**: The `FormEmbed` component didn't support the `onSuccess` prop that `CTAFormModal` was passing.

**Fixed**: 
- Added `onSuccess` prop to FormEmbed component signature
- Added callback execution after successful form submission
- Modal now closes automatically 2 seconds after form submission

**Files Modified**:
- `frontend/src/components/FormEmbed.jsx` - Added onSuccess prop and callback

### 2. ✅ Color Format Mismatch in CTABannerEmbed
**Problem**: Color format from database (bgFrom, bgTo, etc.) wasn't matching what CTABanner component expected.

**Fixed**:
- Updated color extraction logic in CTABannerEmbed
- Now properly converts database colors to component format
- Maintains fallback values for missing colors

**Files Modified**:
- `frontend/src/components/CTABannerEmbed.jsx` - Fixed color format conversion

## Testing Steps

### Step 1: Verify Backend is Running
```bash
cd backend
npm run dev
```
Expected: Server running on port 5000, database connected

### Step 2: Verify Frontend is Running
```bash
cd frontend
npm run dev
```
Expected: Vite running on http://localhost:5174

### Step 3: Test Admin Form Creation
1. Navigate to: `http://localhost:5174/admin/cta-banners/create`
2. Fill in banner details:
   - Name: "Test Form Modal Banner"
   - Title: "Get Your Free Consultation"
   - Description: "Fill out the form to get started"
3. Under "Button Action" dropdown, select: **"Open Form in Modal ✨"**
4. You should see a form selector dropdown appear
5. Select a form from the dropdown
6. Set Status to "Active"
7. Click "Create Banner"

### Step 4: Get Shortcode
1. Go to: `http://localhost:5174/admin/cta-banners`
2. Find your created banner
3. Click the purple code icon (📋) to copy shortcode
4. Example: `[cta_banner id="1"]`

### Step 5: Embed in Page
1. Go to any page editor: `http://localhost:5174/admin/pages`
2. Paste the shortcode in the content area
3. Save the page

### Step 6: Test Frontend Display
1. Navigate to the page where you embedded the banner
2. You should see the CTA banner displayed
3. Click the CTA button
4. **Expected**: Form modal should open with the selected form
5. Fill out and submit the form
6. **Expected**: Modal should close automatically 2 seconds after submission

## Feature Architecture

### Event Flow
```
CTABannerEmbed (Click) 
  → Dispatch 'openFormModal' event with formId
    → CTAFormModal (Global Listener)
      → Opens modal with FormEmbed component
        → User submits form
          → onSuccess callback triggered
            → Modal closes after 2 seconds
```

### Key Components

#### 1. CTABannerForm.jsx (Admin)
- FormSelector component fetches available forms
- Handles API response format: `response.data.forms || response.data`
- Shows "Button Action" dropdown with 3 options:
  - No Action (default to /contact)
  - Open Form in Modal ✨
  - Navigate to URL

#### 2. CTABannerEmbed.jsx (Frontend)
- Renders banner from database
- Handles click with priority: `form_id > button_url > default`
- Dispatches custom event: `new CustomEvent('openFormModal', { detail: { formId } })`
- Tracks views and clicks

#### 3. CTAFormModal.jsx (Global)
- Listens for 'openFormModal' event
- Opens modal with FormEmbed
- Passes onSuccess callback
- Auto-closes after 2 seconds on success

#### 4. FormEmbed.jsx
- Renders form fields dynamically
- Validates input
- Submits to `/api/forms/:formId/submit`
- Calls onSuccess callback on successful submission

#### 5. PublicLayout.jsx
- Includes CTAFormModal globally
- Ensures event listener is active on all public pages

### Database Schema

```sql
ALTER TABLE cta_banners 
ADD COLUMN form_id INT NULL,
ADD FOREIGN KEY (form_id) REFERENCES forms(id) 
ON DELETE SET NULL ON UPDATE CASCADE;
```

### API Endpoints

**Forms API**:
- `GET /api/forms` - Get all forms (requires auth)
- `GET /api/forms/:id` - Get single form (requires auth)
- `POST /api/forms/:formId/submit` - Submit form (public)

**CTA Banners API**:
- `GET /api/cta-banners/:id/embed` - Get banner for embed (public)
- `POST /api/cta-banners` - Create banner (requires auth)
- `PUT /api/cta-banners/:id` - Update banner (requires auth)

## Troubleshooting

### Issue: Form selector shows "Loading forms..."
**Solution**: Check if user is authenticated and token is valid

### Issue: Form selector shows "No forms available"
**Solution**: Create a form first at `/admin/forms/new`

### Issue: Modal doesn't open when clicking CTA button
**Check**:
1. Browser console for errors
2. Verify form_id is saved in database
3. Check if CTAFormModal is rendered in PublicLayout
4. Verify event is dispatching: Add `console.log` in CTABannerEmbed handleClick

### Issue: Modal opens but form doesn't load
**Check**:
1. Form exists in database
2. Form status is "active"
3. API endpoint `/api/forms/:id` is accessible
4. Check browser network tab for 404 errors

### Issue: Form submits but modal doesn't close
**Check**:
1. FormEmbed has onSuccess prop
2. CTAFormModal handleSuccess function is working
3. Check console for errors

## Files Modified

### Backend
- `backend/models/CTABanner.js` - Added form_id field
- `backend/migrations/009-add-form-id-to-cta-banners.js` - Migration file
- `backend/run-cta-migration.js` - Migration runner

### Frontend
- `frontend/src/components/CTABannerEmbed.jsx` - Added form modal dispatch, fixed colors
- `frontend/src/components/CTAFormModal.jsx` - NEW - Global form modal
- `frontend/src/components/FormEmbed.jsx` - Added onSuccess callback
- `frontend/src/pages/admin/CTABannerForm.jsx` - Added FormSelector, buttonAction dropdown
- `frontend/src/layouts/PublicLayout.jsx` - Added CTAFormModal

## Success Criteria

✅ Admin can select a form when creating CTA banner  
✅ Form selector shows all available forms  
✅ CTA banner saves form_id to database  
✅ Shortcode can be embedded in pages  
✅ Clicking CTA button opens form in modal  
✅ Form fields render correctly  
✅ Form submission works  
✅ Modal closes automatically after submission  
✅ Multiple CTA banners can have different forms  
✅ Analytics tracking works (views, clicks)  

## Next Steps

1. Test with different form types (contact, lead gen, survey)
2. Test with different CTA banner variants
3. Test on different pages (homepage, blog, services)
4. Test with different form field types
5. Verify email notifications work (if configured)
6. Test form validation errors
7. Test mobile responsiveness
8. Load test with multiple concurrent users

## Notes

- CSS errors in index.css are expected (Tailwind directives)
- Email service errors are non-blocking (only affects email sending)
- Frontend runs on port 5174 (5173 was in use)
- Backend runs on port 5000
- Database: harsh_ranjan_website (MySQL)
