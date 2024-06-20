Feature: Serviços de Cardápio

Scenario: Listar todos os itens
  Given o método getItems não há parâmetros e retorna todos os itens de MenuRepository formatado, os quais são:
    | name | price | description | categoryID | image | timeToPrepare |
    | "Coca-Cola" | 5.00 | "Gelada" | "1" | "coca-cola.jpg" | 5 |
    | "Hamburguer" | 15.00 | "feito de carne" | "2" | "ham.jpg" | 10 |
    | "Batata Frita" | 10.00 | "Sem Oléo" | "3" | "bt.jpg" | 5 |
    | "Sorvete" | 7.00 | "Chocolate" | "2" | "ice-cream.jpg" | 5 |
    | "Cerveja" | 8.00 | "Cerveja gelada" | "1" | "cerveja.jpg" | 5 |
  And no repository CategoryRepository há as categorias:
    | id | name |
    | "1" | "Bebidas" |
    | "2" | "Sobremesas" |
    | "3" | "Aperitivos" |
    | "4" | "Pratos" |
    | "5" | "Lanches" |
  When eu chamo o método getItems
  Then o método getItems retorna os itens:
    | name | price | description | category | image | timeToPrepare |
    | "Coca-Cola" | 5.00 | "Gelada" | "Bebidas" | "coca-cola.jpg" | 5 |
    | "Hamburguer" | 15.00 | "feito de carne" | "Sobremesas" | "ham.jpg" | 10 |
    | "Batata Frita" | 10.00 | "Sem Oléo" | "Aperitivos" | "bt.jpg" | 5 |
    | "Sorvete" | 7.00 | "Chocolate" | "Sobremesas" | "ice-cream.jpg" | 5 |
    | "Cerveja" | 8.00 | "Cerveja gelada" | "Bebidas" | "cerveja.jpg" | 5 |

Scenario: Listar um item do cardápio
  Given o método getItem retorna um item formatado baseado no id especificado e os itens de MenuRepository são:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | "1" | "Coca-Cola" | 5.00 | "Gelada" | "1" | "coca-cola.jpg" | 5 |
    | "2" | "Hamburguer" | 15.00 | "feito de carne" | "2" | "ham.jpg" | 10 |
    | "3" | "Batata Frita" | 10.00 | "Sem Oléo" | "3" | "bt.jpg" | 5 |
    | "4" | "Sorvete" | 7.00 | "Chocolate" | "2" | "ice-cream.jpg" | 5 |
    | "5" | "Cerveja" | 8.00 | "Cerveja gelada" | "1" | "cerveja.jpg" | 5 |
  And no repository CategoryRepository há as categorias:
    | id | name |
    | "1" | "Bebidas" |
    | "2" | "Sobremesas" |
    | "3" | "Aperitivos" |
    | "4" | "Pratos" |
    | "5" | "Lanches" |
  When eu chamo o método getItem com os parâmetros "2"
  Then o método getItem retorna o item:
    | name | price | description | category | image | timeToPrepare |
    | "Hamburguer" | 15.00 | "feito de carne" | "Sobremesas" | "ham.jpg" | 10 |

Scenario: Criar um item no cardápio
  Given o método createItem retorna o item criado
  And no repository CategoryRepository há as categorias:
    | id | name |
    | 1 | Bebidas |
    | 2 | Sobremesas |
    | 3 | Aperitivos |
    | 4 | Pratos |
    | 5 | Lanches |
  When eu chamo o método createItem com os parâmetros:
    """
    {
      "name": "Pizza",
      "price": 20.00,
      "description": "Feita de queijo",
      "categoryID": "2",
      "image": "pizza.jpg",
      "timeToPrepare": 15
    }
    """
  Then o método createItem retorna o item formatado:
    | name | price | description | category | image | timeToPrepare |
    | Pizza | 20 | Feita de queijo | Sobremesas | pizza.jpg | 15 |
  
Scenario: Modificar um item do cardápio
  Given o método updateItem retorna o item baseado no id e data especificado e os itens de MenuRepository são:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 1 | "Coca-Cola" | 5.00 | "Gelada" | "1" | "coca-cola.jpg" | 5 |
    | 2 | "Hamburguer" | 15.00 | "feito de carne" | "2" | "ham.jpg" | 10 |
    | 3 | "Batata Frita" | 10.00 | "Sem Oléo" | "3" | "bt.jpg" | 5 |
    | 4 | "Sorvete" | 7.00 | "Chocolate" | "2" | "ice-cream.jpg" | 5 |
    | 5 | "Cerveja" | 8.00 | "Cerveja gelada" | "1" | "cerveja.jpg" | 5 |
  And no repository CategoryRepository há as categorias:
    | id | name |
    | 1 | Bebidas |
    | 2 | Sobremesas |
    | 3 | Aperitivos |
    | 4 | Pratos |
    | 5 | Lanches |
  When eu chamo o método updateItem com os parâmetros:
  """
  {
    "id": 2,
    "data": {
      "name": "Pizza",
      "price": 20.00,
      "description": "Feita de queijo",
      "categoryID": "5",
      "image": "pizza.jpg",
      "timeToPrepare": 15
    }
  }
  """
  Then o método updateItem retorna o item formatado:
    | name | price | description | category | image | timeToPrepare |
    | Pizza | 20 | Feita de queijo | Lanches | pizza.jpg | 15 |

Scenario: Apagar um item do cardápio
  Given o método deleteItem retorna o nome do item apagado e os itens de MenuRepository são:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 1 | "Coca-Cola" | 5.00 | "Gelada" | "1" | "coca-cola.jpg" | 5 |
    | 2 | "Hamburguer" | 15.00 | "feito de carne" | "2" | "ham.jpg" | 10 |
    | 3 | "Batata Frita" | 10.00 | "Sem Oléo" | "3" | "bt.jpg" | 5 |
    | 4 | "Sorvete" | 7.00 | "Chocolate" | "2" | "ice-cream.jpg" | 5 |
    | 5 | "Cerveja" | 8.00 | "Cerveja gelada" | "1" | "cerveja.jpg" | 5 |
  When eu chamo o método deleteItem com os parâmetros "2"
  Then o item é apagado do MenuRepository e os itens de MenuRepository são:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 1 | "Coca-Cola" | 5.00 | "Gelada" | "1" | "coca-cola.jpg" | 5 |
    | 3 | "Batata Frita" | 10.00 | "Sem Oléo" | "3" | "bt.jpg" | 5 |
    | 4 | "Sorvete" | 7.00 | "Chocolate" | "2" | "ice-cream.jpg" | 5 |
    | 5 | "Cerveja" | 8.00 | "Cerveja gelada" | "1" | "cerveja.jpg" | 5 |
  And o método deleteItem retorna "Hamburguer"

Scenario: Tentar apagar um item que não existe
  Given o método deleteItem retorna o nome do item apagado, não há itens no repositório
  When eu chamo o método deleteItem com os parâmetros "2"
  Then nenhum item é apagado do MenuRepository
  And o método deleteItem retorna "Item não encontrado no cardápio"

Scenario: Tentar atualizar item com id inexistente
  Given o método updateItem retorna o item baseado no id e data especificado
  When eu chamo o método updateItem com os parâmetros:
  """
  {
    "id": 10,
    "data": {
      "name": "Pizza",
      "price": null,
      "description": "Feita de queijo",
      "categoryID": "5",
      "image": "pizza.jpg",
      "timeToPrepare": 15
    }
  }
  """
  Then o método updateItem retorna a mensagem "Item não encontrado no cardápio"
  And nenhum item é atualizado no MenuRepository

Scenario: Tentar adicionar item existente
  Given o método createItem retorna o item criado e os itens de MenuRepository são:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 1 | Coca-Cola | 5.00 | "Gelada" | "1" | "coca-cola.jpg" | 5 |
    | 2 | Hamburguer | 15.00 | "feito de carne" | "2" | "ham.jpg" | 10 |
    | 3 | Batata Frita | 10.00 | "Sem Oléo" | "3" | "bt.jpg" | 5 |
    | 4 | Sorvete | 7.00 | "Chocolate" | "2" | "ice-cream.jpg" | 5 |
    | 5 | Cerveja | 8.00 | "Cerveja gelada" | "1" | "cerveja.jpg" | 5 |
  When eu chamo o método createItem com os parâmetros:
  """
  {
    "name": "Coca-Cola",
    "price": 5.00,
    "description": "Geladinha",
    "categoryID": "1",
    "image": "coca-cola.jpg",
    "timeToPrepare": 5
  }
  """
  Then o método createItem retorna a mensagem "Item Coca-Cola já existe no cardápio"
  And nenhum item é criado no MenuRepository