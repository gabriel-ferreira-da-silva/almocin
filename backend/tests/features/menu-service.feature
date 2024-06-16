Feature: Serviços de Cardápio

Background:
  Given no serviço "MenuService" têm os métodos "getItem", "getItems", "createItem", "deleteItem", "updateItem"
  And no repository "MenuRepository" há os itens:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 0  | "Coca-Cola" | 5.00 | "Geladinha" | "1" | "coca-cola.jpg" | 5 |
    | 1  | "Hamburguer" | 15.00 | "feito de carne" | "5" | "ham.jpg" | 10 |
    | 2  | "Batata Frita" | 10.00 | "Sem Oléo" | "4" | "bt.jpg" | 5 |
    | 3  | "Sorvete" | 7.00 | "Chocolate" | "5" | "ice-cream.jpg" | 5 |
    | 4  | "Cerveja" | 8.00 | "Cerveja gelada" | "1" | "cerveja.jpg" | 5 |
  And Existe um objeto "ItemMenu" com os atributos: "name", "price", "description", "category", "image", "timeToPrepare"

Scenario: Listar todos os itens
  Given o método "getItems" não há parâmetros
  And o método "getItems" retorna todos os itens de "MenuRepository" formatado, os quais são:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 0  | "Coca-Cola" | 5.00 | "Gelada" | "Bebidas" | "coca=cola.jpg" | 5 |
    | 1  | "Hamburguer" | 15.00 | "feito de carne" | "Sobremesas" | "ham.jpg" | 10 |
    | 2  | "Batata Frita" | 10.00 | "Sem Oléo" | "Aperitivos" | "bt.jpg" | 5 |
    | 3  | "Sorvete" | 7.00 | "Chocolate" | "Sobremesas" | "ice-cream.jpg" | 5 |
    | 4  | "Cerveja" | 8.00 | "Cerveja gelada" | "Bebidas" | "cerveja.jpg" | 5 |
  When eu chamo o método "getItems"
  Then o método "getItems" retorna os itens:
    | id | name | price | description | category | image | timeToPrepare |
    | 0  | "Coca-Cola" | 5.00 | "Gelada" | "Bebidas" | "coca=cola.jpg" | 5 |
    | 1  | "Hamburguer" | 15.00 | "feito de carne" | "Sobremesas" | "ham.jpg" | 10 |
    | 2  | "Batata Frita" | 10.00 | "Sem Oléo" | "Aperitivos" | "bt.jpg" | 5 |
    | 3  | "Sorvete" | 7.00 | "Chocolate" | "Sobremesas" | "ice-cream.jpg" | 5 |
    | 4  | "Cerveja" | 8.00 | "Cerveja gelada" | "Bebidas" | "cerveja.jpg" | 5 |

Scenario: Listar um item do cardápio
  Given o método "getItem" têm como parâmetros: "id"
  And o método "getItem" retorna um item formatado baseado no "id" espeficicado
  And para o "id" "1" o método "getItem" retorna o item:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 1  | "Hamburguer" | 15.00 | "feito de carne" | "Sobremesas" | "ham.jpg" | 10 |
  When eu chamo o método "getItem" com os parâmetros "id: '1'"
  Then o método "getItem" retorna o item:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 1  | "Hamburguer" | 15.00 | "feito de carne" | "Sobremesas" | "ham.jpg" | 10 |

Scenario: Criar um item no cardápio
  Given o método "createItem" têm como parâmetros "data: ItemMenu"
  And o método "createItem" retorna o item criado
  And para os parâmetros:
  """
    data: {
      name: 'Pizza',
      price: 20.00,
      description: 'Feita de queijo',
      category: "5",
      image: 'pizza.jpg',
      timeToPrepare: 15
    }
  """
  o método "createItem" retorna o item:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 5  | "Pizza" | 20.00 | "Feita de queijo" | "Sobremesas" | "pizza.jpg" | 15 |
  When eu chamo o método "createItem" com os parâmetros:
  """
    data: {
      name: 'Pizza',
      price: 20.00,
      description: 'Feita de queijo',
      category: "5",
      image: 'pizza.jpg',
      timeToPrepare: 15
    }
  """
  Then o método "createItem" retorna o item formatado:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 5  | "Pizza" | 20.00 | "Feita de queijo" | "Sobremesas" | "pizza.jpg" | 15 |
  
Scenario: Modificar um item do cardápio
  Given o método "updateItem" têm como parâmetros "id" e "data: ItemMenu"
  And o método "updateItem" retorna o item baseado no "id" e "data" especificado
  And para os parâmetros:
  """
    id: 1
    data: {
      name: 'Hamburguer',
      price: 20.00,
      description: 'feito de carne',
      category: "5",
      image: 'ham.jpg',
      timeToPrepare: 10
    }
  """
  o método "updateItem" retorna o item formatado:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 1  | "Hamburguer" | 20.00 | "feito de carne" | "Sobremesas" | "ham.jpg" | 10 |
  When eu chamo o método "updateItem" com os parâmetros:
  """
    id: 1
    data: {
      name: 'Hamburguer',
      price: 20.00,
      description: 'feito de carne',
      category: "5",
      image: 'ham.jpg',
      timeToPrepare: 10
    }
  """
  Then o método "updateItem" retorna o item formatado:
    | id | name | price | description | categoryID | image | timeToPrepare |
    | 1  | "Hamburguer" | 20.00 | "feito de carne" | "Sobremesas" | "ham.jpg" | 10 |

Scenario: Apagar um item do cardápio
  Given o método "deleteItem" têm como parâmetros "id"
  And o método "deleteItem" retorna nada
  When eu chamo o método "deleteItem" com os parâmetros "id: '1'"
  Then o item é apagado do "MenuRepository"
  And o método "deleteItem" retorna nada
