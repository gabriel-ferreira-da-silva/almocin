Feature: Serviços de Categoria

Background:
  Given no serviço "CategoryService" têm os métodos "getCategory", "getCategories", "createCategory", "updateCategory" e "deleteCategory"
  And no repository "CategoryRepository" há os itens:
    | id | name | itemsId |
    | 0  | "Promoção" | [] |
    | 1  | "Bebidas" | [1, 4] |
    | 2  | "Vegetariano" | [] |
    | 3  | "Jantar" | [] |
    | 4  | "Aperitivos" | [1] |
    | 5  | "Sobremesas" | [1, 3] | 
  And no repository "MenuRepository" há os itens:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 0  | "Coca-Cola" | 5.00 | "Geladinha" | "1" | "coca-cola.jpg" | 5 |
    | 1  | "Hamburguer" | 15.00 | "feito de carne" | "5" | "ham.jpg" | 10 |
    | 2  | "Batata Frita" | 10.00 | "Sem Oléo" | "4" | "bt.jpg" | 5 |
    | 3  | "Sorvete" | 7.00 | "Chocolate" | "5" | "ice-cream.jpg" | 5 |
    | 4  | "Cerveja" | 8.00 | "Cerveja gelada" | "1" | "cerveja.jpg" | 5 |
  And Existe um objeto "Category" com os atributos:
    | name | itemsId |
  
Scenario: Listar todas as categorias
  Given o método "getCategories" não há parâmetros
  And o método "getCategories" retorna todos os itens de "CategoryRepository" formatado, os quais são:
    | id | name | items |
    | 0  | "Promoção" | [] |
    | 1  | "Bebidas" | [
      {"id": 0, "name": "Coca-Cola", "price": 5.00, "description": "Geladinha", "categoryID": 1, "image": "coca-cola.jpg", "timeToPrepare": 5}, {"id": 4, "name": "Cerveja", "price": 8.00, "description": "Cerveja gelada", "categoryID": 1, "image": "cerveja.jpg", "timeToPrepare": 5}
    ] |
    | 2 | "Vegetariano" | [] |
    | 3 | "Jantar" | [] |
    | 4 | "Aperitivos" | [
      {"id": 2, "name": "Batata Frita", "price": 10.00, "description": "Sem Oléo", "categoryID": 4, "image": "bt.jpg", "timeToPrepare": 5}
    ] |
    | 5 | "Sobremesas" | [
      {"id": 1, "name": "Hamburguer", "price": 15.00, "description": "feito de carne", "categoryID": 5, "image": "ham.jpg", "timeToPrepare": 10}, {"id": 3, "name": "Sorvete", "price": 7.00, "description": "Chocolate", "categoryID": 5, "image": "ice-cream.jpg", "timeToPrepare": 5}
    ] |
  When o método é chamado
  Then o método retorna todos os itens de "CategoryRepository" formatado:
    | id | name | items |
    | 0  | "Promoção" | [] |
    | 1  | "Bebidas" | [
      {"id": 0, "name": "Coca-Cola", "price": 5.00, "description": "Geladinha", "categoryID": 1, "image": "coca-cola.jpg", "timeToPrepare": 5}, {"id": 4, "name": "Cerveja", "price": 8.00, "description": "Cerveja gelada", "categoryID": 1, "image": "cerveja.jpg", "timeToPrepare": 5}
    ] |
    | 2 | "Vegetariano" | [] |
    | 3 | "Jantar" | [] |
    | 4 | "Aperitivos" | [
      {"id": 2, "name": "Batata Frita", "price": 10.00, "description": "Sem Oléo", "categoryID": 4, "image": "bt.jpg", "timeToPrepare": 5}
    ] |
    | 5 | "Sobremesas" | [
      {"id": 1, "name": "Hamburguer", "price": 15.00, "description": "feito de carne", "categoryID": 5, "image": "ham.jpg", "timeToPrepare": 10}, {"id": 3, "name": "Sorvete", "price": 7.00, "description": "Chocolate", "categoryID": 5, "image": "ice-cream.jpg", "timeToPrepare": 5}
    ] |

Scenario: Listar uma categoria
  Given o método "getCategory" têm como parâmetros o "id"
  And o método "getCategory" retorna um item formatado baseado no "id" especificado
  And para o "id: 1" o método "getItem" retorna o item:
    | id | name | items |
    | 1  | "Bebidas" | [
      {"id": 0, "name": "Coca-Cola", "price": 5.00, "description": "Geladinha", "categoryID": 1, "image": "coca-cola.jpg", "timeToPrepare": 5}, {"id": 4, "name": "Cerveja", "price": 8.00, "description": "Cerveja gelada", "categoryID": 1, "image": "cerveja.jpg", "timeToPrepare": 5}
    ] |
  When o método é chamado com o parâmetro "id: 1"
  Then o método retorna o item formatado:
    | id | name | items |
    | 1  | "Bebidas" | [
      {"id": 0, "name": "Coca-Cola", "price": 5.00, "description": "Geladinha", "categoryID": 1, "image": "coca-cola.jpg", "timeToPrepare": 5}, {"id": 4, "name": "Cerveja", "price": 8.00, "description": "Cerveja gelada", "categoryID": 1, "image": "cerveja.jpg", "timeToPrepare": 5}
    ] |
  
Scenario: Criar uma categoria
  Given o método "createCategory" têm como parâmetros "data: Category"
  And o método "createCategory" retorna o item formatado baseado no "Category" especificado
  And para os parâmetros:
  """
    data: {
      name: "Lanches",
      itemsId: []
    }
  """ 
  o método "createCategory" retorna o item:
    | name | itemsId |
    | "Lanches" | [] |
  When o método é chamado com o parâmetro 
  """
    data: {name: 'Lanches', itemsId: []}"
  """
  Then o método retorna o item formatado:
    | name | itemsId |
    | "Lanches" | [] |

Scenario: Modificar uma categoria
  Given o método "updateCategory" têm como parâmetros "id" e "data: Category"
  And o método "updateCategory" retorna o item formatado baseado no "id" e "Category" especificado
  And para os parâmetros:
  """
    id: 3
    data: {
      name: "Combo",
      itemsId: [0, 1 ,2]
    }
  """ 
  o método "updateCategory" retorna o item:
    | name | itemsId |
    | "Combo" | [{
      "id": 0, "name": "Coca-Cola", "price": 5.00, "description": "Geladinha", "categoryID": 1, "image": "coca-cola.jpg", "timeToPrepare": 5
    }, {
      "id": 1, "name": "Hamburguer", "price": 15.00, "description": "feito de carne", "categoryID": 5, "image": "ham.jpg", "timeToPrepare": 10
    }, {
      "id": 2, "name": "Batata Frita", "price": 10.00, "description": "Sem Oléo", "categoryID": 4, "image": "bt.jpg", "timeToPrepare": 5
    }] |
  When o método é chamado com o parâmetro 
  """
    id: 1
    data: {name: 'Combo', itemsId: [0, 1, 2]}"
  """
  Then o método retorna o item formatado:
    | name | itemsId |
    | "Combo" | [{
      "id": 0, "name": "Coca-Cola", "price": 5.00, "description": "Geladinha", "categoryID": 1, "image": "coca-cola.jpg", "timeToPrepare": 5
    }, {
      "id": 1, "name": "Hamburguer", "price": 15.00, "description": "feito de carne", "categoryID": 5, "image": "ham.jpg", "timeToPrepare": 10
    }, {
      "id": 2, "name": "Batata Frita", "price": 10.00, "description": "Sem Oléo", "categoryID": 4, "image": "bt.jpg", "timeToPrepare": 5
    }] |

Scenario: Deletar uma categoria
  Given o método "deleteCategory" têm como parâmetros "id"
  And o método "deleteCategory" retorna nada
  When o método é chamado com o parâmetro "id: 2"
  Then a categoria é apagada do "CategoryRepository"
  And o método retorna nada