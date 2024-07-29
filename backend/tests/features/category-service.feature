Feature: Serviços de Categoria

Scenario: Listar todas as categorias
  Given  o método getCategories retorna todos os itens de CategoryRepository, os quais são:
    | id | name | itemsId |
    | 0  | Promoção | [] |
    | 1  | Bebidas | ["1","4"] |
    | 2  | Vegetariano | [] |
    | 3  | Jantar | [] |
    | 4  | Aperitivos | ["1"] |
    | 5  | Sobremesas | ["1","3"] |
  And no repository menuRepository há os itens:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 0  | Coca-cola | 5.00 | Geladinha | "1" | "coca-cola.jpg" | 5 |
    | 1  | Hamburguer | 15.00 | feito de carne | "5" | "ham.jpg" | 10 |
    | 2  | Batata Frita | 10.00 | Sem Oléo | "4" | "bt.jpg" | 5 |
    | 3  | Sorvete | 7.00 | Chocolate | "5" | "ice-cream.jpg" | 5 |
    | 4  | Cerveja | 8.00 | Cerveja gelada | "1" | "cerveja.jpg" | 5 |
  When eu chamo o método getCategories
  Then o menuRepository e CategoryRepository são acionados 
  And o método retorna todos os itens formatado:
    | id | name | items |
    | 0  | Promoção | [] |
    | 1  | Bebidas |  [{"id": "0", "name": "Coca-cola", "price": 5.00, "description": "Geladinha", "categoryID": "1", "image": "coca-cola.jpg", "timeToPrepare": 5}, {"id": "4", "name": "Cerveja", "price": 8.00, "description": "Cerveja gelada", "categoryID": "1", "image": "cerveja.jpg", "timeToPrepare": 5}] |
    | 2 | Vegetariano | [] |
    | 3 | Jantar | [] |
    | 4 | Aperitivos | [ {"id": "2", "name": "Batata Frita", "price": 10.00, "description": "Sem Oléo", "categoryID": "4", "image": "bt.jpg", "timeToPrepare": 5}] |
    | 5 | Sobremesas | [{"id": "1", "name": "Hamburguer", "price": 15.00, "description": "feito de carne", "categoryID": "5", "image": "ham.jpg", "timeToPrepare": 10}, {"id": "3", "name": "Sorvete", "price": 7.00, "description": "Chocolate", "categoryID": "5", "image": "ice-cream.jpg", "timeToPrepare": 5}] |

Scenario: Listar uma categoria
  Given o método getCategory retorna um item formatado baseado no id especificado e os itens são:
    | id | name | itemsId |
    | 0  | Promoção | [] |
    | 1  | Bebidas | ["1","4"] |
    | 2  | Vegetariano | [] |
    | 3  | Jantar | [] |
    | 4  | Aperitivos | ["1"] |
    | 5  | Sobremesas | ["1","3"] |
  And no repository menuRepository há os itens:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 0  | Coca-cola | 5.00 | Geladinha | 1 | "coca-cola.jpg" | 5 |
    | 1  | Hamburguer | 15.00 | feito de carne | 5 | "ham.jpg" | 10 |
    | 2  | Batata Frita | 10.00 | Sem Oléo | 4 | "bt.jpg" | 5 |
    | 3  | Sorvete | 7.00 | Chocolate | 5 | "ice-cream.jpg" | 5 |
    | 4  | Cerveja | 8.00 | Cerveja gelada | 1 | "cerveja.jpg" | 5 |
  When o método é chamado com o parâmetro id "1"
  Then o menuRepository e CategoryRepository são acionados
  And o método retorna o item formatado:
    | id | name | items |
    | 1  | Bebidas | [{"id": "0", "name": "Coca-cola", "price": 5.00, "description": "Geladinha", "categoryID": "1", "image": "coca-cola.jpg", "timeToPrepare": "5"}, {"id": "4", "name": "Cerveja", "price": 8.00, "description": "Cerveja gelada", "categoryID": "1", "image": "cerveja.jpg", "timeToPrepare": "5"}] |
  
Scenario: Criar uma categoria
  Given  o método createCategory retorna o item que foi enviado
  And o categoryRepository há os itens:
    | id | name | itemsId |
    | 0  | Promoção | [] |
    | 1  | Bebidas | ["1","4"] |
    | 2  | Vegetariano | [] |
    | 3  | Jantar | [] |
    | 4  | Aperitivos | ["1"] |
    | 5  | Sobremesas | ["1","3"] |
  When o método é chamado com o parâmetro 
  """
  {
    "name": "Lanches"
  }
  """
  Then o método retorna: "Categoria Lanches criada com sucesso."

Scenario: Modificar uma categoria
  Given o método updateCategory retorna o item formatado baseado no id e dados especificados e o CategoryRepository retorna os itens:
    | id | name | itemsId |
    | 0  | Promoção | [] |
    | 1  | Bebidas | ["1","4"] |
    | 2  | Vegetariano | [] |
    | 3  | Jantar | [] |
    | 4  | Aperitivos | ["1"] |
    | 5  | Sobremesas | ["1","3"] |
  When o método é chamado com o parâmetro 
  """
  {
    "id": "2",
    "data": {
      "name": "Combo"
    }
  }
  """
  Then o método retorna a mensagem "Categoria Combo atualizada com sucesso." 
  And o CategoryRepository e MenuRepository foram acionados.

Scenario: Apagar uma categoria
  Given o método deleteCategory retorna o nome do item apagado, os itens são:
    | id | name | itemsId |
    | "0"| Promoção | [] |
    | "1"| Bebidas | ["1","4"] |
    | "2"| Vegetariano | [] |
    | "3"| Jantar | [] |
    | "4"| Aperitivos | ["1"] |
    | "5"| Sobremesas | ["1","3"] |
  And no repository menuRepository há os itens:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 0  | Coca-cola | 5.00 | Geladinha | 1 | "coca-cola.jpg" | 5 |
    | 1  | Hamburguer | 15.00 | feito de carne | 5 | "ham.jpg" | 10 |
    | 2  | Batata Frita | 10.00 | Sem Oléo | 4 | "bt.jpg" | 5 |
    | 3  | Sorvete | 7.00 | Chocolate | 5 | "ice-cream.jpg" | 5 |
    | 4  | Cerveja | 8.00 | Cerveja gelada | 1 | "cerveja.jpg" | 5 |
  When o método é chamado com o parâmetro id "2"
  Then a categoria é apagada do CategoryRepository e retorna o nome "Vegetariano"

Scenario: Tentar apagar apagar uma categoria com itens
  Given o método deleteCategory retorna o nome do item apagado, e os itens são:
    | id | name | itemsId |
    | 0  | Promoção | [] |
    | 1  | Bebidas | ["1","4"] |
    | 2  | Vegetariano | [] |
    | 3  | Jantar | [] |
    | 4  | Aperitivos | ["1"] |
    | 5  | Sobremesas | ["1","3"] |
  And no repository menuRepository há os itens:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 0  | Coca-cola | 5.00 | Geladinha | 1 | "coca-cola.jpg" | 5 |
    | 1  | Hamburguer | 15.00 | feito de carne | 5 | "ham.jpg" | 10 |
    | 2  | Batata Frita | 10.00 | Sem Oléo | 4 | "bt.jpg" | 5 |
    | 3  | Sorvete | 7.00 | Chocolate | 5 | "ice-cream.jpg" | 5 |
    | 4  | Cerveja | 8.00 | Cerveja gelada | 1 | "cerveja.jpg" | 5 |
  When o método é chamado com o parâmetro id "1"
  Then a categoria não é apagada do CategoryRepository
  And o método retorna uma mensagem "Não é possível deletar pois há itens associados."

Scenario: Tentar criar uma cateogria com nome já existente
  Given o método createCategory retorna o item que foi enviado
  And o CategoryRepository retorna os itens:
    | id | name | itemsId |
    | 0  | Promoção | [] |
    | 1  | Bebidas | ["1","4"] |
    | 2  | Vegetariano | [] |
    | 3  | Jantar | [] |
    | 4  | Aperitivos | ["1"] |
    | 5  | Sobremesas | ["1","3"] |
  When o método é chamado com o parâmetro 
  """
  {
    "name": "Bebidas"
  }
  """
  Then o método retorna uma mensagem "Categoria já existente."
  And o CategoryRepository não é acionado

Scenario: Tentar modificar uma categoria com nome já existente
  Given o método updateCategory retorna o item formatado baseado no id e dados especificados
  And o CategoryRepository retorna os itens:
    | id | name | itemsId |
    | 0  | Promoção | [] |
    | 1  | Bebidas | ["1","4"] |
    | 2  | Vegetariano | [] |
    | 3  | Jantar | [] |
    | 4  | Aperitivos | ["1"] |
    | 5  | Sobremesas | ["1","3"] |
  When o método é chamado com o parâmetro 
  """
  {
    "id": "2",
    "data": {
      "name": "Bebidas", "itemsId": []
    }
  }
  """
  Then o método retorna uma mensagem "Categoria já existente."