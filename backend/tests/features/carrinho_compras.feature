Feature: carrinho de compras
    As eu sou um cliente
    I want escolher os itens que desejo comprar
    So that eu possa efetuar e receber meu pedido

Scenario: inserir um item no carrinho de compras
    Given que não há itens no carrinho de compras
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

Scenario: remover um item no carrinho de compras
    Given que há um item no carrinho de compras:
    """{
        "OrderId": "10",
        ...
        "productsIds": ["0"],
        ...
       }"""
    When o usuário faz uma requisição "PUT" para o endpoint "/order/10" com as informações:
    """{
        "productsIds": []
       }"""
    Then o status code da requisição é "200"
    And o corpo da restosta: 
    ""{
        "messege": "O carrinho de compras está vazio"
      }""

Scenario: editar a quantidade de um item no carrinho de compras
    Given que há um item no carrinho de compras:
    """{
        "OrderId": "10",
        ...
        "productsIds": ["0"],
        ...
       }"""
    When o usuário faz uma requisição "PUT" para o endpoint "/order/10" com as informações:
    """{
        "productsIds": ["0"]
       }"""
    Then o status code da requisição é "200"
    And o pedido no carrinho de compras é:
    """{
        "OrderId": "10",
        ...
        "productsIds": ["0", "0"],
        ...
       }"""