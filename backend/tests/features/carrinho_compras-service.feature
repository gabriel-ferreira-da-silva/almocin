Feature: carrinho de compras

Scenario: Criar um pedido
  Given o método createOrder retorna o pedido criado
  And no repository MenuRepository há as itens:
    | name | price | description | categoryID | image | timeToPrepare |
    | "Coca-Cola" | 5.00 | "Gelada" | "1" | "coca-cola.jpg" | 5 |
    | "Hamburguer" | 15.00 | "feito de carne" | "2" | "ham.jpg" | 10 |
    | "Batata Frita" | 10.00 | "Sem Oléo" | "3" | "bt.jpg" | 5 |
    | "Sorvete" | 7.00 | "Chocolate" | "2" | "ice-cream.jpg" | 5 |
    | "Cerveja" | 8.00 | "Cerveja gelada" | "1" | "cerveja.jpg" | 5 |
  When eu chamo o método createOrder com os parâmetros:
  """
    {
      "itemsId": "1",
      "userID": "1",
      "totalPrice": 15.00,
      "cep": "50740-170",
      "address_number": 210
    }
  """ 
  Then o método createOrder retorna o item formatado:
    | id |   itemsId  | userID | totalPrice |   status |     cep   | address_number |
    |  4 |     1   |    1   |    15.00   |   In Cart    | 50740-170 |      210       |

Scenario: remover um item no carrinho de compras
  Given o método updateOrder retorna o pedido modificado e os pedidos de OrderRepository são:
    | id | itemsId    | userID | totalPrice |   status    | totalDeliveryTime | cep       | address_number |
    |  0 |     1, 0   |    2   |    20.00   | concluded   |       15 min      | 12345-678 |      478       |
    |  1 |  1, 2, 3   |    1   |    32.00   | inProgress  |       30 min      | 50504-707 |      123       |
    |  2 |  0, 4, 4   |    4   |    21.00   | In Cart      |       23 min      | 50594-000 |      987       |
    |  3 |     3, 3   |    3   |    14.00   | canceled    |       12 min      | 50689-000 |      852       | 
  When eu chamo o método updateOrder com os parâmetros:
  """
  {
    "id": 2,
    "data": {
      "itemsId": "4",
      "totalPrice": 8.00
    }
  }
  """
  Then o método updateOrder retorna o item formatado:
    | id | itemsId    | userID | totalPrice |   status    | totalDeliveryTime | cep       | address_number |
    |  2 |  4   |    4   |    8.00   | In Cart      |       23 min      | 50594-000 |      987       |

Scenario: editar a quantidade de um item no carrinho de compras
  Given o método updateOrder retorna o pedido modificado e os pedidos de OrderRepository são:
    | id | itemsId    | userID | totalPrice |   status    | totalDeliveryTime | cep       | address_number |
    |  0 |     1, 0   |    2   |    20.00   | concluded   |       15 min      | 12345-678 |      478       |
    |  1 |  1, 2, 3   |    1   |    32.00   | inProgress  |       30 min      | 50504-707 |      123       |
    |  2 |  0, 4, 4   |    4   |    21.00   | In Cart      |       23 min      | 50594-000 |      987       |
    |  3 |     3, 3   |    3   |    14.00   | canceled    |       12 min      | 50689-000 |      852       | 
  When eu chamo o método updateOrder com os parâmetros:
  """
  {
    "id": 2,
    "data": {
      "itemsId": "[0, 0, 4, 4]",
      "totalPrice": 26.00
    }
  }
  """
  Then o método updateOrder retorna o item formatado:
    | id | itemsId    | userID | totalPrice |   status    | totalDeliveryTime | cep       | address_number |
    |  2 |  [0, 0, 4, 4]   |    4   |    26.00   | In Cart      |       23 min      | 50594-000 |      987       |
