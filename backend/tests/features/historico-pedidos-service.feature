Feature: Serviços de historico de pedidos

Background:
  Given no serviço "pedidoService" têm os métodos "getPedidos" e "getUserPedidos"
  And no repository "pedidoRepository" há os itens:
    | id | userId | itemsId | status | 
    | 0  |  0     | [0,1]   | "entregue"|
    | 1  |  1     | [1,2,3]   | "em preparo"|
    | 2  |  0     | [0,1,3]   | "cancelado"|
    | 3  |  1     | [3,2]   | "entregue"|
    | 4  |  2     | [0,2]   | "em preparo"|
    
Scenario: Listar todos os pedidos
  Given o método "getPedidos" não há parâmetros
  And o método "getPedidos" retorna todos os itens de "pedidoRepository" formatado, os quais são:
    | id | userId | itemsId | status | 
    | 0  |  0     | [0,1]   | "entregue"|
    | 1  |  1     | [1,2,3]   | "em preparo"|
    | 2  |  0     | [0,1,3]   | "cancelado"|
    | 3  |  1     | [3,2]   | "entregue"|
    | 4  |  2     | [0,2]   | "entregue"|
  When o método "getPedidos" é chamado
  Then o método retorna todos os itens de "PedidoRepository" formatado:
    | id | userId | itemsId | status | 
    | 0  |  0     | [0,1]   | "entregue"|
    | 1  |  1     | [1,2,3]   | "em preparo"|
    | 2  |  0     | [0,1,3]   | "cancelado"|
    | 3  |  1     | [3,2]   | "entregue"|
    | 4  |  2     | [0,2]   | "entregue"|
  
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