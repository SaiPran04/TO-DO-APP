/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: (_) => ({
           'custom-background': "url(./assets/bright-pop-landscape-design.jpg)"
      })
    },
  },
  plugins: [],
}

