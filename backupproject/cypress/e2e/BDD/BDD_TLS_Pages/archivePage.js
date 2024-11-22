/**
 * External dependencies
 */
/**
 * Internal dependencies
 */
import genericPage from './genericPage';
import subscriptionPage from './subscriptionPage';

// Page Elements
const ARCHIVE_PAGE_ELEMENT_ON_HOME_PAGE = '.tls-header-navigation__menu-list > div > a';
const YEAR_FILTER_DROP_DOWN = '.tls-date-filter__dropdown-btn';
const YEAR_LABEL_ACTIVE = 'div.tls-date-filter__content-label.active';
const YEAR_VALUE_LABEL = '.tls-date-filter__content-item';
const SEARCH_FILTER = '.tls-search-filter__input';
const SEARCH_CORE = '.tls-search-core__link > a';
const SEARCH_RESUTLS = '.tls-search-core__stats';
const BACKTOTOP = '.tls-back-to-top__arrow-icon';
const IMAGE_CARD = '.tls-issue-card__content';
const ALGOLIA_NAV_LINK = '.tls-issue__explore-section-content-link > a';
const ALGOLOA_NAV_ARROW = '.tls-issue__explore-section-content-link> a.tls-issue__explore-section-content-icon> svg';
const CLICK_HERE_NOT_SUB = '.tls-issue__subscribe-description > span>a';
const SHOWMORE_BUTTON = '.tls-show-more';
const ARCHIVE_CAREDS = '.tls-issue-card';

//const DATE_FORMAT = 'MMMM DD, YYYY';
const EXPECTED_RESULT_VALUE_1 = "Your search for '";
const EXPECTED_RESULT_VALUE_2 = "' returned [0-9]+ articles";
const VALUE = 'Beautiful';
const GALE_PAGE = 'galeapps.gale.com';
const ARCHIVE_PAGE = 'Archive: 1902–2016';

//const
const DEFALUT_YEARS = [ '2022', '2021', '2020', '2019', '2018', '2017', '2016', 'Pre 2016' ];

class archivePage {
	/**
	 * Author : Nithya
	 * Navigate to archive page
	 */
	static navigateToArchivePage() {
		cy.get( ARCHIVE_PAGE_ELEMENT_ON_HOME_PAGE ).eq( 3 ).should( 'have.text', 'Archive' );
		cy.get( ARCHIVE_PAGE_ELEMENT_ON_HOME_PAGE ).eq( 3 ).click();
		cy.url().should( 'contain', 'archive' );
		cy.log( ' Navigated to Archive Page' );
	}

	/**
	 * Author : Nithya
	 * Navigate to archive page and validate it is loaded or not
	 */
	static validateArchivePageIsLoaded() {
		cy.url().should( 'contain', 'archive' );
	}

	/**
	 * Author:Nithya
	 * Validate year filter
	 */
	static validateYearFilterDropDown() {
		cy.acceptCookieBanner();
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
	 * Author:Nithya
	 * Validate saerch filter
	 */
	static validateSearchFilter() {
		cy.acceptCookieBanner();
		//Check search is visible
		cy.get( SEARCH_FILTER ).should( 'be.visible' );
		//Enter the text
		cy.get( SEARCH_FILTER ).type( 'Beautiful {enter} ' );
		//Validate the search all displayed
		cy.get( SEARCH_CORE ).invoke( 'text' ).should( 'eq', 'Back to all issues in the Archive' );
		cy.get( SEARCH_RESUTLS )
			.invoke( 'text' ).then( ( value ) => {
				cy.acceptCookieBanner();
				const regex = new RegExp( EXPECTED_RESULT_VALUE_1 + VALUE + EXPECTED_RESULT_VALUE_2 );
				expect( value ).to.match( regex );
			} );
		cy.get( SEARCH_CORE ).click();
		this.validateArchivePageIsLoaded();
		cy.log( 'Search  is validated' );
	}

	static validateSocialMediaAndLoginButton() {
		genericPage.validateHomePageHasSocialMediaButtonsAndLinks();
		genericPage.validateHomePageSubscribeSearchAndLoginButtoons();
	}

	/**
	 * Validate Back to Top button
	 */
	static validateBackToTop() {
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
	static validateAlgoliaNavigation() {
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
	 * Click Here for Not an subscriber
	 */
	static validateClickHereNotSubscriber() {
		cy.get( CLICK_HERE_NOT_SUB ).click();
		subscriptionPage.validateUrlOfTheSubscriptionPage();
		cy.log( 'Click Here for Not an subscriber is validated' );
	}

	/**
	 * Author:Roopa
	 * Validate Show more button
	 */
	static verifyShowmore() {
		cy.get( ARCHIVE_CAREDS ).eq( 9 ).scrollIntoView( { duration: 3000 } );
		cy.get( ARCHIVE_CAREDS ).eq( 12 ).scrollIntoView( { duration: 3000 } );
		cy.get( ARCHIVE_CAREDS ).eq( 45 ).scrollIntoView( { duration: 3000 } );
		cy.get( ARCHIVE_CAREDS ).should( 'have.length', 52 );
		//Click on show more and check pages are appended
		cy.get( SHOWMORE_BUTTON ).scrollIntoView( { timeout: 3000 } ).click( { force: true } );
		cy.get( ARCHIVE_CAREDS ).eq( 45 ).scrollIntoView( { duration: 2000 } );
		let count = 52;
		for ( let i = 0; i <= 10; i++ ) {
			cy.get( ARCHIVE_CAREDS ).eq( count ).scrollIntoView( { duration: 1000 } );
			count = count + 5;
		}
		cy.get( ARCHIVE_CAREDS ).should( 'have.length', 104 );
		cy.log( 'Show more is working as expected' );
	}
}

export default archivePage;
