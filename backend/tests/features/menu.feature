Feature: Menu

As um usuário com permissão para manipular o cardápio
I want adicionar, remover e atualizar um novo item
So that eu possa manipular os itens do cardápio

Scenario: Adicionar um novo item ao cardápio
  Given que não há itens registrados no Cardápio
  When o usuário faz uma requisição "POST" para o endpoint "menu" com as informações:
    """
    {
      "name": "Batata",
      "price": 10.00,
      "description": "Não é a frita",
      "image": "None",
      "categoryID": null,
      "timeToPrepare": "0 minutos"
    }
    """
  Then o status code da resposta é "201"
  And a mensagem da resposta é:
    """
    {
      "message": "Item Batata adicionado ao cardápio"
    }
    """
  And a lista de itens no Cardápio é:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 10.00 | Não é a frita  | None  | null | 0 minutos     |

Scenario: Atualizar um item do cardápio
  Given que há um item registrado no Cardápio com as informações:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 10.00 | Não é a frita  | None  | null | 0 minutos    |
  When o usuário faz uma requisição "PUT" para o endpoint "menu/:id" com as informações:
    """
    {
      "price": 15.00
    }
    """
  Then o status code da resposta é "200"
  And a mensagem da resposta é:
    """
    {
      "message": "Item Batata atualizado no cardápio"
    }
    """
  And a lista de itens no Cardápio é:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 15.00 | Não é a frita  | None  | null | 0 minutos    |

Scenario: Remover um item do cardápio
  Given que há um item registrado no Cardápio com as informações:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 10.00 | Não é a frita  | None  | null | 0 minutos    |
  When o usuário faz uma requisição "DELETE" para o endpoint "menu/:id"
  Then o status code da resposta é "200"
  And a mensagem da resposta é:
    """
    {
      "message": "Item Batata removido do cardápio"
    }
    """
  And a lista de itens no Cardápio é:
    | name   | price | description    | image | categoryID | timeToPrepare |

Scenario: Adicionar um item sem nome ao cardápio
  Given que não há itens registrados no Cardápio
  When o usuário faz uma requisição "POST" para o endpoint "menu" com as informações:
    """
    {
      "price": 10.00,
      "description": "Não é a frita",
      "image": "None",
      "categoryID": null,
      "timeToPrepare": "0 minutos"
    }
    """
  Then o item não é adicionado ao cardápio
  And o status code da resposta é "400"
  And a mensagem da resposta é:
    """
    {
      "message": "O nome é obrigatório"
    }
    """
  And a lista de itens no Cardápio é:
    | name   | price | description    | image | categoryID | timeToPrepare |
  
Scenario: Adicionar um item sem preço no cardápio
  Given que não há itens registrados no Cardápio
  When o usuário faz uma requisição "POST" para o endpoint "menu" com as informações:
    """
    {
      "name": "Batata",
      "description": "Não é a frita",
      "image": "None",
      "categoryID": null,
      "timeToPrepare": "0 minutos"
    }
    """
  Then o item não é adicionado ao cardápio
  And o status code da resposta é "400"
  And a mensagem da resposta é:
    """
    {
      "message": "O preço é obrigatório"
    }
    """
  And a lista de itens no Cardápio é:
    | name   | price | description    | image | categoryID | timeToPrepare |

Scenario: Atualizar um item com informações preço inválido
  Given que há um item registrado no Cardápio com as informações:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 10.00 | Não é a frita  | None  | null | 0 minutos    |
  When o usuário faz uma requisição "PUT" para o endpoint "menu/:id" com as informações:
    """
    {
      "price": "Letra"
    }
    """
  Then o item "Batata" não é atualizado no cardápio
  And o status code da resposta é "400"
  And a mensagem da resposta é:
    """
    {
      "message": "O preço é obrigatório"
    }
    """
  And a lista de itens no Cardápio é:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 10.00 | Não é a frita  | None  | null | 0 minutos    |
  
Scenario: Atualizar um item com informações preço negativo
  Given que há um item registrado no Cardápio com as informações:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 10.00 | Não é a frita  | None  | null | 0 minutos    |
  When o usuário faz uma requisição "PUT" para o endpoint "menu/:id" com as informações:
    """
    {
      "name": "Batata",
      "price": -10.00
    }
    """
  Then o item "Batata" não é atualizado no cardápio
  And o status code da resposta é "400"
  And a mensagem da resposta é:
    """
    {
      "message": "O preço é obrigatório"
    }
    """
  And a lista de itens no Cardápio é:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 10.00 | Não é a frita  | None  | null | 0 minutos    |

Scenario: Remover um item que não existe no cardápio
  Given que não há itens registrados no Cardápio
  When o usuário faz uma requisição "DELETE" para o endpoint "menu/:id"
  Then o status code da resposta é "404"
  And a mensagem da resposta é:
    """
    {
      "message": "Item não encontrado no cardápio"
    }
    """
  And a lista de itens no Cardápio é:
    | name   | price | description    | image | categoryID | timeToPrepare |

Scenario: Tentar enviar nenhuma informação para adicionar um item
  Given que não há itens registrados no Cardápio
  When o usuário faz uma requisição "POST" para o endpoint "menu" sem payload:
  Then o item não é adicionado ao cardápio
  And o status code da resposta é "400"
  And a mensagem da resposta é:
    """
    {
      "message": "O nome é obrigatório"
    }
    """
  And a lista de itens no Cardápio é:
    | name   | price | description    | image | categoryID | timeToPrepare |

Scenario: Tentar enviar nenhuma informação para atualizar um item
  Given que há um item registrado no Cardápio com as informações:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 10.00 | Não é a frita  | None  | null | 0 minutos    |
  When o usuário faz uma requisição "PUT" para o endpoint "menu/:id" sem payload:
  Then o item "Batata" não é atualizado no cardápio
  And o status code da resposta é "200"
  And a mensagem da resposta é:
    """
    {
      "message": "Item Batata atualizado no cardápio"
    }
    """
  And a lista de itens no Cardápio é:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 10.00 | Não é a frita  | None  | null | 0 minutos    |

Scenario: Adicionar um item existente ao cardápio
  Given que há um item no Cardápio com as informações:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 10.00 | Não é a frita  | None  | null | 0 minutos    |
  When o usuário faz uma requisição "POST" para o endpoint "menu" com as informações:
    """
    {
      "name": "Batata",
      "price": 10.00,
      "description": "Não é frita",
      "image": "None",
      "categoryID": "1",
      "timeToPrepare": "0 minutos"
    }
    """
  Then o item não é adicionado ao cardápio
  And o status code da resposta é "400"
  And a mensagem da resposta é:
    """
    {
      "message": "Item Batata já existe no cardápio"
    }
    """
  And a lista de itens no Cardápio é:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 10.00 | Não é a frita  | None  | null | 0 minutos    |

Scenario: Adicionar um item com categoria inválida ao cardápio
  Given que não há itens registrados no Cardápio
  When o usuário faz uma requisição "POST" para o endpoint "menu" com as informações:
    """
    {
      "name": "Batata",
      "price": 10.00,
      "description": "Não é a frita",
      "image": "None",
      "categoryID": "Inválida",
      "timeToPrepare": "0 minutos"
    }
    """
  Then o item não é adicionado ao cardápio
  And o status code da resposta é "400"
  And a mensagem da resposta é:
    """
    {
      "message": "A categoria é inválida"
    }
    """
  And a lista de itens no Cardápio é:
  | name   | price | description    | image | categoryID | timeToPrepare |

Scenario: Atualizar um item com categoria inválida
  Given que há um item registrado no Cardápio com as informações:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 10.00 | Não é a frita  | None  | null | 0 minutos    |
  When o usuário faz uma requisição "PUT" para o endpoint "menu/:id" com as informações:
    """
    {
      "categoryID": "Inválida"
    }
    """
  Then o item "Batata" não é atualizado no cardápio
  And o status code da resposta é "400"
  And a mensagem da resposta é:
    """
    {
      "message": "A categoria é inválida"
    }
    """
  And a lista de itens no Cardápio é:
    | name   | price | description    | image | categoryID | timeToPrepare |
    | Batata | 10.00 | Não é a frita  | None  | null | 0 minutos    |