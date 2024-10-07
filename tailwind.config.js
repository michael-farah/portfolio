/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/App.tsx",
    "./src/main.tsx",
    "./src/components/*.{ts,tsx}",
    "./src/sections/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};