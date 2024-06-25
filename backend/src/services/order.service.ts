import OrderModel from '../models/order.model';
import OrderRepository from '../repositories/order.repository';
import MenuRepository from '../repositories/menu.repository';
import OrderEntity from '../entities/order.entity';
import { HttpNotFoundError } from '../utils/errors/http.error';
import { OrderStatus } from '../types/order';

class OrderService {
  private orderRepository: OrderRepository;
  private menuRepository: MenuRepository;

  constructor(
    orderRepository: OrderRepository,
    menuRepository: MenuRepository,
  ) {
    this.orderRepository = orderRepository;
    this.menuRepository = menuRepository;
  }

  public async getOrders(): Promise<OrderModel[]> {
    const entity = await this.orderRepository.getOrders();
    const menu = await this.menuRepository.getItems();
    const model = entity.map((item) => new OrderModel({
      ...item,
      itemsId: menu.filter(el => item.itemsId.includes(el.id)).map(el => el.id),
    }));
    return model;
  }
  public async getOrdersByUserId(userId: string): Promise<OrderModel[]> {
    const entity = await this.orderRepository.getOrders();    
    const menu = await this.menuRepository.getItems();
    
    const model = entity
      .filter(order => order.userID === userId)  // Filter orders by userId
      .map((item) => new OrderModel({
        ...item,  // Spread the properties of the order entity
        itemsId: menu.filter(el => item.itemsId.includes(el.id)).map(el => el.id),  // Filter menu items to include only those with ids in item.itemsId
      }));
    
    return model;
}

  public async createOrder(data: OrderEntity): Promise<OrderModel> {
    const intemsId = data.itemsId;
    const orderEntity = new OrderEntity(data);
    const createdOrder = await this.orderRepository.createOrder(orderEntity);
    return new OrderModel({
      ...createdOrder,
      itemsId: intemsId,
      status: OrderStatus.inCart,
    });
  }

  public async updateOrder(id: string, data: OrderEntity): Promise<OrderModel> {
    const previousOrder = await this.orderRepository.getOrder(id);
    if (!previousOrder) {
      throw new HttpNotFoundError({
        msgCode: 'Não encontrado',
        msg: 'Pedido não encontrado no cardápio',
      });
    }

    const newData: OrderEntity = new OrderEntity({
      ...previousOrder,
      itemsId: data?.itemsId ?? previousOrder.itemsId,
      userID: data?.userID ?? previousOrder.userID,
      totalPrice: data?.totalPrice ?? previousOrder.totalPrice,
      status: data?.status ?? previousOrder.status,
      totalDeliveryTime: data?.totalDeliveryTime ?? previousOrder.totalDeliveryTime,
      cep: data?.cep ?? previousOrder.cep,
      address_number: data?.address_number ?? previousOrder.address_number,
    });

    const entity = await this.orderRepository.updateOrder(id, newData);


    if (entity) {
      return new OrderModel(entity);
    } else {
      throw new Error('Order entity is null.');
    }
  }

  public async calculateDeliveryTime(cepValue: string): Promise<number> {
    const cepNumber = parseInt(cepValue.split('-')[1]) + 1;
    const duration = Math.ceil(Math.random() * (cepNumber % 70) + 1);

    return duration;
  }
}

export default OrderService;
