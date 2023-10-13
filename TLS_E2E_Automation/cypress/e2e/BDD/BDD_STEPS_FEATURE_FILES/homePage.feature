Feature: Validations on Home page

    Background: Load the Home page
        Given Users enters into the tls home page
        When  The home page is loaded successfully

    @sanity
    Scenario: Validate left block and center collections
        Then Validate left block and center collections

    @sanity
    Scenario: Validate all the sections in home page have loaded successfully
        Then  All the sections of the home page should be loaded

    @sanity
    Scenario: Validate Hero block
        Then  Validate hero block

    @sanity
    Scenario: Validate Issue teaser in hero block
        Then Validate Issue block has an TLS image
        And Validate Issue block has date and this week issue

    @sanity
    Scenario: Validate Hero Large Block and its categories
        Then Validate Hero Large Block has image,category name,articlename and author name

    @sanity
    Scenario: Validate the Document, Window and Decibel
        Then Validate the Document, Window and Decibel

    @sanity
    Scenario: Validate podcast header, title , standfirst, image and date
        Then Validate podcast header, title , standfirst and  image and date

    @sanity
    Scenario: Validate podcast Article title and header
        Then Validate podcast Article and Title
    
    Scenario: Validate ads in Home Page
        Then Validate ads in Home Page

    @sanity
    Scenario: Validate JS Loading
        Then Validate JS Loading
        
    @sanity
    Scenario: Validate appropriate Tealium JS is loading for each environment in single home page
        Then Validate appropriate Tealium JS is loading for each environment in single home page
