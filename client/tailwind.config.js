module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brinjal: "#312b49",
      },
    },
  },
  plugins: [require("daisyui"), require("@themesberg/flowbite/plugin")],
  daisyui: {
    themes: false,
  },
};
