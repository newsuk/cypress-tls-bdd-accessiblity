// <reference types="cypress" />

// Page Elements
const SEARCH_ICON = '.tls-header-navigation__search-icon';
const SEARCH_BOX = '.tls-header-navigation__right-controls .tls-header-navigation__search-icon';
const SEARCH_BAR = '.ais-SearchBox-form'
const SEARCH_RESUTLS = '.tls-search-core__stats';
const SEARCH_RESULTS_CORE = '.tls-search-core__hits';
const SHOW_MORE_BUTTON = '.tls-show-more';
const SEARCH_RESULTS_CORE_HIT = '.tls-search-core__hit';
//Variables
const LITERATURE = 'Literature';
const KEITH_MILLER = 'Keith Miller';
const LITERATURE_AND_TRANSFORMATION = 'LITERATURE AND TRANSFORMATION';
const BROKEN_PROMISES = 'Broken promises';
const BOOK_NAME = 'When two minds meet';

	/**
	  * To click on Search icon
	  */
	export const clickOnSearchIcon=()=> {
		//Click on search bar in home page
		cy.get( SEARCH_ICON ).should( 'be.visible' ).click();
	}

	/**
	  * To verify user is navigated to Search page
	  */
	export const verifySearchBarVisibility=()=> {
		//Valdiate the search box is visible
		cy.get( SEARCH_BOX, { timeout: 3000 } ).should('exist')
		cy.log( 'Search Bar is visible' );
	}

	/**
	  * Verify the text in search bar and validate appropriate vales are displayed
	  */
	export const verifyTextUsingSearchBar=()=> {
		verifySearchBarVisibility();
		cy.get( SEARCH_BOX ).click({force: true});
		cy.get( SEARCH_BAR ).type( LITERATURE );
		cy.get( SEARCH_RESUTLS ).contains(LITERATURE).should('be.visible');
		cy.log( 'Validation completed for the verify the text using search bar' );
	}

	/**
	 * Verify Author name
	 */
	export const verifyAuthorUsingSearchBar=()=> {
		verifySearchBarVisibility();
		cy.get( SEARCH_BOX ).click({force: true});
		cy.get( SEARCH_BAR ).type( KEITH_MILLER );
		cy.get( SEARCH_RESUTLS ).contains(KEITH_MILLER).should('be.visible');
		cy.log( 'Search by Author Name is working as expected' );

		cy.get(SEARCH_RESULTS_CORE_HIT).contains( KEITH_MILLER ).should('be.visible');
		cy.log( 'Validation completed for the verify the Author using search bar' );
	}

	/**
	 * Verify Book Title name
	 */
	export const verifyBookTitleUsingSearchBar=()=> {
		verifySearchBarVisibility();
		cy.get( SEARCH_BOX ).click({force: true});
		cy.get( SEARCH_BAR ).type( LITERATURE_AND_TRANSFORMATION );
		cy.get( SEARCH_RESUTLS ).contains( LITERATURE_AND_TRANSFORMATION ).should('be.visible');
		cy.log( 'Search by Book Title  is working as expected' );

		expect( cy.get( SEARCH_RESULTS_CORE ).eq( 0 ).contains( BOOK_NAME ) );
		cy.log( 'Validation completed for the verify the Book Name using search bar' );
	}

	/**
	 * Verify Article name
	 */
	export const  verifArticleNameUsingSearchBar=()=> {
		verifySearchBarVisibility();
		cy.get( SEARCH_BOX ).click({force: true});
		cy.get(SEARCH_BAR).type( BROKEN_PROMISES );
		cy.get( SEARCH_RESUTLS ).contains( BROKEN_PROMISES ).should('be.visible');
		cy.log( 'Search by Article Name is working as expected' );

		expect( cy.get( SEARCH_RESULTS_CORE ).eq( 0 ).contains( BROKEN_PROMISES ) );
		cy.log( 'Validation completed for the verify the Article Name using search bar' );
	}

	/**
	 * Showmore functionality
	 */
	export const verifyShowmore=()=> {
		cy.scrollTo( 'bottom' );
		//Scroll to bottom of page
		cy.get( SHOW_MORE_BUTTON ).scrollIntoView( { timeout: 3000 } );
		cy.get( SHOW_MORE_BUTTON ).click();
		cy.reload();
		cy.log( 'Show more is working as expected' );
	}




