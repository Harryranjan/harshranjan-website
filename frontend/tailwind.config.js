/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // Agency Brand Colors
        navy: "#0F172A",
        purple: "#8B5CF6",
        cyan: "#06B6D4",
        coral: "#F97316",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)",
        "gradient-cta": "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)",
        "gradient-card": "linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 100%)",
        "gradient-button": "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
        },
        ".scrollbar-thumb-gray-300": {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            "background-color": "#d1d5db",
            "border-radius": "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            "background-color": "#9ca3af",
          },
        },
        ".scrollbar-track-gray-100": {
          "&::-webkit-scrollbar-track": {
            "background-color": "#f3f4f6",
            "border-radius": "4px",
          },
        },
      });
    },
  ],
};
