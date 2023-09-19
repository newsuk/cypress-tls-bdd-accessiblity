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
import 'cypress-wait-until';
/// <reference types="cypress" />

//home page elements
const heroBanner =".tls-home-page__hero-banner";
const ads="div[id*='ads']";
const collectionSlices="div[class*='slices']";
const newsletterBlock="div[class='tls-newsletter']";

//archive page elements
const verifySearchFilter ="[class*='tls-archive-issue-page__header-filter-section-search-filter']";
const verifyDropdownForYears =".tls-date-filter__dropdown-btn";
const selectYears ="[class*='tls-date-filter__content-item']";
const verifySearchedAuthorPage="[class*='tls-search-core__hits']";
const verifyContainer="[class*='tls-archive-issue-page__content']";
const verifyShowmoreButton="[class*='tls-show-more']";
const verifyArchiveLinkYear=".tls-issue__explore-section-content-link > a";

//NewToTheTLSPage
const verifyTitleContainer="[class*='tls-aggregation__content-container columns is-multiline is-gapless']";
const verifyImage="[class*='wp-block-image']";

//Highlight page elements
const verifyHighlightHeader="[class*='tls-collections-header__content']";
const verifyContent="[class*='tls-category-page']";
const verifyHomeBreadcrum=".tls-category__breadcrumbs > a";

//Longreads page elements
const verifyLongReadsHeader="[class*='tls-aggregation tls-aggregation--large']";
const verifyContentofLongReadsPage="[class*='tls-aggregation-page__article-list']";

//url elements
const archivePageURL="archive/";
const newToTheTLSPageURL="new-to-the-tls/";
const highlightsPageURL="categories/highlights/";
const longReadsPageURL="topics/long-reads/";
const highlightsLinkForHomeBreadcrum="tls.co.uk";
const authorPageURL="authors/david-herd/";
const categoryPageURL="categories/culture/";
const buyPageURL="buy";
const subscriptionPageURL="tls.co.uk";
const currentIssuePageURL="issues/current-issue/";
const searchPageHrefURL="tls.co.uk?s";
const searchPageURL="?s";
const continueButtonText="Continue";
const subscribeNowButtonText="Subscribe now";
const subscriptionPageTitle="Account set up";

//TLS Author page
const verifyAuthorName="[class*='tls-aggregation-page__author-details-name']";
const authorName="David Herd12";

//TLS Category page
const verifyCategoryName="[class*='tls-collections-header__title']";
const verifyCategorySubMenu="[class*='tls-aggregation-page__categorySubmenu']";
const verifyCategoryBreadCrumbs="[class*='tls-category__breadcrumbs']";
const categoryName="Culture";

//TLS search Page 
const verifySearchPageResults ="[class*='tls-search-core__hits']";
const verifySearchBar="[class*='ais-SearchBox']";

//article page elements
const homePageArtilce=':nth-child(2) > .tls-card-horizontal-medium__content > .tls-card-headline > .tls-card-headline__title';
const paywallBanner='.tls-subscriptions-block';
const articleHeadline='.tls-article-intro-primary__headline-wrapper > h1';

//buy page elements
const PacksSection='.subscription-container';
const subscribeNowButtonForAllCategory='a[class*="has-utag primary"]';
const subscribeButton='span[class*="subscribe"] > a';
const printAndDigitalPrice='.best-value > .price';
const printPrice='.print > .price';
const DigitalPrice='.digital > .price';
const digitalTerms='.digital > .terms';
const subscriptionPageHeading='h1[class*="caSCKo"]';
const emailAddress='#email';
const password='#password';
const continueButton='#account-setup-continue';

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

/**
 * Author : Balaji Krishnan
 * validate the TLS home page
 */
Cypress.Commands.add( 'validateTlsHomePage', () => {
	cy.log( 'Validating the tls home page' );
	cy.waitUntil(() =>cy.visit(Cypress.env('prod_url'),{ timeout: 20000 }));
	cy.acceptCookieBanner();
	cy.waitUntil(() => cy.get(heroBanner,{ timeout: 5000 }).should('have.length.at.least', 1));
	cy.get(collectionSlices,{ timeout: 5000 }).should('have.length.at.least', 1);
	cy.get(newsletterBlock,{ timeout: 5000 }).should('have.length.at.least', 1);
	cy.log( 'Successfully validated the tls home page' );
} );

 /**
 *Author : Roopa Biridar
 *validate the TLS article page
 */
 Cypress.Commands.add( 'validateTlsArticlePage', () => {
	cy.log('Validating the tls article page');
	cy.visit(Cypress.env('prod_url'),{ timeout: 20000 });
	cy.acceptCookieBanner();
	cy.waitUntil(() =>cy.get(homePageArtilce).then(function ($elem) {
		let headline = $elem.text()
		cy.log(headline);
		cy.get(homePageArtilce,{ timeout: 5000 }).click();
		cy.acceptCookieBanner();
		cy.get(articleHeadline,{ timeout: 5000 }).should('be.visible').should('have.text', headline);
	}))
	cy.acceptCookieBanner();
	cy.get(ads, { timeout: 5000 }).should('be.visible').should('not.be.null');
	cy.get(paywallBanner,{ timeout: 5000 }).should('be.visible').should('not.be.null');
	cy.get(articleHeadline,{ timeout: 5000 }).should('be.visible').should('not.be.null');
	cy.get(newsletterBlock,{ timeout: 5000 }).should('be.visible').should('not.be.null');
	cy.log( 'Successfully validated the tls article page' );
} );

/**
 * Author : Chetana Hiremath
 * validate the TLS archive page
 */
Cypress.Commands.add( 'validateTlsArchivePage', () => {
	cy.log( 'Validating the tls archive page' );
	cy.visit(Cypress.env('prod_url')+archivePageURL,{ timeout: 20000 });
	cy.acceptCookieBanner();
	cy.waitUntil(() =>cy.title().should('eq', 'The Archive - TLS'));
	//dropdownForYears Validation
	cy.get(verifyDropdownForYears,{ timeout: 5000 }).click();
	cy.get(selectYears,{ timeout: 5000 }).eq(0).click();
	cy.get(verifyDropdownForYears).wrap(2023).should('be.gte', 2023);
	//ValidationFor Container
	cy.get(verifyContainer,{ timeout: 5000 }).should('be.visible');
	cy.waitUntil(()=>cy.get(verifyShowmoreButton,{ timeout: 5000 }).should('be.visible'));
	cy.get(verifyArchiveLinkYear,{ timeout: 5000 }).should('be.visible');
	//searchFilter Validation
	// eslint-disable-next-line cypress/unsafe-to-chain-command
	cy.get(verifySearchFilter,{ timeout: 5000 }).click().type('Mary Beard').type('{enter}')
	cy.get(verifySearchedAuthorPage,{ timeout: 5000 }).should('be.visible');
	cy.log( 'Successfully validated the tls archieve page' );
} );

/**
 * Author : Chetana Hiremath
 * validate the TLS NewToTheTLS page
 */
Cypress.Commands.add( 'validateNewToTheTLSPage', () => {
	cy.log( 'Validating the NewToTheTLS page' );
	cy.visit(Cypress.env('prod_url')+newToTheTLSPageURL,{ timeout: 20000 });
	cy.acceptCookieBanner();
	cy.waitUntil(() =>cy.get(verifyTitleContainer,{ timeout: 5000 }).should('be.visible'));
	cy.get(verifyImage,{ timeout: 5000 }).should('be.visible');
	cy.log( 'Successfully validated new to the tls page' );
} );

/**
 * Author : Chetana Hiremath
 * validate the TLS Highlights page
 */
Cypress.Commands.add( 'validateHighlightsPage', () => {
	cy.log( 'Validating the TLS Highlights page' );
	cy.visit(Cypress.env('prod_url')+highlightsPageURL,{ timeout: 20000 });
	cy.acceptCookieBanner();
	cy.waitUntil(() =>cy.get(verifyHighlightHeader, { timeout: 5000 }).should('not.be.null')); 
	cy.get(verifyHomeBreadcrum,{ timeout: 5000 }).eq(0).should('be.visible');
	cy.get(verifyContent,{ timeout: 5000 }).should('be.visible');
	cy.get(verifyShowmoreButton,{ timeout: 5000 }).should('be.visible');
	cy.log( 'Successfully validated the tls highlights page' );
} );

/**
 * Author : Chetana Hiremath
 * validate the TLS LongReads page
 */
Cypress.Commands.add( 'validateLongReadsPage', () => {
	cy.log( 'Validating the TLS LongReads page' );
	cy.visit(Cypress.env('prod_url')+longReadsPageURL,{ timeout: 20000 });
	cy.acceptCookieBanner();
	cy.waitUntil(() =>cy.get(verifyLongReadsHeader,{ timeout: 5000 }).should('be.visible'));
	cy.get(verifyContentofLongReadsPage,{ timeout: 5000 }).should('be.visible');
	cy.get(verifyShowmoreButton,{ timeout: 5000 }).should('be.visible');
	cy.log( 'Successfully validated the tls long reads page' );
} );

/**
Author : Kavinprabu S M
validate the TLS Author page
*/
Cypress.Commands.add('validateAuthorPage', () => {
	cy.log('Validating TLS Author page');
	cy.visit(Cypress.env('prod_url')+authorPageURL,{ timeout: 20000 });
	cy.acceptCookieBanner();
	cy.waitUntil(() =>cy.get(verifyAuthorName,{ timeout: 5000 }).should('have.text', authorName));
	cy.log( 'Successfully validated the tls author page' );
});

/**
Author : Kavinprabu S M
validate the TLS Category page
*/
Cypress.Commands.add('validateCategoryPage', () => {
	cy.log('Validating TLS Category page');
	cy.visit(Cypress.env('prod_url')+categoryPageURL,{ timeout: 20000 });
	cy.acceptCookieBanner();
	cy.waitUntil(() =>cy.get(verifyCategoryName,{ timeout: 5000 }).should('have.text', categoryName));
	cy.get(verifyCategorySubMenu,{ timeout: 5000 }).should('be.visible');
	cy.get(verifyCategoryBreadCrumbs,{ timeout: 5000 }).should('exist');
	cy.log( 'Successfully validated the tls category page' );
});

/**
Author : Kavinprabu S M
validate the TLS Search page
*/
Cypress.Commands.add('validateSearchPage', () => {
	cy.log('Validating TLS Search page');
	cy.visit(Cypress.env('prod_url')+searchPageURL,{ timeout: 20000 });
	cy.acceptCookieBanner();
	cy.waitUntil(() =>cy.get(verifySearchBar,{ timeout: 5000 }).should('be.visible'));
	cy.get(verifySearchPageResults,{ timeout: 3000 }).should('exist');
	cy.log( 'Successfully validated the tls search page' );
});

/**
 * Author : Roopa Biridar
 * validate the TLS buy page
 */
Cypress.Commands.add( 'validateTlsBuyPage', () => {
	cy.log( 'Validating the tls buy page' );
	cy.visit(Cypress.env('prod_url'),{ timeout: 20000 });
	cy.acceptCookieBanner();
	cy.get(subscribeButton).click();
	cy.get(printAndDigitalPrice,{ timeout: 5000 }).should('be.visible');
	cy.get(printPrice).should('be.visible');
	cy.get(DigitalPrice).should('be.visible');
    cy.get(digitalTerms).should('be.visible');
	cy.waitUntil(() =>cy.get(PacksSection,{ timeout: 5000 }).should('not.be.empty'));
	cy.get(subscribeNowButtonForAllCategory).each(($element) => {
		const href = $element.attr('href');
		cy.log(href); // Log the href attribute for each element
		cy.visit(href)
		cy.waitUntil(()=>cy.get(subscriptionPageHeading,{ timeout: 15000 }).should('be.visible').contains(subscriptionPageTitle));
		cy.waitUntil(()=>cy.get(emailAddress,{ timeout: 5000 }).should('be.visible'));
		cy.get(password,{ timeout: 5000 }).should('be.visible');
		cy.get(continueButton,{ timeout: 5000 }).should('be.visible').should('have.text', continueButtonText);
		cy.request(href).then((response) => {
		// Assert that the status code is 200
		expect(response.status).to.eq(200);
		  });
	  });
	cy.log( 'Successfully validated the tls buy page' );
 } );

 /**
  * Author : Roopa Biridar
 * validate the TLS curent-issue page
 */
  Cypress.Commands.add( 'validateTlsCurrentIssuePage', () => {
	cy.log( 'Validating the tls current-Issue page' );
	cy.waitUntil(() =>cy.visit(Cypress.env('prod_url')+currentIssuePageURL,{ timeout: 20000 }));
	cy.acceptCookieBanner();
	cy.waitUntil(() =>cy.get(currentIssueImage,{ timeout: 5000 }).should('be.visible'));
	cy.get(PreviousIssueButton).click();
	cy.get(currentIssueDate,{ timeout: 5000 }).should('be.visible').should('not.be.empty');
	cy.log( 'Successfully validated the tls current issue page' );
 } );

 /**
 * Author : Roopa Biridar
 * validate the TLS header-footer
 */
Cypress.Commands.add( 'validateTlsHeaderFooter', () => {
	cy.log( 'Validating the tls header-footer' );
	cy.visit(Cypress.env('prod_url'),{ timeout: 20000 });
	cy.acceptCookieBanner();
	cy.waitUntil(() =>cy.get(subscribeButtonOnHeader,{ timeout: 5000 }).should('be.visible').should('have.attr', 'href', (Cypress.env('prod_url')+buyPageURL)));
	cy.get(loginButtonOnHeader).should('be.visible');
	cy.get(searchButtonOnHeader).should('be.visible');
	cy.get(tlsLogoOnHeader).should('be.visible');
	cy.get(footerContainer).should('be.visible').should('not.be.empty');
	cy.get(tlsLogoOnFooter).should('be.visible');
	cy.get(followUsContainerOnFooter).should('be.visible').should('not.be.empty');
	cy.log( 'Successfully validated the tls header footer page' );
} );