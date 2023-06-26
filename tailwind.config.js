// tailwind.config.js
const nativewind = require("nativewind/tailwind/native")
module.exports = {
  content: [
    './App.{js,ts,jsx,tsx}',
    './pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
  ],
plugins: [nativewind()],
};