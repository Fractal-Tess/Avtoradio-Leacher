const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['roboto', ...defaultTheme.fontFamily.sans]
      }
    }
  },

  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#e863d6',
          secondary: '#7bc3e0',
          accent: '#cd97fc',
          neutral: '#25343C',
          'base-100': '#F8F8FB',
          info: '#93BADC',
          success: '#12A168',
          warning: '#F4C857',
          error: '#DE3B4E'
        },
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#1A4964ff',
          secondary: '#286F91ff',
          accent: '#58A9C5ff',
          neutral: '#1F1721',
          'base-100': '#050D1Cff',
          info: '#507592ff',
          success: '#1B743C',
          warning: '#F38A12',
          error: '#F2215C'
        }
      }
    ]
  },
  plugins: [forms, typography, daisyui]
};

module.exports = config;
