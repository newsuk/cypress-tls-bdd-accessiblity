import * as loginLogout from "../e2e/tls_page_elements/loginLogout.js";
import * as myAccount from "../e2e/tls_page_elements/myAccount.js";

const environment = Cypress.env("ENV") || "prod";
const url = Cypress.env(`${environment}_url`);
const myAccountLink =
  "//div[@class='tls-header-navigation__right-controls']/span/*[contains(text(),'My Account')]";

describe("Verify login and logout scenarios", () => {
  beforeEach(() => {
    cy.visit(url, { timeout: 60000 }); // Increased timeout for slow-loading environments
    cy.acceptCookieBanner(); // Ensure custom command is implemented correctly
    loginLogout.performLogin(); // Assuming this correctly logs in the user
    cy.xpath(myAccountLink)
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });
  });

  it("should verify the links on the my account page", () => {
    cy.log("Verifying the links on the My Account page");
    myAccount.myAccountLinkValidation(); // Ensure this function is correctly implemented
  });
  it("should verify the billing page links on the my account page", () => {
    cy.log("Verifying the billing page links on the My Account page");
    myAccount.billingLinkValidation(); // Ensure this function is correctly implemented
  });
  it("should verify the footer links on the my account page", () => {
    cy.log("Verifying the footer links on the My Account page");
    myAccount.footerLinkValidatiion(); // Ensure this function is correctly implemented
  });
  it("should verify the go to home page links on the my account page", () => {
    cy.log("Verifying the go to home page links on the My Account page");
    myAccount.goToHomePageLinkValidation(); // Ensure this function is correctly implemented
  });
  it("should verify the logout  link on the my account page", () => {
    cy.log("Verifying the logoutlinks on the My Account page");
    myAccount.logoutButtonValidation(); // Ensure this function is correctly implemented
  });
});
