/// <reference types="cypress" />
/**
 * Internal dependencies
 */
/**
 * External dependencies
 */
import '../../../support/e2e';

// Page Elements
const ERROR_404_IN_PAGE = '#tls-error-404-page';
const ERROR_404_MESSAGE = '.tls-error-404__message';
const RETURN_TO_HOME_PAGE = '.tls-error-404__content-wrapper > .tls-link';
const CURRENT_ISSUE_TITLE = '[data-index="0"] > .tls-link';
const CATEGORIES_TITLE = '[data-index="2"] > a';
const CATEGORIES_HISTORY_LINK = '.tls-submenu-navigation__menu > :nth-child(4) > .tls-link';
const SUBSCRIBE_BUTTON_ON_THE_HEADER = '.tls-button';

//Values
const ERROR_MESSAGE = 'Something went wrong...';
const RETURN_TO_HOME_PAGE_MESSAGE = 'Back to the homepage';
const URL_404 = 'iunv/';
const CURRENT_ISSUE = 'Current Issue';
const CATEGORIES = 'Categories';

class error404Page {
	/**
     * Author : Nithya
     * Navigates to irrelavant page
     */
	static navigateTo404ErrorPage() 	{
		//Get the current page , url append with 404 error page
		cy.url().then( ( url ) => {
			cy.visit( url + URL_404, { failOnStatusCode: false } );
			cy.acceptCookieBanner();
			cy.log( 'URl is navigaed to irrelavant page' );
		} );
	}

	/**
     * Author : Nithya
     * Validates the error page messages
     */
	static validate404ErrorPage() 	{
		cy.acceptCookieBanner();
		//Validate page is in 404
		cy.get( ERROR_404_IN_PAGE ).should( 'be.visible' );
		cy.get( ERROR_404_MESSAGE ).should( 'have.text', ERROR_MESSAGE );
		cy.get( RETURN_TO_HOME_PAGE ).should( 'have.text', RETURN_TO_HOME_PAGE_MESSAGE );
		cy.log( 'Error messages are validated in 404 Page' );
	}

	/**
     * Author:Nithya
     * Navigates to Current Issue page
     */
	static navigateToCurrentIssue404ErrorPage() {
		cy.acceptCookieBanner();
		//Navigates to the current issue page , url append with 404 error page
		cy.get( CURRENT_ISSUE_TITLE, { timeout: 4000 } ).invoke( 'text' ).then( ( value ) => {
			expect( value ).to.eq( CURRENT_ISSUE );
			cy.get( CURRENT_ISSUE_TITLE, { timeout: 4000 } ).click();
		} );
		cy.log( 'Successfully navigated to Current Issue page' );
	}

	/**
     * Author:Nithya
     * Navigates to Categories History page
     */
	static navigateCategoriesHistoryPage() {
		cy.acceptCookieBanner();
		//Navigates to the categories, history page , url append with 404 error page
		cy.get( CATEGORIES_TITLE, { timeout: 4000 } ).invoke( 'text' ).then( ( value ) => {
			expect( value ).to.eq( CATEGORIES );
			cy.get( CATEGORIES_TITLE, { timeout: 4000 } ).click();
			cy.get( CATEGORIES_HISTORY_LINK, { timeout: 4000 } ).click();
		} );

		cy.log( 'Successfully navigated to Categories History Page' );
	}

	/**
     * Author:Nithya
     * Navigates to Subscribe  page
     */
	static navigateSubscribePage() {
		//Navigates to the subscribe page , url append with 404 error page
		cy.acceptCookieBanner();
		cy.get( SUBSCRIBE_BUTTON_ON_THE_HEADER, { timeout: 4000 } ).click();
		cy.log( 'Successfully navigated to Subscribe Page' );
	}
}
export default error404Page;

