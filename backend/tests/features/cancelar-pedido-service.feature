Feature: Serviços de cancelar-pedido

Background:
  Given no serviço "pedidoService" têm os métodos  "updatePedido"
  And no repository "PedidoRepository" há os itens:
    | id | userId | itemsId | status | 
    | 0  |  0     | [0,1]   | "entregue"|
    | 1  |  1     | [1,2,3]   | "em preparo"|
    | 2  |  0     | [0,1,3]   | "cancelado por usuario"|
    | 3  |  1     | [3,2]   | "entregue"|
    | 4  |  2     | [0,2]   | "em preparo"|


Scenario: Update status de pedido para cancelado por usuario
  Given o método "updatePedido" com parametros "id" 
  And o método "updadatePedido" altera o pedido de id="id" no repositorio "PedidoRepositorio"
  When o método "updadetePedido" com parametro "id"="1" envia um requisão com valores
    | id | userId | itemsId | status | 
    | 1  |  1     | [1,2,3]   | "cancelado por usuario"|
  Then o repositorio "pedidoRepository" é alterado para
    | id | userId | itemsId | status | 
    | 0  |  0     | [0,1]   | "entregue"|
    | 1  |  1     | [1,2,3]   | "cancelado por usuario"|
    | 2  |  0     | [0,1,3]   | "cancelado por usuario"|
    | 3  |  1     | [3,2]   | "entregue"|
    | 4  |  2     | [0,2]   | "em preparo"|
  
  Scenario: Update status de pedido para cancelado por atraso
  Given o método "updatePedido" com parametros "id" 
  And o método "updadatePedido" altera o pedido de id="id" no repositorio "PedidoRepositorio"
  When o método "updadetePedido" com parametro "id"="4" envia um requisão com valores
    | id | userId | itemsId | status | 
    | 4  |  2     | [0,2]   | "cancelado por atraso"|
  Then o repositorio "pedidoRepository" é alterado para
    | id | userId | itemsId | status | 
    | 0  |  0     | [0,1]   | "entregue"|
    | 1  |  1     | [1,2,3]   | "cancelado por usuario"|
    | 2  |  0     | [0,1,3]   | "cancelado por usuario"|
    | 3  |  1     | [3,2]   | "entregue"|
    | 4  |  2     | [0,2]   | "cancelado por atraso"|


  Scenario: Falha no update de pedido
  Given o método "updatePedido" com parametros "id" 
  And o método "updadatePedido" altera o pedido de id="id" no repositorio "PedidoRepositorio"
  When o método "updadetePedido" com parametro "id"="100000" envia um requisão com valores
    | id | userId | itemsId | status | 
    | 10000  |  2     | [0,2]   | "cancelado por atraso"|
  Then o repositorio "pedidoRepository" não é alterado
    | id | userId | itemsId | status | 
    | 0  |  0     | [0,1]   | "entregue"|
    | 1  |  1     | [1,2,3]   | "cancelado por usuario"|
    | 2  |  0     | [0,1,3]   | "cancelado por usuario"|
    | 3  |  1     | [3,2]   | "entregue"|
    | 4  |  2     | [0,2]   | "cancelado por atraso"|
  And a mensagem:
  "{
    message: user 1000 não foi encontrado
  }"
  é enviada para o requisidor