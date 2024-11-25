// <reference types="cypress" />
import * as articlePage from '../e2e/tls_page_elements/articlePage';

const LITERATURE_PAGE_URL = 'literature/fiction/so-much-he-bought-the-company/';


describe('Article Page', () => {
    it('Validate Article Page headline once user visit to article page', () => {
        articlePage.clickSecondArtcileINHomePage();
        cy.acceptCookieBanner();
        articlePage.getHeadlineOfArtcilePage();
        
    })

describe('Static Article Page', ()=>{
    beforeEach(()=>{
        cy.url().then(urlValue => cy.visit(urlValue + LITERATURE_PAGE_URL));
    })
    
        it( 'Validate the category, separator And Article type', () => {
	        articlePage.validateArticleCategorySepartorAndType();  
        });

        it( 'Validate the title, subtitles , author, with prefix by, lead image and its caption', () => {
            articlePage.validateArticleTitleSubtitleAuthorAndImage();
        });
  
        it( 'Validate the social media buttons twitter, facebook , email', () => {
            articlePage.validateArticlePageHasSocialMediaButtons();
        });
    
        it( 'Validate the Article has content and other details', () => {
            articlePage.validateArticlePageContentWithSideBarDetails();
        });

    })
})


