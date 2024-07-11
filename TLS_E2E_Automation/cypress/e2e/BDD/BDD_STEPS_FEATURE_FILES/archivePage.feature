@article
Feature: Validations on Archive page
    Background: Click on TLS logo
        Given User clicks on TLS Logo
        When Navigate to  archive page

     @sanity
    Scenario: Validate archive page is navigate
        Then Validate archive page is loaded
    
    Scenario: Validate social media icons and subscribe and search header
        Then Validate social media icons and subscribe and search header
    
   
    Scenario: Validate footer
        Then Validate footer
    
   
    Scenario: Validate year filter in Archive Page
        Then Validate year filter functionalites
    
   
    Scenario: Validate search filter in Archive Page
        Then Validate search filter functionalites

    
    Scenario: Validate backToTop
        Then Validate backToTop
    
   
    Scenario: Validate Algolia Page is located at bottom and it is navigating to gale page
        Then Validate Algolia Page is located at bottom and it is navigating to gale page
    
     
    Scenario: Validate click here for non subscriber
        Then  Validate click here for non subscriber
    
   
    Scenario: Validate showmore button
        And Validate Show more button
    