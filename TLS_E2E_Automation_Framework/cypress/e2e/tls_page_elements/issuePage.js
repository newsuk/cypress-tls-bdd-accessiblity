/// <reference types="cypress" />
/**
 * Internal dependencies
 */
const CurrentIssue_PAGE_ELEMENT_ON_HOME_PAGE='.tls-header-navigation__left-controls .tls-header-navigation__menu-list >div >a'
// const CURRENT_ISSUE_TITLE = '.tls-header-navigation__menu-item';
const ISSUE_BUTTON = '.tls-contents-page__issue-pagination-wrapper > a';
const NEXT_ISSUE = '.tls-contents-page__issue-pagination-wrapper > span';
const NEXT_ISSUE_BUTTON='.tls-link--disabled';
const ISSUE_DATE = '.tls-issue-date-line > span';
const HOME_PAGE_ISSUE_BLOCK_CONTENTS_PAGE = '.tls-issue-details-medium__wrapper-link > a';
const HOME_PAGE_ISSUE_BLOCK_DATE = '.tls-issue-details-medium__wrapper-container > h1';
const ISSUE_IMAGE = '.tls-contents-page__issue-image-container';
const ISSUE_TITLE = '.tls-card-headline > h2.tls-card-headline__title';
const ISSUE_AUTHOR = '.tls-byline > span';
const SHOWCASE_TITLE = '.tls-contents-page__above-content-wrapper > .tls-aggregation > .tls-aggregation__content-container > .tls-aggregation__title';
const SHOWCASE_ARTCILE_LABEL = '.tls-contents-page__highlights-wrapper .tls-article-label__category';
const SHOWCASE_ARTICLE_HEADLINE = '.tls-contents-page__highlights-wrapper .tls-card-headline>h2';
const SHOWCASE_ARTICLE_STANDFIRST = '.tls-contents-page__highlights-wrapper .tls-card-headline + p';
const SHOWCASE_ARTICLE_AUTHOR = '.tls-contents-page__highlights-wrapper .tls-byline';
const CONTENT_TITLE = '.tls-contents-page__categories > .tls-aggregation > .tls-aggregation__content-container > .tls-aggregation__title';
const CONTENT_MENU = '.tls-aggregation-navigation__menu > li>a';
// const CONTENT_PAGE_DATE_LINE = '.tls-contents-page__issue-date-line > div > span:nth-child(1)';

// const CURRENT_ISSUE_TITLE_VALUE = 'Current Issue';
const URL_VALUE = 'issues/current-issue';
const DATE_FORMAT = 'MMMM D, YYYY';
const PAGE_ELEMENT_FILE_PATH = 'cypress/fixtures/pageElementValues/issue_pages.json';
const CONTENT_MENU_LIST = [  'Literature', 'Philosophy','Politics & society','Lives','Regular features', 'Classics', 'Arts' ];

	export const navigateToCurrentIssuePage=()=> {
		cy.acceptCookieBanner();
		cy.get( CurrentIssue_PAGE_ELEMENT_ON_HOME_PAGE ).eq( 0 ).should( 'have.text', 'Current Issue' );
		cy.get( CurrentIssue_PAGE_ELEMENT_ON_HOME_PAGE ).eq( 0 ).click();
		cy.url().should( 'contain', 'https://www.the-tls.co.uk/issues/current-issue' );
		cy.log( ' Navigated to Current Issue Page' );
	}
	/**
     * Validate user navigated to Current Issue page or not
     */
	export const validateToCurrentIssuePage=()=> {
		//Navigate to Current Issue from Home page
		cy.acceptCookieBanner();
		cy.url().should( 'contain', URL_VALUE );
		cy.log( 'Validated theCurrent Issue Page' );
	}

	/**
     * Validate current Issue page has previous issue and current issue
     */
	export const validateCurrentIssuePageHasPreviousNextIssue = ()=> {
		cy.acceptCookieBanner();
		cy.get( ISSUE_BUTTON ).eq( 0 ).should( 'contain', 'Previous issue' );
		cy.get( ISSUE_BUTTON ).eq( 0 ).should( 'not.be.disabled' );
		cy.get( NEXT_ISSUE ).should( 'contain', 'Next issue' );
		cy.get( NEXT_ISSUE_BUTTON ).should( 'be.visible' );
		cy.log( 'Validated current Issue Page has previous issue and next issue' );
	}

	/**
     * Validate the previous page click is working with all details
     */
	export const validatePreviousIssue=()=> {
		//Fetch the current Issue date
		cy.get( ISSUE_DATE ).eq( 0 ).invoke( 'text' ).then( ( currentIssueDate ) => {
			const dayjs = require( 'dayjs' );
			const parsed = dayjs( currentIssueDate, DATE_FORMAT );
			expect( parsed.format( DATE_FORMAT ) ).to.eq( currentIssueDate );
			cy.writeFile( PAGE_ELEMENT_FILE_PATH, { currentIssuePageDate: currentIssueDate } );
		} );

		//Click on previous issue and valiate the date is 7 days before
		cy.get( ISSUE_BUTTON ).eq( 0 ).click();
		cy.acceptCookieBanner();
		cy.get( ISSUE_DATE ).eq( 0 ).invoke( 'text' ).then( ( previousIssueDate ) => {
			const dayjs = require( 'dayjs' );
			const parsed = dayjs( previousIssueDate, DATE_FORMAT );
			expect( parsed.format( DATE_FORMAT ) ).to.eq( previousIssueDate );
			cy.readFile( PAGE_ELEMENT_FILE_PATH ).its( 'currentIssuePageDate' ).then( ( dateinFile ) => {
				const myPastDate = new Date( dateinFile );
				myPastDate.setDate( myPastDate.getDate() - 7 );
				const dayjs1 = require( 'dayjs' );
				const parsed1 = dayjs1( myPastDate, DATE_FORMAT );
				expect( parsed1.format( DATE_FORMAT ) ).to.eq( previousIssueDate );
			} );
		} );
		cy.acceptCookieBanner();
		//Click on next issue from previous issue
		cy.get( ISSUE_BUTTON ).eq( 1 ).should( 'contain', 'Next issue' );
		cy.get( ISSUE_BUTTON ).eq( 1 ).should( 'not.be.disabled' );
		cy.get( ISSUE_BUTTON ).eq( 1 ).click();
		cy.acceptCookieBanner();
		validateToCurrentIssuePage();
		cy.log( 'Validation completed for Previous Issue' );
	}

	/**
     * Click on view content from home page and Current Issue should be directed to Current Issue page
     */
	export const validateViewContentAndCurrentPageSame=()=> {
		//Valdiate the current issue page
		validateToCurrentIssuePage();
		cy.clickTLSLogo();
		cy.acceptCookieBanner();
		//Home page issue date
		cy.get( HOME_PAGE_ISSUE_BLOCK_DATE ).invoke( 'text' ).then( ( dateInHomePage ) => {
			const dayjs = require( 'dayjs' );
			const parsed = dayjs( dateInHomePage, DATE_FORMAT );
			expect( parsed.format( DATE_FORMAT ) ).to.eq( dateInHomePage );
			cy.writeFile( PAGE_ELEMENT_FILE_PATH, { homepagedate: dateInHomePage } );
		} );
		//Click the view contents
		cy.get( HOME_PAGE_ISSUE_BLOCK_CONTENTS_PAGE ).click();
		cy.acceptCookieBanner();
		validateToCurrentIssuePage();
		//Validate date in home page and date in Current Issue should be same
		cy.get( ISSUE_DATE ).eq( 0 ).invoke( 'text' ).then( ( currentIssueDate ) => {
			const dayjs = require( 'dayjs' );
			const parsed = dayjs( currentIssueDate, DATE_FORMAT );
			expect( parsed.format( DATE_FORMAT ) ).to.eq( currentIssueDate );
			cy.readFile( PAGE_ELEMENT_FILE_PATH ).its( 'homepagedate' ).should( 'eq', currentIssueDate );
		} );
		cy.log( 'Validation completed for View Content page and Current Issue page shouldbe same and its dates' );
	}

	export const validateImageArticleContentInPreviousAndCurrentIssue=()=> {
		//Validate currentIssue has image content and author
		imageContentAuthor();
		//Click on previous issue and validate, image content and author
		cy.get( ISSUE_BUTTON ).eq( 0 ).click();
		cy.acceptCookieBanner();
		imageContentAuthor();
		cy.log( 'Validation completed for  Issue Image, lead article is present in current Issue and Previous Issue' );
	}

	export const imageContentAuthor=() =>{
		cy.get( ISSUE_IMAGE ).should( 'be.visible' );
		cy.get( ISSUE_TITLE ).first().should( 'be.visible' );
		cy.get( ISSUE_AUTHOR ).first().should( 'be.visible' );
	}

	export const validateShowcaseSection=()=> {
		// Validate all sections in showcase
		cy.get( SHOWCASE_TITLE ).should( 'have.text', 'Showcase' );
		cy.get( SHOWCASE_ARTCILE_LABEL ).should( 'be.visible' ).and( 'have.length', 4 );
		cy.get( SHOWCASE_ARTICLE_HEADLINE ).should( 'be.visible' ).and( 'have.length', 4 );
		cy.get( SHOWCASE_ARTICLE_STANDFIRST ).should( 'be.visible' ).and( 'have.length', 4 );
		cy.get( SHOWCASE_ARTICLE_AUTHOR ).should( 'be.visible' ).and( 'have.length', 4 );
		cy.log( 'Validation completed for Showcase section' );
	}
	
	export const validateContentSection=()=> {
		//Validate all section on Content
		cy.get( CONTENT_TITLE ).should( 'have.text', 'Contents' );
		cy.get( CONTENT_MENU ).should( 'have.length', '7' );
		for ( let count = 0; count < 7; count++ ) {
			cy.get( CONTENT_MENU ).eq( count ).should( 'have.text', CONTENT_MENU_LIST[ count ] );
			cy.get( CONTENT_MENU ).eq( count ).should( 'have.attr', 'href' );
		}
		cy.log( 'Validation completed for Contents section' );
	}
