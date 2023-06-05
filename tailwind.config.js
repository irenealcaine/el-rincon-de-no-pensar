/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
      },
      backgroundImage: {
        hero:
          "url('https://images.newscientist.com/wp-content/uploads/2023/03/21161436/SEI_149163371.jpg')",
         },
      backgroundSize: {
        'large': '12rem',
      }
    },
  },
  plugins: [],
};
