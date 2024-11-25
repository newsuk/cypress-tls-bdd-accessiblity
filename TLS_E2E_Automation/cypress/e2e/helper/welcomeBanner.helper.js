require('cypress-xpath');


const welcomeMessageBanner = '.tls-home-page__hero-banner';
const closeButton = "//div[@class='tls-welcome-message-banner']/span[@role='button']";
const welcomemessageBannerArticelPage='.tls-welcome-message-banner';
const articleLink = '.tls-card-headline';
const tlsLogo='.tls-header-navigation__logo';
const environment = Cypress.env('ENV') || 'prod';
const url = Cypress.env(`${environment}_url`);
const {performLogin} = require('/Users/ksm/Documents/GitHub/cypress-tls-bdd-accessiblity/TLS_E2E_Automation/cypress/e2e/helper/loginLogout.helper.js');
const appButton='.tls-welcome-message-banner__wrapper-image-container';
const closeBanner= "//div[@class='tls-home-page__hero-banner-wrapper']";

function welcomeBannerGuest(){
    cy.visit(url, { timeout: 20000});
    cy.acceptCookieBanner();
    cy.get(welcomeMessageBanner).should('exist');
    cy.get(appButton).should('not.exist');
    cy.xpath(closeButton).should('exist');
    cy.get(articleLink).eq(0).click();
    cy.get(welcomemessageBannerArticelPage).should('exist');
    cy.get(appButton).should('not.exist');
}
function welcomeMessageLoggedin(){
    cy.visit(url, { timeout: 20000 });
    cy.acceptCookieBanner();
    cy.get(welcomeMessageBanner).should('exist');
    performLogin();
    cy.get(appButton).should('exist');
    cy.get(articleLink).eq(0).click();
    cy.get(welcomemessageBannerArticelPage).should('exist');
    cy.get(appButton).should('exist');
    
}

function closingBannerFromHomePage(){
    cy.visit(url, { timeout: 20000 });
    cy.acceptCookieBanner();
    cy.get(welcomeMessageBanner).should('exist');
    cy.xpath(closeButton).should('exist').click();
    cy.wait(4000);
    cy.xpath(closeBanner).should('exist');
    cy.reload();
    cy.xpath(closeBanner).should('exist');
    cy.get(articleLink).eq(0).click();
    cy.xpath(closeBanner).should('not.exist');
}

function closingBannerFromArtilepage(){
    cy.visit(url, { timeout: 20000 });
    cy.acceptCookieBanner();
    cy.get(articleLink).eq(0).click();
    cy.get(welcomemessageBannerArticelPage).should('exist');
    cy.xpath(closeButton).should('exist').click();
    cy.wait(4000);
    cy.xpath(closeBanner).should('not.exist');
    cy.get(tlsLogo).click();
    cy.wait(2000);
    cy.xpath(closeBanner).should('exist');

}

module.exports = {
    welcomeBannerGuest,
    welcomeMessageLoggedin,
    closingBannerFromHomePage,
    closingBannerFromArtilepage
};