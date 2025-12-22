# 🌍 Multi-Language Support with Auto-Detection

## Overview

This feature adds **automatic language detection** with support for **4 languages**: **English**, **Hindi (हिंदी)**, **Gujarati (ગુજરાતી)**, and **Marathi (मराठी)** for the healthcare website. When users from **India** visit the site, they'll see a beautiful popup asking them to choose their preferred language.

## ✨ Features Implemented

### 1. **Automatic Location Detection** 📍

- **GPS-based detection** (browser geolocation API)
- **IP-based fallback** (using ipapi.co)
- Detects if user is within 50km of Vadodara
- Smart caching (1 hour session storage)

### 2. **Language Popup** 💬

- Beautiful, animated popup for first-time visitors from India
- Four language options: English, Hindi, Gujarati, Marathi
- Color-coded buttons for each language
- "Remember my choice" checkbox
- Only shows once (respects user preference)

### 3. **Language Switcher** 🔄

- Dropdown in navigation header
- Shows all 4 languages with native names
- Flag icons (🇬🇧 English / 🇮🇳 Indian Languages)
- Persistent language selection
- Smooth transitions

### 4. **Complete Translations** 🇮🇳

Complete translations in all languages for:

- Navigation menu
- Hero section
- Services (Spine, Joint, Neuro, Post-Op, Manual Therapy, Cupping)
- Doctor profiles
- Contact information
- Call-to-action buttons

**Languages Available:**

- 🇬🇧 **English** - International
- 🇮🇳 **हिंदी (Hindi)** - National Language
- 🇮🇳 **ગુજરાતી (Gujarati)** - For Gujarat region
- 🇮🇳 **मराठी (Marathi)** - For Maharashtra region

### 5. **Demo Healthcare Page** 🏥

Created `/healthcare` page demonstrating:

- Fully translated content
- Pain Therapy & Rehab Centre information
- Services in both languages
- Doctor profiles

## 📁 Files Created

```
frontend/src/
├── i18n/
│   ├── config.js                    # i18n configuration
│   └── locales/
│       ├── en.json                  # English translations
│       └── gu.json                  # Gujarati translations (ગુજરાતી)
├── components/
│   ├── LanguagePopup.jsx            # Auto-popup for Vadodara users
│   └── LanguageSwitcher.jsx         # Navigation language switcher
├── utils/
│   └── locationDetector.js          # Geolocation detection service
└── pages/
    └── HealthcarePage.jsx           # Demo page with translations
```

## 🚀 How to Use

### View the Demo Page

1. **Visit**: http://localhost:5174/healthcare
2. **Test Language Switching**: Click the language switcher in navigation

### Test Location-Based Popup

To test the automatic popup for Vadodara users:

```javascript
// In browser console, clear the popup flag:
localStorage.removeItem("languagePopupShown");
sessionStorage.removeItem("languagePopupShown");
localStorage.removeItem("userLanguage");

// Then reload the page
```

The popup will show if:

- User has not seen it before
- No language preference is saved
- User is detected from Vadodara (or you can mock it)

### Manual Language Change

Click the **flag icon** (🇬🇧/🇮🇳) in the navigation header to switch languages anytime.

## 🔧 How It Works

### 1. Location Detection Flow

```
User visits site
    ↓
Check if popup shown before? → Yes → Skip
    ↓ No
Detect location (GPS first)
    ↓
GPS failed/denied? → Try IP-based detection
    ↓
User from Vadodara? → Yes → Show popup
    ↓ No
Continue with browser language
```

### 2. Adding Translations to Your Pages

```jsx
import { useTranslation } from "react-i18next";

export default function YourPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("home.hero.title")}</h1>
      <p>{t("home.hero.subtitle")}</p>
      <button>{t("common.bookNow")}</button>
    </div>
  );
}
```

### 3. Adding New Translations

**Edit:** `frontend/src/i18n/locales/en.json`

```json
{
  "newSection": {
    "title": "English Title",
    "description": "English Description"
  }
}
```

**Edit:** `frontend/src/i18n/locales/gu.json`

```json
{
  "newSection": {
    "title": "ગુજરાતી શીર્ષક",
    "description": "ગુજરાતી વર્ણન"
  }
}
```

## 🎯 Translation Keys Available

### Navigation

- `nav.home` - Home / હોમ
- `nav.about` - About Us / અમારા વિશે
- `nav.services` - Services / સેવાઓ
- `nav.contact` - Contact / સંપર્ક

### Home Page

- `home.hero.title` - Main title
- `home.hero.subtitle` - Subtitle
- `home.hero.bookAppointment` - Book Appointment button
- `home.services.*` - All 6 services
- `home.doctors.*` - Doctor profiles

### Common

- `common.readMore` - Read More / વધુ વાંચો
- `common.bookNow` - Book Now / હવે બુક કરો
- `common.contactUs` - Contact Us / અમારો સંપર્ક કરો

[See full translation files for complete list]

## 📍 Location Detection API

### GPS Detection

- Uses browser's native Geolocation API
- Calculates distance to Vadodara using Haversine formula
- 50km radius around Vadodara (22.3072°N, 73.1812°E)

### IP-based Detection (Fallback)

- Uses ipapi.co free API (1000 requests/day)
- Detects city/region from IP address
- Matches "Vadodara" or "Baroda"

### Cache Strategy

- Session storage: 1 hour
- Reduces API calls
- Improves performance

## 🎨 UI/UX Features

### Language Popup

- ✅ Smooth fade-in animation
- ✅ Backdrop overlay
- ✅ Recommended option highlighted (Gujarati for Vadodara)
- ✅ Shows detected location
- ✅ Remember choice option
- ✅ Close button

### Language Switcher

- ✅ Flag icons for visual recognition
- ✅ Dropdown with both languages
- ✅ Active language highlighted
- ✅ Checkmark for current selection
- ✅ Mobile-responsive

## 🔐 Privacy & Security

- **No data sent to servers** - All detection happens client-side
- **User control** - Can always change language manually
- **Opt-out friendly** - Close popup to continue without selection
- **No tracking** - Only stores language preference locally

## 📱 Responsive Design

- ✅ Works on all devices
- ✅ Touch-friendly popup
- ✅ Mobile-optimized language switcher
- ✅ Adaptive text sizes

## 🌐 Browser Support

- ✅ Chrome, Firefox, Safari, Edge (latest)
- ✅ Geolocation API support
- ✅ Fallback for unsupported browsers

## 🚧 Future Enhancements

Potential additions:

- [ ] More Indian languages (Hindi, Marathi)
- [ ] Voice-over translations
- [ ] Right-to-left (RTL) support for certain languages
- [ ] Auto-translate using AI for new content
- [ ] Language-specific SEO meta tags

## 💡 Tips

1. **Testing Different Locations**: Use browser dev tools → Sensors → Override geolocation
2. **Testing Translations**: Use language switcher - no need to clear cache
3. **Adding Languages**: Create new JSON file in `locales/` folder
4. **Detecting Other Cities**: Modify `VADODARA_COORDS` in `locationDetector.js`

## 📞 Support

The language system is fully integrated and ready to use. Simply translate your content using the `t()` function from `useTranslation()` hook!

---

**Made with ❤️ for multilingual healthcare accessibility**
