// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/tokens.css", "~/assets/default.css"],

  alias: {
    assets: "/<rootDir>/assets",
  },

  nitro: {
    openAPI: {
      meta: {
        title: "My Awesome Project",
        description: "This might become the next big thing.",
        version: "1.0",
      },
    },
  },

  runtimeConfig: {
    public: {
      directusUrl: process.env.DIRECTUS_API_URL,
    },
  },

  typescript: {
    typeCheck: true,
  },

  compatibilityDate: "2025-07-15",
});
