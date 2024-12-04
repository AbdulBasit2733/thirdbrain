/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          200: "#d9ddee",
          500: "#9492db",
          600: "#7164c0",
        },
        gray: {
          50: "rgba(0, 0, 0, 0.5)",
          100: "#eeeeef",
          200: "#e6e9ed",
          600: "#95989c",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-sarif"],
        inter: ["Inter", "sans-sarif"],
        lato: ["Lato", "sans-sarif"],
      },
    },
  },
  plugins: [],
};
