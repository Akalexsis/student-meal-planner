/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        DEFAULT: "#f0e7d7",
        primaryGreen: "#0B592f",
        primaryOrange: "#df6f3b",
        yellowAccent: "#eeb627",
        secondaryGreen: "#8ca70a",
        brown: "#936440",
      }
    },
  },
  plugins: [],
}

