/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const cucumber = require( 'cypress-cucumber-preprocessor' ).default;
const fs = require( 'fs' );
const { lighthouse, pa11y, prepareAudit } = require('cypress-audit'); 
//const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator'); 
const ReportGenerator = require('lighthouse/report/generator/report-generator');



module.exports = ( on ) => {
	on( 'file:preprocessor', cucumber() );
	/*on('before:browser:launch', (browser = {}, launchOptions) => {
		prepareAudit(launchOptions)
	  })
	
	  on('task', {
		lighthouse: lighthouse(), // calling the function is important
	  })*/
	  on('before:browser:launch', (browser, launchOptions) => {

		prepareAudit(launchOptions); 
		if (browser.name === 'chrome' && browser.isHeadless) {
		  launchOptions.args.push('--disable-gpu');
		  return launchOptions;
		}
	  });
	
	  on('task', {
		lighthouse: lighthouse((lighthouseReport) => { 
		  fs.writeFileSync('cypress/screenshots/lhreport.html', ReportGenerator.generateReport(lighthouseReport.lhr, 'html')); 
		}),
		pa11y: pa11y(), 
	  });
	  
	on( 'task', {
		log( message ) {
			// eslint-disable-next-line no-console
			console.log( message );
			return null;
		},
		table( message ) {
			// eslint-disable-next-line no-console
			console.table( message );
			return null;
		},

	} );
	on( 'after:run', ( results ) => {
		if ( results ) {
			fs.mkdirSync( 'cypress/.run', { recursive: true } );
			fs.writeFile( 'cypress/.run/results.json', JSON.stringify( results ) );
		}
	} );
};