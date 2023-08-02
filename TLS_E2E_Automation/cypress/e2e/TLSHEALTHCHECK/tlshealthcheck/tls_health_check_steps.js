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

