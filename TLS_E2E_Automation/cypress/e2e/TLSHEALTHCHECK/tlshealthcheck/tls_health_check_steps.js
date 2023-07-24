/**
 * External dependencies
 */
import { Then } from 'cypress-cucumber-preprocessor/steps';
/**
  * Internal dependencies
  */
/**
 * Internal dependencies
 */
import '.../../../../support/e2e';
import'.../../../../cypress-tls-bdd-accessiblity/TLS_E2E_Automation/cypress/support/tlshealthcheckcommands';

Then( 'I am validating tls home page', () => {
	cy.validateTlsHomePage();
} );
