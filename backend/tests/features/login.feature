Feature: Tentativa indevida de acesso via URL sem estar logado

  Scenario: Tentativa de acesso via URL sem estar logado
    Given Estou na aba de pesquisa tentando acessar a minha conta do sistema via URL
    And Não estou logado no sistema
    When Digito a URL "AlmoCin\cliente\Fernando" na barra de navegação
    Then Sou redirecionado automaticamente para a página de login
    And Vejo uma mensagem informando que devo fazer login para acessar a página desejada


Feature: Logout

Scenario: Logout do Sistema
  Given Existe um cliente com login "Joao65@gmail.com" e sessão ativa
  When O sistema recebe uma requisição de "POST" para "user/logout"
  Then O sistema limpa quaisquer tokens de autenticação ou cookies associados à sessão do usuário
  And O sistema retorna uma resposta 200 OK confirmando que o logout foi bem-sucedido.

Feature: Wrong login 

Scenario: Login mal-sucedido devido a senha incorreta
  Given estou na página de login/cadastro e a senha correta é "asenha123"
  When preencho o campo de nome com "talpessoa"
  And preencho o campo de senha com "senhaerrada123"
  And clico no botão de login
  Then vejo uma mensagem de erro indicando que a senha está incorreta
  And permaneço na página de login/cadastro

Scenario: Login mal-sucedido devido a nome de usuário incorreto
  Given estou na página de login e o nome de usuário correto é "talpessoa"
  When preencho o campo de nome com "usuariodefeito"
  And preencho o campo de senha com "asenha123"
  And clico no botão de login
  Then vejo uma mensagem de erro indicando que o nome de usuário está incorreto
  And A mensagem some
  And permaneço na página de login



Scenario: Login mal-sucedido devido a formato de email incorreto
  Given estou na página de login
  When preencho o campo de nome com "usuario@incorreto"
  And preencho o campo de senha com "asenha123"
  And entro no modo login
  Then vejo uma mensagem de erro indicando que o formato do email está incorreto
  And permaneço na página de login





