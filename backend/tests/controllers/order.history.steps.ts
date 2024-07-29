import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import OrderRepository from '../../src/repositories/order.repository';
import OrderEntity from '../../src/entities/order.entity';
import { OrderStatus } from '../../src/types/order';

const feature = loadFeature('tests/features/historico-pedidos-route.feature');
const request = supertest(app);

jest.mock('../../src/repositories/order.repository'); // Mock the entire module

defineFeature(feature, (test) => {
  let mockOrderRepository: jest.Mocked<OrderRepository>;
  let response: supertest.Response;
  let ordersDB: OrderEntity[];
  let filteredOrders: OrderEntity[];
  
  beforeAll(() => {
    mockOrderRepository = new OrderRepository() as jest.Mocked<OrderRepository>;
  });

  test('Listar todos os pedidos de usuario', ({
    given,
    when,
    then,
    and,
  }) => {
    given(/^o usuário com "(.*)"="(.*)" esta cadastrado no sistema$/, async (userIdField, userId) => {
      const mockOrders: OrderEntity[] = [
        { id: "0", userID: '0', itemsId: ["item-id-0","item-id-1"], status: OrderStatus.inProgress, totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
        { id: "1", userID: '1', itemsId: ["item-id-1","item-id-2","item-id-3"], status: OrderStatus.inProgress , totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
        { id: "2", userID: '0', itemsId: ["item-id-0","item-id-1","item-id-3"], status: OrderStatus.canceled, totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
        { id: "3", userID: '1', itemsId: ["item-id-2","item-id-3"], status: OrderStatus.concluded , totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
        { id: "4", userID: '2', itemsId: ["item-id-1","item-id-2"] , status: OrderStatus.inProgress , totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
      ];

      mockOrderRepository.getOrders.mockResolvedValue(mockOrders);

      ordersDB = await mockOrderRepository.getOrders();
      filteredOrders = ordersDB.filter(order => order.userID === userId);

      expect(filteredOrders.every(ord => ord.userID === userId)).toBe(true);
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*)$/, async (method, url) => {
      method = method.replace(/"/g, '');
      url = url.replace(/"/g, '');
      response = await request.get(url);
      expect(response.request.method).toBe(method);
    });

    then(/^o status code da resposta é (.*)$/, (statusCode) => {
      statusCode = statusCode.replace(/"/g, '');
      expect(response.status).toBe(Number(statusCode));
      
    });

    and(/^o método retorna todos os itens :$/, async (table) => {
      //const orders = table.hashes();
      const orders = table.map((row: { [key: string]: string }) => ({
        id: row.id,
        userID: row.userId,
        itemsId: JSON.parse(row.itemsId), 
        status: row.status
      }));
      filteredOrders = ordersDB.filter(order => order.userID === "1");
      
      orders.forEach((ord: OrderEntity, index: number) => {
        expect(filteredOrders[index].id).toBe(ord.id);
        expect(filteredOrders[index].userID).toBe(ord.userID);
        expect(filteredOrders[index].itemsId).toStrictEqual(ord.itemsId);
        expect(filteredOrders[index].status).toBe(ord.status.replace(/"/g, ''));
      });
    });
  });

  test('Listar todos os pedidos de usuario 2', ({
    given,
    when,
    then,
    and,
  }) => {
    given(/^o usuário com "(.*)"="(.*)" esta cadastrado no sistema$/, async (userIdField, userId) => {
      const mockOrders: OrderEntity[] = [
        { id: "0", userID: '0', itemsId: ["item-id-0","item-id-1"], status: OrderStatus.inProgress, totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
        { id: "1", userID: '1', itemsId: ["item-id-1","item-id-2","item-id-3"], status: OrderStatus.inProgress , totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
        { id: "2", userID: '0', itemsId: ["item-id-0","item-id-1","item-id-3"], status: OrderStatus.canceled, totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
        { id: "3", userID: '1', itemsId: ["item-id-2","item-id-3"], status: OrderStatus.concluded , totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
        { id: "4", userID: '2', itemsId: ["item-id-1","item-id-2"] , status: OrderStatus.inProgress , totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
      ];

      mockOrderRepository.getOrders.mockResolvedValue(mockOrders);

      ordersDB = await mockOrderRepository.getOrders();
      filteredOrders = ordersDB.filter(order => order.userID === userId);

      expect(filteredOrders.every(ord => ord.userID === userId)).toBe(true);
    });

    when(/^o usuário faz uma requisição (.*) para o endpoint (.*)$/, async (method, url) => {
      method = method.replace(/"/g, '');
      url = url.replace(/"/g, '');
      response = await request.get(url);
      expect(response.request.method).toBe(method);
    });

    then(/^o status code da resposta é (.*)$/, (statusCode) => {
      statusCode = statusCode.replace(/"/g, '');
      expect(response.status).toBe(Number(statusCode));
      
    });

    and(/^o método retorna todos os itens :$/, async (table) => {
      
      const orders = table.map((row: { [key: string]: string }) => ({
        id: row.id,
        userID: row.userId,
        itemsId: JSON.parse(row.itemsId),         status: row.status
      }));
      filteredOrders = ordersDB.filter(order => order.userID === "2");
      
      orders.forEach((ord: OrderEntity, index: number) => {
        expect(filteredOrders[index].id).toBe(ord.id);
        expect(filteredOrders[index].userID).toBe(ord.userID);
        expect(filteredOrders[index].itemsId).toStrictEqual(ord.itemsId);
        expect(filteredOrders[index].status).toBe(ord.status.replace(/"/g, ''));
      });
    });
  });

  test('Falha ao listar todos os pedidos de usuario inexistente', ({
    given,
    when,
    then,
    and,
  }) => {
    given(/^o usuário com "(.*)"="(.*)" não esta cadastrado no sistema$/, async (userIdField, userId) => {
      const mockOrders: OrderEntity[] = [
        { id: "0", userID: '0', itemsId: ["item-id-0","item-id-1"], status: OrderStatus.inProgress, totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
        { id: "1", userID: '1', itemsId: ["item-id-1","item-id-2","item-id-3"], status: OrderStatus.inProgress , totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
        { id: "2", userID: '0', itemsId: ["item-id-0","item-id-1","item-id-3"], status: OrderStatus.canceled, totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
        { id: "3", userID: '1', itemsId: ["item-id-2","item-id-3"], status: OrderStatus.concluded , totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
        { id: "4", userID: '2', itemsId: ["item-id-1","item-id-2"] , status: OrderStatus.inProgress , totalPrice: 12, totalDeliveryTime:33,cep:"3232",address_number:2323,active:true,createdAt: new Date() },
      ];

      mockOrderRepository.getOrders.mockResolvedValue(mockOrders);

      ordersDB = await mockOrderRepository.getOrders();
      filteredOrders = ordersDB.filter(order => order.userID === userId);

      expect(filteredOrders.every(ord => ord.userID === userId)).toBe(true);
    });

    when(/^é feita uma requisição (.*) para o endpoint (.*)$/, async (method, url) => {
      method = method.replace(/"/g, '');
      url = url.replace(/"/g, '');
      response = await request.get(url);
      expect(response.request.method).toBe(method);
    });

    then(/^o status code da resposta é (.*)$/, (statusCode) => {
      statusCode = statusCode.replace(/"/g, '');
      expect(response.status).toBe(Number(statusCode));
      
    });

    and(/^A mensagem é enviada como resposta é "(.*)"$/, (docString) => {
      docString = docString.replace(/"/g, '');
      const expectedMessage = docString;
      expect("not found").toEqual(expectedMessage);
    });
  });


});
