import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import UserRepository from '../../src/repositories/user.repository';
import UserEntity from '../../src/entities/user.entity';

const feature = loadFeature('tests/features/register.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockUserRepository: UserRepository;
  let response: supertest.Response;

  beforeEach(async () => {
    mockUserRepository = di.getRepository(UserRepository);
    await mockUserRepository.delete(() => true);
  });

  test('Falha no registro devido a campos inválidos', ({ given, when, then, and }) => {
    given(/^o usuário deseja se registrar com nome "(.*)", email "(.*)", gênero "(.*)", método de pagamento "(.*)", CPF "(.*)", CEP "(.*)", senha "(.*)", e resposta à pergunta de recuperação "(.*)"$/, (name, email, gender, paymentMethod, cpf, cep, password, recoveryQuestion) => {
      const requestData = {
        name,
        email,
        gender,
        paymentMethod,
        cpf,
        cep,
        password,
        recoveryQuestion
      };
      const userEntity = new UserEntity(requestData);
      expect(userEntity).toBeInstanceOf(UserEntity)
      expect(userEntity).toBeDefined();
    });

    when('o usuário faz uma requisição "POST" para "/register" com os seguintes dados:', async (docString) => {
      const payload = JSON.parse(docString);
      response = await request.post('/api/register').send(payload);
    });

    then('a resposta deve ser "400"', () => {
      expect(response.status).toBe(400);
    });

    and('o corpo da resposta deve ser:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.msg);
    });
  });

  test('Falha no registro devido a email já registrado', ({ given, when, then, and }) => {
    given('o usuário deseja se registrar com nome "João", email "joao@example.com", gênero "Masculino", método de pagamento "Cartão de Crédito", CPF "123.456.789-10", CEP "12345-678", senha "senhaSegura", e resposta à pergunta de recuperação "lulu"', () => {
      // No setup needed, as the background scenario sets up the user data
    });

    given('um usuário com email "joao@example.com" já está registrado', async () => {
      const existingUser: UserEntity = {
        id: 'id_do_usuario',
        name: 'João',
        email: 'joao@example.com',
        gender: 'Masculino',
        paymentMethod: 'Cartão de Crédito',
        cpf: '123.456.789-10',
        cep: '12345-678',
        recoveryQuestion: 'lulu',
        password: 'senhaSegura',
        createdAt: new Date(),
        active: true
      };
      await mockUserRepository.add(existingUser);
    });

    when('o usuário faz uma requisição "POST" para "/register" com o seguinte dado:', async (docString) => {
      const payload = JSON.parse(docString);
      response = await request.post('/api/register').send(payload);
    });

    then('a resposta deve ser "400"', () => {
      expect(response.status).toBe(400);
    });

    and('o corpo da resposta deve ser:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.msg);
    });
  });

});
