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
  public async getOrdersByUserId(userId: string): Promise<OrderModel[]> {
    const entity = await this.orderRepository.getOrders();    
    const menu = await this.menuRepository.getItems();
    
    const model = entity
      .filter(order => order.userID === userId)  // Filter orders by userId
      .map((item) => new OrderModel({
        ...item,  // Spread the properties of the order entity
        items: menu.filter(el => item.itemsId.includes(el.id)),  // Filter menu items to include only those with ids in item.itemsId
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