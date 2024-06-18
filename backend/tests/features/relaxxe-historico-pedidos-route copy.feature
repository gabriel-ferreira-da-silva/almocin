Feature: Serviços de historico de pedidos
    As eu sou um cliente
    I want ver meu historico de pedidos
    So that eu possa ver todos os pedidos feitos

Background:
  Given no serviço "pedidoService" têm os métodos "getPedidos" e "getUserPedidos"
  And no repository "pedidoRepository" há os itens:
    | id | userId | itemsId | status | 
    | "0"  |  "0"     | ["item-id-0","item-id-1"]   | "Concluded"|
    | "1"  |  "1"     | ["item-id-1","item-id-2","item-id-3"]   | "In Progress"|
    | "2"  |  "0"     | ["item-id-0","item-id-1","item-id-3"]   | "Canceled"|
    | "3"  |  "1"     | ["item-id-2","item-id-3"]   | "Concluded"|
    | "4"  |  "2"     | ["item-id-1","item-id-2"]   | "In Progress"|
    
Scenario: Listar todos os pedidos de usuario
  Given o usuário com "userId"="1" esta logado no sistema
  When o usuário faz uma requisição "GET" para o endpoint "/order/byUser/1"
  Then o status code da resposta é "200" 
  And o método retorna todos os itens :
    | id | userId | itemsId | status | 
    | "1"  |  "1"     | ["item-id-1","item-id-2","item-id-3"]   | "In Progress"|    
    | "3"  |  "1"     | ["item-id-2","item-id-3"]   | "Concluded"|
