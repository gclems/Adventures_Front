/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        parchemin: "url('/parchemin.jpg')",
      },
      colors: {
        paper: {
          400: "#eeebd9",
          500: "#e9dbc2",
        },
        ocre: {
          400: "#B35417",
          500: "#890900",
        },
      },
    },
  },
  plugins: [],
};
