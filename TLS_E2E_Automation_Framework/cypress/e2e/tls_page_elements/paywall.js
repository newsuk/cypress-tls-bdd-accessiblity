// Import Cypress XPath plugin
require("cypress-xpath");

// Selectors for various page elements
const articleLink = ".tls-card-headline";
const loginButton = ".tls-header-navigation__link-login > a";
const newsLetter =
  "//div[@class='tls-newsletter__wrapper-container modal-content']";
const creds =
  "[class*='mdl-textfield mdl-js-textfield mdl-textfield--floating-label']";
const newsLetterButton =
  "//div[@class='tls-newsletter__wrapper-container modal-content']//span[@role='button']";
const subLink =
  "//div[@class='tls-subscriptions-block__subscribe-btn column is-full has-text-centered']//a[@class='tls-button tls-button--primary']";
const environment = Cypress.env("ENV") || "prod";
const loginSubmitButton = ".auth0-lock-submit";
const logoutLink = ".tls-header-navigation__link-logout";
const loginLink =
  "//div[@class='tls-subscriptions-block__already-customer-box column is-full has-text-centered']//a";
const paywallText =
  "//div[@class='tls-subscriptions-block columns is-gapless is-multiline is-centered']/p";

// Helper function to perform login
function performLogin(userName, password) {
  cy.get(loginButton).click(); // Click the login button
  cy.wait(2000); // Wait for 2 seconds for the login page to load

  cy.get(creds).eq(0).type(userName); // Type username
  cy.get(creds).eq(1).type(password); // Type password
  cy.get(loginSubmitButton).click(); // Submit login form
}

// Function to handle the newsletter banner, scroll, and close if visible
export const closeNewsletterBanner=()=> {
  let scrollPosition = 1000;
  const scrollIncrement = 200;
  const maxScrollHeight = 2500;

  // Function to handle scrolling and checking for the newsletter popup
  function scrollStep() {
    // Scroll the page vertically
    cy.scrollTo(0, scrollPosition).wait(1000); // Wait to handle DOM updates

    // Check if the popup is visible and close it
    cy.get("body").then(($body) => {
      if (
        $body.find(".tls-newsletter__wrapper-container.modal-content").length >
          0 &&
        cy.xpath(newsLetter).should("be.visible")
      ) {
        cy.log("news letter pop up is present on article page");
        cy.xpath(newsLetterButton).click(); // Close the newsletter
      } else if (scrollPosition <= maxScrollHeight) {
        // Continue scrolling if the popup is not found
        scrollPosition += scrollIncrement;
        scrollStep(); // Recursive call to scroll further
      } else {
        // Throw error if popup is not found within scroll limits
        throw new Error("Popup did not appear within scroll limits");
      }
    });
  }

  // Start the scrolling process
  scrollStep();
}

// Verify paywall for a guest user (not logged in)
export function verifyPaywallGuestUser() {
  cy.get(articleLink).eq(3).click(); // Click on a sample article link

  // Check that the login button exists and contains the correct text
  cy.get(loginButton)
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("Login");
    });

  cy.log("The user is not logged in on the TLS site");

  // Close any visible newsletter banner
  closeNewsletterBanner();
  cy.log("The newsletter banner is closed");

  // Ensure the subscription link is visible and exists
  cy.xpath(subLink).scrollIntoView();
  cy.xpath(subLink).should("exist");

  cy.log("Paywall is present for guest user");
}

// Verify paywall for a cancelled user
export function verifyPaywallCancelledUser() {
  // Perform login with a cancelled user's credentials
  performLogin(
    Cypress.env(`${environment}_username_cancelled`),
    Cypress.env(`${environment}_password_cancelled`)
  );

  cy.get(articleLink).eq(3).click(); // Click on a sample article link

  // Check that the logout button exists and contains the correct text
  cy.get(logoutLink)
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("Logout");
    });

  // Ensure the subscription link is visible and exists
  cy.xpath(subLink).scrollIntoView();
  cy.xpath(subLink).should("exist");

  cy.log("Paywall is present for cancelled user");
}

// Verify paywall for a subscribed user
export function verifyPaywallSubscribedUser() {
  // Perform login with a subscribed user's credentials
  performLogin(
    Cypress.env(`${environment}_username`),
    Cypress.env(`${environment}_password`)
  );

  cy.get(articleLink).eq(3).click(); // Click on a sample article link

  // Check that the logout button exists and contains the correct text
  cy.get(logoutLink)
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("Logout");
    });

  // Ensure the subscription link is not present for a subscribed user
  cy.scrollTo(0, 2200);
  cy.xpath(subLink).should("not.exist");

  cy.log("Paywall is not present for subscribed user");
}

// Verify links in the paywall banner
export function verifyLinkInPaywallBanner() {
  // Verify the paywall for a guest user first
  verifyPaywallGuestUser();

  // Check if the login link is visible and has the correct text
  cy.xpath(loginLink)
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("Log in here");
    });

  // Check if the subscription link is visible and has the correct text
  cy.xpath(subLink)
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("Subscribe");
    });

  // Check if the paywall text is visible and has the correct message
  cy.xpath(paywallText)
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("You have no more free articles available");
    });
}
