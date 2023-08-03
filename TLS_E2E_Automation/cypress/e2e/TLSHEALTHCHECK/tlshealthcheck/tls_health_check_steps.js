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
import '../../../support/e2e'
import '../../../support/tlshealthcheckcommands';

Then('I validate tls home page', () => {
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

Then('I validate tls archive page', () => {
	cy.validateTlsArchivePage();
} );

Then('I validate tls new to the tls page', () => {
	cy.validateNewToTheTLSPage();
} );

Then('I validate tls highlights page', () => {
	cy.validateHighlightsPage();
} );

Then('I validate tls long reads page', () => {
	cy.validateLongReadsPage();
} );

Then('I validate TLS author page', () => {
	cy.validateAuthorPage();
} );

Then('I validate TLS category page', () => {
	cy.validateCategoryPage();
} );

Then('I validate TLS search page', () => {
	cy.validateSearchPage();
} );
