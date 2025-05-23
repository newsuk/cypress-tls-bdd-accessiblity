// Page Elements
const EXPLORE_TITLE = '[data-index="1"] > .tls-link';
const EXPLORE_CATEGORIES = '.tls-submenu-navigation__menu > li>a';
const NEW_TO_THE_TLS_LINKS = '.tls-article-body > p > a';

//variables
const WELCOME_TO_THE_TLS = 'Welcome to the TLS?';
const HIGHLIGHTS = 'Highlights';
const LONGREADS = 'Long reads';
const LISTEN = 'Listen';
const OUR_PODCAST_LINK = '/categories/regular-features/the-podcast';
//const TLS_ARCHIVE_LINK = '/archive/';
const MARY_BEARD_LINK = '/categories/regular-features/mary-beard-a-dons-life';
const CLICK_HERE_LINK = '/buy';
const WELCOME_TO_THE_TLS_SITE = '/welcome-to-the-tls';

/**
* Validate the Explore title on Header
*/
export const validateExploreOnTitle=()=> {
	cy.get( EXPLORE_TITLE ).invoke( 'text' ).should( 'include', 'Explore' );
	cy.log( 'Successfully validated to Explore title on Header' );
}
/**
 * Validate the Explore's subcategories
 */
export const validateExploreCategories=()=> {
	cy.get( EXPLORE_TITLE ).invoke( 'text' ).should( 'include', 'Explore' );
	//Validate  all categories of Explore
	const exploreCategories = [ WELCOME_TO_THE_TLS, HIGHLIGHTS, LONGREADS, LISTEN ];
	let count = 0;
	//Iterate all the categories of Explore and validate it is properly naivagates to their link
	exploreCategories.forEach( ( exploreCategory ) => {
		cy.get( EXPLORE_TITLE ).click();
		//cy.get( EXPLORE_CATEGORIES ).eq( count ).invoke( 'text' ).should( 'eq', exploreCategory );
		cy.get( EXPLORE_CATEGORIES ).eq( count ).should( 'have.attr', 'href' ).then( ( link ) => {
			const valueChange = exploreCategory.replace( /\s/g, '-' );
			cy.visit( link ).url().should( 'include', valueChange.toLocaleLowerCase().replace( '?', '' ).trim() );
		} );
		count++;
		cy.clickTLSLogo();
	} );
	cy.log( 'Successfully validated to Explore Categories' );
}

/**
 * Navigate to the Explore's NEW TO TLS?
 */
export const navigateToExploreCategoryNEWTOTLS=()=> {
	cy.get( EXPLORE_TITLE ).invoke( 'text' ).should( 'include', 'Explore' );
	cy.get( EXPLORE_TITLE ).click();
	//Navigate to NEW to TLS and verify using the location
	cy.get( EXPLORE_CATEGORIES ).eq( 0 ).click();
	cy.location( 'pathname' ).should( 'eq', WELCOME_TO_THE_TLS_SITE );
	cy.log( 'Successfully navigated to NEW TO TLS' );
}

/**
 * Navigate to the Explore's NEW TO TLS?
 */
export const validateNEWTOTLSPageLinks=()=> {
	navigateToExploreCategoryNEWTOTLS();
	//Create as key value pair
	const newToTlsLinks = {
		'our podcast': OUR_PODCAST_LINK,
		//'the Archives': TLS_ARCHIVE_LINK,
		'Mary Beard': MARY_BEARD_LINK,
		'click here': CLICK_HERE_LINK,
	};
	//Iterate each values
	for ( const [ key, value ] of Object.entries( newToTlsLinks ) ) {
		//Click each links and check it is navigate to proper page
		cy.get( NEW_TO_THE_TLS_LINKS, { timeout: 50000 } ).contains( key ).click();
		cy.log( `${ key }: ${ value }` );
		cy.location( 'pathname' ).should( 'eq', value );
		cy.log( 'Verified our' + key + ' link' );
		cy.go( 'back' );
	}
	cy.log( 'Successfully validated all links NEW TO TLS page' );
}