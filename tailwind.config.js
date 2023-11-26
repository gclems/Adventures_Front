/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          400: "#eeebd9",
          500: "#e9dbc2",
        },
        ocre: {
          500: "#890900",
        },
      },
    },
  },
  plugins: [],
};
