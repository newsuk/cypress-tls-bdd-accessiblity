import * as welcomeBanner from "../e2e/tls_page_elements/welcomeBanner";

const environment = Cypress.env("ENV") || "prod";
const url = Cypress.env(`${environment}_url`);

beforeEach(() => {
  cy.visit(url, { timeout: 20000 });
  cy.acceptCookieBanner();
});

describe("Verify welcome message banner on TLS site", () => {
  it("should verify the welcome banner for guest user", () => {
    cy.log("verify the welcome message banner for quest user on TLS site");
    welcomeBanner.welcomeBannerGuest();
  });

  it("should verify the welcome message banner for logged in user ", () => {
    welcomeBanner.welcomeMessageLoggedIn();
  });
  it("should verify the user close the welcome message banner from homepage", () => {
    cy.log("verify user closed the welcome message banner from the homepage");
    welcomeBanner.closingBannerFromHomePage();
  });

  it("should verify the user closes the welcome message banner from article page", () => {
    cy.log(
      "verify user closed the welcome message banner from the articlepage"
    );
    welcomeBanner.closingBannerFromArticlePage();
  });
});
