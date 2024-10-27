/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this line
  ],
  theme: {
    extend: {
      colors: {
        '1': '#161925',
        '2': '#1C1F2E',
        '3': '#C9DDFF',
        '4': "#3A405B"
      }
    },
  },
  plugins: [],
}
