/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./partials/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#360568",
      secondary: "#5B2A86",
      tertiary: "#7785AC",
      light: "#FDF7FA",
    },
    listStyleType: {
      dash: "\'⭐️\'",
    },
    extend: {},
  },
  plugins: [],
};
