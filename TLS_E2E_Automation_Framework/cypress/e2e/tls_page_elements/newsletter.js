require("cypress-xpath");
import * as paywall from "./paywall.js";

// Selectors for various elements on the page
const newsLetterPopUp =
  "//div[@class='tls-newsletter__wrapper-container modal-content']";
const newsLetterButton =
  "//div[@class='tls-newsletter__wrapper-container modal-content']//span[@role='button']";
const newsLetterBlock = ".tls-newsletter__wrapper-container";
const sendButton = "//button[@class='tls-button tls-button--primary']";
const articleLink = ".tls-card-headline";
const inputBox = ".tls-input-field>input";
const successMessage =
  "//div[@class='tls-newsletter__wrapper-container--state-success popup-success']/h2";
const successBlock =
  "//div[@class='tls-newsletter__wrapper-container--state-success block-success']/h2";
const tlsLogo = ".tls-header-navigation__logo";
const errorIcon = ".tls-input-field>svg";
const errorMessage =
  ".tls-newsletter__wrapper-container-form--state-error-message";
const emailID = "testingsubscription_tls@yopmail.com";

class NewsLetter {
  /**
   * Verifies that the newsletter popup is closed after scrolling through the page.
   */
  static verifyClosedPopUp() {
    let scrollPosition = 1000; // Initial scroll position
    const scrollIncrement = 200; // Scroll increment step
    const maxScrollHeight = 3500; // Maximum height to scroll

    // Recursive function to scroll and check for popup visibility
    function scrollStep() {
      cy.scrollTo(0, scrollPosition).wait(1000); // Scroll and wait for DOM updates

      cy.get("body").then(($body) => {
        if (
          $body.find(".tls-newsletter__wrapper-container.modal-content")
            .length > 0 &&
          cy.xpath(newsLetterPopUp).should("be.visible")
        ) {
          cy.log("Newsletter popup is present on the article page.");
          throw new Error("Popup was not closed within scroll limits.");
        } else if (scrollPosition <= maxScrollHeight) {
          scrollPosition += scrollIncrement;
          scrollStep(); // Continue scrolling
        } else {
          cy.log("Newsletter popup is not present on the page.");
        }
      });
    }

    scrollStep(); // Start scrolling
  }

  /**
   * Validates the newsletter popup on the home page.
   */
  static validateNewsLetterHomePage() {
    cy.scrollTo(0, 1200);
    cy.xpath(newsLetterPopUp).should("exist");
    cy.xpath(newsLetterButton).click();
    cy.get(newsLetterBlock).eq(1).scrollIntoView().should("exist");
    cy.log("Newsletter popup validated on the homepage.");
  }

  /**
   * Validates the newsletter presence on an article page.
   */
  static validateNewsLetterArticlePage() {
    cy.get(articleLink).eq(3).click();
    paywall.closeNewsletterBanner();
    cy.get(newsLetterBlock).eq(1).scrollIntoView().should("exist");
    cy.log("Newsletter popup and block validated on the article page.");
  }

  /**
   * Subscribes to the newsletter via the popup.
   */
  static newsletterSubscriptionFromPopUp() {
    cy.scrollTo(0, 1200);
    cy.xpath(newsLetterPopUp).should("exist");
    cy.get(inputBox).eq(0).type(emailID);
    cy.xpath(sendButton).eq(0).click();
    cy.xpath(successMessage)
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Thanks for signing up!");
      });
    cy.xpath(newsLetterButton).click();
    cy.reload(true);
    cy.scrollTo("bottom");
    cy.get(newsLetterBlock).should("not.exist");
    cy.get(articleLink).eq(3).click();
    this.verifyClosedPopUp();
    cy.get(newsLetterBlock).should("not.exist");
    cy.log("Newsletter subscription completed via popup.");
  }

  /**
   * Subscribes to the newsletter via the block on the homepage.
   */
  static newsletterSubscriptionFromBlock() {
    this.validateNewsLetterHomePage();
    cy.get(newsLetterBlock).eq(1).scrollIntoView().should("exist");
    cy.get(inputBox).eq(1).type(emailID);
    cy.xpath(sendButton).eq(1).click();
    cy.xpath(successBlock)
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Thanks for signing up!");
      });
    cy.get(articleLink).eq(3).click();
    this.verifyClosedPopUp();
    cy.get(newsLetterBlock).should("not.exist");
    cy.log("Newsletter subscription completed via block.");
  }

  /**
   * Validates the popup after clearing local storage and reloading the page.
   */
  static validatePopupAfterClearingStorage() {
    this.validateNewsLetterHomePage();
    cy.clearAllLocalStorage();
    cy.reload(true);
    cy.scrollTo(0, 1200);
    cy.xpath(newsLetterPopUp).should("exist");
    cy.log("Popup validated after clearing storage.");
  }

  /**
   * Validates closing the newsletter popup on the homepage.
   */
  static validateClosingPopUpHomePage() {
    cy.scrollTo(0, 1200);
    cy.xpath(newsLetterPopUp).should("exist");
    cy.xpath(newsLetterButton).click();
    cy.get(articleLink).eq(3).click();
    this.verifyClosedPopUp();
    cy.log("Newsletter popup closed successfully on the homepage.");
  }

  /**
   * Validates closing the newsletter popup from an article page.
   */
  static validateClosingPopUpFromArticlePage() {
    cy.get(articleLink).eq(3).click();
    paywall.closeNewsletterBanner();
    cy.get(tlsLogo).click();
    cy.scrollTo(0, 1200);
    cy.xpath(newsLetterPopUp).should("not.exist");
    cy.log("Newsletter popup closed successfully from the article page.");
  }

  /**
   * Validates a successful subscription on the article page.
   */
  static validSubscriptionArticlePage() {
    cy.get(articleLink).eq(3).click();
    paywall.closeNewsletterBanner();
    cy.get(newsLetterBlock).eq(1).scrollIntoView().should("exist");
    cy.get(inputBox).eq(1).type(emailID);
    cy.xpath(sendButton).eq(1).click();
    cy.xpath(successBlock)
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Thanks for signing up!");
      });
    cy.get(tlsLogo).click();
    cy.scrollTo(0, 1200);
    cy.xpath(newsLetterPopUp).should("not.exist");
    cy.scrollTo(0, 4800);
    cy.get(newsLetterBlock).should("not.exist");
    cy.log("Successful subscription validated on the article page.");
  }

  /**
   * Validates subscription with invalid credentials.
   */
  static validSubscriptionInvalidCreds() {
    this.validateNewsLetterHomePage();
    cy.xpath(sendButton).eq(1).click();
    cy.get(errorIcon).should("exist");
    cy.get(errorMessage)
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Please enter email address");
      });
    cy.log("Error message validated for invalid credentials.");
  }
}

export default NewsLetter;
