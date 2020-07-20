Feature: Slideshow (animation) is working

    Background: Login
        Given I login to SharePoint with given credentials
        And I am on the testtask page

    Scenario: ALL images will be eventually shown automatically
        Then slideshow element is displayed
        And element with text "Picture 1" is displayed
        And element with text "Picture 2" is displayed
        And element with text "Picture 3" is displayed
        But element with text "Picture 4" is not displayed
        When I wait a bit
        Then element with text "Picture 4" is displayed