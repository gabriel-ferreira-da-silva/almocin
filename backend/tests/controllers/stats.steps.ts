import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import StatsService from '../../src/services/stats.service';

const feature = loadFeature('tests/features/stats.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let statsService: StatsService;
  let response: supertest.Response;

  beforeAll(() => {
    statsService = di.getService(StatsService);
  });

  test('requisitar todas as estatísticas', ({ given, when, then, and }) => {
    given('há um objeto em "/stats":', (docString) => {
      const stats = JSON.parse(docString);
      jest.spyOn(statsService, 'getStats').mockResolvedValue(stats);
    });

    when('o usuário faz uma requisição "GET" para o endpoint "/stats" com o filtro "all"', async () => {
      response = await request.get('/api/stats/all');
    });

    then('o status code da requisição deve ser "200"', () => {
      expect(response.status).toBe(200);
    });

    and('a resposta deve conter as seguintes informações:', (table) => {
      const expectedResponse = {
        totalUsers: Number(table[0].totalUsers),
        totalItems: Number(table[0].totalItems),
        totalRevenue: Number(table[0].totalRevenue),
        currentMonthRevenue: Number(table[0].currentMonthRevenue),
        totalOrders: Number(table[0].totalOrders),
        monthOrders: Number(table[0].monthOrders),
        averageTicket: Number(table[0].averageTicket),
        currentMonthAverageTicket: Number(table[0].currentMonthAverageTicket),
      };
      expect(response.body.data).toEqual(expectedResponse);
    });
  });

  test('requisitar as estatísticas de arrecadação', ({ given, when, then, and }) => {
    given('há um objeto em "/stats/money":', (docString) => {
      const stats = JSON.parse(docString);
      jest.spyOn(statsService, 'getStats').mockResolvedValue(stats);
    });

    when('o usuário faz uma requisição "GET" para o endpoint "/stats" com o filtro "money"', async () => {
      response = await request.get('/api/stats/money');
    });

    then('o status code da requisição deve ser "200"', () => {
      expect(response.status).toBe(200);
    });

    and('a resposta deve conter as seguintes informações:', (table) => {
      const expectedResponse = {
        totalRevenue: Number(table[0].totalRevenue),
        currentMonthRevenue: Number(table[0].currentMonthRevenue),
        averageTicket: Number(table[0].averageTicket),
        currentMonthAverageTicket: Number(table[0].currentMonthAverageTicket),
      };
      expect(response.body.data).toEqual(expectedResponse);
    });
  });

  test('requisitar as estatísticas mensais', ({ given, when, then, and }) => {
    given('há um objeto em "/stats/month":', (docString) => {
      const stats = JSON.parse(docString);
      jest.spyOn(statsService, 'getStats').mockResolvedValue(stats);
    });

    when('o usuário faz uma requisição "GET" para o endpoint "/stats" com o filtro "month"', async () => {
      response = await request.get('/api/stats/month');
    });

    then('o status code da requisição deve ser "200"', () => {
      expect(response.status).toBe(200);
    });

    and('a resposta deve conter as seguintes informações:', (table) => {
      const expectedResponse = {
        currentMonthRevenue: Number(table[0].currentMonthRevenue),
        monthOrders: Number(table[0].monthOrders),
        currentMonthAverageTicket: Number(table[0].currentMonthAverageTicket),
      };
      expect(response.body.data).toEqual(expectedResponse);
    });
  });
});
