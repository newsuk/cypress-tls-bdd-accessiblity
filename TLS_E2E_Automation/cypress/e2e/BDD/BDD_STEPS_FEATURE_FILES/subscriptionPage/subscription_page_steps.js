/**
 * External dependencies
 */
import { Given, And, Then } from 'cypress-cucumber-preprocessor/steps';
/**
 * Internal dependencies
 */
import subscriptionPage from '../../BDD_TLS_Pages/subscriptionPage';
import '.../../../../support/e2e';
/**
 * TNLST-322
 */
Given( 'User clicks on TLS Logo', () => {
	cy.clickTLSLogo();
	cy.acceptCookieBanner();
});

And( 'User clicks on Subscribe button', () => {
	subscriptionPage.clickSubsribeButtonOnTheHeader();
});

Then( 'Validate user is navigated to Subscription page', () => {
	subscriptionPage.validateUrlOfTheSubscriptionPage();
});

/**
 * TNLST-323
 */
And( 'Validate TLS logo and Text in the header', () => {
	subscriptionPage.verifyTheTlsLogoAndtextOnTheHeader();
});

/**
 * TNLST-341
 */
And( 'Validate the FAQs section', () => {
	subscriptionPage.validateTextInFaqSection();
});

/**
 * TNLST-343
 */
And( 'Validate the Print pack', () => {
	subscriptionPage.validatePrintPack();
});

And( 'Validate the Print and Digital pack', () => {
	subscriptionPage.validatePrintAndDigitalPack();
});

And( 'Validate the Digital pack', () => {
	subscriptionPage.validateDigitalPack();
});

