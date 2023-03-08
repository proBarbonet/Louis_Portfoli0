export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/Louis_Portfoli0/',
    buildAssetsDir: 'assets', // don't use "_" at the begining of the folder name to avoids nojkill conflict
  },
  css: [
    '98.css',
  ],
})
