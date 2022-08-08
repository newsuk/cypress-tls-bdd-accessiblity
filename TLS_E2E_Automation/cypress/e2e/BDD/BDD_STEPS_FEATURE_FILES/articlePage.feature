
@article
Feature: Validations on Article page
    Background: Click on TLS logo
        Given User clicks on TLS Logo

    @sanity
    Scenario: Navigate to Article page and Validate  Category, Separator And Article type
        Then User click on second article from Home page
        And Article page should open which the user has selected
        And Validate the category, separator And Article type

    @sanity
    Scenario: Verify Article title, subtitle, Author and Image
        When User click on second article from Home page
        Then Validate the title, subtitles , author with prefix by, image and its caption

    Scenario: Verify Article has social media sharing buttons (twitter,facebook,email)
        When User click on second article from Home page
        Then Validate the social media buttons twitter, facebook , email

    Scenario: Verify the Article has content with side bar details like (Read issue,Review,Keep Reading etc)
        When User click on second article from Home page
        Then Validate the Article has content and other details
    @sanity
    Scenario: Validate the Utags and Tealium check
        Then Validate Utag data values
        And Validate Utag data values for Guest
        And  Validate appropriate Tealium JS is loading for each environment in single article page






