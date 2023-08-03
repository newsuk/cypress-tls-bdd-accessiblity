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
const heroBanner = ".tls-home-page__hero-banner";
const ads = "div[id*='ads']";
const collectionSlices = "div[class*='slices']";
const newsletterBlock = "div[class='tls-newsletter-block']";

//aticle page elements
const homePageArtilce = ':nth-child(2) > .tls-card-horizontal-medium__content > .tls-card-headline > .tls-card-headline__title';
const paywallBanner = '.tls-subscriptions-block';
const articleHeadline = '.tls-headline';

//buy page elements
const packsSection = '.subscription-container';
const subscribeNowButtonForPrintAndDigitalPack = '.has-utag';
const subscribeNowButton = '.best-value > .has-utag';
const printAndDigitalPrice = '.best-value > .price';
const printPrice = '.print > .price';
const digitalPrice = '.digital > .price';
const digitalTerms = '.digital > .terms';
const subscriptionPageHeading = '.sc-iBEsjs > .sc-caSCKo';
const emailAddress = '#email';
const password = '#password';
const continueButton = '#account-setup-continue';

//current-issue page elements
const currentIssueImage = '.tls-contents-page__issue-image';
const previousIssueButton = '.tls-contents-page__issue-pagination-wrapper > a.tls-link';
const currentIssueDate = '.tls-issue-date-line';

//TLS header and footer
const subscribeButtonOnHeader = '.tls-header-navigation__button-subscribe > a.tls-button';
const loginButtonOnHeader = '.tls-header-navigation__link-login';
const searchButtonOnHeader = '.tls-header-navigation__search-icon > a';
const tlsLogoOnHeader = '.tls-header-navigation__logo';
const footerContainer = '.tls-footer__body-container-wrapper';
const tlsLogoOnFooter = '.tls-footer__logo';
const followUsContainerOnFooter = '.tls-footer__follow-us__container';

//archive page elements
const verifySearchFilter = "[class*='tls-archive-issue-page__header-filter-section-search-filter']";
const verifyDropdownForYears = ".tls-date-filter__dropdown-btn";
const selectYears = "[class*='tls-date-filter__content-item']";
const verifySearchedAuthorPage = "[class*='tls-search-core__hits']";
const verifyContainer = "[class*='tls-archive-issue-page__content']";
const verifyShowmoreButton = "[class*='tls-show-more']";
const verifyArchiveLinkYear = ".tls-issue__explore-section-content-link > a";

//NewToTheTLSPage
const verifyTitleContainer = "[class*='tls-aggregation__content-container columns is-multiline is-gapless']";
const verifyImage = "[class*='wp-block-image']";

//Highlight page elements
const verifyHighlightHeader = "[class*='tls-collections-header__content']";
const verifyContent = "[class*='tls-category-page']";
const verifyHomeBreadcrum = ".tls-category__breadcrumbs > a";

//Longreads page elements
const verifyLongReadsHeader = "[class*='tls-aggregation tls-aggregation--large']";
const verifyContentofLongReadsPage = "[class*='tls-aggregation-page__article-list']";

//TLS Author page
const verifyAuthorName = "[class*='tls-aggregation-page__author-details-name']";

//TLS Category page
const verifyCategoryName = "[class*='tls-collections-header__title']";
const verifyCategorySubMenu = "[class*='tls-aggregation-page__categorySubmenu']";
const verifyCategoryBreadCrumbs = "[class*='tls-category__breadcrumbs']";


//TLS search Page 
const verifySearchPageResults = "[class*='tls-search-core__hits']";
const verifySearchBar = "[class*='ais-SearchBox']";

//url elements
const buyPageURL = "buy";
const subscriptionPageURL = "https://www.the-tls.co.uk/subscription";
const currentIssuePageURL = "issues/current-issue/";

//const searchPageURL="https://www.the-tls.co.uk?s";
const continueButtonText = "Continue";
const subscribeNowButtonText = "Subscribe now";
const subscriptionPageTitle = "Account set up";
const articlePageURL = "articles/brexit-deal-eu-meg-russell-lisa-james-stefaan-de-rynck-adam-fagan-stun-van-kessel-philip-cunliffe-book-review-emily-jones/";
const archivePageURL = "archive/";
const newToTheTLSPageURL = "new-to-the-tls/";
const highlightsPageURL = "categories/highlights/";
const longReadsPageURL = "topics/long-reads/";
const highlightsLinkForHomeBreadcrum = "https://www.the-tls.co.uk";
const authorPageURL = "authors/david-herd/";
const categoryPageURL = "categories/culture/";
const searchPageURL = "/?s";

/**
 * Author : Balaji Krishnan
 * validate the TLS home page
 */
Cypress.Commands.add('validateTlsHomePage', () => {
	cy.log('Validating the tls home page');
	cy.visit(Cypress.env('prod_url'), { timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(heroBanner).should('have.length.at.least', 1);
	cy.get(ads, { timeout: 10000 }).should('not.be.null');
	cy.get(heroBanner, { timeout: 10000 }).should('have.length.at.least', 1);
	cy.get(collectionSlices).should('have.length.at.least', 1);
	cy.get(newsletterBlock).should('have.length.at.least', 1);
});

/**
*Author : Roopa Biradar
*validate the TLS article page
*/
Cypress.Commands.add('validateTlsArticlePage', () => {
	cy.log('Validating the tls article page');
	cy.visit(Cypress.env('prod_url') + articlePageURL, { timeout: 10000 });
	cy.get(heroBanner, { timeout: 10000 }).should('have.length.at.least', 1);
	cy.get(ads).should('be.visible');
	cy.get(collectionSlices).should('have.length.at.least', 1);
	cy.get(newsletterBlock).should('have.length.at.least', 1);
});

/**
 * Author : Chetana Hiremath
 * validate the TLS archive page
 */
Cypress.Commands.add('validateTlsArticlePage', () => {
	cy.log('Validating the tls article page');
	cy.visit(Cypress.env('prod_url'));
	cy.acceptCookieBanner();
	cy.get(homePageArtilce).then(function ($elem) {
		let headline = $elem.text()
		cy.get(homePageArtilce).click();
		cy.acceptCookieBanner();
		cy.get(articleHeadline).should('be.visible').should('have.text', headline);
	})
	cy.acceptCookieBanner();
	cy.get(ads, { timeout: 10000 }).should('be.visible').should('not.be.null');
	cy.get(paywallBanner).should('be.visible').should('not.be.null');
	cy.get(articleHeadline).should('be.visible').should('not.be.null');
	cy.get(newsletterBlock).should('be.visible').should('not.be.null');
});

/**
 * Author : Roopa Biradar
 * validate the TLS buy page
 */
Cypress.Commands.add('validateTlsBuyPage', () => {
	cy.log('Validating the tls buy page');
	cy.visit(Cypress.env('prod_url') + buyPageURL, { timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(packsSection).should('not.be.empty');
	cy.get(subscribeNowButtonForPrintAndDigitalPack).each(($button) => {
		cy.wrap($button).should('have.text', subscribeNowButtonText).should('have.attr', 'href')
			.and('include', subscriptionPageURL);
	});
	cy.get(printAndDigitalPrice).should('be.visible');
	cy.get(printPrice).should('be.visible');
	cy.get(digitalPrice).should('be.visible');
	cy.get(digitalTerms).should('be.visible');
	cy.get(subscribeNowButton).click();
	cy.acceptCookieBanner();
	cy.get(subscriptionPageHeading).should('be.visible').should('have.text', subscriptionPageTitle);
	cy.get(emailAddress).should('be.visible');
	cy.get(password).should('be.visible');
	cy.get(continueButton).should('be.visible').should('have.text', continueButtonText)
});

/**
 *  * Author : Roopa Biradar
* validate the TLS curent-issue page
*/
Cypress.Commands.add('validateTlsCurrentIssuePage', () => {
	cy.log('Validating the tls current-Issue page');
	cy.visit(Cypress.env('prod_url') + currentIssuePageURL, { timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(currentIssueImage).should('be.visible');
	cy.get(previousIssueButton).click();
	cy.get(currentIssueDate).should('be.visible').should('not.be.empty');
});

/**
* Author : Roopa Biradar
* validate the TLS header-footer
*/
Cypress.Commands.add('validateTlsHeaderFooter', () => {
	cy.log('Validating the tls header-footer');
	cy.visit(Cypress.env('prod_url'), { timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(subscribeButtonOnHeader).should('be.visible').should('have.attr', 'href', (Cypress.env('prod_url') + buyPageURL));
	cy.get(loginButtonOnHeader).should('be.visible');
	cy.get(searchButtonOnHeader).should('be.visible').should('have.attr', 'href', searchPageURL);
	cy.get(tlsLogoOnHeader).should('be.visible');
	cy.get(footerContainer).should('be.visible').should('not.be.empty');
	cy.get(tlsLogoOnFooter).should('be.visible');
	cy.get(followUsContainerOnFooter).should('be.visible').should('not.be.empty');
});

/**
* Author : Chetana Hiremath
* validate the TLS header-footer
*/
Cypress.Commands.add('validateTlsArchivePage', () => {
	cy.log('Validating the tls archive page');
	cy.visit(Cypress.env('prod_url') + archivePageURL, { timeout: 10000 });
	cy.wait(4000);
	cy.acceptCookieBanner();
	cy.title().should('eq', 'The Archive - TLS');

	//Validation for dropdown
	cy.get(verifyDropdownForYears).click();
	cy.get(selectYears).eq(0).click();
	cy.get(verifyDropdownForYears).wrap(2023).should('be.gte', 2023);

	//Validation for Container
	cy.get(verifyContainer).should('be.visible');
	cy.get(verifyShowmoreButton).should('be.visible');
	cy.get(verifyArchiveLinkYear).should('be.visible');

	//searchFilter Validation
	cy.get(verifySearchFilter).click()
	cy.get(verifySearchFilter).type('Mary Beard {enter}');
	cy.get(verifySearchedAuthorPage).should('be.visible');
});

/**
 * Author : Chetana Hiremath
 * validate the TLS NewToTheTLS page
 */
Cypress.Commands.add('validateNewToTheTLSPage', () => {
	cy.log('Validating the NewToTheTLS page');
	cy.visit(Cypress.env('prod_url') + newToTheTLSPageURL, { timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(verifyTitleContainer).should('be.visible');
	cy.get(verifyImage).should('be.visible');
});

/**
 * Author : Chetana Hiremath
 * validate the TLS Highlights page
 */
Cypress.Commands.add('validateHighlightsPage', () => {
	cy.log('Validating the Highlights page');
	cy.visit(Cypress.env('prod_url') + highlightsPageURL, { timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(verifyHighlightHeader, { timeout: 3000 }).should('not.be.null');
	cy.get(verifyHomeBreadcrum).eq(0).should('be.visible').should('have.attr', 'href', highlightsLinkForHomeBreadcrum);
	cy.get(verifyContent).should('be.visible');
	cy.get(verifyShowmoreButton).should('be.visible');
});

/**
 * Author : Chetana Hiremath
 * validate the TLS LongReads page
 */
Cypress.Commands.add('validateLongReadsPage', () => {
	cy.log('Validating the LongReads page');
	cy.visit(Cypress.env('prod_url') + longReadsPageURL, { timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(verifyLongReadsHeader).should('be.visible');
	cy.get(verifyContentofLongReadsPage).should('be.visible');
	cy.get(verifyShowmoreButton).should('be.visible');
});

/**
* Author : Kavinprabu S M
* validate the TLS Author page
*/
Cypress.Commands.add('validateAuthorPage', () => {
	cy.log('Validating TLS Author page');
	cy.visit(Cypress.env('prod_url') + authorPageURL, { timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(verifyAuthorName).should('have.text', 'David Herd');
});

/**
* Author : Kavinprabu S M
* validate the TLS Category page
*/
Cypress.Commands.add('validateCategoryPage', () => {
	cy.log('Validating TLS Category page');
	cy.visit(Cypress.env('prod_url') + categoryPageURL, { timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(verifyCategoryName).should('have.text', 'Culture');
	cy.get(verifyCategorySubMenu).should('be.visible');
	cy.get(verifyCategoryBreadCrumbs).should('exist');
});

/**
* Author : Kavinprabu S M
* validate the TLS Search page
*/
Cypress.Commands.add('validateSearchPage', () => {
    cy.log('Validating TLS Search page');
	cy.visit(Cypress.env('prod_url') + searchPageURL, { timeout: 10000 });
	cy.acceptCookieBanner();
	cy.get(verifySearchBar).should('be.visible');
	cy.get(verifySearchPageResults, { timeout: 3000 }).should('exist');
});