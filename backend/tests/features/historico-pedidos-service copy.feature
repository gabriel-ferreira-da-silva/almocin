Feature: Serviços de historico de pedidos

Background:
  Given no serviço "pedidoService" têm os métodos "getPedidos" e "getUserPedidos"
  And no repository "pedidoRepository" há os itens:
    | id | userId | itemsId | status | 
    | "0"  |  "0"     | ["item-id-0","item-id-1"]   | "Concluded"|
    | "1"  |  "1"     | ["item-id-1","item-id-2","item-id-3"]   | "In Progress"|
    | "2"  |  "0"     | ["item-id-0","item-id-1","item-id-3"]   | "Canceled"|
    | "3"  |  "1"     | ["item-id-2","item-id-3"]   | "Concluded"|
    | "4"  |  "2"     | ["item-id-1","item-id-2"]   | "In Progress"|
    
Scenario: Listar todos os pedidos
  Given o método "getOrder" não há parâmetros
  And o método "getOrders" retorna todos os itens de "OrdersRepository" formatado, os quais são:
    | id | userId | itemsId | status | 
    | "0"  |  "0"     | ["item-id-0","item-id-1"]   | "Concluded"|
    | "1"  |  "1"     | ["item-id-1","item-id-2","item-id-3"]   | "In Progress"|
    | "2"  |  "0"     | ["item-id-0","item-id-1","item-id-3"]   | "Canceled"|
    | "3"  |  "1"     | ["item-id-2","item-id-3"]   | "Concluded"|
    | "4"  |  "2"     | ["item-id-1","item-id-2"]   | "In Progress"|
  When o método "getOrders" é chamado
  Then o método retorna todos os itens de "OrdersRepository" formatado:
    | id | userId | itemsId | status | 
    | "0"  |  "0"     | ["item-id-0","item-id-1"]   | "Concluded"|
    | "1"  |  "1"     | ["item-id-1","item-id-2","item-id-3"]   | "In Progress"|
    | "2"  |  "0"     | ["item-id-0","item-id-1","item-id-3"]   | "Canceled"|
    | "3"  |  "1"     | ["item-id-2","item-id-3"]   | "Concluded"|
    | "4"  |  "2"     | ["item-id-1","item-id-2"]   | "In Progress"|
  
Scenario: Listar todos os pedidos de usuario
  Given o método "getUserPedidos" recebe o parametro "userId"="1"
  And o método "getUserPedidos" retorna todos os itens de "pedidoRepository" onde o campo "userId"="1"
  When o método "getUserPedidos" com parametro "userId"="1" é chamado
  Then o método retorna todos os itens :
    | id | userId | itemsId | status | 
    | 1  |  1     | [1,2,3]   | "em preparo"|
    | 3  |  1     | [3,2]   | "entregue"|
  
  Scenario: Erro ao listar pedidos de usuario
    Given o método "getUserPedidos" recebe o parametro "userId"="1000"
    And não existe usuário com "userId"="1000"
    When o método "getUserPedidos" com parametro "userId"="1000" é chamado
    Then uma mensagem:
      "{
      message: usuario nao encontrado
      }"
    é enviada para o requisidor