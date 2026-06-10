/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#3B5BFC',
          orange: '#F94E0A',
          lime: '#C4FF3D',
          peach: '#F9D4C4',
          violet: '#5B1FF0',
          teal: '#206A6E',
          limeBg: '#9BBE3D',
          red: '#BC5450',
          pink: '#F50A8C'
        }
      }
    },
  },
  plugins: [],
}
