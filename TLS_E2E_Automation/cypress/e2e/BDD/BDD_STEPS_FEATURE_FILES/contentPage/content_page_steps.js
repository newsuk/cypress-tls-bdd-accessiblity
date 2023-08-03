/**
 * External dependencies
 */
import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps';
/**
  * Internal dependencies
  */
/**
 * Internal dependencies
 */
import contentPage from '../../BDD_TLS_Pages/contentPage';
import '.../../../../support/e2e';

/**
  * Click the TLS Logo button
  */
Given( 'User clicks on TLS Logo', () => {
	cy.clickTLSLogo();
	cy.acceptCookieBanner();
});

When( 'User Navigate to Current Issue', () => {
	contentPage.navigateToCurrentIssuePage();
});

Then( 'Validate Page is loaded', () => {
	contentPage.validateToCurrentIssuePage();
});

Then( 'Validate the Previous Issue and Next Issue in Current Issue Page', () => {
	contentPage.validateCurrentIssuePageHasPreviousNextIssue();
});

Then( 'Validate User should have Previous Issue (which is 7 days before from current Issue)', () => {
	contentPage.validatePreviousIssue();
});

Then( 'Validate the Current Issue page and View Content page are opens same and both dates are equal', () => {
	contentPage.validateViewContentAndCurrentPageSame();
});

Then( 'Validate the Current Issue and Previous Issue has Image,Artcile headline and By', () => {
	contentPage.validateImageArticleContentInPreviousAndCurrentIssue();
});

Then( 'Validate showcase section', () => {
	contentPage.validateShowcaseSection();
});

Then( 'Validate Contents section', () => {
	contentPage.validateContentSection();
});
/**
 * Tealium JS
 */
Then( 'Validate appropriate Tealium JS is loading for each environment in single content page', () => {
	cy.tealiumEnvironmentCheck();
});

Then( 'Validate appropriate Tealium JS is loading', () => {
	contentPage.validateTealiumJS();
});

