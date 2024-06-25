Feature: carrinho de compras
  As eu sou um cliente
  I want escolher os itens que desejo comprar
  So that eu possa efetuar e receber meu pedido

Scenario: inserir um item no carrinho de compras
  Given não há itens no carrinho de compras
  When o usuário faz uma requisição "POST" para o endpoint "order" com as informações:
  """
  {
    "userID": "1",
    "itemsId": "0",
    "totalPrice": 20.00,
    "status": "In Cart",
    "cep": "12345-678"
  }
  """
  Then o status code da requisição é "200"
  And o corpo da resposta: 
  """
  {
    "message": "Pedido criado com sucesso"
  }
  """
  And o carrinho de compras está com as seguintes informações:
    | userID | itemsId | totalPrice |   status    |    cep    |
    |    1   |    0    |    20.00   |   In Cart   | 12345-678 |

Scenario: remover um item no carrinho de compras
  Given há um item no carrinho de compras:
    | userID | itemsId | totalPrice |   status  |    cep    |
    |    1   |    0    |    20.00   |  In Cart  | 12345-678 |
  When o usuário faz uma requisição "PUT" para o endpoint "order/:id" com as informações:
  """
  {
    "itemsId": "",
    "totalPrice": 0.00
  }
  """
  Then o status code da requisição é "200"
  And o corpo da resposta: 
  """
  {
    "message": "Pedido atualizado com sucesso"
  }
  """
  And o carrinho de compras está com as seguintes informações:
    | userID | itemsId | totalPrice |   status  |    cep    |
    |    1   |         |     0.00   |  In Cart  | 12345-678 |

Scenario: editar a quantidade de um item no carrinho de compras
  Given há um item no carrinho de compras:
    | userID | itemsId | totalPrice |   status  |    cep    |
    |    1   |    0    |    20.00   |  In Cart  | 12345-678 |
  When o usuário faz uma requisição "PUT" para o endpoint "order/:id" com as informações:
  """
  {
    "itemsId": "[0, 0]",
    "totalPrice": 40.00
  }
  """
  Then o status code da requisição é "200"
  And o corpo da resposta: 
  """
  {
    "message": "Pedido atualizado com sucesso"
  }
  """
  And o pedido no carrinho de compras é:
    | userID |   itemsId   | totalPrice |   status  |    cep    |
    |    1   |    [0, 0]   |    40.00   |  In Cart  | 12345-678 |