/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'pilgrim-beige': '#F5F5F0',
        'pilgrim-olive': '#556B2F',
        'pilgrim-navy': '#1A237E',
      },
    },
  },
  plugins: [],
}
