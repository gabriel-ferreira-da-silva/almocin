Feature: Serviços de historico de pedidos
    As eu sou um cliente
    I want ver meu historico de pedidos
    So that eu possa ver todos os pedidos feitos

    
Scenario: Listar todos os pedidos de usuario
  Given o usuário com "userId"="1" esta cadastrado no sitema no sistema
  And repositorio contem os dados
    | id | userId | itemsId | status | 
    | "0"  |  "0"     | ["item-id-0","item-id-1"]   | "Concluded"|
    | "1"  |  "1"     | ["item-id-1","item-id-2","item-id-3"]   | "In Progress"|
    | "2"  |  "0"     | ["item-id-0","item-id-1","item-id-3"]   | "Canceled"|
    | "3"  |  "1"     | ["item-id-2","item-id-3"]   | "Concluded"|
    | "4"  |  "2"     | ["item-id-1","item-id-2"]   | "In Progress"|
  When o usuário faz uma requisição "GET" para o endpoint "/api/order/byUser/1"
  Then o status code da resposta é "200" 
  And o método retorna todos os itens :
    | id | userId | itemsId | status | 
    |1   | 1 | ["item-id-1","item-id-2","item-id-3"]   | "In Progress"|    
    | 3  |  1     | ["item-id-2","item-id-3"]   | "Concluded"|

Scenario: Listar todos os pedidos de usuario
  Given repositorio contem os dados
    | id | userId | itemsId | status | 
    | "0"  |  "0"     | ["item-id-0","item-id-1"]   | "Concluded"|
    | "1"  |  "1"     | ["item-id-1","item-id-2","item-id-3"]   | "In Progress"|
    | "2"  |  "0"     | ["item-id-0","item-id-1","item-id-3"]   | "Canceled"|
    | "3"  |  "1"     | ["item-id-2","item-id-3"]   | "Concluded"|
    | "4"  |  "2"     | ["item-id-1","item-id-2"]   | "In Progress"|
  When o usuário faz uma requisição "GET" para o endpoint "/api/order/byUser/1000"
  Then o status code da resposta é "401" 
  And A mensagem é enviada ao usuario
  """{
    message: 'not found'
  }
  """
