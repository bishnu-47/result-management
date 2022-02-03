module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@themesberg/flowbite/plugin")],
  daisyui: {
    themes: false,
  },
};
