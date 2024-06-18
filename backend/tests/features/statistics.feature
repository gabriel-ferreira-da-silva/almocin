Feature: Statistics

   Scenario: GET todas estatísticas
    Given há um objeto em "Estatistica":
    """
      {
        "totalUsers": 100,
        "totalItems": 50,
        "totalRevenue": 10000,
        "monthRevenue": 2000,
        "totalOrders": 150,
        "monthOrders": 30,
        "averageTicket": 100
    }
    """
    When o usuário faz uma requisição "GET" para o endpoint "/stats" com o código "all"
    Then o status code da rquisição deve ser "200"
    And a resposta deve conter as seguintes informações:
        | totalUsers | totalItems | totalRevenue | monthRevenue |  totalOrders   | monthOrders | averageTicket |
        |    100     |    50      |      10000   |     2000     |       150      |      30     |       100     |
    
  Scenario: GET estatísticas de arrecadação
    Given há um objeto em "Estatistica":
    """
      {
        "totalUsers": 100,
        "totalItems": 50,
        "totalRevenue": 10000,
        "monthRevenue": 2000,
        "totalOrders": 150,
        "monthOrders": 30,
        "averageTicket": 100
      }
    """
    When o usuário faz uma requisição "GET" para o endpoint "/stats" com o código "mon"
    Then o status code da rquisição deve ser "200"
    And a resposta deve conter as seguintes informações:
        | totalRevenue | monthRevenue |  averageTicket |
        |      10000   |     2000     |       100      |
  
  
  Scenario: editar um único dado da estatística
    Given há um objeto em "Estatistica":
    """
      {
        "totalUsers": 100,
        "totalItems": 50,
        "totalRevenue": 10000,
        "monthRevenue": 2000,
        "totalOrders": 150,
        "monthOrders": 30,
        "averageTicket": 100
      }
    """
    When o usuário faz uma requisição "PUT" para o endpoint "/stats" com os seguintes valores:
         | totalOrders | 160 |
    Then o status code da rquisição deve ser "204"
    And o objeto deve estar com as seguinte informações:
    """
      {
        "totalUsers": 150,
        "totalItems": 300,
        "totalRevenue": 10000,
        "monthRevenue": 2000,
        "totalOrders": 160,
        "monthOrders": 30,
        "averageTicket": 100
      }
    """
  
  Scenario: editar dados da estatística
    Given há um objeto em "Estatistica":
    """
      {
        "totalUsers": 100,
        "totalItems": 50,
        "totalRevenue": 10000,
        "monthRevenue": 2000,
        "totalOrders": 150,
        "monthOrders": 30,
        "averageTicket": 100
      }
    """
    When o usuário faz uma requisição "PUT" para o endpoint "/stats" com os seguintes valores:
         | totalUsers | 150 |
         | totalItems | 300 |
    Then o status code da rquisição deve ser "204"
    And o objeto deve estar com as seguinte informações:
    """
      {
        "totalUsers": 150,
        "totalItems": 300,
        "totalRevenue": 10000,
        "monthRevenue": 2000,
        "totalOrders": 150,
        "monthOrders": 30,
        "averageTicket": 100
      }
    """
    
