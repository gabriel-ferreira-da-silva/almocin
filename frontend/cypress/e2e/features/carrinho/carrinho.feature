Feature: carrinho

  Scenario: exibir carrinho
    Given o usuario esta na pagina "home" 
    When o usuario vai para pagina "carrinho"
    Then o usuario recebe o carrinho
  
  Scenario: falha ao exibir carrinho
    Given usuario não validado esta na pagina de "login"
    Then o usuario recebe uma mensagem de erro de validação