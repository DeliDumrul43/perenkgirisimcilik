/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        'brand-beige': '#f0e6d5',
        'brand-light-turquoise': '#c2d8d2',
        'brand-dark-turquoise': '#275c57',
    },
    fontFamily: {
        'serif': ['"Libre Baskerville"', 'serif'],
        'sans': ['"Montserrat"', 'sans-serif'], // Changed Lato to Montserrat
    },
  plugins: [],
  }
}
}
