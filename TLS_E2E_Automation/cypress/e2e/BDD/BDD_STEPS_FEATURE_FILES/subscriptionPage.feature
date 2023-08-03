Feature: Validations on Subscription page

    Background: Click on Subscribe button
        Given User clicks on TLS Logo
        And User clicks on Subscribe button
        Then Validate user is navigated to Subscription page


    @sanity
    Scenario: Validate the Navigation, TLS logo and Text in the header
        And Validate TLS logo and Text in the header

    Scenario: Validate the FAQ's section
        And Validate the FAQs section

    @sanity
    Scenario: Validate the Print pack
        And Validate the Print pack

    @sanity
    Scenario: Validate the Print and Digital pack
        And Validate the Print and Digital pack
        
    @sanity
    Scenario: Validate the Digital pack
        And Validate the Digital pack

