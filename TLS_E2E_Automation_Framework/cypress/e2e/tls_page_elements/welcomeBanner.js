require('cypress-xpath');
import * as performLogin from './loginLogout.js';

// Selector constants 
const WELCOME_MESSAGE_BANNER = '.tls-home-page__hero-banner';
const CLOSE_BUTTON_XPATH = "//div[@class='tls-welcome-message-banner']/span[@role='button']";
const ARTICLE_PAGE_WELCOME_BANNER = '.tls-welcome-message-banner';
const ARTICLE_LINK = '.tls-card-headline';
const TLS_LOGO = '.tls-header-navigation__logo';
const APP_BUTTON = '.tls-welcome-message-banner__wrapper-image-container';
const CLOSED_BANNER_XPATH = "//div[@class='tls-home-page__hero-banner-wrapper']";

// Environment-specific 
const environment = Cypress.env('ENV') || 'prod';
const url = Cypress.env(`${environment}_url`);

/**
 * Validates the welcome banner behavior for a guest user.
 */
export function welcomeBannerGuest() {
    // Visit the homepage and accept the cookie banner
    cy.visit(url, { timeout: 20000 });
    cy.acceptCookieBanner();

    // Verify the welcome banner is present and the app button is absent
    cy.get(WELCOME_MESSAGE_BANNER).should('exist');
    cy.get(APP_BUTTON).should('not.exist');
    cy.xpath(CLOSE_BUTTON_XPATH).should('exist');

    // Navigate to an article and verify welcome banner presence on article page
    cy.get(ARTICLE_LINK).eq(0).click();
    cy.get(ARTICLE_PAGE_WELCOME_BANNER).should('exist');
    cy.get(APP_BUTTON).should('not.exist');
}

/**
 * Validates the welcome banner behavior for a logged-in user.
 */
export function welcomeMessageLoggedIn() {
    // Visit the homepage and accept the cookie banner
    cy.visit(url, { timeout: 20000 });
    cy.acceptCookieBanner();

    // Verify the welcome banner is present, then perform login
    cy.get(WELCOME_MESSAGE_BANNER).should('exist');
    performLogin.performLogin();

    // Verify the app button is visible after login
    cy.get(APP_BUTTON).should('exist');

    // Navigate to an article page and verify the welcome banner and app button are present
    cy.get(ARTICLE_LINK).eq(0).click();
    cy.get(ARTICLE_PAGE_WELCOME_BANNER).should('exist');
    cy.get(APP_BUTTON).should('exist');
}

/**
 * Closes the welcome banner from the homepage and verifies the behavior.
 */
export function closingBannerFromHomePage() {
    // Visit the homepage and accept the cookie banner
    cy.visit(url, { timeout: 20000 });
    cy.acceptCookieBanner();

    // Verify the welcome banner and click the close button
    cy.get(WELCOME_MESSAGE_BANNER).should('exist');
    cy.xpath(CLOSE_BUTTON_XPATH).should('exist').click();

    // Wait for the banner to close and verify it remains closed after reload
    cy.wait(2000);
    cy.xpath(CLOSED_BANNER_XPATH).should('exist');
    cy.reload();
    cy.xpath(CLOSED_BANNER_XPATH).should('exist');

    // Navigate to an article page and verify the banner is not visible
    cy.get(ARTICLE_LINK).eq(0).click();
    cy.xpath(CLOSED_BANNER_XPATH).should('not.exist');
}

/**
 * Closes the welcome banner from an article page and verifies the behavior.
 */
export function closingBannerFromArticlePage() {
    // Visit the homepage, accept the cookie banner, and navigate to an article page
    cy.visit(url, { timeout: 20000 });
    cy.acceptCookieBanner();
    cy.get(ARTICLE_LINK).eq(0).click();

    // Verify the welcome banner and click the close button
    cy.get(ARTICLE_PAGE_WELCOME_BANNER).should('exist');
    cy.xpath(CLOSE_BUTTON_XPATH).should('exist').click();

    // Wait for the banner to close and verify it's not visible on the article page
    cy.wait(2000);
    cy.xpath(CLOSED_BANNER_XPATH).should('not.exist');

    // Return to the homepage and verify the banner is visible again
    cy.get(TLS_LOGO).click();
    cy.wait(2000);
    cy.xpath(CLOSED_BANNER_XPATH).should('exist');
}
