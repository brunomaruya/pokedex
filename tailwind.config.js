/** @type {import('tailwindcss').Config} */
import { colors } from "./src/styles/colors";
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundRed: colors.backgroundRed,
        buttonRed: colors.buttonRed,
      },
      boxShadow: {
        "custom-xl": "0px 0px 30px 7px rgba(0, 0, 0, 0.3)", // sombra extra grande personalizada,
      },
    },
  },
  plugins: [],
};
