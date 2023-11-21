/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        success: colors.green,
        primary: '#424242',
        filter: '#5ccb5f',
        background: '#EDEDED',
        danger: colors.red,

      },
      container: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1536px',
          '2xl': '1536px',
        },
      }
    },
    fontSize: {
      sm: ['8px', '14px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
