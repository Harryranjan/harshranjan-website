# Modal System - Testing Checklist

## ✅ Testing Guide

### Prerequisites

1. ✅ Backend server running on http://localhost:5000
2. ✅ Frontend server running on http://localhost:5173
3. ✅ Database connected
4. ✅ Authenticated as admin user

---

## 🧪 Test Cases

### 1. **CRUD Operations**

#### Create Modal (POST /api/modals)

**Test Steps:**

1. Navigate to `/admin/forms/modals`
2. Click "Create Modal" button
3. Fill in the form:
   - Name: "Test Welcome Modal"
   - Type: "announcement"
   - Title: "Welcome to Our Site!"
   - Content: "Thanks for visiting. Check out our latest offers."
   - CTA Text: "View Offers"
   - CTA Link: "/offers"
   - Status: "active"
4. Click "Create Modal"

**Expected Result:**

- ✅ Success modal appears: "Modal created successfully! Redirecting to edit mode..."
- ✅ Toast notification shows success message
- ✅ Redirects to edit page after 2 seconds
- ✅ URL changes to `/admin/forms/modals/:id/edit`
- ✅ Form is populated with saved data

**API Call:**

```javascript
POST http://localhost:5000/api/modals
Body: {
  name: "Test Welcome Modal",
  title: "Welcome to Our Site!",
  content: "Thanks for visiting. Check out our latest offers.",
  type: "announcement",
  trigger_type: "manual",
  status: "active",
  cta_text: "View Offers",
  cta_link: "/offers",
  // ... other fields
}
```

---

#### Read Modal (GET /api/modals/:id)

**Test Steps:**

1. Navigate to `/admin/forms/modals/:id/edit` (from previous test)
2. Page should load with existing modal data

**Expected Result:**

- ✅ Loading spinner appears briefly
- ✅ Form fields populate with saved data
- ✅ All sections show correct values:
  - Basic Settings
  - Trigger Settings
  - Content
  - Styling
  - Display Rules

**API Call:**

```javascript
GET http://localhost:5000/api/modals/:id
```

---

#### Update Modal (PUT /api/modals/:id)

**Test Steps:**

1. On edit page, modify some fields:
   - Change Title to "Welcome Back!"
   - Change CTA Text to "Get Started"
   - Change Background Color to #f0f9ff (light blue)
2. Click "Update Modal"

**Expected Result:**

- ✅ Success modal appears: "Modal updated successfully!"
- ✅ Toast notification shows success
- ✅ Modal closes after 2 seconds
- ✅ Changes persist on page refresh

**API Call:**

```javascript
PUT http://localhost:5000/api/modals/:id
Body: { ...updated fields }
```

---

#### Delete Modal (DELETE /api/modals/:id)

**Test Steps:**

1. Navigate to `/admin/forms/modals`
2. Find a modal in the list
3. Click delete button (trash icon)
4. Confirm deletion in dialog

**Expected Result:**

- ✅ Confirmation dialog appears
- ✅ After confirming, modal is deleted
- ✅ Success toast appears
- ✅ List refreshes without deleted modal
- ✅ Stats update (total count decreases)

**API Call:**

```javascript
DELETE http://localhost:5000/api/modals/:id
```

---

#### List Modals (GET /api/modals)

**Test Steps:**

1. Navigate to `/admin/forms/modals`
2. View the modal list

**Expected Result:**

- ✅ All modals display in table
- ✅ Columns show: Name, Type, Status, Performance, Last Updated
- ✅ Actions available: Edit, Activate/Deactivate, Embed Code, Delete
- ✅ Pagination works if more than 20 modals
- ✅ Statistics cards show correct numbers

**API Call:**

```javascript
GET http://localhost:5000/api/modals?page=1&limit=20
```

---

### 2. **Success Modal Display**

#### After Creating Modal

**Test Steps:**

1. Create a new modal
2. Click "Create Modal"

**Expected Result:**

- ✅ Success modal appears immediately
- ✅ Title: "Success!"
- ✅ Message: "Modal created successfully! Redirecting to edit mode..."
- ✅ Modal has green checkmark icon
- ✅ Auto-closes after 2 seconds
- ✅ Redirects to edit page

#### After Updating Modal

**Test Steps:**

1. Edit existing modal
2. Click "Update Modal"

**Expected Result:**

- ✅ Success modal appears immediately
- ✅ Title: "Success!"
- ✅ Message: "Modal updated successfully!"
- ✅ Modal has green checkmark icon
- ✅ Auto-closes after 2 seconds
- ✅ Stays on edit page (no redirect)

---

### 3. **Modal Position Testing**

#### Center Position

**Test Steps:**

1. In modal builder, set Position to "center"
2. Click "Preview" button

**Expected Result:**

- ✅ Preview window opens full screen
- ✅ Modal appears centered vertically and horizontally
- ✅ Background overlay is visible (if enabled)
- ✅ Modal stays centered when resizing browser

#### Top Position

**Test Steps:**

1. Set Position to "top"
2. Click "Preview"

**Expected Result:**

- ✅ Modal appears at top of screen
- ✅ Has padding from top edge (pt-20)
- ✅ Centered horizontally
- ✅ Scrolls with page if content is tall

#### Bottom Position

**Test Steps:**

1. Set Position to "bottom"
2. Click "Preview"

**Expected Result:**

- ✅ Modal appears at bottom of screen
- ✅ Has padding from bottom edge (pb-20)
- ✅ Centered horizontally
- ✅ Fixed at bottom even when scrolling

---

### 4. **Live Preview - Real-time Updates**

#### Title Updates

**Test Steps:**

1. Click "Preview" button
2. Keep preview open
3. Change title in the form

**Expected Result:**

- ✅ Preview updates immediately as you type
- ✅ New title shows in preview modal
- ✅ No need to close and reopen preview

#### Content Updates

**Test Steps:**

1. In preview mode
2. Change content text in rich text editor

**Expected Result:**

- ✅ Content updates in real-time
- ✅ HTML formatting is preserved
- ✅ Shows exactly as it will appear

#### Styling Updates

**Test Steps:**

1. In preview mode
2. Change:
   - Background color → ✅ Updates immediately
   - Text color → ✅ Updates immediately
   - Border radius → ✅ Updates immediately
   - Size (small/medium/large) → ✅ Updates immediately
   - Position (center/top/bottom) → ✅ Updates immediately

**Expected Result:**

- ✅ All style changes reflect instantly
- ✅ Modal repositions correctly
- ✅ Colors apply to all text/background
- ✅ Border radius smoothly adjusts

#### CTA Button Updates

**Test Steps:**

1. In preview mode
2. Change CTA text

**Expected Result:**

- ✅ Button text updates immediately
- ✅ Button appears/disappears when text added/removed
- ✅ Button styling follows modal text color (inverted)

#### Form Embedding

**Test Steps:**

1. In preview mode
2. Select a form from dropdown

**Expected Result:**

- ✅ Placeholder appears showing form will be embedded
- ✅ Shows form ID
- ✅ Removes placeholder when form unselected

---

### 5. **Preview Window Features**

#### Header Information

**Test Steps:**

1. Open preview with different settings

**Expected Result:**

- ✅ Shows "Live Preview" title
- ✅ Displays position setting
- ✅ Displays size setting
- ✅ Displays trigger type
- ✅ "Close Preview" button works

#### Mock Page Content

**Test Steps:**

1. Preview modal with different positions

**Expected Result:**

- ✅ Shows sample page content behind modal
- ✅ Demonstrates how modal overlays page
- ✅ Scrollable if content is long

#### Overlay Effects

**Test Steps:**

1. Toggle overlay on/off in styling
2. Change overlay color

**Expected Result:**

- ✅ Overlay appears/disappears
- ✅ Overlay color changes immediately
- ✅ Can see through semi-transparent overlay

---

### 6. **Size Variations**

#### Small Modal (400px)

**Test Steps:**

1. Set size to "small"
2. Preview modal

**Expected Result:**

- ✅ Modal is narrow (400px max)
- ✅ Content fits appropriately
- ✅ Responsive on mobile

#### Medium Modal (600px)

**Test Steps:**

1. Set size to "medium"
2. Preview modal

**Expected Result:**

- ✅ Modal is medium width (600px)
- ✅ Good for most use cases

#### Large Modal (800px)

**Test Steps:**

1. Set size to "large"
2. Preview modal

**Expected Result:**

- ✅ Modal is wide (800px)
- ✅ Good for content-heavy modals

#### Full Width

**Test Steps:**

1. Set size to "full"
2. Preview modal

**Expected Result:**

- ✅ Modal takes 90% of screen width
- ✅ Responsive on all devices

---

### 7. **Color Customization**

#### Background Color

**Test Steps:**

1. Click background color picker
2. Choose different colors:
   - White (#ffffff)
   - Light blue (#f0f9ff)
   - Dark (#1f2937)

**Expected Result:**

- ✅ Color picker opens
- ✅ Preview updates immediately
- ✅ Color persists after save

#### Text Color

**Test Steps:**

1. Click text color picker
2. Choose contrasting colors

**Expected Result:**

- ✅ All text changes color
- ✅ Title, content, and body text affected
- ✅ Maintains readability

#### Overlay Color

**Test Steps:**

1. Change overlay color with RGBA value

**Expected Result:**

- ✅ Background overlay color changes
- ✅ Transparency preserved
- ✅ Can see page content through overlay

---

### 8. **Validation**

#### Required Fields

**Test Steps:**

1. Try to save without modal name
2. Click "Create Modal"

**Expected Result:**

- ✅ Error toast appears: "Modal name is required"
- ✅ Form doesn't submit
- ✅ Focus stays on page

#### Trigger Value Validation

**Test Steps:**

1. Set trigger type to "time"
2. Enter invalid value (e.g., "abc")
3. Save

**Expected Result:**

- ✅ Accepts only numbers
- ✅ Saves correctly with valid value

---

### 9. **Navigation**

#### Back Button

**Test Steps:**

1. Click "Back to Forms" button

**Expected Result:**

- ✅ Navigates to `/admin/forms`
- ✅ Doesn't save changes
- ✅ No confirmation needed if no changes

#### Cancel Button

**Test Steps:**

1. Make changes to form
2. Click "Cancel"

**Expected Result:**

- ✅ Navigates to `/admin/forms`
- ✅ Changes are not saved

---

## 🐛 Common Issues & Solutions

### Issue: Success modal doesn't show

**Solution:**

- Check that `showSuccessModal` state is set to true
- Verify Modal component is imported correctly
- Check console for errors

### Issue: Preview doesn't update in real-time

**Solution:**

- Verify modalData state is being used in preview
- Check that preview component isn't memoized
- Ensure no key prop causing remount

### Issue: Position doesn't work correctly

**Solution:**

- Verify Tailwind classes are loaded
- Check that position value matches: "center", "top", or "bottom"
- Ensure flexbox classes are applied

### Issue: Colors don't apply

**Solution:**

- Check that inline styles are being applied
- Verify color values are valid hex/rgba
- Ensure no CSS conflicts

### Issue: Modal doesn't save

**Solution:**

- Check network tab for API errors
- Verify backend server is running
- Check authentication token is valid
- Review backend logs for errors

---

## 📊 Expected Behavior Summary

✅ **Create Operation:**

- Form submits → Success modal → Toast → Redirect to edit

✅ **Read Operation:**

- Page loads → Spinner → Data populates → Ready to edit

✅ **Update Operation:**

- Form submits → Success modal → Toast → Stay on page

✅ **Delete Operation:**

- Click delete → Confirm dialog → Delete → Toast → List refreshes

✅ **Preview:**

- Opens full screen → Shows live updates → Position correct → Styles apply

✅ **Success Modal:**

- Appears on create/update → Auto-closes in 2s → Proper messaging

---

## 🚀 Performance Checks

- ✅ Preview opens instantly
- ✅ Real-time updates have no lag
- ✅ Save operation completes in < 1 second
- ✅ List page loads in < 500ms
- ✅ No memory leaks when opening/closing preview

---

**Test Date:** November 20, 2025  
**Version:** 1.0  
**Status:** Ready for Testing
