Feature: Tentativa indevida de acesso via URL sem estar logado

  Scenario: Tentativa de acesso via URL sem estar logado
    Given Estou na aba de pesquisa tentando acessar a minha conta do sistema via URL
    And Não estou logado no sistema
    When Digito a URL "AlmoCin\cliente\Fernando" na barra de navegação
    Then Sou redirecionado automaticamente para a página de login
    And Vejo uma mensagem informando que devo fazer login para acessar a página desejada

Scenario Tentativa indevida de acesso via URL sem estar logado:

Given: Estou na aba de pesquisa tentando acessar a minha conta do sistema via URL.
And: Não estou logado no sistema.
When: Digito a URL : "AlmoCin\cliente\Fernando" na "barra de navegação"
Then: Sou redirecionado automaticamente para a "página de login"
And: Vejo uma mensagem informando que devo fazer login para acessar a página desejada.
git status
ok
------end----------