import * as explorePage from '../e2e/tls_page_elements/explorePage';

const environment = Cypress.env("ENV") || "prod";
const url = Cypress.env(`${environment}_url`);

describe('Explore Page validation', () => {
		beforeEach(() => {
				cy.visit(url, { timeout: 20000 });
				cy.acceptCookieBanner();
			});

		it( 'Validate Explore title', () => {
			explorePage.validateExploreOnTitle();
		});

		it( 'Validate Explore title and categories', () => {
			explorePage.validateExploreCategories();
		});

		it( 'User navigates to new to tls page', () => {
			explorePage.navigateToExploreCategoryNEWTOTLS();
		});

		it( 'Validate all links in the page', () => {
			explorePage.validateNEWTOTLSPageLinks();
		})
});