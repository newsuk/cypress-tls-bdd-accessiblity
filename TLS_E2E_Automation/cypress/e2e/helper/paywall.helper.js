require('cypress-xpath');

const environment = Cypress.env('ENV') || 'prod';

const url = Cypress.env(`${environment}_url`);
const subscribeButton = ".tls-header-navigation__button-subscribe > a";
const articleLink = '.tls-aggregation tls-aggregation--small';
const pwaywallBanner= "//div[@class='tls-single-article__closed-paywall column is-10-desktop']";
const articleSlice ='.tls-aggregation tls-aggregation--small';

function paywallGuest(){
    cy.visit('https://www.the-tls.co.uk/lives/biography/herald-of-a-restless-world-emily-herring-book-review-mark-sinclair', { timeout: 20000});
    cy.acceptCookieBanner();
    cy.get(subscribeButton).should('exist');
    //cy.get(articleLink).scrollIntoView();
    //cy.scrollTo(0, 3000000);
    //cy.get(articleSlice).scrollTo('top');
    cy.xpath(pwaywallBanner).scrollIntoView();
    cy.wait(10000);
    cy.xpath(pwaywallBanner).should('exist');
    cy.log('the user cant able to read the full article: paywall banner is present');

}

module.exports = {
    paywallGuest
};