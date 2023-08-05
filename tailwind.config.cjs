/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT(
  {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        center: true,
        fontFamily: {
          // 'typo-round': ["Typo Round Regular Demo", "serif"]
        },
        boxShadow: {
          'button': "8px 8px 16px #bec2c4, -8px -8px 16px #ffffff",
          'navbar': "35px 35px 70px #bec2c4, -35px -35px 70px #ffffff",
          'menu-button': "inset -5px -5px 7px #9da0a2, inset 5px 5px 7px #ffffff",
          'menu': "33px 33px 100px #86898b, -33px -33px 100px #ffffff",
          "sidebar-button": "6px 6px 12px #999c9f, -6px -6px 12px #cfd4d7"
        }
      },
    },
    plugins: [],
  }
)
