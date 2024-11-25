require('cypress-xpath');

const loginButton = ".tls-header-navigation__link-login > a";
const subscribeButton = ".tls-header-navigation__button-subscribe > a";
const creds = "[class*='mdl-textfield mdl-js-textfield mdl-textfield--floating-label']";
const loginButtton = ".auth0-lock-submit";
const logoutLink = ".tls-header-navigation__link-logout";
const myaccountLink = ".tls-header-navigation__my-account";
const articleLink = ".tls-card-headline";


const environment = Cypress.env('ENV') || 'prod';
const url = Cypress.env(`${environment}_url`);
const username = Cypress.env(`${environment}_username`);
const password = Cypress.env (`${environment}_password`);


/**
 * Author : Kavinprabu S M
 * Validate the login and logout scenario of the tls site
 */

 function performLogin() {
    // Click the login button
    cy.get(loginButton).click();

    // Wait for 4 seconds
    cy.wait(4000);

    // Enter credentials
    cy.get(creds).eq(0).type(username);
    cy.get(creds).eq(1).type(password);

    // Click the login button again
    cy.get(loginButtton).click();
}


function verifyLogin() {
    cy.get(logoutLink).invoke('text').then((text) => {
        expect(text).to.equal('Logout');
    });

    cy.get(myaccountLink).invoke('text').then((text) => {
        expect(text).to.equal('My Account');
        cy.log('User is successfully logged in on homepage');

        cy.get(articleLink).eq(0).click();
        cy.get(logoutLink).invoke('text').then((text) => {
            expect(text).to.equal('Logout');
        });

        cy.log('User is successfully logged in on article page');
    });
}


function performLogout() {
    cy.get(logoutLink).click();
    cy.get(subscribeButton).invoke('text').then((text) => {
        expect(text).to.equal('Subscribe');
    });
    cy.log('The user is successfully logged out from homepage');
    cy.get(articleLink).eq(0).click();
    cy.get(loginButton).invoke('text').then((text) => {
        expect(text).to.equal('Login');
    });
    cy.log('The user is successfully logged out from article page');
}

function validateloginfromhomepage(){
    cy.log('Verify the user tries to login from homepage');
    cy.visit(url, { timeout: 20000 });
    cy.acceptCookieBanner();

    cy.get(subscribeButton).invoke('text').then((text) => {
        expect(text).to.equal('Subscribe');
    });

    cy.log('The user is logged out');
    performLogin();
    verifyLogin();
}

function validateloginfromarticlepage(){
    cy.log('Verify the user tries to login from article page');
        cy.visit(url, { timeout: 20000 });
        cy.acceptCookieBanner();

        cy.get(articleLink).eq(0).click();
        cy.get(subscribeButton).invoke('text').then((text) => {
            expect(text).to.equal('Subscribe');
        });

        cy.log('The user is logged out');
        performLogin();
        verifyLogin();
}

function validatelogoutfromhomepage(){
    cy.log('Verify the logout scenario from the homepage');
    cy.visit(url, { timeout: 20000 });
    cy.acceptCookieBanner();
    performLogin();
    cy.log('The user tries to logout...');
    performLogout();
}

function validatelogoutfromarticlepage(){
        cy.log('Verify the logout scenario from the article page');
        cy.visit(url, { timeout: 20000 });
        cy.acceptCookieBanner();
        performLogin();
        cy.get(articleLink).eq(0).click();
        performLogout();
}

function validateloginforinvalidcreds(){
    cy.log('Verify when user tries to login using invalid credentials');
        cy.visit(url, { timeout: 20000 });
        cy.acceptCookieBanner();
        cy.get(loginButton).click();

        // Wait for 4 seconds
        cy.wait(4000);

        // Enter credentials
        cy.get(creds).eq(0).type('testing@gmail.com');
        cy.get(creds).eq(1).type('1234');

        // Click the login button again
        cy.get(loginButtton).click();

        cy.xpath("//div[@class='auth0-global-message auth0-global-message-error']//span[@class='animated fadeInUp']").should('exist')
            .invoke('text').then((text) => {
                expect(text).to.equal('Sorry, your email address and/or password are incorrect - please try again.');
            });
}

module.exports = {
    performLogin,
    verifyLogin,
    performLogout,
    validateloginfromhomepage,
    validateloginfromarticlepage,
    validatelogoutfromhomepage,
    validatelogoutfromarticlepage,
    validateloginforinvalidcreds
};
