const { paywallGuest } = require('/Users/ksm/Documents/GitHub/cypress-tls-bdd-accessiblity/TLS_E2E_Automation/cypress/e2e/helper/paywall.helper.js');

describe('Verify paywall banner on TLS site', () => {
    it('should verify the paywall banner for guest user', () =>{
        cy.log('verify the paywall banner for quest user on TLS site');
        paywallGuest();
     } )

    

});