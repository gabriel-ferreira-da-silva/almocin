Feature: Categorias

  As um usuário com permissão para manipular Categorias
  I want criar, atualizar e deletar Categorias
  So that eu possa gerenciar as Categorias no sistema

  Background: Usuário com permissão para manipular Categorias
    Given o usuário fez login com username "admin" e password "admin"
    And o usuário fez login como "admin" com permissão para manipular Categorias
    And as seguintes Categorias existem:
      | ID | Name        |
      | 0  | Promoção    |
      | 1  | Bebidas     |
      | 2  | Vegetariano |
      | 3  | Jantar      |
      | 4  | Aperitivos  |
  
  Scenario: Criar uma nova Categoria
    When o usuário faz uma requisição "POST" para "/category" com os seguintes dados:
      """
      {
        "Name": "Sobremesas"
      }
      """
    Then a resposta deve ser "201"
    And o corpo da resposta deve ser:
      """
      {
        "message": "Categoria 'Sobremesas' criada com sucesso"
      }
      """
    And a lista de "Categoria" deve ser:
      | ID | Name        |
      | 0  | Promoção    |
      | 1  | Bebidas     |
      | 2  | Vegetariano |
      | 3  | Jantar      |
      | 4  | Aperitivos  |
      | 5  | Sobremesas  |

  Scenario: Atualizar uma Categoria existente
    When o usuário faz uma requisição "PUT" para "/category/1" com os seguintes dados:
      """
      {
        "Name": "Infantil"
      }
      """
    Then a resposta deve ser "200"
    And o corpo da resposta deve ser:
      """
      {
        "message": "Categoria 'Bebidas' atualizada para 'Infantil' com sucesso"
      }
      """
    And a lista de "Categoria" deve ser:
      | ID | Name         |
      | 0  | Promoção     |
      | 1  | Infantil     |
      | 2  | Vegetariano  |
      | 3  | Jantar       |
      | 4  | Aperitivos   |
      | 5  | Sobremesas   |

  Scenario: Deletar uma Categoria existente
    When o usuário faz uma requisição "DELETE" para "/category/0"
    Then a resposta deve ser "200"
    And o corpo da resposta deve ser:
      """
      {
        "message": "Categoria 'Promoção' deletada com sucesso"
      }
      """
    And a lista de "Categoria" deve ser:
      | ID | Name         |
      | 1  | Bebidas      |
      | 2  | Vegetariano  |
      | 3  | Jantar       |
      | 4  | Aperitivos   |
      | 5  | Sobremesas   |

  Scenario: Deletar uma Categoria com itens
    Given os seguintes Itens no cardápio existem:
      | ID | Name        | Category    |
      | 0  | Água        | Bebidas     |
      | 1  | Refrigerante| Bebidas     |
      | 2  | Batata      | Vegetariano |
    When o usuário faz uma requisição "DELETE" para "/category/1"
    Then a resposta deve ser "400"
    And o corpo da resposta deve ser:
      """
      {
        "message": "Categoria 'Bebidas' não pode ser deletada pois possui itens associados"
      }
      """
    And a lista de "Categoria" deve ser:
      | ID | Name         |
      | 0  | Promoção     |
      | 1  | Bebidas      |
      | 2  | Vegetariano  |
      | 3  | Jantar       |
      | 4  | Aperitivos   |
      | 5  | Sobremesas   |

  Scenario: Criar uma Categoria com o mesmo nome
    When o usuário faz uma requisição "POST" para "/category" com os seguintes dados:
      """
      {
        "Name": "Vegetariano"
      }
      """
    Then a resposta deve ser "400"
    And o corpo da resposta deve ser:
      """
      {
        "message": "Categoria 'Vegetariano' já existe"
      }
      """
    And a lista de "Categoria" deve ser:
      | ID | Name         |
      | 0  | Promoção     |
      | 1  | Bebidas      |
      | 2  | Vegetariano  |
      | 3  | Jantar       |
      | 4  | Aperitivos   |
      | 5  | Sobremesas   |

  Scenario: Atualizar uma Categoria com o mesmo nome
    When o usuário faz uma requisição "PUT" para "/category/2" com os seguintes dados:
      """
      {
        "Name": "Jantar"
      }
      """
    Then a resposta deve ser "400"
    And o corpo da resposta deve ser:
      """
      {
        "message": "Categoria 'Jantar' já existe"
      }
      """
    And a lista de "Categoria" deve ser:
      | ID | Name         |
      | 0  | Promoção     |
      | 1  | Bebidas      |
      | 2  | Vegetariano  |
      | 3  | Jantar       |
      | 4  | Aperitivos   |
      | 5  | Sobremesas   |

  Scenario: Deletar uma Categoria inexistente
    When o usuário faz uma requisição "DELETE" para "/category/7"
    Then a resposta deve ser "400"
    And o corpo da resposta deve ser:
      """
      {
        "message": "Categoria não existe"
      }
      """
    And a lista de "Categoria" deve ser:
      | ID | Name         |
      | 0  | Promoção     |
      | 1  | Bebidas      |
      | 2  | Vegetariano  |
      | 3  | Jantar       |
      | 4  | Aperitivos   |
      | 5  | Sobremesas   |

  Scenario: Listar Categorias
    When o usuário faz uma requisição "GET" para "/category"
    Then a resposta deve ser "200"
    And o corpo da resposta deve ser:
      """
      {
        "message": "Categorias listadas com sucesso",
        "categories": [
          {
            "ID": 0,
            "Name": "Promoção"
          },
          {
            "ID": 1,
            "Name": "Bebidas"
          },
          {
            "ID": 2,
            "Name": "Vegetariano"
          },
          {
            "ID": 3,
            "Name": "Jantar"
          },
          {
            "ID": 4,
            "Name": "Aperitivos"
          },
          {
            "ID": 5,
            "Name": "Sobremesas"
          }
        ]
      }
      """

  Scenario: Listar itens de uma Categoria
    Given os seguintes Itens existem:
      | Name        | Category    |
      | Água        | Bebidas     |
      | Refrigerante| Bebidas     |
      | Batata      | Vegetariano |
    When o usuário faz uma requisição "GET" para "/category/1"
    Then a resposta deve ser "200"
    And o corpo da resposta deve ser:
      """
      {
        "message": "Itens da Categoria 'Bebidas' listados com sucesso",
        "items": [
          {
            "Name": "Água",
            "Category": "Bebidas"
          },
          {
            "Name": "Refrigerante",
            "Category": "Bebidas"
          }
        ]
      }
      """

  Scenario: Listar itens de uma Categoria inexistente
    When o usuário faz uma requisição "GET" para "/category/7"
    Then a resposta deve ser "400"
    And o corpo da resposta deve ser:
      """
      {
        "message": "Categoria não existe"
      }
      """

  Scenario: Listar itens de uma Categoria sem itens
    When o usuário faz uma requisição "GET" para "/category/5"
    Then a resposta deve ser "200"
    And o corpo da resposta deve ser:
      """
      {
        "message": "Itens da Categoria 'Sobremesas' listados com sucesso",
        "items": []
      }
      """