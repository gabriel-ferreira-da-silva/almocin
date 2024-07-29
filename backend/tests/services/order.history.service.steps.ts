import { loadFeature, defineFeature } from 'jest-cucumber';
import OrderService from '../../src/services/order.service';
import OrderRepository from '../../src/repositories/order.repository';
import OrderEntity from '../../src/entities/order.entity';
import MenuRepository from '../../src/repositories/menu.repository';
import { OrderStatus } from '../../src/types/order';
import OrderModel from '../../src/models/order.model';

const feature = loadFeature('./tests/features/historico-pedidos-service.feature');

defineFeature(feature, (test) => {
  let orderService: OrderService;
  let orderRepository: OrderRepository;
  let menuRepository: MenuRepository;

  beforeAll(() => {
    // Mocking the OrderRepository
    orderRepository = new OrderRepository();
    menuRepository = new MenuRepository();


    jest.spyOn(orderRepository, 'getOrders').mockImplementation(async() =>{
      return [new OrderEntity({ 
        id: '0', 
        userID: '0', 
        itemsId: ["item-id-0","item-id-1"], 
        status: OrderStatus.concluded, 
        totalPrice: 100, 
        totalDeliveryTime: 30, 
        cep: '12345', 
        address_number: 1,
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
      }),
      new OrderEntity({ 
        id: '1', 
        userID: '1', 
        itemsId: ["item-id-1","item-id-2","item-id-3"], 
        status: OrderStatus.inProgress, 
        totalPrice: 100, 
        totalDeliveryTime: 30, 
        cep: '12345', 
        address_number: 1,
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
      }),
      new OrderEntity({ 
        id: '2', 
        userID: '0', 
        itemsId: ["item-id-0","item-id-1","item-id-3"], 
        status: OrderStatus.canceled, 
        totalPrice: 100, 
        totalDeliveryTime: 30, 
        cep: '12345', 
        address_number: 1,
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
      }),
      new OrderEntity({ 
        id: '3', 
        userID: '1', 
        itemsId:  ["item-id-2","item-id-3"], 
        status: OrderStatus.concluded, 
        totalPrice: 100, 
        totalDeliveryTime: 30, 
        cep: '12345', 
        address_number: 1,
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
      }),
      new OrderEntity({ 
        id: '4', 
        userID: '2', 
        itemsId: ["item-id-1","item-id-2"], 
        status: OrderStatus.inProgress, 
        totalPrice: 100, 
        totalDeliveryTime: 30, 
        cep: '12345', 
        address_number: 1,
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
      }),
    ]
    });

    jest.spyOn(orderRepository, 'getOrdersByUserId').mockImplementation(async(userid) =>{
      const orders = [new OrderEntity({ 
        id: '0', 
        userID: '0', 
        itemsId: ["item-id-0","item-id-1"], 
        status: OrderStatus.concluded, 
        totalPrice: 100, 
        totalDeliveryTime: 30, 
        cep: '12345', 
        address_number: 1,
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
      }),
      new OrderEntity({ 
        id: '1', 
        userID: '1', 
        itemsId: ["item-id-1","item-id-2","item-id-3"], 
        status: OrderStatus.inProgress, 
        totalPrice: 100, 
        totalDeliveryTime: 30, 
        cep: '12345', 
        address_number: 1,
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
      }),
      new OrderEntity({ 
        id: '2', 
        userID: '0', 
        itemsId: ["item-id-0","item-id-1","item-id-3"], 
        status: OrderStatus.canceled, 
        totalPrice: 100, 
        totalDeliveryTime: 30, 
        cep: '12345', 
        address_number: 1,
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
      }),
      new OrderEntity({ 
        id: '3', 
        userID: '1', 
        itemsId:  ["item-id-2","item-id-3"], 
        status: OrderStatus.concluded, 
        totalPrice: 100, 
        totalDeliveryTime: 30, 
        cep: '12345', 
        address_number: 1,
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
      }),
      new OrderEntity({ 
        id: '4', 
        userID: '2', 
        itemsId: ["item-id-1","item-id-2"], 
        status: OrderStatus.inProgress, 
        totalPrice: 100, 
        totalDeliveryTime: 30, 
        cep: '12345', 
        address_number: 1,
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
      }),
      
    ]
    return orders.filter(order => order.userID === userid);
    });

    orderService = new OrderService(orderRepository,menuRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Listar todos os pedidos', ({ given, and, when, then }) => {
    given('o método "getOrder" não há parâmetros', () => {
      // No action needed for this step
    });

    and('o método "getOrders" retorna todos os itens de "OrdersRepository" formatado, os quais são:', async (table) => {
      jest.spyOn(orderRepository, 'getOrders').mockImplementation(async () => table);
    });

    let result: OrderModel[];

    when('o método "getOrders" é chamado', async () => {
      result = await orderService.getOrders();
    });

    then('o método retorna todos os itens de "OrdersRepository" formatado:', (table) => {
      for (let i = 0; i < table.length; i++) {
        expect(result[i].id).toEqual(table[i].id);
        expect(result[i].userID).toEqual(table[i].userID);
        expect(result[i].status).toEqual(table[i].status);    
      }
    });
  });
});
