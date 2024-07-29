import { loadFeature, defineFeature } from 'jest-cucumber'
import { mockBaseRepository } from '../utils/mock'
import OrderService from '../../src/services/order.service'
import OrderRepository from '../../src/repositories/order.repository'
import MenuRepository from '../../src/repositories/menu.repository'
import OrderEntity from '../../src/entities/order.entity'
import ItemMenuEntity from '../../src/entities/item-menu.entity'



const feature = loadFeature('./tests/features/carrinho_compras-service.feature')

defineFeature(feature, (scenario) => {
  let orderService: OrderService;
  let orderRepository: OrderRepository;
  let menuRepository: MenuRepository;
  let orderModel: any;

  beforeAll(() => {
    class mockOrderRepository extends mockBaseRepository {
      constructor() {
        super('order');
      }

      getOrders = jest.fn();
      getOrdersByUserId = jest.fn();
      getOrder = jest.fn();
      createOrder = jest.fn();
      updateOrder = jest.fn();
      deleteOrder = jest.fn();
    }

    class mockMenuRepository extends mockBaseRepository {
      constructor() {
        super('menu')
      }

      getItems = jest.fn()
      getItem = jest.fn()
      createItem = jest.fn()
      updateItem = jest.fn()
      deleteItem = jest.fn()
      getItemByName = jest.fn()
    }

    orderRepository = new mockOrderRepository();
    menuRepository = new mockMenuRepository();
    orderService = new OrderService(orderRepository, menuRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  scenario('Criar um pedido', ({
    given,
    and,
    when,
    then
  }) => {
    given('o método createOrder retorna o pedido criado', () => {
      jest.spyOn(orderRepository, 'createOrder').mockImplementation(
        async (data: OrderEntity) => {
          return data
        }
      )
    });

    and('no repository MenuRepository há as itens:', (table: ItemMenuEntity[]) => {
      jest.spyOn(menuRepository, 'getItem').mockImplementation(
        async (id: string) => table.find(item => item.id === id) || null
      )
    });

    when('eu chamo o método createOrder com os parâmetros:', async (docString) => {
      const data = JSON.parse(docString)
      orderModel = await orderService.createOrder(data)
    });

    then('o método createOrder retorna o item formatado:', (table) => {
      const order = table[0]
      expect(orderModel.itemsId).toEqual(order.itemsId)
      expect(orderModel.userID).toEqual(order.userID)
      expect(orderModel.totalPrice).toEqual(Number(order.totalPrice))
      expect(orderModel.status).toEqual(order.status)
      expect(orderRepository.createOrder).toHaveBeenCalled()
    });
  });

  scenario('remover um item no carrinho de compras', ({
    given,
    when,
    then
  }) => {
    given('o método updateOrder retorna o pedido modificado e os pedidos de OrderRepository são:', (table: OrderEntity[]) => {
      jest.spyOn(orderRepository, 'getOrder').mockImplementation(
        async (id: string) => table.find(el => el.id == id) || null
      )
      jest.spyOn(orderRepository, 'updateOrder').mockImplementation(
        async (id: string, data: OrderEntity) => {
          const order = table.find(el => el.id == id) as OrderEntity
          if (order) {
            return { ...order, ...data }
          }
          return order;
        }
      )
    });

    when('eu chamo o método updateOrder com os parâmetros:', async (docString) => {
      const data = JSON.parse(docString)
      orderModel = await orderService.updateOrder(data.id, data.data)
    });

    then('o método updateOrder retorna o item formatado:', (table) => {
      const order = table[0]
      expect(orderModel.itemsId).toEqual(order.itemsId)
      expect(orderModel.userID).toEqual(order.userID)
      expect(orderModel.totalPrice).toEqual(Number(order.totalPrice))
      expect(orderModel.status).toEqual(order.status)
      expect(orderRepository.updateOrder).toHaveBeenCalled()
    });
  });

  scenario('editar a quantidade de um item no carrinho de compras', ({
    given,
    when,
    then
  }) => {
    given('o método updateOrder retorna o pedido modificado e os pedidos de OrderRepository são:', (table: OrderEntity[]) => {
      jest.spyOn(orderRepository, 'getOrder').mockImplementation(
        async (id: string) => table.find(el => el.id == id) || null
      )
      jest.spyOn(orderRepository, 'updateOrder').mockImplementation(
        async (id: string, data: OrderEntity) => {
          const order = table.find(el => el.id == id) as OrderEntity
          if (order) {
            return { ...order, ...data }
          }
          return order;
        }
      )
    });

    when('eu chamo o método updateOrder com os parâmetros:', async (docString) => {
      const data = JSON.parse(docString)
      orderModel = await orderService.updateOrder(data.id, data.data)
    });

    then('o método updateOrder retorna o item formatado:', (table) => {
      const order = table[0]
      expect(orderModel.itemsId).toEqual(order.itemsId)
      expect(orderModel.userID).toEqual(order.userID)
      expect(orderModel.totalPrice).toEqual(Number(order.totalPrice))
      expect(orderModel.status).toEqual(order.status)
      expect(orderRepository.updateOrder).toHaveBeenCalled()
    });
  });
});