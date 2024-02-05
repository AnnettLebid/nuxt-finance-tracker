// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "@nuxtjs/tailwindcss"],
  supabase: {
    redirect: false,
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["lite-youtube"].includes(tag),
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  devServer: {
    port: 3001,
  },
});
