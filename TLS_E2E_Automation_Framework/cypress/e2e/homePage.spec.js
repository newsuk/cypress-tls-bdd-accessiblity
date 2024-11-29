
    import * as homePage from '../e2e/tls_page_elements/homePage';
/**
 * After home page loaded users clicks on TLS
 */
    
    describe('Home page', () => {
        before(()=>{
            cy.visit('/',);
        })
        
        it( 'The home page is loaded successfully & Validate user tries to visit social media by clicking on header icons(face book,twitter,instagram', () => {
            homePage.landingPageValidation();
            homePage.ValidateSocialMediabuttons();
        });
     
        it('Validate Hero Large Block has image, category name, articlename and author name and review of the article by hovering on Book Review', () => {
            homePage.validateHeroHasArticleCategoryTitleAndAuthor();
        })

        it('Validate Issue block has an image and details', () => {
            homePage.validatDateAndThisWeekIssuelabelIsDisplayed();
        })

        // it('Validate the article slices in the home page by shuffling it from the CMS should be visible in front end as per the setting', () => {
        
        // })
    
        it('Validate ads in home Page should be visible', () => {
            homePage.validateAdsCheckInHomePage();
        })

        it('Validate podcast block should be visible ', () => {
            homePage.validatePodcastHeaderTitleStandfirst();
            homePage.valdiatePodcastArticleTitleStandfirst();
        })

        it('Validate Explore the TLS section and Online series section in home page', () => {
            homePage.homePageSectionValidation();
        })

        it('Validate Footer section in home page', () => {
            homePage.ValidateFooterSectionOfHomepage();
        })

    })