const { defineConfig } = require( 'cypress' );
//const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator'); 
//const ReportGenerator = require('lighthouse/report/generator/report-generator');
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");



async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
await preprocessor.addCucumberPreprocessorPlugin(on, config);
on("file:preprocessor", browserify.default(config));
return config;
}

module.exports = defineConfig( {
	projectId: 'prise6',
	firstRun: true,
	chromeWebSecurity: false,
	screenshotsFolder: 'cypress/productionhealthcheckscreenshots',
	env: {
		dev_url: 'https://www.dev-the-tls.co.uk/',
		staging_url: 'https://www.staging-the-tls.co.uk/',
		beta_url: 'https://beta.the-tls.co.uk/',
		uat_url: 'http://nu-ecs-wp-tls-uat.elb.iha-dev.ntch.co.uk/',
		prod_url: 'https://www.the-tls.co.uk/',
	},
	viewportWidth: 1200,
	viewportHeight: 660,
	pageLoadTimeout: 25000,
	"retries": {
		"runMode": 1,
		"openMode": 0
	  },
	  "trashAssetsBeforeRuns": true,
	  video: true,
	e2e: {
		// We've imported your old cypress plugins here.
		// You may want to clean this up later by importing these.
		setupNodeEvents( on, config ) {
			/*on('before:browser:launch', (browser, launchOptions) => {
		prepareAudit(launchOptions); 
		if (browser.name === 'chrome' && browser.isHeadless) {
		  launchOptions.args.push('--disable-gpu');
		  return launchOptions;
		}
	  });
	
	  on('task', {
		lighthouse: lighthouse((lighthouseReport) => { 
		  fs.writeFileSync('build/cypress/lhreport.html', ReportGenerator.generateReport(lighthouseReport.lhr, 'html')); 
		}),
		pa11y: pa11y(), 
	  });*/
			return require( './cypress/plugins/index.js' )( on, config );
		},
		excludeSpecPattern: [ '*.js', '*.md' ],
		specPattern: [ 'cypress/e2e/**/*.{feature,features}', 'cypress/e2e/**/*.cy.js' ],
	},
} );
