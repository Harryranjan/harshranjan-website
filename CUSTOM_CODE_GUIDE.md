# Custom Code Feature - Advanced Landing Page Builder

## 🎨 Overview

The Custom Code feature allows you to add **fully customized sections** to your landing pages using HTML, CSS, and JavaScript with **real-time live preview**.

## ✨ Key Features

### **1. Two Custom Code Section Types**

#### A) **Custom HTML Section** 💻

- HTML + CSS support
- Perfect for simple custom layouts
- Lightweight and fast

#### B) **Custom Code Section** 📝

- HTML + CSS + JavaScript
- Full interactivity support
- Advanced functionality

### **2. Dual Editing Modes**

#### **Inline Editor** (Right Sidebar)

- Quick edits
- Side-by-side with preview
- Syntax highlighting
- Live preview toggle

#### **Full-Screen Code Editor** (Modal)

- Split-screen view
- Larger editing area
- Tab switching (HTML/CSS/JS)
- Real-time preview panel
- Professional development experience

### **3. Live Preview System**

- ✅ See changes instantly
- ✅ Real-time rendering
- ✅ Responsive preview modes
- ✅ Toggle on/off as needed

### **4. Pre-Built Templates**

Quick-insert code snippets:

- 📝 Basic Section Template
- ⭐ 3-Column Feature Grid
- ⏰ Coming Soon Section
- 🎥 Video Background Hero

## 🚀 How to Use

### Adding a Custom Code Section

1. **Open Landing Page Builder**

   ```
   Admin → Landing Pages → Create/Edit Landing Page
   ```

2. **Add Custom Section**

   - Click "Sections" tab in left panel
   - Scroll to find:
     - **💻 Custom HTML** - For HTML+CSS only
     - **📝 Custom Code** - For HTML+CSS+JS

3. **Select Section Type**
   - Click on your preferred type
   - Section appears in canvas

### Editing Code

#### **Method 1: Quick Edit (Right Sidebar)**

1. Click the custom code section in canvas
2. Right sidebar appears with code editors
3. Toggle "Live Preview" checkbox
4. Edit HTML, CSS, and JS in textareas
5. See changes update in real-time

#### **Method 2: Full-Screen Editor (Recommended)**

1. Click the custom code section
2. Click **"Open Full-Screen Code Editor"** button
3. Use tab switcher to edit HTML/CSS/JS
4. Toggle "Live Preview" to see output
5. Click "Done" when finished

### Using Pre-Built Templates

1. Select your custom code section
2. In right sidebar, find "Quick Insert Templates"
3. Click any template button:
   - **Basic Section Template**: Standard container layout
   - **3-Column Feature Grid**: Feature showcase
   - **Coming Soon Section**: Gradient hero with CTA
   - **Video Background Hero**: Full-screen video section
4. Template code auto-fills
5. Customize as needed

## 💻 Code Examples

### Example 1: Animated Gradient Section

**HTML:**

```html
<div class="gradient-section">
  <div class="content">
    <h2 class="animated-title">Amazing Features</h2>
    <p class="subtitle">Built for modern web</p>
    <button class="cta-button">Get Started</button>
  </div>
</div>
```

**CSS:**

```css
.gradient-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 100px 20px;
  text-align: center;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.animated-title {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease-out;
}

.subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

.cta-button {
  background: white;
  color: #667eea;
  padding: 15px 40px;
  border-radius: 50px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.cta-button:hover {
  transform: scale(1.05);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Example 2: Interactive Card Hover Effect

**HTML:**

```html
<div class="cards-container">
  <div class="hover-card">
    <div class="icon">🚀</div>
    <h3>Fast Performance</h3>
    <p>Lightning-fast load times</p>
  </div>
  <div class="hover-card">
    <div class="icon">🔒</div>
    <h3>Secure</h3>
    <p>Bank-level security</p>
  </div>
  <div class="hover-card">
    <div class="icon">💎</div>
    <h3>Premium</h3>
    <p>Professional quality</p>
  </div>
</div>
```

**CSS:**

```css
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hover-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hover-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.hover-card h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.hover-card p {
  color: #666;
}
```

### Example 3: Countdown Timer with JavaScript

**HTML:**

```html
<div class="countdown-container">
  <h2>Limited Time Offer</h2>
  <div class="countdown">
    <div class="time-box">
      <span id="days">00</span>
      <span class="label">Days</span>
    </div>
    <div class="time-box">
      <span id="hours">00</span>
      <span class="label">Hours</span>
    </div>
    <div class="time-box">
      <span id="minutes">00</span>
      <span class="label">Minutes</span>
    </div>
    <div class="time-box">
      <span id="seconds">00</span>
      <span class="label">Seconds</span>
    </div>
  </div>
</div>
```

**CSS:**

```css
.countdown-container {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding: 4rem 2rem;
  text-align: center;
}

.countdown-container h2 {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.countdown {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.time-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  min-width: 120px;
}

.time-box span {
  display: block;
  font-size: 3rem;
  font-weight: bold;
  color: #f5576c;
}

.time-box .label {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}
```

**JavaScript:**

```javascript
// Set countdown date (7 days from now)
const countdownDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString().padStart(2, "0");
  document.getElementById("hours").innerText = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerText = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerText = seconds
    .toString()
    .padStart(2, "0");

  if (distance < 0) {
    clearInterval(timer);
    document.querySelector(".countdown").innerHTML = "<h3>Offer Ended!</h3>";
  }
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();
```

### Example 4: Parallax Scroll Effect

**HTML:**

```html
<div class="parallax-section">
  <div class="parallax-bg"></div>
  <div class="parallax-content">
    <h2>Scroll to Experience</h2>
    <p>Beautiful parallax effect</p>
  </div>
</div>
```

**CSS:**

```css
.parallax-section {
  position: relative;
  height: 600px;
  overflow: hidden;
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background: url("https://images.unsplash.com/photo-1557683316-973673baf926");
  background-size: cover;
  background-position: center;
  transition: transform 0.1s ease-out;
}

.parallax-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  text-align: center;
}

.parallax-content h2 {
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}
```

**JavaScript:**

```javascript
window.addEventListener("scroll", function () {
  const parallaxBg = document.querySelector(".parallax-bg");
  const scrolled = window.pageYOffset;
  const rate = scrolled * 0.5;
  parallaxBg.style.transform = `translateY(${rate}px)`;
});
```

## 🎨 Best Practices

### **Performance**

1. ✅ Minify CSS for production
2. ✅ Optimize images before use
3. ✅ Use efficient JavaScript
4. ✅ Test on different devices
5. ✅ Avoid heavy animations

### **Security**

1. ⚠️ Sanitize user inputs in JavaScript
2. ⚠️ Don't include sensitive data
3. ⚠️ Be cautious with third-party scripts
4. ⚠️ Use HTTPS for external resources
5. ⚠️ Validate all form data

### **Styling**

1. 🎨 Use Tailwind CSS classes when possible
2. 🎨 Keep custom CSS organized
3. 🎨 Use CSS variables for colors
4. 🎨 Mobile-first responsive design
5. 🎨 Test in all preview modes

### **JavaScript**

1. 💻 Use vanilla JS or lightweight libraries
2. 💻 Avoid global variable pollution
3. 💻 Clean up event listeners
4. 💻 Handle errors gracefully
5. 💻 Test before publishing

## 🔧 Advanced Techniques

### **1. Integrating Third-Party Libraries**

```html
<!-- In HTML section -->
<div id="chart"></div>

<!-- Include library (if allowed) -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

```javascript
// In JavaScript section
const ctx = document.getElementById("chart");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3],
      },
    ],
  },
});
```

### **2. API Integration**

```javascript
// Fetch data from API
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("result").innerHTML = data.message;
  })
  .catch((error) => console.error("Error:", error));
```

### **3. Local Storage Usage**

```javascript
// Save data
localStorage.setItem("userPreference", "dark");

// Retrieve data
const preference = localStorage.getItem("userPreference");

// Apply preference
if (preference === "dark") {
  document.body.classList.add("dark-mode");
}
```

## 📱 Responsive Design Examples

### Mobile-First Grid

```css
/* Mobile first (default) */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
}
```

## 🐛 Troubleshooting

### **CSS Not Applying**

- Check for typos in class names
- Ensure no conflicting global styles
- Use more specific selectors if needed
- Clear browser cache

### **JavaScript Not Working**

- Check browser console for errors
- Ensure all IDs/classes match
- Verify script syntax
- Test in different browsers

### **Preview Not Updating**

- Toggle "Live Preview" off and on
- Save the page and refresh
- Check for JavaScript errors
- Try full-screen editor

### **Styling Conflicts**

- Use unique class names
- Scope CSS with parent selectors
- Avoid `!important` when possible
- Use CSS specificity correctly

## 🎯 Use Cases

### **1. Product Showcases**

- Interactive product galleries
- 360° product views
- Video demonstrations
- Comparison tables

### **2. Data Visualizations**

- Charts and graphs
- Progress indicators
- Statistics dashboards
- Animated counters

### **3. Interactive Forms**

- Multi-step forms
- Conditional fields
- Real-time validation
- File upload previews

### **4. Marketing Elements**

- Countdown timers
- Social proof widgets
- Live chat integration
- Email signup forms

### **5. Special Effects**

- Parallax scrolling
- Scroll animations
- Hover effects
- Particle backgrounds

## 📚 Resources

### **Helpful Libraries**

- **Tailwind CSS**: Utility-first CSS framework
- **AOS**: Animate on scroll library
- **Chart.js**: Simple yet flexible charting
- **Swiper**: Modern mobile touch slider
- **Particles.js**: Lightweight particle animation

### **Code References**

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [CodePen](https://codepen.io/) - Find inspiration
- [Can I Use](https://caniuse.com/) - Browser support

---

**Version**: 2.0.0 with Custom Code  
**Last Updated**: November 22, 2025  
**Status**: ✅ Fully Functional  
**Features**: HTML + CSS + JS with Live Preview
