Feature: Register service

  Scenario: Criar um novo usuário
    Given não existe um usuário com o email "novo@example.com"
    When eu chamo o método "createUser" com os seguintes parâmetros:
      | name           | email             | gender   | cpf            | cep        | password    | paymentMethod    | recoveryQuestion |
      | Novo Usuário   | novo@example.com  | Masculino| 777.888.999-00 | 98765-432  | nova_senha  | Cartão de Débito | pássaro          |
    Then o método "createUser" retorna o novo usuário com os seguintes dados:
      | id  | name          | email            | gender   | cpf           | cep        | password   | paymentMethod    | recoveryQuestion | active |
      | 20  | Novo Usuário  | novo@example.com | Masculino| 777.888.999-00| 98765-432  | nova_senha | Cartão de Débito | pássaro          | true  |

  Scenario: Tentar criar um usuário com email existente
    Given existe um usuário com o email "user1@example.com"
    When eu chamo o método "createUser" com os seguintes parâmetros:
      | name              | email             | gender  | cpf           | cep        | password        | paymentMethod | recoveryQuestion |
      | Usuário Existente | user1@example.com | Feminino| 000.111.222-33| 11111-111  | senha_existente | Boleto        | cavalo           |
    Then o método "createUser" retorna um erro informando que User with this email already exists

  Scenario: Atualizar um usuário existente
    Given existe um usuário com o email "user2@example.com"
    When eu chamo o método "updateUser" com os seguintes parâmetros:
      | id | name              | email                | gender   | cpf           | cep        | paymentMethod       | recoveryQuestion |
      | 2  | Usuário Atualizado| user2_updated@example.com | Masculino | 111.222.333-44| 12345-678 | Cartão de Crédito   | gato             |
    Then o método "updateUser" retorna o usuário atualizado com os seguintes dados:
      | id | name              | email                | gender   | cpf           | cep        | password   | paymentMethod       | recoveryQuestion | active |
      | 2  | Usuário Atualizado| user2_updated@example.com | Masculino | 111.222.333-44| 12345-678 | senha_atual | Cartão de Crédito   | gato             | true  |

  Scenario: Deletar um usuário
    Given existe um usuário com o email "user3@example.com"
    When eu chamo o método "deleteUser" com o email "user3@example.com"
    Then o método "deleteUser" deleta o usuário com o email "user3@example.com"
