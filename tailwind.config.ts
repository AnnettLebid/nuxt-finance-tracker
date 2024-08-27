/** @type {import('tailwindcss').Config} **/
export default {
  theme: {
    extend: {},
  },
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
  ],
};
