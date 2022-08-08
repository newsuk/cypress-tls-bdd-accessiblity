/// <reference types="cypress" />
/**
 * Internal dependencies
 */
import '../../../support/e2e';
/**
 * External dependencies
 */
import 'cypress-waitfor';

// Page Elements
const SEARCH_ICON = '.tls-header-navigation__search-icon';
const SEARCH_BOX = '.ais-SearchBox-input';
const SEARCH_RESUTLS = '.tls-search-core__stats';
const AUTHOR_NAME_IN_LINE = '.tls-byline__name';
const SEARCH_RESULTS_CORE = '.tls-search-core__hits';
const SHOW_MORE_BUTTON = '.tls-show-more';
const SEARCH_RESULTS_CORE_HIT = '.tls-search-core__hit';

//Variables
const LITERATURE = 'literature';
const KEITH_MILLER = 'Keith Miller';
const LITERATURE_AND_TRANSFORMATION = 'LITERATURE AND TRANSFORMATION';
const BROKEN_PROMISES = 'Broken promises';
const BOOK_NAME = 'When two minds meet';
const EXPECTED_RESULT_VALUE_1 = "Your search for '";
const EXPECTED_RESULT_VALUE_2 = "' returned [0-9]+ articles";

class searchPage {
	/**
      * Author : Yash
      * To click on Search icon
      */
	static clickOnSearchIcon() {
		cy.acceptCookieBanner();
		//Click on search bar in home page
		cy.get( SEARCH_ICON ).should( 'be.visible' ).click();
	}

	/**
      * Author : Yash
      * To verify user is navigated to Search page
      */
	static verifySearchBarVisibility() {
		cy.acceptCookieBanner();
		//Valdiate the search box is visible
		cy.get( SEARCH_BOX, { timeout: 3000 } ).should( 'be.visible' );
		cy.acceptCookieBanner();
		cy.log( 'Search Bar is visible' );
	}

	/**
      * Author : Nithya
      * Verify the text in search bar and validate appropriate vales are displayed
      */
	static verifyTextUsingSearchBar() {
		this.verifySearchBarVisibility();
		cy.acceptCookieBanner();
		cy.get( SEARCH_BOX ).type( LITERATURE, { delay: 1000 } );
		cy.acceptCookieBanner();
		cy.get( SEARCH_RESUTLS )
			.invoke( 'text' ).then( ( value ) => {
				cy.acceptCookieBanner();
				const regex = new RegExp( EXPECTED_RESULT_VALUE_1 + LITERATURE + EXPECTED_RESULT_VALUE_2 );
				expect( value ).to.match( regex );
			} );
		cy.log( 'Validation completed for the verify the text using search bar' );
	}

	/**
	 * Author : Nithya
	 * Verify Author name
	 */
	static verifyAuthorUsingSearchBar() {
		this.verifySearchBarVisibility();
		cy.get( SEARCH_BOX, { timeout: 3000 } ).type( KEITH_MILLER, { delay: 1000 } );
		cy.acceptCookieBanner();
		cy.get( SEARCH_RESUTLS )
			.invoke( 'text' ).then( ( value ) => {
				const regex = new RegExp( EXPECTED_RESULT_VALUE_1 + KEITH_MILLER + EXPECTED_RESULT_VALUE_2 );
				expect( value ).to.match( regex );
			} );

		cy.log( 'Search by Author Name is working as expected' );
		expect( cy.get( AUTHOR_NAME_IN_LINE )
			.invoke( 'text' )
			.should( 'include', KEITH_MILLER.toLocaleLowerCase() ) );
		cy.log( 'Validation completed for the verify the Author using search bar' );
	}

	/**
	 * Author : Nithya
	 * Verify Book Title name
	 */
	static verifyBookTitleUsingSearchBar() {
		this.verifySearchBarVisibility();
		cy.get( SEARCH_BOX, { timeout: 3000 } ).type( LITERATURE_AND_TRANSFORMATION, { delay: 1000 } );
		cy.acceptCookieBanner();
		cy.get( SEARCH_RESUTLS )
			.invoke( 'text' ).then( ( value ) => {
				cy.acceptCookieBanner();
				const regex = new RegExp( EXPECTED_RESULT_VALUE_1 + LITERATURE_AND_TRANSFORMATION + EXPECTED_RESULT_VALUE_2 );
				expect( value ).to.match( regex );
			} );
		cy.log( 'Search by Book Title  is working as expected' );
		expect( cy.get( SEARCH_RESULTS_CORE ).eq( 0 ).contains( BOOK_NAME ) );
		cy.log( 'Validation completed for the verify the Book Name using search bar' );
	}

	/**
	 * Author : Nithya
	 * Verify Article name
	 */
	static verifArticleNameUsingSearchBar() {
		this.verifySearchBarVisibility();
		cy.get( SEARCH_BOX, { timeout: 3000 } ).type( BROKEN_PROMISES, { delay: 1000 } );
		cy.acceptCookieBanner();
		cy.get( SEARCH_RESUTLS )
			.invoke( 'text' ).then( ( value ) => {
				cy.acceptCookieBanner();
				const regex = new RegExp( EXPECTED_RESULT_VALUE_1 + BROKEN_PROMISES + EXPECTED_RESULT_VALUE_2 );
				expect( value ).to.match( regex );
			} );
		cy.log( 'Search by Article Name is working as expected' );
		expect( cy.get( SEARCH_RESULTS_CORE ).eq( 0 ).contains( BROKEN_PROMISES ) );
		cy.log( 'Validation completed for the verify the Article Name using search bar' );
	}
	/**
	 * Author :Nithya
	 * Showmore functionality
	 */
	static verifyShowmore() {
		cy.scrollTo( 'bottom' );

		//Scroll to bottom of page
		cy.get( SHOW_MORE_BUTTON ).scrollIntoView( { timeout: 3000 } );
		//Check default count
		const beforeClickShowMore = Cypress.$( SEARCH_RESULTS_CORE_HIT ).length;
		expect( beforeClickShowMore ).to.eq( 20 );

		//Click on show more and check pages are appended
		cy.get( SHOW_MORE_BUTTON ).click( { force: true } );
		cy.reload();
		cy.acceptCookieBanner();
		cy.get( SHOW_MORE_BUTTON ).click( { force: true } );
		cy.get( SEARCH_RESULTS_CORE_HIT ).should( 'have.length', 40 );
		cy.log( 'Show more is working as expected' );
	}
}

export default searchPage;

