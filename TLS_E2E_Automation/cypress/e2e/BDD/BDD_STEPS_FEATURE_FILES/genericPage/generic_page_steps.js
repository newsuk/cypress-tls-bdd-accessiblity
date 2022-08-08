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
import genericPage from '../../BDD_TLS_Pages/genericPage';
import '.../../../../support/e2e';

/**
 * Click the TLS Logo button
 */
Given( 'User clicks on TLS Logo', () => {
	cy.clickTLSLogo();
	cy.acceptCookieBanner();
} );

Then( 'Validate the Social media icons and its links', () => {
	genericPage.validateHomePageHasSocialMediaButtonsAndLinks();
} );

Then( 'Validate Subscribe,Login button and search icon are visible', () => {
	genericPage.validateHomePageSubscribeSearchAndLoginButtoons();
} );
Then( 'Validate Archive icon is visible', () => {
	genericPage.validateArchiveTitle();
} );

Then( 'Validate Shop icon is visible', () => {
	genericPage.validateShopOnTitle();
} );

Then( 'Validate Explore title', () => {
	genericPage.validateExploreOnTitle();
} );

Then( 'Validate Explore title and categories', () => {
	genericPage.validateExploreCategories();
} );

When( 'User navigates to new to tls page', () => {
	genericPage.navigateToExploreCategoryNEWTOTLS();
} );
Then( 'Validate all links in the page', () => {
	genericPage.validateNEWTOTLSPageLinks();
} );

//Validate the Footer logo and main topics
Then( 'Valiate Footer logo and its topics', () => {
	genericPage.validateFooterLogoAndMainTopics();
} );

//Validate Terms and Conditons at botton
Then( 'Validate Terms and conditions, Privacy and Cookie', () => {
	genericPage.validateTermConditionPrivacyandCookieInFooter();
} );

Then( 'Validate Apple Podcasts, Spotify and Google Podcasts', () => {
	genericPage.validatePodcasts();
} );

/**
 * Valiate about us
 */
Then( 'Validate page is navigates to Aboutus and its has header and logo', () => {
	genericPage.validateAboutUs();
} );

/**
 * Valdiate utag_data values
 */
Then( 'Validate Utag data values', () => {
	cy.validateUtag();
} );
And( 'Validate appropriate Tealium JS is loading for each environment in home page', () => {
	cy.tealiumEnvironmentCheck();
} );
