Feature: Categorias

As um usuário com permissão para manipular Categorias
I want criar, atualizar e deletar Categorias
So that eu possa gerenciar as Categorias no sistema
  
Scenario: Criar uma nova Categoria
  Given a lista de Categoria é:
    | id | name        |
    | 0  | Promoção    |
    | 1  | Bebidas     |
    | 2  | Vegetariano |
    | 3  | Jantar      |
    | 4  | Aperitivos  |
  When o usuário faz uma requisição "POST" para "category" com os seguintes dados:
    """
    {
      "name": "Sobremesas"
    }
    """
  Then a resposta deve ser "201"
  And o corpo da resposta deve ser: "Categoria Sobremesas criada com sucesso."
  And a lista de Categoria deve ser:
    | id | name        |
    | 0  | Promoção    |
    | 1  | Bebidas     |
    | 2  | Vegetariano |
    | 3  | Jantar      |
    | 4  | Aperitivos  |
    | 5  | Sobremesas  |

Scenario: Atualizar uma Categoria existente
  Given a lista de Categoria é:
    | id | name        |
    | 0  | Promoção    |
    | 1  | Bebidas     |
    | 2  | Vegetariano |
    | 3  | Jantar      |
    | 4  | Aperitivos  |
    | 5  | Sobremesas  |
  When o usuário faz uma requisição "PUT" para "category/:id" com os seguintes dados:
    """
    {
      "name": "Infantil"
    }
    """
  Then a resposta deve ser "200"
  And o corpo da resposta deve ser: "Categoria Infantil atualizada com sucesso."
  And a lista de Categoria deve ser:
    | id | name         |
    | 0  | Promoção     |
    | 1  | Infantil     |
    | 2  | Vegetariano  |
    | 3  | Jantar       |
    | 4  | Aperitivos   |
    | 5  | Sobremesas   |

Scenario: Deletar uma Categoria existente
  Given a lista de Categoria é:
    | id | name         |
    | 0  | Promoção     |
    | 1  | Bebidas      |
    | 2  | Vegetariano  |
    | 3  | Jantar       |
    | 4  | Aperitivos   |
    | 5  | Sobremesas   |
  When o usuário faz uma requisição "DELETE" para "category/:id"
  Then a resposta deve ser "200"
  And o corpo da resposta deve ser o nome da categoria deletada: "Categoria Promoção removido do cardápio"
  And a lista de Categoria deve ser:
    | id | name         |
    | 1  | Bebidas      |
    | 2  | Vegetariano  |
    | 3  | Jantar       |
    | 4  | Aperitivos   |
    | 5  | Sobremesas   |

Scenario: Criar uma Categoria com o mesmo nome
  Given a lista de Categoria é:
    | id | name         |
    | 0  | Promoção     |
    | 1  | Bebidas      |
    | 2  | Vegetariano  |
    | 3  | Jantar       |
    | 4  | Aperitivos   |
    | 5  | Sobremesas   |
  When o usuário faz uma requisição "POST" para "category" com os seguintes dados:
    """
    {
      "name": "Vegetariano"
    }
    """
  Then a resposta deve ser "400"
  And o corpo da resposta deve ser: "Categoria Vegetariano já existe no sistema"
  And a lista de Categoria deve ser:
    | id | name         |
    | 0  | Promoção     |
    | 1  | Bebidas      |
    | 2  | Vegetariano  |
    | 3  | Jantar       |
    | 4  | Aperitivos   |
    | 5  | Sobremesas   |

Scenario: Atualizar uma Categoria com o mesmo nome
  Given a lista de Categoria é:
    | id | name         |
    | 0  | Promoção     |
    | 1  | Bebidas      |
    | 2  | Vegetariano  |
    | 3  | Jantar       |
    | 4  | Aperitivos   |
    | 5  | Sobremesas   |
  When o usuário faz uma requisição "PUT" para "category/:id" com os seguintes dados:
    """
    {
      "name": "Jantar"
    }
    """
  Then a resposta deve ser "400"
  And o corpo da resposta deve ser: "Categoria Jantar já existe no sistema"
  And a lista de Categoria deve ser:
    | id | name         |
    | 0  | Promoção     |
    | 1  | Bebidas      |
    | 2  | Vegetariano  |
    | 3  | Jantar       |
    | 4  | Aperitivos   |
    | 5  | Sobremesas   |

Scenario: Deletar uma Categoria inexistente
  Given a lista de Categoria é:
    | id | name         |
    | 0  | Promoção     |
    | 1  | Bebidas      |
    | 2  | Vegetariano  |
    | 3  | Jantar       |
    | 4  | Aperitivos   |
    | 5  | Sobremesas   |
  When o usuário faz uma requisição "DELETE" para "category/7"
  Then a resposta deve ser "404"
  And o corpo da resposta deve ser: "Categoria não encontrada"
  And a lista de Categoria deve ser:
    | id | name         |
    | 0  | Promoção     |
    | 1  | Bebidas      |
    | 2  | Vegetariano  |
    | 3  | Jantar       |
    | 4  | Aperitivos   |
    | 5  | Sobremesas   |

Scenario: Listar Categorias
  Given a lista de Categoria é:
    | id | name         |
    | 0  | Promoção     |
    | 1  | Bebidas      |
    | 2  | Vegetariano  |
    | 3  | Jantar       |
    | 4  | Aperitivos   |
    | 5  | Sobremesas   |
  When o usuário faz uma requisição "GET" para "category"
  Then a resposta deve ser "200"
  And o corpo da resposta deve ser:
    """
    {
      "message": "Categorias listadas com sucesso",
      "categories": [
        {
          "id": 0,
          "name": "Promoção"
        },
        {
          "id": 1,
          "name": "Bebidas"
        },
        {
          "id": 2,
          "name": "Vegetariano"
        },
        {
          "id": 3,
          "name": "Jantar"
        },
        {
          "id": 4,
          "name": "Aperitivos"
        },
        {
          "id": 5,
          "name": "Sobremesas"
        }
      ]
    }
    """

Scenario: Listar itens de uma Categoria inexistente
  Given a lista de Categoria é:
    | id | name        |
    | 0  | Promoção    |
    | 1  | Bebidas     |
    | 2  | Vegetariano |
    | 3  | Jantar      |
    | 4  | Aperitivos  |
    | 5  | Sobremesas  |
  When o usuário faz uma requisição "GET" para "category/7"
  Then a resposta deve ser "404"
  And o corpo da resposta deve ser: "Categoria não registrada no sistema"