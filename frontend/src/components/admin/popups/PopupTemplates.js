// Pre-built Popup Templates
export const POPUP_TEMPLATES = {
  notification: {
    name: "Simple Notification",
    type: "notification",
    icon: "🔔",
    title: "New Update Available!",
    content: "Check out our latest features and improvements.",
    styling: {
      position: "bottom-right",
      size: "small",
      backgroundColor: "#3b82f6",
      textColor: "#ffffff",
      borderRadius: "12",
      shadow: true,
      animation: "slideIn",
      autoClose: true,
      autoCloseDelay: 5,
    },
    cta_text: "Learn More",
    cta_link: "#",
  },
  
  chat: {
    name: "Chat Widget",
    type: "chat",
    icon: "💬",
    title: "Need Help?",
    content: "Chat with our support team. We're here to help!",
    styling: {
      position: "bottom-right",
      size: "medium",
      backgroundColor: "#10b981",
      textColor: "#ffffff",
      borderRadius: "16",
      shadow: true,
      animation: "bounce",
      autoClose: false,
      autoCloseDelay: 0,
    },
    cta_text: "Start Chat",
    cta_link: "/contact",
  },

  cookie_consent: {
    name: "Cookie Consent Banner",
    type: "cookie_consent",
    icon: "🍪",
    title: "We Use Cookies",
    content: "This website uses cookies to improve your experience. By continuing, you agree to our cookie policy.",
    styling: {
      position: "bottom-center",
      size: "large",
      backgroundColor: "#1f2937",
      textColor: "#ffffff",
      borderRadius: "8",
      shadow: true,
      animation: "slideUp",
      autoClose: false,
      autoCloseDelay: 0,
    },
    cta_text: "Accept All",
    cta_link: "#",
  },

  promo: {
    name: "Promotional Offer",
    type: "promo",
    icon: "🎉",
    title: "Limited Time Offer!",
    content: "Get 20% off on all products this weekend. Don't miss out!",
    styling: {
      position: "top-right",
      size: "medium",
      backgroundColor: "#ef4444",
      textColor: "#ffffff",
      borderRadius: "12",
      shadow: true,
      animation: "bounce",
      autoClose: false,
      autoCloseDelay: 0,
    },
    cta_text: "Shop Now",
    cta_link: "/shop",
  },

  social_proof: {
    name: "Social Proof Notification",
    type: "social_proof",
    icon: "👤",
    title: "John just signed up!",
    content: "Join 10,000+ users who are already using our platform.",
    styling: {
      position: "bottom-left",
      size: "small",
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
      borderRadius: "12",
      shadow: true,
      animation: "fadeIn",
      autoClose: true,
      autoCloseDelay: 4,
    },
    cta_text: "Join Now",
    cta_link: "/signup",
  },

  newsletter: {
    name: "Newsletter Subscription",
    type: "newsletter",
    icon: "📧",
    title: "Stay Updated!",
    content: "Subscribe to our newsletter for latest updates and exclusive content.",
    styling: {
      position: "bottom-right",
      size: "medium",
      backgroundColor: "#8b5cf6",
      textColor: "#ffffff",
      borderRadius: "16",
      shadow: true,
      animation: "slideIn",
      autoClose: false,
      autoCloseDelay: 0,
    },
    cta_text: "Subscribe",
    cta_link: "#",
    form_required: true,
  },

  announcement: {
    name: "Announcement Bar",
    type: "notification",
    icon: "📢",
    title: "Important Announcement",
    content: "We'll be performing maintenance on Sunday from 2-4 AM EST.",
    styling: {
      position: "top-center",
      size: "full",
      backgroundColor: "#f59e0b",
      textColor: "#ffffff",
      borderRadius: "0",
      shadow: false,
      animation: "slideDown",
      autoClose: false,
      autoCloseDelay: 0,
    },
    cta_text: "Learn More",
    cta_link: "/maintenance",
  },

  exit_intent: {
    name: "Exit Intent Offer",
    type: "promo",
    icon: "🎁",
    title: "Wait! Before You Go...",
    content: "Get 15% off your first purchase. Use code: WELCOME15",
    styling: {
      position: "center",
      size: "large",
      backgroundColor: "#ec4899",
      textColor: "#ffffff",
      borderRadius: "16",
      shadow: true,
      animation: "zoomIn",
      autoClose: false,
      autoCloseDelay: 0,
    },
    cta_text: "Claim Discount",
    cta_link: "/shop",
    trigger_type: "exit",
  },

  custom_code: {
    name: "Custom Code",
    type: "custom",
    icon: "💻",
    title: "Custom HTML/CSS/JS",
    content: `<div class="custom-popup">
  <h2>Your Custom Popup</h2>
  <p>Write your own HTML, CSS, and JavaScript here.</p>
  <button onclick="alert('Hello!')">Click Me</button>
</div>

<style>
.custom-popup {
  padding: 20px;
  text-align: center;
}
.custom-popup h2 {
  margin-bottom: 10px;
  color: #333;
}
.custom-popup button {
  background: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>

<script>
// Add your custom JavaScript here
console.log('Custom popup loaded!');
</script>`,
    styling: {
      position: "center",
      size: "large",
      backgroundColor: "#ffffff",
      textColor: "#000000",
      borderRadius: "12",
      shadow: true,
      animation: "fadeIn",
      autoClose: false,
      autoCloseDelay: 0,
    },
    cta_text: "",
    cta_link: "",
    trigger_type: "immediate",
    isCustomCode: true,
  },
};

// Position options for popups
export const POSITION_OPTIONS = [
  { value: "top-left", label: "Top Left", icon: "↖️" },
  { value: "top-center", label: "Top Center", icon: "⬆️" },
  { value: "top-right", label: "Top Right", icon: "↗️" },
  { value: "center-left", label: "Center Left", icon: "⬅️" },
  { value: "center", label: "Center", icon: "⏺️" },
  { value: "center-right", label: "Center Right", icon: "➡️" },
  { value: "bottom-left", label: "Bottom Left", icon: "↙️" },
  { value: "bottom-center", label: "Bottom Center", icon: "⬇️" },
  { value: "bottom-right", label: "Bottom Right", icon: "↘️" },
];

// Size options
export const SIZE_OPTIONS = [
  { value: "small", label: "Small", width: "320px" },
  { value: "medium", label: "Medium", width: "400px" },
  { value: "large", label: "Large", width: "600px" },
  { value: "full", label: "Full Width", width: "100%" },
];

// Animation options
export const ANIMATION_OPTIONS = [
  { value: "fadeIn", label: "Fade In" },
  { value: "slideIn", label: "Slide In" },
  { value: "slideUp", label: "Slide Up" },
  { value: "slideDown", label: "Slide Down" },
  { value: "bounce", label: "Bounce" },
  { value: "zoomIn", label: "Zoom In" },
  { value: "none", label: "No Animation" },
];

// Trigger type options
export const TRIGGER_OPTIONS = [
  { value: "immediate", label: "Immediate", description: "Show popup as soon as page loads" },
  { value: "time", label: "Time Delay", description: "Show after X seconds", requiresValue: true },
  { value: "scroll", label: "Scroll %", description: "Show after scrolling X%", requiresValue: true },
  { value: "exit", label: "Exit Intent", description: "Show when user tries to leave" },
  { value: "click", label: "On Click", description: "Show when element is clicked", requiresValue: true },
  { value: "manual", label: "Manual", description: "Triggered by code" },
];
