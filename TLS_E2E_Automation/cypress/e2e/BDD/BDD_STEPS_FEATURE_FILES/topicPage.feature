Feature: Validations on Topics page

    Background: User is clicks on TLS logo
        Given User is clicks on TLS logo
        When User clicks on explore button
        And User clicks on longread button
        Then Validate the user is navigated to longread topics page
    @sanity
    Scenario: Validate title and description of the page
        And Validate title and description of the page

    Scenario: Valiadte article name, Image, byline, label and card subheadline inside aggregation page
        And Valiadte article name, Image, byline, label and card subheadline inside aggregation page
    @focus
    Scenario: Validate Show more button and Its count
        And Validate show more button and its count
    @sanity
    Scenario: Check if Tealium JS is loading as expected
        And Validate tealium JS is loading as expected
