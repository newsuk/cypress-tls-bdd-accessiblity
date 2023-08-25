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

Then( 'I validate tls buy page', () => {
  cy.validateTlsBuyPage();
}) ;
