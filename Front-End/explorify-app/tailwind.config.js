/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"],
    },
    extend: {
      // Colours uesd in the app
      colors: {
        primary:"#05B6D3",
        secondary:"#EF863E",
      },
    },
  },
  plugins: [],
};
