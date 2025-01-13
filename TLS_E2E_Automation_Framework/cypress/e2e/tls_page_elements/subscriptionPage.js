/**
 * Internal dependencies
 */

// Page Elements
const SUBSCRIBE_BUTTON_ON_THE_HEADER = '.tls-header-navigation__button-subscribe';
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

const DIGITAL_PACK = '.digital';
const DIGITAL_IMG = 'div[class*="product best-value digital"]';
const DIGITAL_HEADDING = '.digital > .subscription-type';
const DIGITAL_SUBHEADDING = '.best-value > .terms';
const DIGITAL_PRICE = '.digital > .price';
const DIGITAL_TERMS = '.digital > .terms';
const DIGITAL_BUTTON = '.best-value-cta';
const EMAIL = '#email';
const PASSWORD = '#password';
const continue_Button= '#account-setup-continue';
const first_name = '#firstName';
const last_name = '#lastName';
const Account_Detail_Continue_Button = '#account-details-continue';
const address = '#addressLookup'
const addess_result = '#address-results'
const address_continue_Button = '#address-continue';
const Payment_Detail = '#zuora_payment';

// Const or Variables
const PATH = 'https://www.the-tls.co.uk/buy';
const TEXT_ON_THE_HEADING_OF_FAQS = 'Subscription FAQs';
const TEXT_ON_THE_SUBHEADING_OF_FAQS = 'If you have any questions about a TLS subscription, please see below or click on the FAQs link further down.';
const URL_OF_FREQUENTLY_ASKED_QUESTION_PAGE = 'frequently-asked-questions';
const TEXT_QUESTION_FAQ_PANEL = 'How do I enquire about corporate subscriptions?';
const TEXT_HEADING_OF_FAQS_PAGE = 'Frequently Asked Questions';
const DIGITAL_HEADING_TEXT = 'Digital';
const DIGITAL_SUBHEADING_TEXT = '£6.99 a month thereafter';
const ADDRESS_DETAILS = 'Flat 24, Thornewill House, Cable Street - London, E1 0AP';

// Environment-specific variables
const environment = Cypress.env("ENV") || "prod";
const url = Cypress.env(`${environment}_url`);
const username = Cypress.env(`${environment}_username`);
const password = Cypress.env(`${environment}_password`);
const prod_subscribe_username = Cypress.env("prod_subscribe_username");

	/**
      * Validate the URL of the buy page
      */
	export const validateUrlOfTheSubscriptionPage=()=> {
		//Validate the URL of Subscription page
		cy.url().should( 'include', PATH );
		cy.log( 'User is naviagted Subscription page' );
	}
	export const clickSubsribeButtonOnTheHeader=()=> {
		//Click Subscribe button on the header
		cy.get( SUBSCRIBE_BUTTON_ON_THE_HEADER, { timeout: 3000 } ).click();
	}
	/**
     * Validate the TLS logo and Text in the header of the Subscription page
     */
	export const verifyTheTlsLogoAndtextOnTheHeader=()=> {
		//Verify the TLS Logo
		cy.get( TLS_LOGO ).should( 'be.visible' );
		//Verify the Text on the header
		cy.get( TEXT_ON_THE_HEADER_OF_THE_BUYPAGE_H1 ).should( 'not.be.null' );
		cy.get( TEXT_ON_THE_HEADER_OF_THE_BUYPAGE_H2 ).should( 'not.be.null' );
		cy.log( 'Validation completed for TLS logo and Text in the header of the Subscription page' );
	}
	/**
     * Validate the FAQ's section
     **/
	export const validateTextInFaqSection=()=> {
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

	export const validateClickOnDigitalPack=()=> {
		cy.acceptCookieBanner();
		cy.get(DIGITAL_BUTTON).click();
		cy.log( 'User is naviagted Account set up page' );
	}

	export const validateAccountSetupPage=()=> {
		//console.log(environment == Cypress.env("ENV") || "prod")

		if( environment == "prod" ) {
			const uniquenumbers = Date.now();
			cy.get( EMAIL ).type(`${prod_subscribe_username}+testing${uniquenumbers}@gmail.com`);
			cy.get( PASSWORD ).type(password).type('{enter}')
			cy.wait( 3000 );
		} else{
		const uniqueEmail = `user${Date.now()}@yopmail.com`;
		cy.get( EMAIL ).type( uniqueEmail )
		cy.get( PASSWORD ).type( 'Password123@' ).type('{enter}')
		cy.wait( 3000 );
		}
		cy.get(continue_Button).click({force:true});
		cy.log('valid Email and password are given');
	}
	export const validateAboutyouPage=()=> {
		cy.get('select').select('Mr');
		cy.get(first_name).first().click().type('Test')
		cy.get(last_name).last().click().type('Subscribe')
		//click on continue button
		cy.get(Account_Detail_Continue_Button).click();
		cy.log('successfully given all AboutYou page details')
	}
	export const Billing_Address_Details=()=>{
		cy.get(address).click();
		cy.get(address).type(ADDRESS_DETAILS).type('{enter}');
		cy.wait(5000);
		cy.get(addess_result).click();
		cy.get(address_continue_Button).click()
		cy.log( 'successfully given all billing address details' );
	}

	export const Payment_Details=()=>{
	// verify payment page
	cy.get(Payment_Detail).eq(0).should('be.visible');
	cy.wait(2000);
	
	}
	
	export const validateDigitalPack=()=> {
		//validating whole pack is getting displayed or not
		cy.acceptCookieBanner();
		cy.get( DIGITAL_PACK ).should( 'be.visible' );
		//Validating the Image
		cy.get( DIGITAL_IMG ).should( 'be.visible' );
		cy.get( DIGITAL_HEADDING ).should( 'be.visible' ).should( 'contain', DIGITAL_HEADING_TEXT );
		cy.get( DIGITAL_SUBHEADDING ).should( 'be.visible' ).should( 'contain', DIGITAL_SUBHEADING_TEXT );		
		//Validating the price details
		cy.get( DIGITAL_PRICE ).should('not.be.empty' );
		cy.get( DIGITAL_TERMS ).should('not.be.empty' );
		//Validating the Subscribe now button
		cy.log( 'Successfully verified the Digital offer pack' );
		cy.go( 'back' );
		cy.acceptCookieBanner();
		cy.scrollTo( 'top' );
	}
