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

Then( 'I am validating tls home page', () => {
	cy.validateTlsHomePage();
} );

Then( 'I am validating tls archive page', () => {
	cy.validateTlsArchivePage();
} );

Then( 'I am validating tls new to the tls page', () => {
	cy.validateNewToTheTLSPage();
} );

Then('I am validating tls highlights page', () => {
	cy.validateHighlightsPage();
} );

Then( 'I am validating tls long reads page', () => {
	cy.validateLongReadsPage();
} );

