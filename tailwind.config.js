/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Anton', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#0a0a0a',
          red: '#b91c1c',
          offwhite: '#f5f5f5',
          gray: '#262626'
        }
      }
    },
  },
  plugins: [],
}