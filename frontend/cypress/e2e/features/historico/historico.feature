Feature: historico

  Scenario: User logs in with valid credentials
    Given o usuario esta na pagina "home" 
    When o usuario vai para a pagina "historico"
    Then o usuario recebe o historico de pedidos