Feature: Statistics

  Scenario: Get JSON data
    Given the server is running
    When I request the data
    Then the response should contain the JSON data

  Scenario: Update JSON data
    Given the server is running
    When I update the data with the following values
      | totalUsers | 200 |
      | totalItems | 500 |
    Then the response should reflect the updated data
