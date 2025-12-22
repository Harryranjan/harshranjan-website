# 🧪 Language System Testing Guide

## Quick Test Steps

### 1. View the Healthcare Demo Page

```
Visit: http://localhost:5174/healthcare
```

- You should see the healthcare page in English (default)
- Use the language switcher (🇬🇧 flag) in the navigation to switch to Gujarati
- All content should instantly translate

### 2. Test Language Switcher

1. Click the **flag icon** in the top navigation
2. A dropdown should appear with:
   - 🇬🇧 **English**
   - 🇮🇳 **ગુજરાતી (Gujarati)**
3. Select Gujarati
4. **Result**: Page content switches to Gujarati
5. Refresh page → Language should persist

### 3. Test Location-Based Popup

#### Reset and Trigger Popup:

**Open browser console and run:**

```javascript
// Clear all language settings
localStorage.clear();
sessionStorage.clear();

// Reload the page
location.reload();
```

#### Mock Vadodara Location (Optional):

If you want to test without being in Vadodara:

1. Open **Chrome DevTools** → **⋮ (More tools)** → **Sensors**
2. Select **Location** → **Other**
3. Enter coordinates:
   - **Latitude**: 22.3072
   - **Longitude**: 73.1812
4. Refresh page
5. You should see the language popup!

### 4. Test Popup Features

When popup appears, test:

- ✅ **"Switch to Gujarati"** button → Changes to Gujarati
- ✅ **"Continue in English"** button → Stays in English
- ✅ **"Remember my choice"** checkbox → Prevents popup on next visit
- ✅ **Close (X) button** → Closes without selection
- ✅ **Click backdrop** → Closes popup

### 5. Test Different Scenarios

#### Scenario A: First Visit from Vadodara

```javascript
// Clear everything
localStorage.clear();
sessionStorage.clear();

// Mock Vadodara location (see step 3)
// Reload page
// Expected: Popup appears suggesting Gujarati
```

#### Scenario B: Returning User (Gujarati Preference)

```javascript
// User previously selected Gujarati
localStorage.setItem("userLanguage", "gu");
// Reload page
// Expected: Page loads in Gujarati, no popup
```

#### Scenario C: User from Outside Vadodara

```javascript
// Clear settings
localStorage.clear();
sessionStorage.clear();

// Use actual location or mock different city
// Expected: No popup, default English
```

## 📋 What to Check

### ✅ Checklist

- [ ] Language switcher appears in navigation
- [ ] Flag icons display correctly (🇬🇧 🇮🇳)
- [ ] Dropdown shows both language options
- [ ] Clicking language changes content
- [ ] Current language is highlighted in dropdown
- [ ] Language preference persists after refresh
- [ ] Popup appears for Vadodara location
- [ ] Popup has smooth animation
- [ ] "Remember choice" checkbox works
- [ ] All healthcare content translates correctly
- [ ] No console errors

## 🔍 Debugging

### Check Language Status

```javascript
// In browser console
console.log("Current language:", localStorage.getItem("userLanguage"));
console.log("Popup shown:", localStorage.getItem("languagePopupShown"));
console.log("i18n language:", i18next.language);
```

### Force Show Popup

```javascript
localStorage.removeItem("languagePopupShown");
sessionStorage.removeItem("languagePopupShown");
localStorage.removeItem("userLanguage");
location.reload();
```

### Test Location Detection Directly

```javascript
// In browser console
import { isUserFromVadodara } from "./utils/locationDetector";

// This won't work in console, but you can add to a component:
const testLocation = async () => {
  const result = await isUserFromVadodara();
  console.log("Location data:", result);
};
```

## 🎯 Expected Behavior

### Healthcare Page (/healthcare)

**English Version:**

- Title: "Pain Therapy & Rehab Centre"
- Service 1: "Spine & Back Pain Therapy"
- CTA: "Book Appointment Now"

**Gujarati Version:**

- Title: "પેઇન થેરાપી એન્ડ રીહેબ સેન્ટર"
- Service 1: "કરોડરજ્જુ અને પીઠનો દુખાવો ઉપચાર"
- CTA: "હવે અપોઇન્ટમેન્ટ બુક કરો"

## 🐛 Common Issues

### Issue: Popup doesn't appear

**Solution:**

1. Clear localStorage/sessionStorage
2. Check browser console for location errors
3. Verify you're testing with Vadodara coordinates

### Issue: Translations not working

**Solution:**

1. Check browser console for errors
2. Verify translation files exist in `frontend/src/i18n/locales/`
3. Ensure component uses `useTranslation()` hook

### Issue: Language doesn't persist

**Solution:**

1. Check browser allows localStorage
2. Clear cache and test again
3. Check if incognito/private mode is interfering

### Issue: Language switcher not visible

**Solution:**

1. Check Header.jsx has LanguageSwitcher component
2. Verify CSS is loading
3. Check responsive breakpoints (only shows on desktop by default)

## 📸 Visual Testing

### Desktop

- Language switcher in top-right of navigation
- Popup centered on screen
- Smooth animations

### Mobile

- Language switcher might be in mobile menu
- Popup fills most of screen width
- Touch-friendly buttons

## ✨ Success Criteria

✅ **Feature is working if:**

1. Can manually switch languages using flag dropdown
2. Selected language persists across page refreshes
3. Vadodara users see popup on first visit
4. Popup respects "remember choice" preference
5. All translated content displays correctly
6. No JavaScript errors in console

## 🎉 Test Complete!

If all tests pass, your multi-language system is fully functional! 🚀

---

**Need help?** Check LANGUAGE_SYSTEM_README.md for detailed documentation.
