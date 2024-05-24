/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#8AAAE5',
        'primarySecond':'#608cdc',
        'primaryThird':'#8ac1e5',
        'purple':'#8ac1e5',
        'white':'#FFFFFF',
        'accent':'#8ad8e5',
        'accentSecond':'#8ae5c5',
      }
    },
  },
  plugins: [],
}