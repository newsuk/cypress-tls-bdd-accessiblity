import newsLetter from "../e2e/tls_page_elements/newsletter.js";

// Set the environment and URL dynamically based on Cypress configuration or default to "prod"
const environment = Cypress.env("ENV") || "prod";
const url = Cypress.env(`${environment}_url`);

beforeEach(() => {
  // Visit the URL with a timeout and handle the cookie banner before each test
  cy.visit(url, { timeout: 20000 });
  cy.acceptCookieBanner(); // Ensure cookie banner is handled
});

describe("Verify Newsletter Functionality on TLS", () => {
  /**
   * Verifies the newsletter popup and block presence on the homepage.
   */
  it("should verify newsletter popup and newsletter block on TLS homepage", () => {
    cy.log(
      "Starting test to verify newsletter popup and block on the homepage."
    );
    newsLetter.validateNewsLetterHomePage();
    cy.log("Successfully verified newsletter popup and block on the homepage.");
  });

  /**
   * Validates the newsletter popup and block presence on an article page.
   */
  it("should verify newsletter popup and section on an article page", () => {
    cy.log(
      "Starting test to verify newsletter popup and block on an article page."
    );
    newsLetter.validateNewsLetterArticlePage();
    cy.log(
      "Successfully verified newsletter popup and block on the article page."
    );
  });

  /**
   * Tests newsletter subscription via the popup.
   */
  it("should verify newsletter subscription from popup", () => {
    cy.log("Starting test to verify newsletter subscription from popup.");
    newsLetter.newsletterSubscriptionFromPopUp();
    cy.log("Successfully verified newsletter subscription from popup.");
  });

  /**
   * Tests newsletter subscription via the block on the homepage.
   */
  it("should verify newsletter subscription from block", () => {
    cy.log("Starting test to verify newsletter subscription from block.");
    newsLetter.newsletterSubscriptionFromBlock();
    cy.log("Successfully verified newsletter subscription from block.");
  });

  /**
   * Verifies closing the newsletter popup from the homepage.
   */
  it("should verify closing newsletter popup on homepage", () => {
    cy.log(
      "Starting test to verify closing the newsletter popup on the homepage."
    );
    newsLetter.validateClosingPopUpHomePage();
    cy.log(
      "Successfully verified the newsletter popup is closed on the homepage."
    );
  });

  /**
   * Verifies closing the newsletter popup from an article page.
   */
  it("should verify closing newsletter popup from article page", () => {
    cy.log(
      "Starting test to verify closing the newsletter popup from an article page."
    );
    newsLetter.validateClosingPopUpFromArticlePage();
    cy.log(
      "Successfully verified the newsletter popup is closed on the article page."
    );
  });

  /**
   * Tests a valid newsletter subscription on the article page.
   */
  it("should verify valid newsletter subscription from article page", () => {
    cy.log(
      "Starting test to verify valid newsletter subscription from article page."
    );
    newsLetter.validSubscriptionArticlePage();
    cy.log(
      "Successfully verified newsletter subscription on the article page."
    );
  });

  /**
   * Tests newsletter subscription with invalid credentials.
   */
  it("should verify signing up for newsletter using invalid credentials", () => {
    cy.log("Starting test to verify error handling for invalid credentials.");
    newsLetter.validSubscriptionInvalidCreds();
    cy.log(
      "Successfully verified error handling for invalid newsletter credentials."
    );
  });

  /**
   * Verifies the newsletter popup appears after clearing cookies and storage.
   */
  it("should verify newsletter popup after clearing cookies and storage", () => {
    cy.log("Starting test to verify newsletter popup after clearing cookies.");
    newsLetter.validatePopupAfterClearingStorage();
    cy.log(
      "Successfully verified newsletter popup after clearing cookies and storage."
    );
  });
});
