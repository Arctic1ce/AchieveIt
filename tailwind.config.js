const { nextui } = require('@nextui-org/react');
const path = require('path');

/** @type {import('tailwindcss').Config} */
export default {
  content: {
    relative: true,
    files: [
      './packages/achieveit-frontend/src/index.js',
      './src/**/*.js',
      './packages/achieveit-frontend/src/*.js',
      './node_modules/@nextui-org/theme/dist/**/*.js',
    ],
  },
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        'achieveit-light': {
          colors: {
            background: '#FFFFFF',
            foreground: '#11181C',
            primary: {
              50: '#DEDEFF',
              100: '#C9C6FE',
              200: '#B6AFFE',
              300: '#A698FD',
              400: '#9882FC',
              500: '#763DF5',
              600: '#6C25ED',
              700: '#6214DE',
              800: '#5008B7',
              900: '#2F026D',
              1000: '#13002B',
              foreground: '#FFFFFF',
              DEFAULT: '#835BFA',
            },
            secondary: {
              DEFAULT: '#000000',
            },

            focus: '#835BFA',
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px',
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px',
            },
          },
        },
        'achieveit-dark': {
          extend: 'dark', // <- inherit default values from dark theme

          colors: {
            background: '#0D001A',
            foreground: '#eee7e3',
            primary: {
              50: '#13002B',
              100: '#2F026D',
              200: '#5008B7',
              300: '#6214DE',
              400: '#6C25ED',
              500: '#763DF5',
              600: '#9882FC',
              700: '#A698FD',
              800: '#B6AFFE',
              900: '#C9C6FE',
              1000: '#DEDEFF',
              foreground: '#000000',
              DEFAULT: '#835BFA',
            },
            secondary: {
              DEFAULT: '#FFFFFF',
            },
            danger: {
              DEFAULT: '#FF4444',
            },

            focus: '#835BFA',
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px',
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px',
            },
          },
        },
      },
    }),
  ],
};
