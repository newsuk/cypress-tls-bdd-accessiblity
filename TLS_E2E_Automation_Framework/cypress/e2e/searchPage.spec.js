// <reference types="cypress" />
import * as searchPage from '../e2e/tls_page_elements/searchPage';

const environment = Cypress.env("ENV") || "prod";
const url = Cypress.env(`${environment}_url`);

beforeEach(() => {
	cy.visit(url, { timeout: 20000 });
	cy.acceptCookieBanner();
	searchPage.clickOnSearchIcon();
  });
  
describe('Search Page & User click on search icon', () => {

	it( 'User click on search icon & verify search bar is visible', () => {
		searchPage.verifySearchBarVisibility();
	});

	it( 'Entered the text and validate the text is displayed as entered', () => {
		searchPage.verifyTextUsingSearchBar();
	});

	/**
	 * Search by Author name
	 */
	it( 'Search the Author name and validate the its results', () => {
		searchPage.verifyAuthorUsingSearchBar();
	});

	/**
	 * Search by bookname
	 */
	it( 'Search the Book name and validate the its results', () => {
		searchPage.verifyBookTitleUsingSearchBar();
	});

	/**
	 * Search by Article name
	 */
	it( 'Search the Article and validate the its results', () => {
		searchPage.verifArticleNameUsingSearchBar();
	});

	it( 'Verify Show more button and its count in search page', () => {
		searchPage.verifyShowmore();
	});
})