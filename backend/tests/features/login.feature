Feature: Tentativa indevida de acesso via URL sem estar logado

  Scenario: Tentativa de acesso via URL sem estar logado
    Given Estou na aba de pesquisa tentando acessar a minha conta do sistema via URL
    And Não estou logado no sistema
    When Digito a URL "AlmoCin\cliente\Fernando" na barra de navegação
    Then Sou redirecionado automaticamente para a página de login
    And Vejo uma mensagem informando que devo fazer login para acessar a página desejada

Scenario: Logout do Sistema
  Given Existe um cliente com login "Joao65@gmail.com" e sessão ativa
  When O sistema recebe uma requisição de "POST" para "user/logout"
  Then O sistema limpa quaisquer tokens de autenticação ou cookies associados à sessão do usuário
  And O sistema retorna uma resposta 200 OK confirmando que o logout foi bem-sucedido.



