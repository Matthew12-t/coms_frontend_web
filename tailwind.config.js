export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF2FB",
          100: "#DCE3F4",
          500: "#1E3A8A",
          700: "#0F2C6B",
          900: "#0B2A5B",
        },
        canvas: "#F4F6FB",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
