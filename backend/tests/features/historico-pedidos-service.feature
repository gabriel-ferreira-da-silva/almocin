Feature: Serviços de historico de pedidos

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
    | id   | userId   | itemsId | status | 
    | "0"  |  "0"     | ["item-id-0","item-id-1"]   | "Concluded"|
    | "1"  |  "1"     | ["item-id-1","item-id-2","item-id-3"]   | "In Progress"|
    | "2"  |  "0"     | ["item-id-0","item-id-1","item-id-3"]   | "Canceled"|
    | "3"  |  "1"     | ["item-id-2","item-id-3"]   | "Concluded"|
    | "4"  |  "2"     | ["item-id-1","item-id-2"]   | "In Progress"|


Scenario: erro ao listar todos os pedidos de usuario
  Given o método "getOrdersByUserId" recebe o parametro "userId"="1000"
  And o método getOrdersByUserId retorna todos os itens de ordersRepository onde o campo userId="1"
  When o método getOrdersByUserId com parametro userId="1000" é chamado
  Then o método retorna um erro com messagem "not found"