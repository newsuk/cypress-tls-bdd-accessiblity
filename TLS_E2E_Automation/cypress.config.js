const { defineConfig } = require( 'cypress' );
//const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator'); 
//const ReportGenerator = require('lighthouse/report/generator/report-generator');

module.exports = defineConfig( {
	projectId: 'prise6',
	firstRun: true,
	chromeWebSecurity: false,
	env: {
		dev_url: 'https://www.dev-the-tls.co.uk/',
		staging_url: 'https://www.staging-the-tls.co.uk/',
		beta_url: 'https://beta.the-tls.co.uk/',
		uat_url: 'http://nu-ecs-wp-tls-uat.elb.iha-dev.ntch.co.uk/',
		prod_url: 'https://www.the-tls.co.uk/',
	},
	viewportWidth: 1200,
	viewportHeight: 660,
	"pageLoadTimeout": 10000,
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
