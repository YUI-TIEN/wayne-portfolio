/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // High-end warm cream and ink color palette
        cream: {
          50: '#FAF9F6',
          100: '#F4F3EE',
          200: '#E8E6DF',
          300: '#D9D6CB',
        },
        ink: {
          900: '#0C0C0C',
          800: '#161616',
          700: '#222222',
        }
      }
    },
  },
  plugins: [],
}
