const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 50000,
  chromeWebSecurity: false,
  firstRun: true,
	chromeWebSecurity: false,
	env: {
		dev_url: 'https://www.dev-the-tls.co.uk/',
		staging_url: 'https://www.staging-the-tls.co.uk/',
		beta_url: 'https://beta.the-tls.co.uk/',
		uat_url: 'http://nu-ecs-wp-tls-uat.elb.iha-dev.ntch.co.uk/',
		prod_url: 'https://www.the-tls.co.uk/',
	},
	viewportWidth: 1024,
	viewportHeight: 768,
	pageLoadTimeout: 25000,
	"retries": {
		"runMode": 1,
		"openMode": 0
	  },
	  "trashAssetsBeforeRuns": true,
	  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: [ 'cypress/e2e/*.spec.js' ],
  },

});
