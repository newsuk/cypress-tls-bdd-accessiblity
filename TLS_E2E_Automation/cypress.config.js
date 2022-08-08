const { defineConfig } = require( 'cypress' );

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

	e2e: {
		// We've imported your old cypress plugins here.
		// You may want to clean this up later by importing these.
		setupNodeEvents( on, config ) {
			return require( './cypress/plugins/index.js' )( on, config );
		},
		excludeSpecPattern: [ '*.js', '*.md' ],
		specPattern: [ 'cypress/e2e/**/*.{feature,features}', 'cypress/e2e/**/*.cy.js' ],
	},
} );
