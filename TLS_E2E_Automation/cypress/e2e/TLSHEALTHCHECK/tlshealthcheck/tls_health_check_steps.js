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

Then( 'I am validating tls Archive page', () => {
	cy.validateTlsArchivePage();
} );

Then( 'I am validating tls NewToTheTLS page', () => {
	cy.validateNewToTheTLSPage();
} );

Then( 'I am validating tls Highlights page', () => {
	cy.validateHighlightsPage();
} );

Then( 'I am validating tls LongReads page', () => {
	cy.validateLongReadsPage();
} );

