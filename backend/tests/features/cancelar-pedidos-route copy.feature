Feature: Cancelar pedidos 
    As eu sou um cliente
    I want alterar status do pedido para cancelado
    So that cancelar um pedido

    
Scenario: Cancelar pedido com sucesso
  Given o usuário com "userId"="1" esta cadastrado no sitema no sistema
  And repositorio contem os dados
    | id | userId | itemsId | status | 
    | "0"  |  "0"     | ["item-id-0","item-id-1"]   | "Concluded"|
    | "1"  |  "1"     | ["item-id-1","item-id-2","item-id-3"]   | "In Progress"|
    | "2"  |  "0"     | ["item-id-0","item-id-1","item-id-3"]   | "Canceled"|
    | "3"  |  "1"     | ["item-id-2","item-id-3"]   | "Concluded"|
    | "4"  |  "2"     | ["item-id-1","item-id-2"]   | "In Progress"|
  When o usuário faz uma requisição "PUT" para o endpoint "/api/order/1"
  And o corpo enviado é:
  "{
    status: 'canceled'
  }"
  Then o status code da resposta é "200" 
  And o método retorna todos os itens:
  And repositorio é alterado para
    | id | userId | itemsId | status | 
    | "0"  |  "0"     | ["item-id-0","item-id-1"]   | "Concluded"|
    | "1"  |  "1"     | ["item-id-1","item-id-2","item-id-3"]   | "Canceled"|
    | "2"  |  "0"     | ["item-id-0","item-id-1","item-id-3"]   | "Canceled"|
    | "3"  |  "1"     | ["item-id-2","item-id-3"]   | "Concluded"|
    | "4"  |  "2"     | ["item-id-1","item-id-2"]   | "In Progress"|
  

Scenario: falha ao cancelar pedido
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
