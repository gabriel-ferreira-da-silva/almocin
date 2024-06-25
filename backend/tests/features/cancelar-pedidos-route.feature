Feature: Cancelar pedidos 

  Scenario: Cancelar pedido com sucesso
    Given repositorio contem os dados
      | id | userId | itemsId | status | 
      | "0" | "0" | ["item-id-0","item-id-1"] | "Concluded" |
      | "1" | "1" | ["item-id-1","item-id-2","item-id-3"] | "In Progress" |
      | "2" | "0" | ["item-id-0","item-id-1","item-id-3"] | "Canceled" |
      | "3" | "1" | ["item-id-2","item-id-3"] | "Concluded" |
      | "4" | "2" | ["item-id-1","item-id-2"] | "In Progress" |
    When o usuário faz uma requisição "PUT" para "/api/order/1" com os seguintes dados:
      """
      {
        'status':'canceled'
      }
      """
    Then a resposta deve ser "200"
    And repositorio é alterado para
      | id | userId | itemsId | status | 
      | "0" | "0" | ["item-id-0","item-id-1"] | "Concluded" |
      | "1" | "1" | ["item-id-1","item-id-2","item-id-3"] | "Canceled" |
      | "2" | "0" | ["item-id-0","item-id-1","item-id-3"] | "Canceled" |
      | "3" | "1" | ["item-id-2","item-id-3"] | "Concluded" |
      | "4" | "2" | ["item-id-1","item-id-2"] | "In Progress" |
