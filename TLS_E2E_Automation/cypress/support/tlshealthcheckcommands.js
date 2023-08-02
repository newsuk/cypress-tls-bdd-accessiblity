// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@bahmutov/cy-api';
/// <reference types="cypress" />
//import {acceptCookieBanner} from './commands';

//home page elements
const heroBanner =".tls-home-page__hero-banner";
const ads="div[id*='ads']";
const collectionSlices="div[class*='slices']";
const newsletterBlock="div[class='tls-newsletter-block']";
//aticle page elements
const paywallBanner='.tls-subscriptions-block';
const articleHeadline='.tls-headline';
//buy page elements
const PacksSection='.subscription-container';
const subscribeNowButtonForPrintAndDigitalPack='.best-value > .has-utag';
const subscribeNowButtonForPrintPack='.print > .has-utag';
const subscribeNowButtonForDigitalPack='.digital > .has-utag';
const printAndDigitalPrice='.best-value > .price';
const printPrice='.print > .price';
const DigitalPrice='.digital > .price';
const digitalTerms='.digital > .terms';
//current-issue page elements
const currentIssueImage='.tls-contents-page__issue-image';
const PreviousIssueButton='.tls-contents-page__issue-pagination-wrapper > a.tls-link';
const currentIssueDate='.tls-issue-date-line';
//TLS header and footer
const subscribeButtonOnHeader='.tls-header-navigation__button-subscribe > a.tls-button';
const loginButtonOnHeader='.tls-header-navigation__link-login';
const searchButtonOnHeader='.tls-header-navigation__search-icon > a';
const tlsLogoOnHeader='.tls-header-navigation__logo';
const footerContainer='.tls-footer__body-container-wrapper';
const tlsLogoOnFooter='.tls-footer__logo';
const followUsContainerOnFooter='.tls-footer__follow-us__container';

//url elements
const articlePageURL="articles/brexit-deal-eu-meg-russell-lisa-james-stefaan-de-rynck-adam-fagan-stun-van-kessel-philip-cunliffe-book-review-emily-jones/";
const buyPageURL="buy";
const subscriptionPageURLForPrintAndDigitalPack="https://www.the-tls.co.uk/subscription?pc=TLS228KRT8P";
const subscriptionPageURLForPrintAPack="https://www.the-tls.co.uk/subscription?pc=TLS24551GHJ";
const subscriptionPageURLForDigitalPack="https://www.the-tls.co.uk/subscription?pc=TLS26XC3R7Z";
const currentIssuePageURL="issues/current-issue/";
const searchPageURL="https://www.the-tls.co.uk?s";

/**
 * validate the TLS home page
 */
Cypress.Commands.add( 'validateTlsHomePage', () => {
	cy.log( 'Validating the tls home page' );
	cy.visit(Cypress.env('prod_url'),{ timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(heroBanner).should('have.length.at.least', 1);
	cy.get(ads,{ timeout: 10000 }).should('not.be.null');
	cy.get(collectionSlices).should('have.length.at.least', 1);
	cy.get(newsletterBlock).should('have.length.at.least', 1);
} );

/**
 * validate the TLS article page
 */
 Cypress.Commands.add( 'validateTlsArticlePage', () => {
	cy.log( 'Validating the tls article page' );
	cy.visit(Cypress.env('prod_url')+articlePageURL,{ timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(ads,{ timeout: 5000 }).should('be.visible').should('not.be.null');
	cy.get(paywallBanner).should('not.be.null');
    cy.get(articleHeadline).should('not.be.null');
	cy.get(newsletterBlock).should('not.be.null');
} );

/**
 * validate the TLS buy page
 */
 Cypress.Commands.add( 'validateTlsBuyPage', () => {
	cy.log( 'Validating the tls buy page' );
	cy.visit(Cypress.env('prod_url')+buyPageURL,{ timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(PacksSection).should('not.be.empty');
	cy.get(subscribeNowButtonForPrintAndDigitalPack).should('have.attr', 'href',subscriptionPageURLForPrintAndDigitalPack);
	cy.get(subscribeNowButtonForPrintPack).should('have.attr', 'href', subscriptionPageURLForPrintAPack);
	cy.get(subscribeNowButtonForDigitalPack).should('have.attr', 'href', subscriptionPageURLForDigitalPack);
	cy.get(printAndDigitalPrice).should('be.visible');
	cy.get(printPrice).should('be.visible');
	cy.get(DigitalPrice).should('be.visible');
    cy.get(digitalTerms).should('be.visible');
 } );

 /**
 * validate the TLS curent-issue page
 */
  Cypress.Commands.add( 'validateTlsCurrentIssuePage', () => {
	cy.log( 'Validating the tls current-Issue page' );
	cy.visit(Cypress.env('prod_url')+currentIssuePageURL,{ timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(currentIssueImage).should('be.visible');
	cy.get(PreviousIssueButton).click();
	cy.get(currentIssueDate).should('not.be.empty');
 } );

 /**
 * validate the TLS header-footer
 */
Cypress.Commands.add( 'validateTlsHeaderFooter', () => {
	cy.log( 'Validating the tls header-footer' );
	cy.visit(Cypress.env('prod_url'),{ timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(subscribeButtonOnHeader).should('be.visible').should('have.attr', 'href', (Cypress.env('prod_url')+buyPageURL));
	cy.get(loginButtonOnHeader).should('be.visible');
	cy.get(searchButtonOnHeader).should('be.visible').should('have.attr', 'href', searchPageURL);
	cy.get(tlsLogoOnHeader).should('be.visible');
	cy.get(footerContainer).should('not.be.empty');
	cy.get(tlsLogoOnFooter).should('be.visible');
	cy.get(followUsContainerOnFooter).should('not.be.empty');
} );