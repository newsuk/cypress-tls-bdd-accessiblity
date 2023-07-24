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

//home page elements
const heroBanner =".tls-home-page__hero-banner";
const ads="div[id*='ads']";
const collectionSlices="div[class*='slices']";
const newsletterBlock="div[class='tls-newsletter-block']";

//url elements
const articlePageURL="articles/brexit-deal-eu-meg-russell-lisa-james-stefaan-de-rynck-adam-fagan-stun-van-kessel-philip-cunliffe-book-review-emily-jones/";

/**
 * validate the TLS home page
 */
Cypress.Commands.add( 'validateTlsHomePage', () => {
	cy.log( 'Validating the tls home page' );
	cy.visit(Cypress.env('prod_url'));
	cy.get(heroBanner).should('have.length.at.least', 1);
	cy.get(ads).should('not.be.null');
	cy.get(collectionSlices).should('have.length.at.least', 1);
	cy.get(newsletterBlock).should('have.length.at.least', 1);
} );

/**
 * validate the TLS article page
 */
 Cypress.Commands.add( 'validateTlsArticlePage', () => {
	cy.log( 'Validating the tls article page' );
	cy.visit(Cypress.env('prod_url')+articlePageURL);
	cy.get(heroBanner).should('have.length.at.least', 1);
	cy.get(ads).should('not.be.null');
	cy.get(collectionSlices).should('have.length.at.least', 1);
	cy.get(newsletterBlock).should('have.length.at.least', 1);
} );
