Feature: Statistics

  Scenario: GET data
    Given I send a "GET" request to "/statistics"
    When the request is processed
    Then the response status should be "200"
    And the response should contain the data object:
    "
      {
        "totalUsers": 100,
        "totalItems": 50,
        "totalRevenue": 10000,
        "monthRevenue": 2000,
        "totalOrders": 150,
        "monthOrders": 30,
        "averageTicket": 100
      }
  "
 
  Scenario: PUT data
    Given I send a "PUT" request to "/statistics" with the following values
      | totalUsers | 150 |
      | totalItems | 300 |
    When the request is processed
    Then the response status should be "200"
    And the response should contain the updated data
    
