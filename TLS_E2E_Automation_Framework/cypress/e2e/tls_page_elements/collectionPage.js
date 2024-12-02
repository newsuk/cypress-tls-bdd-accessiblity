require("cypress-xpath");
const collectionPageSlice = ".tls-collection-slice";
const collectionLink =
  "//div[@class='tls-collection-slice__container-content']/a";
const newsLetterButton =
  "//div[@class='tls-newsletter__wrapper-container modal-content']//span[@role='button']";
const collectionTitle = "//div[@class='tls-collections-header__content']/h1";
const collectionImage =
  ".tls-card-horizontal-large__wrapper-link-img-as-background";

class collectionPage {
  static validateCollectionPageLinks() {
    cy.get(collectionPageSlice).scrollIntoView();
    cy.wait(2000);
    cy.xpath(newsLetterButton).click();
    cy.get(collectionPageSlice).should("exist");
    cy.log("Collection page slice is present on homepage");
    cy.xpath(collectionLink).eq(0).should("be.visible");
    cy.log("Collection title is present on collection slice and is clickable");
    cy.xpath(collectionLink).eq(1).should("be.visible");
    cy.log(
      "Collection page link is present on collection slice and is clickable"
    );
  }

  static validateCollectionPage() {
    cy.get(collectionPageSlice).scrollIntoView();
    cy.xpath(newsLetterButton).click();

    // Local variable to hold the text value
    cy.xpath(collectionLink)
      .eq(0)
      .invoke("text")
      .then((collectionText) => {
        const trimmedCollectionText = collectionText.trim(); // Trim to remove unnecessary whitespaces
        cy.log(`Collection Text: ${trimmedCollectionText}`);

        // Click the second link
        cy.xpath(collectionLink).eq(1).should("be.visible").click();

        // Validate the collection title matches the text from the first link
        cy.xpath(collectionTitle)
          .invoke("text")
          .then((titleText) => {
            const trimmedTitleText = titleText.trim();
            expect(trimmedTitleText).to.equal(trimmedCollectionText);
          });
      });
    cy.get(collectionImage).should("exist");
    cy.log("collection page are present successfully");
  }
}

export default collectionPage;
