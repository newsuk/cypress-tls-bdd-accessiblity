
export {};
// Page Elements
const HOME_PAGE_TLS_LOGO = ".tls-header-navigation__logo";
const PAGE_TITLE = "TLS";
const HOME_PAGE_HERO_BANNER = ".tls-home-page__hero-banner__lead-slice";
const HOME_PAGE_CARD_HEADLINE = ".tls-card-headline";
const HOME_PAGE_HEADER_USER_NAVIGATION = ".tls-header-navigation__link-login";
const HOME_PAGE_LINKS = ".tls-link";

const ENV_PROD = "prod";
const ENV_DEV = "dev";
const ENVIRONMENT = "ENV";
const LOGIN = "Login";
const GUEST = "guest";

/**
 * Accept the cookie banner so that tests will not fail due to this
 */

Cypress.Commands.add("acceptCookieBanner", () => {
  cy.log(" Enter into cookier banner section");
  cy.get("body").then(($body) => {
    if ($body.find("iframe[id^='sp_message_iframe']").length > 0) {
      cy.get("iframe[id^='sp_message_iframe']", { timeout: 4000 }).then(
        ($iframe) => {
          const $iframeBody = $iframe.contents().find("body");
          cy.wrap($iframeBody)
            .find(".message-component button")
            .contains("I Agree")
            .click({ force: true });
          //cy.get( '.message.type-modal' ).should( 'not.be.visible' );
        }
      );
    }
  });
  cy.log("Closed the cookie banner");
});

/**
 * Author :Nithya
 * This will click the TLS Logo image
 */
Cypress.Commands.add("clickTLSLogo", () => {
  cy.acceptCookieBanner();
  cy.get(HOME_PAGE_TLS_LOGO, { timeout: 3000 }).click();
  cy.title().should("include", PAGE_TITLE);
  cy.acceptCookieBanner();
});

Cypress.Commands.add("tealiumEnvironmentCheck", () => {
  if (Cypress.env(ENVIRONMENT) === ENV_PROD) {
    cy.window().then((win) => {
      expect(win.utag_data.tealium_environment).to.equal(ENV_PROD);
    });
  } else {
    cy.window().then((win) => {
      expect(win.utag_data.tealium_environment).to.equal(ENV_DEV);
    });
  }
});
Cypress.Commands.add("validateUtagsDataValues", () => {
  cy.get(HOME_PAGE_HERO_BANNER).find(HOME_PAGE_CARD_HEADLINE).click();
  cy.wait(5000);
  cy.window({ timeout: 5000 }).then((win) => {
    expect(win.utag_data).to.equal(win.custom_utag_data);
  });
});

Cypress.Commands.add("validateUtag", () => {
  cy.window({ timeout: 5000 }).then((win) => {
    expect(win.utag_data);
  });
});

Cypress.Commands.add("validateUtagsDataValuesForGuestUser", () => {
  cy.clickTLSLogo();
  cy.acceptCookieBanner();
  cy.get(HOME_PAGE_HEADER_USER_NAVIGATION, { timeout: 3000 })
    .find(HOME_PAGE_LINKS)
    .contains(LOGIN);
  cy.window().then((win) => {
    expect(win.utag_data.registration_type).to.equal(GUEST);
  });
});

Cypress.Commands.add("navigateToPage", (page) => {
  cy.url().then((url) => {
    cy.visit(url + page);
  });
});

Cypress.Commands.add("logger", (reporter = {}) => {
  cy.window({ log: false })
    .then((results) => {
      if (!reporter) {
        return cy.wrap(results.violations, { log: false });
      }

      return cy
        .task(
          "logResults",
          {
            reportName: reporter.reportName || "",
            reportDirectory: reporter.directory,
            pageName: reporter.scopeName || "",
            results,
          },
          { log: false }
        )
        .then((reportPath) => {
          Cypress.log({
            name: "A11y Report",
            message: `A report with the accessibility findings has been created! View console for the location.`,
            consoleProps: () => {
              return {
                message: `A report of the accessibility findings is available here: file://${reportPath}`,
              };
            },
          });
          return cy.wrap(results.violations, { log: false });
        });
    })
    .then((violations) => {
      if (violations.length) {
        cy.wrap(violations, { log: false }).each((v) => {
          Cypress.log({
            name: "a11y error!",
            consoleProps: () => v,
            message: `${v.id} on ${v.nodes.length} Node${
              v.nodes.length === 1 ? "" : "s"
            }`,
          });
        });
      }
      return cy.wrap(violations, { log: false });
    })
    .then((violations) => {
      assert.equal(
        violations.length,
        0,
        `${violations.length} accessibility violation${
          violations.length === 1 ? "" : "s"
        } ${violations.length === 1 ? "was" : "were"} detected.`
      );
    });
});
