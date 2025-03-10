/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import scrollbarHide from 'tailwind-scrollbar-hide'
import lineClamp from '@tailwindcss/line-clamp'

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
        '5px': '5px',
        '13px': '13px',
        '30px': '30px',
        '340px': '340px',
        '372px': '372px',
        '512px': '512px',
        4.5: '18px'
      },
      fontSize: {
        '2.5xl': '2rem',
      },
      lineHeight: {
        '11': '2.8125rem',
        '6.5': '1.625rem',
      },
      container: {
        center: true,
        screens: {
          'customizing-1060': '1060px',
        }
      },
      zIndex: {
        99: 99
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      indigo: colors.indigo,
      red: colors.rose,
      green: colors.green,
      yellow: colors.amber,
      gray: {
        ...colors.gray,
        'input-bg': '#F5F7FA',
        250: '#E8EDF3',
        350: '#575757',
        450: '#6B7280',
        550: '#8F8F8F',
        650: '#111624',
      },
      'primary-blue': '#3466F6',
      'primary-bg': '#FAFBFF',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    scrollbarHide,
    lineClamp,
  ],
}
