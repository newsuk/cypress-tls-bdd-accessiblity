
import * as issuePage from '../e2e/tls_page_elements/issuePage';

const environment = Cypress.env("ENV") || "prod";
const url = Cypress.env(`${environment}_url`);

beforeEach(() => {
  cy.visit(url, { timeout: 20000 });
  cy.acceptCookieBanner();
  issuePage.navigateToCurrentIssuePage();
});
    
 describe('Current issue page validation', () => {

    it( 'User Navigate to Current Issue and validate current issue page should load correctly', () => {
        issuePage.validateToCurrentIssuePage();
    });

    it( 'Validate the Previous Issue and Next Issue in Current Issue Page', () => {
        issuePage.validateCurrentIssuePageHasPreviousNextIssue();
    });

    it( 'Validate User should have Previous Issue (which is 7 days before from current Issue)', () => {
        issuePage.validatePreviousIssue();
    });

    it( 'Validate the Current Issue page and View Content page are opens same and both dates are equal', () => {
       issuePage.validateViewContentAndCurrentPageSame();
    });

    it( 'Validate the Current Issue and Previous Issue has Image,Artcile headline and By', () => {
        issuePage.validateImageArticleContentInPreviousAndCurrentIssue();
    });

    it( 'Validate showcase section', () => {
        issuePage.validateShowcaseSection();
    });

    it( 'Validate Contents section', () => {
        issuePage.validateContentSection();
    });
})
