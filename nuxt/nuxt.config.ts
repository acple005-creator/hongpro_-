// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: [
    "~/assets/css/index.css","~/assets/css/level.css"
  ],
  runtimeConfig: {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
  },
    vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  },
})