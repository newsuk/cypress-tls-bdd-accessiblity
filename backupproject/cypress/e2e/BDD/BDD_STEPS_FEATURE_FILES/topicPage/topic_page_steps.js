/**
 * External dependencies
 */
import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
/**
 * Internal dependencies
 */
import topicsPage from '../../BDD_TLS_Pages/topicPage';
import '.../../../../support/e2e';

Given( 'User is clicks on TLS logo', () => {
	cy.clickTLSLogo();
	cy.acceptCookieBanner();
});

When( 'User clicks on explore button', () => {
	topicsPage.clickExploreButton();
});

And( 'User clicks on longread button', () => {
	topicsPage.clickLongreadsButton();
});

Then( 'Validate the user is navigated to longread topics page', () => {
	topicsPage.validateUrlOfTheLongreadsPage();
});

And( 'Validate title and description of the page', () => {
	topicsPage.validateTitleAndDescription();
});

And( 'Valiadte article name, Image, byline, label and card subheadline inside aggregation page', () => {
	topicsPage.validateContentOfArticleList();
});

And( 'Validate show more button and its count', () => {
	topicsPage.verifyShowmore();
});

And( 'Validate tealium JS is loading as expected', () => {
	cy.tealiumEnvironmentCheck();
});
