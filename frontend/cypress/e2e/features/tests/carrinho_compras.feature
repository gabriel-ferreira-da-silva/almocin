Feature: carrinho de compras
    As eu sou um cliente
    I want escolher os itens que desejo comprar
    So that eu possa efetuar e receber meu pedido

Background:
    Given eu estou na "página do carinho de compras"

Scenario: excluir um item do carrinho de compras
    And meu "carrinho de compras" tem o item "Combo 8: X-Burguer e Batata Média (Sem bebida)"
    And o campo "preço"  do item "Combo 8: X-Burguer e Batata Média (Sem bebida)" tem o valor "R$25,00"
    When eu seleciono "excluir" no item "Combo 8: X-Burguer e Batata Média (Sem bebida)"
    And eu seleciono "SIM" na "mensagem de confirmação"
    Then eu estou na "Página do carrinho de compras"
    And eu não vejo o item "Combo 8: X-Burguer e Batata Média (Sem bebida)"
    And vejo a imagem "imagem-carrinho-vazio.jpg"
    And eu vejo a mensagem "O carrinho de compras está vazio"

Scenario: editar a quantidade de itens no carrinho de compras
    And meu "carrinho de compras" tem o item "Água"
    And o campo "preço" tem o valor "R$4,50"
    And o campo "quantidade" tem o valor "1"
    When eu seleciono "+" no item "Água"
    Then eu estou na "página do carinho de compras"
    And o campo "preço" tem o valor "R$4,50"
    And "botão -" fica "selecionavel"
    And o campo "quantidade" tem o valor "2"
    
 Scenario: visualizar detalhes de um item no carrinho de compras
    And meu "carrinho de compras" tem o item "Pastel de carne"
    And o campo "preço" tem o valor "R$7,50"
    And o campo "quantidade" tem o valor "1"
    When eu clico no item "Pastel de carne"
    Then eu estou na "página dos detalhes do item pastel de carne"
    And o campo "preço" tem o valor "R$7,50"
    And o campo "foto" tem o valor "image-pastel-carne.jpg"