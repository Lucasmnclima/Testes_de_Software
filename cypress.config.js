const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ipqq2c",
  e2e: {
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://lojaebac.ebaconline.art.br/',
  },
});
