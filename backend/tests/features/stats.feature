Feature: Statistics

  Scenario: requisitar todas as estatísticas
    Given há um objeto em "/stats":
    """
      {
        "totalUsers": 0,
        "totalItems": 0,
        "totalRevenue": 0,
        "currentMonthRevenue": 0,
        "totalOrders": 0,
        "monthOrders": 0,
        "averageTicket": 0,
        "currentMonthAverageTicket": 0
      }
    """
    When o usuário faz uma requisição "GET" para o endpoint "/stats" com o filtro "all"
    Then o status code da requisição deve ser "200"
    And a resposta deve conter as seguintes informações:
      |  totalUsers  |  totalItems  |  totalRevenue  |  currentMonthRevenue  |  totalOrders  |  monthOrders  |  averageTicket  |  currentMonthAverageTicket  |
      | 0 |0 |0|0|0|0|0|0 |

    
  Scenario: requisitar as estatísticas de arrecadação
    Given há um objeto em "/stats/money":
    """
      {
        "totalRevenue": 0,
        "currentMonthRevenue": 0,
        "averageTicket": 0,
        "currentMonthAverageTicket": 0
      }
    """
    When o usuário faz uma requisição "GET" para o endpoint "/stats" com o filtro "money"
    Then o status code da requisição deve ser "200"
    And a resposta deve conter as seguintes informações:
      |  totalRevenue  |  currentMonthRevenue  |  currentMonthAverageTicket  |  averageTicket  |
      | 0|0|0|0 |

  Scenario: requisitar as estatísticas mensais
    Given há um objeto em "/stats/month":
    """
      {
        "currentMonthRevenue": 0,
        "monthOrders": 0,
        "currentMonthAverageTicket": 0
      }
    """
    When o usuário faz uma requisição "GET" para o endpoint "/stats" com o filtro "month"
    Then o status code da requisição deve ser "200"
    And a resposta deve conter as seguintes informações:
      |  currentMonthRevenue  |  monthOrders  |  currentMonthAverageTicket  |
      | 0|0| 0 |
    
