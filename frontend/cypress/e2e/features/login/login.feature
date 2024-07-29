Feature: Login functionality

  Scenario: User logs in with valid credentials
    Given o usuário está logado com o email "admin@example.com" e senha "password123"
    When Eu crio uma categoria com o nome "New Category"
    Then Eu vejo a categoria com o nome "New Category" na lista de categorias
