Feature: historico

  Scenario: exibir historico
    Given o usuario esta na pagina "home" 
    When o usuario vai para a pagina "historico"
    Then o usuario recebe o historico de pedidos

  Scenario: falha ao exibir historico
    Given o usuario não validado esta na pagina "login"
    Then o usuario recebe uma mensagem de erro de validação