Feature: Serviços de Login

Background:
  Given um serviço "LoginService" com os métodos "login", "resetPassword" e "getUserIdFromRequest"
  And um repository "UserRepository" com os métodos "findOneByEmail", "updateUser"
  And um objeto "User" com os atributos "id", "email", "password", "RecoveryQuestion"

Scenario: Login com sucesso
  Given um usuário com email "user@example.com" e senha "password"
  And o método "findOneByEmail" do repository retorna o usuário
  And a senha do usuário é "password"
  When eu chamo o método "login" com os parâmetros "email: 'user@example.com', password: 'password'"
  Then o método "login" retorna um token JWT válido

Scenario: Login com email inválido
  Given um usuário com email "user@example.com" e senha "password"
  And o método "findOneByEmail" do repository não retorna nenhum usuário
  When eu chamo o método "login" com os parâmetros "email: 'invalid@example.com', password: 'password'"
  Then o método "login" lança um erro "User not found or password incorrect"

Scenario: Login com senha incorreta
  Given um usuário com email "user@example.com" e senha "password"
  And o método "findOneByEmail" do repository retorna o usuário
  And a senha do usuário não é "password"
  When eu chamo o método "login" com os parâmetros "email: 'user@example.com', password: 'incorrect'"
  Then o método "login" lança um erro "User not found or password incorrect"

Scenario: Redefinir senha com sucesso
  Given um usuário com email "user@example.com" e RecoveryQuestion "Blue"
  And o método "findOneByEmail" do repository retorna o usuário
  And o RecoveryQuestion do usuário é "Blue"
  When eu chamo o método "resetPassword" com os parâmetros "email: 'user@example.com', RecoveryQuestion: 'Blue', newPassword: 'newPassword'"
  Then a senha do usuário é atualizada para "newPassword"

Scenario: Tentar redefinir senha com RecoveryQuestion inválido
  Given um usuário com email "user@example.com" e RecoveryQuestion "Blue"
  And o método "findOneByEmail" do repository retorna o usuário
  And o RecoveryQuestion do usuário não é "Blue"
  When eu chamo o método "resetPassword" com os parâmetros "email: 'user@example.com', RecoveryQuestion: 'Red', newPassword: 'newPassword'"
  Then o método "resetPassword" lança um erro "Invalid RecoveryQuestion"

Scenario: Tentar redefinir senha de usuário inexistente
  Given o método "findOneByEmail" do repository não retorna nenhum usuário
  When eu chamo o método "resetPassword" com os parâmetros "email: 'invalid@example.com', RecoveryQuestion: 'Blue', newPassword: 'newPassword'"
  Then o método "resetPassword" lança um erro "User not found"
