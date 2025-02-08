/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lavender: {
          100: "#F4F0FA", // Lighter lavender for backgrounds
          200: "#E5DFF1", // Existing lavender shade
          400: "#C1B2DB", // Mid-tone lavender for borders or subtle accentslavender
          600: "#9C8BBE", // Deeper lavender for hover states
          800: "#6A5E95", // Existing darker lavender for text or contrast
          900: "#4A235A", // Darkest lavender for headings or backgrounds
        },
        peach: {
          100: "#FFF4EF", // Very light peach for soft backgrounds
          200: "#FDE2D3", // Existing peach
          400: "#FAC9B5", // Muted peach for subtle accents
          600: "#E89E85", // Warmer peach for hover or active states
          800: "#C1786D", // Existing deeper peach for contrast
        },
        mint: {
          100: "#E6FAF5", // Soft mint for secondary backgrounds
          400: "#A6DED4", // Mint accent for buttons or icons
          600: "#7CC1B3", // Deeper mint for hover effects
        },
        ivory: {
          100: "#FFF8F1", // Neutral ivory for cards or background sections
          300: "#F8EDE3", // Soft ivory accent
        },
        text: {
          primary: "#4A4A68", // Deep lavender-gray for primary text
          secondary: "#6F6F8E", // Softer secondary text
          accent: "#8A8AB3", // Muted lavender for subtle highlights
          muted: "#A5A5C3", // Light desaturated purple for less prominent text
          contrast: "#2E2E4F", // Darker shade for contrast when needed
        },
      },
    },
  },
  plugins: [],
};
