require("cypress-xpath");

// Selector constants
const loginButton = ".tls-header-navigation__link-login > a";
const invalidEmail = "testing@gmail.com";
const passwordInvalid = "1234";
const subscribeButton = ".tls-header-navigation__button-subscribe > a";
const creds =
  "[class*='mdl-textfield mdl-js-textfield mdl-textfield--floating-label']";
const loginSubmitButton = ".auth0-lock-submit";
const logoutLink = ".tls-header-navigation__link-logout";
const myAccountLink = ".tls-header-navigation__my-account";
const articleLink = ".tls-card-headline";
const errorMessage =
  "//div[@class='auth0-global-message auth0-global-message-error']//span[@class='animated fadeInUp']";

// Environment-specific variables
const environment = Cypress.env("ENV") || "prod";
const url = Cypress.env(`${environment}_url`);
const username = Cypress.env(`${environment}_username`);
const password = Cypress.env(`${environment}_password`);

/**
 * Author : Kavinprabu S M
 * Validate the login and logout scenario of the TLS site
 */

// Function to perform user login
export function performLogin() {
  // Click the login button to navigate to the login page
  cy.get(loginButton).click();

  // Wait for 2 seconds for the login page to fully load
  cy.wait(2000);

  // Enter username and password into the login form
  cy.get(creds).eq(0).type(username);
  cy.get(creds).eq(1).type(password);

  // Click the login button to submit the login form
  cy.get(loginSubmitButton).click();
}

// Function to verify if the user is successfully logged in
export function verifyLogin() {
  // Check if the logout link is visible, indicating a successful login
  cy.get(logoutLink)
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("Logout");
    });

  // Check if the "My Account" link is visible
  cy.get(myAccountLink)
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("My Account");
      cy.log("User is successfully logged in on homepage");

      // Navigate to an article page and verify the user is still logged in
      cy.get(articleLink).eq(0).click();
      cy.get(logoutLink)
        .invoke("text")
        .then((text) => {
          expect(text).to.equal("Logout");
        });

      cy.log("User is successfully logged in on article page");
    });
}

// Function to perform user logout
export function performLogout() {
  // Click the logout link to log out the user
  cy.get(logoutLink).click();

  // Verify if the Subscribe button is visible, indicating a successful logout
  cy.get(subscribeButton)
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("Subscribe");
    });
  cy.log("The user is successfully logged out from homepage");

  // Navigate to an article page and verify the user is logged out
  cy.get(articleLink).eq(0).click();
  cy.get(loginButton)
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("Login");
    });
  cy.log("The user is successfully logged out from article page");
}

// Validate login functionality from the homepage
export function validateLoginFromHomepage() {
  cy.log("Verify the user tries to login from homepage");

  // Verify the user is currently logged out
  cy.get(subscribeButton)
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("Subscribe");
    });
  cy.log("The user is logged out");

  // Perform login and verify
  performLogin();
  verifyLogin();
}

// Validate login functionality from an article page
export function validateLoginFromArticlePage() {
  cy.log("Verify the user tries to login from article page");

  // Navigate to the first article and verify the user is logged out
  cy.get(articleLink).eq(0).click();
  cy.get(subscribeButton)
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("Subscribe");
    });
  cy.log("The user is logged out");

  // Perform login and verify
  performLogin();
  verifyLogin();
}

// Validate logout functionality from the homepage
export function validateLogoutFromHomepage() {
  cy.log("Verify the logout scenario from the homepage");

  performLogin();

  // Perform logout and verify
  cy.log("The user tries to logout...");
  performLogout();
}

// Validate logout functionality from an article page
export function validateLogoutFromArticlePage() {
  cy.log("Verify the logout scenario from the article page");

  performLogin();

  // Navigate to the first article and perform logout
  cy.get(articleLink).eq(0).click();
  performLogout();
}

// Validate login attempt with invalid credentials
export function validateLoginForInvalidCreds() {
  cy.log("Verify when user tries to login using invalid credentials");

  // Click the login button to navigate to the login page
  cy.get(loginButton).click();

  // Wait for 2 seconds for the login page to fully load
  cy.wait(2000);

  // Enter invalid credentials
  cy.get(creds).eq(0).type(invalidEmail);
  cy.get(creds).eq(1).type(passwordInvalid);

  // Click the login button to submit the login form
  cy.get(loginSubmitButton).click();

  // Verify if an error message is displayed for incorrect credentials
  cy.xpath(errorMessage)
    .should("exist")
    .invoke("text")
    .then((text) => {
      expect(text).to.equal(
        "Sorry, your email address and/or password are incorrect - please try again."
      );
    });
}
