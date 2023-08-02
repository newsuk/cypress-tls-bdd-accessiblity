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
		//cy.visit( "https://glebbahmutov.com/blog/" );
		//Accept the cookie banner
		cy.acceptCookieBanner();
		Cypress.Cookies.defaults( {
			preserve: /main_.*/,
		} );
		/**
	     * If needed can add(err, runnable)
         */
		Cypress.on( 'uncaught:exception', () => {
		/**
             * returning false here prevents Cypress from failing the test if there are any exceptions from 3rd party scripts
             */
			return false;
		} );
		Cypress.config( 'firstRun', false );
		cy.log( 'TLS Home page for environment =>' + Cypress.env( 'ENV' ) + 'loaded' );
	}
}
} );

beforeEach( () => {
	//cy.acceptCookieBanner( { timeout: 3000 } );
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
