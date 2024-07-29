Feature: pedido

  Scenario: exibir pedido
    Given usuario esta na pagina "login" do site
    When usuario vai para a pagina "pedido"
    Then usuario recebe o historico de pedidos

  Scenario: falha ao exibir pedido
    Given usuario não validado esta na pagina "login" do site
    Then usuario recebe erro de validação