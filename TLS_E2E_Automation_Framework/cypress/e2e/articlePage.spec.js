// <reference types="cypress" />
import * as articlePage from '../e2e/tls_page_elements/articlePage';

const environment = Cypress.env("ENV") || "prod";
const url = Cypress.env(`${environment}_url`);

beforeEach(() => {
	cy.visit(url, { timeout: 20000 });
	cy.acceptCookieBanner();
	articlePage.clickSecondArtcileINHomePage();
  });
  
	describe('Article Page', () => {
		it('Validate Article Page headline once user visit to article page, & Validate the Article has content and other details like title, subtitles,image and author, with prefix by, lead image and its caption', () => {
			articlePage.getHeadlineOfArtcilePage();
		}); 
			
		it( 'Validate the Article has content and other details like title, subtitles,image and author, with prefix by, lead image and its caption', () => {
			articlePage.validateArticleTitleSubtitleAuthorAndImage();
		});

		it( 'Validate the category, separator And Article type', () => {
			articlePage.validateArticleCategorySepartorAndType();  
		});

		it( 'Validate the social media buttons twitter, facebook , email', () => {
			articlePage.validateArticlePageHasSocialMediaButtons();
		});
	
		it( 'Validate the issue section and In this review section which appears left side of the article page', () => {
			articlePage.validateArticlePageContentWithSideBarDetails();
		});
	});
	 


