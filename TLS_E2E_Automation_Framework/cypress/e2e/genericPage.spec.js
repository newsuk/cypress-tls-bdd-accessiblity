
import * as genericPage from '../e2e/tls_page_elements/genericPage';

const environment = Cypress.env("ENV") || "prod";
const url = Cypress.env(`${environment}_url`);

beforeEach(() => {
	cy.visit(url, { timeout: 20000 });
	cy.acceptCookieBanner();
  });

describe('Generic Page validation', () => {
	
	//Validate the login button,serach icon, subscribe
	it( 'Validate Subscribe,Login button and search icon are visible', () => {
		genericPage.validateHomePageSubscribeSearchAndLoginButtoons();
	});

	//Validate the shop icon
	it( 'Validate Shop icon is visible', () => {
		genericPage.validateShopOnTitle();
	});

	//Validate the Footer logo and main topics
	it( 'Valiate Footer logo and its topics', () => {
		genericPage.validateFooterLogoAndMainTopics();
	});

	//Validate Terms and Conditons at botton
	it( 'Validate Terms and conditions, Privacy and Cookie', () => {
		genericPage.validateTermConditionPrivacyandCookieInFooter();
	});

	// Valiate apple podcasts, spotify and google podcasts
	it( 'Validate Apple Podcasts, Spotify and Google Podcasts', () => {
		genericPage.validatePodcasts();
	});

	//Valiate about us
	it( 'Validate page is navigates to Aboutus and its has header and logo', () => {
		genericPage.validateAboutUs();
	});
});
