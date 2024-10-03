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
    },
  },
  plugins: [],
};
