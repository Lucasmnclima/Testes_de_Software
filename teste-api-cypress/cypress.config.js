const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    //Configurando a URL da API
    baseUrl: "http://localhost:3000",
  },
});
