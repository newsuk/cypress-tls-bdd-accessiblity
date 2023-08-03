/// <reference types="cypress" />
/**
 * Internal dependencies
 */
import '../../../support/e2e';

// Page Elements
const SUBSCRIBE_BUTTON_ON_THE_HEADER = '.tls-button';
const TLS_LOGO = '.tls-header-navigation__logo>a';
const TEXT_ON_THE_HEADER_OF_THE_BUYPAGE_H1 = '.header>h1';
const TEXT_ON_THE_HEADER_OF_THE_BUYPAGE_H2 = '.header>h2';
const HEADING_OF_FAQS = '.white-container > h2';
const SUBHEADING_OF_FAQS = '.have-questions';
const FAQ__PANEL = '.faqs';
const SEE_ALL_FAQS_BUTTON = '.see-all-faqs';
const QUESTION_FAQ_PANEL = ':nth-child(1) > .question';
const ANSWER_FAQ_PANEL = ':nth-child(1) > .answer';
const HEADING_OF_FAQS_PAGE = '.tls-aggregation__title';
const BODY_OF_FAQS_PAGE = '.tls-article-body';
const PRINT_PACK = '.print';
const PRINT_IMG = '.print > .product-image > img';
const PRINT_HEADDING = '.print > .subscription-type';
const PRINT_SUBHEADDING = '.print > .subscription-info';
const PRINT_LABEL = '.print > .label';
const PRINT_LABEL_INCLUDES1 = '.print > .includes > ul > :nth-child(1)';
const PRINT_LABEL_INCLUDES2 = '.print > .includes > ul > :nth-child(2)';
const PRINT_PRICE = '.print > .price';
const PRINT_TERMS = '.print > .terms';
//const PRINT_SUBSCRIBE = '.print > .has-utag'; - we can uncomment this after fixing the nginx server error in lower env of TLS
const PRINT_AND_DIGITAL_TAGLINE = '.best-value > .tag-line';
const PRINT_AND_DIGITAL_IMG = '.best-value > .product-image > img';
const PRINT_AND_DIGITAL_HEADDING = '.best-value > .subscription-type';
const PRINT_AND_DIGITAL_SUBHEADDING = '.best-value > .subscription-info';
const PRINT_AND_DIGITAL_LABEL = '.best-value > .label';
const BESTVALUE_INCLUDES = '.best-value > .includes > ul > li';
const PRINT_AND_DIGITAL_PRICE = '.best-value > .price';
const PRINT_AND_DIGITAL_TERMS = '.best-value > .terms';
//const PRINT_AND_DIGITAL_SUBSCRIBE = '.best-value > .has-utag'; - we can uncomment this after fixing the nginx server error in lower env of TLS
const DIGITAL_PACK = '.digital';
const DIGITAL_IMG = '.digital > .product-image > img';
const DIGITAL_HEADDING = '.digital > .subscription-type';
const DIGITAL_SUBHEADDING = '.digital > .subscription-info';
const DIGITAL_LABEL = '.most-affordable > .label';
const DIGITAL_LABEL_INCLUDES1 = '.digital > .includes > ul > :nth-child(1)';
const DIGITAL_LABEL_INCLUDES2 = '.digital > .includes > ul > :nth-child(2)';
const DIGITAL_PRICE = '.digital > .price';
const DIGITAL_TERMS = '.digital > .terms';
//const DIGITAL_SUBSCRIBE = '.digital > .has-utag'; - we can uncomment this after fixing the nginx server error in lower env of TLS

// Const or Variables
const PATH = '/buy';
const TEXT_ON_THE_HEADER_OF_THE_BUYPAGE_T1 = 'Subscribe to TLS today';
const TEXT_ON_THE_HEADER_OF_THE_BUYPAGE_T2 = 'Broaden your horizons from just £1 a week';
const TEXT_ON_THE_HEADING_OF_FAQS = 'Subscription FAQs';
const TEXT_ON_THE_SUBHEADING_OF_FAQS = 'If you have any questions about a TLS subscription, please see below or click on the FAQs link further down.';
const URL_OF_FREQUENTLY_ASKED_QUESTION_PAGE = 'frequently-asked-questions/';
const TEXT_QUESTION_FAQ_PANEL = 'How do I enquire about corporate subscriptions?';
const TEXT_HEADING_OF_FAQS_PAGE = 'Frequently Asked Questions';
const PRINT_HEADING_TEXT = 'Print';
const PRINT_SUBHEADING_TEXT = 'The latest thinking, delivered weekly';
const PRINT_LABEL_INCLUDES1_TEXT1 = 'The weekly TLS print edition';
const PRINT_LABEL_INCLUDES2_TEXT2 = 'Home delivery included as standard';
const PRINT_PRICE_TEXT = 'Just £3.55 / week';
const PRINT_TERMS_TEXT = 'Pay £42.50 per quarter';
const PRINT_AND_DIGITAL_TAGLINE_TEXT = 'Best Value';
const PRINT_AND_DIGITAL_HEADING_TEXT = 'Print & Digital';
const PRINT_AND_DIGITAL_SUBHEADING_TEXT = 'Unrestricted access to all of the TLS';
const PRINT_AND_DIGITAL_LABEL_INCLUDES_TEXT1 = 'The weekly print edition, delivered to your door';
const PRINT_AND_DIGITAL_LABEL_INCLUDES_TEXT2 = 'Unrestricted access to the TLS website & app';
const PRINT_AND_DIGITAL_LABEL_INCLUDES_TEXT3 = 'Full use of the 118-year old TLS Archive';
const PRINT_AND_DIGITAL_LABEL_INCLUDES_TEXT4 = 'Exclusive reads through online-only features';
const PRINT_AND_DIGITAL_LABEL_INCLUDES_TEXT5 = 'TLS first-look with the weekly newsletter';
const PRINT_AND_DIGITAL_PRICE_TEXT = 'Just £1 / week';
const PRINT_AND_DIGITAL_TERMS_TEXT = 'Renewing at £42.50 per quarter thereafter';
const DIGITAL_HEADING_TEXT = 'Digital';
const DIGITAL_SUBHEADING_TEXT = 'The TLS, wherever you are';
const DIGITAL_LABEL_INCLUDES_TEXT1 = 'Unrestricted access to the TLS website, app and the TLS Archive';
const DIGITAL_LABEL_INCLUDES_TEXT2 = 'Exclusive reads through online-only features and the weekly newsletter';
const DIGITAL_PRICE_TEXT = 'Just £1.70 / week';
const DIGITAL_TERMS_TEXT = 'Pay £20 per quarter';

class subscriptionPage {
	/**
      * Author : Roopa
      * Click Subscribe button on the Header
      */
	static clickSubsribeButtonOnTheHeader() {
		//Click Subscribe button on the header
		cy.get( SUBSCRIBE_BUTTON_ON_THE_HEADER, { timeout: 3000 } ).click();
	}
	/**
      * Author : Roopa
      * Validate the URL of the buy page
      */
	static validateUrlOfTheSubscriptionPage() {
		//Validate the URL of Subscription page
		cy.url().should( 'include', PATH );
		cy.log( 'User is naviagted Subscription page' );
	}
	/**
     * Author : Roopa
     * Validate the TLS logo and Text in the header of the Subscription page
     */
	static verifyTheTlsLogoAndtextOnTheHeader() {
		//Verify the TLS Logo
		cy.get( TLS_LOGO ).should( 'be.visible' );
		//Verify the Text on the header
		cy.get( TEXT_ON_THE_HEADER_OF_THE_BUYPAGE_H1 ).should( 'be.visible' ).and( 'have.text', TEXT_ON_THE_HEADER_OF_THE_BUYPAGE_T1 );
		cy.get( TEXT_ON_THE_HEADER_OF_THE_BUYPAGE_H2 ).should( 'be.visible' ).and( 'have.text', TEXT_ON_THE_HEADER_OF_THE_BUYPAGE_T2 );
		cy.log( 'Validation completed for TLS logo and Text in the header of the Subscription page' );
	}
	/**
     * Author : Roopa
     * Validate the FAQ's section
     **/
	static validateTextInFaqSection() {
		//Validate heading and sub heading of FAQ's
		cy.acceptCookieBanner();
		cy.scrollTo( 'center' );
		cy.get( HEADING_OF_FAQS ).should( 'have.text', TEXT_ON_THE_HEADING_OF_FAQS );
		cy.get( SUBHEADING_OF_FAQS ).should( 'have.text', TEXT_ON_THE_SUBHEADING_OF_FAQS );
		cy.get( FAQ__PANEL ).should( 'not.be.empty' );
		cy.log( 'Verified heading and sub-heading of FAQs' );
		//Validating the FAQ's which are there in buy page//
		cy.get( QUESTION_FAQ_PANEL ).should( 'have.text', TEXT_QUESTION_FAQ_PANEL );
		cy.get( ANSWER_FAQ_PANEL ).should( 'be.visible' ).should( 'not.be.empty' );
		//Validating the see all FAQ's button
		cy.get( SEE_ALL_FAQS_BUTTON ).click();
		//Validating the URL of frequently asked questions page
		cy.url().should( 'include', URL_OF_FREQUENTLY_ASKED_QUESTION_PAGE );
		cy.log( 'User is naviagted to frequently asked questions page' );
		//Validating the Frequently Asked Questions page//
		cy.acceptCookieBanner();
		cy.get( HEADING_OF_FAQS_PAGE ).should( 'have.text', TEXT_HEADING_OF_FAQS_PAGE );
		cy.get( BODY_OF_FAQS_PAGE ).should( 'not.be.empty' );
		cy.go( 'back' );
		cy.acceptCookieBanner();
		cy.scrollTo( 'top' );
		cy.log( 'FAQs section of the Subscription page is validated' );
	}

	/**
     * Author : Roopa
     * Validate the Print pack
     **/
	static validatePrintPack() {
		//validating whole pack is getting displayed or not
		cy.acceptCookieBanner();
		cy.get( PRINT_PACK ).should( 'be.visible' ).should( 'not.be.empty' );
		//Validating the Image
		cy.get( PRINT_IMG ).should( 'be.visible' );
		cy.get( PRINT_HEADDING ).should( 'be.visible' ).should( 'contain', PRINT_HEADING_TEXT );
		cy.get( PRINT_SUBHEADDING ).should( 'be.visible' ).should( 'contain', PRINT_SUBHEADING_TEXT );
		//Validating the Subscription includes
		cy.acceptCookieBanner();
		cy.get( PRINT_LABEL ).should( 'be.visible' );
		cy.get( PRINT_LABEL_INCLUDES1 ).should( 'be.visible' ).should( 'have.text', PRINT_LABEL_INCLUDES1_TEXT1 );
		cy.get( PRINT_LABEL_INCLUDES2 ).should( 'be.visible' ).should( 'have.text', PRINT_LABEL_INCLUDES2_TEXT2 );
		//Validating the price details
		cy.get( PRINT_PRICE ).should( 'be.visible' ).should( 'contain', PRINT_PRICE_TEXT );
		cy.get( PRINT_TERMS ).should( 'be.visible' ).should( 'contain', PRINT_TERMS_TEXT );
		//Validating the Subscribe-now button 
		cy.log( 'Successfully verified the Print offer pack' );
		cy.go( 'back' );
		cy.acceptCookieBanner();
		cy.scrollTo( 'top' );
	}

	/**
     * Author : Roopa
     * Validate the Print and Digital pack
     **/
	static validatePrintAndDigitalPack() {
		//Validating the tagline//
		cy.acceptCookieBanner();
		cy.get( PRINT_AND_DIGITAL_TAGLINE ).should( 'be.visible' ).should( 'contain', PRINT_AND_DIGITAL_TAGLINE_TEXT );
		//Validating the Image//
		cy.get( PRINT_AND_DIGITAL_IMG ).should( 'be.visible' );
		//Validating the type of the pack//
		cy.get( PRINT_AND_DIGITAL_HEADDING ).should( 'be.visible' ).should( 'contain', PRINT_AND_DIGITAL_HEADING_TEXT );
		cy.get( PRINT_AND_DIGITAL_SUBHEADDING ).should( 'be.visible' ).should( 'contain', PRINT_AND_DIGITAL_SUBHEADING_TEXT );
		//Validating the Subscription includes//
		cy.get( PRINT_AND_DIGITAL_LABEL ).should( 'be.visible' );
		const text = [ PRINT_AND_DIGITAL_LABEL_INCLUDES_TEXT1, PRINT_AND_DIGITAL_LABEL_INCLUDES_TEXT2, PRINT_AND_DIGITAL_LABEL_INCLUDES_TEXT3, PRINT_AND_DIGITAL_LABEL_INCLUDES_TEXT4, PRINT_AND_DIGITAL_LABEL_INCLUDES_TEXT5 ];
		for ( let i = 0; i < text.length; i++ ) {
			cy.get( BESTVALUE_INCLUDES ).eq( i ).invoke( 'text', text[ i ] );
		}
		//Validating the price deatils//
		cy.get( PRINT_AND_DIGITAL_PRICE ).should( 'be.visible' ).should( 'contain', PRINT_AND_DIGITAL_PRICE_TEXT );
		cy.get( PRINT_AND_DIGITAL_TERMS ).should( 'be.visible' ).should( 'contain', PRINT_AND_DIGITAL_TERMS_TEXT );
		//Validating the Subscribe now button 
		cy.log( 'Print and Digital offer pack has all the elements' );
		cy.go( 'back' );
		cy.acceptCookieBanner();
		cy.scrollTo( 'top' );
	}

	/**
     * Author : Roopa
     * Validate the Digital pack
     **/
	static validateDigitalPack() {
		//validating whole pack is getting displayed or not
		cy.acceptCookieBanner();
		cy.get( DIGITAL_PACK ).should( 'be.visible' );
		//Validating the Image
		cy.get( DIGITAL_IMG ).should( 'be.visible' );
		cy.get( DIGITAL_HEADDING ).should( 'be.visible' ).should( 'contain', DIGITAL_HEADING_TEXT );
		cy.get( DIGITAL_SUBHEADDING ).should( 'be.visible' ).should( 'contain', DIGITAL_SUBHEADING_TEXT );
		//Validating the Subscription includes
		cy.get( DIGITAL_LABEL ).should( 'be.visible' );
		cy.get( DIGITAL_LABEL_INCLUDES1 ).should( 'be.visible' ).should( 'have.text', DIGITAL_LABEL_INCLUDES_TEXT1 );
		cy.get( DIGITAL_LABEL_INCLUDES2 ).should( 'be.visible' ).should( 'have.text', DIGITAL_LABEL_INCLUDES_TEXT2 );
		//Validating the price details
		cy.get( DIGITAL_PRICE ).should( 'be.visible' ).should( 'contain', DIGITAL_PRICE_TEXT );
		cy.get( DIGITAL_TERMS ).should( 'be.visible' ).should( 'contain', DIGITAL_TERMS_TEXT );
		//Validating the Subscribe now button
		cy.log( 'Successfully verified the Digital offer pack' );
		cy.go( 'back' );
		cy.acceptCookieBanner();
		cy.scrollTo( 'top' );
	}
}
export default subscriptionPage;
