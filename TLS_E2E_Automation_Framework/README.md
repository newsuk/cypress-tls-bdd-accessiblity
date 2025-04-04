Cypress Testing Setup
This repository contains Cypress end-to-end tests for TLS site. Cypress is a powerful testing framework for web applications that allows developers to write and execute tests in a simple and effective way.

Installation

Configuration

Running Tests

Writing Tests

Test Structure

Installation: To get started with Cypress, you'll need Node.js and npm (or yarn) installed on your machine.

1. Clone this repository
git clone: https://github.com/newsuk/cypress-tls-bdd-accessiblity
cd https://github.com/newsuk/cypress-tls-bdd-accessiblity

2. Install dependencies
bash: npm install

3. Install Cypress:
bash: npm install cypress --save-dev

Configuration: Cypress configuration files is a file where we have you can configure various settings like base URL, test environment, timeouts, etc. Here's an example:

json

{
  "baseUrl": "http://localhost:3000",
  viewportWidth: 1024,
  viewportHeight: 768,
}

Running Tests

1. Running Cypress testcases in UAT:

bash: ./node_modules/.bin/cypress open --env ENV=uat
This will launch the Cypress Test Runner in interactive mode.

2. Running Cypress testcases in PRODUCTION:

bash: ./node_modules/.bin/cypress open --env ENV=prod
This will launch the Cypress Test Runner in interactive mode.

Writing Tests: Cypress tests are located in the cypress/integration directory. 
Here's an example of a simple test:

describe('My First Test', () => {
  it('Visits to the TLS site', () => {
    cy.visit('https://www.the-tls.co.uk/');
    cy.contains('TLS').should('be.visible');
  });
});
You can use various Cypress commands to interact with your application, like cy.visit(), cy.get(), cy.contains(), and many others.

Test Structure: Cypress tests are structured as follows:

cypress/pageElementValues/: Contains test data that can be used during tests.

cypress/e2e/: Contains your test files, typically written in .spec.js files.

cypress/screenshots/: screenshots are captured where the test case fails exactly.

cypress/support/: Custom commands and setup, typically for repeated actions.

