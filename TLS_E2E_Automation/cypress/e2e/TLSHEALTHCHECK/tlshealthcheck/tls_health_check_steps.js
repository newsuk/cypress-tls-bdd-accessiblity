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
Then( 'I validate tls article page', () => {
	cy.validateTlsArticlePage();
} );
Then( 'I validate tls buy page', () => {
  cy.validateTlsBuyPage();
}) ;
Then( 'I validate tls current-issue page', () => {
  cy.validateTlsCurrentIssuePage();
}) ;
Then( 'I validate tls header-footer page', () => {
 cy.validateTlsHeaderFooter();
});