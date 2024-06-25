import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import OrderRepository from '../../src/repositories/order.repository';
import OrderEntity from '../../src/entities/order.entity';
import { OrderStatus } from '../../src/types/order';

const feature = loadFeature('./tests/features/cancelar-pedidos-route.feature');
const request = supertest(app);

jest.mock('../../src/repositories/order.repository'); // Mock the entire module

defineFeature(feature, (test) => {
  let mockOrderRepository: jest.Mocked<OrderRepository>;
  let response: supertest.Response;
  let orders: OrderEntity[];
  beforeEach(() => {
    mockOrderRepository = di.getRepository(OrderRepository) as jest.Mocked<OrderRepository>;
    /*mockOrderRepository.updateOrder.mockImplementation(async (orderId: string, updateData: Partial<OrderEntity>) => {
      const orderToUpdate = orders.find(order => order.id === orderId);
      if (orderToUpdate) {
        orderToUpdate.status = updateData.status as OrderStatus;
        return orderToUpdate;
      } else {
        throw new Error(`Order with ID ${orderId} not found.`);
      }
    });*/
  });

  test('Cancelar pedido com sucesso', ({ given, when, then, and }) => {
    given('repositorio contem os dados', async (table) => {
      const orderData: OrderEntity[] = table.map((row: any) => ({
        id: row.id,
        userId: row.userId,
        itemsId: JSON.parse(row.itemsId),
        status: row.status,
        totalPrice: 100,
        totalDeliveryTime: 100,
        cep: "100",
        address_number: 100,
        active: true,
        createdAt: new Date(),
      }));

      mockOrderRepository.getOrders.mockResolvedValue(orderData);
    });

    when(/^o usuário faz uma requisição "(.*)" para "(.*)" com os seguintes dados:$/, async (method, route, docString) => {
      response = await request.put(route).send({ status: OrderStatus.canceled });
      console.log("PUT Request Response:///////////////////////////////////////////////////////////////////////////////////////////////", response.body); // Lo
      expect(response.status).toBe(200); // Verify that the request was successful
    });

    then(/^a resposta deve ser "(.*)"$/, (statusCode) => {
      expect(response.status).toBe(Number(statusCode));
    });

    and('repositorio é alterado para', async (table) => {
      const updatedOrders = await mockOrderRepository.getOrders();

      expect(updatedOrders.length).toBe(table.length);
      console.log("Updated Orders:", updatedOrders); // Log the updated orders

      for (let i = 0; i < updatedOrders.length; i++) {
        expect(updatedOrders[i].id).toEqual(table[i].id);
        expect(updatedOrders[i].userID).toEqual(table[i].userID);
      }
    });
  });
});
