import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import Repository from '../../src/repositories/order.repository';
import ItemMenuEntity from '../../src/entities/item-menu.entity';
import OrderRepository from '../../src/repositories/order.repository';
import OrderEntity from '../../src/entities/order.entity';

const feature = loadFeature('tests/features/historico-pedidos-route.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockOrderRepository: OrderRepository;
  let response: supertest.Response;
  let itemMenuDB: ItemMenuEntity[];
  let ordersDB: OrderEntity[];
  let order: OrderEntity;

  test('Listar todos os pedidos de usuario', ({
    given,
    when,
    then,
    and,
  }) => {
    given(/^o usuário com (.*)=(.*) esta logado no sistema$/, async (userIdField, userId) => {
      ordersDB = await mockOrderRepository.getOrders();
      ordersDB.filter(order => order.userID === userId);
      expect(ordersDB.every(ord => ord.userID === userId)).toBe(true);
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*)$/, async (method, url) => {
      response = await request.get(url);
      expect(response.request.method).toBe(method);
    });

    then(/^o status code da resposta é (.*)$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and(/^o método retorna todos os itens :$/, async (table) => {
      const orders = table.hashes();
      orders.forEach((ord: OrderEntity, index:number)=>{
        expect(ordersDB[index].id).toBe(ord.id)
        expect(ordersDB[index].userID).toBe(ord.userID)
        expect(ordersDB[index].itemsId).toBe(ord.itemsId)
        expect(ordersDB[index].status).toBe(ord.status)
      })
    });
  });
});
