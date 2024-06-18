Feature: carrinho de compras
    As eu sou um cliente
    I want escolher os itens que desejo comprar
    So that eu possa efetuar e receber meu pedido

Scenario: inserir um item no carrinho de compras
    Given há "0" itens no "carrinho de compras"
    When o usuário faz uma requisição "POST" para o endpoint "/order" com as informações:
    """{
        "userId": "1",
        "productsIds": ["0"]
        "value": 20.00
        "status": "no carrinho"
        "cep": 12345-678
        "estimedDeliveryTime": "15 minutos"
       }"""
    Then o status code da requisição é "201"
    And o corpo da resposta: 
    ""{
        "message": "Novo item no carrinho"
      }""
    And o "carrinho de compras" está com as seguintes informações:
        | orderId | userID | productsIds | value |   status    | cep       | estimedDeliveryTime |
        |    10   |    1   |      [0]    | 20.00 | no carrinho | 12345-678 |      15 minutos     |

Scenario: remover um item no carrinho de compras
    Given há "1" item no "carrinho de compras":
    """{
        "orderId": "10",
        ...
        "productsIds": ["0"],
        ...
       }"""
    When o usuário faz uma requisição "PUT" para o endpoint "/order/10" com as informações:
    """{
        "productsIds": []
       }"""
    Then o status code da requisição é "200"
    And o corpo da resposta: 
    ""{
        "message": "O carrinho de compras está vazio"
      }""
    And o "carrinho de compras" está com as seguintes informações:
        | orderId | userID | productsIds | value |   status    |    cep    | estimedDeliveryTime |
        |    10   |    1   |      []     |   0   | no carrinho | 12345-678 |      15 minutos     |

Scenario: editar a quantidade de um item no carrinho de compras
    Given há "1" item no "carrinho de compras":
    """{
        "orderId": "10",
        ...
        "productsIds": ["0"],
        ...
       }"""
    When o usuário faz uma requisição "PUT" para o endpoint "/order/10" com as informações:
    """{
        "productsIds": ["0"]
       }"""
    Then o status code da requisição é "200"
    And o corpo da resposta: 
    ""{
        "message": "Quantidade do item alterada no carrinho"
      }""
    And o pedido no "carrinho de compras" é:
        | orderId | userID | productsIds | value |   status    |    cep    | estimedDeliveryTime |
        |    10   |    1   |    [0, 0]   | 40.00 | no carrinho | 12345-678 |      15 minutos     |