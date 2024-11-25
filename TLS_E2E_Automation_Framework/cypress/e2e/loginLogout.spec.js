
import * as loginLogout from '../e2e/tls_page_elements/loginLogout.js';




describe('Verify login and logout scenarios', () => {

    it('should verify the user tries to login from the home page', () => {
        cy.log('Verify the user tries to login from homepage');
        loginLogout.validateloginfromhomepage();
    });

    it('should verify the user tries to login from the article page', () => {
        cy.log('Verify the user tries to login from article page');
        loginLogout.validateloginfromarticlepage();
       
    });

    it('should verify the user tries to logout from the homepage', () => {
        cy.log('Verify the logout scenario from the homepage');
        loginLogout.validatelogoutfromhomepage();

        
    });

    it('should verify the user tries to logout from the article page', () => {
        cy.log('Verify the logout scenario from the article page');
        loginLogout.validatelogoutfromarticlepage();
        
    });

    it('should verify when user tries to login with invalid credentials', () => {
        cy.log('Verify when user tries to login using invalid credentials');
        loginLogout.validateloginforinvalidcreds();
    });
});