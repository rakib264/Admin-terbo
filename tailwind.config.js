/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#1a9944",

          "secondary": "#a5d6f7",

          "accent": "#f7d8a5",

          "neutral": "#241f38",

          "base-100": "#eceeee",

          "info": "#82cad9",

          "success": "#60d7a4",

          "warning": "#eda135",

          "error": "#e9356e",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
