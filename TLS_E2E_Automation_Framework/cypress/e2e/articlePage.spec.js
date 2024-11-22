// <reference types="cypress" />
import articlePage from '../e2e/tls_page_elements/articlePage';

/**
 * Click the TLS Logo button
 */
describe('Article Page', () => {
    // beforeEach(()=>{
    //     cy.viewport(1024,768);
    // })
    
    it.only('Validate Article Page headline once user visit to article page', () => {
        //cy.visit('/',)
        articlePage.clickSecondArtcileINHomePage();
        cy.acceptCookieBanner();
        getHeadlineOfArtcilePage();
        
    })

describe('Static Article Page', ()=>{
    beforeEach(()=>{
        cy.visit("/literature/fiction/so-much-he-bought-the-company/")
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


