const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 50000,
  chromeWebSecurity: false,
  firstRun: true,
  chromeWebSecurity: false,
  env: {
    uat_url: "https://uat-the-tls.co.uk/",
    staging_url: "https://www.staging-the-tls.co.uk/",
    prod_url: "https://www.the-tls.co.uk/",
    uat_username: "test_uat_newuser_tls@yopmail.com",
    uat_password: "password123",
    uat_username_cancelled: "kavinprabu_tls_cancelled@yopmail.com",
    uat_password_cancelled: "Test_123",
    prod_username: "kavinprabu.sm@news.co.uk",
    prod_password: "Kavin_1711",
    prod_username_cancelled: "kavinprabu.sm+testing@news.co.uk",
    prod_password_cancelled: "Kavin_1711",
  },
  viewportWidth: 1024,
  viewportHeight: 768,
  pageLoadTimeout: 25000,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  trashAssetsBeforeRuns: true,
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: ["cypress/e2e/*.spec.js"],
  },
});
