import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import OrderRepository from '../../src/repositories/order.repository';
import OrderEntity from '../../src/entities/order.entity';
import formatParam, { formatNumberParam, formatPrice, formatUrl } from '../utils/formatParams';
import { OrderStatus } from '../../src/types/order';

const feature = loadFeature('tests/features/carrinho_compras.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockOrderRepository: OrderRepository;
  let response: supertest.Response;
  let orderDB: OrderEntity[];
  let previousOrder: OrderEntity;

  beforeEach(async () => {
    mockOrderRepository = di.getRepository(OrderRepository);
    // Delete all data:
    await mockOrderRepository.delete(() => false);
    orderDB = await mockOrderRepository.getOrders()
  });

  test('inserir um item no carrinho de compras', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^não há itens no carrinho de compras$/, async () => {
      expect((orderDB.filter(order => order.status === OrderStatus.inCart)).length).toEqual(0);
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method: string, url, docString) => {
      const route = formatUrl(url)
      const payload = JSON.parse(docString);
      response = await request.post(route).send(payload);
      expect(response.request.method).toBe(formatParam(method));
    });

    then(/^o status code da requisição é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('o corpo da resposta:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^o carrinho de compras está com as seguintes informações:$/, async (table: OrderEntity[]) => {
      expect((orderDB.filter(order => order.status === OrderStatus.inCart)).length).toEqual(table.length);
      table.forEach((item: OrderEntity, index: number) => {
        expect(orderDB[index].userID).toEqual(item.userID);
        expect(orderDB[index].itemsId).toEqual(item.itemsId);
        expect(orderDB[index].totalPrice).toEqual(formatPrice(item.totalPrice));
        expect(orderDB[index].status).toEqual(item.status);
        expect(orderDB[index].cep).toEqual(item.cep);
      });
    });
  });

  test('remover um item no carrinho de compras', ({
    given,
    when,
    then,
    and
  }) => {
    given(/^há um item no carrinho de compras:$/, async (table: OrderEntity[]) => {
      await mockOrderRepository.createOrder(table[0]);

      expect(orderDB).toHaveLength(1);
      expect(orderDB[0].userID).toEqual(table[0].userID);
      expect(orderDB[0].itemsId).toEqual(table[0].itemsId);
      expect(orderDB[0].totalPrice).toEqual(table[0].totalPrice);
      expect(orderDB[0].status).toEqual(table[0].status);
      expect(orderDB[0].cep).toBe(table[0].cep);

      expect(orderDB[0].id).toBeDefined();
      expect(orderDB[0].createdAt).toBeDefined();
      
      previousOrder = orderDB[0];
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const route = formatUrl(url, previousOrder.id)
      const payload = JSON.parse(docString);
      response = await request.put(route).send(payload);
      expect(response.request.method).toBe(formatParam(method));
    });

    then(/^o status code da requisição é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('o corpo da resposta:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^o carrinho de compras está com as seguintes informações:$/, async (table: OrderEntity[]) => {
      expect((orderDB.filter(order => order.status === OrderStatus.inCart)).length).toEqual(table.length);
      table.forEach((item: OrderEntity, index: number) => {
        expect(orderDB[index].userID).toEqual(item.userID);
        expect(orderDB[index].itemsId).toEqual(item.itemsId);
        expect(orderDB[index].totalPrice).toEqual(formatPrice(item.totalPrice));
        expect(orderDB[index].status).toEqual(item.status);
        expect(orderDB[index].cep).toEqual(item.cep);
      });
    });
  });

  test('editar a quantidade de um item no carrinho de compras', ({
    given,
    and,
    when,
    then
  }) => {
    given(/^há um item no carrinho de compras:$/, async (table: OrderEntity[]) => {
      await mockOrderRepository.createOrder(table[0]);

      expect(orderDB).toHaveLength(1);
      expect(orderDB[0].userID).toEqual(table[0].userID);
      expect(orderDB[0].itemsId).toEqual(table[0].itemsId);
      expect(orderDB[0].totalPrice).toEqual(table[0].totalPrice);
      expect(orderDB[0].status).toEqual(table[0].status);
      expect(orderDB[0].cep).toBe(table[0].cep);

      expect(orderDB[0].id).toBeDefined();
      previousOrder = orderDB[0];
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*) com as informações:$/, async (method, url, docString) => {
      const route = formatUrl(url, previousOrder.id)
      const payload = JSON.parse(docString);
      response = await request.put(route).send(payload);
      expect(response.request.method).toBe(formatParam(method));
    });

    then(/^o status code da requisição é (.*)$/, (statusCode) => {
      expect(response.status).toBe(formatNumberParam(statusCode));
    });

    and('o corpo da resposta:', (docString) => {
      const expectedResponse = JSON.parse(docString);
      expect(response.body.msg).toEqual(expectedResponse.message);
    });

    and(/^o pedido no carrinho de compras é:$/, async (table: OrderEntity[]) => {
      expect((orderDB.filter(order => order.status === OrderStatus.inCart)).length).toEqual(table.length);
      table.forEach((item: OrderEntity, index: number) => {
        expect(orderDB[index].userID).toEqual(item.userID);
        expect(orderDB[index].itemsId).toEqual(item.itemsId);
        expect(orderDB[index].totalPrice).toEqual(formatPrice(item.totalPrice));
        expect(orderDB[index].status).toEqual(item.status);
        expect(orderDB[index].cep).toEqual(item.cep);
      });
    });
  });
  
});