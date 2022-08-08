/**
 * External dependencies
 */
import { When, Then, And, Given } from 'cypress-cucumber-preprocessor/steps';
/**
  * Internal dependencies
  */
/**
 * Internal dependencies
 */
import error404Page from '../../BDD_TLS_Pages/404Page';

import '../../../../support/e2e';

/**
 * Click the TLS Logo button
 */
Given( 'User clicks on TLS Logo', () => {
	cy.clickTLSLogo();
	cy.acceptCookieBanner();
} );

When( 'User Navigate to irrelavant page', () => {
	cy.acceptCookieBanner();
	error404Page.navigateTo404ErrorPage();
} );

Then( '404 Error should display', () => {
	error404Page.validate404ErrorPage();
} );
/**
 * Verify 404 functionality for Current issue page
 */
When( 'User Navigate to Current Issue Page', () => {
	error404Page.navigateToCurrentIssue404ErrorPage();
} );
/**
 *  Verify 404 functionality for Subscribe page
 */
When( 'User Navigate to Subscribe Page', () => {
	error404Page.navigateSubscribePage();
} );
/**
 * Verify 404 functionality for Categories page
 */
When( 'User Navigate to Categories History Page', () => {
	error404Page.navigateCategoriesHistoryPage();
} );

/**
 * Valdiate utag_data values
 */
Then( 'Validate Utag data values', () => {
	cy.validateUtag();
} );
And( 'Validate appropriate Tealium JS is loading for each environment in single 404 page', () => {
	cy.tealiumEnvironmentCheck();
} );
