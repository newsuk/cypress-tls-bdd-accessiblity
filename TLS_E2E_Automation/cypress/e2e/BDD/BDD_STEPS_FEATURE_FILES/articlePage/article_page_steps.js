/**
 * External dependencies
 */
import { When, Then, And, Given } from 'cypress-cucumber-preprocessor/steps';
/**
 * Internal dependencies
 */
import articlePage from '../../BDD_TLS_Pages/articlePage';
import '.../../../../support/e2e';

/**
 * Click the TLS Logo button
 */
Given( 'User clicks on TLS Logo', () => {
	cy.clickTLSLogo();
	cy.acceptCookieBanner();
} );

/**
 * TNLST-328 ,TNLST-329
 */
Then( 'User click on second article from Home page', () => {
	articlePage.clickSecondArtcileINHomePage();
} );

And( 'Article page should open which the user has selected', () => {
	articlePage.getHeadlineOfArtcilePage();
} );

And( 'Validate the category, separator And Article type', () => {
	articlePage.validateArticleCategorySepartorAndType();
} );

/**
 * Need to fill
 */
When( 'User click on second article from Home page', () => {
	articlePage.clickSecondArtcileINHomePage();
} );

Then( 'Validate the title, subtitles , author with prefix by, image and its caption', () => {
	articlePage.validateArticleTitleSubtitleAuthorAndImage();
} );

/**
 * Verify the social media buttons
 */
Then( 'Validate the social media buttons twitter, facebook , email', () => {
	articlePage.validateArticlePageHasSocialMediaButtons();
} );

/**
 * Verify the Article content and other details of side bar
 */
Then( 'Validate the Article has content and other details', () => {
	articlePage.validateArticlePageContentWithSideBarDetails();
} );

/**
 * Valdiate utag_data values
 */
Then( 'Validate Utag data values', () => {
	cy.validateUtagsDataValues();
} );
And( 'Validate Utag data values for Guest', () => {
	cy.validateUtagsDataValuesForGuestUser();
} );
And( 'Validate appropriate Tealium JS is loading for each environment in single article page', () => {
	cy.tealiumEnvironmentCheck();
} );

