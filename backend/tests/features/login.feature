Feature: Login

As um usuário
I Want fazer login, logout e recuperar a senha
So that eu possa acessar e gerenciar o sistema de forma segura

Background: Usuário tenta fazer login no sistema
Given o usuário fez login com email "admin@example.com" e senha "admin"

Scenario: Login com sucesso
When o usuário faz uma requisição "POST" para "/login" com os seguintes dados:
"""
{
  "email": "admin@example.com",
  "password": "admin"
}
"""
Then a resposta deve ser "200"
And o corpo da resposta deve ser:
"""
{
  "msg": "Login successful",
  "data": {
    "token": "session_token_value"
  }
}
"""
And um cookie "session_token" deve ser criado com o valor "session_token_value"

Scenario: Falha no login devido a senha incorreta
When o usuário faz uma requisição "POST" para "/login" com os seguintes dados:
"""
{
  "email": "admin@example.com",
  "password": "wrongPassword"
}
"""
Then a resposta deve ser "401"
And o corpo da resposta deve ser:
"""
{
  "msg": "Email ou senha inválidos"
}
"""
And o cookie "session_token" não deve ser criado

Scenario: Logout com sucesso
Given o usuário está autenticado
When o usuário faz uma requisição "POST" para "/login/logout"
Then a resposta deve ser "200"
And o corpo da resposta deve ser:
"""
{
  "msg": "Logout successful"
}
"""
And o cookie "session_token" deve ser removido

Scenario: Recuperação de senha com sucesso
When o usuário faz uma requisição "POST" para "/login/forgot-password" com os seguintes dados:
"""
{
  "email": "admin@example.com",
  "recoveryQuestion": "adminAnswer",
  "newPassword": "newAdminPassword"
}
"""
Then a resposta deve ser "200"
And o corpo da resposta deve ser:
"""
{
  "msg": "Password reset successful"
}
"""
And o usuário deve poder fazer login com "admin@example.com" e "newAdminPassword"

Scenario: Falha na recuperação de senha devido a email não registrado
When o usuário faz uma requisição "POST" para "/login/forgot-password" com os seguintes dados:
"""
{
  "email": "unknown@example.com",
  "recoveryQuestion": "lulu",
  "newPassword": "newPassword"
}
"""
Then a resposta deve ser "404"
And o corpo da resposta deve ser:
"""
{
  "msg": "Email não registrado"
}
"""
