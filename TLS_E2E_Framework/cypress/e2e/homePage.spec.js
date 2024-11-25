import {landingPageValidation,ValidateSocialMediabuttons, validateAdsCheckInHomePage, homePageSectionValidation,validatePodcastHeaderTitleStandfirst,
    valdiatePodcastArticleTitleStandfirst,validateHeroHasArticleCategoryTitleAndAuthor, validatDateAndThisWeekIssuelabelIsDisplayed, 
    ValidateFooterSectionOfHomepage} from './tls_page_elements/homePage'

/**
 * After home page loaded users clicks on TLS
 */
describe('Home Page', () => {
    beforeEach(()=>{
        cy.viewport(1024,768);
        
    })
})
    
    describe('static home page', () => {
        before(()=>{
            cy.visit('/',);
        })
        
        it( 'The home page is loaded successfully & Validate user tries to visit social media by clicking on header icons(face book,twitter,instagram', () => {
            landingPageValidation();
            ValidateSocialMediabuttons();
        });
     
        it('Validate Hero Large Block has image, category name, articlename and author name and review of the article by hovering on Book Review', () => {
            validateHeroHasArticleCategoryTitleAndAuthor();
        })

        it('Validate Issue block has an image and details', () => {
            validatDateAndThisWeekIssuelabelIsDisplayed();
        })

        // it('Validate the article slices in the home page by shuffling it from the CMS should be visible in front end as per the setting', () => {
        
        // })
    
        it('Validate ads in home Page should be visible', () => {
            validateAdsCheckInHomePage();
        })

        it('Validate podcast block should be visible ', () => {
            validatePodcastHeaderTitleStandfirst();
            valdiatePodcastArticleTitleStandfirst();
        })

        it('Validate Explore the TLS section and Online series section in home page', () => {
            homePageSectionValidation();
        })

        it('Validate Footer section in home page', () => {
            ValidateFooterSectionOfHomepage();
        })

    })