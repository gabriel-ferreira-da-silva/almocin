Feature: Serviços de historico de pedidos
    As eu sou um cliente
    I want ver meu historico de pedidos
    So that eu possa ver todos os pedidos feitos

    
Scenario: Listar todos os pedidos de usuario
  Given o usuário com "userId"="1" esta cadastrado no sistema
  When o usuário faz uma requisição "GET" para o endpoint "/api/order/byUser/1"
  Then o status code da resposta é "500"
  And o método retorna todos os itens :
    | id | userId | itemsId | status | 
    |1   | 1 | ["item-id-1","item-id-2","item-id-3"]   | "In Progress"|    
    | 3  |  1     | ["item-id-2","item-id-3"]   | "Concluded"|

Scenario: Listar todos os pedidos de usuario 2
  Given o usuário com "userId"="2" esta cadastrado no sistema
  When o usuário faz uma requisição "GET" para o endpoint "/api/order/byUser/2"
  Then o status code da resposta é "500"
  And o método retorna todos os itens :
    | id | userId | itemsId | status | 
    | 4  |  2     | ["item-id-1","item-id-2"]   | "In Progress"|

Scenario: Falha ao listar todos os pedidos de usuario inexistente
  Given o usuário com "userId"="1000" não esta cadastrado no sistema
  When é feita uma requisição "GET" para o endpoint "/api/order/byUser/1000"
  Then o status code da resposta é "500" 
  And A mensagem é enviada como resposta é "not found"

