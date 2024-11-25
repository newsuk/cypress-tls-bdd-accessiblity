// <reference types="cypress" />
/**
 * Internal dependencies
 */
import '../../../support/e2e';

// Page Elements
const HOME_PAGE_SOCIAL_MEDIA_BUTTONS = 'span[class^="tls-header-navigation__social-icon"] > a[data-follow=';
const SEARCH_ICON = '.tls-header-navigation__search-icon';
const SUBSCRIBE_BUTTON_ON_THE_HEADER = '.tls-header-navigation__button-subscribe > a';
const LOGIN_BUTTON_ON_HEADER = '.tls-header-navigation__link-login > a';
const ARCHIVE_TITLE = '[data-index="3"] > .tls-link';
const SHOP_TITLE = '[data-index="4"] > .tls-link';
const EXPLORE_TITLE = '[data-index="1"] > .tls-link';
const EXPLORE_CATEGORIES = '.tls-submenu-navigation__menu > li>a';
const NEW_TO_THE_TLS_LINKS = '.tls-article-body > p > a';
const FOOTER_LOGO = '.tls-footer__logo';
const FOOTER_TC_MENU = '.tls-footer__tc__menu>a';
const TC_HEADER = 'h2.tls-aggregation__title';
const PRIVACY_HEADER_LOGO = '.header-logo';
const TLS_PODCST_HEADER = '.tls-footer__podcast>h3';
const PODCASTS_LIST = '.tls-footer__podcast-container>div>a + a';
const FOOTER_LIST = '.tls-footer__body-container > div>ul>li>a';
const ABOUTUS_LOGO = '.wp-image-199';

//Variables
const TWITTER = 'twitter';
const FACEBOOK = 'facebook';
const INSTAGRAM = 'instagram';
const SUBSCRIBE = 'Subscribe';
const LOGIN = 'Login';
const ARCHIVE_TITLE_NAME = 'Archive';
const SHOP_TITLE_NAME = 'Shop';
const EXPLORE = 'Explore';
const NEW_TO_THE_TLS = 'New to the TLS?';
const HIGHLIGHTS = 'Highlights';
const LONGREADS = 'Long reads';
const LISTEN = 'Listen';
const OUR_PODCAST_LINK = '/categories/regular-features/the-podcast/';
const TLS_ARCHIVE_LINK = '/archive/';
const MARY_BEARD_LINK = '/categories/regular-features/mary-beard-a-dons-life/';
const CLICK_HERE_LINK = '/buy/';
const NEW_TO_THE_TLS_SITE = '/new-to-the-tls/';
const HOME = 'Home';
const REGULAR_FEATURES = 'Regular features';
const THE_ARCHIVE = 'The Archive';
const CATEGORIES = 'Categories';
const ABOUTUS = 'About us';
const TERMSCONDITIONS = 'Terms & Conditions';
const PRIVACY = 'Privacy';
const COOKIE_SETTING = 'Cookie Settings';
const GOOGLE_PODCASTS = 'Google Podcasts';
const SPOTIFY = 'Spotify';
const APPLE_PODCASTS = 'Apple Podcasts';

class genericPage {
	/**
	 * Validate the Home Page has the socila media buttons of Facebook, twitter, instagram
	 * Author:Nithya
	 */
	static validateHomePageHasSocialMediaButtonsAndLinks() {
		const socialMedias = [ TWITTER, FACEBOOK, INSTAGRAM ];
		//Check all the social medias
		socialMedias.forEach( ( socialMedia ) => {
			cy.get( HOME_PAGE_SOCIAL_MEDIA_BUTTONS + socialMedia + ']', { timeout: 5000 } ).scrollIntoView().should( 'be.visible' );
			cy.get( HOME_PAGE_SOCIAL_MEDIA_BUTTONS + socialMedia + ']', { timeout: 5000 } ).should( 'have.attr', 'href' ).and( 'include', socialMedia ).then( ( href ) => {
				cy.request( href ).then( ( response ) => {
					expect( response.status ).to.eq( 200 );
				} );
			} );
			cy.log( 'Validations completed of Socila media' + socialMedia );
		} );
	}

	/**
	 * Validate the HomePage Subscribe, Search and Login Buttons
	 * Author:Nithya
	 */
	static validateHomePageSubscribeSearchAndLoginButtoons() {
		cy.get( SEARCH_ICON ).should( 'be.visible' );
		cy.get( SUBSCRIBE_BUTTON_ON_THE_HEADER ).should( 'be.visible' ).invoke( 'text' ).should( 'include', SUBSCRIBE );
		cy.get( LOGIN_BUTTON_ON_HEADER ).should( 'be.visible' ).invoke( 'text' ).should( 'include', LOGIN );
		cy.log( 'Validations completed of Subscribe, Search and Login button' );
	}
	/**
     * Author:Nithya
     * Navigates to Archive title on header
     */
	static validateArchiveTitle() {
		cy.acceptCookieBanner();
		//Navigates to the categories, history page , url append with 404 error page
		cy.get( ARCHIVE_TITLE, { timeout: 4000 } ).invoke( 'text' ).then( ( value ) => {
			expect( value ).to.eq( ARCHIVE_TITLE_NAME );
			cy.get( ARCHIVE_TITLE, { timeout: 4000 } ).click();
			cy.acceptCookieBanner();
			cy.url().should( 'include', ARCHIVE_TITLE_NAME.toLocaleLowerCase() );
		} );
		cy.log( 'Successfully validated to Archive title and its link' );
	}

	/**
     * Author:Nithya
     * Navigates to Shop title on header
     */
	static validateShopOnTitle() {
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
     * Author:Nithya
     * Validate the Explore title on Header
     */
	static validateExploreOnTitle() {
		cy.acceptCookieBanner();
		cy.get( EXPLORE_TITLE ).invoke( 'text' ).should( 'include', EXPLORE );
		cy.log( 'Successfully validated to Explore title on Header' );
	}

	/**
     * Author:Nithya
     * Validate the Explore's subcategories
     */
	static validateExploreCategories() {
		cy.acceptCookieBanner();
		cy.get( EXPLORE_TITLE ).invoke( 'text' ).should( 'include', EXPLORE );
		cy.acceptCookieBanner();
		//Validate  all categories of Explore
		const exploreCategories = [ NEW_TO_THE_TLS, HIGHLIGHTS, LONGREADS, LISTEN ];
		let count = 0;
		//Iterate all the categories of Explore and validate it is properly naivagates to their link
		exploreCategories.forEach( ( exploreCategory ) => {
			cy.get( EXPLORE_TITLE ).click();
			cy.get( EXPLORE_CATEGORIES ).eq( count ).invoke( 'text' ).should( 'eq', exploreCategory );
			cy.get( EXPLORE_CATEGORIES ).eq( count ).should( 'have.attr', 'href' ).then( ( link ) => {
				const valueChange = exploreCategory.replace( /\s/g, '-' );
				cy.visit( link ).url().should( 'include', valueChange.toLocaleLowerCase().replace( '?', '' ).trim() );
				cy.acceptCookieBanner();
			} );
			count++;
			cy.clickTLSLogo();
		} );
		cy.log( 'Successfully validated to Explore Categories' );
	}

	/**
     * Author:Nithya
     * Navigate to the Explore's NEW TO TLS?
     */
	static navigateToExploreCategoryNEWTOTLS() {
		cy.acceptCookieBanner();
		cy.get( EXPLORE_TITLE ).invoke( 'text' ).should( 'include', EXPLORE );
		cy.get( EXPLORE_TITLE ).click();
		//Navigate to NEW to TLS and verify using the location
		cy.get( EXPLORE_CATEGORIES ).eq( 0 ).click();
		cy.location( 'pathname' ).should( 'eq', NEW_TO_THE_TLS_SITE );
		cy.log( 'Successfully navigated to NEW TO TLS' );
	}

	/**
     * Author:Nithya
     * Navigate to the Explore's NEW TO TLS?
     */
	static validateNEWTOTLSPageLinks() {
		this.navigateToExploreCategoryNEWTOTLS();
		//Create as key value pair
		const newToTlsLinks = {
			'our podcast': OUR_PODCAST_LINK,
			'TLS archive': TLS_ARCHIVE_LINK,
			'Mary Beard': MARY_BEARD_LINK,
			'click here': CLICK_HERE_LINK,
		};
		//Iterate each values
		for ( const [ key, value ] of Object.entries( newToTlsLinks ) ) {
			cy.acceptCookieBanner();
			//Click each links and check it is navigate to proper page
			cy.get( NEW_TO_THE_TLS_LINKS, { timeout: 50000 } ).contains( key ).click();
			cy.log( `${ key }: ${ value }` );
			cy.acceptCookieBanner();
			cy.location( 'pathname' ).should( 'eq', value );
			cy.log( 'Verified our' + key + ' link' );
			cy.go( 'back' );
		}
		cy.log( 'Successfully validated all links NEW TO TLS page' );
	}
	/**
 	* Validate the Footer Logo and Main topic under Footer section
 	*/

	static validateFooterLogoAndMainTopics() {
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
	static validateTermConditionPrivacyandCookieInFooter() {
		cy.scrollTo( 'bottom' );
		cy.acceptCookieBanner();
		//Validate the TC menu
		const footerTC = [ TERMSCONDITIONS, PRIVACY, COOKIE_SETTING ];
		for ( let i = 0; i < footerTC.length; i++ ) {
			cy.get( FOOTER_TC_MENU ).eq( i ).invoke( 'text' ).should( 'eq', footerTC[ i ] )
			;
		}
		//Click on TC
		cy.get( FOOTER_TC_MENU ).eq( 0 ).click();
		//Validate proper page is navigated
		cy.get( TC_HEADER ).invoke( 'text' ).should( 'eq', TERMSCONDITIONS );
		cy.clickTLSLogo();
		cy.scrollTo( 'bottom' );
		//Click on Privavy
		cy.get( FOOTER_TC_MENU ).eq( 1 ).click();
		//Validate proper page is navigated
		cy.get( PRIVACY_HEADER_LOGO, { timeout: 4000 } ).should( 'be.visible' );
		//Load the URL
		cy.visit( Cypress.env( `${ Cypress.env( 'ENV' ) }_url` ) );
		cy.log( 'Successfully validated Terms and Conditions Menu' );
	}

	/**
	 * Validate the podcast in footer,check podcase has Google podcast,Apple Podcasts and Spotify
	 */
	static validatePodcasts() {
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
	static validateAboutUs() {
		cy.scrollTo( 'bottom' );
		cy.acceptCookieBanner();
		cy.get( FOOTER_LIST ).eq( 5 ).invoke( 'text' ).should( 'eq', ABOUTUS );
		cy.get( FOOTER_LIST ).eq( 5 ).click();
		cy.get( TC_HEADER, { timeout: 5000 } ).invoke( 'text' ).should( 'eq', ABOUTUS );
		cy.get( ABOUTUS_LOGO, { timeout: 3000 } ).should( 'be.visible' );
		cy.log( 'Verified that user is able to navigate to About Us page by clicking on the About Us link given on footer section' );
		cy.log( 'Verified that user is able to see About us and TLS logo on About us page' );
	}
}

export default genericPage;
