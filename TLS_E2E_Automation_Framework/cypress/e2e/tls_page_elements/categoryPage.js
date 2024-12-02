const categoryLink = ".tls-header-navigation__menu-list>div";
const categoryDropDown = ".tls-header-navigation-container>div";
const categotyList = ".tls-submenu-navigation__menu-item";
const categotyPageTtile = ".tls-collections-header__title";
const subCategoryList = ".tls-aggregation-breadcrumb__menu";
const subCategoryLink = ".tls-aggregation-breadcrumb__menu>li";
const headerImage =
  ".tls-card-horizontal-large__wrapper-link-img-as-background";
const showMoreButton = ".tls-aggregation-page__showmore>button";
const backToCategoryLink = ".tls-aggregation-breadcrumb__backMenu>li";
const subCategorySlice = ".tls-aggregation-breadcrumb__menu";
const breadCrumbs = ".tls-category__breadcrumbs";
const breadCrumbsText = ".tls-category__breadcrumbs>a";

class categoryPage {
  /**
   * Validates the category tab functionality by interacting with
   * category links and ensuring dropdowns and category pages load successfully.
   */
  static categoryTabValidation() {
    cy.get(categoryLink).eq(2).should("be.visible").click();
    cy.log("Category page dropdown is visible and clickable.");

    cy.get(categoryDropDown).eq(1).should("be.visible");
    cy.log("Dropdown for categories is present on the homepage.");

    cy.get(categotyList).eq(5).should("exist").click();
    cy.get(categotyPageTtile).should("exist");
    cy.log("Category page loaded successfully.");
  }

  /**
   * Validates the content of a category page, including subcategories,
   * images, and the 'Show More' button.
   */
  static categoryPageValidation() {
    this.categoryTabValidation();

    cy.get(subCategoryList).should("exist");
    cy.log("Subcategory list is present on the category page.");

    cy.get(headerImage).should("exist").and("not.be.disabled");
    cy.log("Images are present on the category page.");

    cy.get(showMoreButton).scrollIntoView();
    cy.log("'Show More' button is visible after scrolling.");

    cy.get(showMoreButton).click();
    cy.log("'Show More' button clicked successfully.");
  }

  /**
   * Validates navigation and functionality within subcategory pages,
   * including returning to the main category page.
   */
  static validateSubCategoryPage() {
    this.categoryTabValidation();

    cy.get(subCategoryLink).eq(0).should("exist").click();
    cy.log("Subcategory link clicked successfully.");

    cy.get(subCategorySlice).should("exist");
    cy.log("Subcategory list is present.");

    cy.get(headerImage).should("exist").and("not.be.disabled");
    cy.log("Images are present on the subcategory page.");

    cy.get(backToCategoryLink).click();
    cy.log("'Back to Category' link clicked.");

    cy.get(categotyPageTtile).should("exist");
    cy.log("Navigated back to the main category page successfully.");
  }

  /**
   * Validates breadcrumb navigation text against the page title for accuracy.
   * @param {number} position - Position of the breadcrumb link to validate.
   */
  static breadCrumbValidation(position) {
    cy.get(breadCrumbsText)
      .eq(position)
      .invoke("text")
      .then((breadcrumbText) => {
        const trimmedText = breadcrumbText.trim();
        cy.log("Breadcrumb text: " + trimmedText);

        cy.get(categotyPageTtile)
          .invoke("text")
          .then((titleText) => {
            cy.log("Page title text: " + titleText);
            expect(titleText).to.equal(trimmedText);
            cy.log("Breadcrumb text matches the page title.");
          });
      });
  }

  /**
   * Validates breadcrumbs on both category and subcategory pages.
   */
  static validateBreadCrumbs() {
    this.categoryTabValidation();

    cy.get(breadCrumbs).should("exist");
    cy.log("Breadcrumbs are present on the category page.");

    this.breadCrumbValidation(1);
    cy.log("Breadcrumbs validated for the main category page.");

    cy.get(subCategoryLink).eq(0).should("exist").click();
    cy.log("Navigated to a subcategory page.");

    this.breadCrumbValidation(2);
    cy.log("Breadcrumbs validated for the subcategory page.");
  }
}

export default categoryPage;
