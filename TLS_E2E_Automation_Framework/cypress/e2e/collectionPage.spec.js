import collectionPage from "../e2e/tls_page_elements/collectionPage.js";

const environment = Cypress.env("ENV") || "prod";
const url = Cypress.env(`${environment}_url`);

beforeEach(() => {
  cy.visit(url, { timeout: 20000 });
  cy.acceptCookieBanner();
});

describe("Verify collection page on TLS", () => {
  it("should verify collection page slice on homepage", () => {
    cy.log("verify collection page slice on homepagee");
    collectionPage.validateCollectionPageLinks();
  });
  it("should verify collection page links and image", () => {
    cy.log("verify collection page link and image");
    collectionPage.validateCollectionPage();
  });
});
