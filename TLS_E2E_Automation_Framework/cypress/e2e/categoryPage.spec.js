import categoryPage from "../e2e/tls_page_elements/categoryPage.js";

// Set the environment and URL based on Cypress configuration or default to "prod"
const environment = Cypress.env("ENV") || "prod";
const url = Cypress.env(`${environment}_url`);

// Perform common actions before each test, such as visiting the URL and handling the cookie banner
beforeEach(() => {
  cy.visit(url, { timeout: 20000 }); // Visit the URL with a timeout of 20 seconds
  cy.acceptCookieBanner(); // Handle the cookie banner, if present
});

describe("Verify category page on TLS", () => {
  /**
   * Test to verify category page links from the home page.
   */
  it("should verify category page links on TLS from the home page", () => {
    cy.log("Starting test: Verify category page links from the home page.");
    categoryPage.categoryTabValidation();
    cy.log("Category page links verified successfully from the home page.");
  });

  /**
   * Test to verify category page links from the category page itself.
   */
  it("should verify category page links on TLS from the category page", () => {
    cy.log("Starting test: Verify category page links from the category page.");
    categoryPage.categoryPageValidation();
    cy.log("Category page links verified successfully from the category page.");
  });

  /**
   * Test to verify sub-category page links on TLS.
   */
  it("should verify sub-category page links on TLS", () => {
    cy.log("Starting test: Verify sub-category page links on TLS.");
    categoryPage.validateSubCategoryPage();
    cy.log("Sub-category page links verified successfully.");
  });

  /**
   * Test to verify breadcrumb navigation on category and sub-category pages.
   */
  it("should verify breadcrumbs on category page and sub-category page", () => {
    cy.log(
      "Starting test: Verify breadcrumbs on category and sub-category pages."
    );
    categoryPage.validateBreadCrumbs();
    cy.log(
      "Breadcrumbs verified successfully on category and sub-category pages."
    );
  });
});
