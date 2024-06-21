Scenario: Criar um novo usuário
  Given não existe um usuário com o email "novo@example.com"
  When eu chamo o método "createUser" com os seguintes parâmetros:
    """
    name: 'Novo Usuário',
    email: 'novo@example.com',
    gender: 'Masculino',
    cpf: '777.888.999-00',
    cep: '98765-432',
    password: 'nova_senha',
    paymentMethod: 'Cartão de Débito',
    recoveryQuestion: 'pássaro'
    """
  Then o método "createUser" retorna o novo usuário com os seguintes dados:
    | id | name         | email              | gender    | cpf            | cep       | password   | paymentMethod      | recoveryQuestion |
    | 20  | "Novo Usuário" | "novo@example.com"| "Masculino" | "777.888.999-00" | "98765-432" | "nova_senha" | "Cartão de Débito" | "pássaro"        |

Scenario: Tentar criar um usuário com email existente
  Given existe um usuário com o email "user1@example.com"
  When eu chamo o método "createUser" com os seguintes parâmetros:
    """
    name: 'Usuário Existente',
    email: 'user1@example.com',
    gender: 'Feminino',
    cpf: '000.111.222-33',
    cep: '11111-111',
    password: 'senha_existente',
    paymentMethod: 'Boleto',
    recoveryQuestion: 'cavalo'
    """
  Then o método "createUser" retorna um erro informando que o email já está em uso

Scenario: Tentar criar um usuário sem informar o nome
  When eu chamo o método "createUser" com os seguintes parâmetros:
    """
    name: '',
    email: 'semnome@example.com',
    gender: 'Feminino',
    cpf: '999.888.777-66',
    cep: '44444-555',
    password: 'sem_nome',
    paymentMethod: 'Boleto',
    recoveryQuestion: 'leão'
    """
  Then o método "createUser" retorna um erro informando que o nome é obrigatório

Scenario: Tentar criar um usuário com CPF inválido
  When eu chamo o método "createUser" com os seguintes parâmetros:
    """
    name: 'Usuário CPF Inválido',
    email: 'cpfinvalido@example.com',
    gender: 'Masculino',
    cpf: '123.456.789-00',  # CPF inválido
    cep: '12345-678',
    password: 'senha_cpf_invalido',
    paymentMethod: 'Boleto',
    recoveryQuestion: 'macaco'
    """
  Then o método "createUser" retorna um erro com a mensagem "CPF deve ser um string no formato '###.###.###-##'"
