Feature: carrinho de compras
    As eu sou um cliente
    I want escolher os itens que desejo comprar
    So that eu possa efetuar e receber meu pedido

Scenario: inserir um item no carrinho de compras
    Given O array "carrinho_compras" do "users/1"
    When "GET /menu/0" é solicitado
    And o "GET" responde um json com os valores "ID": "0"
    And "Name": "Batata"
    And "Price": "10.00"
    And "Description": "Não é a frita"
    And "Image": "None"
    And "Category": "Promoção"
    And "Availability": "0 minutos"
    And o array "carrinho de compras" adiciona o "id": "0" no ultimo índice
    Then o array carrinho de compras tem o item "0" adicionado

Scenario: remover um item no carrinho de compras
    Given O array "carrinho_compras" do "users/1"
    And um elemento do array tem o valor "2" 
    When "DELETE /carrinho/2" é solicitado
    And todos os elementos com valores "2" são removidos do array
    Then o carrinho não tem mais um item de "id" "2"

Scenario: editar a quantidade de um item no carrinho de compras
    Given O array "carrinho_compras" do "users/1"
    And "2" elementos do array tem o valor "2" 
    When "PUT /carrinho/2-" é solicitado
    And um valor "2" é removido de um dos elementos do array
    Then o carrinho tem uma quantidade a menos do item de "id" "2"