@article
Feature: Validations on Content page
    Background: Click on TLS logo and Navigate to Current Issue page and validate page is loaded
        Given User clicks on TLS Logo
        When User Navigate to Current Issue
        Then Validate Page is loaded

    
    Scenario: Validate the Previous Issue and Next Issue in Current Issue Page
        Then Validate the Previous Issue and Next Issue in Current Issue Page

    
    Scenario: Validate the Previous Issue
        Then Validate User should have Previous Issue which is 7 days before from current Issue

    Scenario: Validate the Current Issue and Previous Issue has Image,Artcile headline and By
        Then Validate the Current Issue and Previous Issue has Image,Artcile headline and By

    Scenario:Validate the Current Issue page and View Content page are opens same and both dates are equal
        Then Validate the Current Issue page and View Content page are opens same and both dates are equal

    Scenario:Validate Showcase section
        Then Validate showcase section
   @focus
    Scenario:Validate Contents section
        Then Validate Contents section
        
    
    Scenario: Validate appropriate Tealium JS is loading for each environment in content page
        Then Validate appropriate Tealium JS is loading for each environment in single content page

    
    # Scenario: Validate appropriate Tealium JS is loading
    #     Then Validate appropriate Tealium JS is loading