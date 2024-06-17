import OrderModel from '../models/order.model';
import OrderRepository from '../repositories/order.repository';
import MenuRepository from '../repositories/menu.repository';
import OrderEntity from '../entities/order.entity';

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
      items: menu.filter(el => item.itemsId.includes(el.id)),
    }));
    return model;
  }

  public async createOrder(data: OrderEntity): Promise<OrderModel> {
    const orderEntity = new OrderEntity(data);
    const createdOrder = await this.orderRepository.createOrder(orderEntity);
    const menu = await this.menuRepository.getItems();
    return new OrderModel({
      ...createdOrder,
      items: menu.filter(el => createdOrder.itemsId.includes(el.id)),
    });
  }
}

export default OrderService;
