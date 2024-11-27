const myAccountLink = "//li[@class='nk-menu-item css-bkfzpe']";
const homePageLink = "//div[@class='css-mycqxl']//span[@class='css-1ayf1st']";
const subsDetail = ".css-ztoeyf";
const subText = "You don’t have a subscription";
const addressLink = "./css-13p0b4b";
const footerLink = "//div[@class='css-1c1zire']/a";
const goToLink = ".css-mycqxl";
const homaPageLink = ".tls-card-headline";
const myAccountLinkHome =
  "//*[@id='tls-home-page-root']/div/div/nav/div/div[2]/span[5]/a";
const subscribeButton = ".tls-header-navigation__button-subscribe > a";

export function myAccountLinkValidation() {
  cy.xpath(myAccountLink).eq(0).should("exist");
  cy.xpath(myAccountLink).eq(1).should("exist");
  cy.xpath(myAccountLink).eq(2).should("exist");
  cy.xpath(homePageLink).eq(1).should("exist");
  cy.scrollTo(0, 1000);
}
export function billingLinkValidation() {
  cy.xpath(myAccountLink).eq(1).should("exist").click();
  cy.wait(2000);
  cy.log("The subscribtion and billing link is present");
  cy.get(subsDetail)
    .should("exist")
    .invoke("text")
    .then((text) => {
      expect(text).contains(subText);
    });
}

export function addressLinkValidation() {
  cy.xpath(myAccountLink).eq(2).should("exist");
  cy.xpath(myAccountLink).eq(2).click();
  cy.wait(2000);
  cy.log("The address link is present");
  cy.get(addressLink)
    .should("exist")
    .invoke("text")
    .then((text) => {
      expect(text).contains("Address line 1");
    });
}

export function footerLinkValidatiion() {
  cy.log("validating footer link");
  cy.xpath(footerLink).should("exist");
  cy.log("validating the about us link in footer");
  cy.xpath(footerLink)
    .eq(0)
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      expect(text).contains("About us");
    });
  cy.xpath(footerLink)
    .eq(1)
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      expect(text).contains("Privacy & cookie policy");
    });
  cy.xpath(footerLink)
    .eq(2)
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      expect(text).contains("Terms & conditions");
    });
  cy.xpath(footerLink)
    .eq(3)
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      expect(text).contains("Contact us");
    });
  cy.xpath(footerLink)
    .eq(4)
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      expect(text).contains("Preferences");
    });
}
export function goToHomePageLinkValidation() {
  cy.get(goToLink).eq(0).click();
  cy.log("user is successfully navigated to homepage");
  cy.get(homaPageLink).should("exist");

  cy.xpath(myAccountLinkHome).click();
  cy.wait(2000);
  cy.xpath(myAccountLink).eq(0).should("exist");
  cy.log("user is successfully navigated to myaccount page again");
}
export function logoutButtonValidation() {
  cy.get(goToLink).eq(1).click();
  cy.log("user is successfully navigated to homepage");
  cy.get(homaPageLink).should("exist");
  cy.get(subscribeButton)
    .invoke("text")
    .then((text) => {
      expect(text).to.equal("Subscribe");
    });
  cy.log("the user is successfully logged out tls");
}
