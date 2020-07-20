Feature: Verify that hover effects for each Tile are animated

    Background: Login
        Given I login to SharePoint with given credentials
        And I am on the testtask page
        Then slideshow element is displayed

    Scenario Outline: Animation for each Tile is working
        When I hover on <Tile name> Tile
        Then animation hover is displayed

        Examples:
            | Tile name                               |
            | Page Builder                            |
            | Demos library                           |
            | Theme builder                           |
            | Connections and related functionalities |

