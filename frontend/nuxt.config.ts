import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/icon", "@vee-validate/nuxt", "@pinia/nuxt", "@nuxtjs/i18n", "@nuxt/fonts"],
  css: ["~/assets/styles/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  veeValidate: {
    autoImports: true,
  },
  runtimeConfig: {
    public: {
      backendUrl: "http://localhost:3001",
    },
  },
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
        dir: "ltr",
        language: "en-US",
        file: "en.json",
      },
      {
        code: "ar",
        name: "العربية",
        dir: "rtl",
        language: "ar-SA",
        file: "ar.json",
      },
    ],
    langDir: ".",
    defaultLocale: "en",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  fonts: {
    families: [
      {
        name: "IBM Plex Sans Arabic",
        provider: "google",
        weights: [400, 500, 600, 700],
      },
    ],
  },
});
