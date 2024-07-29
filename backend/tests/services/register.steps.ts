import { loadFeature, defineFeature } from 'jest-cucumber';
import UserService from '../../src/services/register.service';
import UserRepository from '../../src/repositories/user.repository';
import UserEntity from '../../src/entities/user.entity';
import { mockBaseRepository } from '../utils/mock';
import UserModel from '../../src/models/user.model';

const feature = loadFeature('./tests/features/register-service.feature');

defineFeature(feature, (scenario) => {
  let userService: UserService;
  let userRepository: UserRepository;
  let createdUser: UserEntity | undefined;
  let error: Error | undefined;
  let currentDate: Date;

  beforeAll(() => {
    class MockUserRepository extends mockBaseRepository {
      constructor() {
        super('user');
      }
      getUsers = jest.fn();
      getUser = jest.fn();
      createUser = jest.fn();
      updateUser = jest.fn();
      deleteUser = jest.fn();
      getUserByName = jest.fn();
      findOneByEmail = jest.fn();
      findOneByCpf = jest.fn();
    }

    userRepository = new MockUserRepository();
    userService = new UserService(userRepository);
    currentDate = new Date(); // Save the current date
  });

  afterEach(() => {
    jest.clearAllMocks();
    createdUser = undefined;
    error = undefined;
  });

  scenario('Criar um novo usuário', ({ given, when, then }) => {
    given('não existe um usuário com o email "novo@example.com"', () => {
      (userRepository.findOneByEmail as jest.Mock).mockResolvedValue(null);
    });

    when('eu chamo o método "createUser" com os seguintes parâmetros:', async () => {
      const userParams = {
        name: 'Novo Usuário',
        email: 'novo@example.com',
        gender: 'Masculino',
        cpf: '777.888.999-00',
        cep: '98765-432',
        password: 'nova_senha',
        paymentMethod: 'Cartão de Débito',
        recoveryQuestion: 'pássaro'
      };
      const newUser: UserEntity = {
        id: '20',
        name: userParams.name,
        email: userParams.email,
        gender: userParams.gender,
        cpf: userParams.cpf,
        cep: userParams.cep,
        password: userParams.password,
        paymentMethod: userParams.paymentMethod,
        recoveryQuestion: userParams.recoveryQuestion,
        createdAt: currentDate, 
        active: true
      };
      (userRepository.createUser as jest.Mock).mockResolvedValue(newUser);
      createdUser = await userService.createUser(newUser);
    });

    then('o método "createUser" retorna o novo usuário com os seguintes dados:', () => {
      const expectedUser = {
        id: '20',
        name: 'Novo Usuário',
        email: 'novo@example.com',
        gender: 'Masculino',
        cpf: '777.888.999-00',
        cep: '98765-432',
        password: 'nova_senha',
        paymentMethod: 'Cartão de Débito',
        recoveryQuestion: 'pássaro',
        active: true
      };

      expect(createdUser).toBeDefined();
      expect(createdUser!.id).toEqual(expectedUser.id);
      expect(createdUser!.name).toEqual(expectedUser.name);
      expect(createdUser!.email).toEqual(expectedUser.email);
      expect(createdUser!.gender).toEqual(expectedUser.gender);
      expect(createdUser!.cpf).toEqual(expectedUser.cpf);
      expect(createdUser!.cep).toEqual(expectedUser.cep);
      expect(createdUser!.password).toEqual(expectedUser.password);
      expect(createdUser!.paymentMethod).toEqual(expectedUser.paymentMethod);
      expect(createdUser!.recoveryQuestion).toEqual(expectedUser.recoveryQuestion);
      expect(createdUser!.active).toEqual(expectedUser.active);
    });
  });

  scenario('Tentar criar um usuário com email existente', ({ given, when, then }) => {
    given('existe um usuário com o email "user1@example.com"', () => {
      const existingUser: UserEntity = {
        id: '1',
        name: 'Usuário Existente',
        email: 'user1@example.com',
        gender: 'Feminino',
        cpf: '000.111.222-33',
        cep: '11111-111',
        password: 'senha_existente',
        paymentMethod: 'Boleto',
        recoveryQuestion: 'cavalo',
        createdAt: currentDate,
        active: true
      };
      (userRepository.findOneByEmail as jest.Mock).mockResolvedValue(existingUser);
    });
  
    when('eu chamo o método "createUser" com os seguintes parâmetros:', async () => {
      const userParams = {
        name: 'Usuário Existente',
        email: 'user1@example.com',
        gender: 'Feminino',
        cpf: '000.111.222-33',
        cep: '11111-111',
        password: 'senha_existente',
        paymentMethod: 'Boleto',
        recoveryQuestion: 'cavalo'
      };
  
      try {
        await userService.createUser(userParams as any);
      } catch (err) {
        error = err as Error;
      }
    });
  
    then(/^o método "(.*)" retorna um erro informando que User with this email already exists$/, () => {
      expect(error).toEqual(new Error('User with this email already exists'));
    });
  });
  
  
  scenario('Atualizar um usuário existente', ({ given, when, then }) => {
    let existingUser: UserEntity;
    let updatedUser: UserModel;

    given('existe um usuário com o email "user2@example.com"', () => {
        existingUser = {
            id: '2',
            name: 'Usuário Atual',
            email: 'user2@example.com',
            gender: 'Masculino',
            cpf: '222.333.444-55',
            cep: '98765-432',
            password: 'senha_atual',
            paymentMethod: 'Boleto',
            recoveryQuestion: 'pássaro',
            createdAt: new Date(),
            active: true
        };
        (userRepository.findOneByEmail as jest.Mock).mockResolvedValue(existingUser);
        (userRepository.getUser as jest.Mock).mockResolvedValue(existingUser); // Certifique-se de que o usuário é retornado pelo método getUser
    });

    when('eu chamo o método "updateUser" com os seguintes parâmetros:', async () => {
        const userParams = {
            id: '2',
            name: 'Usuário Atualizado',
            email: 'user2_updated@example.com',
            gender: 'Masculino',
            cpf: '111.222.333-44',
            cep: '12345-678',
            paymentMethod: 'Cartão de Crédito',
            recoveryQuestion: 'gato'
        };
        const updatedUserParams = {
            ...existingUser,
            ...userParams,
            // Certifique-se de que a senha original é preservada
            password: existingUser.password
        };
        (userRepository.updateUser as jest.Mock).mockResolvedValue(updatedUserParams);
        updatedUser = await userService.updateUser(userParams.id, userParams);
    });

    then('o método "updateUser" retorna o usuário atualizado com os seguintes dados:', () => {
        const expectedUser = {
            id: '2',
            name: 'Usuário Atualizado',
            email: 'user2_updated@example.com',
            gender: 'Masculino',
            cpf: '111.222.333-44',
            cep: '12345-678',
            password: existingUser.password, // A senha deve ser a mesma do usuário existente
            paymentMethod: 'Cartão de Crédito',
            recoveryQuestion: 'gato',
            active: true
        };

        expect(updatedUser).toBeDefined();
        expect(updatedUser!.id).toEqual(expectedUser.id);
        expect(updatedUser!.name).toEqual(expectedUser.name);
        expect(updatedUser!.email).toEqual(expectedUser.email);
        expect(updatedUser!.gender).toEqual(expectedUser.gender);
        expect(updatedUser!.cpf).toEqual(expectedUser.cpf);
        expect(updatedUser!.cep).toEqual(expectedUser.cep);
        expect(updatedUser!.password).toEqual(expectedUser.password);
        expect(updatedUser!.paymentMethod).toEqual(expectedUser.paymentMethod);
        expect(updatedUser!.recoveryQuestion).toEqual(expectedUser.recoveryQuestion);
        expect(updatedUser!.active).toEqual(expectedUser.active);
    });
});

scenario('Deletar um usuário', ({ given, when, then }) => {
  given('existe um usuário com o email "user3@example.com"', () => {
    const existingUser = {
      id: '3',
      email: 'user3@example.com'
    };
    (userRepository.findOneByEmail as jest.Mock).mockResolvedValue(existingUser);
  });

  when('eu chamo o método "deleteUser" com o email "user3@example.com"', async () => {
    await userService.deleteUser('3');
  });

  then('o método "deleteUser" deleta o usuário com o email "user3@example.com"', async () => {
    expect(userRepository.deleteUser).toHaveBeenCalledWith('3');
  });
});
});
