Feature: Validations on 404 page
       Background: Click on TLS logo
              Given User clicks on TLS Logo
       @sanity
       Scenario: Navigate to 404 page
              When User Navigate to irrelavant page
              Then 404 Error should display
      
       Scenario: Verify 404 functionality for Current issue page
              When User Navigate to Current Issue Page
              And User Navigate to irrelavant page
              Then 404 Error should display

       Scenario: Verify 404 functionality for Subscribe page
              When User Navigate to Subscribe Page
              And User Navigate to irrelavant page
              Then 404 Error should display

       Scenario: Verify 404 functionality for Categories page
              When User Navigate to Categories History Page
              And User Navigate to irrelavant page
              Then 404 Error should display

       Scenario: Validate the Utags and Tealium check
              When User Navigate to irrelavant page
              Then 404 Error should display
              And Validate Utag data values
              And  Validate appropriate Tealium JS is loading for each environment in single 404 page
