Feature: Weltrade tests

    Background:
        Given user goes to weltrade main page

    Scenario: Verify main page is loaded and header menu contains 6 items
        Then the title of page contains 'WELTRADE'
        And the header menu contains 6 items
        And the header menu items are:
            | Company     |
            | Trading     |
            | Partnership |
            | Tools       |
            | Education   |
            | Promotions  |

    Scenario: Displaying of submenu
        When the user hovers the following menu items in header:
            | Company     |
            | Trading     |
            | Partnership |
            | Tools       |
            | Education   |
            | Promotions  |
        Then the corresponding submenus should be displayed

    Scenario: Tab by default in platforms section
        When the user scrolls to the platforms section
        Then the following tabs should be present in the platforms section:
            | Desktop Platforms  |
            | Mobile Platforms   |
            | Web Platforms      |
        And the content of 'Desktop Platforms' tab should be displayed

    Scenario: Switching tabs in platforms section
        When the user scrolls to the platforms section
        And the user clicks the following tabs in the platforms section:
            | Web Platforms      |
            | Mobile Platforms   |
            | Desktop Platforms  |
        Then the corresponding tab should be active and its content should be displayed
