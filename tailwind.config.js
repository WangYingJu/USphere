/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  // purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '30px': '30px',
        4.5: '18px'
      }
    },
    container: {
      center: true,
      screens: {
        'customizing-1060': '1060px',
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      gray: {
        ...colors.gray,
        'input-bg': '#F5F7FA',
        250: '#E8EDF3',
        350: '#575757',
        450: '#6B7280'
      },
      'primary-blue': '#3466F6',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
