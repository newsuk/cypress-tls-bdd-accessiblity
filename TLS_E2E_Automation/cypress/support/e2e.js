/// <reference types="cypress" />
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
/**
 * Internal dependencies
 */
import './commands';
import '@bahmutov/cy-api';
import 'cypress-wait-until';
require('cypress-wait-until')
/**
 * External dependencies
 */
import 'cypress-axe';

// Alternatively you can use CommonJS syntax:
// require('./commands')
const environment = Cypress.env( 'ENV' );
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
	const style = app.document.createElement('style');
	style.innerHTML =
	  '.command-name-request, .command-name-xhr { display: none }';
	style.setAttribute('data-hide-command-log-request', '');
	app.document.head.appendChild(style);
  }

 Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    if (err.message.includes('Request failed with status code 400')) {
      // Handle the specific exception here
      cy.log('Caught specific exception:', err.message);
      return true;
    }
    return false;
  });

  before( () => {
	if(environment!='healthcheck')
	{
	if ( Cypress.config( 'firstRun' ) ) {
		cy.log( 'Open the TLS Home page for environment =>' + Cypress.env( 'ENV' ) );
		//Fetch the environment from the command line
		const environment = Cypress.env( 'ENV' );
		//Corresponded environment url is picked
		const url = Cypress.env( `${ environment }_url` );
		//Load the URL
		cy.visit(url);
		//Accept the cookie banner
		cy.acceptCookieBanner();
		/**
	     * If needed can add(err, runnable)
         */
		Cypress.on("uncaught:exception", (err, runnable) => {
			// returning false here prevents Cypress from
			// failing the test
			return false;
		  });
		Cypress.config( 'firstRun', false );
		cy.log( 'TLS Home page for environment =>' + Cypress.env( 'ENV' ) + 'loaded' );
	}
}
} );

beforeEach( () => {
} );

after( () => {
	if(environment!='healthcheck')
	{
	cy.log( 'Test Secenario Completed' );
	Cypress.config( 'firstRun', true );
	}
} );

afterEach( () => {
	if(environment!='healthcheck')
	{
	cy.log( 'Test Completed' );
	}
} );
