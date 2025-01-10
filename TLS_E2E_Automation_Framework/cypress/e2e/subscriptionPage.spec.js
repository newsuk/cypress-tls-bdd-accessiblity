import * as subscriptionPage from '../e2e/tls_page_elements/subscriptionPage';

const environment = Cypress.env("ENV") || "prod";
const url = Cypress.env(`${environment}_url`);

beforeEach(() => {
  cy.visit(url, { timeout: 20000 });
  cy.acceptCookieBanner();
  subscriptionPage.clickSubsribeButtonOnTheHeader();
});

describe( 'Validate subscription Flow', () => {
	
	it( 'User clicks on Subscribe button, Validate user is navigated to Subscription page & Validate TLS logo and Text in the header ', () => {
		subscriptionPage.clickSubsribeButtonOnTheHeader();
		subscriptionPage.validateUrlOfTheSubscriptionPage();
		subscriptionPage.verifyTheTlsLogoAndtextOnTheHeader();
	});

	it( 'Validate the Digital pack', () => {
		subscriptionPage.validateDigitalPack();
	});

	it( 'Validate the FAQs section', () => {
		subscriptionPage.validateTextInFaqSection();
	});

	it( 'Validate the Subscription Flow of the TLS for new user, by selcting Digital Pack', () => {
		subscriptionPage.validateClickOnDigitalPack();
		subscriptionPage.validateAccountSetupPage();
		subscriptionPage.validateAboutyouPage();
		subscriptionPage.Billing_Address_Details()
		cy.wait(20000)
		subscriptionPage.Payment_Details();
	});
	
});
