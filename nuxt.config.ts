// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase"],
  future: {
    compatibilityVersion: 4,
  },
  dir: {
    app: "app",
  },
  supabase: {
    redirect: false,
  },
});
