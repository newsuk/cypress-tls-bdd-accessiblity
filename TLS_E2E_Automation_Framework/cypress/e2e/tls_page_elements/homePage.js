

/**
 * Internal dependencies
 */
/**
 * External dependencies
 */

import 'cypress-wait-until';

// Page Elements
const TLS_LOGO = '.tls-header-navigation__logo>svg';
const TLS_HOMEPAGE_SECTIONS = '.is-hidden-touch>div>h2';
const HOME_PAGE_HERO_BLOCK = '.tls-home-page__hero-banner-wrapper';
const HOME_PAGE_ISSUE_BLOCK = '.tls-issue-details-medium__wrapper';
const HOME_PAGE_ISSUE_BLOCK_IMAGE = '.tls-issue-details-medium__wrapper-image-container > div';
const HOME_PAGE_ISSUE_BLOCK_TW = '.tls-issue-details-medium__wrapper-container > h3';
const HOME_PAGE_ISSUE_BLOCK_DATE = '.tls-issue-details-medium__wrapper-container > h1';
const HOME_PAGE_ISSUE_BLOCK_CONTENTS_PAGE = '.tls-issue-details-medium__wrapper-link > a';
const HERO_BLOCK_LARGE_IMAGE = '.tls-card-horizontal-large__wrapper>a';
const HERO_BLOCK_LARGE_IMAGE_CATEGORY = '.tls-article-label__category > a';
const HERO_BLOCK_LARGE_IMAGE_ARTICLE_NAME = '.tls-card-horizontal-large__content > a';
const HERO_BLOCK_LARGE_IMAGE_BANNER = '.tls-home-page__hero-banner-wrapper';
const HERO_BLOCK_LARGE_IMAGE_STANDFIRST = '.tls-card-standfirst';
const HERO_BLOCK_LARGE_IMAGE_BY = '.tls-byline';
const HERO_BLOCK_LARGE_IMAGE_IMAGE_BELOW = '.tls-card-horizontal-medium__wrapper';
const SocialMediaButtons='.tls-header-navigation__right-controls .tls-header-navigation__social-icon';
const FooterSection='div[role="complementary"] .tls-footer__menu__ul';
const FooterRightside= '.tls-footer__sidebar-right';
const termsandCondition='.tls-footer__tc';

//const PODCASTS_ADS = '#advert--section--billboard';
const PODCASTS_SLICE = '.tls-podcast-slice';
const PODCASTS_HEADER = 'div.tls-card-intro-centered > a';
const PODCAST_CENTRE_TITLE = '.tls-card-intro-centered__title';
const PODCAST_CENTRE_HEADER_STANDFIRST = '.tls-card-intro-centered__standfirst';
const PODCAST_CENTRE_HEADER_IMG = '.tls-podcast-slice';
const PODCAST_CENTRE_DATE_LINE = '.tls-issue-date-line';
const PODCASTS_ARTICLE = '.tls-podcast-slice__upper-module.columns.is-gapless.is-multiline > div.column.tls-card-horizontal-medium__content-wrapper.false > div';
const PODCASTS_ARTICLE_TITLE = 'a.tls-card-headline';
const PODCASTS_ARTICLE_STANDFIRST = 'p.tls-card-standfirst';
const ADS_SECTION = 'div#advert--section--billboard > div';
const ADS_SECTION1 = 'div#advert--section--billboard2 > div';
const ADS_SECTION2 = 'div#advert--section--billboard3 > div';

// Const or Variables
const PATH = 'the-tls.co.uk';
const EXPLORE = 'Explore the TLS';
const ONLINE = 'Online series';
const THIS_WEEK_ISSUE = 'This week\’s issue';
const VIEW_CONTENTS_PAGE = 'View contents page';
const DATE_FORMAT = 'MMMM DD, YYYY';
const ID = 'id';
const GOOGLE_ADS_IFRAME = 'google_ads_iframe';

	/**
	* Author: Chetana
	* Validating all the sections in the home page after the page load
	*/
	export const landingPageValidation=()=> {
		//Validating the TLS logo
		cy.get( TLS_LOGO ).should( 'be.visible' );
		//Valiating the tls url
		cy.url().should( 'include', PATH );
		cy.log( 'TLS home successfully loaded' );
	}
	export const ValidateSocialMediabuttons=()=>{
		cy.get (SocialMediaButtons).eq(0).should('be.visible');
		cy.get (SocialMediaButtons).eq(1).should('be.visible');
		cy.get (SocialMediaButtons).eq(2).should('be.visible');
	}
	export const ValidateFooterSectionOfHomepage=()=>{
		cy.get(FooterSection).should('be.visible');
		cy.get(FooterRightside).should('be.visible');
		cy.get(termsandCondition).should('be.visible');
	}
	export const homePageSectionValidation=()=> {
		//Validating the TLS explore section
		cy.get( TLS_HOMEPAGE_SECTIONS ).eq( 0 ).invoke( 'text' ).should( 'have.string', EXPLORE );
		cy.log( 'Explore the TLS section is loaded successfuly' );
		//validating the TLS online series section
		cy.get( TLS_HOMEPAGE_SECTIONS ).eq( 1 ).invoke( 'text' ).should( 'have.string', ONLINE );
		cy.log( 'Online sereis section is loaded successfuly' );
	}
	export const valdiateHeroBlock=()=> {
		//Validate hero block is visible
		cy.get( HOME_PAGE_HERO_BLOCK ).should( 'be.visible' );
		cy.log( 'Hero block is visible' );
	}
	export const valdiateIssueBlock=()=> {
		//Validate issue block is visible
		cy.get( HOME_PAGE_ISSUE_BLOCK ).should( 'be.visible' );
		cy.log( 'Issue block is visible' );
	}
	/**
	 * Validate Issue block image at right corner
	 */
	export const valdiateIssueImageBlock=()=> {
		//Validate issue block is visible
		cy.get( HOME_PAGE_ISSUE_BLOCK_IMAGE ).invoke( 'attr', 'style' ).then( ( value ) => {
			//Fetch the url and check the image
			const fetchImageUrl = value.replace( 'background-image: url("', '' ).replace( '")', '' ).replace( ';', '' );
			cy.log( fetchImageUrl );
			cy.request( fetchImageUrl ).then( ( response ) => {
				expect( response.status ).to.eq( 200 );
			} );
		} );
		cy.log( 'Issue block image is visible' );
	}
	
	export const validatDateAndThisWeekIssuelabelIsDisplayed=()=>{
		//Check this week is displayer
		cy.get( HOME_PAGE_ISSUE_BLOCK_TW ).should( 'have.text', THIS_WEEK_ISSUE );
		cy.log( 'This week is displayed in Issue Block' );
		cy.get( HOME_PAGE_ISSUE_BLOCK_DATE ).invoke( 'text' ).then( ( date ) => {
			const dayjs = require( 'dayjs' );
			const parsed = dayjs( date, DATE_FORMAT );
			expect( parsed.format( DATE_FORMAT ) ).to.eq(date);
		} );
		cy.log( 'Month and Year is displayed in Issue Block' );
		cy.get( HOME_PAGE_ISSUE_BLOCK_CONTENTS_PAGE ).invoke( 'text' ).should( 'contain', VIEW_CONTENTS_PAGE );
		cy.get( HOME_PAGE_ISSUE_BLOCK_CONTENTS_PAGE ).should( 'have.attr', 'href' ).then( ( href ) => {
			cy.request( href ).then( ( response ) => {
				expect( response.status ).to.eq( 200 );
			} );
		} );
		cy.log( 'View Content Page is displayed in Issue Block' );
		cy.log( 'Completed Date check , This week  and view content page is displayed in the Issue block' );
	}

	/**
	 *Validate Hero Large Block has Image, Title, Article Name and Author Name
	 */
	export const validateHeroHasArticleCategoryTitleAndAuthor=()=> {
		//Hero block has Image
		cy.get( HERO_BLOCK_LARGE_IMAGE )
			.should( 'have.attr', 'href' ).then( ( href ) => {
				cy.request( href )
					.then( ( response ) => {
						expect( response.status ).to.eq( 200 );
					} );
			} );
		cy.log( 'Hero Block has an Large Image at left corner is displayed' );
		// Validate Book review by hovering on book reviews
		cy.get('.tooltip-container').trigger('mouseover')
		cy.get('div[class*="tooltip above"]').should('be.visible')


		//Hero block has an category
		cy.get( HERO_BLOCK_LARGE_IMAGE_CATEGORY )
			.should( 'have.attr', 'href' ).then( ( href ) => {
				cy.request( href )
					.then( ( response ) => {
						expect( response.status ).to.eq( 200 );
					} );
			} );
		cy.log( 'Hero Block has category is displayed' );
		//Hero block has an Article name
		cy.get( HERO_BLOCK_LARGE_IMAGE_ARTICLE_NAME )
			.should( 'have.attr', 'href' ).then( ( href ) => {
				cy.request( href )
					.then( ( response ) => {
						expect( response.status ).to.eq( 200 );
					} );
			} );
		cy.log( 'Hero Block has Article Name is displayed' );
		//Hero block has standfirst
		cy.get( HERO_BLOCK_LARGE_IMAGE_BANNER )
			.find( HERO_BLOCK_LARGE_IMAGE_STANDFIRST ).eq( 0 ).should( 'be.visible' );
		cy.log( 'Hero Block has Stand First is displayed' );
		//Hero block has author name
		cy.get( HERO_BLOCK_LARGE_IMAGE_BANNER )
			.find( HERO_BLOCK_LARGE_IMAGE_BY ).eq( 0 ).should( 'be.visible' );
		cy.log( 'Hero Block has Author Name is displayed' );
		//Hero block below has 2 image
		cy.get( HERO_BLOCK_LARGE_IMAGE_BANNER ).find( HERO_BLOCK_LARGE_IMAGE_IMAGE_BELOW ).should( 'have.length', 2 );
		cy.log( 'Below Hero block has 2 image are displayed' );
	}

	/**
	 * Validate the podcast header, title and standfirst
	 */
	export const validatePodcastHeaderTitleStandfirst=()=> {
		//Verify visibility of entire block ads section
		//cy.scrollTo( 'center' );
		//cy.get( PODCASTS_ADS ).scrollIntoView();
		cy.waitUntil( () => cy.get( PODCASTS_SLICE ).should( 'be.visible' ) );
		cy.log( 'Validation completed for podcast Ads  section' );
		//Verify the podcast has the header which has the link
		cy.get( PODCASTS_HEADER ).eq( 0 ).should( 'have.text', 'The TLS podcast' );
		cy.get( PODCASTS_HEADER ).eq( 0 )
			.should( 'have.attr', 'href' ).then( ( href ) => {
				cy.request( href )
					.then( ( response ) => {
						expect( response.status ).to.eq( 200 );
					} );
			} );
		cy.log( 'Validation completed for podcast top link section' );
		//Verify the it has title
		cy.get( PODCAST_CENTRE_TITLE ).eq( 0 ).should( 'have.text', 'The TLS Podcast' );
		cy.log( 'Validation completed for podcast title' );
		//Verify standfirst
		cy.get( PODCAST_CENTRE_HEADER_STANDFIRST ).eq( 0 ).should( 'be.visible' );
		cy.log( 'Validation completed for standfirst' );
		//Verify the podcast has image
		cy.get( PODCAST_CENTRE_HEADER_IMG ).eq(0).should('be.visible').should('be.exist')
		cy.log( 'Podcast has an image' );
		//Verify date format
		cy.get( PODCAST_CENTRE_DATE_LINE ).eq( 0 ).invoke( 'text' ).then( ( date ) => {
			const dayjs = require( 'dayjs' );
			const parsed = dayjs( date, DATE_FORMAT );
			expect( parsed.format( DATE_FORMAT ) ).to.eq( date );
		} );
		cy.log( 'Podcast has an proper date format' );
	}

	export const valdiatePodcastArticleTitleStandfirst=()=> {
		cy.scrollTo( 'center' );
		cy.get( PODCASTS_ARTICLE ).eq( 0 ).find( PODCASTS_ARTICLE_TITLE ).should( 'have.attr', 'href' ).then( ( href ) => {
			cy.request( href )
				.then( ( response ) => {
					expect( response.status ).to.eq( 200 );
				} );
		} );
		cy.log( 'Successfully completed Podcast Article title' );
		// Verify podcast Article standfirst
		cy.get( PODCASTS_ARTICLE ).eq( 0 ).find( PODCASTS_ARTICLE_STANDFIRST ).scrollIntoView().should( 'be.visible' );
		cy.log( 'Successfully completed Podcast Article standfirst' );
	}

	/**
	 * Validate Ads section in Home page
	 */
	export const validateAdsCheckInHomePage=()=> {
		cy.get( ADS_SECTION ).then( ( $btn ) => {
			expect( $btn.attr( ID ).startsWith( GOOGLE_ADS_IFRAME ) );
		} );
		//Center Billboard Ad
		cy.scrollTo( 'center' );
		cy.get( ADS_SECTION1 ).then( ( $btn ) => {
			expect( $btn.attr( ID ).startsWith( GOOGLE_ADS_IFRAME ) );
		} );
		//Bottom Billboard Ad
		cy.scrollTo( 'bottom' );
		cy.get( ADS_SECTION2 ).then( ( $btn ) => {
			expect( $btn.attr( ID ).startsWith( GOOGLE_ADS_IFRAME ) );
		} );
	}