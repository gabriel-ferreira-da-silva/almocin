Feature: Calcular o tempo de entrega
    As eu sou um cliente
    I want ver qual o tempo estimado de entrega do meu pedido
    So that eu possa saber em quanto tempo o meu pedido será entregue
    
Scenario: visualizar o tempo de entrega
    Given eu estou na "página do carrinho de compras"
    And meu "carrinho de compras" tem o item "Água"
    And o campo "preço" do item "Água" tem o valor "R$4,50"
    And meu "carrinho de compras" tem o item "Milk-Shake P (Ovomaltine)"
    And o campo "preço" do item "Milk-Shake P (Ovomaltine)" tem o valor "R$9,00"
    When eu seleciono o campo "CEP"
    And eu digito o valor "12345-678"
    And eu seleciono o "botão de confirmação"
    Then eu estou na "página do carrinho de compras"
    And meu "carrinho de compras" tem o item "Água"
    And o campo "preço" do item "Água" tem o valor "R$4,50"
    And meu "carrinho de compras" tem o item "Milk-Shake P (Ovomaltine)"
    And o campo "preço" do item "Milk-Shake P (Ovomaltine)" tem o valor "R$9,00"
    And o campo "total" tem o valor "R$13,50"
    And o campo "tempo de entrega" tem o valor "20 minutos" 