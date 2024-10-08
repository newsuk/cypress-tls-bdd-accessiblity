import {clickSecondArtcileINHomePage,getHeadlineOfArtcilePage, validateArticleCategorySepartorAndType,
    validateArticleTitleSubtitleAuthorAndImage, validateArticlePageHasSocialMediaButtons, 
    validateArticlePageContentWithSideBarDetails} from '../helpers/articlePage.helper';


/**
 * Click the TLS Logo button
 */
describe('Article Page', () => {
    beforeEach(()=>{
        cy.viewport(1024,768);
    })
    
    it('Validate Article Page headline once user visit to article page', () => {
        cy.visit('/',)
        clickSecondArtcileINHomePage()
        cy.acceptCookieBanner();
        getHeadlineOfArtcilePage();
        
    })

describe('Static Article Page', ()=>{
    beforeEach(()=>{
        cy.visit("/literature/fiction/so-much-he-bought-the-company/")
    })
    
        it( 'Validate the category, separator And Article type', () => {
	        validateArticleCategorySepartorAndType();  
        });

        it( 'Validate the title, subtitles , author, with prefix by, lead image and its caption', () => {
            validateArticleTitleSubtitleAuthorAndImage();
        });
  
        it( 'Validate the social media buttons twitter, facebook , email', () => {
            validateArticlePageHasSocialMediaButtons();
        });
    
        it( 'Validate the Article has content and other details', () => {
            validateArticlePageContentWithSideBarDetails();
        });

    })
})


