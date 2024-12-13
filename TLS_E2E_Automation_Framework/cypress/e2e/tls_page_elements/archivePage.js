//<reference types="cypress" />
// Page Elements

const ARCHIVE_PAGE_ELEMENT_ON_HOME_PAGE = '.tls-header-navigation__left-controls .tls-header-navigation__menu-list >div >a';
const YEAR_FILTER_DROP_DOWN = '.tls-date-filter__dropdown-btn .tls-card-standfirst';
const YEAR_LABEL_ACTIVE = 'div.tls-date-filter__content-label.active';
const YEAR_VALUE_LABEL = '.tls-date-filter__content-item';
const SEARCH_FILTER = '.tls-search-filter__input';
const SEARCH_CORE = '.tls-search-core__link > a';
const SEARCH_RESUTLS = '.tls-search-core__stats';
const BACKTOTOP = '.tls-back-to-top__arrow-icon';
const IMAGE_CARD = '.tls-issue-card__content';
const CLICK_HERE_NOT_SUB = '.tls-issue__subscribe-description > span>a';
const ARCHIVE_CAREDS_SECTION = '.tls-archive-issue-page__content';
const ARCHIVE_TITLE = '[data-index="3"] > .tls-link';

const ALGOLIA_NAV_LINK = '.tls-issue__explore-section-content-link > a';
const ALGOLOA_NAV_ARROW = '.tls-issue__explore-section-content-link> a.tls-issue__explore-section-content-icon> svg';

//const DATE_FORMAT = 'MMMM DD, YYYY';
const EXPECTED_RESULT_VALUE_1 = "Your search for '";
const EXPECTED_RESULT_VALUE_2 = "' returned [0-9]+ articles";
const VALUE = 'Beautiful';
const GALE_PAGE = 'galeapps.gale.com';
const ARCHIVE_PAGE = 'Archive: 1902–2016';

//const
const DEFALUT_YEARS = [ '2024','2023','2022', '2021', '2020', '2019', '2018', '2017', '2016', 'Pre 2016' ];
const ARCHIVE_TITLE_NAME = 'Archive';
const PATH = '/buy';

	/**
	 * Author : Chetana
	 * Navigate to archive page
	 */
	export const navigateToArchivePage=()=> {
		cy.get( ARCHIVE_PAGE_ELEMENT_ON_HOME_PAGE ).eq( 3 ).should( 'have.text', 'Archive' );
		cy.get( ARCHIVE_PAGE_ELEMENT_ON_HOME_PAGE ).eq( 3 ).click();
		cy.url().should( 'contain', 'archive' );
		cy.log( ' Navigated to Archive Page' );
	}

	/**
     * Navigates to Archive title on header
     */
	export const validateArchiveTitle=()=> {
		//Navigates to the categories, history page , url append with 404 error page
		cy.get( ARCHIVE_TITLE, { timeout: 4000 } ).invoke( 'text' ).then( ( value ) => {
		expect( value ).to.eq( ARCHIVE_TITLE_NAME );
		cy.get( ARCHIVE_TITLE, { timeout: 4000 } ).click();
		cy.url().should( 'include', ARCHIVE_TITLE_NAME.toLocaleLowerCase() );
	} );
		cy.log( 'Successfully validated to Archive title and its link' );
	}

	/**
	 * Navigate to archive page and validate it is loaded or not
	 */
	export const validateArchivePageIsLoaded=()=> {
		cy.url().should( 'contain', 'archive' );
	}

	/**
	 * Validate year filter
	 */
	export const validateYearFilterDropDown=()=> {
		//Check year filter drop down is visible
		cy.get( YEAR_FILTER_DROP_DOWN ).should( 'be.visible' );
		cy.get( YEAR_FILTER_DROP_DOWN ).click();
		let count = 0;
		//Check that we have upto pre2016 from 2022
		DEFALUT_YEARS.forEach( ( year ) => {
			cy.get( YEAR_VALUE_LABEL ).eq( count ).invoke( 'text' ).should( 'eq', year );
			cy.get( YEAR_VALUE_LABEL ).eq( count ).click( { force: true } );
			//Once the year is selected, check that label should be in active
			cy.get( YEAR_LABEL_ACTIVE ).scrollIntoView().should( 'have.length', 1 );
			count++;
		} );
		cy.log( 'Year Filter drop down is validated' );
	}

	/**
	 * Validate search filter
	 */
    export const validateSearchFilter=()=> {
		//Check search is visible
		cy.get( SEARCH_FILTER ).should( 'be.visible' );
		//Enter the text
		cy.get( SEARCH_FILTER ).type( 'Beautiful {enter} ' );
		//Validate the search all displayed
		cy.get( SEARCH_CORE ).invoke( 'text' ).should( 'eq', 'Back to all issues in the Archive' );
		cy.get( SEARCH_RESUTLS )
			.invoke( 'text' ).then( ( value ) => {
				const regex = new RegExp( EXPECTED_RESULT_VALUE_1 + VALUE + EXPECTED_RESULT_VALUE_2 );
				expect( value ).to.match( regex );
			} );
		cy.get( SEARCH_CORE ).click();
		validateArchivePageIsLoaded();
		cy.log( 'Search  is validated' );
	}

	/**
	 * Validate Back to Top button
	 */
	export const validateBackToTop=()=> {
		cy.get( IMAGE_CARD ).eq( 4 ).scrollIntoView( { duration: 3000 } );
		cy.get( IMAGE_CARD ).eq( 10 ).scrollIntoView( { duration: 3000 } );
		cy.get( BACKTOTOP ).click();
		//Check search is visible
		cy.get( SEARCH_FILTER ).should( 'be.visible' );
		//Check year filter drop down is visible
		cy.get( YEAR_FILTER_DROP_DOWN ).should( 'be.visible' );
		cy.log( 'Back To Top is working as expected' );
	}

	/**
	 * Algolia Navigation
	 */
	export const validateAlgoliaNavigation=()=> {
		//Validate the Algolia search has text of 1902-2016
		cy.get( ALGOLIA_NAV_LINK ).invoke( 'text' ).should( 'eq', ARCHIVE_PAGE );
		//Click on the link
		cy.get( ALGOLIA_NAV_LINK ).eq( 1 ).click();
		//Validate it  goes to gale page
		cy.url().should( 'contain', GALE_PAGE );
		cy.go( 'back' );
		//Click on arrow and check it is navigating to gale page
		cy.get( ALGOLOA_NAV_ARROW ).click();
		cy.url().should( 'contain', GALE_PAGE );
		cy.go( 'back' );
		cy.log( 'Algolia search Navigation is working' );
	}

	/**
	 * Validate Archive careds Section 
	 */
	export const verifyArchiveCaredsSection=()=> {
		cy.get( ARCHIVE_CAREDS_SECTION ).should ('be.visible')
		cy.log( 'Archive careds should load and should be visible as expected' );
	}

	/**
      * Validate the URL of the buy page
      */
	export const validateUrlOfTheSubscriptionPage=()=> {
		//Validate the URL of Subscription page
		cy.url().should( 'include', PATH );
		cy.log( 'User is naviagted Subscription page' );
	}

	/**
	 * Click Here for Not an subscriber
	 */
	export const validateClickHereNotSubscriber=()=> {
		cy.get( CLICK_HERE_NOT_SUB ).click();
		validateUrlOfTheSubscriptionPage();
		cy.log( 'Click Here for Not an subscriber is validated' );
	}