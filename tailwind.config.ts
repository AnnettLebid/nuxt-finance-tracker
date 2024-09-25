/** @type {import('tailwindcss').Config} **/
export default {
  theme: {
    container: {
      center: true,
      padding: { lg: "5rem", DEFAULT: "1.25rem" },
    },
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
