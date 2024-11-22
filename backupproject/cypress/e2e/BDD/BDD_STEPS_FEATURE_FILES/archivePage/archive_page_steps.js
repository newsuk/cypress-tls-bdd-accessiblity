/**
 * External dependencies
 */
import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps';

/**
 * Internal dependencies
 */
import archivePage from '../../BDD_TLS_Pages/archivePage';
import genericPage from '../../BDD_TLS_Pages/genericPage';
import '../../../../support/e2e';
/**
  * Click the TLS Logo button
  */
Given( 'User clicks on TLS Logo', () => {
	cy.clickTLSLogo();
	cy.acceptCookieBanner();
} );

When( 'Navigate to  archive page', () => {
	archivePage.navigateToArchivePage();
} );

Then( 'Validate archive page is loaded', () => {
	archivePage.validateArchivePageIsLoaded();
} );

Then( 'Validate social media icons and subscribe and search header', () => {
	archivePage.validateSocialMediaAndLoginButton();
} );

Then( 'Validate year filter functionalites', () => {
	archivePage.validateYearFilterDropDown();
} );

Then( 'Validate search filter functionalites', () => {
	archivePage.validateSearchFilter();
} );

Then( 'Validate footer', () => {
	genericPage.validateFooterLogoAndMainTopics();
} );

Then( 'Validate backToTop', () => {
	archivePage.validateBackToTop();
} );

Then( 'Validate Algolia Page is located at bottom and it is navigating to gale page', () => {
	archivePage.validateAlgoliaNavigation();
} );

Then( 'Validate click here for non subscriber', () => {
	archivePage.validateClickHereNotSubscriber();
} );

Then( 'Validate Show more button', () => {
	archivePage.verifyShowmore();
} );
