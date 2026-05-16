/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#ea580c",
          "orange-light": "#f97316",
          navy: "#050d1f",
          "navy-card": "#0d1b2e",
          "navy-input": "#0a1628",
          "navy-border": "#1e3a5f",
          blue: "#3b82f6",
          "blue-hover": "#2563eb",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
