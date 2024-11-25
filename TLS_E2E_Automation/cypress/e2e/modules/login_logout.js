
const {
    validateloginfromhomepage,
    validateloginfromarticlepage,
    validatelogoutfromhomepage,
    validatelogoutfromarticlepage,
    validateloginforinvalidcreds
} = require('/Users/ksm/Documents/GitHub/cypress-tls-bdd-accessiblity/TLS_E2E_Automation/cypress/e2e/helper/loginLogout.helper.js');




describe('Verify login and logout scenarios', () => {

    it('should verify the user tries to login from the home page', () => {
        cy.log('Verify the user tries to login from homepage');
        validateloginfromhomepage();
    });

    it('should verify the user tries to login from the article page', () => {
        cy.log('Verify the user tries to login from article page');
        validateloginfromarticlepage();
       
    });

    it('should verify the user tries to logout from the homepage', () => {
        cy.log('Verify the logout scenario from the homepage');
        validatelogoutfromhomepage();

        
    });

    it('should verify the user tries to logout from the article page', () => {
        cy.log('Verify the logout scenario from the article page');
        validatelogoutfromarticlepage();
        
    });

    it('should verify when user tries to login with invalid credentials', () => {
        cy.log('Verify when user tries to login using invalid credentials');
        validateloginforinvalidcreds();
    });
});
