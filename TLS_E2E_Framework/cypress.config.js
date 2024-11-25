const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 50000,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: [ 'cypress/e2e/*.spec.js' ],
    baseUrl: 'https://www.the-tls.co.uk',
  },

});
