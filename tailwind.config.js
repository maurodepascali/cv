/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6c7afa',
        secondary: '#acb9fc',
        dark: '#0a141d',
        darker: '#162d41'
      }
    },
  },
  plugins: [],
}