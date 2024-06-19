Feature: Registro

  As um usuário
  I Want registrar informações pessoais
  So that eu possa acessar e gerenciar minha conta

Background: Usuário tenta se registrar no sistema
Given o usuário deseja se registrar com nome "João", email "joao@example.com", gênero "Masculino", método de pagamento "Cartão de Crédito", CPF "123.456.789-10", CEP "12345-678", senha "senhaSegura", e resposta à pergunta de recuperação "lulu"

Scenario: Registro com sucesso
When o usuário faz uma requisição "POST" para "/register" com os seguintes dados:
"""
{
  "name": "João",
  "email": "joao@example.com",
  "gender": "Masculino",
  "paymentMethod": "Cartão de Crédito",
  "cpf": "123.456.789-10",
  "cep": "12345-678",
  "password": "senhaSegura",
  "recoveryQuestion": "lulu"
}
"""
Then a resposta deve ser "201"
And o corpo da resposta deve ser:
"""
{
  "msg": "User created successfully",
  "data": {
    "id": "id_do_usuario",
    "name": "João",
    "email": "joao@example.com",
    "gender": "Masculino",
    "paymentMethod": "Cartão de Crédito",
    "cpf": "123.456.789-10",
    "cep": "12345-678",
    "recoveryQuestion": "lulu"
  }
}
"""

Scenario: Falha no registro devido a campos inválidos
When o usuário faz uma requisição "POST" para "/register" com os seguintes dados:
"""
{
  "name": "",
  "email": "emailinvalido",
  "gender": "Desconhecido",
  "paymentMethod": "Cartão de Crédito",
  "cpf": "cpf_invalido",
  "cep": "cep_invalido",
  "password": "123",
  "recoveryQuestion": ""
}
"""
Then a resposta deve ser "400"
And o corpo da resposta deve ser:
"""
{
  "msg": "All fields are required"
}
"""
Scenario: Falha no registro devido a email já registrado
Given um usuário com email "joao@example.com" já está registrado
When o usuário faz uma requisição "POST" para "/register" com o seguinte dado:
"""
{
  "name": "João",
  "email": "joao@example.com",
  "gender": "Masculino",
  "paymentMethod": "Cartão de Crédito",
  "cpf": "123.456.789-10",
  "cep": "12345-678",
  "password": "senhaSegura",
  "recoveryQuestion": "lulu"
}
"""
Then a resposta deve ser "400"
And o corpo da resposta deve ser:
"""
{
  "msg": "User with this email already exists"
}
"""
