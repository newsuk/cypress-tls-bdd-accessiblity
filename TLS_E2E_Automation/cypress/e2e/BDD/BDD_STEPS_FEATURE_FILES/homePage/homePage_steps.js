/**
 * External dependencies
 */
import { When, Then, And, Given } from 'cypress-cucumber-preprocessor/steps';
/**
 * Internal dependencies
 */
import '.../../../../support/e2e';
import homePage from '../../BDD_TLS_Pages/homePage';

/**
 * After home page loaded users clicks on TLS
 */
Given( 'Users enters into the tls home page', () => {
	cy.clickTLSLogo();
	cy.acceptCookieBanner();
} );

/**
 * Validating the tls home page load
 */

When( 'The home page is loaded successfully', () => {
	homePage.landingPageValidation();
} );

/**
 * Validating all the sections in the homepage
 */

Then( 'All the sections of the home page should be loaded', () => {
	homePage.homePageSectionValidation();
} );
/**
 * Validate Hero Block
 */
Then( 'Validate hero block', () => {
	homePage.valdiateHeroBlock();
} );

/**
 * Validate the Issue block image
 */
Then( 'Validate Issue block has an TLS image', () => {
	homePage.valdiateIssueImageBlock();
} );

/**
 * Validate the Issue has an Date and this week label
 */
And( 'Validate Issue block has date and this week issue', () => {
	homePage.validatDateAndThisWeekIssuelabelIsDisplayed();
} );

Then( 'Validate Hero Large Block has image,category name,articlename and author name', () => {
	cy.acceptCookieBanner();
	homePage.validateHeroHasArticleCategoryTitleAndAuthor();
} );

Then( 'Validate the Document, Window and Decibel', () => {
	homePage.validateDocumentWindowDecibel();
} );

Then( 'Validate podcast header, title , standfirst and  image and date', () => {
	homePage.validatePodcastHeaderTitleStandfirst();
} );

Then( 'Validate podcast Article and Title', () => {
	homePage.valdiatePodcastArticleTitleStandfirst();
} );

Then( 'Validate left block and center collections', () => {
	homePage.validateLeftblockCollections();
} );

Then( 'Validate ads in Home Page', () => {
	homePage.validateAdsCheckInHomePage();
} );

Then( 'Validate appropriate Tealium JS is loading for each environment in single home page', () => {
	cy.tealiumEnvironmentCheck();
} );

Then( 'Validate JS Loading', () => {
	homePage.validateJSLoading();
} );

