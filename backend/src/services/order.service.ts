import OrderModel from '../models/order.model';
import OrderRepository from '../repositories/order.repository';
import MenuRepository from '../repositories/menu.repository';
import OrderEntity from '../entities/order.entity';
import { HttpNotFoundError } from '../utils/errors/http.error';


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
    const model = entity.map((item) => new OrderModel({
      ...item,
      items: menu.filter(el => item.itemsId.includes(el.id)),
    }));
    
    const fmodel = model.filter(order=> order.userID==userId)
    if(fmodel.length <=0){
      throw new HttpNotFoundError({
        msg: 'not found',
        msgCode: 'Item não encontrado no cardápio',
      });
    }
    return fmodel;
    /*
    const entity = await this.orderRepository.getOrders();    
    const menu = await this.menuRepository.getItems();
    
    const model = entity
      .filter(order => order.userID === userId)  // Filter orders by userId
      .map((item) => new OrderModel({
        ...item,  // Spread the properties of the order entity
        items: menu.filter(el => item.itemsId.includes(el.id)),  // Filter menu items to include only those with ids in item.itemsId
      }));

      if (entity.length==0) {
        throw new HttpNotFoundError({
          msg: 'not found',
          msgCode: 'Item não encontrado no cardápio',
        });
      }
    
    return model;*/
}
  public async updateOrder(orderId: string, data: OrderEntity): Promise<OrderModel | null> {
    const updatedOrder = await this.orderRepository.updateOrder(orderId, data);
    if (!updatedOrder) return null;
    const menu = await this.menuRepository.getItems();
    return new OrderModel({
      ...updatedOrder,
      items: menu.filter(el => updatedOrder.itemsId.includes(el.id)),
    });
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
