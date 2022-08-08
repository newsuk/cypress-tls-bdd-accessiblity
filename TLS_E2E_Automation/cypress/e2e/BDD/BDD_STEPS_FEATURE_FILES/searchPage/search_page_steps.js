/**
 * External dependencies
 */
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
/**
  * Internal dependencies
  */
/**
 * Internal dependencies
 */
import searchPage from '../../BDD_TLS_Pages/searchPage';
import '.../../../../support/e2e';

Given( 'User is clicks on TLS logo', () => {
	cy.clickTLSLogo();
} );
/**
 * TNLST-324,325
 */

When( 'User click on search icon', () => {
	searchPage.clickOnSearchIcon();
} );
Then( 'User should be able to navigate to Search page', () => {
	searchPage.verifySearchBarVisibility();
} );
And( 'Entered the text and validate the text is displayed as entered', () => {
	searchPage.verifyTextUsingSearchBar();
} );
/**
 * Search by bookname
 */
Then( 'Search the Book name and validate the its results', () => {
	searchPage.verifyBookTitleUsingSearchBar();
} );

/**
 * Search by Author name
 */
Then( 'Search the Author name and validate the its results', () => {
	searchPage.verifyAuthorUsingSearchBar();
} );
/**
 * Search by Article name
 */
Then( 'Search the Article and validate the its results', () => {
	searchPage.verifArticleNameUsingSearchBar();
} );

Then( 'Verify Show more button and its count in search page', () => {
	searchPage.verifyShowmore();
} );
/**
 * Tealium JS
 */
Then( 'Validate appropriate Tealium JS is loading for each environment in single search page', () => {
	cy.tealiumEnvironmentCheck();
} );

