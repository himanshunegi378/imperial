/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'soft-white': '#F8F8F8',
        'muted-lavender': '#D1C4E9',
        'pale-aqua': '#B2EBF2',

        // Accent Colors
        'calming-blue': '#42A5F5',
        'serene-green': '#81C784',

        // Text Colors
        'dark-gray': '#424242',
        'light-gray': '#9E9E9E',
      },
      fontFamily: {
        // You'll want to choose a lightweight sans-serif font.
        // Examples: 'Inter', 'Nunito', 'Lato', 'Roboto Light'.
        // Make sure to import the font in your main CSS file or via Google Fonts.
        sans: ['Inter', ...defaultTheme.fontFamily.sans], // Example: using Inter
      },
      boxShadow: {
        // Custom soft shadow for floating elements
        'soft-float': '0 4px 10px rgba(0, 0, 0, 0.05), 0 2px 5px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
};