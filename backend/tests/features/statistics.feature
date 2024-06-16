Feature: Statistics

  Scenario: GET data
    Given I send a GET request to "/stats.json"
    When the request is processed
    Then the response status should be 200
    And the response should contain the data object

  Scenario: PUT data
    Given I send a PUT request to "/stats.json" with the following values
      | totalUsers | 150 |
      | totalItems | 300 |
    When the request is processed
    Then the response status should be 200
    And the response should contain the updated data
    
