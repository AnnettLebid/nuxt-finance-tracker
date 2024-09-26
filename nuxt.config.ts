// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
  ],
  future: {
    compatibilityVersion: 4,
  },
  colorMode: {
    preference: 'light'
  },
  dir: {
    app: "app",
  },
  supabase: {
    redirect: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  imports: {
    imports: [{ from: "clsx", name: "ClassValue", type: true }],
  },

  css: ["~/assets/css/main.scss"],
  compatibilityDate: "2024-08-27",

  typescript: {
    strict: true,
    includeWorkspace: true,
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false,
      },
    },
  },
});