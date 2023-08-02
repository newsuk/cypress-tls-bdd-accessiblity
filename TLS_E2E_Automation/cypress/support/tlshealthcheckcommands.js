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

//archive page elements
const VerifySearchFilter ="[class*='tls-archive-issue-page__header-filter-section-search-filter']";
const VerifyDropdownForYears ="[class*='tls-date-filter__dropdown-btn']";
const selectYears ="[class*='tls-date-filter__content-item']";
const VerifySearchedAuthorPage="[class*='tls-search-core__hits']";
const VerifyContainer="[class*='tls-archive-issue-page__content']";
const VerifyShowmoreButton="[class*='tls-show-more']";
const VerifyArchiveLinkYear=".tls-issue__explore-section-content-link > a";

//NewToTheTLSPage
const VerifyTitleContainer="[class*='tls-aggregation__content-container columns is-multiline is-gapless']";
const VerifyImage="[class*='wp-block-image']";

//Highlight page elements
const VerifyHighlightHeader="[class*='tls-collections-header__content']";
const VerifyContent="[class*='tls-category-page']";
const VerifyHomeBreadcrum=".tls-category__breadcrumbs > a";

//Longreads page elements
const VerifyLongReadsHeader="[class*='tls-aggregation tls-aggregation--large']";
const VerifyContentofLongReadsPage="[class*='tls-aggregation-page__article-list']";

//url elements
const articlePageURL="articles/brexit-deal-eu-meg-russell-lisa-james-stefaan-de-rynck-adam-fagan-stun-van-kessel-philip-cunliffe-book-review-emily-jones/";
const archivePageURL="archive/";
const NewToTheTLSPageURL="new-to-the-tls/";
const HighlightsPageURL="categories/highlights/";
const LongReadsPageURL="topics/long-reads/";
const HighlightsLinkForHomeBreadcrum="https://www.the-tls.co.uk";

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
	cy.visit(Cypress.env('prod_url')+articlePageURL, { timeout: 3000 } );
	cy.get(heroBanner).should('have.length.at.least', 1);
	cy.get(ads).should('not.be.null');
	cy.get(collectionSlices).should('have.length.at.least', 1);
	cy.get(newsletterBlock).should('have.length.at.least', 1);
} );

/**
 * validate the TLS archive page
 */
Cypress.Commands.add( 'validateTlsArchivePage', () => {
	cy.log( 'Validating the tls archive page' );
	cy.visit(Cypress.env('prod_url')+archivePageURL, { timeout: 3000 });
	cy.acceptCookieBanner();
	cy.title().should('eq', 'The Archive - TLS');
	//dropdownForYears Validation
	cy.get(VerifyDropdownForYears).click();
	cy.get(selectYears).eq(0).click();
	cy.get(VerifyDropdownForYears).should('not.be.null');
	//ValidationFor Container
	cy.get(VerifyContainer).should('not.be.null');
	cy.get(VerifyShowmoreButton).should('be.visible');
	cy.get(VerifyArchiveLinkYear).should('be.visible');
	//searchFilter Validation
	cy.get(VerifySearchFilter).click().type('Mary Beard').type('{enter}')
	cy.get(VerifySearchedAuthorPage).should('not.be.null');
	
} );

/**
 * validate the TLS NewToTheTLS page
 */
Cypress.Commands.add( 'validateNewToTheTLSPage', () => {
	cy.log( 'Validating the NewToTheTLS page' );
	cy.visit(Cypress.env('prod_url')+NewToTheTLSPageURL,{ timeout: 3000 });
	cy.acceptCookieBanner();
	cy.get(VerifyTitleContainer).should ('not.be.null');
	cy.get(VerifyImage).should('be.visible');
} );

/**
 * validate the TLS Highlights page
 */
Cypress.Commands.add( 'validateHighlightsPage', () => {
	cy.log( 'Validating the Highlights page' );
	cy.visit(Cypress.env('prod_url')+HighlightsPageURL, { timeout: 4000 });
	cy.acceptCookieBanner();
	cy.get(VerifyHighlightHeader, { timeout: 3000 }).should('not.be.null'); 
	cy.get(VerifyHomeBreadcrum).eq(0).should('be.visible').should('have.attr', 'href', HighlightsLinkForHomeBreadcrum);
	cy.get(VerifyContent).should('not.be.null')
	cy.get(VerifyShowmoreButton).should('be.visible');
} );

/**
 * validate the TLS LongReads page
 */
Cypress.Commands.add( 'validateLongReadsPage', () => {
	cy.log( 'Validating the LongReads page' );
	cy.visit(Cypress.env('prod_url')+LongReadsPageURL, { timeout: 3000 });
	cy.acceptCookieBanner();
	cy.get(VerifyLongReadsHeader).should('not.be.null');
	cy.get(VerifyContentofLongReadsPage).should('not.be.null');
	cy.get(VerifyShowmoreButton).should('be.visible');
} );

