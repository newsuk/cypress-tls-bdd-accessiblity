


const{welcomeBannerGuest,welcomeMessageLoggedin,closingBannerFromHomePage,closingBannerFromArtilepage} = require('/Users/ksm/Documents/GitHub/cypress-tls-bdd-accessiblity/TLS_E2E_Automation/cypress/e2e/helper/welcomeBanner.helper.js');

describe('Verify welcome message banner on TLS site', () => {
    it('should verify the welcome banner for guest user', () =>{
        cy.log('verify the welcome message banner for quest user on TLS site');
        welcomeBannerGuest();
     } )

    it('should verify the welcome message banner for logged in user ' ,() =>{
        cy.log('verify the welcome message banner for logged In user on TLS site');
        welcomeMessageLoggedin();

    })
    it('should verify the user close the welcome message banner from homepage', ()=>{
        cy.log('verify user closed the welcome message banner from the homepage');
        closingBannerFromHomePage();
    })

    it('should verify the user closes the welcome message banner from article page',()=>{
        cy.log('verify user closed the welcome message banner from the articlepage');
        closingBannerFromArtilepage();

    })

});



