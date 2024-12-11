
// <reference types="cypress" />
/**
 * Internal dependencies
 */
// Page Elements
const SEARCH_ICON = '.tls-header-navigation__search-icon';
const SUBSCRIBE_BUTTON_ON_THE_HEADER = '.tls-header-navigation__button-subscribe > a';
const LOGIN_BUTTON_ON_HEADER = '.tls-header-navigation__link-login > a';
const SHOP_TITLE = '[data-index="4"] > .tls-link';

const FOOTER_LOGO = '.tls-footer__logo';
const FOOTER_TC_MENU = '.tls-footer__tc__menu > a';
const TC_HEADER = 'h2.tls-aggregation__title';
const PRIVACY_HEADER_LOGO = '#np_header_top';
const TLS_PODCST_HEADER = '.tls-footer__podcast>h3';
const PODCASTS_LIST = '.tls-footer__podcast-container>div>a + a';
const FOOTER_LIST = '.tls-footer__body-container > div>ul>li>a';
const ABOUTUS_LOGO = '.wp-image-199';

//Variables
const SUBSCRIBE = 'Subscribe';
const LOGIN = 'Login';

const SHOP_TITLE_NAME = 'Shop';
const EXPLORE = 'Explore';

const HOME = 'Home';
const REGULAR_FEATURES = 'Regular features';
const THE_ARCHIVE = 'The Archive';
const CATEGORIES = 'Categories';
const ABOUTUS = 'About us';
const TERMSCONDITIONS = 'Terms & Conditions';
const PRIVACY = 'Privacy';
const GOOGLE_PODCASTS = 'Google Podcasts';
const SPOTIFY = 'Spotify';
const APPLE_PODCASTS = 'Apple Podcasts';



	/**
	 * Validate the HomePage Subscribe, Search and Login Buttons
	 */
	export const validateHomePageSubscribeSearchAndLoginButtoons=()=> {
		cy.get( SEARCH_ICON ).should( 'be.visible' );
		cy.get( SUBSCRIBE_BUTTON_ON_THE_HEADER ).should( 'be.visible' ).invoke( 'text' ).should( 'include', SUBSCRIBE );
		cy.get( LOGIN_BUTTON_ON_HEADER ).should( 'be.visible' ).invoke( 'text' ).should( 'include', LOGIN );
		cy.log( 'Validations completed of Subscribe, Search and Login button' );
	}
	
	/**
     * Navigates to Shop title on header
     */
	export const validateShopOnTitle=()=> {
		cy.acceptCookieBanner();
		//Navigates to the categories, history page , url append with 404 error page
		cy.get( SHOP_TITLE, { timeout: 4000 } ).invoke( 'text' ).then( ( value ) => {
			expect( value ).to.eq( SHOP_TITLE_NAME );
			cy.get( SHOP_TITLE, { timeout: 4000 } ).should( 'have.attr', 'href' ).then( ( href ) => {
				cy.request( href ).then( ( response ) => {
					expect( response.status ).to.eq( 200 );
				} );
			} );
		} );
		cy.log( 'Successfully validated to Shop title and its link' );
	}
	
	/**
 	* Validate the Footer Logo and Main topic under Footer section
 	*/
	export const validateFooterLogoAndMainTopics=()=> {
		cy.scrollTo( 'bottom' );
		cy.acceptCookieBanner();
		cy.get( FOOTER_LOGO ).should( 'be.visible' );
		const footerMainTopics = [ HOME, REGULAR_FEATURES, THE_ARCHIVE, EXPLORE, CATEGORIES, ABOUTUS, SHOP_TITLE_NAME ];
		for ( let i = 0; i < footerMainTopics.length; i++ ) {
			cy.get( FOOTER_LIST ).eq( i ).invoke( 'text' ).should( 'eq', footerMainTopics[ i ] )
			;
		}
		cy.log( 'Successfully validated Footer logo and main topics' );
	}

	/**
	 * Validate the terms condtions, privacy and cookie settings
	 */
	export const validateTermConditionPrivacyandCookieInFooter=()=> {
		cy.scrollTo( 'bottom' );
		cy.acceptCookieBanner();
		//Validate the TC menu
		const footerTC = [ TERMSCONDITIONS, PRIVACY ];
		for ( let i = 0; i < footerTC.length; i++ ) {
			cy.get( FOOTER_TC_MENU ).eq( i ).invoke( 'text' ).should( 'eq', footerTC[ i ] );
		}
		//Click on TC
		cy.get( FOOTER_TC_MENU ).eq( 0 ).click({force: true});
		//Validate proper page is navigated
		cy.get( TC_HEADER ).invoke( 'text' ).should( 'eq', TERMSCONDITIONS );
		cy.scrollTo( 'bottom' );
		//Click on Privavy
		cy.get( FOOTER_TC_MENU ).eq( 1 ).click().should('be.visible');
		//Validate proper page is navigated
		cy.get( PRIVACY_HEADER_LOGO, { timeout: 4000 }  ).should( 'be.visible' );
		cy.log( 'Successfully validated Terms and Conditions Menu' );
	}

	/**
	 * Validate the podcast in footer,check podcase has Google podcast,Apple Podcasts and Spotify
	 */
	export const validatePodcasts=()=> {
		cy.scrollTo( 'bottom' );
		cy.acceptCookieBanner();
		cy.get( TLS_PODCST_HEADER ).invoke( 'text' ).should( 'eq', 'Subscribe to the podcast' );
		//Validate the podcas menu
		const footerPodcast = [ GOOGLE_PODCASTS, SPOTIFY, APPLE_PODCASTS ];
		for ( let i = 0; i < footerPodcast.length; i++ ) {
			//Checks the value and its links are working
			cy.get( PODCASTS_LIST ).eq( i ).invoke( 'text' ).should( 'eq', footerPodcast[ i ] );
			cy.get( PODCASTS_LIST ).eq( i ).should( 'have.attr', 'href' ).then( ( link ) => {
				cy.request( link ).then( ( response ) => {
					expect( response.status ).to.eq( 200 );
				} );
			} );
		}
		cy.log( 'Successfully validated Podcasts' );
	}

	/**
	 * Validate About us
	 */
	export const validateAboutUs=()=> {
		cy.scrollTo( 'bottom' );
		cy.acceptCookieBanner();
		cy.get( FOOTER_LIST ).eq( 5 ).invoke( 'text' ).should( 'eq', ABOUTUS );
		cy.get( FOOTER_LIST ).eq( 5 ).click({force: true});
		cy.get( TC_HEADER, { timeout: 5000 } ).invoke( 'text' ).should( 'eq', ABOUTUS );
		cy.get( ABOUTUS_LOGO, { timeout: 3000 } ).should( 'be.visible' );
		cy.log( 'Verified that user is able to navigate to About Us page by clicking on the About Us link given on footer section' );
		cy.log( 'Verified that user is able to see About us and TLS logo on About us page' );
	}

