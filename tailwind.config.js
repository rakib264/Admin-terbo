/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}'
      // './node_modules/tw-elements/dist/js/**/*.js'
   ],

   theme: {
      extend: {
         /* ...other tailwind configurations */
         styles: {
            /* ...other tailwind styles */
            '.custom-date-input': {
               /* Customize the desired styles */
               backgroundColor: 'black',
               borderColor: 'red',
               color: '#4a5568'
               /* Add other styles as needed */
            }
         }
      }
   },
   daisyui: {
      themes: [
         {
            mytheme: {
               primary: '#1a9944',

               secondary: '#a5d6f7',

               accent: '#f7d8a5',

               neutral: '#241f38',

               'base-100': '#eceeee',

               info: '#82cad9',

               success: '#60d7a4',

               warning: '#eda135',

               error: '#e9356e'
            }
         }
      ]
   },
   plugins: [require('daisyui'), require('tw-elements/dist/plugin.cjs')]
};

// // /* CSS file */
// // .hide-input-placeholder::-webkit-input-placeholder {
// //    color: transparent;
// //  }

//  /* tailwind.config.js */
//  module.exports = {
//    // theme: {
//    //   extend: {
//    //     /* ...other tailwind configurations */
//    //     styles: {
//    //       /* ...other tailwind styles */
//    //       '.hide-input-placeholder::-webkit-input-placeholder': {
//    //         color: 'transparent',
//    //       },
//    //     },
//    //   },
//    // },
//    /* ...other tailwind configurations */
//  };
