/// <reference types="cypress" />
/**
 * Internal dependencies
 */
import '../../../support/e2e';
// Page Elements
const EXPLORE = '[data-index="1"] > .tls-link';
const LONGREADS = '.tls-submenu-navigation__menu > :nth-child(3) > .tls-link';
const TITLE = '.tls-aggregation__title';
const DESCRIPTION = '.tls-aggregation__description';
const IMAGE = '.tls-card-horizontal-medium__wrapper > a';
const CARD_HEADLINE = 'a.tls-card-headline';
const BYLINE = 'div.tls-byline > span > a';
const LABEL = 'div.tls-article-label > span > a';
const CARD_SUBHEADLINE = '.tls-card-standfirst';
const SHOW_MORE_BUTTON = '.tls-show-more';
const SEARCH_RESULTS_CORE_HIT = '.tls-card-horizontal-medium__wrapper-link';

// Const or Variables
const PATH = '/topics/long-reads/';

class topicsPage {
	/**
      * Author : Roopa
      * Click Explore button on the Header
      */
	static clickExploreButton() {
		//Click on Explore button
		cy.get( EXPLORE, { timeout: 3000 } ).click();
	}
	static clickLongreadsButton() {
		//Click on Longreads button
		cy.get( LONGREADS ).click();
	}
	static validateUrlOfTheLongreadsPage() {
		//Validate the URL of Longreads page
		cy.url().should( 'include', PATH );
		cy.log( 'User is naviagted Longreads Topics page' );
	}
	/**
      * Author : Roopa
      * Validate Title and Description of the page
    */
	static validateTitleAndDescription() {
		//Validate title of the page
		cy.get( TITLE ).invoke( 'text' ).should( 'not.be.empty' );
		//Validate description of the title
		cy.get( DESCRIPTION ).invoke( 'text' ).should( 'not.be.empty' );
		cy.log( 'Title and Description of the page is validated' );
	}
	/**
      * Author : Roopa
      * Valiadte article name, Image, byline inside aggregation page

    */
	static validateContentOfArticleList() {
		//Valiadte article name
		cy.get( CARD_HEADLINE ).then( ( $element ) => {
			const countValueOfCards = $element.length;
			cy.log( countValueOfCards );
			for ( let intialValue = 0; intialValue < countValueOfCards; intialValue++ ) {
				cy.get( CARD_HEADLINE ).eq( intialValue ).should( 'have.attr', 'href' ).then( ( href ) => {
					cy.request( href )
						.then( ( response ) => {
							expect( response.status ).to.eq( 200 );
						} );
				} );
				cy.log( 'Artical name is validated in topics page' );
				//Valiadte article Image
				cy.get( IMAGE ).eq( intialValue ).should( 'have.attr', 'href' ).then( ( href ) => {
					cy.request( href )
						.then( ( response ) => {
							expect( response.status ).to.eq( 200 );
						} );
				} );
				cy.log( 'Image is validated in topics page' );
				//Valiadte article subheading
				cy.get( CARD_SUBHEADLINE ).eq( intialValue ).scrollIntoView().should( 'be.visible' );
				cy.log( 'Article subheading is validated in topics page' );
				//Valiadte label
				cy.acceptCookieBanner();
				cy.get( LABEL ).eq( intialValue ).should( 'have.attr', 'href' ).then( ( href ) => {
					cy.request( href )
						.then( ( response ) => {
							expect( response.status ).to.eq( 200 );
						} );
				} );
				cy.log( 'Article label is validated in topics page' );
				//Valiadte byline
				cy.acceptCookieBanner();
				cy.get( BYLINE, { timeout: 3000 } ).eq( intialValue ).should( 'have.attr', 'href' ).then( ( href ) => {
					cy.request( href )
						.then( ( response ) => {
							expect( response.status ).to.eq( 200 );
						} );
				} );
				cy.log( 'Byline is validated in topics page' );
			}
		} );
	}
	/**
	 * Author :Roopa
	 * Showmore functionality
	 */
	static verifyShowmore() {
		cy.scrollTo( 'bottom' );

		//Scroll to bottom of page
		cy.get( SHOW_MORE_BUTTON ).scrollIntoView( { timeout: 3000 } );
		cy.get( SEARCH_RESULTS_CORE_HIT ).should( 'have.length', 10 );

		//Click on show more and check pages are appended
		cy.get( SHOW_MORE_BUTTON ).scrollIntoView( { timeout: 3000 } ).click( { force: true } );
		cy.scrollTo( 'top' );
		cy.get( SEARCH_RESULTS_CORE_HIT ).eq( 9 ).scrollIntoView( { duration: 3000 } );
		cy.get( SEARCH_RESULTS_CORE_HIT ).eq( 13 ).scrollIntoView( { duration: 3000 } );
		cy.get( SEARCH_RESULTS_CORE_HIT ).eq( 16 ).scrollIntoView( { duration: 3000 } );
		cy.get( SEARCH_RESULTS_CORE_HIT ).should( 'have.length', 20 );
		cy.log( 'Show more is working as expected' );
	}
}
export default topicsPage;
