
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#6C2AF6',
        secondary: '#9A5FE4',
        "plain-grey": '#666666',
        "tag-primary": "#F69E4C",
        "tag-secondary": "#FFF1DE"
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['odd', 'even', 'hover', 'focus'],
      borderColor: ['hover', 'focus'],
      padding: ['odd', 'even'],
    },
  },
  plugins: [],
}
