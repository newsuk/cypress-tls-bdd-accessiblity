// Importing paywall-related functions from the paywall module
import * as paywall from "../e2e/tls_page_elements/paywall";

// Environment setup to get the appropriate URL from environment variables
const environment = Cypress.env("ENV") || "prod"; // Default to 'prod' if ENV is not set
const url = Cypress.env(`${environment}_url`); // Get the URL for the environment (e.g., staging or prod)

// `beforeEach` hook runs before each test case to set up the environment
beforeEach(() => {
  cy.visit(url, { timeout: 20000 }); // Visit the page with a timeout of 20 seconds
  cy.acceptCookieBanner(); // Accept the cookie banner to ensure cookies are set
});

// Describe block to group all paywall-related tests for different user types
describe("Verify the paywall behavior for different user types", () => {
  // Test case for verifying the paywall for a guest user (not logged in)
  it("should verify the paywall for guest user", () => {
    cy.log("Verifying the paywall for the guest user on TLS site");
    paywall.verifyPaywallGuestUser(); // Call the function to verify the paywall for guest users
  });

  // Test case for verifying the paywall for a cancelled user
  it("should verify the paywall for the cancelled user", () => {
    cy.log("Verifying the paywall for the cancelled user on TLS site");
    paywall.verifyPaywallCancelledUser(); // Call the function to verify the paywall for cancelled users
  });

  // Test case for verifying the paywall for a subscribed user
  it("should verify the paywall for the subscribed user", () => {
    cy.log("Verifying the paywall for the subscribed user on TLS site");
    paywall.verifyPaywallSubscribedUser(); // Call the function to verify the paywall for subscribed users
  });

  // Test case for verifying the links within the paywall banner
  it("should verify the links on the paywall banner", () => {
    cy.log("Verifying the links in the paywall banner on the TLS site");
    paywall.verifyLinkInPaywallBanner(); // Call the function to verify the links in the paywall banner
  });
});
