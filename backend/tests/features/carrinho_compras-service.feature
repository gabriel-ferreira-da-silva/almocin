Feature: carrinho de compras

Background:
    Given no serviço "OrderService" têm os métodos "CreateOrder", "UpdateOrder", "calculateDeliveryTime"
    And no repository "OrderRepository" há os itens:
        | id | itemsId    | userID | totalPrice |   status    | totalDeliveryTime | cep       | address_number |
        |  0 |     1, 0   |    2   |    20.00   | concluded   |       15 min      | 12345-678 |      478       |
        |  1 |  1, 2, 3   |    1   |    32.00   | inProgress  |       30 min      | 50504-707 |      123       |
        |  2 |  0, 4, 4   |    4   |    21.00   | inCart      |       23 min      | 50594-000 |      987       |
        |  3 |     3, 3   |    3   |    14.00   | canceled    |       12 min      | 50689-000 |      852       |
    And Existe um obejto "OrderEntity" com os atributos: "itemsId", "userID", "totalPrice", "status", "totalDeliveryTime", "cep", "address_number"

Scenario: Criar um pedido
  Given o método "createOrder" têm como parâmetros "data: Order"
  And o método "createOrder" retorna o item formatado baseado no "Order" especificado
  And para os parâmetros:
  """
    data: {
      itemsId: [1, 0],
      userID: 1,
      totalPrice: 20.00,
      cep: 50740-170
      address_number: 210
    }
  """ 
  o método "createOrder" retorna o item:
    | id |   itemsId  | userID | totalPrice |   status    | totalDeliveryTime |     cep   | address_number |
    |  4 |     1, 0   |    1   |    20.00   |   inCart    |       9 min       | 50740-170 |      210       |
  When o método "createOrder" é chamado com o parâmetro 
  """
    data: {
      itemsId: [1, 0],
      userID: 1,
      totalPrice: 20.00,
      cep: 50740-170
      address_number: 210
    }
  """ 
  Then o método "createOrder" retorna o item formatado:
    | id |   itemsId  | userID | totalPrice |   status    | totalDeliveryTime |     cep   | address_number |
    |  4 |     1, 0   |    1   |    20.00   |   inCart    |       9 min       | 50740-170 |      210       |

Scenario: remover um item no carrinho de compras
    Given o método "updateOrder" têm como parâmetros "orderId" e "data: Order"
    And o método "updateOrder" retorna o item formatado baseado no "orderId" e "Order" especificado
    And para os parâmetros:
    """
    id: 2
    data: {
      itemsId: [4, 4]
    }
    """
    o método "updateORder" retorna o item:
    | id | itemsId    | userID | totalPrice |   status    | totalDeliveryTime | cep       | address_number |
    |  2 |  4, 4      |    4   |    16.00   | inCart      |       23 min      | 50594-000 |      987       |
    When o método "updateOrder" é chamado com o parâmetro
    """
    id: 2
    data: {
      itemsId: [4, 4]
    }
    """
    Then o método "updateOrder" retorna o item formatado:
    | id | itemsId    | userID | totalPrice |   status    | totalDeliveryTime | cep       | address_number |
    |  2 |  4, 4      |    4   |    16.00   | inCart      |       23 min      | 50594-000 |      987       |

Scenario: editar a quantidade de um item no carrinho de compras
Given o método "updateOrder" têm como parâmetros "orderId" e "data: Order"
    And o método "updateOrder" retorna o item formatado baseado no "orderId" e "Order" especificado
    And para os parâmetros:
    """
    id: 4
    data: {
      itemsId: [1, 0, 1, 0]
    }
    """
    o método "updateORder" retorna o item:
    | id |   itemsId   | userID | totalPrice |   status    | totalDeliveryTime |     cep   | address_number |
    |  4 |  1, 0, 1, 0 |    1   |    40.00   |   inCart    |       9 min       | 50740-170 |      210       |
    When o método "updateOrder" é chamado com o parâmetro
    """
    id: 2
    data: {
      itemsId: [1, 0, 1, 0]
    }
    }
    """
    Then o método "updateOrder" retorna o item formatado:
    | id |   itemsId   | userID | totalPrice |   status    | totalDeliveryTime |     cep   | address_number |
    |  4 |  1, 0, 1, 0 |    1   |    40.00   |   inCart    |       9 min       | 50740-170 |      210       |