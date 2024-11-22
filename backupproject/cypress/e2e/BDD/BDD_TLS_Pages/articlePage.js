/// <reference types="cypress" />
/**
 * Internal dependencies
 */
import '../../../support/e2e';

// Page Elements
const HOME_PAGE_SECOND_ARTICLE = ':nth-child(2) > .tls-card-horizontal-medium__content > .tls-card-headline > .tls-card-headline__title';
const ARTICLE_PAGE_HEADLINE = '.tls-headline';
const ARTICLE_LABEL_CATEGORY = 'article.tls-single-article span.tls-article-label__category > a';
const ARTICLE_LABEL_SEPARATOR = 'article.tls-single-article span.tls-article-label__separator';
const ARTICLE_LABEL_ARTICLE_TYPE = 'article.tls-single-article span.tls-article-label__article-type';
const ARTICLE_SUB_TITLE = '.tls-standfirst';
const ARTICLE_AUTHOR_NAME = '.tls-single-article div.tls-byline > span.tls-byline__name';
const ARTICLE_AUTHOR_NAME_WITH_BY = '.tls-single-article div.tls-byline > span.tls-byline__by';
const ARTICLE_IMAGE = '.tls-lead-image__image';
const ARTICLE_IMAGE_CAPTION = '.tls-media-information__caption';
const ARTICLE_PAGE_SOCIAL_MEDIA_BUTTONS = 'div[class^="tls-single-article__wrapper columns"] button[data-sharing=';
const ARTICLE_BODY = '.tls-article-body';
const SIDE_BAR_REVIEW = 'div[class="tls-single-article__wrapper columns is-centered is-gapless is-multiline"]';
const SIDE_BAR_CONTENT = '.tls-single-article__sidebar-content > .tls-article-stamp';
const SIDE_BAR_IMAGE = '.tls-single-article__sidebar-content > .tls-article-stamp > .tls-article-stamp__image-wrapper > .tls-article-stamp__image-as-background';
const SIDE_BAR_LABEL = '.tls-single-article__sidebar-content > .tls-article-stamp > .tls-article-stamp__meta-wrapper > .tls-article-stamp__label';
const SIDE_BAR_LINK = '.tls-single-article__sidebar-content > .tls-article-stamp > .tls-article-stamp__meta-wrapper > .tls-article-stamp__link > .tls-link';
const BOOK_DETAILS = '.tls-book-details__unit';
const BOOK_DETAILS_HEADINGS = '.tls-component-heading';
const LONG_READS = 'div[class="tls-single-article__wrapper columns is-centered is-gapless is-multiline"] > div >div>a';
const KEEP_READING_OPTION = '.tls-aggregation__title';

// Const or Variables
const PAGE_ELEMENT_FILE_PATH = 'cypress/pageElementValues/articles_page_values.txt';
const SEPARATOR = '|';
const BY = 'By';
const TWITTER = 'twitter';
const FACEBOOK = 'facebook';
const EMAIL = 'email';

class articlePage {
	/**
	 * Author : Nithya
	 * Fetch the name of the Article and Select the second article in Home
	 */
	static clickSecondArtcileINHomePage() {
		//Fetch tne name of Article and store it
		cy.get( HOME_PAGE_SECOND_ARTICLE ).then( ( articleName ) => {
			cy.writeIntoFile( PAGE_ELEMENT_FILE_PATH, articleName.text() );
		} );
		//Click the 2nd article
		cy.get( HOME_PAGE_SECOND_ARTICLE ).click();
		cy.acceptCookieBanner();
		cy.log( ' Successfully Navigated to Article Page ' );
	}

	/**
	 * Author : Nithya
	 * Validate the expected Article page is opened
	 */
	static getHeadlineOfArtcilePage() {
		// Validate that opened Article is opened correctly
		cy.get( ARTICLE_PAGE_HEADLINE ).then( ( tileOfPage ) => {
			cy.readFromFile( PAGE_ELEMENT_FILE_PATH ).then( ( selectedArticleName ) => {
				expect( selectedArticleName ).to.equal( tileOfPage.text() );
			} );
			cy.log( ' Valdiation completed for title of Article Page ' );
		} );
	}

	/**
	 * Author : Nithya
	 * Validate the Article category, separator and type
	 */
	static validateArticleCategorySepartorAndType() {
		//Validate the Article type has value
		cy.get( ARTICLE_LABEL_CATEGORY ).invoke( 'text' ).should( 'not.be.empty' );
		//Validate  the Separator is exists
		cy.get( ARTICLE_LABEL_SEPARATOR ).should( 'be.visible' ).contains( SEPARATOR );
		//Validate the Article Type has value
		cy.get( ARTICLE_LABEL_ARTICLE_TYPE ).invoke( 'text' ).should( 'not.be.empty' );
		cy.log( ' Valdiation completed for Article category, separator and type' );
	}

	/**
	 * Author : Nithya
	 * Validate the Article tile, subtitle , author, image and its caption
	 */
	static validateArticleTitleSubtitleAuthorAndImage() {
		//Validate the Article Title
		cy.acceptCookieBanner();
		cy.get( ARTICLE_PAGE_HEADLINE ).invoke( 'text' ).should( 'not.be.empty' );
		//Validate the Subtitle;
		cy.get( ARTICLE_SUB_TITLE ).invoke( 'text' ).should( 'not.be.empty' );
		//Validate the Authorname and prefix by
		cy.get( ARTICLE_AUTHOR_NAME ).invoke( 'text' ).should( 'not.be.empty' );
		cy.get( ARTICLE_AUTHOR_NAME_WITH_BY ).invoke( 'text' ).then( ( value ) => {
			expect( value.trim() ).eq( BY );
		} );

		//Validate the Article image should be visible and its cpation under image
		cy.get( ARTICLE_IMAGE ).should( 'be.visible' );
		cy.get( ARTICLE_IMAGE_CAPTION ).should( 'be.visible' );
		cy.acceptCookieBanner();
		cy.log( ' Valdiation completed for title , subtitle, author, image and its caption' );
	}

	/**
	 * Validate the Article has the socila media buttons of Facebook, twitter, email
	 */
	static validateArticlePageHasSocialMediaButtons() {
		const socialMedias = [ TWITTER, FACEBOOK, EMAIL ];
		//Check all the social medias
		socialMedias.forEach( ( socialMedia ) => {
			cy.get( ARTICLE_PAGE_SOCIAL_MEDIA_BUTTONS + socialMedia + ']', { timeout: 5000 } ).eq( 0 ).scrollIntoView().should( 'be.visible' );
			cy.log( 'Validations completed of Socila media of ' + socialMedia );
		} );
		cy.log( 'Validations completed of Socila media of Twitter, Facebook, Email' );
	}

	/**
	 * Validate the Artcile has content and in side bar has review, read the issue and etc..
	 */
	static validateArticlePageContentWithSideBarDetails() {
		//Validate the article body//
		cy.acceptCookieBanner();
		cy.get( ARTICLE_BODY ).should( 'be.visible' ).should( 'not.be.empty' );
		cy.log( 'Verified Article body' );
		//Valiadte the Read this Issue sidebar//
		cy.get( SIDE_BAR_REVIEW ).then( ( $ele ) => {
			if ( $ele.find( SIDE_BAR_CONTENT ).length > 0 ) {
				cy.get( SIDE_BAR_IMAGE ).scrollIntoView().should( 'be.visible' );
				cy.get( SIDE_BAR_LABEL ).scrollIntoView().should( 'be.visible' );
				cy.get( SIDE_BAR_LINK ).scrollIntoView().should( 'have.attr', 'href' ).then( ( href ) => {
					cy.request( href ).then( ( response ) => {
						cy.acceptCookieBanner();
						expect( response.status ).to.eq( 200 );
					} );
				} );
				cy.log( 'Read this Issue sidebar is Exist and Verified' );
			} else {
				cy.log( 'Read this Issue sidebar is not exist' );
			}
		} );

		//Validate the In this Review sidebar
		cy.get( SIDE_BAR_REVIEW ).then( ( $ele ) => {
			if ( $ele.find( BOOK_DETAILS ).length > 0 ) {
				cy.get( BOOK_DETAILS_HEADINGS ).should( 'be.visible' );
				cy.log( 'In this Review lable sidebar is Exist and Verified' );
			} else {
				cy.log( 'In this Review lable sidebar is not exist' );
			}
		} );

		//Validate the Long reads sidebar
		cy.get( SIDE_BAR_REVIEW ).then( ( $ele ) => {
			if ( $ele.find( LONG_READS ).length > 0 ) {
				cy.log( 'Long reads sidebar Exist and Verified' );
			} else {
				cy.log( 'Long reads sidebar is not exist' );
			}
		} );
		//Validate the keep reading button
		cy.get( KEEP_READING_OPTION ).should( 'be.visible' );
		cy.log( 'Keep reading is exist and Verified' );
	}
}

export default articlePage;
