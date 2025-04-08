
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  darkMode: ['class', '[dark~="lord"]'], // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  content: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
} 
