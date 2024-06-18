Feature: Serviços de historico de pedidos
    As eu sou um cliente
    I want ver meu historico de pedidos
    So that eu possa ver todos os pedidos feitos

    
Scenario: Listar todos os pedidos de usuario
  Given o usuário com "userId"="1" esta cadastrado no sitema no sistema
  When o usuário faz uma requisição "GET" para o endpoint "/api/order/byUser/1"
  Then o status code da resposta é "200" 
  And o método retorna todos os itens :
    | id | userId | itemsId | status | 
    |1   | 1 | ["item-id-1","item-id-2","item-id-3"]   | "In Progress"|    
    | 3  |  1     | ["item-id-2","item-id-3"]   | "Concluded"|

